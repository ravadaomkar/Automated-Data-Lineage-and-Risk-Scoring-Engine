import { useEffect, useRef, useState } from "react";

import { MOCK_STREAM_CONFIG } from "@/config/app";
import { makeTransaction } from "@/mocks/transactions";
import type { Transaction } from "@/types/transaction";

const { BATCH_INTERVAL_MS, BATCH_SIZE, VISIBLE_LIMIT, INITIAL_COUNT, BASE_TPS, SPARKLINE_LENGTH } =
  MOCK_STREAM_CONFIG;

export interface TransactionTotals {
  passed: number;
  quarantined: number;
  processed: number;
}

export interface UseTransactionsResult {
  transactions: Transaction[];
  totals: TransactionTotals;
  tps: number;
  sparkline: number[];
  paused: boolean;
  setPaused: (paused: boolean) => void;
  togglePaused: () => void;
  refresh: () => void;
}

/**
 * Owns the live transaction stream. Currently simulates ingestion with an
 * interval-driven mock generator; when the FastAPI/WebSocket backend is
 * ready, swap the internals here (e.g. useWebSocket) without touching any
 * consuming component.
 */
export function useTransactions(): UseTransactionsResult {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    Array.from({ length: INITIAL_COUNT }, (_, i) => makeTransaction(i)).reverse(),
  );
  const [totals, setTotals] = useState<TransactionTotals>({
    passed: 0,
    quarantined: 0,
    processed: 0,
  });
  const [tps, setTps] = useState(BASE_TPS);
  const [paused, setPaused] = useState(false);
  const [sparkline, setSparkline] = useState<number[]>(() =>
    Array.from({ length: SPARKLINE_LENGTH }, () => BASE_TPS - 300 + Math.random() * 600),
  );
  const seq = useRef(INITIAL_COUNT);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      const batch = Array.from({ length: BATCH_SIZE }, () => makeTransaction(seq.current++));

      setTransactions((prev) => [...batch.reverse(), ...prev].slice(0, VISIBLE_LIMIT));

      setTotals((prev) => {
        const passed = batch.filter((b) => b.status === "PASS").length;
        const quarantined = batch.length - passed;
        return {
          passed: prev.passed + passed,
          quarantined: prev.quarantined + quarantined,
          processed: prev.processed + batch.length,
        };
      });

      const nextTps = BASE_TPS - 300 + Math.round(Math.random() * 900);
      setTps(nextTps);
      setSparkline((prev) => [...prev.slice(1), nextTps]);
    }, BATCH_INTERVAL_MS);

    return () => clearInterval(id);
  }, [paused]);

  const refresh = () => {
    seq.current = INITIAL_COUNT;
    setTransactions(Array.from({ length: INITIAL_COUNT }, (_, i) => makeTransaction(i)).reverse());
    setTotals({ passed: 0, quarantined: 0, processed: 0 });
    setTps(BASE_TPS);
    setSparkline(
      Array.from({ length: SPARKLINE_LENGTH }, () => BASE_TPS - 300 + Math.random() * 600),
    );
  };

  return {
    transactions,
    totals,
    tps,
    sparkline,
    paused,
    setPaused,
    togglePaused: () => setPaused((p) => !p),
    refresh,
  };
}

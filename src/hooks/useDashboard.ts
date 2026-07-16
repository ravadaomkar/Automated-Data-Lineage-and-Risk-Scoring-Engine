import { useMemo } from "react";

import { DASHBOARD_CONFIG } from "@/config/app";
import type { TransactionTotals } from "@/hooks/useTransactions";
import type { Metrics } from "@/types/metrics";

const { DEFAULT_ERROR_RATE, SLA_TARGET } = DASHBOARD_CONFIG;

export interface UseDashboardInput {
  totals: TransactionTotals;
  tps: number;
}

export interface UseDashboardResult {
  metrics: Metrics;
}

/**
 * Turns the raw transaction feed (totals + throughput) into the Metrics
 * shape the KPI/risk panels render. Kept separate from useTransactions so
 * that once /metrics is a real endpoint, only this hook needs to change.
 */
export function useDashboard({ totals, tps }: UseDashboardInput): UseDashboardResult {
  const metrics = useMemo<Metrics>(() => {
    const errorRate =
      totals.processed === 0 ? DEFAULT_ERROR_RATE : (totals.quarantined / totals.processed) * 100;

    return {
      throughput: tps,
      processed: totals.processed,
      passed: totals.passed,
      quarantined: totals.quarantined,
      errorRate,
      sla: SLA_TARGET,
    };
  }, [totals, tps]);

  return { metrics };
}

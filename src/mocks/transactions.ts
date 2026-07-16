import { REGIONS } from "@/constants/regions";
import { RULES } from "@/constants/rules";
import { formatTimestamp } from "@/utils/formatDate";
import { randomHash } from "@/utils/hash";
import type { Transaction } from "@/types/transaction";

// Reasons shown for quarantined transactions. Only relevant to the mock
// stream — remove once /transactions is backed by a real rule engine.
const QUARANTINE_REASONS = [
  "counterparty KYC missing",
  "amount exceeds threshold",
  "duplicate settlement id",
  "sanction list match",
  "currency mismatch",
];

const QUARANTINE_RATE = 0.123;

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function makeTransaction(seq: number): Transaction {
  const isQuarantined = Math.random() < QUARANTINE_RATE;
  return {
    id: `TXN-${(0xa10000 + seq).toString(16).toUpperCase()}`,
    t: formatTimestamp(),
    amt: Math.round(Math.random() * 5_000_000) / 100,
    rule: pick(RULES),
    region: pick(REGIONS),
    status: isQuarantined ? "QUAR" : "PASS",
    reason: isQuarantined ? pick(QUARANTINE_REASONS) : undefined,
    hash: randomHash(),
  };
}

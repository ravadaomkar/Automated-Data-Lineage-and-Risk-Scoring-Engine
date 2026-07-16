import { EmptyState } from "@/components/common/EmptyState";
import { REGIONS } from "@/constants/regions";
import { RULES } from "@/constants/rules";
import { randomHash } from "@/utils/hash";
import type { TransactionTotals } from "@/hooks/useTransactions";
import type { Transaction } from "@/types/transaction";

export function QuarantineList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return <EmptyState message="No records isolated in the last window." />;
  }
  return (
    <ul className="space-y-3 font-mono text-xs">
      {transactions.map((t) => (
        <li key={t.id} className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
          <div className="flex items-center justify-between">
            <span>{t.id}</span>
            <span className="text-[10px] uppercase tracking-widest text-destructive">{t.rule}</span>
          </div>
          <div className="mt-1 text-muted-foreground">{t.reason}</div>
          <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>routed → quarantine.ledger</span>
            <span>{t.t}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

const LINEAGE_EVENTS: [string, string][] = [
  ["ingest.received", "12ms"],
  ["schema.validated", "3ms"],
  ["rule.eval.batch", "9ms"],
  ["lineage.commit", "2ms"],
  ["ledger.append", "5ms"],
];

export function LineageBlock({ processed }: { processed: number }) {
  const block = 482_913 + Math.floor(processed / 3);
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>block #{block.toLocaleString()}</span>
        <span className="text-primary">✓ anchored</span>
      </div>
      <ol className="mt-3 space-y-1.5">
        {LINEAGE_EVENTS.map(([event, duration], i) => (
          <li key={event} className="flex items-center gap-3">
            <span className="w-4 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">{event}</span>
            <span className="text-primary">{duration}</span>
          </li>
        ))}
      </ol>
      <div className="mt-3 truncate border-t border-border pt-2 text-[10px] text-muted-foreground">
        {randomHash()} · dual-region
      </div>
    </div>
  );
}

const RULE_LOAD: [string, number][] = [
  ["SOX-402", 88],
  ["SOX-404", 71],
  ["MiFID-II", 92],
  ["Basel-III", 63],
  ["AML-33", 45],
  ["FINRA-4511", 30],
];

export function RulePackLoad() {
  return (
    <ul className="space-y-3 font-mono text-xs">
      {RULE_LOAD.filter(([name]) => (RULES as readonly string[]).includes(name)).map(
        ([name, pct]) => (
          <li key={name}>
            <div className="flex justify-between text-muted-foreground">
              <span>{name}</span>
              <span>{pct}%</span>
            </div>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: "var(--gradient-signal)" }}
              />
            </div>
          </li>
        ),
      )}
    </ul>
  );
}

export function RegionDistribution({ transactions }: { transactions: Transaction[] }) {
  const counts = REGIONS.map((r) => ({
    region: r,
    count: transactions.filter((t) => t.region === r).length,
  }));
  const max = Math.max(1, ...counts.map((c) => c.count));
  return (
    <ul className="space-y-3 font-mono text-xs">
      {counts.map((c) => (
        <li key={c.region}>
          <div className="flex justify-between text-muted-foreground">
            <span>{c.region}</span>
            <span>{c.count}</span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${(c.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SessionTotals({ totals }: { totals: TransactionTotals }) {
  return (
    <dl className="grid grid-cols-3 gap-4 font-mono">
      <div>
        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Processed</dt>
        <dd className="mt-2 text-2xl tracking-tighter">{totals.processed.toLocaleString()}</dd>
      </div>
      <div>
        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Passed</dt>
        <dd className="mt-2 text-2xl tracking-tighter text-primary">
          {totals.passed.toLocaleString()}
        </dd>
      </div>
      <div>
        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Quarantined</dt>
        <dd className="mt-2 text-2xl tracking-tighter text-destructive">
          {totals.quarantined.toLocaleString()}
        </dd>
      </div>
    </dl>
  );
}

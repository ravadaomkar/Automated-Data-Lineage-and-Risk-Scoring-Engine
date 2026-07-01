import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

type Status = "PASS" | "QUAR";
type Txn = {
  id: string;
  t: string;
  amt: number;
  rule: string;
  region: string;
  status: Status;
  reason?: string;
  hash: string;
};

const RULES = ["SOX-402", "SOX-404", "MiFID-II", "Basel-III", "AML-33", "FINRA-4511", "IFRS-9"];
const REGIONS = ["us-east-1", "eu-west-1", "ap-south-1", "us-west-2"];
const REASONS = [
  "counterparty KYC missing",
  "amount exceeds threshold",
  "duplicate settlement id",
  "sanction list match",
  "currency mismatch",
];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randHash() {
  const hex = "0123456789abcdef";
  let s = "";
  for (let i = 0; i < 8; i++) s += hex[Math.floor(Math.random() * 16)];
  return `sha256:${s}…${hex[Math.floor(Math.random() * 16)]}${hex[Math.floor(Math.random() * 16)]}${hex[Math.floor(Math.random() * 16)]}${hex[Math.floor(Math.random() * 16)]}`;
}
function nowStamp() {
  const d = new Date();
  return d.toISOString().substring(11, 23);
}
function makeTxn(seq: number): Txn {
  const bad = Math.random() < 0.123;
  return {
    id: `TXN-${(0xA10000 + seq).toString(16).toUpperCase()}`,
    t: nowStamp(),
    amt: Math.round(Math.random() * 5_000_000) / 100,
    rule: rand(RULES),
    region: rand(REGIONS),
    status: bad ? "QUAR" : "PASS",
    reason: bad ? rand(REASONS) : undefined,
    hash: randHash(),
  };
}

export function Console() {
  const [txns, setTxns] = useState<Txn[]>(() =>
    Array.from({ length: 24 }, (_, i) => makeTxn(i)).reverse(),
  );
  const [tps, setTps] = useState(8500);
  const [totals, setTotals] = useState({ passed: 0, quarantined: 0, processed: 0 });
  const [paused, setPaused] = useState(false);
  const seq = useRef(24);
  const spark = useRef<number[]>(Array.from({ length: 40 }, () => 8200 + Math.random() * 600));
  const [, force] = useState(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const batch = Array.from({ length: 3 }, () => makeTxn(seq.current++));
      setTxns((prev) => [...batch.reverse(), ...prev].slice(0, 60));
      setTotals((prev) => {
        const p = batch.filter((b) => b.status === "PASS").length;
        const q = batch.length - p;
        return {
          passed: prev.passed + p,
          quarantined: prev.quarantined + q,
          processed: prev.processed + batch.length,
        };
      });
      const next = 8200 + Math.round(Math.random() * 900);
      setTps(next);
      spark.current = [...spark.current.slice(1), next];
      force((n) => n + 1);
    }, 700);
    return () => clearInterval(id);
  }, [paused]);

  const errRate = useMemo(() => {
    if (totals.processed === 0) return 12.3;
    return (totals.quarantined / totals.processed) * 100;
  }, [totals]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ConsoleHeader paused={paused} setPaused={setPaused} />
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <KpiCard label="Throughput" value={tps.toLocaleString()} unit="tps" sub="target 8,500" tone="primary">
            <Sparkline points={spark.current} />
          </KpiCard>
          <KpiCard
            label="SLA adherence"
            value="99.99"
            unit="%"
            sub="30-day rolling"
            tone="primary"
          >
            <SlaGauge value={99.99} />
          </KpiCard>
          <KpiCard
            label="Error rate"
            value={errRate.toFixed(2)}
            unit="%"
            sub={`${totals.quarantined.toLocaleString()} quarantined`}
            tone="warn"
          >
            <Bars value={errRate} target={12.3} />
          </KpiCard>
          <KpiCard
            label="Isolation latency"
            value="24"
            unit="s"
            sub="p99 · SLO < 30s"
            tone="accent"
          >
            <Bars value={24} target={30} />
          </KpiCard>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
          <Panel title="Ingestion stream" subtitle="live · validated in-flight">
            <StreamTable txns={txns} />
          </Panel>
          <div className="grid gap-4">
            <Panel title="Quarantine ledger" subtitle="bad-data isolated · 30s SLO">
              <QuarantineList txns={txns.filter((t) => t.status === "QUAR").slice(0, 6)} />
            </Panel>
            <Panel title="Lineage anchor" subtitle="append-only · dual-region">
              <LineageBlock processed={totals.processed} />
            </Panel>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Panel title="Rule pack load" subtitle="223 rules active">
            <RuleBars />
          </Panel>
          <Panel title="Region distribution" subtitle="last 60s">
            <RegionDist txns={txns} />
          </Panel>
          <Panel title="Session totals" subtitle="since page load">
            <Totals totals={totals} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function ConsoleHeader({ paused, setPaused }: { paused: boolean; setPaused: (b: boolean) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground">
            ← ledgerline
          </Link>
          <span className="h-4 w-px bg-border" />
          <span className="text-sm font-medium">Live console</span>
          <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-2.5 py-0.5 sm:inline-flex">
            <span className={"h-1.5 w-1.5 rounded-full " + (paused ? "bg-muted-foreground" : "bg-primary animate-pulse-dot")} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {paused ? "paused" : "streaming"}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className="h-8 rounded-md border border-border bg-card px-3 text-xs transition hover:bg-secondary"
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button className="h-8 rounded-md px-3 text-xs font-medium text-primary-foreground" style={{ background: "var(--gradient-signal)" }}>
            Export attestation
          </button>
        </div>
      </div>
    </header>
  );
}

function KpiCard({
  label, value, unit, sub, tone, children,
}: {
  label: string; value: string; unit: string; sub: string;
  tone: "primary" | "warn" | "accent";
  children?: React.ReactNode;
}) {
  const toneColor = tone === "warn" ? "text-[oklch(0.82_0.17_75)]" : tone === "accent" ? "text-accent" : "text-primary";
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className={"font-mono text-[10px] uppercase tracking-widest " + toneColor}>● live</span>
      </div>
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-mono text-4xl tracking-tighter">{value}</span>
        <span className="font-mono text-sm text-muted-foreground">{unit}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const w = 240, h = 40;
  const min = Math.min(...points), max = Math.max(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full">
      <path d={d} fill="none" stroke="oklch(0.78 0.19 155)" strokeWidth="1.5" />
    </svg>
  );
}

function SlaGauge({ value }: { value: number }) {
  const pct = Math.min(100, value);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--gradient-signal)" }} />
    </div>
  );
}

function Bars({ value, target }: { value: number; target: number }) {
  const pct = Math.min(100, (value / target) * 100);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full"
        style={{
          width: `${pct}%`,
          background: pct < 90 ? "oklch(0.82 0.17 75)" : "oklch(0.68 0.24 25)",
        }}
      />
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <header className="flex items-center justify-between border-b border-border/70 px-5 py-3">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          {subtitle && <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{subtitle}</p>}
        </div>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function StreamTable({ txns }: { txns: Txn[] }) {
  return (
    <div className="max-h-[520px] overflow-y-auto">
      <table className="w-full font-mono text-xs">
        <thead className="sticky top-0 bg-card text-[10px] uppercase tracking-widest text-muted-foreground">
          <tr className="border-b border-border">
            <th className="py-2 pr-3 text-left font-normal">time</th>
            <th className="py-2 pr-3 text-left font-normal">txn</th>
            <th className="py-2 pr-3 text-right font-normal">amount</th>
            <th className="py-2 pr-3 text-left font-normal">rule</th>
            <th className="py-2 pr-3 text-left font-normal">region</th>
            <th className="py-2 pr-3 text-right font-normal">state</th>
          </tr>
        </thead>
        <tbody>
          {txns.map((t) => (
            <tr key={t.id} className="border-b border-border/40">
              <td className="py-2 pr-3 text-muted-foreground">{t.t}</td>
              <td className="py-2 pr-3">{t.id}</td>
              <td className="py-2 pr-3 text-right">${t.amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="py-2 pr-3 text-muted-foreground">{t.rule}</td>
              <td className="py-2 pr-3 text-muted-foreground">{t.region}</td>
              <td className="py-2 pr-3 text-right">
                <span
                  className={
                    "rounded-sm px-1.5 py-0.5 text-[10px] uppercase tracking-widest " +
                    (t.status === "PASS" ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive")
                  }
                >
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuarantineList({ txns }: { txns: Txn[] }) {
  if (txns.length === 0) {
    return <p className="font-mono text-xs text-muted-foreground">No records isolated in the last window.</p>;
  }
  return (
    <ul className="space-y-3 font-mono text-xs">
      {txns.map((t) => (
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

function LineageBlock({ processed }: { processed: number }) {
  const block = 482_913 + Math.floor(processed / 3);
  const events = [
    ["ingest.received", "12ms"],
    ["schema.validated", "3ms"],
    ["rule.eval.batch", "9ms"],
    ["lineage.commit", "2ms"],
    ["ledger.append", "5ms"],
  ];
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>block #{block.toLocaleString()}</span>
        <span className="text-primary">✓ anchored</span>
      </div>
      <ol className="mt-3 space-y-1.5">
        {events.map(([e, d], i) => (
          <li key={e} className="flex items-center gap-3">
            <span className="w-4 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">{e}</span>
            <span className="text-primary">{d}</span>
          </li>
        ))}
      </ol>
      <div className="mt-3 truncate border-t border-border pt-2 text-[10px] text-muted-foreground">
        {randHash()} · dual-region
      </div>
    </div>
  );
}

function RuleBars() {
  const rows = [
    ["SOX-402", 88],
    ["SOX-404", 71],
    ["MiFID-II", 92],
    ["Basel-III", 63],
    ["AML-33", 45],
    ["FINRA-4511", 30],
  ] as const;
  return (
    <ul className="space-y-3 font-mono text-xs">
      {rows.map(([name, pct]) => (
        <li key={name}>
          <div className="flex justify-between text-muted-foreground">
            <span>{name}</span>
            <span>{pct}%</span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--gradient-signal)" }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function RegionDist({ txns }: { txns: Txn[] }) {
  const counts = REGIONS.map((r) => ({ r, n: txns.filter((t) => t.region === r).length }));
  const max = Math.max(1, ...counts.map((c) => c.n));
  return (
    <ul className="space-y-3 font-mono text-xs">
      {counts.map((c) => (
        <li key={c.r}>
          <div className="flex justify-between text-muted-foreground">
            <span>{c.r}</span>
            <span>{c.n}</span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(c.n / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Totals({ totals }: { totals: { passed: number; quarantined: number; processed: number } }) {
  return (
    <dl className="grid grid-cols-3 gap-4 font-mono">
      <div>
        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Processed</dt>
        <dd className="mt-2 text-2xl tracking-tighter">{totals.processed.toLocaleString()}</dd>
      </div>
      <div>
        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Passed</dt>
        <dd className="mt-2 text-2xl tracking-tighter text-primary">{totals.passed.toLocaleString()}</dd>
      </div>
      <div>
        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">Quarantined</dt>
        <dd className="mt-2 text-2xl tracking-tighter text-destructive">{totals.quarantined.toLocaleString()}</dd>
      </div>
    </dl>
  );
}
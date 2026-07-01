import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "./Nav";

const stats = [
  { label: "Audit cycle reduction", value: "88%", detail: "48h → 5.7h reporting turnaround" },
  { label: "Sustained throughput", value: "8,500", detail: "transactions per second, peak 11.2k" },
  { label: "SLA adherence", value: "99.99%", detail: "measured across Q4 2025 – Feb 2026" },
  { label: "Bad data isolated", value: "100%", detail: "12.3% error rate quarantined < 30s" },
];

const pipeline = [
  { id: "01", name: "Ingest", detail: "Kafka + Kinesis fan-in, schema-registry pinned", meta: "8,500 tps" },
  { id: "02", name: "Validate", detail: "223 rule packs · SOX, MiFID II, Basel III", meta: "< 4ms p50" },
  { id: "03", name: "Isolate", detail: "Bad records routed to quarantine ledger", meta: "12.3% err" },
  { id: "04", name: "Lineage", detail: "Merkle-chained event log, immutable by policy", meta: "100%" },
  { id: "05", name: "Attest", detail: "Auditor-ready report generated on write", meta: "5.7h cycle" },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Ticker />
      <Metrics />
      <Pipeline />
      <Lineage />
      <Compliance />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-signal)" }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.15fr_1fr] lg:py-32">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
            <span className="font-mono uppercase tracking-widest">Live · Feb 2026 release</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-5xl font-medium tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          >
            Compliance at the
            <br />
            <span className="italic text-muted-foreground">speed of ingest.</span>
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Ledgerline replaces 48-hour manual financial reviews with a real-time
            validation pipeline. Every transaction is checked, lineage-tracked, and
            auditor-ready the moment it lands — no batch, no drift, no surprises.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/console"
              className="inline-flex h-11 items-center rounded-md px-5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
              style={{ background: "var(--gradient-signal)" }}
            >
              Open live console
            </Link>
            <a
              href="#pipeline"
              className="inline-flex h-11 items-center rounded-md border border-border bg-card/40 px-5 text-sm font-medium transition hover:bg-card"
            >
              See the pipeline
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-8 border-t border-border pt-8">
            {[
              ["48h → 5.7h", "audit cycle"],
              ["30s", "bad-data isolation"],
              ["99.99%", "SLA adherence"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-mono text-2xl tracking-tight text-foreground">{v}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <HeroConsole />
      </div>
    </section>
  );
}

function HeroConsole() {
  const rows = [
    { t: "14:22:07.412", id: "TXN-8A19F2", amt: "$248,102.55", status: "PASS", rule: "SOX-402" },
    { t: "14:22:07.418", id: "TXN-8A19F3", amt: "$1,204.00", status: "PASS", rule: "MiFID-II" },
    { t: "14:22:07.421", id: "TXN-8A19F4", amt: "$92,450.00", status: "QUAR", rule: "AML-33" },
    { t: "14:22:07.425", id: "TXN-8A19F5", amt: "$18.72", status: "PASS", rule: "Basel-III" },
    { t: "14:22:07.429", id: "TXN-8A19F6", amt: "$3,881,220.00", status: "PASS", rule: "SOX-404" },
    { t: "14:22:07.433", id: "TXN-8A19F7", amt: "$602.14", status: "PASS", rule: "MiFID-II" },
    { t: "14:22:07.438", id: "TXN-8A19F8", amt: "$41.00", status: "QUAR", rule: "AML-33" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative overflow-hidden rounded-xl border border-border shadow-[var(--shadow-panel)]"
      style={{ background: "var(--gradient-surface)" }}
    >
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--warning)" }} />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">ledgerline · validator.stream</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">● live</span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-primary/20 to-transparent animate-scan" />
        <table className="w-full font-mono text-xs">
          <thead className="text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-normal">timestamp</th>
              <th className="px-4 py-2 text-left font-normal">txn</th>
              <th className="px-4 py-2 text-right font-normal">amount</th>
              <th className="px-4 py-2 text-left font-normal">rule</th>
              <th className="px-4 py-2 text-right font-normal">state</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className={i % 2 === 0 ? "bg-card/40" : ""}>
                <td className="px-4 py-2 text-muted-foreground">{r.t}</td>
                <td className="px-4 py-2">{r.id}</td>
                <td className="px-4 py-2 text-right">{r.amt}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.rule}</td>
                <td className="px-4 py-2 text-right">
                  <span
                    className={
                      "rounded-sm px-1.5 py-0.5 text-[10px] uppercase tracking-widest " +
                      (r.status === "PASS"
                        ? "bg-primary/15 text-primary"
                        : "bg-destructive/15 text-destructive")
                    }
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-border/70 px-4 py-2 font-mono text-[10px] text-muted-foreground">
        <span>window · 428ms</span>
        <span>passed 6 · quarantined 1 · lineage ✓</span>
      </div>
    </motion.div>
  );
}

function Ticker() {
  const items = [
    "SOX §404 attestation",
    "MiFID II RTS 22",
    "Basel III liquidity",
    "FINRA 4511",
    "IFRS 9",
    "GDPR Art. 30",
    "PCI DSS 4.0",
    "SEC Rule 17a-4",
  ];
  const stream = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border/60 bg-card/30 py-3">
      <div className="flex w-max animate-marquee gap-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {stream.map((s, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Metrics() {
  return (
    <section id="metrics" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">// production metrics</p>
            <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
              Ninety days in production.
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Continuous measurement across three regulated business units. Sampled from
            the immutable lineage log — no synthetic benchmarks.
          </p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-6 font-mono text-5xl tracking-tighter">{s.value}</div>
              <div className="mt-4 text-sm text-muted-foreground">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section id="pipeline" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// architecture</p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            Five stages. One immutable trail.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every transaction flows through the same deterministic path. Each stage
            emits a Merkle-chained lineage event before the next one begins.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-5">
          {pipeline.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative flex flex-col rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{step.id}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {step.meta}
                </span>
              </div>
              <div className="mt-8 text-lg font-medium">{step.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              {i < pipeline.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-border lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lineage() {
  const events = [
    ["ingest.received", "sha256:9f2c…a41b", "12ms"],
    ["schema.validated", "sha256:7d81…ee02", "3ms"],
    ["rule.SOX-402.eval", "sha256:44a0…c9d1", "4ms"],
    ["rule.AML-33.eval", "sha256:0e93…b12a", "6ms"],
    ["lineage.commit", "sha256:c5f7…1088", "2ms"],
    ["ledger.append", "sha256:b210…ff44", "5ms"],
  ];
  return (
    <section id="lineage" className="border-b border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">// lineage</p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            100% immutable, cryptographically anchored.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every state change writes a signed event to an append-only ledger. Auditors
            replay history from any block; regulators verify integrity without touching
            production. No row can be silently altered — ever.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Merkle-chained per-transaction event log",
              "Write-once storage, dual-region replicated",
              "Per-rule provenance surfaced in every attestation",
              "One-click auditor export in XBRL & JSON-LD",
            ].map((f) => (
              <li key={f} className="flex gap-3 text-muted-foreground">
                <span className="mt-2 h-1 w-1 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-background p-5 font-mono text-xs shadow-[var(--shadow-panel)]">
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>lineage · TXN-8A19F4</span>
            <span className="text-primary">✓ verified</span>
          </div>
          <ol className="space-y-2">
            {events.map(([e, hash, dur], i) => (
              <li key={e} className="flex items-center gap-3">
                <span className="w-4 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-foreground">{e}</span>
                <span className="hidden text-muted-foreground sm:block">{hash}</span>
                <span className="w-10 text-right text-primary">{dur}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 border-t border-border pt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            block #482,913 · anchored 14:22:07.441Z
          </div>
        </div>
      </div>
    </section>
  );
}

function Compliance() {
  const items = [
    { k: "Before", v: "48h", d: "Weekly manual review by 6 analysts" },
    { k: "After", v: "5.7h", d: "Continuous validation, on-demand attestation" },
    { k: "Errors caught", v: "12.3%", d: "Isolated to quarantine in < 30s" },
    { k: "Downstream failures", v: "0", d: "Since Feb 8, 2026 cutover" },
  ];
  return (
    <section id="compliance" className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">// outcome</p>
            <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
              From weekly firedrill to always-on control.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Ledgerline collapses the audit loop into the pipeline itself. Compliance
              teams stop chasing rows and start signing off in real time.
            </p>
            <Link
              to="/console"
              className="mt-8 inline-flex h-11 items-center rounded-md px-5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
              style={{ background: "var(--gradient-signal)" }}
            >
              Launch the live console →
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {items.map((i) => (
              <div key={i.k} className="flex flex-col justify-between bg-card p-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{i.k}</div>
                <div className="mt-8 font-mono text-4xl tracking-tighter">{i.v}</div>
                <div className="mt-3 text-sm text-muted-foreground">{i.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center">
      <div className="font-mono">© 2026 Ledgerline Systems · Built Feb 2026</div>
      <div className="flex gap-6 font-mono uppercase tracking-widest">
        <a href="#" className="transition hover:text-foreground">Docs</a>
        <a href="#" className="transition hover:text-foreground">Security</a>
        <a href="#" className="transition hover:text-foreground">Status · 99.99</a>
      </div>
    </footer>
  );
}
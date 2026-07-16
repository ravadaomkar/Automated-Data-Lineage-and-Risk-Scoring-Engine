import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span
            className="grid h-7 w-7 place-items-center rounded-md"
            style={{ background: "var(--gradient-signal)" }}
          >
            <span className="font-mono text-xs font-bold text-primary-foreground">L</span>
          </span>
          <span className="text-sm font-semibold tracking-tight">Ledgerline</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            v2.6
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#pipeline" className="transition hover:text-foreground">
            Pipeline
          </a>
          <a href="#metrics" className="transition hover:text-foreground">
            Metrics
          </a>
          <a href="#lineage" className="transition hover:text-foreground">
            Lineage
          </a>
          <a href="#compliance" className="transition hover:text-foreground">
            Compliance
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/console"
            className="hidden text-sm text-muted-foreground transition hover:text-foreground sm:block"
          >
            Open console
          </Link>
          <Link
            to="/console"
            className="inline-flex h-8 items-center rounded-md px-3 text-xs font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:opacity-90"
            style={{ background: "var(--gradient-signal)" }}
          >
            Launch demo →
          </Link>
        </div>
      </div>
    </header>
  );
}

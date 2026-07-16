import { Link } from "@tanstack/react-router";

type ConsoleHeaderProps = {
  paused: boolean;
  onPause: () => void;
  onRefresh: () => void;
};

export function ConsoleHeader({ paused, onPause, onRefresh }: ConsoleHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
          >
            ← ledgerline
          </Link>
          <span className="h-4 w-px bg-border" />
          <span className="text-sm font-medium">Live console</span>
          <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-2.5 py-0.5 sm:inline-flex">
            <span
              className={
                "h-1.5 w-1.5 rounded-full " +
                (paused ? "bg-muted-foreground" : "bg-primary animate-pulse-dot")
              }
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {paused ? "paused" : "streaming"}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="h-8 rounded-md border border-border bg-card px-3 text-xs transition hover:bg-secondary"
          >
            Refresh
          </button>
          <button
            onClick={onPause}
            className="h-8 rounded-md border border-border bg-card px-3 text-xs transition hover:bg-secondary"
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            className="h-8 rounded-md px-3 text-xs font-medium text-primary-foreground"
            style={{ background: "var(--gradient-signal)" }}
          >
            Export attestation
          </button>
        </div>
      </div>
    </header>
  );
}

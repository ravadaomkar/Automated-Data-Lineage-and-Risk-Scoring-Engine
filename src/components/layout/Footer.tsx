export function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center">
      <div className="font-mono">© 2026 Ledgerline Systems · Built Feb 2026</div>
      <div className="flex gap-6 font-mono uppercase tracking-widest">
        <a href="#" className="transition hover:text-foreground">
          Docs
        </a>
        <a href="#" className="transition hover:text-foreground">
          Security
        </a>
        <a href="#" className="transition hover:text-foreground">
          Status · 99.99
        </a>
      </div>
    </footer>
  );
}

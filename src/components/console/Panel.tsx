import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Panel({ title, subtitle, children }: PanelProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <header className="flex items-center justify-between border-b border-border/70 px-5 py-3">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          {subtitle && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

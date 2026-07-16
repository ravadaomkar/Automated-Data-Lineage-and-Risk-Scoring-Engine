import type { ReactNode } from "react";

import { KPI_TONE_TEXT_CLASS, type KpiTone } from "@/config/theme";

type KpiCardProps = {
  title: string;
  value: number | string;
  unit?: string;
  subtitle: string;
  tone?: KpiTone;
  icon?: ReactNode;
  children?: ReactNode;
};

export function KpiCard({
  title,
  value,
  unit,
  subtitle,
  tone = "primary",
  children,
}: KpiCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{title}</span>
        <span
          className={"font-mono text-[10px] uppercase tracking-widest " + KPI_TONE_TEXT_CLASS[tone]}
        >
          ● live
        </span>
      </div>
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-mono text-4xl tracking-tighter">{value}</span>
        {unit && <span className="font-mono text-sm text-muted-foreground">{unit}</span>}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

import { DESTRUCTIVE_COLOR, SIGNAL_GRADIENT, WARNING_COLOR } from "@/config/theme";

export function SlaGauge({ value }: { value: number }) {
  const pct = Math.min(100, value);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: SIGNAL_GRADIENT }}
      />
    </div>
  );
}

export function TargetBar({ value, target }: { value: number; target: number }) {
  const pct = Math.min(100, (value / target) * 100);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full"
        style={{
          width: `${pct}%`,
          background: pct < 90 ? WARNING_COLOR : DESTRUCTIVE_COLOR,
        }}
      />
    </div>
  );
}

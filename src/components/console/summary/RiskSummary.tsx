import { Panel } from "@/components/console/Panel";
import { formatPercent, ratioToPercent } from "@/utils/percentage";
import type { Metrics } from "@/types/metrics";

type RiskSummaryProps = {
  metrics: Metrics;
};

export function RiskSummary({ metrics }: RiskSummaryProps) {
  const passRate = ratioToPercent(metrics.passed, metrics.processed, 100);
  const failRate = ratioToPercent(metrics.quarantined, metrics.processed, 0);

  const rows: { label: string; value: string; tone?: "primary" | "destructive" }[] = [
    { label: "Pass rate", value: formatPercent(passRate), tone: "primary" },
    { label: "Fail rate", value: formatPercent(failRate), tone: "destructive" },
    { label: "Quarantined", value: metrics.quarantined.toLocaleString() },
    { label: "Validation (SLA)", value: formatPercent(metrics.sla, 2) },
    { label: "Error rate", value: formatPercent(metrics.errorRate, 2) },
  ];

  return (
    <Panel title="Risk summary" subtitle="rolling · since page load">
      <dl className="space-y-3 font-mono text-xs">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd
              className={
                row.tone === "primary"
                  ? "text-primary"
                  : row.tone === "destructive"
                    ? "text-destructive"
                    : "text-foreground"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

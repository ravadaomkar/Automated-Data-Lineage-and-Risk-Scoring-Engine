import { KpiCard } from "@/components/console/cards/KpiCard";
import { SlaGauge, TargetBar } from "@/components/console/cards/KpiGauges";
import { Sparkline } from "@/components/console/charts/Sparkline";
import { formatPercent } from "@/utils/percentage";
import type { Metrics } from "@/types/metrics";

const ISOLATION_LATENCY_SLO_SECONDS = 30;
const ISOLATION_LATENCY_P99_SECONDS = 24;
const ERROR_RATE_TARGET = 12.3;

type MetricsCardsProps = {
  metrics: Metrics;
  sparkline: number[];
};

export function MetricsCards({ metrics, sparkline }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <KpiCard
        title="Throughput"
        value={metrics.throughput.toLocaleString()}
        unit="tps"
        subtitle="target 8,500"
        tone="primary"
      >
        <Sparkline points={sparkline} />
      </KpiCard>

      <KpiCard
        title="SLA adherence"
        value={formatPercent(metrics.sla, 2)}
        subtitle="30-day rolling"
        tone="primary"
      >
        <SlaGauge value={metrics.sla} />
      </KpiCard>

      <KpiCard
        title="Error rate"
        value={formatPercent(metrics.errorRate, 2)}
        subtitle={`${metrics.quarantined.toLocaleString()} quarantined`}
        tone="warn"
      >
        <TargetBar value={metrics.errorRate} target={ERROR_RATE_TARGET} />
      </KpiCard>

      <KpiCard
        title="Isolation latency"
        value={ISOLATION_LATENCY_P99_SECONDS}
        unit="s"
        subtitle={`p99 · SLO < ${ISOLATION_LATENCY_SLO_SECONDS}s`}
        tone="accent"
      >
        <TargetBar value={ISOLATION_LATENCY_P99_SECONDS} target={ISOLATION_LATENCY_SLO_SECONDS} />
      </KpiCard>
    </div>
  );
}

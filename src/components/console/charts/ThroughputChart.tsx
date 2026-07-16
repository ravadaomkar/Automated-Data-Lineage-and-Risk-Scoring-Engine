import { Panel } from "@/components/console/Panel";
import { Sparkline } from "@/components/console/charts/Sparkline";

type ThroughputChartProps = {
  throughput: number[];
};

// TODO: replace the Sparkline with a Recharts <AreaChart> once this is fed
// by real historical throughput data from the API instead of the mock feed.
export function ThroughputChart({ throughput }: ThroughputChartProps) {
  return (
    <Panel title="Throughput" subtitle="tps · last 40 samples">
      <Sparkline points={throughput} />
    </Panel>
  );
}

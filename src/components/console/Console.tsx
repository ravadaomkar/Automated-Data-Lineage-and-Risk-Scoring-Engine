import { MetricsCards } from "@/components/console/cards/MetricsCards";
import { ThroughputChart } from "@/components/console/charts/ThroughputChart";
import {
  LineageBlock,
  QuarantineList,
  RegionDistribution,
  RulePackLoad,
  SessionTotals,
} from "@/components/console/DetailPanels";
import { ConsoleHeader } from "@/components/console/header/ConsoleHeader";
import { Panel } from "@/components/console/Panel";
import { RiskSummary } from "@/components/console/summary/RiskSummary";
import { TransactionTable } from "@/components/console/table/TransactionTable";
import { PageContainer } from "@/components/layout/PageContainer";
import { useDashboard } from "@/hooks/useDashboard";
import { useTransactions } from "@/hooks/useTransactions";

export function Console() {
  const { transactions, totals, tps, sparkline, paused, togglePaused, refresh } = useTransactions();
  const { metrics } = useDashboard({ totals, tps });

  const quarantined = transactions.filter((t) => t.status === "QUAR").slice(0, 6);

  return (
    <PageContainer>
      <ConsoleHeader paused={paused} onPause={togglePaused} onRefresh={refresh} />

      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <MetricsCards metrics={metrics} sparkline={sparkline} />

        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
          <TransactionTable transactions={transactions} />
          <div className="grid gap-4">
            <Panel title="Quarantine ledger" subtitle="bad-data isolated · 30s SLO">
              <QuarantineList transactions={quarantined} />
            </Panel>
            <Panel title="Lineage anchor" subtitle="append-only · dual-region">
              <LineageBlock processed={totals.processed} />
            </Panel>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ThroughputChart throughput={sparkline} />
          <Panel title="Region distribution" subtitle="last 60s">
            <RegionDistribution transactions={transactions} />
          </Panel>
          <RiskSummary metrics={metrics} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Panel title="Rule pack load" subtitle="223 rules active">
            <RulePackLoad />
          </Panel>
          <Panel title="Session totals" subtitle="since page load">
            <SessionTotals totals={totals} />
          </Panel>
        </div>
      </div>
    </PageContainer>
  );
}

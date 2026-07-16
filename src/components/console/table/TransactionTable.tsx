import { StatusBadge } from "@/components/common/StatusBadge";
import { Panel } from "@/components/console/Panel";
import { formatUsd } from "@/utils/currency";
import type { Transaction } from "@/types/transaction";

type TransactionTableProps = {
  transactions: Transaction[];
};

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <Panel title="Ingestion stream" subtitle="live · validated in-flight">
      <div className="max-h-[520px] overflow-y-auto">
        <table className="w-full font-mono text-xs">
          <thead className="sticky top-0 bg-card text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-2 pr-3 text-left font-normal">time</th>
              <th className="py-2 pr-3 text-left font-normal">txn</th>
              <th className="py-2 pr-3 text-right font-normal">amount</th>
              <th className="py-2 pr-3 text-left font-normal">rule</th>
              <th className="py-2 pr-3 text-left font-normal">region</th>
              <th className="py-2 pr-3 text-right font-normal">state</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-border/40">
                <td className="py-2 pr-3 text-muted-foreground">{t.t}</td>
                <td className="py-2 pr-3">{t.id}</td>
                <td className="py-2 pr-3 text-right">{formatUsd(t.amt)}</td>
                <td className="py-2 pr-3 text-muted-foreground">{t.rule}</td>
                <td className="py-2 pr-3 text-muted-foreground">{t.region}</td>
                <td className="py-2 pr-3 text-right">
                  <StatusBadge status={t.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

import type { TransactionStatus } from "@/types/transaction";

type StatusBadgeProps = {
  status: TransactionStatus;
};

// Was duplicated between TransactionTable and the Landing page's demo table.
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={
        "rounded-sm px-1.5 py-0.5 text-[10px] uppercase tracking-widest " +
        (status === "PASS" ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive")
      }
    >
      {status}
    </span>
  );
}

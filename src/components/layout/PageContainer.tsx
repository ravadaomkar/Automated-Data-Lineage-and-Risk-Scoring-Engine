import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

// Shared full-page wrapper — was duplicated verbatim between Landing.tsx and
// Console.tsx (`min-h-screen bg-background text-foreground`).
export function PageContainer({ children }: PageContainerProps) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}

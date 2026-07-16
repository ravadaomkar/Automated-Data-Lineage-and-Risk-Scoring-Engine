import type { ReactNode } from "react";

type ErrorPanelProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

// Shared card used by both the 404 and route-error boundaries in
// routes/__root.tsx, which previously duplicated this markup.
export function ErrorPanel({ eyebrow, title, description, actions }: ErrorPanelProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        {eyebrow && <p className="text-7xl font-bold text-foreground">{eyebrow}</p>}
        <h1
          className={
            eyebrow
              ? "mt-4 text-xl font-semibold text-foreground"
              : "text-xl font-semibold tracking-tight text-foreground"
          }
        >
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {actions && <div className="mt-6 flex flex-wrap justify-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

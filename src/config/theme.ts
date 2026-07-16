// Shared visual tokens for console UI. Colors reference the CSS variables
// defined in src/styles.css so components stay in sync with the theme
// rather than hard-coding oklch() values inline.

export type KpiTone = "primary" | "warn" | "accent";

export const KPI_TONE_TEXT_CLASS: Record<KpiTone, string> = {
  primary: "text-primary",
  warn: "text-warning",
  accent: "text-accent",
};

export const SIGNAL_GRADIENT = "var(--gradient-signal)";
export const WARNING_COLOR = "var(--color-warning)";
export const DESTRUCTIVE_COLOR = "var(--color-destructive)";

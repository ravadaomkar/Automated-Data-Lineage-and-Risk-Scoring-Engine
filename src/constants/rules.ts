export const RULES = [
  "SOX-402",
  "SOX-404",
  "AML-33",
  "MiFID-II",
  "FINRA-4511",
  "Basel-III",
  "IFRS-9",
] as const;

export type Rule = (typeof RULES)[number];

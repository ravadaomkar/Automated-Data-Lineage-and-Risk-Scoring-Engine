/** Formats a 0-100 numeric rate as a fixed-precision percentage string, e.g. formatPercent(12.345) -> "12.3%". */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** Ratio of `part` to `total` as a 0-100 percentage, safely handling total === 0. */
export function ratioToPercent(part: number, total: number, fallback = 0): number {
  return total === 0 ? fallback : (part / total) * 100;
}

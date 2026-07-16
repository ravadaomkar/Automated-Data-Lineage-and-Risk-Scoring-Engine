/** Fake sha256-shaped hash for the mock lineage/transaction stream. */
export function randomHash(): string {
  const hex = "0123456789abcdef";
  const digit = () => hex[Math.floor(Math.random() * hex.length)];
  const prefix = Array.from({ length: 8 }, digit).join("");
  const suffix = Array.from({ length: 4 }, digit).join("");
  return `sha256:${prefix}…${suffix}`;
}

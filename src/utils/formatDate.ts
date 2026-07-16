/** HH:mm:ss.SSS from the current instant — used for the mock transaction stream. */
export function formatTimestamp(date: Date = new Date()): string {
  return date.toISOString().substring(11, 23);
}

import { apiGet } from "@/services/api/client";
import { MetricsSchema } from "@/schemas/metrics";
import type { Metrics } from "@/types/metrics";

export async function getMetrics(): Promise<Metrics> {
  return apiGet("/metrics", MetricsSchema);
}

import { z } from "zod";

export const MetricsSchema = z.object({
  throughput: z.number(),
  processed: z.number(),
  passed: z.number(),
  quarantined: z.number(),
  errorRate: z.number(),
  sla: z.number(),
});

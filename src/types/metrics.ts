import type { z } from "zod";

import type { MetricsSchema } from "@/schemas/metrics";

export type Metrics = z.infer<typeof MetricsSchema>;

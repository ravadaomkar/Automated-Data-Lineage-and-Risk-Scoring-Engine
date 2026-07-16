import { z } from "zod";

import { MetricsSchema } from "./metrics";
import { TransactionSchema } from "./transaction";

export const DashboardSchema = z.object({
  metrics: MetricsSchema,
  transactions: z.array(TransactionSchema),
});

import type { z } from "zod";

import type {
  TransactionResponseSchema,
  TransactionSchema,
  TransactionStatusSchema,
} from "@/schemas/transaction";

export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;

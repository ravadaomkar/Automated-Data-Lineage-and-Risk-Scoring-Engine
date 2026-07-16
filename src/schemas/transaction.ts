import { z } from "zod";

export const TransactionStatusSchema = z.enum(["PASS", "QUAR"]);

export const TransactionSchema = z.object({
  id: z.string(),
  t: z.string(),
  amt: z.number(),
  rule: z.string(),
  region: z.string(),
  status: TransactionStatusSchema,
  reason: z.string().optional(),
  hash: z.string(),
});

export const TransactionResponseSchema = z.object({
  transactions: z.array(TransactionSchema),
});

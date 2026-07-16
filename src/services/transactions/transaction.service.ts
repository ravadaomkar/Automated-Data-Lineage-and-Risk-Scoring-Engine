import { apiGet } from "@/services/api/client";
import { TransactionResponseSchema } from "@/schemas/transaction";
import type { TransactionResponse } from "@/types/transaction";

export async function getTransactions(): Promise<TransactionResponse> {
  return apiGet("/transactions", TransactionResponseSchema);
}

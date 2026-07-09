import { apiGet } from "./api";
import { TransactionResponse } from "@/types/transaction";

export async function getTransactions() {

    return apiGet<TransactionResponse>(

        "/transactions"

    );

}
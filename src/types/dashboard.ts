import { Metrics } from "./metrics";
import { Transaction } from "./transaction";

export interface Dashboard {

    metrics: Metrics;

    transactions: Transaction[];

}
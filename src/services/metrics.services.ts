import { apiGet } from "./api";
import { Metrics } from "@/types/metrics";

export async function getMetrics() {

    return apiGet<Metrics>(

        "/metrics"

    );

}
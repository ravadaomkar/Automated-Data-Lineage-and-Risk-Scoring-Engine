import type { ZodType } from "zod";

import { API_CONFIG } from "@/config/api";

/**
 * Fetches `endpoint` and validates the JSON body against `schema` before
 * handing it back, so a shape mismatch fails loudly at the network boundary
 * instead of surfacing as a confusing bug three components downstream.
 */
export async function apiGet<T>(endpoint: string, schema: ZodType<T>): Promise<T> {
  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Unable to fetch ${endpoint}: ${response.status} ${response.statusText}`);
  }

  const body = await response.json();
  return schema.parse(body);
}

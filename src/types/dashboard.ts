import type { z } from "zod";

import type { DashboardSchema } from "@/schemas/dashboard";

export type Dashboard = z.infer<typeof DashboardSchema>;

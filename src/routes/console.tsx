import { createFileRoute } from "@tanstack/react-router";
import { Console } from "@/components/console/Console";

export const Route = createFileRoute("/console")({
  head: () => ({
    meta: [
      { title: "Live Console — Ledgerline" },
      { name: "description", content: "Real-time validation console: 8,500 tps, lineage log, quarantine stream, and SLA telemetry." },
      { property: "og:title", content: "Ledgerline Live Console" },
      { property: "og:description", content: "Watch the ingestion validation pipeline in real time." },
    ],
  }),
  component: () => <Console />,
});
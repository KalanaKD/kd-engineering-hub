import type { Project } from "@/types/content";

// PLACEHOLDER — replace with real project data. Cover images intentionally omitted
// so the card falls back to the waveform visual until you provide them.
export const projects: Project[] = [
  {
    id: "signal-ledger",
    title: "Signal Ledger",
    summary:
      "Distributed event ledger powering real-time analytics for IoT fleets.",
    description:
      "A high-throughput append-only ledger with PostgreSQL logical replication, batched writes, and a Spring Boot ingestion layer. Designed to handle 10k+ events/sec on a single node.",
    category: "Backend",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Redis"],
    github: "https://github.com/",
    challenges: [
      "Sustaining write throughput under bursty load",
      "Schema migrations without downtime",
      "Idempotent ingestion across retries",
    ],
    architecture:
      "Producers → Spring Boot ingest → batched COPY into Postgres → CDC stream → consumers.",
    year: "2026",
  },
  {
    id: "aether-dashboard",
    title: "Aether Dashboard",
    summary:
      "Operator console for managing multi-region Kubernetes workloads.",
    description:
      "A React + TypeScript dashboard with a TanStack Query data layer, real-time pod telemetry over WebSockets, and a command palette for power-user workflows.",
    category: "Full Stack",
    tech: ["React", "TypeScript", "TanStack Query", "WebSockets", "Tailwind"],
    github: "https://github.com/",
    demo: "https://example.com",
    challenges: [
      "Stable streaming under flaky networks",
      "Designing a fast keyboard-first UX",
    ],
    year: "2026",
  },
  {
    id: "pulse-mobile",
    title: "Pulse Mobile",
    summary:
      "Cross-platform mobile companion app with offline-first sync.",
    description:
      "Offline-first React Native client with conflict-free sync and biometric auth. Pairs with the Signal Ledger backend.",
    category: "Mobile",
    tech: ["React Native", "Expo", "SQLite", "TypeScript"],
    github: "https://github.com/",
    year: "2025",
  },
  {
    id: "xai-forecaster",
    title: "XAI Forecaster",
    summary:
      "LSTM time-series forecasting model with SHAP-based explainability.",
    description:
      "A research-grade forecasting pipeline combining LSTM models with SHAP attributions for transparent decision support.",
    category: "Research",
    tech: ["Python", "TensorFlow", "SHAP", "FastAPI"],
    github: "https://github.com/",
    challenges: [
      "Stabilising attributions across windows",
      "Serving explanations under latency budgets",
    ],
    year: "2025",
  },
  {
    id: "orbital-cdn",
    title: "Orbital CDN Edge",
    summary:
      "Edge worker that rewrites and caches API responses with smart invalidation.",
    description:
      "A Cloudflare-style edge worker built on Cloudflare Workers, with tag-based invalidation and SWR semantics.",
    category: "Backend",
    tech: ["TypeScript", "Cloudflare Workers", "KV", "Hono"],
    github: "https://github.com/",
    year: "2025",
  },
  {
    id: "fieldnotes",
    title: "Fieldnotes",
    summary: "Markdown-first notebook with bidirectional links and graph view.",
    description:
      "Personal knowledge tool with a custom MDX parser, fuzzy command palette, and a force-directed graph.",
    category: "Full Stack",
    tech: ["React", "Vite", "MDX", "D3"],
    github: "https://github.com/",
    year: "2024",
  },
];

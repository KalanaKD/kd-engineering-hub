import type { ResearchItem } from "@/types/content";

// PLACEHOLDER — replace with your actual research focus and outcomes.
export const research: ResearchItem[] = [
  {
    id: "xai",
    title: "Explainable AI for Time-Series Forecasting",
    area: "Explainable AI",
    summary:
      "Combining LSTM forecasting with SHAP attribution to make model decisions auditable in production settings.",
    outcomes: [
      "Reduced post-hoc explanation latency by 4×",
      "Stabilised feature attributions across rolling windows",
    ],
    tech: ["Python", "TensorFlow", "SHAP", "NumPy"],
  },
  {
    id: "lstm",
    title: "LSTM Forecasting at Scale",
    area: "Deep Learning",
    summary:
      "Engineering durable training and serving pipelines for sequence models across heterogeneous data sources.",
    outcomes: [
      "Reproducible training under a single CLI",
      "Streaming inference with bounded memory",
    ],
    tech: ["Python", "PyTorch", "FastAPI", "Docker"],
  },
  {
    id: "ml-systems",
    title: "Toward ML Systems Thinking",
    area: "Machine Learning",
    summary:
      "Exploring how systems engineering principles — backpressure, idempotency, observability — apply to ML platforms.",
    outcomes: [
      "Published notes and patterns",
      "Internal talks on ML reliability",
    ],
    tech: ["Python", "Spring Boot", "Kafka"],
  },
];

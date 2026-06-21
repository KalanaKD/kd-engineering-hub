import type { BlogPost } from "@/types/content";

// PLACEHOLDER — wire to Medium / MDX later.
export const blog: BlogPost[] = [
  {
    id: "post-1",
    title: "Designing for Engineering Excellence",
    category: "Craft",
    summary:
      "Notes on what 'excellence' actually means inside a working engineering team — and how to build for it.",
    date: "Coming soon",
    href: "#",
  },
  {
    id: "post-2",
    title: "Spring Boot, Patterns I Keep Reaching For",
    category: "Backend",
    summary:
      "A short catalogue of the patterns that have aged best across the services I've shipped.",
    date: "Coming soon",
    href: "#",
  },
  {
    id: "post-3",
    title: "Explainability in Production ML",
    category: "Research",
    summary:
      "What it actually takes to put SHAP-style explainability behind a latency SLA.",
    date: "Coming soon",
    href: "#",
  },
];

import type { ExperienceItem } from "@/types/content";

// PLACEHOLDER — adjust years, orgs, and copy to your actual history.
export const experience: ExperienceItem[] = [
  {
    id: "edu",
    year: "2022 — 2026",
    title: "BSc in Computer Engineering",
    org: "University of Jaffna - Faculty of Engineering",
    description:
      "Foundations in algorithms, distributed systems, computer architecture, and software engineering.",
    kind: "education",
  },
  {
    id: "intern",
    year: "2025 Nov - 2026 May",
    title: "Software Engineering Intern",
    org: "Industry placement",
    description:
      "Shipped production features across the stack, owned a service end-to-end, and contributed to platform tooling.",
    kind: "internship",
  },
  {
    id: "associate",
    year: "2026 May — Present",
    title: "Associate Software Engineer",
    org: "Current role",
    description:
      "Building scalable backend services and modern web interfaces. Investing in engineering craft, architecture, and mentorship.",
    kind: "work",
  },
  {
    id: "future",
    year: "Next",
    title: "Toward Engineering Leadership",
    org: "In motion",
    description:
      "Continuing the path toward Staff and Principal-level impact through deep technical work, research, and team leverage.",
    kind: "future",
  },
];

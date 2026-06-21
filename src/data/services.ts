import type { Service } from "@/types/content";

// PLACEHOLDER — refine copy as needed.
export const services: Service[] = [
  {
    id: "fullstack",
    title: "Full Stack Development",
    description:
      "End-to-end product work — typed APIs, modern React, and durable data layers that scale with the team.",
    icon: "Layers",
    span: "lg",
  },
  {
    id: "backend",
    title: "Backend Engineering",
    description:
      "Java, Spring Boot, and Node services designed for reliability, observability, and clean domain boundaries.",
    icon: "Server",
    span: "md",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with thoughtful offline behaviour and native-grade ergonomics.",
    icon: "Smartphone",
    span: "sm",
  },
  {
    id: "cloud",
    title: "Cloud Deployment & DevOps",
    description:
      "Container-first delivery with CI/CD, infrastructure as code, and pragmatic observability.",
    icon: "CloudCog",
    span: "md",
  },
];

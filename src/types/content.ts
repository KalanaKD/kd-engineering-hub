export type ProjectCategory = "Full Stack" | "Backend" | "Mobile" | "Research";

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  cover?: string;
  tech: string[];
  github?: string;
  demo?: string;
  challenges?: string[];
  architecture?: string;
  year?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  span?: "sm" | "md" | "lg";
}

export interface ResearchItem {
  id: string;
  title: string;
  area: string;
  summary: string;
  outcomes: string[];
  tech: string[];
}

export interface ExperienceItem {
  id: string;
  year: string;
  title: string;
  org: string;
  description: string;
  kind: "education" | "internship" | "work" | "future";
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  href: string;
}

export interface Social {
  id: string;
  label: string;
  href: string;
  icon: string; // lucide icon name
  username?: string;
}

export interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "Mobile" | "Cloud & DevOps" | "Database" | "AI & ML";
}

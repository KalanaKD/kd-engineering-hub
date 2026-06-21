import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TagChip } from "@/components/ui/tag-chip";
import { Waveform } from "@/components/waveform/Waveform";
import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const FILTERS: Array<"All" | ProjectCategory> = [
  "All",
  "Full Stack",
  "Backend",
  "Mobile",
  "Research",
];

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section id="projects" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="// Featured Projects"
            title="Selected work."
            description="A cross-section of the systems I've built — from distributed backends to typed product surfaces."
          />
        </Reveal>

        <LayoutGroup id="project-filter">
          <div className="mt-10 flex flex-wrap gap-1.5 border-b border-border pb-3">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-active"
                      className="absolute inset-0 rounded-full bg-[var(--surface)] ring-1 ring-border"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
              >
                <ProjectCard project={p} onOpen={() => setActive(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal
        project={active}
        open={Boolean(active)}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      data-cursor="project"
      onClick={onOpen}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-[var(--card)] p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:scale-[1.015] hover:border-[var(--accent-primary)]/60 hover:shadow-[0_20px_60px_-30px_color-mix(in_oklab,var(--accent-primary)_55%,transparent)]"
    >
      {/* radial spotlight follows cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--accent-primary) 16%, transparent), transparent 60%)",
        }}
      />

      <div className="relative">
        {/* cover (placeholder waveform pattern) */}
        <div className="relative mb-5 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-[var(--surface)]">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--accent-primary)_15%,transparent),transparent_70%)]" />
          <Waveform bars={51} height={80} amplitude={0.85} step={6} gradient className="relative opacity-80" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight text-foreground">
            {project.title}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-primary)]" />
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t, i) => (
            <li
              key={t}
              className="transition-transform duration-500 group-hover:-translate-y-0.5"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <TagChip>{t}</TagChip>
            </li>
          ))}
        </ul>
      </div>

      {/* waveform sweep on bottom border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 bottom-0 h-4 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-90"
      >
        <Waveform bars={61} height={16} step={5} amplitude={0.8} gradient />
      </div>
    </button>
  );
}

function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl border-border bg-[var(--surface)]">
        {project && (
          <>
            <DialogHeader>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                {project.category} · {project.year}
              </span>
              <DialogTitle className="font-display text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                {project.description}
              </DialogDescription>
            </DialogHeader>

            {project.architecture && (
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Architecture
                </h4>
                <p className="mt-2 text-sm text-foreground/85">
                  {project.architecture}
                </p>
              </div>
            )}

            {project.challenges?.length ? (
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Challenges
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-foreground/85">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--accent-primary)]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Tech
              </h4>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t}>
                    <TagChip accent="primary">{t}</TagChip>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs transition-colors hover:border-[var(--accent-primary)]/60 hover:text-[var(--accent-primary)]"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs transition-colors hover:border-[var(--accent-primary)]/60 hover:text-[var(--accent-primary)]"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live demo
                </a>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

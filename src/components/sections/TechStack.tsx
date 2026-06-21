import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { techstack } from "@/data/techstack";
import type { TechItem } from "@/types/content";

const CATEGORIES: TechItem["category"][] = [
  "Frontend",
  "Backend",
  "Mobile",
  "Cloud & DevOps",
  "Database",
  "AI & ML",
];

export function TechStack() {
  return (
    <section id="techstack" className="section-pad bg-[var(--surface)]/40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="// Stack"
            title="The engineering ecosystem."
            description="Tools I reach for, grouped by where they live."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => {
            const items = techstack.filter((t) => t.category === cat);
            return (
              <Reveal key={cat} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-[var(--card)] p-6">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                    {cat}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((t) => (
                      <li
                        key={t.name}
                        className="cursor-default rounded-lg border border-border bg-[var(--surface)] px-3 py-1.5 text-xs text-foreground/90 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/60 hover:text-[var(--accent-primary)]"
                      >
                        {t.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

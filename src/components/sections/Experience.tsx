import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { WaveformPath } from "@/components/waveform/WaveformPath";
import { experience } from "@/data/experience";
import { GraduationCap, Briefcase, Code2, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const KIND_ICONS: Record<string, LucideIcon> = {
  education: GraduationCap,
  internship: Briefcase,
  work: Code2,
  future: Sparkles,
};

export function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });

  return (
    <section id="experience" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="// Experience"
            title="The signal so far."
            description="A timeline of formation — education, internship, and the path beyond."
          />
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* Waveform spine */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:block">
            <WaveformPath
              height={experience.length * 220}
              width={120}
              cycles={experience.length}
              amplitude={28}
              progress={scrollYProgress}
            />
          </div>
          {/* Mobile straight spine */}
          <div
            aria-hidden
            className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-[var(--accent-primary)]/40 via-[var(--accent-research)]/40 to-transparent md:hidden"
          />

          <ol className="relative space-y-12 md:space-y-20">
            {experience.map((item, i) => {
              const Icon = KIND_ICONS[item.kind] ?? Code2;
              const side = i % 2 === 0 ? "left" : "right";
              const isFuture = item.kind === "future";
              return (
                <li key={item.id} className="relative md:grid md:grid-cols-2 md:gap-12">
                  {/* dot */}
                  <Dot index={i} progress={scrollYProgress} />

                  {/* Card */}
                  <Reveal
                    delay={i * 0.05}
                    className={cn(
                      "ml-10 md:ml-0",
                      side === "right" && "md:col-start-2",
                    )}
                  >
                    <article
                      className={cn(
                        "relative rounded-2xl border border-border bg-[var(--card)] p-6 transition-colors hover:border-[var(--accent-primary)]/50",
                        isFuture && "border-dashed",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-[var(--surface)] text-[var(--accent-primary)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-primary)]">
                        {item.org}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Dot({
  index,
  progress,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Highlight dots as we cross them
  const threshold = (index + 0.5) / 4;
  const opacity = useTransform(progress, [threshold - 0.1, threshold + 0.05], [0.4, 1]);
  const scale = useTransform(progress, [threshold - 0.1, threshold + 0.05], [0.8, 1.1]);

  return (
    <>
      {/* mobile dot */}
      <motion.span
        aria-hidden
        style={{ opacity, scale }}
        className="absolute left-3 top-2 -translate-x-1/2 md:hidden"
      >
        <span className="block h-2.5 w-2.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-primary)_25%,transparent)]" />
      </motion.span>
      {/* desktop dot, centered */}
      <motion.span
        aria-hidden
        style={{ opacity, scale }}
        className="absolute left-1/2 top-8 hidden -translate-x-1/2 md:block"
      >
        <span className="block h-3 w-3 rounded-full bg-[var(--accent-primary)] shadow-[0_0_0_5px_color-mix(in_oklab,var(--accent-primary)_22%,transparent)]" />
      </motion.span>
    </>
  );
}

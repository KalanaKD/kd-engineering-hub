import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TagChip } from "@/components/ui/tag-chip";
import { WaveformPulse } from "@/components/waveform/WaveformPulse";
import { research } from "@/data/research";
import { Check } from "lucide-react";

export function Research() {
  return (
    <section
      id="research"
      className="section-pad relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--accent-research) 4%, var(--background)) 50%, var(--background) 100%)",
      }}
    >
      {/* dot grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--accent-research) 25%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            eyebrow="// Signal · Research & Innovation"
            title="Where engineering meets research."
            description="A growing body of work at the intersection of software systems, machine learning, and explainability."
            accent="research"
          />
        </Reveal>

        <div className="mt-14 grid gap-5">
          {research.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.08}>
              <article
                data-cursor="research"
                className="group relative grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-border bg-[var(--card)] p-6 transition-all duration-500 hover:border-[var(--accent-research)]/60 md:grid-cols-[280px_1fr] md:items-center md:p-8"
              >
                {/* left visual: pulse */}
                <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl border border-border bg-[var(--surface)] text-[var(--accent-research)] md:h-44">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, color-mix(in oklab, var(--accent-research) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--accent-research) 18%, transparent) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <WaveformPulse bars={28} height={84} gradient />
                </div>

                {/* right copy */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-research)]">
                    {r.area}
                  </span>
                  <h3 className="font-display text-2xl text-foreground md:text-3xl">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {r.summary}
                  </p>

                  <ul className="mt-2 space-y-1.5">
                    {r.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm text-foreground/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-research)]" />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {r.tech.map((t) => (
                      <li key={t}>
                        <TagChip accent="research">{t}</TagChip>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { WaveformBackground } from "@/components/waveform/WaveformBackground";
import { about } from "@/data/about";
import logoAsset from "@/assets/kd-logo.png";

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <WaveformBackground className="opacity-[0.04]" />
      <div className="container-page relative grid gap-16 md:grid-cols-[1fr_1.2fr] md:items-center">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-[var(--surface)]">
            {/* Placeholder portrait — replace with real photo */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--accent-primary)_22%,transparent),transparent_60%)]" />
            <div className="absolute inset-0 bg-grid opacity-50" />
            <img
              src={logoAsset}
              alt=""
              className="absolute inset-0 m-auto h-1/2 w-1/2 object-contain opacity-90"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>// Kalana Dilshan</span>
              <span className="text-[var(--accent-primary)]">ASE</span>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow={about.eyebrow}
              title={about.heading}
            />
          </Reveal>

          <div className="space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="text-base text-muted-foreground sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {about.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="mt-2 font-display text-4xl text-foreground">
                    <AnimatedCounter value={m.value} suffix={m.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

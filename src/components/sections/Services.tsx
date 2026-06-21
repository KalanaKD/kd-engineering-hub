import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/data/services";
import { Layers, Server, Smartphone, CloudCog, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Layers,
  Server,
  Smartphone,
  CloudCog,
};

const SPAN_CLASSES: Record<string, string> = {
  sm: "md:col-span-1",
  md: "md:col-span-1",
  lg: "md:col-span-2",
};

export function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="// Services"
            title="What I build."
            description="A focused practice across full-stack, backend, mobile, and cloud — designed to compound."
          />
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Layers;
            return (
              <Reveal key={s.id} delay={i * 0.06}>
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-2xl border border-border bg-[var(--surface)] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent-primary)]/50",
                    SPAN_CLASSES[s.span ?? "md"],
                  )}
                >
                  {/* hover spotlight */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_30%_0%,color-mix(in_oklab,var(--accent-primary)_18%,transparent),transparent_60%)]" />
                  </div>
                  <div className="relative flex h-full flex-col">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-[var(--card)] text-[var(--accent-primary)] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

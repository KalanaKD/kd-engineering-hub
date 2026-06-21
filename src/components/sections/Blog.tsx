import { ArrowUpRight, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TagChip } from "@/components/ui/tag-chip";
import { blog } from "@/data/blog";

export function Blog() {
  return (
    <section id="blog" className="section-pad">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="// Writing"
              title="Notes from the field."
              description="A future home for essays on engineering, architecture, and research. Coming soon."
            />
          </Reveal>
          <Reveal>
            <a href="https://medium.com/" target="_blank" rel="noreferrer" data-cursor="link">
              <MagneticButton variant="secondary">
                <BookOpen className="h-4 w-4" />
                Visit Medium Profile
              </MagneticButton>
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {blog.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <a
                href={post.href}
                data-cursor="link"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[var(--card)] transition-all hover:-translate-y-1 hover:border-[var(--accent-primary)]/60"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklab,var(--accent-primary)_18%,transparent),transparent_60%)]" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <TagChip accent="primary" className="w-fit">{post.category}</TagChip>
                  <h3 className="font-display text-xl text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.summary}</p>
                  <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted-foreground">
                    <span className="font-mono uppercase tracking-[0.18em]">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-[var(--accent-primary)] transition-transform group-hover:translate-x-0.5">
                      Read <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

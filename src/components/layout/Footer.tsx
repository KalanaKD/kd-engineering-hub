import { Github, Linkedin, Mail, BookOpen } from "lucide-react";
import { socials } from "@/data/socials";
import { WaveDivider } from "@/components/waveform/WaveDivider";
import logoAsset from "@/assets/kd-logo.png";

const ICONS = { Github, Linkedin, Mail, BookOpen } as const;

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[var(--background)]">
      <div className="pt-14">
        <WaveDivider />
      </div>
      <div className="container-page grid gap-12 py-16 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src={logoAsset} alt="" className="h-8 w-8 object-contain" />
            <span className="font-display text-lg">KD</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Kalana Dilshan — Associate Software Engineer. Engineering excellence,
            relentless growth.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="text-foreground/80 transition-colors hover:text-[var(--accent-primary)]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Elsewhere
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {socials.map((s) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Mail;
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-[var(--accent-primary)]"
                  >
                    <Icon className="h-4 w-4" />
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© 2026 Kalana Dilshan. All Rights Reserved.</span>
          <span className="font-mono uppercase tracking-[0.18em]">
            Engineer. Build. Evolve.
          </span>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Mail, Github, Linkedin, BookOpen, FileDown, Send, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton, MagneticLink } from "@/components/ui/magnetic-button";
import { WaveformBackground } from "@/components/waveform/WaveformBackground";
import { socials } from "@/data/socials";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = { Mail, Github, Linkedin, BookOpen };

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name) next.name = "Required";
    if (!email || !/.+@.+\..+/.test(email)) next.email = "Valid email required";
    if (!subject) next.subject = "Required";
    if (!message || message.length < 10) next.message = "At least 10 characters";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    // PLACEHOLDER — wire to a real endpoint later.
    setTimeout(() => {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <WaveformBackground className="opacity-[0.05]" />
      <div className="container-page relative grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="// Contact"
              title="Let's build something."
              description="Open to collaboration, conversation, and roles where engineering depth matters."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-2">
              {socials.map((s) => {
                const Icon = ICONS[s.icon] ?? Mail;
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      data-cursor="contact"
                      className="group flex items-center justify-between rounded-xl border border-border bg-[var(--card)] px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-achievement)]/60"
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-[var(--surface)] text-[var(--accent-achievement)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-foreground">{s.label}</span>
                          {s.username && (
                            <span className="block font-mono text-[11px] text-muted-foreground">{s.username}</span>
                          )}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground transition-colors group-hover:text-[var(--accent-achievement)]">↗</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <MagneticLink variant="secondary" href="/resume.pdf" download>
              <FileDown className="h-4 w-4" />
              Download Resume
            </MagneticLink>
          </Reveal>
        </div>

        <Reveal>
          <form
            onSubmit={onSubmit}
            className="relative rounded-2xl border border-border bg-[var(--card)] p-6 md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" error={errors.subject} />
            </div>
            <div className="mt-5">
              <Field
                label="Message"
                name="message"
                as="textarea"
                rows={5}
                error={errors.message}
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">
                {status === "success"
                  ? "Thanks — I'll be in touch."
                  : status === "error"
                    ? "Something went wrong. Try again."
                    : "I read every message."}
              </span>
              <MagneticButton type="submit" disabled={status === "sending"}>
                {status === "success" ? (
                  <>
                    <Check className="h-4 w-4" />
                    Sent
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {status === "sending" ? "Sending…" : "Send message"}
                  </>
                )}
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  rows,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  error?: string;
}) {
  const baseCls =
    "peer block w-full rounded-lg border border-border bg-[var(--surface)] px-3 pt-5 pb-2 text-sm text-foreground placeholder-transparent transition-colors focus:border-[var(--accent-primary)] focus:outline-none";
  return (
    <label className="relative block">
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={label}
          className={baseCls}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={label}
          className={baseCls}
          aria-invalid={Boolean(error)}
        />
      )}
      <span className="pointer-events-none absolute left-3 top-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {error && (
        <span className="mt-1 block text-[11px] text-[var(--destructive)]">{error}</span>
      )}
    </label>
  );
}

import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  accent?: "primary" | "research" | "achievement";
  align?: "left" | "center";
  className?: string;
}

const accentClasses = {
  primary: "text-[var(--accent-primary)]",
  research: "text-[var(--accent-research)]",
  achievement: "text-[var(--accent-achievement)]",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  accent = "primary",
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-[0.2em]",
            accentClasses[accent],
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

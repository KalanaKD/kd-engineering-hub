import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  accent?: "primary" | "research" | "neutral";
}

export function TagChip({ className, accent = "neutral", children, ...rest }: Props) {
  const map = {
    primary:
      "border-[color-mix(in_oklab,var(--accent-primary)_35%,transparent)] text-[var(--accent-primary)] bg-[color-mix(in_oklab,var(--accent-primary)_8%,transparent)]",
    research:
      "border-[color-mix(in_oklab,var(--accent-research)_35%,transparent)] text-[var(--accent-research)] bg-[color-mix(in_oklab,var(--accent-research)_8%,transparent)]",
    neutral:
      "border-border text-muted-foreground bg-[var(--surface)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight",
        map[accent],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

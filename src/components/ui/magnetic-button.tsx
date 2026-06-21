import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  asChild?: false;
  children: ReactNode;
  magnetic?: boolean;
}

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", children, magnetic = true, ...props }, _ref) => {
    const magRef = useMagnetic<HTMLSpanElement>(0.22);

    const base =
      "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 h-11 text-sm font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<string, string> = {
      primary:
        "bg-[var(--accent-primary)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_8px_28px_-12px_rgba(59,130,246,0.55)] hover:bg-[var(--accent-primary-hover)]",
      secondary:
        "bg-transparent text-foreground border border-border hover:border-[var(--accent-primary)]/60 hover:bg-[color-mix(in_oklab,var(--accent-primary)_8%,transparent)]",
      ghost:
        "bg-transparent text-foreground hover:bg-[var(--surface)]",
    };

    return (
      <button
        className={cn(base, variants[variant], className)}
        {...props}
      >
        <span
          ref={magnetic ? magRef : undefined}
          className="pointer-events-none inline-flex items-center gap-2"
        >
          {children}
        </span>
        {/* soft glow */}
        {variant === "primary" && (
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60 bg-[radial-gradient(closest-side,var(--accent-primary),transparent)]" />
        )}
      </button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SECTION_LABELS: Record<string, { label: string; tint: "primary" | "research" | "achievement" }> = {
  project: { label: "View Project", tint: "primary" },
  research: { label: "View Research", tint: "research" },
  contact: { label: "Connect", tint: "achievement" },
  link: { label: "Open", tint: "primary" },
};

const tintMap = {
  primary: "var(--accent-primary)",
  research: "var(--accent-research)",
  achievement: "var(--accent-achievement)",
};

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<keyof typeof SECTION_LABELS | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });

  // Avoid stale-closure issues — track variant in a ref the global handler can read
  const variantRef = useRef<keyof typeof SECTION_LABELS | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const touch = matchMedia("(hover: none)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touch || reduce) return;

    setEnabled(true);
    document.documentElement.dataset.customCursor = "on";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const tag = target?.closest("[data-cursor]") as HTMLElement | null;
      const next = (tag?.dataset.cursor as keyof typeof SECTION_LABELS | undefined) ?? null;
      if (next !== variantRef.current) {
        variantRef.current = next;
        setVariant(next);
      }
    };

    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      delete document.documentElement.dataset.customCursor;
    };
  }, [x, y]);

  if (!enabled) return null;
  const info = variant ? SECTION_LABELS[variant] : null;
  const expanded = Boolean(info);

  return (
    <>
      {/* outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference"
        style={{
          x: sx,
          y: sy,
        }}
      >
        <motion.div
          animate={{
            width: expanded ? 96 : 28,
            height: expanded ? 96 : 28,
            borderColor: info ? tintMap[info.tint] : "rgba(255,255,255,0.7)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="relative flex items-center justify-center rounded-full border"
          style={{ borderWidth: 1 }}
        >
          {info && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-medium uppercase tracking-[0.18em] text-white"
            >
              {info.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* tiny dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2"
        style={{ x, y }}
      >
        <div className="h-1 w-1 rounded-full bg-[var(--accent-primary)]" />
      </motion.div>
    </>
  );
}

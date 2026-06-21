import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  bars?: number;
  height?: number;
  /** Animate continuously vs static */
  animate?: boolean;
  gradient?: boolean;
}

/**
 * Animated waveform pulse — bars rise and fall on a sine schedule.
 * Used in research cards, loader, and hover states.
 */
export function WaveformPulse({
  className,
  bars = 32,
  height = 56,
  animate = true,
  gradient = true,
}: Props) {
  const id = useId();
  const [t, setT] = useState(0);
  const raf = useRef<number | null>(null);
  const visible = useRef(true);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!animate || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => (visible.current = entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);

    const start = performance.now();
    const loop = (now: number) => {
      if (visible.current) setT((now - start) / 1000);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      obs.disconnect();
    };
  }, [animate]);

  const step = 6;
  const barW = 3;
  const width = bars * step;
  const center = (bars - 1) / 2;

  return (
    <div ref={wrapRef} className={cn("inline-block", className)} aria-hidden>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {gradient && (
          <defs>
            <linearGradient id={`wp-${id}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-research)" />
            </linearGradient>
          </defs>
        )}
        {Array.from({ length: bars }, (_, i) => {
          const d = Math.abs(i - center) / center;
          const env = Math.pow(1 - d, 1.4);
          const dyn =
            0.5 +
            0.5 *
              Math.sin(t * 2.3 + i * 0.55 + Math.cos(i * 0.31) * 1.5);
          const h = Math.max(2, env * dyn * height * 0.95);
          return (
            <rect
              key={i}
              x={i * step + (step - barW) / 2}
              y={(height - h) / 2}
              width={barW}
              height={h}
              rx={barW / 2}
              fill={gradient ? `url(#wp-${id})` : "currentColor"}
            />
          );
        })}
      </svg>
    </div>
  );
}

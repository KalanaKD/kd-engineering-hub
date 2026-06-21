import { useId, type CSSProperties } from "react";
import { motion, type MotionValue } from "framer-motion";

interface Props {
  height?: number;
  width?: number;
  /** Number of half-wave cycles down the path */
  cycles?: number;
  /** Horizontal swing in px */
  amplitude?: number;
  /** Optional motion value 0..1 to drive pathLength (scroll-linked) */
  progress?: MotionValue<number>;
  className?: string;
  style?: CSSProperties;
  dashed?: boolean;
}

/**
 * Vertical waveform path used as the timeline spine and other
 * "signal flow" connectors. Optionally draws itself in sync with scroll.
 */
export function WaveformPath({
  height = 1200,
  width = 120,
  cycles = 6,
  amplitude = 32,
  progress,
  className,
  style,
  dashed = false,
}: Props) {
  const id = useId();
  const cx = width / 2;

  // Build a smooth vertical sine curve as a cubic Bézier chain.
  const segments = cycles * 2;
  const segH = height / segments;
  let d = `M ${cx} 0`;
  for (let i = 0; i < segments; i++) {
    const y0 = i * segH;
    const y1 = (i + 1) * segH;
    const dir = i % 2 === 0 ? 1 : -1;
    const cx1 = cx + dir * amplitude;
    const cx2 = cx + dir * amplitude;
    d += ` C ${cx1} ${y0 + segH * 0.3}, ${cx2} ${y0 + segH * 0.7}, ${cx} ${y1}`;
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <linearGradient id={`wp-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-primary)" />
          <stop offset="100%" stopColor="var(--accent-research)" />
        </linearGradient>
      </defs>
      {/* Ghost path */}
      <path
        d={d}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray={dashed ? "4 6" : undefined}
      />
      {/* Drawn path */}
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#wp-grad-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        style={progress ? { pathLength: progress } : undefined}
        initial={progress ? undefined : { pathLength: 0 }}
        animate={progress ? undefined : { pathLength: 1 }}
        transition={progress ? undefined : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

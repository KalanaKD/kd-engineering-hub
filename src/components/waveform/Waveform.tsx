import { useId, type SVGProps } from "react";

interface Props extends Omit<SVGProps<SVGSVGElement>, "children"> {
  bars?: number;
  height?: number;
  /** Maximum bar height as a fraction of total height (0..1) */
  amplitude?: number;
  /** Width per bar+gap in px */
  step?: number;
  rounded?: boolean;
  /** Use gradient (blue→teal) instead of currentColor */
  gradient?: boolean;
}

/**
 * Base waveform primitive — symmetric amplitude curve, peak at center.
 * Mirrors the visual language of the KD logo's waveform.
 */
export function Waveform({
  bars = 41,
  height = 64,
  amplitude = 0.92,
  step = 8,
  rounded = true,
  gradient = false,
  ...props
}: Props) {
  const id = useId();
  const width = bars * step;
  const center = (bars - 1) / 2;

  // Symmetric easing curve: tall at center, taper to edges.
  const heights = Array.from({ length: bars }, (_, i) => {
    const d = Math.abs(i - center) / center; // 0..1 (0 center)
    // Smooth ease-out from center, modulated by a tiny pseudo-noise for life
    const env = Math.pow(1 - d, 1.6);
    const noise =
      0.6 +
      0.4 *
        Math.abs(
          Math.sin(i * 1.7) * 0.6 + Math.cos(i * 0.9 + 1.3) * 0.4,
        );
    const h = Math.max(0.06, env * noise) * amplitude;
    return Math.max(2, h * height);
  });

  const barW = Math.max(2, step * 0.55);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}
    >
      {gradient && (
        <defs>
          <linearGradient id={`wg-${id}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-primary)" />
            <stop offset="100%" stopColor="var(--accent-research)" />
          </linearGradient>
        </defs>
      )}
      {heights.map((h, i) => {
        const hh = Math.round(h * 100) / 100;
        return (
          <rect
            key={i}
            x={Math.round((i * step + (step - barW) / 2) * 100) / 100}
            y={Math.round(((height - hh) / 2) * 100) / 100}
            width={barW}
            height={hh}
            rx={rounded ? barW / 2 : 0}
            fill={gradient ? `url(#wg-${id})` : "currentColor"}
          />
        );
      })}
    </svg>
  );
}

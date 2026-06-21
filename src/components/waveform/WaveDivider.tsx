import { Waveform } from "./Waveform";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  bars?: number;
  height?: number;
}

export function WaveDivider({ className, bars = 81, height = 28 }: Props) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-5xl items-center justify-center px-6",
        className,
      )}
      aria-hidden="true"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <Waveform
        bars={bars}
        height={height}
        amplitude={0.85}
        step={6}
        gradient
        className="mx-4 shrink-0 opacity-70"
      />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

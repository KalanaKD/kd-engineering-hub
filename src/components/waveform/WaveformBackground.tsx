import { Waveform } from "./Waveform";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/** Faint ambient waveform background — for hero / about / contact only. */
export function WaveformBackground({ className }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <Waveform
        bars={141}
        height={260}
        amplitude={0.95}
        step={8}
        gradient
        className="w-[140%] max-w-none opacity-[0.08]"
      />
    </div>
  );
}

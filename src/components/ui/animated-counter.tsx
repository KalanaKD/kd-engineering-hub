import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: Props) {
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {start ? (
        <CountUp end={value} duration={duration} prefix={prefix} suffix={suffix} />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </span>
  );
}

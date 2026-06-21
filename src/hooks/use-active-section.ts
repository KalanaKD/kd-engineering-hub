import { useEffect, useState } from "react";

export function useActiveSection(ids: string[], offset = 0.35) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: `-${Math.round(offset * 100)}% 0px -${Math.round((1 - offset - 0.15) * 100)}% 0px`,
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, offset]);

  return active;
}

import { useRef, type RefObject } from "react";

/**
 * Apply a subtle magnetic attraction on pointer move.
 * Returns a ref to attach to any element.
 */
export function useMagnetic<T extends HTMLElement>(
  strength = 0.25,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  if (typeof window !== "undefined") {
    // ref callback workaround handled via effect-free direct handlers below
  }

  const setNode = (node: T | null) => {
    if (ref.current) {
      const prev = ref.current;
      prev.style.transform = "";
      prev.onpointermove = null;
      prev.onpointerleave = null;
    }
    ref.current = node;
    if (!node) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.onpointermove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      node.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    node.onpointerleave = () => {
      node.style.transform = "translate3d(0,0,0)";
    };
    node.style.transition = "transform 350ms cubic-bezier(0.22,1,0.36,1)";
    node.style.willChange = "transform";
  };

  // Use a callback ref via a proxy object
  return { get current() { return ref.current; }, set current(v) { setNode(v); } } as unknown as RefObject<T | null>;
}

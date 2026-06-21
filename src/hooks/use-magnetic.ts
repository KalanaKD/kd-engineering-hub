import { useCallback, useRef } from "react";

/**
 * Magnetic hover effect — returns a callback ref to attach to an element.
 * Pointer pulls the element toward the cursor with a soft spring transition.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const nodeRef = useRef<T | null>(null);

  const cleanupRef = useRef<(() => void) | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      nodeRef.current = node;
      if (!node || typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const onMove = (e: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        node.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      };
      const onLeave = () => {
        node.style.transform = "translate3d(0,0,0)";
      };

      node.style.transition =
        "transform 350ms cubic-bezier(0.22,1,0.36,1)";
      node.style.willChange = "transform";
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);

      cleanupRef.current = () => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
        node.style.transform = "";
      };
    },
    [strength],
  );

  return ref;
}

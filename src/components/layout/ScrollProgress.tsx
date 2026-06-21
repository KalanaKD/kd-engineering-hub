import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-research)] to-[var(--accent-primary)]"
      style={{ scaleX }}
    />
  );
}

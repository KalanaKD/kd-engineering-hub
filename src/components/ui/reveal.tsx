import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutSmooth } from "@/lib/easings";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Trigger only when in view */
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: easeOutSmooth, delay }}
    >
      {children}
    </motion.div>
  );
}

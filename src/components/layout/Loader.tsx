import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WaveformPulse } from "@/components/waveform/WaveformPulse";
import logoAsset from "@/assets/kd-logo.png.asset.json";

const SESSION_KEY = "kd-loaded";

export function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem(SESSION_KEY) === "1";
    if (already) {
      setVisible(false);
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, reduce ? 150 : 1700);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)]"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[var(--accent-primary)]"
          >
            <WaveformPulse bars={36} height={64} gradient />
          </motion.div>

          <motion.img
            src={logoAsset.url}
            alt=""
            className="mt-6 h-20 w-20 object-contain"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="mt-6 flex gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { delayChildren: 1.1, staggerChildren: 0.1 } },
            }}
          >
            {["Engineer.", "Build.", "Evolve."].map((w) => (
              <motion.span
                key={w}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
              >
                {w}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

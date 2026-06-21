import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileDown } from "lucide-react";
import { MagneticButton, MagneticLink } from "@/components/ui/magnetic-button";
import { WaveformBackground } from "@/components/waveform/WaveformBackground";
import { easeOutSmooth } from "@/lib/easings";
import logoAsset from "@/assets/kd-logo.png.asset.json";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4";

function smoothScrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const waveY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Subtle pulse every 6s
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const i = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 6000);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-dvh w-full items-center overflow-hidden"
    >
      {/* Layer 1: background video */}
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {/* Layer 1b: dark overlay + vignette */}
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35),rgba(0,0,0,0.85))]"
        aria-hidden
      />
      <div className="absolute inset-0 -z-20 bg-[var(--background)]/55" aria-hidden />

      {/* Layer 2: noise */}
      <div className="bg-noise absolute inset-0 -z-10" aria-hidden />

      {/* Layer 3: animated grid */}
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />

      {/* Layer 4: waveform accent (parallax) */}
      <motion.div
        style={{ y: waveY, opacity }}
        className="absolute inset-0 -z-10"
      >
        <WaveformBackground className="opacity-70" />
      </motion.div>

      {/* Layer 5: content */}
      <motion.div
        style={{ y: contentY }}
        className="container-page relative z-10 pt-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: easeOutSmooth }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)]"
        >
          Engineering Excellence. Relentless Growth.
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } },
          }}
          className="font-display mt-6 text-[clamp(3rem,10vw,8rem)] leading-[0.95] text-foreground"
        >
          {["Build.", "Learn.", "Evolve."].map((word, i) => (
            <motion.span
              key={word}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: easeOutSmooth },
                },
              }}
              className="block"
              style={i === 2 ? { backgroundImage: "linear-gradient(90deg,var(--accent-primary),var(--accent-research))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } : undefined}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: easeOutSmooth }}
          className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Associate Software Engineer specializing in Java, Spring Boot, React,
          cloud deployments, and modern software architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6, ease: easeOutSmooth }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <MagneticButton variant="primary" onClick={() => smoothScrollTo("projects")}>
            View Projects
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticLink variant="secondary" href="/resume.pdf" download>
            <FileDown className="h-4 w-4" />
            Download Resume
          </MagneticLink>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/60 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          {["Full Stack Development", "Backend Engineering", "Research & Innovation"].map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[var(--accent-primary)]" />
              {s}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Micro logo with subtle pulse, bottom-right */}
      <motion.img
        src={logoAsset.url}
        alt=""
        aria-hidden
        className="absolute bottom-6 right-6 hidden h-10 w-10 object-contain opacity-60 md:block"
        animate={pulse ? { scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] } : {}}
        transition={{ duration: 1.2, ease: easeOutSmooth }}
      />
    </section>
  );
}

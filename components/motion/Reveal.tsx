"use client";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Tekst/blok schuift zacht omhoog in beeld.
export function Reveal({ children, delay = 0, className = "", now = false }: { children: React.ReactNode; delay?: number; className?: string; now?: boolean }) {
  const show = { opacity: 1, y: 0 };
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} {...(now ? { animate: show } : { whileInView: show })}
      viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

// Regels komen één voor één omhoog uit een masker (ruim genoeg onder voor g, j, p).
export function Lines({ lines, className = "", as: Tag = "h2", stagger = 0.08, style }:
  { lines: React.ReactNode[]; className?: string; as?: "h1" | "h2" | "p"; stagger?: number; style?: React.CSSProperties }) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag className={className} style={style} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pt-[0.16em] -mt-[0.16em] pb-[0.22em] -mb-[0.22em]">
          <motion.span className="block" variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}>
            {l}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

// Letters van een woord komen gestaffeld omhoog (voor RINK).
export function Letters({ text, className = "", delay = 0.15 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.h1 className={className} aria-label={text} initial="hidden" animate="show"
      transition={{ staggerChildren: 0.07, delayChildren: delay }}>
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden className="-mr-[0.12em] inline-block overflow-hidden pr-[0.12em] align-bottom">
          <motion.span className="inline-block"
            variants={{ hidden: { y: reduce ? 0 : "100%" }, show: { y: "0%", transition: { duration: 1.1, ease: EASE } } }}>
            {ch}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

// RINK kantelt in zijn geheel omhoog (flip vanaf de onderrand).
export function FlipIn({ text, className = "", delay = 0.15 }: { text: string; className?: string; delay?: number }) {
  return (
    <div style={{ perspective: "1200px" }}>
      <motion.h1 className={className} style={{ transformOrigin: "50% 100%" }}
        initial={{ rotateX: -95, opacity: 0, y: "8%" }} animate={{ rotateX: 0, opacity: 1, y: "0%" }}
        transition={{ duration: 1.2, ease: EASE, delay }}>
        {text}
      </motion.h1>
    </div>
  );
}

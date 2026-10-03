"use client";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.65, 0, 0.35, 1] as const;

// RINK "schrijft" zichzelf: eerst tekent de omtreklijn, daarna vult de letter zich.
export function WriteOn({ text = "RINK" }: { text?: string }) {
  const reduce = useReducedMotion();
  // viewBox op de verhoudingen van het woord; textLength laat het precies de breedte vullen.
  const W = 1000, H = 352, FS = 484;
  return (
    <h1 aria-label={text}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden>
        <motion.text
          x={-0.054 * FS} y={H} textLength={W + 0.054 * FS + 2} lengthAdjust="spacing"
          style={{ fontSize: FS, fontWeight: 700, fontFamily: "var(--font-sans)", fontVariationSettings: '"opsz" 32' }}
          fill="var(--color-ink)" stroke="var(--color-ink)" strokeWidth={2.2}
          strokeDasharray={3200} strokeLinejoin="round"
          initial={reduce ? false : { strokeDashoffset: 3200, fillOpacity: 0, strokeOpacity: 1 }}
          animate={{ strokeDashoffset: 0, fillOpacity: 1, strokeOpacity: 0 }}
          transition={{ strokeDashoffset: { duration: 2.4, ease: EASE, delay: 0.2 }, fillOpacity: { duration: 0.7, ease: "easeOut", delay: 1.9 }, strokeOpacity: { duration: 0.4, delay: 2.6 } }}
        >
          {text}
        </motion.text>
      </svg>
    </h1>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Achtervoegsel (+) in cobalt. Getal telt op van 0 naar het eindgetal zodra het in beeld komt (één keer).
export function CountUp({ to, suffix = "", duration = 1.8, delay = 0, settle = false }: { to: number; suffix?: string; duration?: number; delay?: number; settle?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(to); setDone(true); return; }
    const c = animate(0, to, { duration, delay, ease: EASE, onUpdate: (v) => setN(Math.round(v)), onComplete: () => setDone(true) });
    return () => c.stop();
  }, [inView, reduce, to, duration, delay]);
  return <span ref={ref} className={`tabular-nums ${settle ? `transition-colors duration-700 ${done ? "text-ink" : "text-accent"}` : ""}`} aria-label={`${to}${suffix}`}><span aria-hidden>{n}<span className="text-accent">{suffix}</span></span></span>;
}

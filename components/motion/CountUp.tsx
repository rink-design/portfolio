"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Achtervoegsel (+) in cobalt. Getal telt op van 0 naar het eindgetal zodra het in beeld komt (één keer).
export function CountUp({ to, suffix = "", duration = 1.8, delay = 0 }: { to: number; suffix?: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(to); return; }
    const c = animate(0, to, { duration, delay, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to, duration, delay]);
  return <span ref={ref} className="tabular-nums" aria-label={`${to}${suffix}`}><span aria-hidden>{n}<span className="text-accent">{suffix}</span></span></span>;
}

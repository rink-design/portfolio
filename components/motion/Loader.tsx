"use client";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { LOGO_PATHS, LOGO_VIEWBOX as V } from "../logo-paths";
import { R_STROKES, R_WRITE_END } from "../r-strokes";

const INK_X = 76.5; // waar I-N-K begint

// Laadscherm: eerst wordt de sierlijke R écht geschreven — pennenstreken vanaf de uiteinden (boven en onder
// tegelijk), die de vector onthullen. Daarna vult I-N-K zich van links naar rechts terwijl de site laadt.
// Het logo staat exact op de plek van het logo onderaan de header.
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [skip, setSkip] = useState(false);
  const progress = useMotionValue(0);
  // INK vult pas als de R grotendeels geschreven is
  const fillW = useTransform(progress, [55, 100], [0, V.x + V.w + 2 - INK_X], { clamp: true });
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));

  // Eén keer per bezoek.
  useLayoutEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("rink-loaded") === "1"; } catch {}
    if (seen) { setSkip(true); setShow(false); done(); }
  }, []);

  // Voortgang: loopt mee met het echte laden, minimaal ± 2,2 s.
  useEffect(() => {
    if (!show || skip) return;
    const min = reduce ? 300 : Math.round((R_WRITE_END + 1.1) * 1000);
    const start = performance.now();
    const ctrl = animate(progress, 88, { duration: min / 1000, ease: [0.35, 0, 0.25, 1] });
    let finished = false;
    const finish = () => {
      if (finished) return; finished = true;
      const wait = Math.max(0, min - (performance.now() - start));
      setTimeout(() => {
        ctrl.stop();
        animate(progress, 100, { duration: 0.45, ease: "easeOut" }).then(() => {
          try { sessionStorage.setItem("rink-loaded", "1"); } catch {}
          setTimeout(() => { setShow(false); done(); }, 250);
        });
      }, wait);
    };
    if (document.readyState === "complete") finish(); else window.addEventListener("load", finish, { once: true });
    const safety = setTimeout(finish, 6000);
    return () => { clearTimeout(safety); window.removeEventListener("load", finish); };
  }, [show, skip, reduce, progress]);

  if (skip) return null; // tweede bezoek: meteen weg, geen animatie

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="loader" className="rink-loader fixed inset-0 z-[70] flex flex-col justify-end bg-paper"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }} initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <div className="wrap pb-5 md:pb-6">
            <svg viewBox={`${V.x} ${V.y} ${V.w} ${V.h}`} className="block h-auto w-full" aria-label="RINK — loading">
              <defs>
                {/* Masker voor de R: dikke pennenstreken langs de middenlijnen */}
                <mask id="r-write" maskUnits="userSpaceOnUse" x={V.x - 4} y={V.y - 4} width={V.w + 8} height={V.h + 8}>
                  {R_STROKES.map((s) => (
                    <motion.path key={s.id} d={s.d} fill="none" stroke="#fff" strokeWidth={s.w} strokeLinecap="round" strokeLinejoin="round"
                      initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ pathLength: { duration: s.dur, delay: 0.2 + s.delay, ease: [0.45, 0.05, 0.25, 1] }, opacity: { duration: 0.01, delay: 0.2 + s.delay } }} />
                  ))}
                </mask>
                <clipPath id="ink-fill"><motion.rect x={INK_X} y={V.y - 2} height={V.h + 4} style={{ width: fillW }} /></clipPath>
              </defs>
              {/* Lichte grondvorm: geen lijn, alleen vlak */}
              {LOGO_PATHS.map((d, i) => <path key={`g${i}`} d={d} fill="var(--color-paper-2)" />)}
              {/* De R, geschreven */}
              <path d={LOGO_PATHS[0]} fill="var(--color-accent)" mask="url(#r-write)" />
              {/* I-N-K, vult mee met het laden */}
              <g clipPath="url(#ink-fill)">
                {LOGO_PATHS.slice(1).map((d, i) => <path key={`f${i}`} d={d} fill="var(--color-accent)" />)}
              </g>
            </svg>
            {/* Onzichtbare labelregel: zelfde hoogte als Brand · Packaging · Digital in de header */}
            <div className="t-label invisible mt-5" aria-hidden>Brand</div>
          </div>
          <div className="wrap t-label absolute inset-x-0 top-5 flex justify-between">
            <span>Design by RINK</span>
            <motion.span className="tabular-nums">{counter}</motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function done() {
  document.documentElement.dataset.loaded = "1";
  window.dispatchEvent(new Event("rink:loaded"));
}

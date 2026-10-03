"use client";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { LOGO_PATHS, LOGO_VIEWBOX as V } from "../logo-paths";

// Laadscherm: het RINK-logo vult zich van onder naar boven terwijl de site laadt, en schuift dan weg.
// Het logo staat exact op de plek van het logo bovenaan de home.
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [skip, setSkip] = useState(false);
  const progress = useMotionValue(0);
  const fillY = useTransform(progress, [0, 100], [V.y + V.h + 1, V.y - 1]);
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
    const min = reduce ? 300 : 2200;
    const start = performance.now();
    const ctrl = animate(progress, 88, { duration: min / 1000, ease: [0.45, 0, 0.25, 1] });
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
        <motion.div key="loader" className="rink-loader fixed inset-0 z-[70] bg-paper"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }} initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <div className="wrap pt-24 md:pt-28">
            <svg viewBox={`${V.x} ${V.y} ${V.w} ${V.h}`} className="block h-auto w-full" aria-label="RINK — loading">
              <defs>
                <clipPath id="rink-fill"><motion.rect x={V.x - 2} width={V.w + 4} height={V.h + 4} style={{ y: fillY }} /></clipPath>
              </defs>
              {/* Lichte grondvorm: geen lijn, alleen vlak */}
              {LOGO_PATHS.map((d, i) => <path key={`g${i}`} d={d} fill="var(--color-paper-2)" />)}
              {/* Vulling die meestijgt met het laden */}
              <g clipPath="url(#rink-fill)">
                {LOGO_PATHS.map((d, i) => <path key={`f${i}`} d={d} fill="var(--color-ink)" />)}
              </g>
            </svg>
          </div>
          <div className="wrap t-label absolute inset-x-0 bottom-5 flex justify-between">
            <span>RINK Design</span>
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

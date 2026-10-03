"use client";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const EASE = [0.65, 0, 0.35, 1] as const;
const W = 1000, H = 352, FS = 484;
const TEXT = "RINK";

// Laadscherm: RINK schrijft zich letter voor letter (R → I → N → K), vult zich van onder naar boven
// terwijl de site laadt, en schuift dan weg. RINK staat exact op de plek van de hero.
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [skip, setSkip] = useState(false);
  const [xs, setXs] = useState<number[] | null>(null);
  const measure = useRef<SVGTextElement>(null);
  const progress = useMotionValue(0);
  const fillY = useTransform(progress, [0, 100], [H + 10, -20]);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));

  // Eén keer per bezoek.
  useLayoutEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("rink-loaded") === "1"; } catch {}
    if (seen) { setSkip(true); setShow(false); done(); }
  }, []);

  // Letterposities meten zodra het font er is.
  useEffect(() => {
    if (!show) return;
    document.fonts.ready.then(() => {
      const t = measure.current; if (!t) return;
      setXs(TEXT.split("").map((_, i) => t.getStartPositionOfChar(i).x));
    });
  }, [show]);

  // Voortgang: loopt mee met het echte laden, minimaal ± 2,6 s zodat het schrijven af is.
  useEffect(() => {
    if (!show || !xs) return;
    const min = reduce ? 300 : 2600;
    const start = performance.now();
    const ctrl = animate(progress, 88, { duration: min / 1000, ease: [0.7, 0, 0.35, 1] });
    const finish = () => {
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
  }, [show, xs, reduce, progress]);

  const perLetter = 2.2 / TEXT.length;
  if (skip) return null; // tweede bezoek: meteen weg, geen animatie

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="loader" className="rink-loader fixed inset-0 z-[70] bg-paper"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }} initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: skip ? 0 : 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <div className="wrap pt-[22vh] md:pt-[26vh]">
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-label="RINK — loading">
              <defs>
                <clipPath id="rink-fill"><motion.rect x={-50} width={W + 100} height={H + 60} style={{ y: fillY }} /></clipPath>
              </defs>
              {/* Onzichtbare meet-tekst: zelfde maat als de hero */}
              <text ref={measure} x={-0.054 * FS} y={H} textLength={W + 0.054 * FS + 2} lengthAdjust="spacing"
                style={{ fontSize: FS, fontWeight: 700, fontFamily: "var(--font-sans)", fontVariationSettings: '"opsz" 32' }}
                fill="none" opacity={0}>{TEXT}</text>
              {xs && TEXT.split("").map((ch, i) => (
                <g key={i}>
                  {/* Schrijflijn — R eerst, dan doorsturen naar I, N, K */}
                  <motion.text x={xs[i]} y={H} fill="none" stroke="var(--color-ink)" strokeWidth={2.2} strokeLinejoin="round"
                    style={{ fontSize: FS, fontWeight: 700, fontFamily: "var(--font-sans)", fontVariationSettings: '"opsz" 32' }}
                    strokeDasharray={1800}
                    initial={{ strokeDashoffset: reduce ? 0 : 1800 }} animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: perLetter * 1.6, ease: EASE, delay: 0.15 + i * perLetter * 0.8 }}>
                    {ch}
                  </motion.text>
                  {/* Vulling die meestijgt met het laden */}
                  <text x={xs[i]} y={H} clipPath="url(#rink-fill)" fill="var(--color-ink)"
                    style={{ fontSize: FS, fontWeight: 700, fontFamily: "var(--font-sans)", fontVariationSettings: '"opsz" 32' }}>
                    {ch}
                  </text>
                </g>
              ))}
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

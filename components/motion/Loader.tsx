"use client";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LOGO_PATHS, LOGO_VIEWBOX as V } from "../logo-paths";
import { INK_END, PEN_SEGS, R_WRITE_END, inkAt, penAt } from "../r-pen";
import { R_REGIONS } from "../r-regions";

const INK_X = 76.5; // waar I-N-K begint
const INK_W = V.x + V.w + 2 - INK_X;
const DELAY = 0.25; // rust voordat de pen begint

// Laadscherm: de sierlijke R wordt in kobalt geschreven met één doorgaande pen (components/r-pen.ts).
// Elke streek onthult alleen zijn eigen gebied van de letter (components/r-regions.ts), zodat er geen klontjes
// ontstaan waar streken elkaar raken. Wat nog niet geschreven is, is achtergrond. I-N-K vult van links naar rechts
// als vervolg van de pen (los van het laden; de teller loopt wel mee met het laden). Tot slot vervaagt het scherm: het logo gaat over in het witte logo van de header,
// dat er exact onder staat.
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [skip, setSkip] = useState(false);
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const segRefs = useRef<Record<string, SVGPathElement | null>>({});
  const regionsRef = useRef<SVGGElement>(null);
  const fullRef = useRef<SVGPathElement>(null);
  const inkRef = useRef<SVGRectElement>(null);

  // Eén keer per bezoek.
  useLayoutEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("rink-loaded") === "1"; } catch {}
    if (seen) { setSkip(true); setShow(false); done(); }
  }, []);

  // De pen: tekent per beeld de streken in het masker.
  useEffect(() => {
    if (!show || skip) return;
    let raf = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const t = reduce ? 99 : (now - start) / 1000 - DELAY;
      const d = penAt(t);
      PEN_SEGS.forEach((s) => {
        const el = segRefs.current[s.key]; if (!el) return;
        el.setAttribute("stroke-dashoffset", String(s.len - d[s.key]));
        el.setAttribute("opacity", d[s.key] > 0.05 ? "1" : "0");
      });
      inkRef.current?.setAttribute("width", String(inkAt(t) * INK_W));
      const rDone = t >= R_WRITE_END;
      // klaar: de hele R als één vorm (geen naadjes tussen de gebieden)
      fullRef.current?.setAttribute("opacity", rDone ? "1" : "0");
      if (regionsRef.current) regionsRef.current.style.visibility = rDone ? "hidden" : "visible";
      if (t < Math.max(R_WRITE_END, INK_END)) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [show, skip, reduce]);

  // Voortgang: loopt mee met het echte laden, minimaal ± 2,8 s.
  useEffect(() => {
    if (!show || skip) return;
    const min = reduce ? 300 : Math.round((DELAY + Math.max(R_WRITE_END, INK_END) + 0.3) * 1000);
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
          setTimeout(() => { setShow(false); done(); }, 150);
        });
      }, wait);
    };
    if (document.readyState === "complete") finish(); else window.addEventListener("load", finish, { once: true });
    const safety = setTimeout(finish, 6000);
    return () => { clearTimeout(safety); window.removeEventListener("load", finish); };
  }, [show, skip, reduce, progress]);

  if (skip) return null; // tweede bezoek: meteen weg, geen animatie

  const pad = { x: V.x - 6, y: V.y - 6, width: V.w + 12, height: V.h + 12 };
  return (
    <AnimatePresence>
      {show && (
        // Vervagen: kobalt logo gaat over in het witte header-logo eronder, het licht vlak in de video.
        <motion.div key="loader" className="rink-loader fixed inset-0 z-[70] flex flex-col justify-end bg-paper"
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}>
          <div className="wrap pb-5 md:pb-6">
            <svg viewBox={`${V.x} ${V.y} ${V.w} ${V.h}`} className="block h-auto w-full overflow-visible" aria-label="RINK — loading">
              <defs>
                <clipPath id="r-shape"><path d={LOGO_PATHS[0]} /></clipPath>
                {PEN_SEGS.map((s) => (
                  <mask key={s.key} id={`pen-${s.key}`} maskUnits="userSpaceOnUse" {...pad}>
                    <rect {...pad} fill="#000" />
                    <path ref={(el) => { segRefs.current[s.key] = el; }} d={"M" + s.pts.map((p) => p.join(",")).join(" L")}
                      fill="none" stroke="#fff" strokeWidth={s.w + 3} strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray={`${s.len} ${s.len + 20}`} strokeDashoffset={s.len} opacity={0} />
                  </mask>
                ))}
                <clipPath id="ink-fill"><rect ref={inkRef} x={INK_X} y={V.y - 2} height={V.h + 4} width={0} /></clipPath>
              </defs>
              {/* De R: elk gebied wordt onthuld door zijn eigen pennenstreek */}
              <g ref={regionsRef} clipPath="url(#r-shape)" fill="var(--color-accent)">
                {PEN_SEGS.map((s) => <path key={s.key} d={R_REGIONS[s.id]} mask={`url(#pen-${s.key})`} />)}
              </g>
              <path ref={fullRef} d={LOGO_PATHS[0]} fill="var(--color-accent)" opacity={0} />
              {/* I-N-K, vult als vervolg van de pen */}
              <g clipPath="url(#ink-fill)" fill="var(--color-accent)">
                {LOGO_PATHS.slice(1).map((d, i) => <path key={i} d={d} />)}
              </g>
            </svg>
            {/* Onzichtbare labelregel: zelfde hoogte als Brand · Packaging · Digital in de header */}
            <div className="t-label invisible mt-5" aria-hidden>Brand</div>
          </div>
          <div className="wrap t-label absolute inset-x-0 top-5 flex justify-between">
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

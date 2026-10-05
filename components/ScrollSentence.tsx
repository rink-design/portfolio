"use client";
import { useEffect, useRef } from "react";

// Zin loopt woord voor woord mee met scrollen: vaag → cobalt (huidige woorden) → zwart (gelezen).
export function ScrollSentence({ text }: { text: string }) {
  const track = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const w = Array.from(el.querySelectorAll<HTMLElement>(".sw"));
    // Mobiel: de ruimte tussen het einde van de zin en de foto is precies 56 px (zelfde als de rest van About).
    const st = el.firstElementChild as HTMLElement, about = el.closest("section");
    const pull = () => {
      const first = st.firstElementChild as HTMLElement, last = st.lastElementChild as HTMLElement;
      const contentH = last.getBoundingClientRect().bottom - first.getBoundingClientRect().top;
      about?.style.setProperty("--pull", `${Math.round((st.offsetHeight - contentH) / 2 - 56)}px`);
    };
    pull();
    const ro = new ResizeObserver(pull); ro.observe(st);
    document.fonts?.ready.then(pull);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = reduce ? 1 : Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      const pos = reduce ? w.length + 3 : p * (w.length + 2) - 0.5;
      w.forEach((s, i) => {
        s.classList.toggle("sw-read", pos > i + 2);
        s.classList.toggle("sw-cur", pos >= i && pos <= i + 2);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={track} className="relative h-[240vh] md:h-[280vh]">
      <div className="wrap pointer-events-none sticky top-0 flex h-svh flex-col justify-center gap-6">
        <p className="t-label text-ink-2">About me</p>
        <p className="t-h1 max-w-[16ch] !text-[clamp(34px,9.4vw,96px)] !leading-[0.96] md:max-w-[22ch] md:!text-[clamp(40px,5.4vw,96px)]" aria-label={text}>
          {words.map((w, i) => <span key={i} aria-hidden><span className="sw">{w}</span>{i < words.length - 1 && " "}</span>)}
        </p>
      </div>
    </div>
  );
}

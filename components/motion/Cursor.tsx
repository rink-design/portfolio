"use client";
import { useEffect, useRef } from "react";

// Rekblok: cobalt vierkantje dat de muis volgt en uitrekt in de bewegingsrichting.
// Boven werk ([data-cursor]) groot met pijl, boven links/knoppen middelgroot en omkeren. Alleen met muis, niet op touch.
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!, root = document.documentElement;
    root.classList.add("has-cursor");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const P = { x: -100, y: -100, in: false }, s = { x: -100, y: -100, sz: 18 };
    let mode: "work" | "link" | null = null, raf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!P.in) { s.x = e.clientX; s.y = e.clientY; }
      P.x = e.clientX; P.y = e.clientY; P.in = true;
      const t = e.target as HTMLElement;
      mode = t.closest("[data-cursor]") ? "work" : t.closest("a,button,[role=menuitem]") ? "link" : null;
    };
    const leave = () => { P.in = false; };
    const loop = () => {
      const ox = s.x, oy = s.y, k = reduce ? 1 : 0.25;
      s.x += (P.x - s.x) * k; s.y += (P.y - s.y) * k;
      s.sz += ((mode === "work" ? 80 : mode === "link" ? 34 : 18) - s.sz) * (reduce ? 1 : 0.18);
      const vx = s.x - ox, vy = s.y - oy, sp = reduce ? 0 : Math.min(1.2, Math.hypot(vx, vy) / 40), ang = Math.atan2(vy, vx);
      el.style.width = el.style.height = `${s.sz}px`;
      el.style.transform = `translate(${s.x - s.sz / 2}px,${s.y - s.sz / 2}px) rotate(${ang}rad) scale(${1 + sp},${1 - sp * 0.45}) rotate(${-ang}rad)`;
      el.style.opacity = P.in ? "1" : "0";
      el.style.mixBlendMode = mode === "link" ? "difference" : "normal";
      el.dataset.mode = mode ?? "";
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => { root.classList.remove("has-cursor"); cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <div ref={ref} aria-hidden className="rink-cursor pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center bg-accent text-[26px] font-semibold leading-none text-paper opacity-0">
      <span className="rink-cursor-arrow">↗</span>
    </div>
  );
}

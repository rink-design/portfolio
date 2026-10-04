"use client";
import { useEffect, useRef } from "react";

// Rekblok: klein cobalt vierkantje dat strak volgt en licht rekt in de bewegingsrichting.
// Laat cobalt pixels achter die wegvallen, krimpen en verdwijnen (meer pixels bij sneller bewegen).
// Boven werk ([data-cursor]) een blokje met ↗, boven links/knoppen omkeren.
// Niet zichtbaar tijdens het laadscherm; alleen met muis, niet op touch.
type Px = { x: number; y: number; vx: number; vy: number; s: number; life: number };

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null), cvs = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!, cv = cvs.current!, ctx = cv.getContext("2d")!, root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = getComputedStyle(root).getPropertyValue("--color-accent").trim() || "#2d3bff";
    const P = { x: -100, y: -100, in: false }, s = { x: -100, y: -100, sz: 10 };
    const px: Px[] = [];
    let mode: "work" | "link" | null = null, raf = 0, carry = 0;

    const fit = () => {
      const d = Math.min(2, window.devicePixelRatio || 1);
      cv.width = innerWidth * d; cv.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    fit();
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!P.in) { s.x = e.clientX; s.y = e.clientY; }
      P.x = e.clientX; P.y = e.clientY; P.in = true;
      const t = e.target as HTMLElement;
      mode = t.closest("[data-cursor]") ? "work" : t.closest("a,button,[role=menuitem]") ? "link" : null;
    };
    const leave = () => { P.in = false; };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const loading = !!document.querySelector(".rink-loader");
      root.classList.toggle("has-cursor", !loading);
      const ox = s.x, oy = s.y, k = reduce ? 1 : 0.4;
      s.x += (P.x - s.x) * k; s.y += (P.y - s.y) * k;
      s.sz += ((mode === "work" ? 26 : mode === "link" ? 16 : 10) - s.sz) * (reduce ? 1 : 0.25);
      const vx = s.x - ox, vy = s.y - oy, speed = Math.hypot(vx, vy);
      const sp = reduce ? 0 : Math.min(0.6, speed / 60), ang = Math.atan2(vy, vx);
      el.style.width = el.style.height = `${s.sz}px`;
      el.style.transform = `translate(${s.x - s.sz / 2}px,${s.y - s.sz / 2}px) rotate(${ang}rad) scale(${1 + sp},${1 - sp * 0.4}) rotate(${-ang}rad)`;
      el.style.opacity = P.in && !loading ? "1" : "0";
      el.style.mixBlendMode = mode === "link" ? "difference" : "normal";
      el.dataset.mode = mode ?? "";

      // Pixels: aantal hangt af van snelheid
      if (!reduce && P.in && !loading) {
        carry += Math.min(4, speed / 9);
        while (carry >= 1) {
          carry -= 1;
          const a = Math.random() * Math.PI * 2;
          px.push({ x: s.x + (Math.random() - 0.5) * 8, y: s.y + (Math.random() - 0.5) * 8, vx: -vx * 0.08 + Math.cos(a) * 0.4, vy: -vy * 0.08 + Math.sin(a) * 0.4, s: 2 + Math.round(Math.random() * 3), life: 1 });
        }
      }
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.fillStyle = accent;
      for (let i = px.length - 1; i >= 0; i--) {
        const p = px[i];
        p.vy += 0.06; p.x += p.vx; p.y += p.vy; p.life -= 0.022;
        if (p.life <= 0) { px.splice(i, 1); continue; }
        const z = Math.max(1, Math.round(p.s * p.life));
        ctx.globalAlpha = Math.min(1, p.life * 1.4);
        ctx.fillRect(Math.round(p.x - z / 2), Math.round(p.y - z / 2), z, z); // hele pixels: scherp
      }
      ctx.globalAlpha = 1;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("resize", fit);
    document.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      root.classList.remove("has-cursor"); cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move); window.removeEventListener("resize", fit); document.removeEventListener("mouseleave", leave);
    };
  }, []);
  return (
    <>
      <canvas ref={cvs} aria-hidden className="pointer-events-none fixed inset-0 z-[79] hidden h-screen w-screen [@media(pointer:fine)]:block" />
      <div ref={ref} aria-hidden className="rink-cursor pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center bg-accent text-[15px] font-semibold leading-none text-paper opacity-0">
        <span className="rink-cursor-arrow">↗</span>
      </div>
    </>
  );
}

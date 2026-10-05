"use client";
import { useEffect, useRef } from "react";

// Uitgeknipt portret op een cobalt-verloop. Bij hover (of vinger erop) flitsen alle beelden van de site
// willekeurig achter je ("bam bam bam"). Zet FLASH_BW op false om in kleur te blijven.
const FLASH_BW = true;
const CUT = "/about/portret-uitgeknipt-025f121a.webp";

export function AboutPortrait() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = box.current!, c = cv.current!, ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(1.6, devicePixelRatio || 1);
    let w = 2, on = 0, hover = false, visible = false, raf = 0, tt = 0, cur: HTMLImageElement | undefined, bag: HTMLImageElement[] = [], last = performance.now();
    const pool: HTMLImageElement[] = [];
    let loading = false;

    // Alle beelden (klein, 480 px) laden zodra About bijna in beeld komt.
    const load = () => {
      if (loading) return; loading = true;
      fetch("/flash/manifest.json").then((r) => r.json()).then((names: string[]) => {
        const q = [...names].sort(() => Math.random() - 0.5);
        const next = () => {
          const name = q.pop(); if (!name) return;
          const i = new Image(); i.decoding = "async";
          i.onload = () => { pool.push(i); next(); }; i.onerror = next; i.src = `/flash/${name}`;
        };
        for (let k = 0; k < 4; k++) next();
      }).catch(() => { loading = false; });
    };

    // Elk beeld vult het hele vierkant (uitgerekt tot de rand, gecentreerd).
    const cover = (im: HTMLImageElement) => {
      const r = Math.max(w / im.naturalWidth, w / im.naturalHeight), dw = im.naturalWidth * r, dh = im.naturalHeight * r;
      ctx.drawImage(im, (w - dw) / 2, (w - dh) / 2, dw, dh);
    };
    // Eén beeld per flits; alles komt één keer aan bod voordat het opnieuw begint.
    const pick = () => {
      if (!bag.length) { bag = [...pool].sort(() => Math.random() - 0.5); if (bag[bag.length - 1] === cur && bag.length > 1) bag.unshift(bag.pop()!); }
      return bag.pop();
    };
    const gradient = (t: number) => {
      const g = ctx.createRadialGradient(w * (0.5 + 0.08 * Math.sin(t * 0.4)), w * 1.05, 0, w * 0.5, w * 0.95, w);
      g.addColorStop(0, "#6a76ff"); g.addColorStop(0.45, "#2d3bff"); g.addColorStop(1, "#10156f");
      ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(0, 0, w, w);
    };
    const size = () => { w = Math.max(2, Math.round(el.getBoundingClientRect().width * dpr)); c.width = c.height = w; draw(performance.now(), 0); };

    const draw = (now: number, dt: number) => {
      gradient(now / 1000);
      if (on > 0.04 && pool.length) {
        tt -= dt;
        if (tt <= 0) { tt = 0.11; cur = pick() ?? cur; }
        if (cur) { ctx.globalAlpha = Math.min(1, on * 2); cover(cur); ctx.globalAlpha = 1; }
      }
      if (img.current && FLASH_BW) img.current.style.filter = on > 0.01 ? `grayscale(${on.toFixed(2)}) contrast(${(1 + 0.2 * on).toFixed(2)})` : "";
    };
    const loop = (now: number) => {
      raf = 0; if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      on += ((hover ? 1 : 0) - on) * Math.min(1, dt * (hover ? 10 : 6));
      draw(now, dt);
      if (hover || on > 0.01) raf = requestAnimationFrame(loop); else { on = 0; draw(now, 0); }
    };
    const kick = () => { if (!raf && visible && !reduce) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    const set = (v: boolean) => { hover = v; if (v) load(); kick(); };
    const enter = () => set(true), leave = () => set(false);
    const up = (e: PointerEvent) => { if (e.pointerType !== "mouse") set(false); };

    size();
    const ro = new ResizeObserver(size); ro.observe(el);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { rootMargin: "0px" });
    io.observe(el);
    const pre = new IntersectionObserver(([e]) => { if (e.isIntersecting) { load(); pre.disconnect(); } }, { rootMargin: "700px 0px" });
    pre.observe(el);
    el.addEventListener("pointerenter", enter); el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerdown", enter); el.addEventListener("pointerup", up); el.addEventListener("pointercancel", leave);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); pre.disconnect(); el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave); el.removeEventListener("pointerdown", enter); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", leave); };
  }, []);

  return (
    <figure data-mid="photo" className="col-span-4 md:sticky md:top-20 md:col-span-5 md:self-start">
      <div ref={box} className="relative aspect-square cursor-crosshair touch-pan-y overflow-hidden bg-accent">
        <canvas ref={cv} aria-hidden className="absolute inset-0 block h-full w-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={img} src={CUT} alt="Portrait of Rinke van de Rakt" loading="lazy" className="absolute inset-0 block h-full w-full object-contain object-bottom" />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between gap-3 p-4 text-paper">
          <span className="t-label">Rinke van de Rakt</span>
          <span className="t-label opacity-80">Amsterdam</span>
        </figcaption>
      </div>
    </figure>
  );
}

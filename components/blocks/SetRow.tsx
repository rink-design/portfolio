"use client";
import { useEffect, useRef, useState } from "react";
import type { Item } from "@/lib/media";
import { Visual } from "./Visual";
import { toggleZoom } from "./zoom";

// Bijna-vierkant (zoals de asbak) = vierkant en vullend; echt staand of liggend = eigen verhouding. Alles even hoog.
const ratioOf = (it: Item) => (Math.abs(it.w / it.h - 1) < 0.15 ? "1/1" : `${it.w}/${it.h}`);

// Set: even hoge tegels op een rij; slepen (cursor 'Drag') met een dunne voortgangslijn; klik = groter.
export function SetRow({ items, alts, size, overlap }: { items: Item[]; alts: string[]; size?: "large"; overlap?: boolean }) {
  const row = useRef<HTMLDivElement>(null);
  const [over, setOver] = useState(false);
  const [bar, setBar] = useState({ w: 100, l: 0 });
  const moved = useRef(false);

  useEffect(() => {
    const el = row.current; if (!el) return;
    const upd = () => {
      const o = el.scrollWidth > el.clientWidth + 2; setOver(o);
      const w = Math.max(8, (el.clientWidth / el.scrollWidth) * 100);
      setBar({ w, l: (el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)) * (100 - w) });
    };
    upd();
    el.addEventListener("scroll", upd, { passive: true });
    const ro = new ResizeObserver(upd); ro.observe(el);
    // muis: slepen pas na 5 px, zodat een klik een klik blijft
    let down = false, cap = false, x0 = 0, s0 = 0;
    const pd = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; cap = false; moved.current = false; x0 = e.clientX; s0 = el.scrollLeft; };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      if (!cap && Math.abs(e.clientX - x0) > 5) { cap = true; moved.current = true; el.setPointerCapture(e.pointerId); }
      if (cap) el.scrollLeft = s0 - (e.clientX - x0);
    };
    const pu = () => { down = false; cap = false; setTimeout(() => (moved.current = false), 0); };
    el.addEventListener("pointerdown", pd); el.addEventListener("pointermove", pm);
    el.addEventListener("pointerup", pu); el.addEventListener("pointercancel", pu);
    return () => { ro.disconnect(); el.removeEventListener("scroll", upd); el.removeEventListener("pointerdown", pd); el.removeEventListener("pointermove", pm); el.removeEventListener("pointerup", pu); el.removeEventListener("pointercancel", pu); };
  }, []);

  return (
    <div>
      <div ref={row} data-cursor={over ? "Drag" : undefined}
        className={`set-row -mx-[var(--gutter)] flex select-none overflow-x-auto overscroll-x-contain px-[var(--gutter)] ${overlap ? "is-overlap items-end" : "gap-[var(--gap)]"} ${size === "large" ? "is-large" : ""}`}>
        {items.map((it, i) => (
          <button key={it.src} type="button" aria-label={`${alts[i]} — enlarge`}
            onClick={(e) => { if (!moved.current) toggleZoom(e.currentTarget); }}
            className="set-tile relative shrink-0 cursor-[inherit]" style={{ ["--r" as string]: ratioOf(it), zIndex: overlap ? items.length - i : undefined }}>
            <Visual it={it} alt={alts[i]} ratio={ratioOf(it)} sizes="(min-width: 768px) 30vw, 62vw" className="pointer-events-none !bg-transparent" />
          </button>
        ))}
      </div>
      {over && <div className="relative mt-4 h-px bg-line"><i className="absolute -top-px h-[2px] bg-ink" style={{ width: `${bar.w}%`, left: `${bar.l}%` }} /></div>}
    </div>
  );
}

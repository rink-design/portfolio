"use client";
import { useEffect } from "react";

// Alleen op touch (geen hover): wat in het midden van het scherm staat, licht op.
export function MidFocus({ rootId }: { rootId: string }) {
  useEffect(() => {
    if (!matchMedia("(hover: none)").matches) return;
    const root = document.getElementById(rootId);
    if (!root) return;
    root.classList.add("mid-js");
    let raf = 0;
    const tick = () => {
      raf = 0;
      const mid = innerHeight / 2;
      const groups = new Map<string, HTMLElement[]>();
      root.querySelectorAll<HTMLElement>("[data-mid]").forEach((e) => {
        const g = e.dataset.mid!;
        groups.set(g, [...(groups.get(g) ?? []), e]);
      });
      groups.forEach((els, g) => {
        let best: HTMLElement | null = null, bd = Infinity;
        els.forEach((e) => {
          const r = e.getBoundingClientRect();
          const d = g === "photo" ? (r.top < mid && r.bottom > mid ? 0 : Infinity) : Math.abs(r.top + r.height / 2 - mid);
          if (d < bd) { bd = d; best = e; }
        });
        els.forEach((e) => { if (e === best && bd < innerHeight * 0.3) e.setAttribute("data-on", ""); else e.removeAttribute("data-on"); });
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { root.classList.remove("mid-js"); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [rootId]);
  return null;
}

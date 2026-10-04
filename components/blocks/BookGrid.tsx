"use client";
import Image from "next/image";
import { useRef } from "react";
import type { Item } from "@/lib/media";
import { closeZoom, openZoom, toggleZoom, zoomEl, zoomedFrom } from "./zoom";

// Brandbook: alle pagina's in een overzicht. Muis erover = pagina groeit uit zijn plek groot over de rest; eraf = terug.
// Op touch (geen hover): tik = groter.
export function BookGrid({ items, alts }: { items: Item[]; alts: string[] }) {
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (
    <div className="grid grid-cols-2 gap-[var(--gap)] md:grid-cols-3">
      {items.map((it, i) => (
        <button key={it.src} type="button" aria-label={`${alts[i]} — enlarge`}
          onPointerEnter={(e) => { if (e.pointerType !== "mouse") return; const el = e.currentTarget; t.current = setTimeout(() => openZoom(el, true), 120); }}
          onPointerLeave={(e) => {
            if (t.current) clearTimeout(t.current);
            const z = zoomEl();
            if (e.pointerType === "mouse" && zoomedFrom() === e.currentTarget && !(z && z.contains(e.relatedTarget as Node))) closeZoom();
          }}
          onClick={(e) => { if (window.matchMedia("(hover: none)").matches) toggleZoom(e.currentTarget); }}
          data-hover="zoom" className="relative block cursor-zoom-in overflow-hidden" style={{ aspectRatio: `${it.w}/${it.h}` }}>
          <Image src={it.src} alt={alts[i]} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
        </button>
      ))}
    </div>
  );
}

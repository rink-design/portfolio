"use client";
import type { Item } from "@/lib/media";
import { Visual } from "./Visual";
import { toggleZoom } from "./zoom";

// Archief: alles even groot, vierkant en vullend, raster van 3, onder elkaar. Klik = groter.
export function ArchiveGrid({ items, alts }: { items: Item[]; alts: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-[var(--gap)] md:grid-cols-3">
      {items.map((it, i) => (
        <button key={it.src} type="button" aria-label={`${alts[i]} — enlarge`} onClick={(e) => toggleZoom(e.currentTarget)} className="block cursor-zoom-in">
          <Visual it={it} alt={alts[i]} ratio="1/1" sizes="(min-width: 768px) 33vw, 50vw" className="pointer-events-none !bg-transparent" />
        </button>
      ))}
    </div>
  );
}

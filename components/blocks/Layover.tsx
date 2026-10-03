import type { Item } from "@/lib/media";
import { Visual } from "./Visual";

// Beelden schuiven bij het scrollen over elkaar heen, als een stapel kaarten.
export function Layover({ items, alt }: { items: Item[]; alt: (i: number) => string }) {
  return (
    <div className="wrap">
      {items.map((it, i) => (
        <div key={it.src} className="sticky top-[10vh] flex h-[80vh] items-center justify-center md:top-[8vh] md:h-[84vh]"
          style={{ zIndex: i + 1 }}>
          <div className="relative h-full w-full overflow-hidden bg-white shadow-[0_-30px_60px_-30px_rgba(20,19,17,0.25)]">
            <div className="relative mx-auto h-full w-full max-w-[1400px]">
              <Visual it={it} alt={alt(i)} ratio="auto" className="!absolute inset-0 !bg-transparent [&_img]:!object-contain" sizes="(min-width: 1400px) 1400px, 100vw" />
            </div>
            <span className="t-label absolute bottom-4 left-4 text-ink-2">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

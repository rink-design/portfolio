import Image from "next/image";
import type { Item } from "@/lib/media";
import { ImageReveal } from "../motion/ImageReveal";

// Productkaarten naast elkaar: wit vlak, beeld in zijn geheel (niet bijgesneden).
export function Cards({ items, alts }: { items: Item[]; alts: string[] }) {
  return (
    <div className="wrap flex flex-wrap justify-center gap-[var(--gap)]">
      {items.map((it, i) => (
        <ImageReveal key={it.src} delay={(i % 3) * 0.08}
          className="group w-full bg-white sm:w-[calc((100%-var(--gap))/2)] md:w-[calc((100%-2*var(--gap))/3)]">
          <div className="relative aspect-square">
            <Image src={it.src} alt={alts[i]} fill sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-[6%] transition-transform duration-700 ease-[var(--ease-out-rink)] group-hover:scale-[1.04]" />
            <span className="t-label absolute bottom-3 left-3 text-ink-2">{String(i + 1).padStart(2, "0")}</span>
          </div>
        </ImageReveal>
      ))}
    </div>
  );
}

"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Item } from "@/lib/media";

// PDF-pagina's in een horizontale band die meeschuift terwijl je naar beneden scrolt.
export function HScroll({ items, alts }: { items: Item[]; alts: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  // Precies zover schuiven dat de laatste pagina tegen de rechtermarge eindigt.
  useLayoutEffect(() => {
    const m = () => { const t = track.current; if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth)); };
    m(); window.addEventListener("resize", m); return () => window.removeEventListener("resize", m);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  return (
    <section ref={ref} className="relative" style={{ height: `${Math.max(2, items.length * 0.6) * 100}vh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div ref={track} className="flex w-max gap-[var(--gap)] px-[var(--gutter)]" style={{ x }}>
          {items.map((it, i) => (
            <div key={it.src} className="relative w-[86vw] shrink-0 md:w-[72vw]" style={{ aspectRatio: `${it.w}/${it.h}` }}>
              <Image src={it.src} alt={alts[i]} fill sizes="(min-width: 768px) 72vw, 86vw" className="object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import type { Item } from "@/lib/media";

// PDF-pagina's in een horizontale band die meeschuift terwijl je naar beneden scrolt.
export function HScroll({ items, alts }: { items: Item[]; alts: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((items.length - 1) / items.length) * 100}%`]);
  return (
    <section ref={ref} className="relative" style={{ height: `${Math.max(2, items.length * 0.6) * 100}vh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div className="flex gap-[var(--gap)] pl-[var(--gutter)]" style={{ x, width: `${items.length * 100}%` }}>
          {items.map((it, i) => (
            <div key={it.src} className="relative w-[78vw] shrink-0 md:w-[62vw]" style={{ aspectRatio: `${it.w}/${it.h}` }}>
              <Image src={it.src} alt={alts[i]} fill sizes="(min-width: 768px) 62vw, 78vw" className="object-cover shadow-[0_20px_50px_-25px_rgba(20,19,17,0.35)]" />
              <span className="t-label absolute -bottom-7 left-0 text-ink-2">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

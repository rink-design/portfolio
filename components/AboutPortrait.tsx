"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Portret op een cobalt plaat: zwart-wit, naar kleur bij hover, zacht meebewegen bij scrollen.
export function AboutPortrait() {
  const img = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = img.current;
    if (!el || reduce) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.parentElement!.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.transform = `translateY(${(p * -6).toFixed(2)}%)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduce]);

  return (
    <figure data-mid="photo" className="col-span-4 md:sticky md:top-20 md:col-span-5 md:self-start">
      <div className="about-slab">
        <div className="relative aspect-square overflow-hidden bg-paper-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={img} src="/about/portret-b72c999b.webp" alt="Portrait of Rinke van de Rakt" loading="lazy"
            className="about-photo absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover object-[50%_50%]" />
          <figcaption className="absolute inset-x-0 bottom-0 flex justify-between gap-3 bg-gradient-to-t from-ink/55 to-transparent p-4 pt-12 text-paper">
            <span className="t-label">Rinke van de Rakt</span>
            <span className="t-label opacity-80">Amsterdam</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

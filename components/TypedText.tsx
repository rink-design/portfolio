"use client";
import { useEffect, useRef, useState } from "react";

// Tekst "typt" zichzelf als een ondertitel: elk teken verschijnt cobalt en wordt zwart.
export function TypedText({ text, className = "", step = 0.028 }: { text: string; className?: string; step?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { rootMargin: "-15% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  let n = 0;
  return (
    <p ref={ref} className={`typed ${go ? "typed-go" : ""} ${className}`} aria-label={text}>
      {text.split(" ").map((w, wi, all) => (
        <span key={wi} aria-hidden>
          <span className="inline-block whitespace-nowrap">
            {[...w].map((c, ci) => <span key={ci} className="typed-c" style={{ animationDelay: `${(n++ * step).toFixed(3)}s` }}>{c}</span>)}
          </span>
          {wi < all.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}

"use client";
import { useEffect, useRef } from "react";

// Video die óók op iPhone vanzelf afspeelt: iOS wil muted + playsinline als echte attributen,
// en soms een expliciete play(). Speelt alleen als hij in beeld is (scheelt batterij en data).
export function AutoVideo({ src, poster, className = "", label, eager = false }:
  { src: string; poster?: string; className?: string; label?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    v.muted = true; v.defaultMuted = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("webkit-playsinline", "");
    const play = () => v.play().catch(() => {});
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { rootMargin: "200px" });
    io.observe(v);
    // Eerste aanraking op de pagina: alsnog starten (bijv. bij energiebesparingsmodus)
    const touch = () => { play(); window.removeEventListener("touchstart", touch); };
    window.addEventListener("touchstart", touch, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("touchstart", touch); };
  }, []);
  return (
    <video ref={ref} src={src} poster={poster} autoPlay muted loop playsInline preload={eager ? "auto" : "metadata"}
      aria-label={label} aria-hidden={label ? undefined : true} className={className} />
  );
}

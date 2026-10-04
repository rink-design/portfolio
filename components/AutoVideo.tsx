"use client";
import { useEffect, useRef } from "react";

// Video die óók op iPhone vanzelf afspeelt: iOS wil muted + playsinline als echte attributen,
// en soms een expliciete play(). Speelt alleen als hij in beeld is (scheelt batterij en data).
// mobileSrc/mobilePoster: aparte (staande) video voor schermen smaller dan 768 px; de browser kiest zelf de bron.
const MOBILE = "(max-width: 767px)";
export function AutoVideo({ src, poster, mobileSrc, mobilePoster, className = "", label, eager = false }:
  { src: string; poster?: string; mobileSrc?: string; mobilePoster?: string; className?: string; label?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (mobilePoster && window.matchMedia(MOBILE).matches) v.poster = mobilePoster;
    v.muted = true; v.defaultMuted = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("webkit-playsinline", "");
    let inView = false;
    const play = () => { if (inView && v.paused) v.play().catch(() => {}); };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) play(); else v.pause(); }, { rootMargin: "200px" });
    io.observe(v);
    // Klaar met laden of tabblad weer zichtbaar: opnieuw proberen.
    v.addEventListener("canplay", play);
    const vis = () => { if (!document.hidden) play(); };
    document.addEventListener("visibilitychange", vis);
    // Energiebesparingsmodus blokkeert autoplay tot de eerste échte aanraking. iOS telt het loslaten
    // (touchend/click) als aanraking, niet het neerzetten (touchstart).
    const GESTURES = ["touchend", "pointerup", "click", "keydown"] as const;
    GESTURES.forEach((g) => window.addEventListener(g, play, { passive: true }));
    return () => {
      io.disconnect(); v.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", vis);
      GESTURES.forEach((g) => window.removeEventListener(g, play));
    };
  }, [mobilePoster]);
  return (
    <video ref={ref} src={mobileSrc ? undefined : src} poster={poster} autoPlay muted loop playsInline preload={eager ? "auto" : "metadata"}
      aria-label={label} aria-hidden={label ? undefined : true} className={className}>
      {mobileSrc && <><source src={mobileSrc} media={MOBILE} /><source src={src} /></>}
    </video>
  );
}

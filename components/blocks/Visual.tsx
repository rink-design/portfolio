import Image from "next/image";
import type { Item } from "@/lib/media";

// Beeld of video op de natuurlijke verhouding (of een opgegeven verhouding).
export function Visual({ it, alt, ratio, sizes = "100vw", priority = false, className = "" }:
  { it: Item; alt: string; ratio?: string; sizes?: string; priority?: boolean; className?: string }) {
  const r = ratio ?? `${it.w}/${it.h}`;
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`} style={{ aspectRatio: r }}>
      {it.video ? (
        <video src={it.src} poster={it.poster} autoPlay muted loop playsInline preload="metadata" aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <Image src={it.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      )}
    </div>
  );
}

import { AutoVideo } from "@/components/AutoVideo";
import Image from "next/image";
import type { Item } from "@/lib/media";

// Beeld of video op de natuurlijke verhouding (of een opgegeven verhouding).
export function Visual({ it, alt, ratio, sizes = "100vw", priority = false, className = "", fit = "cover" }:
  { it: Item; alt: string; ratio?: string; sizes?: string; priority?: boolean; className?: string; fit?: "cover" | "contain" }) {
  const r = ratio ?? `${it.w}/${it.h}`;
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${it.product ? "melt" : ""} ${className}`} style={{ aspectRatio: r }}>
      {it.video ? (
        <AutoVideo src={it.src} poster={it.poster} label={alt} className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} />
      ) : (
        <Image src={it.src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={it.product} className={fit === "contain" ? "object-contain" : "object-cover"} />
      )}
    </div>
  );
}

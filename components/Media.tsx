import Image from "next/image";

// Beeld, video of nette plaatshouder zolang er nog niets is.
export function Media({
  src, poster, pos, alt, ratio = "4/5", priority = false, sizes = "100vw", className = "",
}: { src?: string; poster?: string; pos?: string; alt: string; ratio?: string; priority?: boolean; sizes?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`} style={{ aspectRatio: ratio }}>
      {src?.endsWith(".mp4") ? (
        <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-rink)] group-hover:scale-[1.03]" />
      ) : src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectPosition: pos }}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-rink)] group-hover:scale-[1.03]" />
      ) : (
        <span className="t-label absolute bottom-3 left-3 text-ink-2">{alt}</span>
      )}
    </div>
  );
}

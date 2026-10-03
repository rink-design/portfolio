import Image from "next/image";

// Beeld of nette plaatshouder zolang er nog geen beeld is.
export function Media({
  src, alt, ratio = "4/5", priority = false, sizes = "100vw", className = "",
}: { src?: string; alt: string; ratio?: string; priority?: boolean; sizes?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-rink)] group-hover:scale-[1.03]" />
      ) : (
        <span className="t-label absolute bottom-3 left-3 text-ink-2/70">{alt}</span>
      )}
    </div>
  );
}

import { LOGO_PATHS, LOGO_VIEWBOX as V } from "./logo-paths";

// RINK-logo over de volle breedte — exact dezelfde maat als in het laadscherm.
export function RinkMark({ color = "var(--color-ink)" }: { color?: string }) {
  return (
    <h1 aria-label="RINK">
      <svg viewBox={`${V.x} ${V.y} ${V.w} ${V.h}`} className="block h-auto w-full" aria-hidden>
        {LOGO_PATHS.map((d, i) => <path key={i} d={d} fill={color} />)}
      </svg>
    </h1>
  );
}

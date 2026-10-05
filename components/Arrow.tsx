// Pijl als eigen lijn-icoon, zodat iOS er nooit een emoji van maakt.
const PATHS = {
  ur: "M4 12 12 4M5.5 4H12v6.5",
  r: "M2.5 8h11M9 3.5 13.5 8 9 12.5",
  l: "M13.5 8h-11M7 3.5 2.5 8 7 12.5",
  d: "M8 2.5v11M3.5 9 8 13.5 12.5 9",
};

export function Arrow({ dir = "r", className = "" }: { dir?: keyof typeof PATHS; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden
      className={`inline-block size-[0.8em] align-[-0.05em] ${className}`}>
      <path d={PATHS[dir]} />
    </svg>
  );
}

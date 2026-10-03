// Statisch RINK-woordmerk op exact dezelfde maat als het laadscherm.
const W = 1000, H = 352, FS = 484;
export function RinkMark() {
  return (
    <h1 aria-label="RINK">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden>
        <text x={-0.054 * FS} y={H} textLength={W + 0.054 * FS + 2} lengthAdjust="spacing" fill="var(--color-ink)"
          style={{ fontSize: FS, fontWeight: 700, fontFamily: "var(--font-sans)", fontVariationSettings: '"opsz" 32' }}>RINK</text>
      </svg>
    </h1>
  );
}

// Doorlopende band met disciplines. Stopt bij "minder beweging" (zie globals.css).
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center gap-[4vw] pr-[4vw]">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-[4vw]">
          <span className="t-h1 whitespace-nowrap">{t}</span>
          <span className="inline-block h-[0.5em] w-[0.5em] rounded-full bg-accent" aria-hidden />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee flex overflow-hidden py-5 md:py-7" aria-label={items.join(", ")}>
      <div className="marquee-track flex" aria-hidden>{row}{row}</div>
    </div>
  );
}

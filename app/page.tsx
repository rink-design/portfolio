export default function Home() {
  return (
    <main className="wrap flex min-h-svh flex-col justify-end pb-5">
      {/* RINK vult de volle breedte: lettergrootte = beschikbare breedte / verhouding van het woord */}
      <h1 className="t-display -ml-[0.054em] text-[calc((100vw-2*var(--gutter))/2.065)]">RINK</h1>
      <div className="t-label mt-5 flex justify-between">
        <span>Brand / Packaging / Digital</span>
        <span className="hidden md:inline">New site in progress</span>
      </div>
    </main>
  );
}

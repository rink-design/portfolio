// Altijd beschikbaar: groene stip + 'Available for new projects' (geen 'Offline' meer).
export function Availability() {
  return (
    <div className="t-label flex flex-wrap justify-between gap-x-6 gap-y-2">
      <span className="inline-flex items-center gap-2.5">
        <span className="avail-dot is-open" aria-hidden />
        <span>Available for new projects</span>
      </span>
      <span>Based in Amsterdam</span>
    </div>
  );
}

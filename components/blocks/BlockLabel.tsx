import { Arrow } from "@/components/Arrow";
// Eén labelstijl boven elk beeldblok: naam + korte zin, samen links.
export function BlockLabel({ name, note, href }: { name: string; note?: string; href?: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline gap-x-6 gap-y-1.5">
      <span className="t-label text-ink">{name}</span>
      {note && (href
        ? <a href={href} target="_blank" rel="noopener noreferrer" className="t-label link-line text-ink-2 hover:text-ink" data-cursor="Visit">{note} <Arrow dir="ur" /></a>
        : <span className="t-label text-ink-2">{note}</span>)}
    </div>
  );
}

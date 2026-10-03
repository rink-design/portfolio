import Link from "next/link";
import { Media } from "./Media";
import type { Project } from "@/content/projects";

export function WorkCard({ p }: { p: Project }) {
  const ratio = p.layout === "large" ? "16/9" : p.layout === "wide" ? "21/9" : "4/5";
  const sizes = p.layout === "pair" ? "(min-width: 768px) 50vw, 100vw" : "100vw";
  return (
    <Link href={`/work/${p.slug}`} className="group block">
      <Media src={p.cover} alt={`${p.title} — beeld volgt`} ratio={ratio} sizes={sizes} />
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="t-label">
          <span className="text-ink-2">{p.number}</span>&nbsp;&nbsp;{p.title}
        </h3>
        <p className="t-label hidden text-right text-ink-2 sm:block">{p.disciplines}</p>
      </div>
      <p className="t-label mt-1 text-ink-2 sm:hidden">{p.disciplines}</p>
      <p className="t-label mt-2 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">View case →</p>
    </Link>
  );
}

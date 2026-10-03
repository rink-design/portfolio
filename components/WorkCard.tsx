import Link from "next/link";
import { Media } from "./Media";
import { ImageReveal } from "./motion/ImageReveal";
import type { Project } from "@/content/projects";

export function WorkCard({ p, delay = 0 }: { p: Project; delay?: number }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block" data-cursor="View case">
      <ImageReveal delay={delay}>
        <Media src={p.cover} poster={p.poster} pos={p.coverPos} alt={`${p.title} — ${p.disciplines}`} ratio="4/5" sizes="(min-width: 768px) 50vw, 100vw" />
      </ImageReveal>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="t-label flex items-baseline">
          <span className="text-ink-2">{p.number}</span>
          <span className="ml-3 transition-transform duration-500 ease-[var(--ease-out-rink)] group-hover:translate-x-2">{p.title}</span>
          <span className="ml-2 text-accent opacity-0 transition-all duration-500 ease-[var(--ease-out-rink)] group-hover:translate-x-2 group-hover:opacity-100">→</span>
        </h3>
        <p className="t-label hidden text-right text-ink-2 sm:block">{p.disciplines}</p>
      </div>
      <p className="t-label mt-1 text-ink-2 sm:hidden">{p.disciplines}</p>
    </Link>
  );
}

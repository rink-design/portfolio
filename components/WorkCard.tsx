import Link from "next/link";
import { Media } from "./Media";
import { ImageReveal } from "./motion/ImageReveal";
import type { Project } from "@/content/projects";
import { Arrow } from "@/components/Arrow";

export function WorkCard({ p, delay = 0 }: { p: Project; delay?: number }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block" data-cursor="View case">
      <ImageReveal delay={delay}>
        <Media src={p.cover} poster={p.poster} pos={p.coverPos} alt={`${p.title} — ${p.disciplines}`} ratio="1/1" sizes="(min-width: 768px) 50vw, 100vw" />
      </ImageReveal>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="t-label flex items-baseline transition-colors duration-300 group-hover:text-accent">
          <span className="transition-transform duration-500 ease-[var(--ease-out-rink)] group-hover:translate-x-2">{p.title}</span>
          <span className="ml-2 text-accent opacity-0 transition-all duration-500 ease-[var(--ease-out-rink)] group-hover:translate-x-2 group-hover:opacity-100"><Arrow dir="r" /></span>
        </h3>
        <p className="t-label hidden text-right text-ink-2 transition-colors duration-300 group-hover:text-accent sm:block">{p.tag}</p>
      </div>
      <p className="t-label mt-1 text-ink-2 sm:hidden">{p.tag}</p>
    </Link>
  );
}

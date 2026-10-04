import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { cases, type Insta, type Site } from "@/content/cases";
import { caseBlocks, type Item } from "@/lib/media";
import { Visual } from "@/components/blocks/Visual";
import { HScroll } from "@/components/blocks/HScroll";
import { Phone, SiteIMac } from "@/components/blocks/Frames";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Lines, Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — RINK`, description: `${p.title} — ${p.disciplines}. ${cases[slug]?.statement ?? ""}` } : {};
}

const isPlaceholder = (t?: string) => !t || t.includes("[…]");
const PHONE_KINDS = ["telefoon", "telefoon-video"];

// Eén consistent grid: 1:1, vullend, links uitgelijnd.
function Grid({ items, alt, center }: { items: Item[]; alt: (i: number) => string; center?: boolean }) {
  return (
    <div className={`wrap grid grid-cols-1 gap-[var(--gap)] sm:grid-cols-2 md:grid-cols-3 ${center && items.length < 3 ? "mx-auto max-w-[1100px] md:!grid-cols-2" : ""}`}>
      {items.map((x, i) => (
        <ImageReveal key={x.src} delay={(i % 3) * 0.06}>
          <Visual it={x} alt={alt(i)} ratio="1/1" sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw" />
        </ImageReveal>
      ))}
    </div>
  );
}

// Alle telefoons overal even groot (zelfde breedte), gecentreerd op een rij.
function Phones({ items, alt, ig }: { items: Item[]; alt: (i: number) => string; ig?: Insta }) {
  return (
    <div className="wrap bg-paper-2/60 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-[4vw] md:gap-[2.5vw]">
        {items.map((x, i) => <Reveal key={x.src} delay={i * 0.08} className="w-[42vw] md:w-[min(21vw,270px)]"><Phone it={x} alt={alt(i)} ig={ig} /></Reveal>)}
      </div>
    </div>
  );
}

function Sites({ sites }: { sites: Site[] }) {
  return (
    <div className={`wrap grid gap-x-[5%] gap-y-16 overflow-x-clip px-[6%] py-16 md:py-24 ${sites.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-[1240px]"}`}>
      {sites.map((s, i) => <Reveal key={s.src} delay={i * 0.1}><SiteIMac site={s} /></Reveal>)}
    </div>
  );
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const c = cases[slug] ?? { statement: "", sections: [] };
  const next = projects[(idx + 1) % projects.length];
  const blocks = caseBlocks(slug);

  // Indelen: pdf-band, telefoons, websites, en de rest in het grid.
  const scroll = blocks.filter((b) => b.kind === "scroll").flatMap((b) => b.items);
  const phones = blocks.filter((b) => PHONE_KINDS.includes(b.kind) || (c.videosAsPhones && b.kind === "video")).flatMap((b) => b.items);
  const mockSites: Site[] = blocks.filter((b) => b.kind === "website").flatMap((b) => b.items)
    .map((x) => ({ src: x.src, w: x.w, h: x.h, label: `${p.title} website` }));
  const sites = c.sites ?? mockSites;
  let grid = blocks.filter((b) => !["scroll", "website", ...PHONE_KINDS].includes(b.kind) && !(c.videosAsPhones && b.kind === "video")).flatMap((b) => b.items);

  // Hero
  const mode = c.hero ?? "first";
  let heroItems: Item[] = [];
  if (mode === "first") {
    if (grid[0]) { heroItems = [grid[0]]; grid = grid.slice(1); }
  } else if (mode === "pair") {
    heroItems = grid.slice(0, 2); grid = grid.slice(2);
  }
  const heroPhones = mode === "phones";
  const heroSite = mode === "site" ? sites.slice(0, 1) : [];
  const restSites = mode === "site" ? sites.slice(1) : sites;

  let k = 0;
  const alt = () => { k++; return `${p.title} — ${p.disciplines.split(" / ")[0]}, image ${k}`; };
  const sections = c.sections.filter((s) => s.label);

  return (
    <main>
      {/* KOP */}
      <section className="wrap pt-28 md:pt-36">
        <p className="t-label text-ink-2 md:text-right">{p.disciplines}</p>
        <Lines as="h1" className="t-display mt-6 -ml-[0.04em] text-[clamp(56px,13.5vw,240px)] !leading-[0.84]" lines={[p.title]} />
      </section>

      {/* HERO — geheel in beeld */}
      <div className="mt-8 md:mt-12">
        {heroItems.length === 1 && (
          <div className="wrap">
            <div className="w-[min(100%,calc(86svh*var(--r)))]" style={{ ["--r" as string]: heroItems[0].w / heroItems[0].h }}>
              <Visual it={heroItems[0]} alt={`${p.title} — hero`} priority />
            </div>
          </div>
        )}
        {heroItems.length === 2 && (
          <div className="wrap grid grid-cols-1 items-center gap-[var(--gap)] md:grid-cols-2">
            {heroItems.map((x) => <Visual key={x.src} it={x} alt={`${p.title} — hero`} ratio={c.heroNatural ? undefined : "1/1"} priority sizes="(min-width: 768px) 50vw, 100vw" />)}
          </div>
        )}
        {heroPhones && phones.length > 0 && <Phones items={phones} alt={alt} ig={c.ig} />}
        {heroSite.length > 0 && <Sites sites={heroSite} />}
      </div>

      {/* TEKST — één blok: statement, daaronder alle onderdelen */}
      <section className="wrap grid-12 gap-y-10 py-20 md:py-28">
        <div className="col-span-4 md:col-span-6">
          {!isPlaceholder(c.statement) && <Lines as="h2" className="t-h1" lines={[c.statement]} />}
          {c.intro && <Reveal delay={0.1}><p className="t-label mt-6 text-ink-2">{c.intro}</p></Reveal>}
          {c.role && (
            <Reveal delay={0.15} className="mt-10 max-w-[560px]">
              <p className="t-label text-ink-2">My role</p>
              <p className="t-body mt-2">{c.role}</p>
            </Reveal>
          )}
        </div>
        {sections.length > 0 && (
          <Reveal delay={0.1} className="col-span-4 md:col-span-5 md:col-start-8">
            <dl className="space-y-4">
              {sections.map((s) => (
                <div key={s.label} className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4">
                  <dt className="t-label pt-[0.3em]">{s.label}</dt>
                  <dd className="t-body text-ink-2">{isPlaceholder(s.text) ? "" : s.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </section>

      {/* BEELD */}
      <div className="space-y-[var(--gap)]">
        {scroll.length > 0 && <HScroll items={scroll} alts={scroll.map(() => alt())} />}
        {c.sitesFirst && restSites.length > 0 && <Sites sites={restSites} />}
        {grid.length > 0 && <Grid items={grid} alt={alt} center={c.centerGrid} />}
        {!heroPhones && phones.length > 0 && <Phones items={phones} alt={alt} ig={c.ig} />}
        {!c.sitesFirst && restSites.length > 0 && <Sites sites={restSites} />}
      </div>

      {/* NEXT PROJECT */}
      <Link href={`/work/${next.slug}`} data-tone="dark" className="group wrap mt-28 block bg-ink pt-6 pb-10 text-paper md:mt-40" data-cursor="Next">
        <span className="t-label text-paper/60">Next project</span>
        <p className="t-display mt-16 text-[clamp(48px,11vw,200px)] !leading-[0.86] transition-colors duration-300 group-hover:text-accent">
          {next.title} →
        </p>
      </Link>
    </main>
  );
}

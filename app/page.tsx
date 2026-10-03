import { projects, contact } from "@/content/projects";
import { WorkCard } from "@/components/WorkCard";
import { Media } from "@/components/Media";

export default function Home() {
  const large = projects.filter((p) => p.layout === "large");
  const pairs = projects.filter((p) => p.layout === "pair");
  const wide = projects.filter((p) => p.layout === "wide");

  return (
    <main>
      {/* 01 — IMPACT */}
      <section className="wrap flex min-h-svh flex-col justify-end pb-5">
        <h1 className="t-display -ml-[0.054em] text-[calc((100vw-2*var(--gutter))/2.065)]">RINK</h1>
        <div className="grid-12 t-label mt-5">
          <span className="col-span-2 md:col-span-4">Brand</span>
          <span className="col-span-1 md:col-span-4">Packaging</span>
          <span className="col-span-1 text-right md:col-span-4">Digital</span>
        </div>
      </section>

      {/* Hero-beeld */}
      <section className="wrap">
        <Media alt="Hero — sterkste mockup" ratio="16/9" priority className="max-md:!aspect-[4/5]" />
      </section>

      {/* 02 — POSITIONING */}
      <section className="wrap grid-12 py-28 md:py-44">
        <p className="t-label col-span-4 text-ink-2 md:col-span-3">(Approach)</p>
        <h2 className="t-h1 col-span-4 mt-6 md:col-span-9 md:mt-0">
          Distinctive.<br />Tangible.<br />Built to work<span className="text-accent">.</span>
        </h2>
      </section>

      {/* 03 — SELECTED WORK */}
      <section id="work" className="wrap scroll-mt-16">
        <div className="flex items-end justify-between border-t border-ink pt-4 pb-10">
          <h2 className="t-label">Selected work</h2>
          <span className="t-label text-ink-2">({String(projects.length).padStart(2, "0")})</span>
        </div>

        <div className="space-y-16 md:space-y-24">
          {large.map((p) => <WorkCard key={p.slug} p={p} />)}
          <div className="grid grid-cols-1 gap-x-[var(--gap)] gap-y-16 md:grid-cols-2 md:gap-y-24">
            {pairs.map((p, i) => (
              <div key={p.slug} className={i % 2 === 1 ? "md:mt-32" : ""}>
                <WorkCard p={p} />
              </div>
            ))}
          </div>
          {wide.map((p) => <WorkCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* 04 — ABOUT */}
      <section id="about" className="wrap mt-40 scroll-mt-16 md:mt-56">
        <div className="border-t border-ink pt-4">
          <h2 className="t-label">About</h2>
        </div>
        <div className="grid-12 mt-10">
          <p className="t-h2 col-span-4 md:col-span-7">I design brands you can see, hold and use.</p>
        </div>
        <div className="mt-20 space-y-1 md:mt-28">
          {["Make it distinctive.", "Make it tangible.", "Make it work."].map((t) => (
            <p key={t} className="t-h1 uppercase !text-[8.4vw]">{t}</p>
          ))}
        </div>
        <div className="grid-12 mt-16">
          <p className="t-label col-span-4 text-ink-2 md:col-span-3">Background</p>
          <p className="t-label col-span-4 mt-3 md:col-span-9 md:mt-0">AMFI · Code d’Azur · Westvliet de Groot · Freelance / RINK</p>
        </div>
      </section>

      {/* 05 — CONTACT */}
      <section id="contact" className="mt-40 scroll-mt-0 bg-ink text-paper md:mt-56">
        <div className="wrap flex min-h-svh flex-col justify-between py-24">
          <p className="t-label text-paper/60">Contact</p>
          <div>
            <h2 className="t-display !leading-[0.86] !tracking-[-0.052em] text-[clamp(64px,15.5vw,260px)]">Let’s work<br />together<span className="text-accent">.</span></h2>
            <p className="t-label mt-10 text-paper/60">Brand Identity · Packaging · Digital Design · Art Direction</p>
          </div>
          <div className="grid-12 t-body gap-y-3">
            <a href={`mailto:${contact.email}`} className="col-span-4 underline-offset-4 hover:text-accent hover:underline">{contact.email}</a>
            <a href={contact.phoneHref} className="col-span-4 underline-offset-4 hover:text-accent hover:underline">{contact.phone}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="col-span-4 underline-offset-4 hover:text-accent hover:underline md:text-right">LinkedIn ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}

import { projects, contact } from "@/content/projects";
import { WorkCard } from "@/components/WorkCard";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { WriteOn } from "@/components/motion/WriteOn";
import { HeroVideo } from "@/components/HeroVideo";
import { HeroGrow } from "@/components/motion/ImageReveal";
import { Marquee } from "@/components/motion/Marquee";

export default function Home() {
  return (
    <main>
      {/* 01 — IMPACT: naam schrijft zichzelf, direct daaronder de video */}
      <section className="wrap pt-[22vh] pb-5 md:pt-[26vh]">
        <WriteOn text="RINK" />
        <Reveal delay={1.8} now>
          <div className="grid-12 t-label mt-5">
            <span className="col-span-2 md:col-span-4">Brand</span>
            <span className="col-span-1 md:col-span-4">Packaging</span>
            <span className="col-span-1 text-right md:col-span-4">Digital</span>
          </div>
        </Reveal>
      </section>
      <section className="mt-2">
        <HeroGrow><HeroVideo /></HeroGrow>
      </section>

      {/* 03 — SELECTED WORK — vijf rijen van twee */}
      <section id="work" className="wrap mt-24 scroll-mt-16 md:mt-32">
        <div className="flex items-end justify-between pb-10">
          <h2 className="t-label">Selected work</h2>
          <span className="t-label text-ink-2">({String(projects.length).padStart(2, "0")})</span>
        </div>
        <div className="grid grid-cols-1 gap-x-[var(--gap)] gap-y-16 md:grid-cols-2 md:gap-y-24">
          {projects.map((p, i) => <WorkCard key={p.slug} p={p} delay={i % 2 ? 0.12 : 0} />)}
        </div>
      </section>

      {/* POSITIONING — na het werk */}
      <section className="wrap grid-12 mt-16 py-28 md:mt-24 md:py-44">
        <Reveal className="col-span-4 md:col-span-3"><p className="t-label text-ink-2">(Approach)</p></Reveal>
        <Lines className="t-h1 col-span-4 mt-6 md:col-span-9 md:mt-0"
          lines={["Distinctive.", "Tangible.", <>Built to work<span key="d" className="text-accent">.</span></>]} />
      </section>

      <Marquee items={["Brand Identity", "Packaging", "Digital Design", "Art Direction"]} />

      {/* 04 — ABOUT */}
      <section id="about" className="wrap mt-28 scroll-mt-16 md:mt-40">
        <h2 className="t-label">About</h2>
        <div className="grid-12 mt-10">
          <Reveal className="col-span-4 md:col-span-7"><p className="t-h2">I design brands you can see, hold and use.</p></Reveal>
        </div>
        <Lines as="p" className="t-h1 mt-20 uppercase !text-[8.4vw] md:mt-28" stagger={0.12}
          lines={["Make it distinctive.", "Make it tangible.", <>Make it work<span key="d" className="text-accent">.</span></>]} />
        <Reveal className="grid-12 mt-16">
          <p className="t-label col-span-4 text-ink-2 md:col-span-3">Background</p>
          <p className="t-label col-span-4 mt-3 md:col-span-9 md:mt-0">AMFI · Code d’Azur · Westvliet de Groot · Freelance / RINK</p>
        </Reveal>
      </section>

      {/* 05 — CONTACT */}
      <section id="contact" className="mt-40 bg-ink text-paper md:mt-56">
        <div className="wrap flex min-h-svh flex-col justify-between py-24">
          <p className="t-label text-paper/60">Contact</p>
          <div>
            <Lines className="t-display !leading-[0.86] !tracking-[-0.052em] text-[clamp(64px,15.5vw,260px)]" stagger={0.1}
              lines={["Let’s work", <>together<span key="d" className="text-accent">.</span></>]} />
            <Reveal delay={0.3}><p className="t-label mt-10 text-paper/60">Brand Identity · Packaging · Digital Design · Art Direction</p></Reveal>
          </div>
          <Reveal className="grid-12 t-body gap-y-3">
            <a href={`mailto:${contact.email}`} className="link-line col-span-4 justify-self-start">{contact.email}</a>
            <a href={contact.phoneHref} className="link-line col-span-4 justify-self-start">{contact.phone}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-line col-span-4 justify-self-start md:justify-self-end">LinkedIn ↗</a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

import { projects, contact, experience, education, cv } from "@/content/projects";
import { WorkCard } from "@/components/WorkCard";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { RinkMark } from "@/components/RinkMark";
import { AfterLoad } from "@/components/motion/AfterLoad";
import { HeroVideo, hasHeroVideo } from "@/components/HeroVideo";
import { Marquee } from "@/components/motion/Marquee";
import { Availability } from "@/components/Availability";
import { CountUp } from "@/components/motion/CountUp";

export default function Home() {
  return (
    <main>
      {/* 01 — HEADER: showreel als achtergrond, logo en labels in wit erbovenop */}
      <section data-tone="dark" className="relative flex h-svh min-h-[520px] flex-col justify-end overflow-hidden bg-ink">
        {hasHeroVideo() && <HeroVideo />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/30" aria-hidden />
        <div className="wrap relative pb-5 text-paper md:pb-6">
          <RinkMark color="var(--color-paper)" />
          <AfterLoad delay={0.35}>
            <div className="grid-12 t-label mt-5">
              <span className="col-span-2 md:col-span-4">Brand</span>
              <span className="col-span-1 md:col-span-4">Packaging</span>
              <span className="col-span-1 text-right md:col-span-4">Art Direction</span>
            </div>
          </AfterLoad>
        </div>
      </section>

      {/* 03 — SELECTED WORK — vijf rijen van twee */}
      <section id="work" className="wrap mt-16 scroll-mt-16 md:mt-24">
        <div className="flex items-end justify-between pb-10">
          <h2 className="t-label">Selected projects</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-[var(--gap)] gap-y-16 md:grid-cols-2 md:gap-y-24">
          {projects.map((p, i) => <WorkCard key={p.slug} p={p} delay={i % 2 ? 0.12 : 0} />)}
        </div>
      </section>

      {/* CIJFERS — tellen op als ze in beeld komen */}
      <section className="wrap mt-28 md:mt-40" aria-label="In numbers">
        <div className="grid grid-cols-2 gap-x-[var(--gap)]">
          {[{ to: 38, label: "Projects" }, { to: 7, label: "Years of experience" }].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <p className="t-h1"><CountUp to={s.to} suffix="+" delay={i * 0.15} /></p>
              <p className="t-label mt-4 text-ink-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-20 md:mt-28">
        <Marquee items={["Brand Identity", "Packaging", "Art Direction", "Graphic Design", "Digital Design"]} />
      </div>

      {/* 04 — ABOUT */}
      <section id="about" className="wrap mt-28 scroll-mt-16 md:mt-40">
        <h2 className="t-label">About</h2>
        <div className="grid-12 mt-10">
          <Reveal className="col-span-4 md:col-span-7"><p className="t-h2">I design brands that feel like one — on the shelf, in your hand and on screen.</p></Reveal>
        </div>
        {[{ label: "Experience", rows: experience }, { label: "Education", rows: education }].map((g, k) => (
          <Reveal key={g.label} className={`grid-12 ${k ? "mt-10" : "mt-16"}`}>
            <p className="t-label col-span-4 text-ink-2 md:col-span-3">{g.label}</p>
            <ul className="t-label col-span-4 mt-3 space-y-1 md:col-span-9 md:mt-0">
              {g.rows.map((b) => (
                <li key={b.what} className="flex justify-between gap-6"><span>{b.what}</span><span className="shrink-0 whitespace-nowrap text-ink-2">{b.time}</span></li>
              ))}
            </ul>
          </Reveal>
        ))}
        {cv.map((c) => (
          <Reveal key={c.label} className="grid-12 mt-10">
            <p className="t-label col-span-4 text-ink-2 md:col-span-3">{c.label}</p>
            <p className="t-label col-span-4 mt-3 md:col-span-9 md:mt-0">{c.items.join(" · ")}</p>
          </Reveal>
        ))}
      </section>

      {/* 05 — CONTACT */}
      <section id="contact" data-tone="dark" className="mt-40 bg-ink text-paper md:mt-56">
        <div className="wrap flex flex-col gap-16 py-20 md:gap-24 md:py-28">
          <Availability />
          <div>
            <Lines className="t-display !leading-[0.86] !tracking-[-0.052em] text-[clamp(64px,15.5vw,260px)]" stagger={0.1}
              lines={["Let’s work", <>together<span key="d" className="text-accent">.</span></>]} />
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

import type { Viewport } from "next";
import { projects, contact, experience, education, cv } from "@/content/projects";
import { WorkCard } from "@/components/WorkCard";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { RinkMark } from "@/components/RinkMark";
import { AfterLoad } from "@/components/motion/AfterLoad";
import { HeroVideo, hasHeroVideo } from "@/components/HeroVideo";
import { Marquee } from "@/components/motion/Marquee";
import { Availability } from "@/components/Availability";
import { CountUp } from "@/components/motion/CountUp";
import { LiquidDrops } from "@/components/motion/LiquidDrops";
import { GetInTouch } from "@/components/GetInTouch";
import { LocalClock } from "@/components/LocalClock";

// Home begint donker (video): statusbalk op de telefoon kleurt mee, geen lichte balk boven de video.
export const viewport: Viewport = { viewportFit: "cover", themeColor: "#141311" };

export default function Home() {
  return (
    <main data-home>
      {/* 01 — HEADER: showreel als achtergrond, logo en labels in wit erbovenop */}
      <section id="top" data-tone="dark" className="relative flex h-svh min-h-[520px] flex-col justify-end overflow-hidden bg-ink">
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

      {/* 04 — ABOUT: begint met de cijfers (tellen op als ze in beeld komen) */}
      <section id="about" className="wrap mt-28 scroll-mt-16 md:mt-40" aria-label="About">
        <div className="grid grid-cols-2 gap-x-[var(--gap)] md:mt-14">
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

      {/* SEMI-CV — ruime witruimte tussen de blokken; duur met streepje direct achter de regel */}
      <section className="wrap mt-24 md:mt-36" aria-label="Services, experience and education">
        {[
          { label: "Services", items: cv[0].items },
          { label: "Experience", rows: experience },
          { label: "Education", rows: education },
          ...cv.slice(1).map((c) => ({ label: c.label, items: c.items })),
        ].map((g, k) => (
          <Reveal key={g.label} className={`grid-12 ${k ? "mt-14 md:mt-20" : ""}`}>
            <p className="t-label col-span-4 text-ink-2 md:col-span-3">{g.label}</p>
            {"rows" in g && g.rows ? (
              <ul className="t-label col-span-4 mt-3 space-y-2 md:col-span-9 md:mt-0">
                {g.rows.map((b) => (
                  <li key={b.what}>{b.what}{b.time && <span className="whitespace-nowrap text-ink-2"> — {b.time}</span>}</li>
                ))}
              </ul>
            ) : (
              <p className="t-label col-span-4 mt-3 md:col-span-9 md:mt-0">
                {g.items?.map((t, i) => <span key={t}>{i > 0 && <span className="mx-2 inline-block h-[5px] w-[5px] -translate-y-[2px] bg-ink" aria-hidden />}{t}</span>)}
              </p>
            )}
          </Reveal>
        ))}
      </section>

      {/* 05 — CONTACT: vloeibaar inkt-en-cobalt vlak, Get in touch-menu, live klok */}
      <section id="contact" data-tone="dark" className="relative isolate mt-40 overflow-hidden bg-ink text-paper md:mt-56">
        <LiquidDrops />
        <div className="wrap flex flex-col gap-16 pt-16 pb-6 md:gap-20 md:pt-20">
          <Availability />
          <Lines className="t-display !leading-[0.86] !tracking-[-0.052em] text-[clamp(64px,15.5vw,260px)]" stagger={0.1}
            lines={["Let’s work", <>together<span key="d" className="text-accent">.</span></>]} />
          <Reveal className="grid grid-cols-1 items-end gap-x-[var(--gap)] gap-y-12 md:grid-cols-2">
            <GetInTouch />
            <LocalClock />
          </Reveal>
          <Reveal className="grid-12 t-body gap-y-3">
            <a href={`mailto:${contact.email}`} className="link-line col-span-4 justify-self-start">{contact.email}</a>
            <a href={contact.phoneHref} className="link-line col-span-4 justify-self-start">{contact.phone}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-line col-span-4 justify-self-start md:justify-self-end">LinkedIn ↗</a>
          </Reveal>
          <div className="t-label mt-6 flex justify-between text-paper/60">
            <span>© RINK Design</span>
            <a href="#top" className="link-line">Back to top ↑</a>
          </div>
        </div>
      </section>
    </main>
  );
}

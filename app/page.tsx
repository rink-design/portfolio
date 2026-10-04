import type { Viewport } from "next";
import { projects, contact } from "@/content/projects";
import { WorkCard } from "@/components/WorkCard";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { RinkMark } from "@/components/RinkMark";
import { AfterLoad } from "@/components/motion/AfterLoad";
import { HeroVideo, hasHeroVideo } from "@/components/HeroVideo";
import { Availability } from "@/components/Availability";
import { About } from "@/components/About";
import { LiquidDrops } from "@/components/motion/LiquidDrops";
import { GetInTouch } from "@/components/GetInTouch";

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

      {/* ABOUT — statement, services, experience, education, cijfers, tools */}
      <About />

      {/* 05 — CONTACT: vloeibaar inkt-en-cobalt vlak, Get in touch-menu, live klok */}
      {/* Precies één schermhoogte: beschikbaarheid bovenin, gegevens onderaan */}
      <section id="contact" data-tone="dark" className="relative isolate mt-40 flex min-h-svh flex-col overflow-hidden bg-ink text-paper md:mt-56">
        <LiquidDrops />
        <div className="wrap flex flex-1 flex-col gap-10 pt-16 pb-6">
          <Availability />
          <Lines className="t-display !leading-[0.86] !tracking-[-0.052em] text-[clamp(64px,min(15.5vw,26svh),260px)]" stagger={0.1}
            lines={["Let’s work", <>together<span key="d" className="ml-[0.06em] inline-block h-[0.17em] w-[0.17em] bg-accent" aria-hidden /></>]} />
          <Reveal>
            <GetInTouch />
          </Reveal>
          {/* Gegevens onderaan, netjes verdeeld: links · midden · rechts */}
          <Reveal className="t-body mt-auto grid grid-cols-1 gap-3 md:grid-cols-3 md:items-baseline">
            <a href={`mailto:${contact.email}`} className="link-line justify-self-start">{contact.email}</a>
            <a href={contact.phoneHref} className="link-line justify-self-start md:justify-self-center">{contact.phone}</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-line justify-self-start md:justify-self-end">LinkedIn ↗</a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

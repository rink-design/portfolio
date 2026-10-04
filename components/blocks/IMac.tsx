"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Site } from "@/content/cases";

// iMac Pro (27″, zilver) — Blender-render met het scherm als gat.
// De echte website zit erachter, scrollbaar, via een perspectief-transform op de 4 schermhoeken.
const IMG = { src: "/mockups/imac-pro-silver.webp", w: 1058, h: 915 };
const CORNERS = [[75.9, 76.1], [988.9, 60.2], [982.9, 577.5], [82.3, 625.7]]; // px in de render: LB, RB, RO, LO
const SW = 1280, SH = 720;

function solve(A: number[][], b: number[]) {
  const n = b.length;
  for (let i = 0; i < n; i++) {
    let m = i;
    for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[m][i])) m = r;
    [A[i], A[m]] = [A[m], A[i]]; [b[i], b[m]] = [b[m], b[i]];
    for (let r = i + 1; r < n; r++) { const f = A[r][i] / A[i][i]; for (let c = i; c < n; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; }
  }
  const x = new Array<number>(n);
  for (let i = n - 1; i >= 0; i--) { let t = b[i]; for (let c = i + 1; c < n; c++) t -= A[i][c] * x[c]; x[i] = t / A[i][i]; }
  return x;
}

// Rechthoek (0,0)–(w,h) naar 4 punten → CSS matrix3d
function matrix3d(P: number[][]) {
  const S = [[0, 0], [SW, 0], [SW, SH], [0, SH]], A: number[][] = [], b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = S[i], [u, v] = P[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
  }
  const k = solve(A, b);
  return `matrix3d(${k[0]},${k[3]},0,${k[6]},${k[1]},${k[4]},0,${k[7]},0,0,1,0,${k[2]},${k[5]},0,1)`;
}

export function SiteIMac({ site }: { site: Site }) {
  const box = useRef<HTMLDivElement>(null);
  const scr = useRef<HTMLDivElement>(null);
  const glr = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const fit = () => {
      const s = el.clientWidth / IMG.w;
      // iets groter dan het gat (overscan), zodat er geen lichte rand langs het scherm valt
      const cx = CORNERS.reduce((a, c) => a + c[0], 0) / 4, cy = CORNERS.reduce((a, c) => a + c[1], 0) / 4, o = 5; // 5 px in de render
      const t = matrix3d(CORNERS.map(([x, y]) => [(x + Math.sign(x - cx) * o) * s, (y + Math.sign(y - cy) * o) * s]));
      if (scr.current) scr.current.style.transform = t;
      if (glr.current) glr.current.style.transform = t;
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <figure className="w-full">
      <div ref={box} className="imac relative w-full" style={{ aspectRatio: `${IMG.w}/${IMG.h}` }}>
        <div ref={scr} className="imac-screen site-screen" style={{ width: SW, height: SH }} tabIndex={0} aria-label={`${site.label} — scroll to explore`}>
          <Image src={site.src} alt={`${site.label} website`} width={site.w} height={site.h} sizes="1280px" loading="eager" className="block h-auto w-full" />
        </div>
        <div ref={glr} className="imac-glare" style={{ width: SW, height: SH }} aria-hidden />
        <Image src={IMG.src} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="pointer-events-none z-[2] select-none" />
      </div>
      <figcaption className="t-label mt-4 flex justify-between gap-4 text-ink-2">
        {site.url
          ? <a href={site.url} target="_blank" rel="noopener noreferrer" className="link-line text-ink" data-cursor="Visit">{site.label} ↗</a>
          : <span>{site.label}</span>}
        <span>Scroll ↓</span>
      </figcaption>
    </figure>
  );
}

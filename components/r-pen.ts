import { R_STROKES } from "./r-strokes";

// De pen die de sierlijke R schrijft (gekozen: A2c, 'gelijkmatig doorschrijven').
// Steel vanaf de krul onderin omhoog → zonder af te remmen door de kruising → lus links rond en buik rechts omlaag
// tot in de staart. Het puntje rechtsboven zwiept uit zodra de steel door de kruising gaat.
// penAt(t) geeft per streek-deel hoeveel er (in lengte) getekend is op tijd t (seconden).

type Pt = [number, number];
export type PenSeg = { key: string; id: string; w: number; pts: Pt[]; len: number; start: number };

const RAW = Object.fromEntries(R_STROKES.map((s) => [s.id, { id: s.id, w: s.w, pts: s.d.slice(1).split(" L").map((p) => p.split(",").map(Number) as Pt) }]));
const rev = (s: { id: string; w: number; pts: Pt[] }) => ({ ...s, pts: [...s.pts].reverse() });
const lenOf = (pts: Pt[]) => pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
function chain(name: string, parts: { id: string; w: number; pts: Pt[] }[]) {
  let acc = 0;
  const segs: PenSeg[] = parts.map((s) => { const len = lenOf(s.pts); const seg = { ...s, key: `${name}-${s.id}`, len, start: acc }; acc += len; return seg; });
  return { segs, total: acc };
}
const STEM = chain("stem", [RAW.stem]);
const LOOP = chain("loop", [rev(RAW.loop)]);
const BOWL = chain("bowl", [rev(RAW.bridge), RAW.bowl, rev(RAW.leg)]);
const SWASH = chain("swash", [rev(RAW.swash)]);
export const PEN_SEGS: PenSeg[] = [STEM, LOOP, BOWL, SWASH].flatMap((c) => c.segs);

export function bez(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t, sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0; if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) { const e = sx(t) - x, d = dx(t); if (Math.abs(e) < 1e-5 || Math.abs(d) < 1e-6) break; t -= e / d; }
    return sy(Math.min(1, Math.max(0, t)));
  };
}
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// De pen rekent in 'kosten' i.p.v. lengte: waar de lus langs de al geschreven steel loopt (daar zie je bijna niets)
// gaat hij snel, en het dunne binnenlijntje zwiept vlot omhoog. Zo hapert hij niet bij de samensmelting.
const LP = LOOP.segs[0].pts;
const iMerge = LP.findIndex((p) => p[0] === 29.25 && p[1] === 39.31); // lus raakt de steel
const iHair = LP.findIndex((p) => p[0] === 37.12 && p[1] === 32.12);  // binnenlijntje maakt zich los
const loopDist = [0], loopCost = [0];
LP.slice(1).forEach((p, i) => {
  const L = Math.hypot(p[0] - LP[i][0], p[1] - LP[i][1]);
  const w = i >= iHair ? 0.3 : i >= iMerge ? 0.08 : 1;
  loopDist.push(loopDist[i] + L); loopCost.push(loopCost[i] + L * w);
});
const CL = loopCost[loopCost.length - 1];
function loopFromCost(c: number) {
  if (c <= 0) return 0; if (c >= CL) return LOOP.total;
  let i = 1; while (loopCost[i] < c) i++;
  const k = (c - loopCost[i - 1]) / (loopCost[i] - loopCost[i - 1]);
  return loopDist[i - 1] + k * (loopDist[i] - loopDist[i - 1]);
}

// Tempo (A2c)
const T = 1.55, BOWL_END = 1.75;
const ease = bez(0.3, 0.15, 0.55, 1);
const LS = STEM.total;
const cost = (t: number) => ease(clamp(t / T)) * (LS + CL);
let a = 0, z = T; for (let i = 0; i < 40; i++) { const m = (a + z) / 2; if (cost(m) < LS) a = m; else z = m; }
const TJ = (a + z) / 2; // moment dat de steel de kruising bereikt
// de buik vertrekt bovenin met dezelfde snelheid als de pen daar heeft
const VJ = (cost(TJ + 0.002) - cost(TJ - 0.002)) / 0.004;
const TB = BOWL_END - TJ, SLOPE = (VJ * TB) / BOWL.total, X1 = Math.min(0.3, 0.9 / SLOPE);
const bowlEase = bez(X1, SLOPE * X1, 0.45, 1);
const flick = bez(0.3, 0.6, 0.2, 1);

export const R_WRITE_END = Math.max(T, BOWL_END, TJ + 0.32);

// I-N-K vult van links naar rechts als vervolg van de pen: start als het puntje rechtsboven uitzwiept
// (dat eindigt precies waar de I begint) en loopt in één beweging door tot en met de K. Los van het laden,
// zodat hij nooit halverwege blijft wachten.
const INK_START = TJ + 0.2, INK_DUR = 1.25;
const inkEase = bez(0.45, 0, 0.25, 1);
export const INK_END = INK_START + INK_DUR;
export const inkAt = (t: number) => inkEase(clamp((t - INK_START) / INK_DUR));

export function penAt(t: number): Record<string, number> {
  const c = cost(t);
  const d: Record<string, number> = {
    stem: Math.min(c, LS),
    loop: loopFromCost(c - LS),
    bowl: bowlEase(clamp((t - TJ) / TB)) * BOWL.total,
    swash: flick(clamp((t - TJ - 0.04) / 0.28)) * SWASH.total,
  };
  const out: Record<string, number> = {};
  PEN_SEGS.forEach((s) => { out[s.key] = clamp(d[s.key.split("-")[0]] - s.start, 0, s.len); });
  return out;
}

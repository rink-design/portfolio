// Klik = groter: het beeld groeit vanuit zijn eigen midden over de rest heen (binnen het scherm).
// Nog een klik, ernaast klikken, scrollen of Esc = terug naar zijn plek.
let Z: HTMLElement | null = null;
let S: HTMLElement | null = null;
let ready = false;

type Box = { l: number; t: number; w: number; h: number };
const rectOf = (el: HTMLElement): Box => { const r = el.getBoundingClientRect(); return { l: r.left, t: r.top, w: r.width, h: r.height }; };
const place = (el: HTMLElement, b: Box) => Object.assign(el.style, { left: `${b.l}px`, top: `${b.t}px`, width: `${b.w}px`, height: `${b.h}px` });

// Grootste bron uit de srcset, zodat het vergrote beeld scherp is.
function bestSrc(img: HTMLImageElement) {
  const set = img.srcset?.split(",").map((s) => s.trim().split(" ")[0]).filter(Boolean);
  return set?.length ? set[set.length - 1] : img.currentSrc || img.src;
}

function target(el: HTMLElement, ratio: number): Box {
  const r = rectOf(el), vw = innerWidth, vh = innerHeight, m = 16;
  let w = Math.min(r.w * 2.3, vw * (vw < 768 ? 0.92 : 0.62), 1300), h = w / ratio;
  if (h > vh * 0.8) { h = vh * 0.8; w = h * ratio; }
  const l = Math.max(m, Math.min(r.l + r.w / 2 - w / 2, vw - w - m));
  const t = Math.max(m, Math.min(r.t + r.h / 2 - h / 2, vh - h - m));
  return { l, t, w, h };
}

export function closeZoom(now = false) {
  if (!Z) return;
  const el = Z, src = S; Z = null; S = null;
  if (now || !src || matchMedia("(prefers-reduced-motion: reduce)").matches) { el.remove(); return; }
  place(el, rectOf(src)); setTimeout(() => el.remove(), 560);
}

export const zoomedFrom = () => S;
export const zoomEl = () => Z;

export function toggleZoom(el: HTMLElement) {
  if (Z && S === el) { closeZoom(); return; }
  openZoom(el);
}

export function openZoom(el: HTMLElement, hover = false) {
  if (Z && S === el) return;
  closeZoom(true);
  const img = el.querySelector("img"); if (!img) return;
  if (!ready) {
    ready = true;
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeZoom(); });
    document.addEventListener("click", (e) => { if (Z && !Z.contains(e.target as Node) && !(S && S.contains(e.target as Node))) closeZoom(); }, true);
    addEventListener("scroll", () => closeZoom(), { passive: true });
  }
  const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : el.clientWidth / el.clientHeight;
  const z = document.createElement("figure");
  z.className = "zoom";
  z.dataset.cursor = "Close";
  const big = document.createElement("img");
  big.src = bestSrc(img); big.alt = img.alt;
  z.appendChild(big);
  place(z, rectOf(el)); document.body.appendChild(z);
  void z.offsetWidth; place(z, target(el, ratio));
  z.addEventListener("click", () => { if (Z === z) closeZoom(); });
  if (hover) z.addEventListener("mouseleave", (e) => { if (Z === z && !el.contains(e.relatedTarget as Node)) closeZoom(); });
  Z = z; S = el;
}

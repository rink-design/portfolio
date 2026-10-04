"use client";
import { useEffect, useRef } from "react";

// Vloeibaar vlak achter Contact: cobalt druppels drijven door de inkt en smelten samen.
// De muis (of vinger) is zelf een druppel. Rendert alleen als het in beeld is; bij 'minder beweging' staat het stil.
const VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const FS = `precision highp float;uniform vec2 r;uniform float t;uniform vec3 b[7];
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
const vec3 INK=vec3(.078,.075,.067);const vec3 COB=vec3(.176,.231,1.);
void main(){vec2 px=gl_FragCoord.xy;float s=0.;for(int i=0;i<7;i++){vec2 d=px-b[i].xy;s+=b[i].z*b[i].z/(dot(d,d)+1.);}
float inside=smoothstep(.95,1.05,s);float rim=smoothstep(.75,1.,s)-inside;float core=smoothstep(1.4,3.5,s);
vec3 col=INK+vec3(.02,.025,.08)*n(px*.004+t*.05);
col=mix(col,COB,inside);col=mix(col,vec3(.62,.66,1.),core*.35);col+=COB*rim*.6;
gl_FragColor=vec4(col,1.);}`;

export function LiquidDrops() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, host = cv.parentElement!;
    const gl = cv.getContext("webgl", { antialias: false });
    if (!gl) return;
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "r"), uT = gl.getUniformLocation(prog, "t"), uB = gl.getUniformLocation(prog, "b");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const M = { x: 0.7, y: 0.4, tx: 0.7, ty: 0.4, v: 0 };
    const size = () => {
      const d = Math.min(1.5, window.devicePixelRatio || 1);
      cv.width = Math.max(2, Math.round(host.clientWidth * d)); cv.height = Math.max(2, Math.round(host.clientHeight * d));
      gl.viewport(0, 0, cv.width, cv.height);
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(host);
    const move = (x: number, y: number) => {
      const b = host.getBoundingClientRect();
      M.tx = (x - b.left) / b.width; M.ty = 1 - (y - b.top) / b.height; M.v = Math.min(1.4, M.v + 0.12);
    };
    const onMouse = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => move(e.touches[0].clientX, e.touches[0].clientY);
    host.addEventListener("mousemove", onMouse); host.addEventListener("touchmove", onTouch, { passive: true });

    let visible = false, raf = 0;
    const t0 = performance.now();
    const draw = (now: number) => {
      const t = reduce ? 0 : (now - t0) / 1000;
      M.x += (M.tx - M.x) * 0.06; M.y += (M.ty - M.y) * 0.06; M.v *= 0.96;
      const W = cv.width, H = cv.height, k = Math.min(W, H), arr: number[] = [];
      for (let i = 0; i < 6; i++) {
        const sp = t * (0.12 + i * 0.03);
        arr.push(W * (0.5 + 0.38 * Math.sin(sp + i * 1.7)), H * (0.5 + 0.34 * Math.cos(sp * 1.3 + i * 2.1)), k * (0.09 + 0.025 * (i % 3)));
      }
      arr.push(M.x * W, M.y * H, k * (0.11 + M.v * 0.04));
      gl.uniform2f(uR, W, H); gl.uniform1f(uT, t); gl.uniform3fv(uB, new Float32Array(arr));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => { if (!visible) return; draw(now); raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { if (reduce) draw(performance.now()); else raf = requestAnimationFrame(loop); }
    });
    io.observe(host);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); host.removeEventListener("mousemove", onMouse); host.removeEventListener("touchmove", onTouch); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 block h-full w-full" />;
}

# Berekent de middenlijnen (pennenstreken) van de sierlijke R uit components/logo-paths.ts.
# Uitvoer gebruikt in components/r-strokes.ts (volgorde en timing staan daar). pip install scikit-image scipy
import re, json, numpy as np, subprocess, io
from PIL import Image
from skimage.morphology import skeletonize
from scipy.ndimage import distance_transform_edt
R = re.findall(r'"(M[^"]+)"', open('components/logo-paths.ts').read())[0]
X0, Y0, W, H, SC = 2.0, 3.5, 84.0, 58.0, 16  # R-gebied in logo-eenheden, 16 px per eenheid
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{int(W*SC)}" height="{int(H*SC)}" viewBox="{X0} {Y0} {W} {H}"><rect x="{X0}" y="{Y0}" width="{W}" height="{H}" fill="#fff"/><path d="{R}" fill="#000"/></svg>'
png = subprocess.run(['node', '-e', 'const s=require("sharp");let d="";process.stdin.on("data",c=>d+=c).on("end",()=>s(Buffer.from(d)).png().toBuffer().then(b=>process.stdout.write(b)))'], input=svg.encode(), capture_output=True).stdout
m = np.array(Image.open(io.BytesIO(png)).convert('L')) < 128
dt = distance_transform_edt(m)
sk = skeletonize(m)
ys, xs = np.nonzero(sk)
pts = set(zip(ys.tolist(), xs.tolist()))
def nb(p):
    y, x = p
    return [(y+dy, x+dx) for dy in (-1,0,1) for dx in (-1,0,1) if (dy or dx) and (y+dy, x+dx) in pts]
deg = {p: len(nb(p)) for p in pts}
nodes = {p for p in pts if deg[p] != 2}
seen = set(); branches = []
for n in nodes:
    for q in nb(n):
        if (n, q) in seen: continue
        path = [n, q]; prev, cur = n, q
        while cur not in nodes:
            nxt = [r for r in nb(cur) if r != prev and r not in path[-3:]]
            if not nxt: break
            prev, cur = cur, nxt[0]; path.append(cur)
        seen.add((n, q)); seen.add((path[-1], path[-2]))
        branches.append(path)
# korte uitlopertjes (skelet-ruis) weg
def length(b): return len(b)
branches = [b for b in branches if length(b) > 25 or (deg[b[0]] > 2 and deg[b[-1]] > 2)]
def rdp(P, eps):
    if len(P) < 3: return P
    a, b = np.array(P[0], float), np.array(P[-1], float)
    d = np.abs(np.cross(b - a, np.array(P) - a)) / (np.linalg.norm(b - a) + 1e-9)
    i = int(np.argmax(d))
    return rdp(P[:i+1], eps)[:-1] + rdp(P[i:], eps) if d[i] > eps else [P[0], P[-1]]
out = []
for b in branches:
    # start bij het uiteinde (eindpunt met 1 buur)
    if deg[b[-1]] == 1 and deg[b[0]] != 1: b = b[::-1]
    w = float(max(dt[p] for p in b)) * 2 / SC
    P = rdp(b, 1.2)
    to = lambda p: (X0 + p[1] / SC, Y0 + p[0] / SC)
    c = [to(p) for p in P]
    d = "M" + " L".join(f"{x:.2f},{y:.2f}" for x, y in c)
    out.append({"d": d, "w": round(w + 1.2, 2), "len": len(b), "start_end": deg[b[0]] == 1})
out.sort(key=lambda o: -o["len"])
print(len(out), [ (o["len"], o["w"], o["start_end"]) for o in out])
json.dump(out, open('/tmp/claude-0/-home-user-portfolio/6285095c-0962-5f7c-ad07-6acebc45f62b/scratchpad/skel/strokes.json', 'w'))
# preview
prev = f'<svg xmlns="http://www.w3.org/2000/svg" width="1344" height="928" viewBox="{X0} {Y0} {W} {H}"><rect x="{X0}" y="{Y0}" width="{W}" height="{H}" fill="#fff"/><path d="{R}" fill="#ddd"/>' + "".join(f'<path d="{o["d"]}" fill="none" stroke="hsl({i*57%360},80%,45%)" stroke-width="0.6"/><circle cx="{o["d"][1:].split(" L")[0].split(",")[0]}" cy="{o["d"][1:].split(" L")[0].split(",")[1]}" r="0.9" fill="red"/>' for i, o in enumerate(out)) + '</svg>'
open('/tmp/claude-0/-home-user-portfolio/6285095c-0962-5f7c-ad07-6acebc45f62b/scratchpad/skel/prev.svg', 'w').write(prev)

# Verdeelt de sierlijke R in gebieden: elke pixel hoort bij de dichtstbijzijnde pennenstreek (components/r-strokes.ts).
# Zo onthult een streek alléén zijn eigen deel van de letter en ontstaan er geen klontjes waar streken elkaar raken.
# Uitvoer: components/r-regions.ts (en JSON {id: pad} op stdout). Draaien met de imgenv-python (scikit-image, scipy) en node (sharp) in PATH.
import re, json, io, subprocess, numpy as np
from PIL import Image
from scipy.ndimage import distance_transform_edt, binary_dilation
from skimage.draw import line
from skimage.measure import find_contours, approximate_polygon

R = re.findall(r'"(M[^"]+)"', open('components/logo-paths.ts').read())[0]
STROKES = re.findall(r'id: "(\w+)", d: "([^"]+)"', open('components/r-strokes.ts').read())
STROKES = [s for s in STROKES if s[0] != "nub"]  # het nopje is te klein voor een eigen gebied; buik en steel nemen het mee
X0, Y0, W, H, SC = 2.0, 3.5, 84.0, 58.0, 16
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{int(W*SC)}" height="{int(H*SC)}" viewBox="{X0} {Y0} {W} {H}"><rect x="{X0}" y="{Y0}" width="{W}" height="{H}" fill="#fff"/><path d="{R}" fill="#000"/></svg>'
png = subprocess.run(['node', '-e', 'const s=require("sharp");let d="";process.stdin.on("data",c=>d+=c).on("end",()=>s(Buffer.from(d)).png().toBuffer().then(b=>process.stdout.write(b)))'], input=svg.encode(), capture_output=True).stdout
m = np.array(Image.open(io.BytesIO(png)).convert('L')) < 128

lab = np.zeros(m.shape, np.int32)
for k, (sid, d) in enumerate(STROKES, 1):
    P = [tuple(map(float, p.split(','))) for p in d[1:].split(' L')]
    for (x1, y1), (x2, y2) in zip(P, P[1:]):
        rr, cc = line(int((y1 - Y0) * SC), int((x1 - X0) * SC), int((y2 - Y0) * SC), int((x2 - X0) * SC))
        ok = (rr >= 0) & (rr < m.shape[0]) & (cc >= 0) & (cc < m.shape[1])
        lab[rr[ok], cc[ok]] = k
_, (iy, ix) = distance_transform_edt(lab == 0, return_indices=True)
near = lab[iy, ix]
# de voet van het zwaaitje (in de kruising bovenin) hoort bij het brugje: die vult mee zodra de steel boven is
ids = [sid for sid, _ in STROKES]
xs = X0 + np.arange(m.shape[1])[None, :] / SC
near[(near == ids.index('swash') + 1) & (xs < 70.5)] = ids.index('bridge') + 1

out = {}
for k, (sid, _) in enumerate(STROKES, 1):
    reg = binary_dilation(m & (near == k), iterations=3)  # kleine overlap tegen naadjes; de R zelf knipt het weer bij
    parts = []
    for c in find_contours(np.pad(reg, 1).astype(float), 0.5):
        c = approximate_polygon(c, 0.6)
        if len(c) < 4: continue
        parts.append("M" + " L".join(f"{X0 + (x - 1) / SC:.2f},{Y0 + (y - 1) / SC:.2f}" for y, x in c) + "Z")
    out[sid] = "".join(parts)
open('components/r-regions.ts', 'w').write(
    "// Gebieden van de sierlijke R: per pennenstreek het deel van de letter dat hij mag onthullen.\n"
    "// Gegenereerd door scripts/r-gebieden.py — niet met de hand aanpassen.\n"
    "export const R_REGIONS: Record<string, string> = " + json.dumps(out, indent=2) + ";\n")
print(json.dumps(out))

# Productfoto's uitknippen en op één vaste ondergrond zetten: vierkant, warm lichtgrijs, zachte natuurlijke schaduw.
# Elk product even groot en gecentreerd, zodat alle productbeelden in de cases één familie vormen.
# Gebruik: ~/.rink-tools/imgenv/bin/python scripts/product-achtergrond.py [--proef <map>] public/work/<slug>/<bestand>.webp ...
#   Zonder --proef: vervangt het bestand (nieuwe hash in de naam) en werkt manifest.json bij.
#   Met --proef <map>: schrijft alleen voorbeelden naar die map, verandert niets in de site.
import sys, json, hashlib, pathlib, numpy as np
from PIL import Image, ImageFilter
from rembg import remove, new_session

SIZE = 2048
BG = (243, 241, 236)      # warm lichtgrijs, bijna wit (iets lichter dan de pagina #EBE8E2)
FILL = 0.70               # langste zijde van het product = 70% van het vlak
LIFT = 0.03               # product iets boven het midden, ruimte voor de schaduw
sess = new_session("isnet-general-use")

def shadow(alpha, dy, blur, strength):
    a = alpha.point(lambda v: int(v * strength))
    a = a.transform(a.size, Image.AFFINE, (1, 0, 0, 0, 1, -dy)).filter(ImageFilter.GaussianBlur(blur))
    layer = Image.new("RGBA", a.size, (58, 46, 34, 0)); layer.putalpha(a)
    return layer

def render(src):
    im = Image.open(src).convert("RGB")
    cut = remove(im, session=sess, post_process_mask=True)
    box = cut.split()[-1].point(lambda v: 255 if v > 24 else 0).getbbox()
    cut = cut.crop(box)
    s = FILL * SIZE / max(cut.size)
    cut = cut.resize((max(1, round(cut.width * s)), max(1, round(cut.height * s))), Image.LANCZOS)
    x = (SIZE - cut.width) // 2
    y = round((SIZE - cut.height) / 2 - SIZE * LIFT)
    alpha = Image.new("L", (SIZE, SIZE), 0); alpha.paste(cut.split()[-1], (x, y))
    out = Image.new("RGBA", (SIZE, SIZE), BG + (255,))
    out.alpha_composite(shadow(alpha, int(SIZE * 0.022), SIZE * 0.028, 0.30))  # zachte slagschaduw
    out.alpha_composite(shadow(alpha, int(SIZE * 0.005), SIZE * 0.006, 0.28))  # contactschaduw
    out.alpha_composite(cut, (x, y))
    return out.convert("RGB")

args = sys.argv[1:]
proef = None
if args[:1] == ["--proef"]:
    proef = pathlib.Path(args[1]); proef.mkdir(parents=True, exist_ok=True); args = args[2:]

for f in map(pathlib.Path, args):
    img = render(f)
    if proef:
        img.save(proef / (f.parent.name + "_" + f.stem + ".jpg"), quality=85); print("proef", f); continue
    data = __import__("io").BytesIO(); img.save(data, "WEBP", quality=86); data = data.getvalue()
    stem = f.stem.rsplit("-", 1)[0]
    new = f.with_name(f"{stem}-{hashlib.sha1(data).hexdigest()[:8]}.webp")
    new.write_bytes(data)
    if new != f: f.unlink()
    man = f.parent / "manifest.json"; m = json.loads(man.read_text())
    for b in m["blocks"]:
        for it in b["items"]:
            if it["file"] == f.name:
                it.update(file=new.name, src=f"/work/{f.parent.name}/{new.name}", w=SIZE, h=SIZE)
    man.write_text(json.dumps(m, indent=2, ensure_ascii=False) + "\n")
    print("ok", new)

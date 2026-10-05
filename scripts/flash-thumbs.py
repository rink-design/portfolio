# Maakt kleine versies (480 px) van alle beelden op de site voor de flits achter het portret in About.
# Gebruik: ~/.rink-tools/imgenv/bin/python scripts/flash-thumbs.py   (vanuit de projectmap)
# Schrijft public/flash/<hash>.webp en public/flash/manifest.json. Video's tellen niet mee (alleen hun stilstaande beeld).
import glob, hashlib, io, json, os
from PIL import Image

files = []
for ext in ("webp", "jpg", "jpeg", "png"):
    files += glob.glob(f"public/work/*/*.{ext}")
files += glob.glob("public/covers/*.webp") + glob.glob("public/sites/*.webp")
os.makedirs("public/flash", exist_ok=True)
for old in glob.glob("public/flash/*.webp"):
    os.remove(old)
names = []
for p in sorted(set(files)):
    im = Image.open(p).convert("RGB")
    w, h = im.size
    if h > w * 1.8:  # lange websites: bovenste stuk
        im = im.crop((0, 0, w, int(w * 1.25)))
    im.thumbnail((480, 480), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, "WEBP", quality=66); data = b.getvalue()
    name = hashlib.md5(data).hexdigest()[:8] + ".webp"
    open(f"public/flash/{name}", "wb").write(data); names.append(name)
json.dump(names, open("public/flash/manifest.json", "w"))
print(len(names), "beelden")

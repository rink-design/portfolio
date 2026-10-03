# Product uitknippen en op de RINK-studioachtergrond zetten.
# Gebruik: python3 scripts/achtergrond-studio.py <in.png> <uit.jpg> [<in2> <uit2> ...]  (pip install "rembg[cpu]")
# Product uitknippen en op RINK-studioachtergrond zetten (verloop + zachte schaduw).
import sys, numpy as np
from PIL import Image, ImageFilter
from rembg import remove, new_session
sess = new_session("isnet-general-use")
TOP, BOT = np.array([22, 34, 48]), np.array([150, 170, 186])
def studio(w, h):
    t = np.linspace(0, 1, h)[:, None] ** 1.3
    g = (TOP * (1 - t) + BOT * t)[:, None, :].repeat(w, 1)
    # lichte vignet/spot in het midden-onder
    yy, xx = np.mgrid[0:h, 0:w]
    spot = np.exp(-(((xx - w / 2) / (w * 0.55)) ** 2 + ((yy - h * 0.72) / (h * 0.45)) ** 2))
    g = g + spot[..., None] * 28
    return Image.fromarray(np.clip(g, 0, 255).astype("uint8"))
for src, dst in zip(sys.argv[1::2], sys.argv[2::2]):
    im = Image.open(src).convert("RGB")
    im.thumbnail((2048, 2048))
    cut = remove(im, session=sess, post_process_mask=True)
    w, h = im.size
    bg = studio(w, h).convert("RGBA")
    a = cut.split()[-1]
    # schaduw: alfa omlaag verschoven, vervaagd
    sh = Image.new("RGBA", (w, h), (8, 14, 22, 0)); sh.putalpha(a.point(lambda v: int(v * 0.55)))
    sh = sh.transform((w, h), Image.AFFINE, (1, 0, 0, 0, 1, -int(h * 0.02))).filter(ImageFilter.GaussianBlur(w * 0.018))
    bg.alpha_composite(sh); bg.alpha_composite(cut)
    bg.convert("RGB").save(dst, quality=92)
    print("ok", dst)

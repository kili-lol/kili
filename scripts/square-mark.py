#!/usr/bin/env python3
"""Tight square WREX face → favicon, letscash PFP, header mark."""
from pathlib import Path
from PIL import Image, ImageDraw
import json
import importlib.util

spec = importlib.util.spec_from_file_location("px", "/workspace/scripts/pixel-cats.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

INK = (7, 8, 7)
ACID = (165, 250, 0)

# Face window: 18x18, full outline, chin in frame, no empty floor.
X0, Y0, S = 3, 0, 18


def face_img():
    full = mod.paint("wrex")
    return full.crop((X0, Y0, X0 + S, Y0 + S))


def framed(src: Image.Image, out: int, pad: int = 0):
    inner = out - pad * 2
    cat = src.resize((inner, inner), Image.NEAREST)
    canvas = Image.new("RGB", (out, out), INK)
    canvas.paste(cat, (pad, pad))
    if pad:
        d = ImageDraw.Draw(canvas)
        s = max(8, pad)
        c = ACID
        w = max(2, pad // 4)
        for a, b, e, f in [
            (s, s, s * 2, s),
            (s, s, s, s * 2),
            (out - s, s, out - s * 2, s),
            (out - s, s, out - s, s * 2),
            (s, out - s, s * 2, out - s),
            (s, out - s, s, out - s * 2),
            (out - s, out - s, out - s * 2, out - s),
            (out - s, out - s, out - s, out - s * 2),
        ]:
            d.line([(a, b), (e, f)], fill=c, width=w)
    return canvas


def svg_from(img: Image.Image) -> str:
    w, h = img.size
    px = img.load()
    rects = []
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            rects.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="#{r:02x}{g:02x}{b:02x}"/>')
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'shape-rendering="crispEdges">\n'
        + "\n".join(rects)
        + "\n</svg>\n"
    )


def main():
    face = face_img()
    prev = Path("/workspace/screenshots/x")
    prev.mkdir(parents=True, exist_ok=True)
    pub = Path("/workspace/public")
    xdir = pub / "x"
    xdir.mkdir(exist_ok=True)

    # Native 16
    face.save(prev / "face-16.png")
    face.resize((512, 512), Image.NEAREST).save(prev / "face-512.png")

    # Favicon
    (pub / "favicon.svg").write_text(svg_from(face))
    face.resize((32, 32), Image.NEAREST).save(pub / "favicon-32.png")
    face.resize((48, 48), Image.NEAREST).save(pub / "favicon-48.png")
    framed(face, 180).save(pub / "icon-180.png")
    framed(face, 192).save(pub / "icon-192.png")
    framed(face, 512).save(pub / "icon-512.png")

    # LetsCash + X profile: filled square, acid corners
    framed(face, 400, pad=16).save(xdir / "logo.png")
    framed(face, 512, pad=20).save(xdir / "logo-512.png")
    framed(face, 1024, pad=32).save(pub / "letscash.png")
    framed(face, 1024, pad=0).save(pub / "letscash-full.png")  # edge-to-edge punch

    # Preview
    framed(face, 1024, pad=32).save(prev / "letscash.png")
    framed(face, 1024, pad=0).save(prev / "letscash-full.png")

    # Header sprite rows (16x16 hex colors not needed — dump chars from wrex crop)
    data = json.loads(Path("/workspace/src/lib/pixel-cats.json").read_text())
    wrex = data["wrex"]
    rows = [r[X0 : X0 + S] for r in wrex["rows"][Y0 : Y0 + S]]
    Path("/workspace/src/lib/logo-face.json").write_text(
        json.dumps({"pal": wrex["pal"], "rows": rows}, indent=2)
    )
    print("face", S, "x", S)
    for r in rows:
        print(r)


if __name__ == "__main__":
    main()

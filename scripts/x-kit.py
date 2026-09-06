#!/usr/bin/env python3
"""X logo 400, banner 1500x500, article cover 1500x600 (5:2)."""
from pathlib import Path
from PIL import Image, ImageDraw
import importlib.util

spec = importlib.util.spec_from_file_location("px", "/workspace/scripts/pixel-cats.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

INK = (7, 8, 7)
ACID = (165, 250, 0)
FG = (232, 237, 227)
MUTE = (125, 132, 118)
LINE = (42, 50, 36)

# 5x7 caps + a few marks. 1 = on.
F = {
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    "C": ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
    "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "F": ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    "G": ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
    "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    "I": ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "L": ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    "M": ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    "N": ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "U": ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    "V": ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    "W": ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
    "X": ["10001", "01010", "00100", "00100", "00100", "01010", "10001"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "Z": ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
    "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
    "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
    "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
    "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
    "$": ["00100", "01111", "10100", "01110", "00101", "11110", "00100"],
    "%": ["11001", "11010", "00100", "01000", "10110", "10011", "00000"],
    "/": ["00001", "00010", "00100", "01000", "10000", "00000", "00000"],
    ":": ["00000", "00100", "00100", "00000", "00100", "00100", "00000"],
    ".": ["00000", "00000", "00000", "00000", "00000", "00100", "00100"],
    "=": ["00000", "00000", "11111", "00000", "11111", "00000", "00000"],
    "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
    " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
}


def blit_text(img, text, x, y, scale, color):
    px = img.load()
    cx = x
    for ch in text.upper():
        glyph = F.get(ch, F[" "])
        for gy, row in enumerate(glyph):
            for gx, bit in enumerate(row):
                if bit == "1":
                    for oy in range(scale):
                        for ox in range(scale):
                            xx, yy = cx + gx * scale + ox, y + gy * scale + oy
                            if 0 <= xx < img.width and 0 <= yy < img.height:
                                px[xx, yy] = color
        cx += 6 * scale  # 5 + 1 gap
    return cx


def text_width(text, scale):
    return len(text) * 6 * scale


def corners(draw, w, h, c=ACID, s=24):
    draw.line([(s, s), (s * 2, s)], fill=c, width=4)
    draw.line([(s, s), (s, s * 2)], fill=c, width=4)
    draw.line([(w - s, s), (w - s * 2, s)], fill=c, width=4)
    draw.line([(w - s, s), (w - s, s * 2)], fill=c, width=4)
    draw.line([(s, h - s), (s * 2, h - s)], fill=c, width=4)
    draw.line([(s, h - s), (s, h - s * 2)], fill=c, width=4)
    draw.line([(w - s, h - s), (w - s * 2, h - s)], fill=c, width=4)
    draw.line([(w - s, h - s), (w - s, h - s * 2)], fill=c, width=4)


def cat(name, size):
    return mod.paint(name).resize((size, size), Image.NEAREST)


def dither_bg(w, h):
    img = Image.new("RGB", (w, h), INK)
    px = img.load()
    for y in range(0, h, 4):
        for x in range(0, w, 4):
            if (x // 4 + y // 4) % 6 == 0:
                px[x, y] = LINE
    return img


def logo():
    size = 400
    img = Image.new("RGB", (size, size), INK)
    face = cat("wrex", 336)
    img.paste(face, (32, 32))
    d = ImageDraw.Draw(img)
    corners(d, size, size, s=16)
    return img


def banner():
    w, h = 1500, 500
    img = dither_bg(w, h)
    # hero
    hero = cat("wrex", 384)
    img.paste(hero, (1080, 58))
    # founder strip
    names = ["phantom", "rot", "scale", "laser", "veil", "beam", "grid"]
    for i, n in enumerate(names):
        img.paste(cat(n, 72), (48 + i * 80, 380))
    blit_text(img, "KILI", 48, 64, 10, ACID)
    blit_text(img, "MUTATE YOUR CATS", 48, 160, 4, FG)
    blit_text(img, "KEEP THE WRONG ONES", 48, 220, 4, ACID)
    blit_text(img, "$KILI  /  KILI.LOL", 48, 280, 3, MUTE)
    d = ImageDraw.Draw(img)
    corners(d, w, h, s=20)
    return img


def article_cover():
    w, h = 1500, 600  # 5:2
    img = dither_bg(w, h)
    img.paste(cat("wrex", 504), (960, 48))
    blit_text(img, "KEEP THE", 56, 120, 8, ACID)
    blit_text(img, "WRONG ONES", 56, 200, 8, ACID)
    blit_text(img, "A CAT IS FOUR ORGANS", 56, 320, 4, FG)
    blit_text(img, "MIX 2  50/50  6% MUTANT", 56, 380, 3, MUTE)
    blit_text(img, "COAT MISMATCH = CHIMERA", 56, 430, 3, MUTE)
    blit_text(img, "$KILI", 56, 500, 4, ACID)
    d = ImageDraw.Draw(img)
    corners(d, w, h, s=24)
    return img


def main():
    out = Path("/workspace/public/x")
    out.mkdir(parents=True, exist_ok=True)
    prev = Path("/workspace/screenshots/x")
    prev.mkdir(parents=True, exist_ok=True)
    logo().save(out / "logo.png")
    logo().resize((512, 512), Image.NEAREST).save(out / "logo-512.png")
    banner().save(out / "banner.png")
    article_cover().save(out / "article-cover.png")
    for name in ("logo", "banner", "article-cover"):
        Image.open(out / f"{name}.png").save(prev / f"{name}.png")
    print("x kit written")


if __name__ == "__main__":
    main()

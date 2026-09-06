#!/usr/bin/env python3
"""24x24 KILI sitting cats. Right-facing loaf — ears, snout, tail up, paws.

Style is original. Not a MoonCat or Shutterstock copy.
"""
from pathlib import Path
from PIL import Image
import json

SIZE = 24
SCALE = 32

# Sitting, facing right. Head on the right, rump left, tail up.
# . bg  X outline  A fur  B shade  C belly  E eye  P pupil
# N nose  M mouth  T tail  L paw  H whisker
SIL = [
    ".............XX....XX...",  # 0 ears
    "............XAAX..XAAX..",  # 1
    "............XAAAAAAAAX..",  # 2
    "............XAEAAAAEAX..",  # 3
    "............XAEPAAEPAX..",  # 4
    "............XAAAANAAAX..",  # 5
    "H...........XAAAAMAAAX.H",  # 6
    "T...........XAAAAAAAAX..",  # 7
    "TT........XAAAAAAAAAAX..",  # 8
    ".T.......XAAAAAAAAAAAX..",  # 9
    "..XXXXXXXAAAAAAAAAAAAX..",  # 10
    "..XAAAAAAAAAAAAAAAAAAX..",  # 11
    "..XAAAACCCCCCCCCCCAAAX..",  # 12
    "..XAAAACCCCCCCCCCCAAAX..",  # 13
    "..XAAAAAAAAAAAAAAAAAAX..",  # 14
    "..XAAAAAAAAAAAAAAAAAAX..",  # 15
    "...XAAAAAAAAAAAAAAAAX...",  # 16
    "...XAAAAX......XAAAAX...",  # 17
    "...XAAAAX......XAAAAX...",  # 18
    "...XXLLX........XLLXX...",  # 19
    "...XLLLX........XLLLX...",  # 20
    "...XLLLX........XLLLX...",  # 21
    "...XXXXX........XXXXX...",  # 22
    "........................",  # 23
]

for i, r in enumerate(SIL):
    if len(r) != 24:
        raise SystemExit(f"SIL[{i}] len={len(r)} {r!r}")

TRAITS = {
    "phantom": {
        "extras": [
            (13, 0, "G"), (14, 0, "G"), (19, 0, "G"), (20, 0, "G"),
            (15, 0, "G"), (16, 0, "G"), (17, 0, "G"), (18, 0, "G"),
            (0, 7, "R"), (0, 8, "O"), (0, 9, "Y"), (1, 8, "I"), (1, 9, "U"),
            (8, 11, "W"), (9, 11, "W"), (10, 11, "W"), (13, 11, "W"), (14, 11, "W"),
            (8, 13, "W"), (9, 13, "W"), (13, 13, "W"), (14, 13, "W"),
        ],
        "pal": {
            ".": "#2a1545", "X": "#0c0614", "A": "#3dffc8", "B": "#149a72", "C": "#9ffff0",
            "E": "#e8ede3", "P": "#0c0614", "N": "#ff8ad2", "M": "#0c0614", "T": "#3dffc8",
            "L": "#149a72", "H": "#0c0614", "G": "#e2c044", "W": "#e8ede3", "R": "#ff5a4a",
            "O": "#ff9a1a", "Y": "#ffe66d", "I": "#a5fa00", "U": "#5a8aff",
        },
    },
    "rot": {
        "extras": [
            (8, 11, "K"), (9, 11, "K"), (10, 11, "K"), (11, 11, "K"), (12, 11, "K"),
            (13, 11, "K"), (14, 11, "K"), (15, 11, "K"),
            (8, 12, "K"), (15, 12, "K"),
            (8, 13, "K"), (11, 13, "."), (12, 13, "."), (15, 13, "K"),
            (13, 3, "R"), (15, 3, "R"), (14, 4, "R"),
            (16, 6, "I"), (16, 7, "I"),
        ],
        "pal": {
            ".": "#1a2410", "X": "#0a1006", "A": "#6a9a28", "B": "#3a5a14", "C": "#8aba3a",
            "E": "#c8ff4a", "P": "#1a1000", "N": "#3a2a10", "M": "#1a1000", "T": "#6a9a28",
            "L": "#3a5a14", "H": "#0a1006", "K": "#2a3a22", "R": "#8a2020", "I": "#a5fa00",
        },
    },
    "scale": {
        "extras": [
            (13, 0, "G"), (14, 0, "G"), (16, 0, "G"), (17, 0, "G"), (19, 0, "G"), (20, 0, "G"),
            (15, 1, "G"), (18, 1, "G"),
            (22, 12, "Y"), (23, 12, "Y"), (22, 13, "O"), (23, 13, "Y"),
            (22, 14, "Y"), (23, 14, "O"), (23, 15, "G"),
            (10, 5, "I"), (18, 5, "I"), (11, 12, "I"), (14, 12, "I"),
        ],
        "pal": {
            ".": "#102418", "X": "#06140c", "A": "#2d8a4a", "B": "#186030", "C": "#6ad88a",
            "E": "#e8ede3", "P": "#06140c", "N": "#c07040", "M": "#06140c", "T": "#2d8a4a",
            "L": "#186030", "H": "#06140c", "G": "#e2c044", "Y": "#ffe66d", "O": "#d4a018",
            "I": "#a5fa00",
        },
    },
    "laser": {
        "extras": [
            # cap between ears
            (16, 1, "K"), (17, 1, "K"),
            (15, 2, "K"), (16, 2, "G"), (17, 2, "G"), (18, 2, "K"),
            (14, 3, "K"), (15, 3, "K"), (16, 3, "K"), (17, 3, "K"), (18, 3, "K"), (19, 3, "K"),
            # beam from right eye
            (21, 4, "R"), (22, 4, "R"), (23, 4, "R"),
        ],
        "pal": {
            ".": "#241810", "X": "#120c08", "A": "#d4783a", "B": "#8a4a20", "C": "#e8a060",
            "E": "#ffe8c8", "P": "#120c08", "N": "#8a3020", "M": "#120c08", "T": "#d4783a",
            "L": "#8a4a20", "H": "#120c08", "K": "#141414", "G": "#e2c044", "R": "#ff5a4a",
        },
    },
    "veil": {
        "extras": [
            (13, 3, "K"), (14, 3, "K"), (15, 3, "K"), (16, 3, "K"), (17, 3, "K"),
            (18, 3, "K"), (19, 3, "K"), (20, 3, "K"),
            (13, 4, "K"), (15, 4, "Y"), (16, 4, "Y"), (18, 4, "Y"), (19, 4, "Y"), (20, 4, "K"),
            (13, 5, "K"), (14, 5, "K"), (15, 5, "K"), (16, 5, "K"), (17, 5, "K"),
            (18, 5, "K"), (19, 5, "K"), (20, 5, "K"),
        ],
        "pal": {
            ".": "#0c1828", "X": "#060e18", "A": "#3a6a8a", "B": "#1a3a52", "C": "#6a9aaa",
            "E": "#0c1828", "P": "#0c1828", "N": "#8a6a5a", "M": "#060e18", "T": "#3a6a8a",
            "L": "#1a3a52", "H": "#060e18", "K": "#121820", "Y": "#ffe66d",
        },
    },
    "beam": {
        "extras": [
            (12, 3, "V"), (13, 3, "V"), (14, 3, "V"), (15, 3, "V"), (16, 3, "V"),
            (17, 3, "V"), (18, 3, "V"), (19, 3, "V"), (20, 3, "V"), (21, 3, "V"),
            (12, 4, "V"), (13, 4, "R"), (14, 4, "R"), (15, 4, "Y"), (18, 4, "Y"),
            (19, 4, "R"), (20, 4, "R"), (21, 4, "V"),
            (12, 5, "V"), (13, 5, "V"), (14, 5, "V"), (15, 5, "V"), (16, 5, "V"),
            (17, 5, "V"), (18, 5, "V"), (19, 5, "V"), (20, 5, "V"), (21, 5, "V"),
            (8, 11, "O"), (9, 11, "O"), (10, 11, "O"), (14, 11, "O"), (15, 11, "O"),
            (8, 12, "O"), (15, 12, "O"),
            (8, 13, "O"), (9, 13, "Y"), (14, 13, "Y"), (15, 13, "O"),
        ],
        "pal": {
            ".": "#201208", "X": "#100804", "A": "#4a4a48", "B": "#2a2a28", "C": "#6a6a68",
            "E": "#ff9a40", "P": "#100804", "N": "#8a4a30", "M": "#100804", "T": "#4a4a48",
            "L": "#2a2a28", "H": "#100804", "V": "#3a1810", "R": "#ff5a4a", "Y": "#ffe66d",
            "O": "#e07020",
        },
    },
    "grid": {
        "extras": [
            (15, 2, "I"), (18, 2, "I"),
            (10, 11, "I"), (13, 11, "I"),
            (9, 13, "I"), (14, 13, "I"),
            (0, 7, "I"),
        ],
        "pal": {
            ".": "#0a1818", "X": "#061010", "A": "#2a8a8a", "B": "#145454", "C": "#4ababa",
            "E": "#e8ede3", "P": "#061010", "N": "#8a6a5a", "M": "#061010", "T": "#2a8a8a",
            "L": "#145454", "H": "#061010", "I": "#a5fa00",
        },
    },
    "wrex": {
        "extras": [
            (13, 0, "G"), (15, 0, "G"), (16, 0, "G"), (17, 0, "G"), (19, 0, "G"), (20, 0, "G"),
            (14, 0, "G"), (18, 0, "G"),
            (12, 3, "K"), (13, 3, "K"), (14, 3, "K"), (15, 3, "K"), (16, 3, "K"),
            (17, 3, "K"), (18, 3, "K"), (19, 3, "K"), (20, 3, "K"), (21, 3, "K"),
            (12, 4, "K"), (13, 4, "R"), (14, 4, "Y"), (19, 4, "Y"), (20, 4, "R"), (21, 4, "K"),
            (12, 5, "K"), (13, 5, "K"), (14, 5, "K"), (15, 5, "K"), (16, 5, "K"),
            (17, 5, "K"), (18, 5, "K"), (19, 5, "K"), (20, 5, "K"), (21, 5, "K"),
            (22, 4, "R"), (23, 4, "R"),
            (0, 11, "I"), (1, 11, "I"), (0, 12, "I"),
            (8, 11, "W"), (9, 11, "W"), (14, 11, "W"), (15, 11, "W"),
            (11, 2, "D"), (11, 10, "D"), (11, 12, "D"), (11, 14, "D"),
            (17, 18, "G"), (18, 18, "G"),
            (2, 1, "I"), (21, 1, "I"),
        ],
        "pal": {
            ".": "#08060a", "X": "#1a1008", "A": "#e2c044", "B": "#8a6a14", "C": "#ffe66d",
            "D": "#3dffc8", "E": "#ffe66d", "P": "#08060a", "N": "#ff5a4a", "M": "#08060a",
            "T": "#e2c044", "L": "#8a6a14", "H": "#1a1008", "G": "#ffe66d", "K": "#141018",
            "R": "#ff5a4a", "Y": "#a5fa00", "W": "#e8ede3", "I": "#a5fa00",
        },
    },
}


def paint(name: str) -> Image.Image:
    spec = TRAITS[name]
    pal = spec["pal"]
    grid = [list(r) for r in SIL]
    for x, y, ch in spec["extras"]:
        if 0 <= y < SIZE and 0 <= x < SIZE:
            grid[y][x] = ch
    img = Image.new("RGB", (SIZE, SIZE), pal["."])
    px = img.load()
    for y, row in enumerate(grid):
        for x, ch in enumerate(row):
            h = pal.get(ch, pal["."]).lstrip("#")
            px[x, y] = tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))
    return img


def main():
    out = Path("/workspace/public/cats")
    prev = Path("/workspace/screenshots/pixels")
    prev.mkdir(parents=True, exist_ok=True)
    n = len(TRAITS)
    sheet = Image.new("RGB", (SIZE * SCALE * n, SIZE * SCALE), (7, 8, 7))
    for i, name in enumerate(TRAITS):
        raw = paint(name)
        big = raw.resize((SIZE * SCALE, SIZE * SCALE), Image.NEAREST)
        raw.resize((1024, 1024), Image.NEAREST).save(out / f"{name}.png")
        big.save(prev / f"{name}.png")
        sheet.paste(big, (i * SIZE * SCALE, 0))
        print(name, "ok")
    base = Image.new("RGB", (SIZE, SIZE), (16, 18, 16))
    bpal = {
        ".": "#101210", "X": "#e8ede3", "A": "#7d8476", "B": "#7d8476", "C": "#b0b8aa",
        "E": "#a5fa00", "P": "#070807", "N": "#ff5a4a", "M": "#070807", "T": "#7d8476",
        "L": "#5a6058", "H": "#e8ede3",
    }
    px = base.load()
    for y, row in enumerate(SIL):
        for x, ch in enumerate(row):
            h = bpal.get(ch, bpal["."]).lstrip("#")
            px[x, y] = tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))
    base.resize((SIZE * SCALE, SIZE * SCALE), Image.NEAREST).save(prev / "base.png")
    sheet.save(prev / "sheet.png")
    Path("/workspace/public/cats/volt.png").write_bytes(Path("/workspace/public/cats/beam.png").read_bytes())
    data = {}
    for name in TRAITS:
        spec = TRAITS[name]
        grid = [list(r) for r in SIL]
        for x, y, ch in spec["extras"]:
            if 0 <= y < SIZE and 0 <= x < SIZE:
                grid[y][x] = ch
        data[name] = {"pal": spec["pal"], "rows": ["".join(r) for r in grid]}
    Path("/workspace/src/lib/pixel-cats.json").write_text(json.dumps(data, indent=2))
    print("json + base written")


if __name__ == "__main__":
    main()

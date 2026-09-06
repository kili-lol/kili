#!/usr/bin/env python3
"""24x24 KILI cat faces. Front-facing PFP heads — ears, inner ear, muzzle.

Original. Not a copy of the Alamy/Shutterstock sheets.
"""
from pathlib import Path
from PIL import Image
import json

SIZE = 24
SCALE = 32

# Front-facing cat head + tiny chest/paws so organs still mix.
# . bg  X outline  A fur  C chest  E eye  P pupil
# N nose  M mouth  S inner ear  L paw  T tail  H whisker
SIL = [
    "......XX........XX......",  # 0 ear tips
    ".....XSSX......XSSX.....",  # 1
    ".....XSSX......XSSX.....",  # 2
    "....XAAAAAAAAAAAAAAX....",  # 3
    "...XAAAAAAAAAAAAAAAAX...",  # 4
    "...XAAAAAAAAAAAAAAAAX...",  # 5
    "...XAEEAAAAAAAAEEAAAX...",  # 6
    "...XAPPAAAAAAAAAPPAAX...",  # 7
    "...XAAAAAAAAAAAAAAAAX...",  # 8
    "...XAAAAAAAANNAAAAAAX...",  # 9
    "...XAAAAAAAM..MAAAAAX...",  # 10
    "H..XAAAAAAAAAAAAAAAAX..H",  # 11
    "....XAAAAAAAAAAAAAAX....",  # 12
    ".....XXXXXXXXXXXXXX.....",  # 13 chin
    "T...XAAAAAAAAAAAAAAX....",  # 14 chest + tail stub
    "TT.XAAAACCCCCCCCAAAAX...",  # 15
    ".T.XAAAAAAAAAAAAAAAAX...",  # 16
    "...XAAAAX......XAAAAX...",  # 17 paws
    "...XXLLX........XLLXX...",  # 18
    "...XXXXX........XXXXX...",  # 19
    "........................",
    "........................",
    "........................",
    "........................",
]

for i, r in enumerate(SIL):
    if len(r) != 24:
        raise SystemExit(f"SIL[{i}] len={len(r)} {r!r}")

TRAITS = {
    "phantom": {
        "extras": [
            (6, 0, "G"), (7, 0, "G"), (16, 0, "G"), (17, 0, "G"),
            (8, 0, "G"), (11, 0, "G"), (12, 0, "G"), (15, 0, "G"),
            (9, 1, "G"), (10, 1, "G"), (13, 1, "G"), (14, 1, "G"),
            (0, 14, "R"), (0, 15, "O"), (0, 16, "Y"), (1, 15, "I"), (1, 16, "U"),
            (9, 15, "W"), (10, 15, "W"), (13, 15, "W"), (14, 15, "W"),
        ],
        "pal": {
            ".": "#2a1545", "X": "#0c0614", "A": "#3dffc8", "C": "#9ffff0",
            "E": "#e8ede3", "P": "#0c0614", "N": "#ff8ad2", "M": "#0c0614",
            "S": "#ff8ad2", "T": "#3dffc8", "L": "#149a72", "H": "#0c0614",
            "G": "#e2c044", "W": "#e8ede3", "R": "#ff5a4a", "O": "#ff9a1a",
            "Y": "#ffe66d", "U": "#5a8aff", "I": "#a5fa00",
        },
    },
    "rot": {
        "extras": [
            (8, 15, "K"), (9, 15, "K"), (10, 15, "K"), (11, 15, "K"),
            (12, 15, "K"), (13, 15, "K"), (14, 15, "K"), (15, 15, "K"),
            (8, 16, "K"), (11, 16, "."), (12, 16, "."), (15, 16, "K"),
            (5, 6, "R"), (7, 6, "R"), (6, 7, "R"),
            (12, 11, "Y"),
        ],
        "pal": {
            ".": "#1a2410", "X": "#0a1006", "A": "#6a9a28", "C": "#8aba3a",
            "E": "#c8ff4a", "P": "#1a1000", "N": "#3a2a10", "M": "#1a1000",
            "S": "#3a5a14", "T": "#6a9a28", "L": "#3a5a14", "H": "#0a1006",
            "K": "#2a3a22", "R": "#8a2020", "Y": "#a5fa00",
        },
    },
    "scale": {
        "extras": [
            (6, 0, "G"), (7, 0, "G"), (11, 0, "G"), (12, 0, "G"), (16, 0, "G"), (17, 0, "G"),
            (9, 1, "G"), (14, 1, "G"),
            (8, 5, "Y"), (15, 5, "Y"),
            (10, 15, "Y"), (13, 15, "Y"),
        ],
        "pal": {
            ".": "#102418", "X": "#06140c", "A": "#2d8a4a", "C": "#6ad88a",
            "E": "#e8ede3", "P": "#06140c", "N": "#c07040", "M": "#06140c",
            "S": "#186030", "T": "#2d8a4a", "L": "#186030", "H": "#06140c",
            "G": "#e2c044", "Y": "#ffe66d",
        },
    },
    "laser": {
        "extras": [
            (9, 2, "K"), (10, 2, "K"), (11, 2, "K"), (12, 2, "K"), (13, 2, "K"), (14, 2, "K"),
            (8, 3, "K"), (9, 3, "K"), (10, 3, "G"), (11, 3, "G"), (12, 3, "G"), (13, 3, "K"), (14, 3, "K"), (15, 3, "K"),
            (7, 4, "K"), (8, 4, "K"), (9, 4, "K"), (10, 4, "K"), (11, 4, "K"), (12, 4, "K"),
            (13, 4, "K"), (14, 4, "K"), (15, 4, "K"), (16, 4, "K"),
            (18, 7, "R"), (19, 7, "R"), (20, 7, "R"), (21, 7, "R"), (22, 7, "R"), (23, 7, "R"),
        ],
        "pal": {
            ".": "#241810", "X": "#120c08", "A": "#d4783a", "C": "#e8a060",
            "E": "#ffe8c8", "P": "#120c08", "N": "#8a3020", "M": "#120c08",
            "S": "#8a4a20", "T": "#d4783a", "L": "#8a4a20", "H": "#120c08",
            "K": "#141414", "G": "#e2c044", "R": "#ff5a4a",
        },
    },
    "veil": {
        "extras": [
            (5, 6, "K"), (6, 6, "K"), (7, 6, "K"), (8, 6, "K"), (9, 6, "K"), (10, 6, "K"),
            (11, 6, "K"), (12, 6, "K"), (13, 6, "K"), (14, 6, "K"), (15, 6, "K"), (16, 6, "K"), (17, 6, "K"), (18, 6, "K"),
            (5, 7, "K"), (7, 7, "Y"), (8, 7, "Y"), (9, 7, "Y"), (14, 7, "Y"), (15, 7, "Y"), (16, 7, "Y"), (18, 7, "K"),
            (5, 8, "K"), (6, 8, "K"), (7, 8, "K"), (8, 8, "K"), (9, 8, "K"), (10, 8, "K"),
            (11, 8, "K"), (12, 8, "K"), (13, 8, "K"), (14, 8, "K"), (15, 8, "K"), (16, 8, "K"), (17, 8, "K"), (18, 8, "K"),
        ],
        "pal": {
            ".": "#0c1828", "X": "#060e18", "A": "#3a6a8a", "C": "#6a9aaa",
            "E": "#0c1828", "P": "#0c1828", "N": "#8a6a5a", "M": "#060e18",
            "S": "#1a3a52", "T": "#3a6a8a", "L": "#1a3a52", "H": "#060e18",
            "K": "#121820", "Y": "#ffe66d",
        },
    },
    "beam": {
        "extras": [
            (4, 6, "V"), (5, 6, "V"), (6, 6, "V"), (7, 6, "V"), (8, 6, "V"), (9, 6, "V"),
            (10, 6, "V"), (11, 6, "V"), (12, 6, "V"), (13, 6, "V"), (14, 6, "V"), (15, 6, "V"),
            (16, 6, "V"), (17, 6, "V"), (18, 6, "V"), (19, 6, "V"),
            (4, 7, "V"), (5, 7, "R"), (6, 7, "R"), (7, 7, "Y"), (8, 7, "Y"),
            (15, 7, "Y"), (16, 7, "Y"), (17, 7, "R"), (18, 7, "R"), (19, 7, "V"),
            (4, 8, "V"), (5, 8, "V"), (6, 8, "V"), (7, 8, "V"), (8, 8, "V"), (9, 8, "V"),
            (10, 8, "V"), (11, 8, "V"), (12, 8, "V"), (13, 8, "V"), (14, 8, "V"), (15, 8, "V"),
            (16, 8, "V"), (17, 8, "V"), (18, 8, "V"), (19, 8, "V"),
            (8, 15, "O"), (9, 15, "O"), (14, 15, "O"), (15, 15, "O"),
            (8, 16, "O"), (9, 16, "Y"), (14, 16, "Y"), (15, 16, "O"),
        ],
        "pal": {
            ".": "#201208", "X": "#100804", "A": "#4a4a48", "C": "#6a6a68",
            "E": "#ff9a40", "P": "#100804", "N": "#8a4a30", "M": "#100804",
            "S": "#3a1810", "T": "#4a4a48", "L": "#2a2a28", "H": "#100804",
            "V": "#3a1810", "R": "#ff5a4a", "Y": "#ffe66d", "O": "#e07020",
        },
    },
    "grid": {
        "extras": [
            (8, 5, "Y"), (11, 5, "Y"), (15, 5, "Y"),
            (7, 8, "Y"), (16, 8, "Y"),
            (10, 15, "Y"), (13, 15, "Y"),
        ],
        "pal": {
            ".": "#0a1818", "X": "#061010", "A": "#2a8a8a", "C": "#4ababa",
            "E": "#e8ede3", "P": "#061010", "N": "#8a6a5a", "M": "#061010",
            "S": "#145454", "T": "#2a8a8a", "L": "#145454", "H": "#061010",
            "Y": "#a5fa00",
        },
    },
    "wrex": {
        "extras": [
            (5, 0, "G"), (7, 0, "G"), (11, 0, "G"), (12, 0, "G"), (16, 0, "G"), (18, 0, "G"),
            (6, 0, "G"), (8, 1, "G"), (15, 1, "G"), (17, 0, "G"),
            (4, 6, "K"), (5, 6, "K"), (6, 6, "K"), (7, 6, "K"), (8, 6, "K"), (9, 6, "K"),
            (10, 6, "K"), (11, 6, "K"), (12, 6, "K"), (13, 6, "K"), (14, 6, "K"), (15, 6, "K"),
            (16, 6, "K"), (17, 6, "K"), (18, 6, "K"), (19, 6, "K"),
            (4, 7, "K"), (5, 7, "R"), (6, 7, "Y"), (7, 7, "Y"),
            (16, 7, "Y"), (17, 7, "Y"), (18, 7, "R"), (19, 7, "K"),
            (4, 8, "K"), (5, 8, "K"), (6, 8, "K"), (7, 8, "K"), (8, 8, "K"), (9, 8, "K"),
            (10, 8, "K"), (11, 8, "K"), (12, 8, "K"), (13, 8, "K"), (14, 8, "K"), (15, 8, "K"),
            (16, 8, "K"), (17, 8, "K"), (18, 8, "K"), (19, 8, "K"),
            (0, 7, "R"), (1, 7, "R"), (2, 7, "R"), (20, 7, "R"), (21, 7, "R"), (22, 7, "R"), (23, 7, "R"),
            (11, 4, "D"), (12, 4, "A"), (11, 9, "D"), (12, 9, "A"), (11, 15, "D"), (12, 15, "A"),
            (9, 15, "W"), (14, 15, "W"),
            (2, 2, "Y"), (21, 2, "Y"),
        ],
        "pal": {
            ".": "#08060a", "X": "#1a1008", "A": "#e2c044", "C": "#ffe66d",
            "E": "#ffe66d", "P": "#08060a", "N": "#ff5a4a", "M": "#08060a",
            "S": "#8a6a14", "T": "#e2c044", "L": "#8a6a14", "H": "#1a1008",
            "G": "#ffe66d", "K": "#141018", "R": "#ff5a4a", "Y": "#a5fa00",
            "W": "#e8ede3", "D": "#3dffc8",
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
        ".": "#101210", "X": "#e8ede3", "A": "#8a9084", "C": "#b0b8aa",
        "E": "#a5fa00", "P": "#070807", "N": "#ff8ad2", "M": "#070807",
        "I": "#ff8ad2", "S": "#ff8ad2", "T": "#8a9084", "L": "#5a6058", "H": "#e8ede3",
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

#!/usr/bin/env python3
"""24x24 KILI cats. Sitting feline silhouette — ears, whiskers, muzzle, tail."""
from pathlib import Path
from PIL import Image

SIZE = 24
SCALE = 32

# Sitting cat. Tall ears with a forehead valley, tapered muzzle, whiskers, tail.
# Round blob + side nubs reads as a bird. Do not merge the head into an egg.
SIL = [
    ".....XX........XX.......",  # 0 ear tips
    "....XAAX......XAAX......",  # 1
    "...XAAAAX....XAAAAX.....",  # 2
    "...XAAAAX....XAAAAX.....",  # 3
    "...XAAAAX....XAAAAX.....",  # 4 valley still open
    "..XAAAAAAXXXXAAAAAAX....",  # 5 brow
    "..XAAAAAAAAAAAAAAAAX....",  # 6
    "..XAEEAAAAAAAAEEAAAX....",  # 7 eyes
    "..XAEPAAAAAAAAEPAAAX....",  # 8
    "..XAAAAAAAAAAAAAAAAX....",  # 9
    "...XAAAAANNNNAAAAAX.....",  # 10 muzzle
    "H...XAAAAMMMMAAAAX...H..",  # 11
    ".H...XAAAAAAAAAAX...H...",  # 12
    "......XAAAAAAAAX........",  # 13 chin
    "..XAAAACCCCCCCCAAAAX....",  # 14 chest
    "..XAACCCCCCCCCCCAAAX.XX.",  # 15
    "..XAACCCCCCCCCCCAAAXTABX",  # 16
    "..XAAAAAAAAAAAAAAAAXTAXX",  # 17
    "...XAAAAAAAAAAAAAAXXXAX.",  # 18
    "...XAAAAX....XAAAAX.....",  # 19
    "...XXLLX......XLLXX.....",  # 20
    "...XLLLX......XLLLX.....",  # 21
    "...XXXXX......XXXXX.....",  # 22
    "........................",  # 23
]


def _check():
    for i, r in enumerate(SIL):
        if len(r) != 24:
            raise SystemExit(f"SIL[{i}] len={len(r)} {r!r}")


_check()

TRAITS = {
    "phantom": {
        "extras": [
            # crown sits on ears, ears still read as triangles
            (5, 0, "G"), (6, 0, "G"), (17, 0, "G"), (18, 0, "G"),
            (4, 1, "G"), (19, 1, "G"),
            (8, 0, "G"), (11, 0, "G"), (12, 0, "G"), (15, 0, "G"),
            (9, 1, "G"), (10, 1, "G"), (11, 1, "G"), (12, 1, "G"), (13, 1, "G"), (14, 1, "G"),
            # rainbow flag left of body
            (0, 13, "R"), (1, 13, "R"),
            (0, 14, "O"), (1, 14, "O"),
            (0, 15, "Y"), (1, 15, "Y"),
            (0, 16, "I"), (1, 16, "I"),
            (0, 17, "U"), (1, 17, "U"),
            (0, 18, "F"), (1, 18, "F"),
            # ribs
            (8, 14, "W"), (9, 14, "W"), (10, 14, "W"), (13, 14, "W"), (14, 14, "W"), (15, 14, "W"),
            (8, 16, "W"), (9, 16, "W"), (14, 16, "W"), (15, 16, "W"),
        ],
        "pal": {
            ".": "#2a1545", "X": "#0c0614", "A": "#3dffc8", "B": "#149a72", "C": "#9ffff0",
            "E": "#e8ede3", "P": "#0c0614", "N": "#ff8ad2", "M": "#0c0614", "T": "#3dffc8",
            "L": "#149a72", "H": "#0c0614", "G": "#e2c044", "W": "#e8ede3", "R": "#ff5a4a",
            "O": "#ff9a1a", "Y": "#ffe66d", "I": "#a5fa00", "U": "#5a8aff", "F": "#ff4ad2",
        },
    },
    "rot": {
        "extras": [
            (7, 14, "K"), (8, 14, "K"), (9, 14, "K"), (10, 14, "K"), (11, 14, "K"),
            (12, 14, "K"), (13, 14, "K"), (14, 14, "K"), (15, 14, "K"), (16, 14, "K"),
            (7, 15, "K"), (16, 15, "K"),
            (7, 16, "K"), (10, 16, "K"), (11, 16, "."), (12, 16, "."), (13, 16, "K"), (16, 16, "K"),
            (7, 17, "K"), (16, 17, "K"),
            (4, 7, "R"), (6, 7, "R"),
            (5, 8, "R"),
            (4, 9, "R"), (6, 9, "R"),
            (12, 12, "I"), (12, 13, "I"),
        ],
        "pal": {
            ".": "#1a2410", "X": "#0a1006", "A": "#6a9a28", "B": "#3a5a14", "C": "#8aba3a",
            "E": "#c8ff4a", "P": "#1a1000", "N": "#3a2a10", "M": "#1a1000", "T": "#6a9a28",
            "L": "#3a5a14", "H": "#0a1006", "K": "#2a3a22", "R": "#8a2020", "I": "#a5fa00",
        },
    },
    "scale": {
        "extras": [
            (5, 0, "G"), (6, 0, "G"), (11, 0, "G"), (12, 0, "G"), (17, 0, "G"), (18, 0, "G"),
            (8, 1, "G"), (9, 1, "G"), (10, 1, "G"), (13, 1, "G"), (14, 1, "G"), (15, 1, "G"),
            (0, 12, "Y"), (1, 12, "Y"), (1, 11, "Y"),
            (0, 13, "Y"), (1, 13, "O"),
            (0, 14, "Y"), (1, 14, "Y"),
            (0, 15, "O"), (1, 15, "Y"),
            (1, 16, "G"), (1, 17, "G"),
            (8, 5, "I"), (15, 5, "I"),
            (10, 15, "I"), (13, 15, "I"),
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
            # cap in the forehead valley — ears stay
            (8, 3, "K"), (9, 3, "K"), (10, 3, "K"), (11, 3, "K"), (12, 3, "K"), (13, 3, "K"),
            (8, 4, "K"), (9, 4, "K"), (10, 4, "G"), (11, 4, "G"), (12, 4, "K"), (13, 4, "K"),
            (7, 5, "K"), (8, 5, "K"), (9, 5, "K"), (10, 5, "K"), (11, 5, "K"), (12, 5, "K"), (13, 5, "K"), (14, 5, "K"),
            # laser from right eye
            (18, 8, "R"), (19, 8, "R"), (20, 8, "R"), (21, 8, "R"), (22, 8, "R"), (23, 8, "R"),
        ],
        "pal": {
            ".": "#241810", "X": "#120c08", "A": "#d4783a", "B": "#8a4a20", "C": "#e8a060",
            "E": "#ffe8c8", "P": "#120c08", "N": "#8a3020", "M": "#120c08", "T": "#d4783a",
            "L": "#8a4a20", "H": "#120c08", "K": "#141414", "G": "#e2c044", "R": "#ff5a4a",
        },
    },
    "veil": {
        "extras": [
            (4, 7, "K"), (5, 7, "K"), (6, 7, "K"), (7, 7, "K"), (8, 7, "K"), (9, 7, "K"),
            (10, 7, "K"), (11, 7, "K"), (12, 7, "K"), (13, 7, "K"), (14, 7, "K"), (15, 7, "K"),
            (16, 7, "K"), (17, 7, "K"),
            (4, 8, "K"), (17, 8, "K"),
            (5, 8, "Y"), (6, 8, "Y"), (7, 8, "Y"),
            (14, 8, "Y"), (15, 8, "Y"), (16, 8, "Y"),
            (4, 9, "K"), (5, 9, "K"), (6, 9, "K"), (7, 9, "K"), (8, 9, "K"), (9, 9, "K"),
            (10, 9, "K"), (11, 9, "K"), (12, 9, "K"), (13, 9, "K"), (14, 9, "K"), (15, 9, "K"),
            (16, 9, "K"), (17, 9, "K"),
            (6, 10, "K"), (7, 10, "K"), (14, 10, "K"), (15, 10, "K"),
        ],
        "pal": {
            ".": "#0c1828", "X": "#060e18", "A": "#3a6a8a", "B": "#1a3a52", "C": "#6a9aaa",
            "E": "#0c1828", "P": "#0c1828", "N": "#8a6a5a", "M": "#060e18", "T": "#3a6a8a",
            "L": "#1a3a52", "H": "#060e18", "K": "#121820", "Y": "#ffe66d",
        },
    },
    "beam": {
        "extras": [
            (3, 7, "V"), (4, 7, "V"), (5, 7, "V"), (6, 7, "V"), (7, 7, "V"), (8, 7, "V"),
            (9, 7, "V"), (10, 7, "V"), (11, 7, "V"), (12, 7, "V"), (13, 7, "V"), (14, 7, "V"),
            (15, 7, "V"), (16, 7, "V"), (17, 7, "V"), (18, 7, "V"),
            (3, 8, "V"), (18, 8, "V"),
            (4, 8, "R"), (5, 8, "R"), (6, 8, "Y"), (7, 8, "Y"),
            (14, 8, "Y"), (15, 8, "Y"), (16, 8, "R"), (17, 8, "R"),
            (3, 9, "V"), (4, 9, "V"), (5, 9, "V"), (6, 9, "V"), (7, 9, "V"), (8, 9, "V"),
            (9, 9, "V"), (10, 9, "V"), (11, 9, "V"), (12, 9, "V"), (13, 9, "V"), (14, 9, "V"),
            (15, 9, "V"), (16, 9, "V"), (17, 9, "V"), (18, 9, "V"),
            (7, 14, "O"), (8, 14, "O"), (9, 14, "O"), (14, 14, "O"), (15, 14, "O"), (16, 14, "O"),
            (7, 15, "O"), (16, 15, "O"),
            (7, 16, "O"), (8, 16, "Y"), (15, 16, "Y"), (16, 16, "O"),
            (8, 17, "O"), (9, 17, "O"), (14, 17, "O"), (15, 17, "O"),
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
            (7, 5, "I"), (11, 5, "I"), (16, 5, "I"),
            (6, 8, "I"), (17, 8, "I"),
            (8, 14, "I"), (12, 14, "I"), (15, 14, "I"),
            (9, 16, "I"), (14, 16, "I"),
        ],
        "pal": {
            ".": "#0a1818", "X": "#061010", "A": "#2a8a8a", "B": "#145454", "C": "#4ababa",
            "E": "#e8ede3", "P": "#061010", "N": "#8a6a5a", "M": "#061010", "T": "#2a8a8a",
            "L": "#145454", "H": "#061010", "I": "#a5fa00",
        },
    },
    "wrex": {
        "extras": [
            (5, 0, "G"), (8, 0, "G"), (11, 0, "G"), (12, 0, "G"), (15, 0, "G"), (18, 0, "G"),
            (5, 1, "G"), (6, 1, "G"), (7, 1, "G"), (16, 1, "G"), (17, 1, "G"), (18, 1, "G"),
            (9, 1, "G"), (10, 1, "G"), (11, 1, "G"), (12, 1, "G"), (13, 1, "G"), (14, 1, "G"),
            # visor on eyes y=7-8
            (3, 7, "K"), (4, 7, "K"), (5, 7, "K"), (6, 7, "K"), (7, 7, "K"), (8, 7, "K"),
            (9, 7, "K"), (10, 7, "K"), (11, 7, "K"), (12, 7, "K"), (13, 7, "K"), (14, 7, "K"),
            (15, 7, "K"), (16, 7, "K"), (17, 7, "K"), (18, 7, "K"),
            (3, 8, "K"), (18, 8, "K"),
            (4, 8, "R"), (5, 8, "R"), (6, 8, "Y"), (7, 8, "Y"),
            (14, 8, "Y"), (15, 8, "Y"), (16, 8, "R"), (17, 8, "R"),
            (3, 9, "K"), (4, 9, "K"), (5, 9, "K"), (6, 9, "K"), (7, 9, "K"), (8, 9, "K"),
            (9, 9, "K"), (10, 9, "K"), (11, 9, "K"), (12, 9, "K"), (13, 9, "K"), (14, 9, "K"),
            (15, 9, "K"), (16, 9, "K"), (17, 9, "K"), (18, 9, "K"),
            (0, 8, "R"), (1, 8, "R"), (2, 8, "R"),
            (19, 8, "R"), (20, 8, "R"), (21, 8, "R"), (22, 8, "R"), (23, 8, "R"),
            (0, 12, "I"), (1, 12, "I"), (0, 13, "I"), (1, 13, "X"), (0, 14, "I"),
            (22, 11, "I"), (23, 11, "I"), (22, 12, "X"), (23, 12, "I"), (23, 13, "I"),
            (11, 5, "D"), (12, 5, "A"),
            (11, 9, "D"), (12, 9, "A"),
            (11, 12, "D"), (12, 12, "A"),
            (11, 14, "D"), (12, 14, "A"),
            (11, 16, "D"), (12, 16, "A"),
            (8, 14, "W"), (9, 14, "W"), (14, 14, "W"), (15, 14, "W"),
            (8, 21, "G"), (9, 21, "G"), (14, 21, "G"), (15, 21, "G"),
            (2, 3, "I"), (21, 3, "I"),
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
            hexcol = pal.get(ch, pal["."]).lstrip("#")
            px[x, y] = tuple(int(hexcol[i : i + 2], 16) for i in (0, 2, 4))
    return img


def main():
    for i, r in enumerate(SIL):
        assert len(r) == 24, (i, len(r), r)
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
    base = Image.new("RGB", (SIZE, SIZE), (7, 8, 7))
    pal = {".": "#101210", "X": "#e8ede3", "A": "#7d8476", "B": "#7d8476", "C": "#a0a89a",
           "E": "#a5fa00", "P": "#070807", "N": "#ff5a4a", "M": "#070807", "T": "#7d8476",
           "L": "#5a6058", "H": "#e8ede3"}
    px = base.load()
    for y, row in enumerate(SIL):
        for x, ch in enumerate(row):
            h = pal.get(ch, pal["."]).lstrip("#")
            px[x, y] = tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))
    base.resize((SIZE * SCALE, SIZE * SCALE), Image.NEAREST).save(prev / "base.png")
    sheet.save(prev / "sheet.png")
    Path("/workspace/public/cats/volt.png").write_bytes(Path("/workspace/public/cats/beam.png").read_bytes())
    import json
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

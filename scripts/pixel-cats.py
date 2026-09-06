#!/usr/bin/env python3
"""24x24 KILI founder sprites. Shared silhouette, unique traits."""
from pathlib import Path
from PIL import Image

SIZE = 24
SCALE = 32  # 768px preview

# Shared sitting-cat silhouette. 24 chars each.
# . bg  X outline  A fur  B shade  C belly  E eye  P pupil
# N nose  M mouth  T tail  L paw
SIL = [
    "........................",
    "......XX....XX..........",
    ".....XAAX..XAAX.........",
    "....XAAAAAAAAAAX........",
    "...XAAAAAAAAAAAAX.......",
    "...XAAAAAAAAAAAAX.......",
    "...XAEEAAAAEEAAAX.......",
    "...XAEPPAAAEPPAAX.......",
    "...XAAAAAAAAAAAAX.......",
    "...XAAAAANNAAAAAX.......",
    "...XAAAAAMMAAAAAX.......",
    "....XAAAAAAAAAAX........",
    "...XAAAAAAAAAAAAX.......",
    "..XAAACCCCCCCCAAAX......",
    "..XAACCCCCCCCCCAAX.XX...",
    "..XAACCCCCCCCCCAAXTAABX.",
    "..XAAACCCCCCCCAAAXTAAAX.",
    "..XAAAAAAAAAAAAAAXTAAX..",
    "..XAAAAAAAAAAAAAAXXAX...",
    "...XAAAAX..XAAAAXX......",
    "...XXLLXX..XXLLXX.......",
    "...XLLLLX..XLLLLX.......",
    "...XXLLXX..XXLLXX.......",
    "....XXXX....XXXX........",
]

# Extra pixels (x, y, char) drawn over silhouette.
TRAITS = {
    "phantom": {
        # crown
        "extras": [
            (7, 0, "G"), (8, 0, "G"), (11, 0, "G"), (12, 0, "G"), (15, 0, "G"), (16, 0, "G"),
            (6, 1, "G"), (7, 1, "G"), (8, 1, "G"), (9, 1, "G"), (10, 1, "G"), (11, 1, "G"),
            (12, 1, "G"), (13, 1, "G"), (14, 1, "G"), (15, 1, "G"), (16, 1, "G"), (17, 1, "G"),
            (7, 2, "G"), (16, 2, "G"),
            # rainbow flag left
            (0, 12, "R"), (1, 12, "R"),
            (0, 13, "O"), (1, 13, "O"),
            (0, 14, "Y"), (1, 14, "Y"),
            (0, 15, "I"), (1, 15, "I"),
            (0, 16, "U"), (1, 16, "U"),
            (0, 17, "F"), (1, 17, "F"),
            (2, 12, "X"), (2, 13, "X"), (2, 14, "X"), (2, 15, "X"), (2, 16, "X"), (2, 17, "X"),
            # ribs
            (8, 13, "W"), (9, 13, "W"), (10, 13, "W"), (13, 13, "W"), (14, 13, "W"), (15, 13, "W"),
            (8, 15, "W"), (9, 15, "W"), (14, 15, "W"), (15, 15, "W"),
            (9, 17, "W"), (10, 17, "W"), (13, 17, "W"), (14, 17, "W"),
        ],
        "pal": {
            ".": "#2a1545",
            "X": "#0c0614",
            "A": "#3dffc8",
            "B": "#149a72",
            "C": "#9ffff0",
            "E": "#e8ede3",
            "P": "#0c0614",
            "N": "#ff8ad2",
            "M": "#0c0614",
            "T": "#3dffc8",
            "L": "#149a72",
            "G": "#e2c044",
            "W": "#e8ede3",
            "R": "#ff5a4a",
            "O": "#ff9a1a",
            "Y": "#ffe66d",
            "I": "#a5fa00",
            "U": "#5a8aff",
            "F": "#ff4ad2",
        },
    },
    "rot": {
        "extras": [
            # ripped tank
            (8, 13, "K"), (9, 13, "K"), (10, 13, "K"), (11, 13, "K"), (12, 13, "K"), (13, 13, "K"), (14, 13, "K"), (15, 13, "K"),
            (8, 14, "K"), (15, 14, "K"),
            (8, 15, "K"), (10, 15, "K"), (11, 15, "."), (12, 15, "."), (13, 15, "K"), (15, 15, "K"),
            (8, 16, "K"), (15, 16, "K"),
            # scar / X eye left
            (6, 6, "R"), (9, 6, "R"),
            (7, 7, "R"), (8, 7, "K"),
            (6, 8, "R"), (9, 8, "R"),
            # drool
            (12, 11, "I"), (12, 12, "I"),
        ],
        "pal": {
            ".": "#1a2410",
            "X": "#0a1006",
            "A": "#6a9a28",
            "B": "#3a5a14",
            "C": "#8aba3a",
            "E": "#c8ff4a",
            "P": "#1a1000",
            "N": "#3a2a10",
            "M": "#1a1000",
            "T": "#6a9a28",
            "L": "#3a5a14",
            "K": "#2a3a22",
            "R": "#8a2020",
            "I": "#a5fa00",
        },
    },
    "scale": {
        "extras": [
            # crown
            (7, 0, "G"), (8, 0, "G"), (9, 0, "G"), (10, 0, "G"), (13, 0, "G"), (14, 0, "G"), (15, 0, "G"), (16, 0, "G"),
            (8, 1, "G"), (15, 1, "G"),
            (11, 1, "G"), (12, 1, "G"),
            # corn left
            (0, 10, "Y"), (1, 10, "Y"), (1, 9, "Y"),
            (0, 11, "Y"), (1, 11, "O"),
            (0, 12, "Y"), (1, 12, "Y"),
            (0, 13, "O"), (1, 13, "Y"),
            (0, 14, "Y"), (1, 14, "O"),
            (1, 15, "G"), (1, 16, "G"),
            # scale marks
            (8, 5, "I"), (15, 5, "I"),
            (10, 14, "I"), (13, 14, "I"),
        ],
        "pal": {
            ".": "#102418",
            "X": "#06140c",
            "A": "#2d8a4a",
            "B": "#186030",
            "C": "#6ad88a",
            "E": "#e8ede3",
            "P": "#06140c",
            "N": "#c07040",
            "M": "#06140c",
            "T": "#2d8a4a",
            "L": "#186030",
            "G": "#e2c044",
            "Y": "#ffe66d",
            "O": "#d4a018",
            "I": "#a5fa00",
        },
    },
    "laser": {
        "extras": [
            # MC cap
            (5, 2, "K"), (6, 2, "K"), (7, 2, "K"), (8, 2, "K"), (9, 2, "K"), (10, 2, "K"),
            (11, 2, "K"), (12, 2, "K"), (13, 2, "K"), (14, 2, "K"), (15, 2, "K"), (16, 2, "K"), (17, 2, "K"), (18, 2, "K"),
            (6, 1, "K"), (7, 1, "K"), (8, 1, "K"), (9, 1, "K"), (10, 1, "K"), (11, 1, "K"),
            (12, 1, "K"), (13, 1, "K"), (14, 1, "K"), (15, 1, "K"), (16, 1, "K"), (17, 1, "K"),
            (10, 1, "G"), (11, 1, "G"), (12, 1, "G"), (13, 1, "G"),
            (11, 2, "G"), (12, 2, "G"),
            # brim
            (4, 3, "K"), (5, 3, "K"), (6, 3, "K"), (7, 3, "K"), (8, 3, "K"), (9, 3, "K"),
            (10, 3, "K"), (11, 3, "K"), (12, 3, "K"), (13, 3, "K"), (14, 3, "K"), (15, 3, "K"),
            (16, 3, "K"), (17, 3, "K"), (18, 3, "K"), (19, 3, "K"),
            # laser from right eye
            (16, 7, "R"), (17, 7, "R"), (18, 7, "R"), (19, 7, "R"), (20, 7, "R"), (21, 7, "R"), (22, 7, "R"), (23, 7, "R"),
            (16, 8, "R"),
        ],
        "pal": {
            ".": "#241810",
            "X": "#120c08",
            "A": "#d4783a",
            "B": "#8a4a20",
            "C": "#e8a060",
            "E": "#ffe8c8",
            "P": "#120c08",
            "N": "#8a3020",
            "M": "#120c08",
            "T": "#d4783a",
            "L": "#8a4a20",
            "K": "#141414",
            "G": "#e2c044",
            "R": "#ff5a4a",
        },
    },
    "veil": {
        "extras": [
            # mask
            (6, 6, "K"), (7, 6, "K"), (8, 6, "K"), (9, 6, "K"), (10, 6, "K"), (11, 6, "K"),
            (12, 6, "K"), (13, 6, "K"), (14, 6, "K"), (15, 6, "K"), (16, 6, "K"), (17, 6, "K"),
            (6, 7, "K"), (10, 7, "K"), (11, 7, "K"), (12, 7, "K"), (13, 7, "K"), (17, 7, "K"),
            (6, 8, "K"), (7, 8, "K"), (8, 8, "K"), (9, 8, "K"), (10, 8, "K"), (11, 8, "K"),
            (12, 8, "K"), (13, 8, "K"), (14, 8, "K"), (15, 8, "K"), (16, 8, "K"), (17, 8, "K"),
            (7, 9, "K"), (8, 9, "K"), (15, 9, "K"), (16, 9, "K"),
            # yellow slits (overwrite pupils area)
            (7, 7, "Y"), (8, 7, "Y"), (9, 7, "Y"),
            (14, 7, "Y"), (15, 7, "Y"), (16, 7, "Y"),
        ],
        "pal": {
            ".": "#0c1828",
            "X": "#060e18",
            "A": "#3a6a8a",
            "B": "#1a3a52",
            "C": "#6a9aaa",
            "E": "#0c1828",
            "P": "#0c1828",
            "N": "#8a6a5a",
            "M": "#060e18",
            "T": "#3a6a8a",
            "L": "#1a3a52",
            "K": "#121820",
            "Y": "#ffe66d",
        },
    },
    "beam": {
        "extras": [
            # visor band
            (5, 6, "V"), (6, 6, "V"), (7, 6, "V"), (8, 6, "V"), (9, 6, "V"), (10, 6, "V"),
            (11, 6, "V"), (12, 6, "V"), (13, 6, "V"), (14, 6, "V"), (15, 6, "V"), (16, 6, "V"), (17, 6, "V"), (18, 6, "V"),
            (5, 7, "V"), (18, 7, "V"),
            (6, 7, "R"), (7, 7, "R"), (8, 7, "R"), (9, 7, "Y"), (10, 7, "Y"),
            (13, 7, "Y"), (14, 7, "Y"), (15, 7, "R"), (16, 7, "R"), (17, 7, "R"),
            (5, 8, "V"), (6, 8, "V"), (7, 8, "V"), (8, 8, "V"), (9, 8, "V"), (10, 8, "V"),
            (11, 8, "V"), (12, 8, "V"), (13, 8, "V"), (14, 8, "V"), (15, 8, "V"), (16, 8, "V"), (17, 8, "V"), (18, 8, "V"),
            # orange vest
            (8, 13, "O"), (9, 13, "O"), (10, 13, "O"), (13, 13, "O"), (14, 13, "O"), (15, 13, "O"),
            (8, 14, "O"), (15, 14, "O"),
            (8, 15, "O"), (9, 15, "Y"), (14, 15, "Y"), (15, 15, "O"),
            (8, 16, "O"), (15, 16, "O"),
            (9, 17, "O"), (10, 17, "O"), (13, 17, "O"), (14, 17, "O"),
        ],
        "pal": {
            ".": "#201208",
            "X": "#100804",
            "A": "#4a4a48",
            "B": "#2a2a28",
            "C": "#6a6a68",
            "E": "#ff9a40",
            "P": "#100804",
            "N": "#8a4a30",
            "M": "#100804",
            "T": "#4a4a48",
            "L": "#2a2a28",
            "V": "#3a1810",
            "R": "#ff5a4a",
            "Y": "#ffe66d",
            "O": "#e07020",
        },
    },
    "grid": {
        "extras": [
            # mesh dots
            (8, 5, "I"), (11, 5, "I"), (14, 5, "I"),
            (7, 8, "I"), (16, 8, "I"),
            (9, 13, "I"), (12, 13, "I"), (15, 13, "I"),
            (8, 15, "I"), (11, 15, "I"), (14, 15, "I"),
            (10, 17, "I"), (13, 17, "I"),
        ],
        "pal": {
            ".": "#0a1818",
            "X": "#061010",
            "A": "#2a8a8a",
            "B": "#145454",
            "C": "#4ababa",
            "E": "#e8ede3",
            "P": "#061010",
            "N": "#8a6a5a",
            "M": "#061010",
            "T": "#2a8a8a",
            "L": "#145454",
            "I": "#a5fa00",
        },
    },
    "wrex": {
        # Apex chimera — not a founder. Crown + visor + dual beam + wings + ribs + flag.
        "extras": [
            # five-spike crown
            (5, 0, "G"), (8, 0, "G"), (11, 0, "G"), (12, 0, "G"), (15, 0, "G"), (18, 0, "G"),
            (5, 1, "G"), (6, 1, "G"), (7, 1, "G"), (8, 1, "G"), (9, 1, "G"), (10, 1, "G"),
            (11, 1, "G"), (12, 1, "G"), (13, 1, "G"), (14, 1, "G"), (15, 1, "G"), (16, 1, "G"),
            (17, 1, "G"), (18, 1, "G"),
            (6, 2, "G"), (17, 2, "G"),
            # visor
            (5, 6, "K"), (6, 6, "K"), (7, 6, "K"), (8, 6, "K"), (9, 6, "K"), (10, 6, "K"),
            (11, 6, "K"), (12, 6, "K"), (13, 6, "K"), (14, 6, "K"), (15, 6, "K"), (16, 6, "K"),
            (17, 6, "K"), (18, 6, "K"),
            (5, 7, "K"), (18, 7, "K"),
            (6, 7, "R"), (7, 7, "R"), (8, 7, "Y"), (9, 7, "Y"),
            (14, 7, "Y"), (15, 7, "Y"), (16, 7, "R"), (17, 7, "R"),
            (5, 8, "K"), (6, 8, "K"), (7, 8, "K"), (8, 8, "K"), (9, 8, "K"), (10, 8, "K"),
            (11, 8, "K"), (12, 8, "K"), (13, 8, "K"), (14, 8, "K"), (15, 8, "K"), (16, 8, "K"),
            (17, 8, "K"), (18, 8, "K"),
            # dual lasers
            (0, 7, "R"), (1, 7, "R"), (2, 7, "R"), (3, 7, "R"), (4, 7, "R"),
            (19, 7, "R"), (20, 7, "R"), (21, 7, "R"), (22, 7, "R"), (23, 7, "R"),
            # acid wings
            (0, 11, "I"), (1, 11, "I"), (0, 12, "I"), (1, 12, "X"),
            (0, 13, "I"), (1, 13, "I"), (0, 14, "I"),
            (22, 11, "I"), (23, 11, "I"), (22, 12, "X"), (23, 12, "I"),
            (22, 13, "I"), (23, 13, "I"), (23, 14, "I"),
            # chimera seam
            (11, 4, "D"), (12, 4, "A"),
            (11, 5, "D"), (12, 5, "A"),
            (11, 9, "D"), (12, 9, "A"),
            (11, 10, "D"), (12, 10, "A"),
            (11, 12, "D"), (12, 12, "A"),
            (11, 13, "D"), (12, 13, "A"),
            (11, 14, "D"), (12, 14, "A"),
            (11, 15, "D"), (12, 15, "A"),
            (11, 16, "D"), (12, 16, "A"),
            (11, 17, "D"), (12, 17, "A"),
            # ribs
            (7, 13, "W"), (8, 13, "W"), (9, 13, "W"),
            (14, 13, "W"), (15, 13, "W"), (16, 13, "W"),
            (7, 15, "W"), (8, 15, "W"), (15, 15, "W"), (16, 15, "W"),
            # gold paws
            (8, 21, "G"), (9, 21, "G"), (14, 21, "G"), (15, 21, "G"),
            # aura dots
            (2, 3, "I"), (21, 3, "I"), (1, 20, "I"), (22, 20, "I"),
        ],
        "pal": {
            ".": "#08060a",
            "X": "#1a1008",
            "A": "#e2c044",
            "B": "#8a6a14",
            "C": "#ffe66d",
            "D": "#3dffc8",
            "E": "#ffe66d",
            "P": "#08060a",
            "N": "#ff5a4a",
            "M": "#08060a",
            "T": "#e2c044",
            "L": "#8a6a14",
            "G": "#ffe66d",
            "K": "#141018",
            "R": "#ff5a4a",
            "Y": "#a5fa00",
            "W": "#e8ede3",
            "I": "#a5fa00",
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
            px[x, y] = tuple(int(pal.get(ch, pal["."]).lstrip("#")[i : i + 2], 16) for i in (0, 2, 4))
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
    # beam file was volt.png historically
    (out / "beam.png").write_bytes((out / "beam.png").read_bytes())
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
    print("json written")


if __name__ == "__main__":
    main()

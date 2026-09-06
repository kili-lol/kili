import data from "./pixel-cats.json";
import type { LabTraits, Organ, Specimen } from "@/lib/game";

export const PIXEL_SIZE = 24;

type Sprite = { pal: Record<string, string>; rows: string[] };
const SPRITES = data as Record<string, Sprite>;

const HEAD = { x0: 0, y0: 0, x1: 23, y1: 13 };
const BODY = { x0: 2, y0: 14, x1: 20, y1: 16 };
const TAIL = { x0: 0, y0: 13, x1: 4, y1: 18 };
const LEGS = { x0: 0, y0: 17, x1: 23, y1: 23 };

const REGION: Record<Organ, { x0: number; y0: number; x1: number; y1: number }> = {
  head: HEAD,
  body: BODY,
  tail: TAIL,
  legs: LEGS,
};

function cloneRows(rows: string[]) {
  return rows.map((r) => r.split(""));
}

export function founderSprite(id: string): Sprite {
  return SPRITES[id] ?? SPRITES.grid;
}

export function composeSpecimen(s: Specimen): { cells: { x: number; y: number; fill: string }[]; bg: string } {
  if (s.kind === "lab" && s.labTraits) return composeLab(s.labTraits);

  const coat = founderSprite(s.coat);
  const grid = cloneRows(coat.rows);
  const palAt = (id: string, ch: string) => founderSprite(id).pal[ch] ?? founderSprite(id).pal["."];

  if (s.chimera) {
    const head = founderSprite(s.organs.head);
    const left = cloneRows(head.rows);
    for (let y = 0; y < PIXEL_SIZE; y++) {
      for (let x = 0; x < 12; x++) grid[y][x] = left[y][x];
    }
    const cells: { x: number; y: number; fill: string }[] = [];
    for (let y = 0; y < PIXEL_SIZE; y++) {
      for (let x = 0; x < PIXEL_SIZE; x++) {
        const id = x < 12 ? s.organs.head : s.coat;
        const ch = grid[y][x];
        cells.push({ x, y, fill: palAt(id, ch) });
      }
    }
    return { cells, bg: palAt(s.coat, ".") };
  }

  for (const organ of ["head", "body", "tail", "legs"] as Organ[]) {
    const srcId = s.organs[organ];
    const src = founderSprite(srcId);
    const r = REGION[organ];
    const srcRows = src.rows;
    for (let y = r.y0; y <= r.y1; y++) {
      for (let x = r.x0; x <= r.x1; x++) {
        const ch = srcRows[y][x];
        if (ch !== ".") grid[y][x] = ch;
      }
    }
  }

  const cells: { x: number; y: number; fill: string }[] = [];
  for (let y = 0; y < PIXEL_SIZE; y++) {
    for (let x = 0; x < PIXEL_SIZE; x++) {
      let fill = coat.pal[grid[y][x]] ?? coat.pal["."];
      for (const organ of ["head", "body", "tail", "legs"] as Organ[]) {
        const r = REGION[organ];
        if (x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1) {
          const src = founderSprite(s.organs[organ]);
          const ch = src.rows[y][x];
          if (ch !== ".") fill = src.pal[ch] ?? fill;
        }
      }
      cells.push({ x, y, fill });
    }
  }
  return { cells, bg: coat.pal["."] };
}

function composeLab(t: LabTraits): { cells: { x: number; y: number; fill: string }[]; bg: string } {
  const base = founderSprite("grid");
  const fur =
    t.bodyType === "void"
      ? "#3a2a8a"
      : t.bodyType === "plasma"
        ? "#ff5a4a"
        : t.bodyType === "blob"
          ? "#3dffc8"
          : t.bodyType === "skeletal"
            ? "#c8c8c0"
            : t.bodyType === "armored"
              ? "#8a8aa8"
              : "#2a8a8a";
  const shade = "#102020";
  const eye =
    t.eyeType === "laser"
      ? "#ff5a4a"
      : t.eyeType === "void"
        ? "#7c6cff"
        : t.eyeType === "compound"
          ? "#3dffc8"
          : t.eyeType === "hex"
            ? "#a5fa00"
            : "#e8ede3";
  const pal: Record<string, string> = {
    ...base.pal,
    A: fur,
    B: shade,
    C: fur,
    T: fur,
    L: shade,
    E: eye,
    I: t.furPattern === "acid" ? "#a5fa00" : base.pal.I,
  };
  const grid = cloneRows(base.rows);
  if (t.appendages === "multi_tail") {
    grid[14][22] = "A";
    grid[15][23] = "A";
    grid[16][22] = "X";
  }
  if (t.appendages === "wings") {
    grid[12][1] = "A";
    grid[13][0] = "A";
    grid[14][1] = "X";
  }
  if (t.eyeType === "cyclops") {
    for (const x of [6, 7, 8, 9]) grid[7][x] = "A";
    grid[7][11] = "E";
    grid[7][12] = "P";
    grid[7][13] = "E";
  }
  const cells: { x: number; y: number; fill: string }[] = [];
  for (let y = 0; y < PIXEL_SIZE; y++) {
    for (let x = 0; x < PIXEL_SIZE; x++) {
      const ch = grid[y][x];
      cells.push({ x, y, fill: pal[ch] ?? pal["."] });
    }
  }
  return { cells, bg: pal["."] };
}

export function founderCells(id: string) {
  const s = founderSprite(id);
  const cells: { x: number; y: number; fill: string }[] = [];
  s.rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      cells.push({ x, y, fill: s.pal[ch] ?? s.pal["."] });
    });
  });
  return { cells, bg: s.pal["."] };
}

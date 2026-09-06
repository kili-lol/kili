export const ORGANS = ["head", "body", "tail", "legs"] as const;
export type Organ = (typeof ORGANS)[number];

export const NAMED_LINES = ["PHANTOM", "ROT", "SCALE", "LASER", "VEIL", "BEAM"] as const;
export type NamedLine = (typeof NAMED_LINES)[number];

export const FEE = {
  totalBps: 300,
  studioBps: 70,
  pitBps: 100,
  vatBps: 130,
} as const;

export const FEE_SHARE = [
  { id: "studio", label: "Studio", swapPct: "0.70%", shareBps: 2333, dest: "PC / mobile build" },
  { id: "pit", label: "The Pit", swapPct: "1.00%", shareBps: 3333, dest: "Hourly pot / events" },
  { id: "vat", label: "The Vat", swapPct: "1.30%", shareBps: 4334, dest: "Locked mix sink" },
] as const;

export const PAIR_MARKETS = [
  { quote: "USDG", pct: 35, bps: 3500, role: "cash rail" },
  { quote: "WETH", pct: 25, bps: 2500, role: "ETH rail" },
  { quote: "GLD", pct: 20, bps: 2000, role: "gold" },
  { quote: "SLV", pct: 20, bps: 2000, role: "silver" },
] as const;

export const MIX_FEE_ETH = 0.0003;
export const PAIR_LAUNCH_ETH = 0.0005;
export const MUTANT_CHANCE = 0.06;
export const HOUR_MS = 60 * 60 * 1000;
export const MAX_MATCHES_PER_HOUR = 12;
export const MAX_PAIR_PER_HOUR = 3;
export const MAX_BOOST_PER_HOUR = 2;
export const ORGAN_CAP = 5;
export const BOOST_COST = [10, 25, 60, 150, 400] as const;
export const CHAIN_ID = 4663;

export const HOUR_SPLIT = {
  vat: 0.4,
  first: 0.3,
  second: 0.12,
  rest: 0.13,
  next: 0.05,
} as const;

export type LabTraits = {
  mutationLevel: number;
  bodyType: string;
  eyeType: string;
  appendages: string;
  aura: string;
  furPattern: string;
};

export type Specimen = {
  id: string;
  name: string;
  generation: number;
  organs: Record<Organ, string>;
  coat: string;
  chimera: boolean;
  mutant: boolean;
  line: NamedLine | null;
  boosts: Record<Organ, number>;
  kind: "photo" | "lab";
  labTraits?: LabTraits;
  bornAt: number;
};

export type Founder = {
  id: string;
  name: string;
  line: NamedLine | "GRID";
  src: string;
  coat: string;
  blurb: string;
};

export const FOUNDERS: Founder[] = [
  {
    id: "phantom",
    name: "Phantom",
    line: "PHANTOM",
    src: "/cats/phantom.png",
    coat: "void",
    blurb: "Crown, bones, the wrong flag. Named void line.",
  },
  {
    id: "rot",
    name: "Rot",
    line: "ROT",
    src: "/cats/rot.png",
    coat: "putrid",
    blurb: "Green hide, torn tank, still hungry.",
  },
  {
    id: "scale",
    name: "Scale",
    line: "SCALE",
    src: "/cats/scale.png",
    coat: "jade",
    blurb: "Crown + corn. Keep the mismatch.",
  },
  {
    id: "laser",
    name: "Laser",
    line: "LASER",
    src: "/cats/laser.png",
    coat: "ember",
    blurb: "MC cap, one beam, zero blink.",
  },
  {
    id: "veil",
    name: "Veil",
    line: "VEIL",
    src: "/cats/veil.png",
    coat: "tide",
    blurb: "Mask on. The vat still sees you.",
  },
  {
    id: "beam",
    name: "Beam",
    line: "BEAM",
    src: "/cats/beam.png",
    coat: "neon",
    blurb: "Visor fire. Orange vest. Named head.",
  },
  {
    id: "grid",
    name: "Grid",
    line: "GRID",
    src: "/cats/grid.png",
    coat: "aqua",
    blurb: "Mesh only. The quiet founder.",
  },
];

export const FOUNDER_MAP = Object.fromEntries(FOUNDERS.map((f) => [f.id, f])) as Record<
  string,
  Founder
>;

export function hourId(now = Date.now()) {
  return Math.floor(now / HOUR_MS);
}

export function hourEndsAt(id = hourId()) {
  return (id + 1) * HOUR_MS;
}

export function srcOf(catId: string) {
  return FOUNDER_MAP[catId]?.src ?? "/cats/grid.png";
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

function emptyBoosts(): Record<Organ, number> {
  return { head: 0, body: 0, tail: 0, legs: 0 };
}

function allOrgans(id: string): Record<Organ, string> {
  return { head: id, body: id, tail: id, legs: id };
}

export function makeFounderSpecimen(founderId: string, generation = 0): Specimen {
  const f = FOUNDER_MAP[founderId] ?? FOUNDERS[6];
  return {
    id: uid(f.id),
    name: f.name,
    generation,
    organs: allOrgans(f.id),
    coat: f.id,
    chimera: false,
    mutant: f.line !== "GRID",
    line: f.line === "GRID" ? null : f.line,
    boosts: emptyBoosts(),
    kind: "photo",
    bornAt: Date.now(),
  };
}

function pick<T>(a: T, b: T, rng: () => number): T {
  return rng() < 0.5 ? a : b;
}

export function mixSpecimens(a: Specimen, b: Specimen, rng = Math.random): Specimen {
  const organs = {
    head: pick(a.organs.head, b.organs.head, rng),
    body: pick(a.organs.body, b.organs.body, rng),
    tail: pick(a.organs.tail, b.organs.tail, rng),
    legs: pick(a.organs.legs, b.organs.legs, rng),
  };
  const coat = pick(a.coat, b.coat, rng);
  const chimera = coat !== organs.head;
  const mutant = rng() < MUTANT_CHANCE;
  let line: NamedLine | null = null;
  if (mutant) {
    line = NAMED_LINES[Math.floor(rng() * NAMED_LINES.length)];
    const organ = ORGANS[Math.floor(rng() * ORGANS.length)];
    const founder = FOUNDERS.find((f) => f.line === line);
    if (founder) organs[organ] = founder.id;
  }
  const gen = Math.max(a.generation, b.generation) + 1;
  const name = chimera ? "Chimera" : mutant && line ? titleCase(line) : hybridName(organs.head, organs.body);
  return {
    id: uid("mix"),
    name,
    generation: gen,
    organs,
    coat,
    chimera,
    mutant,
    line,
    boosts: emptyBoosts(),
    kind: "photo",
    bornAt: Date.now(),
  };
}

function titleCase(s: string) {
  return s.slice(0, 1) + s.slice(1).toLowerCase();
}

function hybridName(head: string, body: string) {
  const h = FOUNDER_MAP[head]?.name ?? "Kili";
  const b = FOUNDER_MAP[body]?.name ?? "Cat";
  if (h === b) return h;
  return `${h.slice(0, 3)}${b.slice(-2)}`.replace(/^\w/, (c) => c.toUpperCase());
}

export function organScore(s: Specimen): number {
  let n = 0;
  for (const o of ORGANS) {
    n += 12 + s.boosts[o] * 8;
    if (FOUNDER_MAP[s.organs[o]]?.line !== "GRID") n += 6;
  }
  if (s.chimera) n += 18;
  if (s.mutant) n += 22;
  if (s.line) n += 14;
  n += Math.max(0, 8 - s.generation) * 2;
  return n;
}

export function resolveFight(a: Specimen, b: Specimen, hourBoostA = 0, hourBoostB = 0): {
  winner: "a" | "b";
  sa: number;
  sb: number;
  organ: Organ;
} {
  const sa = organScore(a) + hourBoostA + (Math.random() * 8 - 4);
  const sb = organScore(b) + hourBoostB + (Math.random() * 8 - 4);
  const winner: "a" | "b" = sa === sb ? (Math.random() < 0.5 ? "a" : "b") : sa > sb ? "a" : "b";
  const organ = ORGANS[Math.floor(Math.random() * ORGANS.length)];
  return { winner, sa: Math.round(sa), sb: Math.round(sb), organ };
}

export function pairKey(a: string, b: string) {
  return [a, b].sort().join(":");
}

export const LAB_BODY = [
  { id: "standard", label: "STANDARD" },
  { id: "blob", label: "BLOB FORM" },
  { id: "skeletal", label: "SKELETAL" },
  { id: "armored", label: "ARMORED" },
  { id: "void", label: "VOID" },
  { id: "plasma", label: "PLASMA" },
];
export const LAB_EYE = [
  { id: "normal", label: "NORMAL" },
  { id: "cyclops", label: "CYCLOPS" },
  { id: "compound", label: "COMPOUND" },
  { id: "void", label: "VOID" },
  { id: "laser", label: "LASER" },
  { id: "hex", label: "HEXAGONAL" },
];
export const LAB_APPEND = [
  { id: "standard", label: "STANDARD" },
  { id: "multi_tail", label: "MULTI-TAIL" },
  { id: "wings", label: "WINGS" },
  { id: "tentacles", label: "TENTACLES" },
  { id: "claws", label: "CLAWS+" },
  { id: "crystals", label: "CRYSTALS" },
];
export const LAB_AURA = [
  { id: "none", label: "NONE" },
  { id: "radiation", label: "RADIATION" },
  { id: "electric", label: "ELECTRIC" },
  { id: "fire", label: "INFERNO" },
  { id: "shadow", label: "SHADOW" },
  { id: "crystal", label: "CRYSTAL" },
];
export const LAB_FUR = [
  { id: "none", label: "BARE" },
  { id: "acid", label: "ACID SPOTS" },
  { id: "glitch", label: "GLITCH" },
  { id: "plasma", label: "PLASMA" },
  { id: "void", label: "VOID" },
  { id: "static", label: "STATIC" },
];

export function defaultLabTraits(): LabTraits {
  return {
    mutationLevel: 42,
    bodyType: "standard",
    eyeType: "normal",
    appendages: "standard",
    aura: "none",
    furPattern: "none",
  };
}

export function mintLabCat(traits: LabTraits): Specimen {
  const mutant = traits.mutationLevel > 80 || traits.bodyType === "void";
  return {
    id: uid("lab"),
    name: mutant ? "Lab Mutant" : "Lab Kit",
    generation: 0,
    organs: allOrgans("grid"),
    coat: "grid",
    chimera: traits.furPattern === "glitch",
    mutant,
    line: mutant ? "BEAM" : null,
    boosts: emptyBoosts(),
    kind: "lab",
    labTraits: { ...traits },
    bornAt: Date.now(),
  };
}

export const LINKS = {
  x: "https://x.com/kili_RH",
  github: "https://github.com/kili-lol/kili",
  site: "https://www.kili.lol",
  pair: "https://pair.fun/launch",
  pairDocs: "https://pair.fun/docs",
  explorer: "https://robinhoodchain.blockscout.com",
  ca: "",
  vat: "",
  nursery: "",
};

export const SOCIALS = {
  description: "Mutate Your Cats. Four organs. Keep the wrong ones.",
  website: "https://www.kili.lol",
  twitter: "https://x.com/kili_RH",
  telegram: "",
  github: "https://github.com/kili-lol/kili",
};

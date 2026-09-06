import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  BOOST_COST,
  FOUNDERS,
  HOUR_MS,
  MAX_BOOST_PER_HOUR,
  MAX_MATCHES_PER_HOUR,
  MAX_PAIR_PER_HOUR,
  MIX_FEE_ETH,
  ORGAN_CAP,
  ORGANS,
  type Organ,
  type Specimen,
  hourId,
  makeFounderSpecimen,
  mixSpecimens,
  pairKey,
  resolveFight,
} from "@/lib/game";

type MatchLog = {
  id: string;
  hour: number;
  a: string;
  b: string;
  winner: "a" | "b";
  sa: number;
  sb: number;
  at: number;
};

type HourBoard = {
  hour: number;
  pot: number;
  carry: number;
  points: Record<string, number>;
  matchesByWallet: number;
  pairCounts: Record<string, number>;
  boostsUsed: Record<string, number>;
  settled: boolean;
};

type LabState = {
  nursery: Specimen[];
  kili: number;
  vat: number;
  wallet: string | null;
  board: HourBoard;
  log: MatchLog[];
  mixLeft?: string;
  mixRight?: string;
  pitLeft?: string;
  pitRight?: string;
  lastMixId?: string;
  lastFight?: MatchLog | null;
  connect: () => void;
  disconnect: () => void;
  ensureHour: () => void;
  setMix: (side: "left" | "right", id?: string) => void;
  setPit: (side: "left" | "right", id?: string) => void;
  mix: () => Specimen | null;
  fight: () => MatchLog | null;
  boost: (id: string, organ: Organ) => boolean;
  addCat: (cat: Specimen) => void;
  claimHour: () => number;
};

function emptyBoard(hour: number, carry = 0): HourBoard {
  return {
    hour,
    pot: carry,
    carry,
    points: {},
    matchesByWallet: 0,
    pairCounts: {},
    boostsUsed: {},
    settled: false,
  };
}

function seedNursery(): Specimen[] {
  const ids = FOUNDERS.map((f) => f.id);
  const a = ids[Math.floor(Math.random() * ids.length)];
  let b = ids[Math.floor(Math.random() * ids.length)];
  if (b === a) b = ids[(ids.indexOf(a) + 3) % ids.length];
  return [makeFounderSpecimen(a), makeFounderSpecimen(b)];
}

export const useLab = create<LabState>()(
  persist(
    (set, get) => ({
      nursery: [],
      kili: 120,
      vat: 0,
      wallet: null,
      board: emptyBoard(hourId()),
      log: [],
      lastFight: null,
      connect: () => {
        const w = get().wallet ?? `lab-${Math.random().toString(36).slice(2, 8)}`;
        set({ wallet: w });
        if (get().nursery.length === 0) {
          const nursery = seedNursery();
          set({
            nursery,
            mixLeft: nursery[0]?.id,
            mixRight: nursery[1]?.id,
            pitLeft: nursery[0]?.id,
            pitRight: nursery[1]?.id,
          });
        }
      },
      disconnect: () => set({ wallet: null }),
      ensureHour: () => {
        const h = hourId();
        const b = get().board;
        if (b.hour === h) return;
        const carry = b.settled ? 0 : b.pot * 0.05;
        set({ board: emptyBoard(h, Number(carry.toFixed(4))), lastFight: null });
      },
      setMix: (side, id) => set(side === "left" ? { mixLeft: id } : { mixRight: id }),
      setPit: (side, id) => set(side === "left" ? { pitLeft: id } : { pitRight: id }),
      mix: () => {
        get().ensureHour();
        const { mixLeft, mixRight, nursery, wallet } = get();
        if (!wallet) return null;
        const a = nursery.find((c) => c.id === mixLeft);
        const b = nursery.find((c) => c.id === mixRight);
        if (!a || !b || a.id === b.id) return null;
        const child = mixSpecimens(a, b);
        const fee = MIX_FEE_ETH;
        const board = { ...get().board, pot: Number((get().board.pot + fee * 0.4).toFixed(4)) };
        set({
          nursery: [child, ...nursery],
          vat: Number((get().vat + fee * 0.6).toFixed(4)),
          board,
          lastMixId: child.id,
        });
        return child;
      },
      fight: () => {
        get().ensureHour();
        const st = get();
        if (!st.wallet) return null;
        if (st.board.matchesByWallet >= MAX_MATCHES_PER_HOUR) return null;
        const a = st.nursery.find((c) => c.id === st.pitLeft);
        const b = st.nursery.find((c) => c.id === st.pitRight);
        if (!a || !b || a.id === b.id) return null;
        const pk = pairKey(a.id, b.id);
        if ((st.board.pairCounts[pk] ?? 0) >= MAX_PAIR_PER_HOUR) return null;
        const r = resolveFight(a, b);
        const winner = r.winner === "a" ? a : b;
        const organ = r.organ;
        const nursery = st.nursery.map((c) => {
          if (c.id !== winner.id) return c;
          const next = Math.min(ORGAN_CAP, c.boosts[organ] + 1);
          return { ...c, boosts: { ...c.boosts, [organ]: next } };
        });
        const pts = { ...st.board.points };
        const winId = winner.id;
        const loseId = r.winner === "a" ? b.id : a.id;
        pts[winId] = (pts[winId] ?? 0) + 3;
        pts[loseId] = (pts[loseId] ?? 0) + 1;
        const log: MatchLog = {
          id: `m-${Date.now()}`,
          hour: st.board.hour,
          a: a.id,
          b: b.id,
          winner: r.winner,
          sa: r.sa,
          sb: r.sb,
          at: Date.now(),
        };
        set({
          nursery,
          board: {
            ...st.board,
            points: pts,
            matchesByWallet: st.board.matchesByWallet + 1,
            pairCounts: { ...st.board.pairCounts, [pk]: (st.board.pairCounts[pk] ?? 0) + 1 },
          },
          log: [log, ...st.log].slice(0, 40),
          lastFight: log,
        });
        return log;
      },
      boost: (id, organ) => {
        get().ensureHour();
        const st = get();
        const cat = st.nursery.find((c) => c.id === id);
        if (!cat) return false;
        const step = cat.boosts[organ];
        if (step >= ORGAN_CAP) return false;
        const used = st.board.boostsUsed[id] ?? 0;
        if (used >= MAX_BOOST_PER_HOUR) return false;
        const cost = BOOST_COST[step];
        if (st.kili < cost) return false;
        set({
          kili: st.kili - cost,
          nursery: st.nursery.map((c) =>
            c.id === id ? { ...c, boosts: { ...c.boosts, [organ]: c.boosts[organ] + 1 } } : c,
          ),
          board: {
            ...st.board,
            boostsUsed: { ...st.board.boostsUsed, [id]: used + 1 },
          },
        });
        return true;
      },
      addCat: (cat) => set({ nursery: [cat, ...get().nursery] }),
      claimHour: () => {
        const st = get();
        if (Date.now() < (st.board.hour + 1) * HOUR_MS) return 0;
        if (st.board.settled) return 0;
        const ranked = Object.entries(st.board.points).sort((x, y) => y[1] - x[1]);
        let payout = 0;
        if (ranked[0]) payout += st.board.pot * 0.3;
        set({
          board: { ...st.board, settled: true, pot: 0 },
          kili: st.kili + Math.round(payout * 100),
        });
        return payout;
      },
    }),
    { name: "kili-lab-v2", skipHydration: true },
  ),
);

export { ORGANS };

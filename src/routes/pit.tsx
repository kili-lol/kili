import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CornerFrame, Shell } from "@/components/shell";
import { SpecimenArt } from "@/components/specimen-art";
import { PixelEmpty, PixelVat } from "@/components/pixel-ui";
import { BOOST_COST, HOUR_MS, MAX_MATCHES_PER_HOUR, ORGANS, organScore, type Organ, type Specimen } from "@/lib/game";
import { cn, pad } from "@/lib/utils";
import { useLab } from "@/store/lab";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/pit")({ component: PitPage });

function PitPage() {
  const s = useLab();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!s.wallet) s.connect();
  }, [s.wallet, s.connect]);

  useEffect(() => {
    const t = setInterval(() => {
      setNow(Date.now());
      s.ensureHour();
    }, 1000);
    return () => clearInterval(t);
  }, [s.ensureHour]);

  const left = s.nursery.find((c) => c.id === s.pitLeft);
  const right = s.nursery.find((c) => c.id === s.pitRight);
  const remain = Math.max(0, (s.board.hour + 1) * HOUR_MS - now);
  const mm = pad(Math.floor(remain / 60000));
  const ss = pad(Math.floor((remain % 60000) / 1000));
  const ranked = Object.entries(s.board.points).sort((a, b) => b[1] - a[1]);

  return (
    <Shell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[8px] text-acid">HOUR {s.board.hour}</p>
          <h1 className="mt-2 font-mono text-[18px] leading-relaxed md:text-[22px]">THE PIT</h1>
        </div>
        <div className="flex flex-wrap gap-4 font-mono text-[8px] uppercase text-mute">
          <span className="text-fg">
            {mm}:{ss}
          </span>
          <span>pot {s.board.pot.toFixed(3)} ETH</span>
          <span>
            matches {s.board.matchesByWallet}/{MAX_MATCHES_PER_HOUR}
          </span>
          <span>$KILI {s.kili}</span>
        </div>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-[1fr_140px_1fr]">
        <Fighter cat={left} side="YOU" nursery={s.nursery} active={s.pitLeft} onPick={(id) => s.setPit("left", id)} />
        <div className="flex flex-col items-center justify-center gap-3 py-6">
          <div className="grid size-24 place-items-center border-2 border-acid bg-ink p-1">
            <PixelVat className="size-full" />
          </div>
          <Button
            size="lg"
            className="w-full"
            disabled={!left || !right || left.id === right.id || s.board.matchesByWallet >= MAX_MATCHES_PER_HOUR}
            onClick={() => s.fight()}
          >
            FIGHT
          </Button>
          <p className="text-center font-mono text-[8px] leading-relaxed text-mute">
            Win +3 / lose +1
            <br />
            No HP. One score.
          </p>
        </div>
        <Fighter cat={right} side="FOE" nursery={s.nursery} active={s.pitRight} onPick={(id) => s.setPit("right", id)} />
      </div>

      {s.lastFight && left && right && (
        <div className="mt-6 border-2 border-acid bg-ink px-4 py-3 font-sans text-[20px]">
          {s.lastFight.winner === "a" ? left.name : right.name} {s.lastFight.sa} — {s.lastFight.sb}{" "}
          {s.lastFight.winner === "a" ? right.name : left.name}. Organ +1 on the winner.
        </div>
      )}

      {left && (
        <BoostPanel cat={left} kili={s.kili} used={s.board.boostsUsed[left.id] ?? 0} onBoost={(o) => s.boost(left.id, o)} />
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="border border-line bg-panel p-4">
          <h2 className="font-mono text-[10px]">HOUR BOARD</h2>
          <ul className="mt-3 space-y-2">
            {ranked.length === 0 && <li className="font-sans text-[20px] text-mute">No points yet this hour.</li>}
            {ranked.map(([id, pts], i) => {
              const cat = s.nursery.find((c) => c.id === id);
              return (
                <li key={id} className="flex items-center justify-between font-mono text-[9px]">
                  <span className="text-mute">
                    {i + 1}. {cat?.name ?? id.slice(0, 8)}
                  </span>
                  <span className="text-acid">{pts}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 font-mono text-[8px] leading-relaxed text-mute">
            Split · 40% vat · 30% #1 · 12% #2 · 13% 3–10 · 5% next hour
          </p>
        </div>
        <div className="border border-line bg-panel p-4">
          <h2 className="font-mono text-[10px]">LAST MATCHES</h2>
          <ul className="mt-3 space-y-2">
            {s.log.length === 0 && <li className="font-sans text-[20px] text-mute">Fight to write the hour.</li>}
            {s.log.slice(0, 8).map((m) => (
              <li key={m.id} className="font-mono text-[8px] text-mute">
                {m.sa} / {m.sb} · winner {m.winner.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  );
}

function Fighter({
  cat,
  side,
  nursery,
  active,
  onPick,
}: {
  cat?: Specimen;
  side: string;
  nursery: Specimen[];
  active?: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="border border-line bg-panel p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[8px] text-mute">{side}</span>
        {cat && <span className="font-mono text-[10px] text-acid">{organScore(cat)}</span>}
      </div>
      <CornerFrame className="aspect-square overflow-hidden bg-ink">
        {cat ? <SpecimenArt specimen={cat} className="h-full" /> : <PixelEmpty />}
      </CornerFrame>
      {cat && <div className="mt-2 font-mono text-[10px]">{cat.name}</div>}
      <div className="mt-2 flex gap-1 overflow-x-auto">
        {nursery.map((c) => (
          <button
            key={c.id}
            onClick={() => onPick(c.id)}
            className="size-12 shrink-0 overflow-hidden"
          >
            <span
              className={cn(
                "block h-full outline-offset-0",
                active === c.id ? "outline outline-1 outline-acid" : "outline outline-1 outline-line",
              )}
            >
              <SpecimenArt specimen={c} className="h-full" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BoostPanel({
  cat,
  kili,
  used,
  onBoost,
}: {
  cat: Specimen;
  kili: number;
  used: number;
  onBoost: (o: Organ) => void;
}) {
  return (
    <div className="mt-8 border border-line bg-panel p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-mono text-[10px] leading-relaxed">BURN $KILI</h2>
        <p className="font-mono text-[8px] text-mute">
          {used}/2 this hour · cap +5 · points cannot be bought
        </p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        {ORGANS.map((o) => {
          const step = cat.boosts[o];
          const cost = BOOST_COST[Math.min(step, BOOST_COST.length - 1)];
          const locked = step >= 5 || used >= 2 || kili < cost;
          return (
            <button
              key={o}
              disabled={locked}
              onClick={() => onBoost(o)}
              className="border border-line p-3 text-left disabled:opacity-40"
            >
              <div className="font-mono text-[8px] text-mute">{o}</div>
              <div className="mt-1 font-mono text-[16px]">+{step}</div>
              <div className="mt-1 font-mono text-[8px] text-acid">{step >= 5 ? "capped" : `${cost} $KILI`}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

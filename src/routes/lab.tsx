import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CornerFrame, Shell } from "@/components/shell";
import { SpecimenArt } from "@/components/specimen-art";
import { PixelCat } from "@/components/pixel-cat";
import {
  LAB_APPEND,
  LAB_AURA,
  LAB_BODY,
  LAB_EYE,
  LAB_FUR,
  MIX_FEE_ETH,
  ORGANS,
  defaultLabTraits,
  mintLabCat,
  type LabTraits,
  type Specimen,
} from "@/lib/game";
import { cn } from "@/lib/utils";
import { useLab } from "@/store/lab";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/lab")({ component: LabPage });

function LabPage() {
  const {
    nursery,
    mixLeft,
    mixRight,
    setMix,
    mix,
    lastMixId,
    connect,
    wallet,
    vat,
  } = useLab();
  const [flash, setFlash] = useState<Specimen | null>(null);
  const [tab, setTab] = useState<"mix" | "genome">("mix");

  useEffect(() => {
    if (!wallet) connect();
  }, [wallet, connect]);

  const a = nursery.find((c) => c.id === mixLeft);
  const b = nursery.find((c) => c.id === mixRight);
  const child = nursery.find((c) => c.id === lastMixId);

  const onMix = () => {
    const c = mix();
    if (c) setFlash(c);
  };

  return (
    <Shell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-[0.24em] text-acid">Nursery / KIT</p>
          <h1 className="mt-1 font-display text-4xl">The Vat</h1>
        </div>
        <div className="flex gap-1 border border-line p-1">
          {(["mix", "genome"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "h-9 px-4 font-mono text-2xs uppercase tracking-widest",
                tab === t ? "bg-acid text-ink" : "text-mute",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "mix" ? (
        <>
          <div className="grid gap-4 md:grid-cols-[1fr_140px_1fr]">
            <ParentPicker label="Parent A" selected={a} nursery={nursery} onPick={(id) => setMix("left", id)} />
            <div className="flex flex-col items-center justify-center gap-3 py-4">
              <div className="font-mono text-3xs uppercase tracking-widest text-mute">Fee {MIX_FEE_ETH} ETH</div>
              <Button size="lg" onClick={onMix} disabled={!a || !b || a.id === b.id}>
                MIX
              </Button>
              <div className="font-mono text-3xs uppercase tracking-widest text-mute">Vat {vat.toFixed(3)}</div>
            </div>
            <ParentPicker label="Parent B" selected={b} nursery={nursery} onPick={(id) => setMix("right", id)} />
          </div>

          {flash && (
            <CornerFrame className="mt-8 border border-line bg-panel p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-2xs uppercase tracking-widest text-acid">
                    {flash.chimera ? "Coat mismatch — chimera" : flash.mutant ? `Mutant · ${flash.line}` : "Mix settled"}
                  </p>
                  <h2 className="font-display text-2xl">{flash.name}</h2>
                </div>
                <OrganRow cat={flash} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-[220px_1fr]">
                <SpecimenArt specimen={flash} className="aspect-square" />
                <p className="self-center text-sm leading-relaxed text-mute">
                  Parents stay in the nursery. The child is a new kit. Six percent of mixes hit a named line.
                  Wrong coat stays on the card. Keep it.
                </p>
              </div>
            </CornerFrame>
          )}

          <h2 className="mt-12 font-display text-xl">Nursery</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {nursery.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  if (!mixLeft) setMix("left", c.id);
                  else if (!mixRight || mixLeft === c.id) setMix("right", c.id);
                  else setMix("left", c.id);
                }}
                className="bg-elevated text-left"
              >
                <div
                  className={cn(
                    "outline-offset-0",
                    c.id === mixLeft || c.id === mixRight
                      ? "outline outline-1 outline-acid"
                      : "outline outline-1 outline-line",
                  )}
                >
                  <SpecimenArt specimen={c} className="aspect-square" />
                </div>
                <div className="px-2 py-2">
                  <div className="truncate font-display text-sm">{c.name}</div>
                  <div className="font-mono text-3xs uppercase tracking-widest text-mute">
                    G{c.generation}
                    {c.chimera ? " · chimera" : ""}
                    {c.mutant ? " · mutant" : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>
          {child && <p className="sr-only">Last mix {child.id}</p>}
        </>
      ) : (
        <GenomeLab />
      )}
    </Shell>
  );
}

function ParentPicker({
  label,
  selected,
  nursery,
  onPick,
}: {
  label: string;
  selected?: Specimen;
  nursery: Specimen[];
  onPick: (id: string) => void;
}) {
  return (
    <div className="border border-line bg-panel p-3">
      <div className="mb-2 font-mono text-2xs uppercase tracking-widest text-mute">{label}</div>
      <CornerFrame className="aspect-square overflow-hidden bg-ink">
        {selected ? <SpecimenArt specimen={selected} className="h-full" /> : <EmptyVat />}
      </CornerFrame>
      {selected && (
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display">{selected.name}</span>
          <OrganRow cat={selected} />
        </div>
      )}
      <div className="mt-3 flex gap-1 overflow-x-auto">
        {nursery.slice(0, 12).map((c) => (
          <button
            key={c.id}
            onClick={() => onPick(c.id)}
            className={cn(
              "size-12 shrink-0 overflow-hidden outline-offset-0",
              selected?.id === c.id ? "outline outline-1 outline-acid" : "outline outline-1 outline-line",
            )}
          >
            <SpecimenArt specimen={c} className="h-full" />
          </button>
        ))}
      </div>
    </div>
  );
}

function OrganRow({ cat }: { cat: Specimen }) {
  return (
    <div className="flex gap-1">
      {ORGANS.map((o) => (
        <span key={o} className="border border-line px-1.5 py-0.5 font-mono text-3xs uppercase text-mute">
          {o[0]}:{cat.organs[o].slice(0, 3)}
          {cat.boosts[o] ? `+${cat.boosts[o]}` : ""}
        </span>
      ))}
    </div>
  );
}

function EmptyVat() {
  return (
    <div className="grid h-full place-items-center font-mono text-2xs uppercase tracking-widest text-mute">
      Select a kit
    </div>
  );
}

function GenomeLab() {
  const [traits, setTraits] = useState(defaultLabTraits());
  const addCat = useLab((st) => st.addCat);
  const set = (k: keyof LabTraits, v: LabTraits[keyof LabTraits]) =>
    setTraits((p) => ({ ...p, [k]: v }));

  const mint = () => {
    const cat = mintLabCat(traits);
    addCat(cat);
  };

  const rows = useMemo(
    () =>
      [
        { label: "Body", key: "bodyType" as const, opts: LAB_BODY },
        { label: "Eyes", key: "eyeType" as const, opts: LAB_EYE },
        { label: "Fur", key: "furPattern" as const, opts: LAB_FUR },
        { label: "Limbs", key: "appendages" as const, opts: LAB_APPEND },
        { label: "Aura", key: "aura" as const, opts: LAB_AURA },
      ] as const,
    [],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="border border-line bg-panel p-4">
        <p className="font-mono text-2xs uppercase tracking-widest text-mute">Mutation level</p>
        <div className="mt-2 flex items-center justify-between font-mono text-sm text-acid">
          <span>{traits.mutationLevel}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={traits.mutationLevel}
          onChange={(e) => set("mutationLevel", Number(e.target.value))}
          className="mt-2 w-full accent-acid"
        />
        {rows.map((r) => (
          <div key={r.key} className="mt-5">
            <p className="mb-2 font-mono text-2xs uppercase tracking-widest text-mute">{r.label}</p>
            <div className="flex flex-wrap gap-1">
              {r.opts.map((o) => (
                <button
                  key={o.id}
                  onClick={() => set(r.key, o.id)}
                  className={cn(
                    "border px-2 py-1 font-mono text-3xs uppercase tracking-wide",
                    traits[r.key] === o.id ? "border-acid text-acid" : "border-line text-mute",
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <Button className="mt-6 w-full" onClick={mint}>
          Mint to nursery
        </Button>
      </aside>
      <CornerFrame className="flex min-h-[420px] items-center justify-center border border-line bg-ink">
        <PixelCat specimen={mintLabCat(traits)} className="h-full w-full max-h-[520px]" />
      </CornerFrame>
    </div>
  );
}

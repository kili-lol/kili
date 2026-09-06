import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CornerFrame, Shell } from "@/components/shell";
import { CHAIN_ID, FEE, FEE_SHARE, FOUNDERS } from "@/lib/game";
import { FounderPixel } from "@/components/pixel-cat";
import { useLab } from "@/store/lab";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const connect = useLab((s) => s.connect);
  const wallet = useLab((s) => s.wallet);

  return (
    <Shell>
      <section className="grid items-center gap-10 pb-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[8px] text-acid">THE VAT IS OPEN</p>
          <h1 className="mt-4 font-mono text-[28px] leading-[1.6] text-acid md:text-[40px]">KILI</h1>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-fg md:text-[12px]">MUTATE YOUR CATS</p>
          <ul className="mt-6 space-y-2 font-mono text-[8px] leading-relaxed text-mute md:text-[9px]">
            <li>4 ORGANS · HEAD BODY TAIL LEGS</li>
            <li>MIX 2 · 50 / 50</li>
            <li>6% MUTANT</li>
            <li className="text-acid">WRONG COAT = CHIMERA</li>
            <li>KEEP THE WRONG ONES</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/lab" onClick={() => connect()}>
              <Button size="lg">OPEN LAB</Button>
            </Link>
            <Link to="/pit">
              <Button size="lg" variant="line">
                ENTER PIT
              </Button>
            </Link>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t-2 border-line pt-6">
            <div>
              <dt className="font-mono text-[8px] text-mute">TICKER</dt>
              <dd className="mt-1 font-mono text-[12px]">$KILI</dd>
            </div>
            <div>
              <dt className="font-mono text-[8px] text-mute">SWAP TAX</dt>
              <dd className="mt-1 font-mono text-[12px]">{FEE.totalBps / 100}%</dd>
            </div>
            <div>
              <dt className="font-mono text-[8px] text-mute">CHAIN</dt>
              <dd className="mt-1 font-mono text-[12px]">{CHAIN_ID}</dd>
            </div>
          </dl>
        </div>
        <div>
          <CornerFrame className="aspect-square max-h-[520px] overflow-hidden border-2 border-acid bg-ink">
            <FounderPixel id="wrex" className="h-full w-full" />
          </CornerFrame>
          <div className="mt-3 flex items-center justify-between font-mono text-[8px]">
            <span className="text-acid">WREX</span>
            <span className="text-mute">S-RANK · CHIMERA · +5</span>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-mono text-[12px]">FOUNDERS</h2>
          <p className="font-mono text-[8px] text-mute">GEN 0 · 7 KITS</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {FOUNDERS.map((f) => (
            <figure key={f.id} className="border-2 border-line bg-ink">
              <div className="aspect-square overflow-hidden">
                <FounderPixel id={f.id} className="h-full w-full" />
              </div>
              <figcaption className="px-2 py-2">
                <div className="font-mono text-[9px]">{f.name.toUpperCase()}</div>
                <div className="font-mono text-[8px] text-mute">{f.line}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          { k: "01 MIX", t: "4 ORGANS", d: "HEAD BODY TAIL LEGS. ROLL 50/50. PARENTS STAY. CHILD IS A NEW KIT." },
          { k: "02 COAT", t: "CHIMERA", d: "HEAD != COAT. SPLIT STAYS ON THE CARD. THAT IS THE DROP. KEEP IT." },
          { k: "03 PIT", t: "HOUR SCORE", d: "NO HP. ORGANS + LINE + CHIMERA + BOOST = 1 NUMBER. WINNER +1 ORGAN." },
        ].map((c) => (
          <article key={c.k} className="border-2 border-line bg-panel p-5">
            <p className="font-mono text-[8px] text-acid">{c.k}</p>
            <h3 className="mt-3 font-mono text-[11px] leading-relaxed">{c.t}</h3>
            <p className="mt-3 font-mono text-[8px] leading-relaxed text-mute">{c.d}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 border-2 border-line bg-panel p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="font-mono text-[12px] leading-relaxed">3% CREATOR FEE</h2>
            <p className="mt-3 max-w-lg font-mono text-[8px] leading-relaxed text-mute">
              PAIR V2. UNI V4. LP LOCKED. 1B ONCE. MIX FEE 0.0003 ETH TO THE VAT. NEVER AN EOA.
              LAUNCH ON PAIR.FUN. CUSTOM QUOTE EMPTY.
            </p>
          </div>
          <Link to="/token">
            <Button variant="line">$KILI SPLIT</Button>
          </Link>
        </div>
        <div className="mt-6 grid gap-px bg-line sm:grid-cols-3">
          {FEE_SHARE.map((s) => (
            <div key={s.id} className="bg-bg p-4">
              <div className="font-mono text-[14px] text-acid">{s.swapPct}</div>
              <div className="mt-1 font-mono text-[10px]">{s.label.toUpperCase()}</div>
              <div className="mt-1 font-mono text-[8px] text-mute">{s.dest.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 font-mono text-[8px] leading-relaxed text-mute">
        {wallet ? "LAB LIVE · MIX LOCAL UNTIL NURSERY" : "ENTER LAB · SEED 2 FOUNDERS"} · WWW.KILI.LOL · @KILI_RH
      </p>
    </Shell>
  );
}

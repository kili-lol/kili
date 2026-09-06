import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CornerFrame, Shell } from "@/components/shell";
import { CHAIN_ID, FEE, FEE_SHARE, FOUNDERS, LINKS } from "@/lib/game";
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
          <h1 className="mt-4 font-mono text-[18px] leading-[1.7] text-fg md:text-[28px]">
            MUTATE
            <br />
            YOUR CATS
            <span className="mt-2 block text-mute">: KILI</span>
          </h1>
          <p className="mt-6 max-w-md font-sans text-[22px] leading-tight text-mute">
            A cat is four organs. Mix two. Fifty-fifty. Six percent mutant. Coat mismatch: chimera. Keep
            the wrong ones.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/lab" onClick={() => connect()}>
              <Button size="lg">Open the lab</Button>
            </Link>
            <Link to="/pit">
              <Button size="lg" variant="line">
                Enter the pit
              </Button>
            </Link>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <dt className="font-mono text-[8px] text-mute">TICKER</dt>
              <dd className="mt-1 font-mono text-[12px]">$KILI</dd>
            </div>
            <div>
              <dt className="font-mono text-[8px] text-mute">SWAP TAX</dt>
              <dd className="mt-1 font-mono text-[12px]">{FEE.totalBps / 100}%</dd>
            </div>
            <div>
              <dt className="font-mono text-[8px] text-mute">CHAIN ID</dt>
              <dd className="mt-1 font-mono text-[12px]">{CHAIN_ID}</dd>
            </div>
          </dl>
        </div>
        <CornerFrame className="aspect-square max-h-[520px] overflow-hidden border border-line bg-ink">
          <FounderPixel id="phantom" className="h-full w-full" />
        </CornerFrame>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-mono text-[12px]">FOUNDERS</h2>
          <p className="font-mono text-[8px] text-mute">7 COATS · 6 LINES</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {FOUNDERS.map((f) => (
            <figure key={f.id} className="group border border-line bg-ink">
              <div className="aspect-square overflow-hidden">
                <FounderPixel id={f.id} className="h-full w-full" />
              </div>
              <figcaption className="px-2 py-2">
                <div className="font-mono text-[9px]">{f.name}</div>
                <div className="font-mono text-[8px] text-mute">{f.line}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          {
            k: "01 Mix",
            t: "Four organs",
            d: "Head, body, tail, legs. Each roll is fifty-fifty. Parents stay. The child is a new KIT.",
          },
          {
            k: "02 Wrong coat",
            t: "Chimera",
            d: "If the coat does not match the head, the split stays. That is the brand, not a bug.",
          },
          {
            k: "03 The pit",
            t: "Hourly score",
            d: "No HP bar. Organs + line + chimera + boost become one number. Winner takes +1 organ.",
          },
        ].map((c) => (
          <article key={c.k} className="border border-line bg-panel p-5">
            <p className="font-mono text-[8px] text-acid">{c.k}</p>
            <h3 className="mt-3 font-mono text-[11px] leading-relaxed">{c.t}</h3>
            <p className="mt-2 font-sans text-[20px] leading-tight text-mute">{c.d}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 border border-line bg-panel p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="font-mono text-[12px] leading-relaxed">3% CREATOR FEE</h2>
            <p className="mt-2 max-w-lg font-sans text-[20px] leading-tight text-mute">
              Uniswap V4, LP locked, 1B minted once. Mix fee 0.0003 ETH hits The Vat, never an operator
              EOA. Launch on{" "}
              <a className="text-acid underline-offset-2 hover:underline" href={LINKS.pair} target="_blank" rel="noreferrer">
                pair.fun
              </a>
              . Custom quote stays empty.
            </p>
          </div>
          <Link to="/token">
            <Button variant="line">Token split</Button>
          </Link>
        </div>
        <div className="mt-6 grid gap-px bg-line sm:grid-cols-3">
          {FEE_SHARE.map((s) => (
            <div key={s.id} className="bg-bg p-4">
              <div className="font-mono text-[14px] text-acid">{s.swapPct}</div>
              <div className="mt-1 font-mono text-[10px]">{s.label}</div>
              <div className="mt-1 font-mono text-[8px] text-mute">{s.dest}</div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 font-mono text-[8px] leading-relaxed text-mute">
        {wallet ? "Lab session live — mix is local until Nursery." : "Enter lab to seed two founders."} ·
        www.kili.lol · @{`kili_RH`}
      </p>
    </Shell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CornerFrame, Shell } from "@/components/shell";
import { CHAIN_ID, FEE, FEE_SHARE, FOUNDERS, LINKS } from "@/lib/game";
import { useLab } from "@/store/lab";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const connect = useLab((s) => s.connect);
  const wallet = useLab((s) => s.wallet);

  return (
    <Shell>
      <section className="grid items-center gap-10 pb-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-2xs uppercase tracking-[0.28em] text-acid">The vat is open</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            Mutate Your Cats
            <span className="block text-mute">: KILI</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mute">
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
              <dt className="font-mono text-3xs uppercase tracking-widest text-mute">Ticker</dt>
              <dd className="mt-1 font-display text-lg">$KILI</dd>
            </div>
            <div>
              <dt className="font-mono text-3xs uppercase tracking-widest text-mute">Swap tax</dt>
              <dd className="mt-1 font-display text-lg">{FEE.totalBps / 100}%</dd>
            </div>
            <div>
              <dt className="font-mono text-3xs uppercase tracking-widest text-mute">Chain id</dt>
              <dd className="mt-1 font-display text-lg">{CHAIN_ID}</dd>
            </div>
          </dl>
        </div>
        <CornerFrame className="aspect-square max-h-[520px] overflow-hidden border border-line bg-elevated">
          <img src="/cats/phantom.png" alt="Phantom, named void line" className="h-full w-full object-cover" />
        </CornerFrame>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl">Founders</h2>
          <p className="font-mono text-2xs uppercase tracking-widest text-mute">Seven coats. Six named lines.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {FOUNDERS.map((f) => (
            <figure key={f.id} className="group border border-line bg-elevated">
              <div className="aspect-square overflow-hidden">
                <img
                  src={f.src}
                  alt={f.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="px-2 py-2">
                <div className="font-display text-sm">{f.name}</div>
                <div className="font-mono text-3xs uppercase tracking-widest text-mute">{f.line}</div>
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
            <p className="font-mono text-3xs uppercase tracking-[0.2em] text-acid">{c.k}</p>
            <h3 className="mt-3 font-display text-xl">{c.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">{c.d}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 border border-line bg-panel p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl">3% creator fee · PAIR V2</h2>
            <p className="mt-2 max-w-lg text-sm text-mute">
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
              <div className="font-mono text-lg text-acid">{s.swapPct}</div>
              <div className="mt-1 font-display">{s.label}</div>
              <div className="mt-1 font-mono text-3xs uppercase tracking-widest text-mute">{s.dest}</div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 font-mono text-2xs uppercase tracking-[0.18em] text-mute">
        {wallet ? "Lab session live — mix is local until Nursery." : "Enter lab to seed two founders."} ·
        www.kili.lol · @{`kili_RH`}
      </p>
    </Shell>
  );
}

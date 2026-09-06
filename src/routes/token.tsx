import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import { CHAIN_ID, FEE, FEE_SHARE, LINKS, PAIR_LAUNCH_ETH, PAIR_MARKETS, SOCIALS } from "@/lib/game";
import { useState } from "react";

export const Route = createFileRoute("/token")({ component: TokenPage });

function TokenPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const ca = LINKS.ca;

  const copy = async (label: string, value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Shell>
      <p className="font-mono text-2xs uppercase tracking-[0.24em] text-acid">
        PAIR V2 · Uniswap V4 · chain {CHAIN_ID}
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-6xl">$KILI</h1>
      <p className="mt-4 max-w-xl text-mute">
        {SOCIALS.description} Nursery unit is KIT. Ticker is $KILI. One billion into locked LP. Developer buy
        empty means 0 bag.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button onClick={() => copy("ca", ca)} disabled={!ca}>
          {ca ? (copied === "ca" ? "Copied" : "Copy CA") : "CA after PAIR launch"}
        </Button>
        <a href={LINKS.pair} target="_blank" rel="noreferrer">
          <Button variant="line">pair.fun/launch</Button>
        </a>
        <a href={LINKS.pairDocs} target="_blank" rel="noreferrer">
          <Button variant="ghost">Docs</Button>
        </a>
        <a href={LINKS.x} target="_blank" rel="noreferrer">
          <Button variant="ghost">@{`kili_RH`}</Button>
        </a>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Vat", LINKS.vat || "after Remix"],
          ["Nursery", LINKS.nursery || "Nursery(vat)"],
          ["$KILI", ca || "PAIR PairToken"],
        ].map(([k, v]) => (
          <div key={k} className="border border-line bg-panel p-4">
            <div className="font-mono text-2xs uppercase tracking-widest text-mute">{k}</div>
            <div className="mt-2 truncate font-mono text-xs text-fg">{v}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl">Fee sharing · 3%</h2>
      <p className="mt-2 max-w-xl text-sm text-mute">
        PAIR mode: Sharing. Recipients total 10000 bps of the creator fee. Mix fee is separate: 0.0003 ETH
        into The Vat.
      </p>
      <div className="mt-6 overflow-x-auto border border-line">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-elevated font-mono text-2xs uppercase tracking-widest text-mute">
            <tr>
              <th className="px-4 py-3">Slice</th>
              <th className="px-4 py-3">Of swap</th>
              <th className="px-4 py-3">Share bps</th>
              <th className="px-4 py-3">Wallet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {FEE_SHARE.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3">{row.label}</td>
                <td className="px-4 py-3">{row.swapPct}</td>
                <td className="px-4 py-3 font-mono">{row.shareBps}</td>
                <td className="px-4 py-3 text-mute">{row.dest}</td>
              </tr>
            ))}
            <tr className="bg-elevated font-medium">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3">{FEE.totalBps / 100}%</td>
              <td className="px-4 py-3 font-mono">10000</td>
              <td className="px-4 py-3">Fixed at launch</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-display text-2xl">Markets · 10000 bps</h2>
      <p className="mt-2 max-w-xl text-sm text-mute">
        Catalog only. Do not paste Vat, Nursery, or $KILI into custom quote discovery.
      </p>
      <div className="mt-6 grid gap-px bg-line sm:grid-cols-4">
        {PAIR_MARKETS.map((m) => (
          <div key={m.quote} className="bg-bg p-4">
            <div className="font-display text-lg">{m.quote}</div>
            <div className="mt-1 font-mono text-acid">{m.pct}%</div>
            <div className="mt-1 font-mono text-3xs uppercase tracking-widest text-mute">
              {m.bps} bps · {m.role}
            </div>
          </div>
        ))}
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <article className="border border-line bg-panel p-5">
          <h2 className="font-display text-xl">Launch order</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-mute">
            <li>Name KILI, slogan, X / GitHub, square logo — ticker last.</li>
            <li>www.kili.lol canonical. Apex 308 → www. OG 1200×630 from day one.</li>
            <li>Vat first (receive ETH). Then Nursery(vat) only. mixFee 0.0003 ETH.</li>
            <li>Verify on Blockscout via Remix (0.8.24, optimizer 200, cancun). Call socials().</li>
            <li>
              PAIR V2 form: Name KILI / Symbol KILI. Custom quote empty. Markets above. Developer buy
              blank. Launch fee {PAIR_LAUNCH_ETH} ETH + gas.
            </li>
            <li>Pin CA on this page. Mix stays on-device until Nursery is live.</li>
          </ol>
        </article>
        <article className="border border-line bg-panel p-5">
          <h2 className="font-display text-xl">Do not</h2>
          <ul className="mt-3 space-y-2 text-sm text-mute">
            <li>Paste Vat or Nursery into PAIR custom quote.</li>
            <li>Use LetsCash SDK — it does not speak PAIR V4.</li>
            <li>Mint after launch. LP is locked in PairV4Locker.</li>
            <li>Pay mix fees to an EOA.</li>
            <li>Equal 20% on every market. US0 ≠ USO. USDG is cash.</li>
            <li>Swap from a homegrown router — use pair.fun so the hook runs.</li>
          </ul>
        </article>
      </section>

      <p className="mt-10 font-mono text-2xs uppercase tracking-[0.16em] text-mute">
        socials · {SOCIALS.website} · explorer {LINKS.explorer.replace("https://", "")}
      </p>
    </Shell>
  );
}

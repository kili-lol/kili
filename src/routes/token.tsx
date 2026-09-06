import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import { CHAIN_ID, FEE, FEE_SHARE, LINKS, SOCIALS } from "@/lib/game";
import { useState } from "react";

export const Route = createFileRoute("/token")({ component: TokenPage });

function TokenPage() {
  const [copied, setCopied] = useState(false);
  const ca = LINKS.ca;

  const copy = async () => {
    if (!ca) return;
    await navigator.clipboard.writeText(ca);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Shell>
      <p className="font-mono text-[8px] text-acid">CHAIN {CHAIN_ID} · 1B · LP LOCKED</p>
      <h1 className="mt-3 font-mono text-[22px] leading-relaxed md:text-[28px]">$KILI</h1>
      <p className="mt-4 max-w-xl font-mono text-[8px] leading-relaxed text-mute md:text-[9px]">
        MUTATE YOUR CATS. FOUR ORGANS. 50/50 MIX. 6% MUTANT. WRONG COAT = CHIMERA. NURSERY UNIT KIT. MIX FEE
        0.0003 ETH TO THE VAT.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button onClick={copy} disabled={!ca}>
          {copied ? "COPIED" : "COPY CA"}
        </Button>
        {ca && (
          <a href={`${LINKS.explorer}/address/${ca}`} target="_blank" rel="noreferrer">
            <Button variant="line">EXPLORER</Button>
          </a>
        )}
        <a href={LINKS.x} target="_blank" rel="noreferrer">
          <Button variant="ghost">@{SOCIALS.handle}</Button>
        </a>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["$KILI", ca, `${LINKS.explorer}/address/${ca}`],
          ["Vat", LINKS.vat, `${LINKS.explorer}/address/${LINKS.vat}`],
          ["Nursery", LINKS.nursery, `${LINKS.explorer}/address/${LINKS.nursery}`],
        ].map(([k, v, href]) => (
          <div key={k} className="border-2 border-line bg-panel p-4">
            <div className="font-mono text-[8px] text-mute">{k}</div>
            <a
              className="mt-2 block truncate font-mono text-[9px] text-acid hover:underline"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {v}
            </a>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-mono text-[12px] leading-relaxed">3% CREATOR FEE</h2>
      <p className="mt-2 max-w-xl font-mono text-[8px] leading-relaxed text-mute">
        EVERY SWAP. MIX FEE IS SEPARATE: 0.0003 ETH INTO THE VAT.
      </p>
      <div className="mt-6 overflow-x-auto border-2 border-line">
        <table className="w-full min-w-[420px] text-left">
          <thead className="bg-elevated font-mono text-[8px] text-mute">
            <tr>
              <th className="px-4 py-3">SLICE</th>
              <th className="px-4 py-3">OF SWAP</th>
              <th className="px-4 py-3">DEST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line font-mono text-[10px]">
            {FEE_SHARE.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3">{row.label.toUpperCase()}</td>
                <td className="px-4 py-3 text-acid">{row.swapPct}</td>
                <td className="px-4 py-3 text-mute">{row.dest.toUpperCase()}</td>
              </tr>
            ))}
            <tr className="bg-elevated">
              <td className="px-4 py-3">TOTAL</td>
              <td className="px-4 py-3 text-acid">{FEE.totalBps / 100}%</td>
              <td className="px-4 py-3 text-mute">FIXED</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-10 font-mono text-[8px] leading-relaxed text-mute">
        {SOCIALS.website} · @{SOCIALS.handle} · KEEP THE WRONG ONES
      </p>
    </Shell>
  );
}

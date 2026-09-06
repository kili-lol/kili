import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import { FounderPixel } from "@/components/pixel-cat";
import { SOCIALS } from "@/lib/game";

export const Route = createFileRoute("/lore")({ component: Lore });

function Lore() {
  return (
    <Shell>
      <p className="font-mono text-[8px] text-acid">ARTICLE · 5:2 COVER</p>
      <h1 className="mt-3 font-mono text-[18px] leading-[1.7] md:text-[24px]">KEEP THE WRONG ONES</h1>
      <p className="mt-3 font-mono text-[8px] text-mute">KILI · {SOCIALS.handle.toUpperCase()} · WWW.KILI.LOL</p>

      <div className="mt-8 overflow-hidden border-2 border-acid">
        <img
          src="/x/article-cover.png"
          alt="Keep the wrong ones"
          className="block h-auto w-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <article className="mt-10 max-w-2xl space-y-6 font-mono text-[8px] leading-relaxed text-mute md:text-[9px]">
        <p className="text-fg">THE VAT IS OPEN.</p>
        <p>
          A CAT IS FOUR ORGANS. HEAD. BODY. TAIL. LEGS. MIX TWO. EACH ORGAN ROLLS FIFTY-FIFTY. PARENTS STAY.
          THE CHILD IS A NEW KIT.
        </p>
        <p>
          SIX PERCENT MUTANT. A NAMED LINE LANDS ON ONE ORGAN: PHANTOM, ROT, SCALE, LASER, VEIL, BEAM. GRID IS
          THE BLANK COAT. IT IS NOT A LINE.
        </p>
        <p className="text-acid">IF THE COAT DOES NOT MATCH THE HEAD, THE SPLIT STAYS. THAT IS A CHIMERA.</p>
        <p>
          OTHER DROPS HIDE THE MISMATCH. WE KEEP IT. THE WRONG COAT IS THE CARD. THAT IS THE BRAND. NOT A BUG.
        </p>
        <p className="text-fg">THE PIT HAS NO HP BAR. NO SKILL KEYS. NO CUP MAP.</p>
        <p>
          TWO CARDS. ONE VAT. MIX OR FIGHT. SCORE IS ORGANS + LINE + CHIMERA + BOOST. HOUR CLOCK. WINNER TAKES
          +1 ORGAN, CAPPED AT FIVE. BOOST IS A $KILI BURN. MAX TWO PER CAT PER HOUR. BURNED TOKEN DOES NOT
          COME BACK.
        </p>
        <p>
          MIX FEE IS 0.0003 ETH. IT HITS THE VAT. NEVER AN OPERATOR EOA. THE VAT HAS NO OWNER AND NO WITHDRAW.
        </p>
        <p>
          $KILI IS PAIR V2. UNI V4. 1B MINTED ONCE. LP LOCKED. 3% CREATOR FEE: 0.70% STUDIO (PC / MOBILE),
          1.00% THE PIT (HOURLY POT), 1.30% THE VAT. DEVELOPER BUY BLANK = 0 BAG.
        </p>
        <p>
          NURSERY UNIT IS KIT. TICKER IS $KILI. DO NOT PASTE VAT OR NURSERY INTO PAIR CUSTOM QUOTE. CUSTOM
          QUOTE STAYS EMPTY.
        </p>
        <p className="text-fg">KEEP THE WRONG ONES.</p>
      </article>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/lab">
          <Button>OPEN LAB</Button>
        </Link>
        <Link to="/token">
          <Button variant="line">$KILI</Button>
        </Link>
        <a href={SOCIALS.twitter} target="_blank" rel="noreferrer">
          <Button variant="ghost">@{SOCIALS.handle}</Button>
        </a>
      </div>

      <div className="mt-12 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {["phantom", "rot", "scale", "laser", "veil", "beam", "grid", "wrex"].map((id) => (
          <div key={id} className="border-2 border-line bg-ink">
            <FounderPixel id={id} className="aspect-square w-full" />
          </div>
        ))}
      </div>
    </Shell>
  );
}

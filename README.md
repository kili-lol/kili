# KILI — Mutate Your Cats

Ticker **$KILI**. Nursery unit **KIT**. Site [www.kili.lol](https://www.kili.lol) · X [@kili_RH](https://x.com/kili_RH)

A cat is four organs. Mix two. Fifty-fifty. Six percent mutant. Coat mismatch: chimera. Keep the wrong ones.

## Stack

- Site: TanStack Start, React 19, Tailwind v4 — Vercel preset **TanStack Start**
- Chain: Robinhood **4663** — [Blockscout](https://robinhoodchain.blockscout.com)
- Ticker: PAIR **V2** (Uniswap V4, locked LP). Do not use the LetsCash SDK.
- Mix state: Zustand persist on device until Nursery is live
- Solidity: **0.8.24**, optimizer **200**, EVM cancun

## Product

| Layer | Name | Role |
| --- | --- | --- |
| Brand | KILI | site, PAIR Name |
| Token | $KILI | PAIR Symbol (≤10) |
| Nursery | KIT | mix unit, not the ticker |
| Lab | The Vat | mix-fee sink |
| Arena | The Pit | hourly score, no HP |

Organs: **head, body, tail, legs**. Named lines: Phantom, Rot, Scale, Laser, Veil, Beam.

## Contracts (`contracts/`)

Deploy order — do not reverse:

1. **Vat** — `0x922769007b1047fbe25556599dbc265639b8d481` (no constructor). Confirm `receive()` on Blockscout.
2. **Nursery(vat)** — `0xcE0133b3d373bAFa570ABc127614dbEac8c590E3`. Constructor is the Vat address only.
3. `nursery.vat() == Vat`. `mixFee` is `0.0003 ether`. Call `socials()` on both Vat and Nursery (name, ticker, description, website, twitter, github). Vat also exposes `description()` / `website()` / `twitter()` / `github()`.
4. **$KILI** on PAIR V2 last. PAIR mints its own 1B `PairToken`. It does not wrap Nursery.

Nursery constructor arg (ABI):

```
000000000000000000000000 + vat (20 bytes, no 0x)
```

Verify from Remix on Blockscout. The verify API can 500 on large files.

Mix fee always forwards to Vat. Never an EOA.

## PAIR V2 launch

Form: [pair.fun/launch](https://pair.fun/launch) · docs: [pair.fun/docs](https://pair.fun/docs)

- Name `KILI` / Symbol `KILI`. Square PNG logo.
- **Custom quote discovery empty.** Do not paste Vat, Nursery, or a random CA.
- Add markets from the catalog. Weights must sum to **10000 bps**:

| Quote | % | bps |
| --- | --- | --- |
| USDG | 35 | 3500 |
| WETH | 25 | 2500 |
| GLD | 20 | 2000 |
| SLV | 20 | 2000 |

- Fee mode **Sharing**, 3% creator fee:

| Wallet | Of swap | Share bps |
| --- | --- | --- |
| Studio | 0.70% | 2333 |
| The Pit | 1.00% | 3333 |
| The Vat | 1.30% | 4334 |

- Developer buy blank = **0 bag**. LP locks in `PairV4Locker`. No mint after launch.
- PAIR launch fee is **0.0005 ETH** + gas, not the mix fee.
- Swap on [pair.fun](https://pair.fun) so the V4 hook runs.

## Site

Canonical URL: `https://www.kili.lol` (apex 308 → www). OG `public/og.jpg` is 1200×630.

```
npm install
npm run dev
```

## Announcement

```
The vat is open.

A cat is four organs. Mix two. Fifty-fifty.
Six percent mutant. Coat mismatch: chimera.
Keep the wrong ones.

https://www.kili.lol
CA 0x…
```

## X

Handle `@kili_RH`. Kit in `public/x/`.

- Bio (160): `Mutate Your Cats. Four organs. 50/50 mix. 6% mutant. Coat mismatch: chimera. Keep the wrong ones. $KILI`
- Profile `public/x/logo.png` 400×400
- Banner `public/x/banner.png` 1500×500
- Article cover `public/x/article-cover.png` 1500×600 (5:2)
- Lore: `/lore`

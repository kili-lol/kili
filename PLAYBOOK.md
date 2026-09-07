# KILI playbook

Bir sonraki proje için. İsimleri ve copy’yi kopyalama. Mekaniği al.

Canlı: [kili.lol](https://www.kili.lol) · X [@kili_RH](https://x.com/kili_RH) · repo `kili-lol/kili`  
Chain: Robinhood **4663** · Launchpad: **letscash.fun** (Uniswap v4 shared hook)

---

## 1. Canlı adresler

| Parça | Adres |
| --- | --- |
| $KILI | `0xc4185f32bf8795a0d37b55e3772edcb02bf3e0cc` |
| Vat | `0x922769007b1047fbe25556599dbc265639b8d481` |
| Nursery | `0xcE0133b3d373bAFa570ABc127614dbEac8c590E3` |
| Explorer | https://robinhoodchain.blockscout.com |
| RPC | https://rpc.mainnet.chain.robinhood.com |
| LetsCash hook (zincirde ortak) | `0x75A54357D9C78a2Db19004a5FDc76c50F9242AEC` |
| WETH | `0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73` |
| Uniswap v4 PoolManager | `0x8366a39CC670B4001A1121B8F6A443A643e40951` |

Token on-chain: name `kili: mutate your cats` · symbol `kili` · 18 dec · 1B · EIP-1167 clone.

---

## 2. İsim — sonraki projede aynı hatayı yapma

| Aday | Neden hayır |
| --- | --- |
| Mutant Cats / Mutant Meows / The Mutants | Ethereum 2021 koleksiyonu, `mutantverse.io`. Jenerik + IP çakışması. |
| Mewgenics | Edmund McMillen IP. Yasak. |
| Chimera | Mekanik kanca doğru; ticker ve site için tek kelime yeterli değildi. KILI seçildi. |

Kural: fark “mutant kedi” değil. Fark **dört organ + %50/%50 + %6 mutant + coat uyuşmazsa chimera**. İsim oradan çıkmalı, rakipten değil.

Katmanları ayır:

| Katman | KILI | Sonraki projede |
| --- | --- | --- |
| Marka / site | KILI | tek kelime, İngilizce duyuru iskeletine oturur |
| Ticker | $KILI | ≤10 harf (PAIR kuralı; LetsCash’te de kısa tut) |
| Mix birimi | KIT | ticker ile aynı olmasın |
| Fee sink | The Vat | owner yok, withdraw yok |
| Arena | The Pit | HP bar yok |

Slogan: `Keep the wrong ones.` Bio 160: `Mutate Your Cats. Four organs. 50/50 mix. 6% mutant. Coat mismatch: chimera. Keep the wrong ones. $KILI`

---

## 3. Oyun mekaniği (taşınabilir)

Organlar: **head, body, tail, legs**.

- İki ebeveyn. Her organ bağımsız **50/50**. Ebeveynler durur. Çocuk yeni KIT.
- **%6 mutant** (~16/256). Named line tek organa biner: Phantom, Rot, Scale, Laser, Veil, Beam. **Grid çizgi değil**, boş coat.
- `coat != head` → **chimera**. Saklama. Bu cümle rakiplerde yok.
- Mix ücreti **0.0003 ETH** → Vat. Asla EOA.
- Pit: HP yok, skill tuşu yok, kupa haritası yok. İki kart, Vat ortada, MIX / FIGHT. Saatlik skor.
- Saat tavanı: 12 maç / 3 pair / 2 boost / kedi. Organ cap **+5**.
- Boost: `$TICKER` yakımı, kartta “paid” yazmaz. Maliyet: `10, 25, 60, 150, 400`. Yakılan geri basılmaz.
- Saatlik pot: %40 Vat / %30 #1 / %12 #2 / %13 3–10 / %5 sonraki saat.

Ekran: sol senin kart, sağ rakip, orta Vat, alt MIX/FIGHT, üst `00:37 · pot · puan`.

KILI’de mix **cihazda** (Zustand persist). Nursery on-chain hazır, site henüz ona bağlı değil. Sonraki projede: ya launch günü Nursery’ye bağla ya da “local”i duyuruda söyleme.

---

## 4. Fee — 3 kasa

Hedef **%3** creator tax (LetsCash platform **%0.3** otomatik; kalan creator).

KILI niyet:

| Dilim | Swap | Rol |
| --- | --- | --- |
| Studio | 0.70% | PC / mobile |
| The Pit | 1.00% | saatlik pot / event |
| The Vat | 1.30% | locked mix sink |
| LetsCash | 0.30% | platform (hook) |

Launch’ta **üç cüzdanı forma yaz**. Hook’a gömülür, değişmez. Tek EOA’ya alıp sonra bölmek Ouro modeli — operatör riski.

LetsCash claim: sadece pool creator çeker. Claim anında platform potun **%6’sını** keser = hacmin %0.3’ü. Kalan claimer’a düşer. Hook’ta birikir; çekilmezse orada durur.

---

## 5. Kontrat sırası — tersine çevirme

Solidity **0.8.24**, optimizer **200**, EVM **cancun**. Remix. Blockscout verify API Cloudflare / 500 yapabilir → Remix’ten Verify & publish.

1. **Vat** — constructor yok. `receive` + `fallback`. `socials()` / `description()` / `website()` / `twitter()` / `github()`. Owner yok, withdraw yok.
2. **Nursery(vat)** — tek arg: Vat adresi. ABI:
   ```
   000000000000000000000000 + vat (20 byte, 0x yok)
   ```
   Kontrol: `vat() == Vat`, `mixFee == 0.0003 ether`, `socials()`.
3. **Token** — LetsCash (veya PAIR) **en son**. Custom quote / extra CA yapıştırma. Dev buy **boş** = 0 bag.
4. Pit / HourSplitter / Boost — ticker’dan sonra. KILI’de yazılmadı.

`socials()` her kontratta olsun. Explorer’da okunur.

Kaynak: `contracts/Vat.sol`, `contracts/Nursery.sol`.

---

## 6. Launchpad gerçeği (2026-09)

İki ray var. Karıştırma.

| | LetsCash | PAIR V2 |
| --- | --- | --- |
| Form | letscash.fun | pair.fun/launch |
| Token | 1B clone, kilitli LP | 1B PairToken, V4 locker |
| Tax | creator seçer (default %1; %3 denendi) | Sharing, bps |
| Platform | %0.3 (tax potunun %6’sı claim’de) | protokol ayrı |
| Launch fee | ~$1 ETH | 0.0005 ETH |
| SDK | yok — site kendi | LetsCash SDK kullanma |
| Quote | ETH veya **USDG** (US0 ≠ USO) | katalog, custom boş |

KILI **LetsCash’ten** basıldı. README’deki PAIR market tablosu (USDG 35 / WETH 25 / GLD 20 / SLV 20) bu launch için kullanılmadı. Siteye de koyma — operatör notu.

Ouro / HOOD10 (aynı şablon, kopyalama isim değil):

- %5 tax, 3 kasa: airdrop / POL veya dividend / ops.
- Claimer EOA → 3 EOA. Ops cüzdanı nonce 0 = sadece birikir.
- Split **policy**, kontrata yazılı değil. Kendi airdrop sayfaları 0 cycle gösterebiliyor.
- POL ikinci bacak: tax’in yarısı LP, LP fee’sinin %80’i tekrar holder. Vat sink ile karıştırma.

Alınır: 3 kasa **formda**; claimer ≠ kasa; POL ayrı ürün.  
Alınmaz: letscash/ouro site klonu; “auto airdrop nothing to claim” deyip 0 cycle.

---

## 7. Site

Stack: TanStack Start, React 19, Tailwind v4, Vercel preset **TanStack Start**. Canonical `https://www.kili.lol` (apex → www).

Sayfalar: `/` `/lab` `/pit` `/lore` `/token`

Public sayfada **olmasın**: launch order, DO NOT, PAIR market, custom quote, “developer buy blank”, Grokle yazışma.

24-bit kültür: Press Start 2P + VT323, radius 0, `image-rendering: pixelated`, acid `#a5fa00`, ink `#070807`.

Piksel kedi:

- 24×24 grid, organ damgası (head/body/tail/legs), chimera sol/sağ split.
- Ön yüz kafa (kulak, iç kulak, göz, burun, ağız). Tam vücut küçükte kuşa okunuyor.
- Founders: Phantom, Rot, Scale, Laser, Veil, Beam, Grid. **WREX** founder değil — tutulan yanlış, hero PFP.
- Kaynak: `src/lib/pixel-cats.json`, `src/components/pixel-cat.tsx`, `scripts/pixel-cats.py`.
- Favicon = yüz kırpımı 18×18. LetsCash kare: `/letscash.png` 1024, acid köşe.

X kit `public/x/`:

| Dosya | Boyut |
| --- | --- |
| logo.png | 400×400 |
| banner.png | 1500×500 |
| article-cover.png | 1500×600 (5:2) |
| BIO.md / ARTICLE.md | yapıştır |

Pin iskeleti:

```
The vat is open.

A cat is four organs. Mix two. Fifty-fifty.
Six percent mutant. Coat mismatch: chimera.
Keep the wrong ones.

https://www.…
CA 0x…
```

Article uzun metin CT’de ölür (KILI pin: ~137 view). Kısa CA + tek görsel önce.

---

## 8. Aşamalar (bu sefer ne oldu)

1. Marka: Mutant Cats reddedildi → KILI / KIT / Vat / Pit.
2. Site: hexameow wallet iskeleti + mutant-lab trait → piksel 24-bit.
3. Görsel iterasyon: SVG → 24×24 → oturan kedi (kuş okundu) → ön yüz kafa (Alamy referans).
4. Kontrat: Vat, Nursery, `socials()`.
5. X kit + lore article.
6. Remix: Vat → Nursery → LetsCash $KILI.
7. Public $KILI sayfasından lansman notları silindi.
8. Dağıtım zayıf: gece lansman, 0 bag, 1 article, bot hacmi (~199 alış / 188 satış, MC ≈ liq). Ürün bitmiş, gören yok.

Eksik (sonraki iş): Nursery’yi lab’e bağla, HourSplitter, Boost yakımı, LetsCash claimer’ın 3 kasaya gerçekten gidip gitmediğini RPC ile doğrula, Blockscout verify (Remix).

---

## 9. Sonraki proje checklist

```
[ ] İsim 1 kelime, ticker ≤10, mix birimi ayrı
[ ] IP taraması (OpenSea / eski koleksiyon / oyun)
[ ] Slogan 1 cümle. Bio ≤160. Pin iskeleti hazır
[ ] 3 kasa EOA ayrı: sink / arena / studio. Deployer dördüncü
[ ] Vat (veya sink) önce, nursery ikinci, token son
[ ] socials() her kontrata
[ ] LetsCash: Name/Symbol, kare PNG, tax, 3 wallet, quote ETH veya USDG, dev buy boş
[ ] Custom CA yapıştırma
[ ] Site: 5 sayfa max. Operatör notu yok
[ ] Favicon = logo = LetsCash kare
[ ] X: PFP, banner, kısa pin (article ikinci)
[ ] Lansman saati: CT uyanık. İlk görsel mix/chimera ekranı
[ ] PAT / sır asla chate yapıştırma
```

Remix: Injected 4663. Verify: Solidity single file, `v0.8.24+commit.e11b9ed9`, optimizer 200, cancun, MIT.

---

## 10. Dosya haritası

```
contracts/Vat.sol
contracts/Nursery.sol
src/lib/game.ts              # organ, fee, CA, socials
src/lib/pixel-cats.json
src/components/pixel-cat.tsx
src/store/lab.ts             # local mix
src/routes/{index,lab,pit,lore,token}.tsx
public/x/*                   # logo banner article
public/letscash.png
scripts/pixel-cats.py
scripts/x-kit.py
scripts/square-mark.py
```

Numara sabitleri tek yerde: `src/lib/game.ts`.

# RINK Design — portfoliowebsite

Lees bij een nieuwe sessie eerst dit bestand, daarna `plan.md` (zodra die er is) en `briefing-claude-code.md` (de volledige werkinstructie).

## Wie
- Eigenaar van RINK Design: grafisch ontwerper (brand identity, packaging, digital design, art direction).
- AMFI · Code d'Azur · Wessel de Groot · nu RINK Design.
- Kan niet programmeren, heeft een heel scherp oog voor typografie, grid, compositie en beweging. Haar oordeel over hoe iets eruitziet is leidend.

## Werkwijze (kort)
- EERST PREVIEW: elke wijziging eerst als interactieve Artifact-preview (echte beweging/klikken) laten zien. Pas na haar 'goedgekeurd' commit + push naar live (byrink.com). Niets live zetten zonder akkoord.
- Jij leidt, één stap tegelijk. Simpel Nederlands, korte zinnen, moeilijke woorden meteen uitleggen.
- Vragen als aanklikbare keuzes (max. 4 per ronde, advies bovenaan met "(Aanbevolen)").
- Eerst interview → `plan.md` → pas bouwen na haar "ja".
- Na elke bouwstap: screenshot desktop + mobiel (375px), zelf kritisch kijken, dan poort.
- Na elke goedgekeurde stap: commit + push. Vercel zet het online.
- Wachtwoorden, betalingen, accounts doet zij zelf.
- Niets verzinnen over klanten (geen jaartallen, rollen, resultaten, citaten). Plaatshouder + lijst voor morgen.
- Geen database, CMS, formulier, login of cookies. Geen originelen > 5 MB naar GitHub.

## Omgeving
- Live: https://www.byrink.com (eigen domein, gekoppeld 4 okt; byrink.com → 308 naar www). Oud adres blijft werken: https://portfolio-zeta-eight-09eeu06opz.vercel.app (Vercel-team 'Rink Design Portfolio', Hobby, productie = branch claude/brief-overview-p1z3nr). LET OP: portfolio-eta.vercel.app is NIET van haar.
- Sinds 4 okt werkt ze lokaal op haar Mac: projectmap `~/RINK Design` (kloon, pull/push werkt). Node.js staat er nog NIET op (lokale preview kan pas na installatie; zij koos: later). Repo: github.com/rink-design/portfolio, branch `claude/brief-overview-p1z3nr`.
- Beelden komen niet van haar bureaublad; zij uploadt ze (chat of GitHub).

## Besluiten
- Doelgroep: merken én bureaus. Toon professioneel, het werk spreekt.
- Taal: Engels (Nederlands eventueel later).
- Alle 8 projecten mogen openbaar online.
- Domein: byrink.com (GoDaddy). DNS bij GoDaddy: A @ → 216.198.79.1, CNAME www → caee9734823c6e1f.vercel-dns-017.com. (waarden uit Vercel). Overige records (NS, _dmarc, _domainconnect) ongemoeid. metadataBase in app/layout.tsx = https://www.byrink.com.
- Ontwerpaanpak: mix — Claude ontwerpt met haar, op basis van een open-source template.
- Referenties: collinscole.framer.website, dept.global, itsoffbrand.com, patrickjane.framer.website, lusion.co.
- Sfeer: licht & warm (gebroken wit / warm grijs, zoals Offbrand).
- Typografie: gigantische grotesk over de volle breedte (zoals Collins).
- Werk op home: 5 rijen van 2, alle 10 cases gelijk (4:5), recht naast elkaar. Geen JAJA-groot, geen brede coffeeshop (besluit poort 3).
- Beweging: uitgesproken met type & beeld (geen zware 3D/WebGL vandaag).
- Geen open-source template (alles was developer-stijl); referenties zijn het 'template'. Basis: Next.js + Tailwind + Motion.
- Font: Inter Display (gratis, Google/rsms).
- Kleur: warm neutraal + één vaste accentkleur: Cobalt #2D3BFF (gekozen bij poort 2).
- Beelden: Google Drive-map (link in gesprek 3 okt). Webklaar maken met `node scripts/beelden.mjs "<map Portfolio>"` → public/work/<slug>/ + manifest.json. Originelen nooit in de repo.
- Haar bestandsnamen: `NN_SOORT[_A/B…]_naam`. Soorten: GROOT, DUO, TRIO, SET (beeldwand), LAYOVER → witte productkaarten naast elkaar (3 per rij, haar keuze: géén over-elkaar-schuiven), TELEFOON, TELEFOON_VIDEO, VIDEO (A/B = duo), SCROLL-PDF (pagina's in horizontale scroll-band), STUDIO_BLACK/WHITE (paren), DETAIL-GRID_WHITE/BLACK (raster 3×2), WEBSITE_MOCKUP (laptopframe), los = enkel beeld.
- Covers per case in content/projects.ts (JAJA en coffeeshop = video-cover). Big Push cover = pdf-pagina 12 (gorilla).
- Logo: haar vector `RInk.svg` (sierlijke R + INK) → components/logo-paths.ts; gebruikt in laadscherm en bovenaan home.
- Video's en websites mogen in code-mockups (telefoon/laptop-frame); eigen Photoshop-mockups kan ook.
- Volgorde bouwen: JAJA eerst als proefcase → poort + kort interview over weergave → die regels gelden voor de andere 7 cases.
- Teksten: Claude schrijft concept (Engels), zij keurt. Concept in `teksten-concept.md`.
- Geen jaartallen bij cases.
- Santani: stage bij Code d'Azur, uit opdracht. Haar rol: concept, projectmanagement, graphics (samen met medestudenten). Social media: later zelfstandig, als onderdeel van haar werk (bevestigd).
- Contact: e-mail rinkevanderakt@gmail.com, telefoon +31 6 199 70311 (tonen), LinkedIn https://nl.linkedin.com/in/rinke-van-de-rakt-244045213. Geen Instagram.
- Toon teksten: kort en strak, statements (v2 in `teksten-concept.md`).
- Extra cases: 08 PURPLE (coffeeshop Vlissingen; rebrand, huisstijl, concept- en productontwikkeling; eigen case, los van Purple Rain) en 09 CANAJOY (product development). Coffeeshop packaging wordt 10 (brede afsluiter). Totaal 10 cases.
- Volgorde home: RINK (schrijft zichzelf) → showreel-video direct onder de naam (`public/hero.mp4`, geen apart hero-beeld) → selected work → positioning + marquee → about → contact (positioning onder de cases, haar wens).
- Idee: sierlijke R die zichzelf 'schrijft' (SVG-lijnanimatie) — met de R uit haar logo, zodra het logo binnen is.
- Beweging (landing): RINK schrijft zichzelf (SVG-omtreklijn tekent, daarna vult hij; WriteOn.tsx), hero-beeld groeit naar volle breedte bij scrollen, tekstregels uit masker, marquee met disciplines, beelden vouwen open, cobalt 'View case'-cursor boven werk, onderlijn-hover op links, paginaovergang 0,35 s. Uit bij 'minder beweging'.
- Laadscherm (Loader.tsx): GEEN schrijflijnen (haar keuze); lichte grondvorm (paper-2), RINK vult zich van onder naar boven met teller 000–100 terwijl de site laadt, schuift dan omhoog weg; RINK staat exact op de hero-plek. 1× per bezoek (sessionStorage). Later: haar eigen logo-vector i.p.v. font. Goedgekeurd: 'mag zo houden'.
- Hoeken: alles strak vierkant, geen afgeronde hoeken (alleen telefoon/laptop-frames, want dat zijn apparaten).
- Geen scheidingslijnen (borders) tussen secties — haar wens.
- NIET bijsnijden in cases: alle beelden op natuurlijke verhouding (kaarten: object-contain op wit). Staande hero = gecentreerd op licht vlak.
- JAJA websites: screenshots van jaja.net (B2B) en jajashop.com (B2C) als 10_WEBSITE_A/B in laptopframes.
- Favicon = sierlijke R (app/icon.svg); deelafbeelding = logo op paper (app/opengraph-image.png).
- Tokens sparen: beelden niet één voor één bekijken, per project één contactblad.

## Tune-ronde 3 okt (avond) — VERVANGT eerdere regels waar ze botsen
- Overal GEEN nummers (geen 01/02, geen '04 / 10', geen '(10)', geen tellers).
- Home-grid: covers 1:1 (haar nieuwe beginfoto's per case, komen via Drive).
- Home: geen 'Showreel-video volgt'-plek; achtergrond bovenin. 'Approach'-sectie weg. Marquee: Brand Identity · Packaging · Art Direction · Graphic Design, loopt altijd door (geen pauze).
- About: 'I design brands you can see, hold and use — and that stand out.' MAKE IT COHESIVE. / MAKE IT TANGIBLE. / MAKE IT WORK.
- Background: AMFI Fashion & Branding · Code d'Azur (internship) · Wessel de Groot (internship) · Grafisch Vormgeven (studie) · Freelance / RINK Design. (Géén zorg.)
- Contact: korter; Let's work together + e-mail + telefoon + LinkedIn.
- Cases: één tekstblok (statement + alle onderdelen compact onder elkaar), daarna beeld. Eén consistent grid: zelfde formaat (1:1), beelden VULLEND (cover), links uitgelijnd. (Vervangt 'niet bijsnijden'.) Hero wél geheel in beeld.
- Websites: echte site als scrollbare full-page screenshot in laptopframe. JAJA: eerst B2B (jaja.net), dan B2C (jajashop.com). Big Push: bigpush.nl als hero (gorilla-hero weg). Santani: link volgt van haar.
- JAJA: 4 iPhones naast elkaar (social-screenshot + 3 video's).
- Santani: start met telefoonvideo + social-telefoon naast elkaar → tekst → laptop scrollende site → 2 campagnebeelden. Blikje-hero weg.
- The Cat + Canajoy: hero = twee beelden naast elkaar. Coffeeshop: geen hero, archief, alles even groot, Baron-video ertussen.
- Soiree/Purple Rain/Don Gelato/Purple: hero → tekst → brandbook-pdf (indien) → grid. PDF-pagina's vullend, geen witranden.

- Nieuwe covers (1:1, donkerblauwe studiostijl) in public/covers/<slug>.webp — Soiree en The Cat hebben nog geen nieuwe cover. Case-hero 'cover' = die cover, geheel in beeld.
- Showreel onder RINK: public/hero.mp4 (4:3, 12 s, stil) + hero-poster.webp.
- Websites als scrollbare full-page screenshots: public/sites/{jaja-b2b,jaja-b2c,bigpush,santani}.webp. Santani-site: https://santani.vercel.app/
- Nav 'RINK' vet. Favicon = sierlijke R in zwarte cirkel (app/icon.svg).
- Covers = alléén preview op de home; komen NIET terug op de case-pagina. Case-hero standaard = eerste beeld van de case. JAJA-hero = B2B-website (jaja.net), B2C daaronder.
- Header = showreel als schermvullende achtergrond (h-svh, object-cover, uitsnede object-[50%_85%] zodat product boven logo staat), logo-SVG + labels in WIT ONDERAAN de header (pb-5/md:pb-6), labels als marge eronder. Daarna direct Selected work.
- Laadscherm: de sierlijke R wordt ÉCHT geschreven — pennenstreken (middenlijnen, components/r-strokes.ts, berekend met scripts/r-pennenstreken.py) onthullen de vector als masker, start tegelijk bij de punt boven (zwaai) en de krul onder (hoofdhaal), dan lus, buik, uithaal (~1,6 s). Daarna vult I-N-K van links naar rechts met de laadvoortgang. Logo onderaan, teller bovenaan.
- Menu: wit boven donkere secties (data-tone="dark": header, contact, next project), zwart op licht (components/Nav.tsx).
- Alle video's via components/AutoVideo.tsx (iOS-autoplay: muted/playsinline als attribuut + play() in beeld). Energiebesparingsmodus op iPhone kan autoplay alsnog blokkeren → start bij eerste aanraking.
- Santani: telefoons (hero) → tekst → website → 2 campagnebeelden gecentreerd. The Cat: hero-paar op eigen verhouding (meer ruimte).
- Achtergronden Canajoy, Purple Rain, Purple vervangen door de RINK-studio-achtergrond (rembg + verloop, script: scripts/achtergrond-studio.py; originelen onaangeroerd op Drive).
- Beeldbestanden krijgen een inhoud-hash in de naam (cache-busting). Telefoonvideo's 540 px breed, crf 31.

## Techniek-notities
- Chromium-screenshots: launch met `--ignore-certificate-errors-spki-list=PS48cX347wDVcRynzq+DFqswl2PLNE1sG6uQvxMCOS0=` (vertrouwt alleen de proxy-CA van deze omgeving).

## Ronde 4 okt — VERVANGT eerdere regels waar ze botsen
- Volgorde home: JAJA · Soiree · Purple Rain · Don Gelato · The Cat · Purple · Canajoy · Coffeeshop · Santani · Big Push (Santani + Big Push = onderste rij).
- Productfoto's in de cases: product uitgeknipt, vierkant 2048 px, gecentreerd (langste zijde 70%), warm lichtgrijs vlak #F3F1EC + zachte warme slagschaduw. Script: scripts/product-achtergrond.py (gebruik `--proef <map>` om eerst te testen). Vervangt de studio-verloop-achtergronden. Niet voor modelfoto's, close-ups, campagnebeelden, pdf, websites, video's. Don Gelato 03-detail-white-2 (wit shirt met print) bewust origineel: uitknippen lukt niet wit-op-wit.
- Cijfers onder de cases, vóór de marquee: 38+ Projects · 7+ Years of experience, in t-h1, tellen op bij in beeld komen (components/motion/CountUp.tsx). Haar wens — uitzondering op 'geen tellers'.
- Video's (AutoVideo): starten ook in iPhone-energiebesparingsmodus bij de eerste tik (touchend/click, niet touchstart).
- Gereedschap op haar Mac (zonder wachtwoord, map ~/.rink-tools): Node.js 24 (PATH via ~/.zprofile), Python 3.12 + rembg in ~/.rink-tools/imgenv (`U2NET_HOME=~/.rink-tools/u2net`). Lokale preview: .claude/launch.json → npm run dev.

# Plan — RINK Design website

Stand: 3 oktober 2026. Vinkjes = af.

## 1. Doel
Eén sterke, interactieve landingpage die binnen een paar seconden laat zien wie RINK is: brand, packaging, digital. Daarna trekt de site je verder in, via het werk en de cases, en is de site zelf het bewijs van haar typografie, grid en beweging.

## 2. Techniek (en waarom)
- **Next.js**: snelle pagina's, elke case een eigen adres (`/work/jaja`), en beeld wordt automatisch klein en scherp gemaakt.
- **Tailwind CSS**: het designsysteem (maten, kleuren, witruimte) op één plek, zodat alles consequent blijft.
- **Motion**: de beweging (binnenkomen bij scrollen, hover, paginaovergangen). Staat uit bij "minder beweging".
- **Vercel**: zet elke push vanzelf online. Gratis Hobby voor nu.
- Geen database, CMS, formulier, login of cookies.

## 3. Pagina's
- **Home** (één lijn): Impact (hero) → Positioning → Selected work → About → Contact.
- **Case-pagina's**: `/work/<naam>`, onderaan altijd **Next project →**.
- Navigatie: RINK (home) · Work · About · Contact.

## 4. Designsysteem
- **Sfeer:** licht en warm. Gebroken wit/warm grijs als basis, bijna-zwart voor tekst.
- **Font:** Inter Display (gratis). Gigantisch, strak gespatieerd voor RINK en de titels. Kleine kapitalen voor labels, zoals BRAND / PACKAGING / DIGITAL.
- **Kleur:** accent Cobalt #2D3BFF (gekozen).
- **Grid:** 12 kolommen op desktop, 4 op mobiel. Vaste buitenmarge en kolomafstand.
- **Typeschaal:** Display (RINK, over de volle breedte) · H1 (casetitel) · H2 (sectielabel) · Body · Label/klein.
- **Logo:** haar eigen RINK-logo (uit de beeldenmap).

## 5. Bouwblokken voor de cases
Elke case kiest zijn eigen blokken, in zijn eigen volgorde.

| Blok | Gebruik |
|---|---|
| Hero | Groot openingsbeeld + titel + disciplines |
| Tekstblok | Sectielabel (bijv. IDENTITY) + één regel |
| Groot beeld | Volle breedte (`-groot`) |
| Twee naast elkaar | (`-duo` + `-duo`) |
| Beeldgrid | 3 of 4 detailbeelden |
| Video | MP4-loop, zonder geluid |
| Telefoon-mockup | Video/website in telefoonframe (`-telefoon`) |
| Laptop-mockup | Video/website in laptopframe (`-laptop`) |
| Concept 1 vs 2 | The Cat: twee kolommen naast elkaar |
| Visual wall | Coffeeshop packaging: dichte beeldwand |
| Slotbeeld | Groot afsluitend beeld |
| Next project | Link naar de volgende case |

## 6. Content los van ontwerp
- Elke case is één eigen bestand in `content/cases/` met de titel, disciplines, teksten en beeldvolgorde.
- Bron van de tekst: `teksten-concept.md` (v2).
- Beelden: de bestandsnaam bepaalt de volgorde en de weergave (`01.jpg`, `04-groot.jpg`, `05-duo.jpg`, `07-telefoon.mp4`). Zo kan zij later zelf de volgorde aanpassen.

## 7. Werk en contentstatus

| # | Project | Disciplines | Beelden | Status |
|---|---|---|---|---|
| 01 | JAJA | Brand / Packaging / Digital | ? | wacht op link |
| 02 | SOIREE | Identity / Packaging | ? | wacht op link |
| 03 | PURPLE RAIN | Identity / Packaging | ? | wacht op link |
| 04 | DON GELATO | Art Direction / Identity / Packaging / Photography | ? | wacht op link |
| 05 | BIG PUSH | Identity / Digital | ? | wacht op link |
| 06 | SANTANI | Concept / Creative Direction / Social | ? | wacht op link |
| 07 | THE CAT | Concept / Packaging | ? | wacht op link |
| 08 | PURPLE | Rebrand / Identity / Product Development | ? | wacht op link |
| 09 | CANAJOY | Product Development | ? | wacht op link |
| 10 | SELECTED COFFEESHOP PACKAGING | Packaging / Print / Production | ? | wacht op link |

Werkoverzicht op home: **5 rijen van 2**, alle cases gelijk (staand 4:5), recht naast elkaar (besluit poort 3).

Teksten nog open: het concept van Purple Rain, en de teksten van Purple en Canajoy (concept volgt bij het bouwen).

## 8. Bouwstappen met poorten

- [x] **Beelden binnenhalen** (15 min): downloaden, tellen, tabel invullen, webklaar maken (max. 2400 px, < 800 KB; video < 10 MB). Originelen nooit naar GitHub.
- [x] **1. Basis + eerste echte uitrol** (15 min): het project staat op, vervangt de testpagina en staat online.
- [x] **2. Designsysteem** (25 min): een stijlpagina met fonts, grid, kleuren en 3 accentvoorstellen. **Poort:** klopt de basis? Welk accent?
- [x] **3. Landing + selected work** (30 min): de hero met het sterkste werk, RINK + BRAND / PACKAGING / DIGITAL, en het werkgrid. **Poort.**
- [ ] **4. Case-sjabloon + JAJA volledig** (30 min). **Poort + kort interview over de weergave** (mockups, video, ritme). Die regels gelden daarna voor de rest. *Het belangrijkste moment van de dag.*
- [ ] **5. De andere 9 cases** (40 min): elk met het beeld dat klaarstaat. Don Gelato als editorial, The Cat met concept 1 naast concept 2, coffeeshop als visual wall. Ontbreekt beeld? Dan een nette korte versie. **Poort.**
- [ ] **6. About + contact** (15 min).
- [ ] **7. Beweging + overgangen** (20 min): beeld komt binnen bij scrollen, hover op het werk, rustige paginaovergangen (< 0,4 s), "minder beweging" gerespecteerd. **Poort.**
- [ ] **8. Mobiel + snelheid** (15 min): alles gecheckt op 375 px, lazy loading (beeld laadt pas als het in beeld komt), alt-teksten, Lighthouse ≥ 90.
- [ ] **Live** (30 min): titel, beschrijving, deelafbeelding, favicon, test op haar telefoon, domein koppelen (GoDaddy).
- [ ] **Afronden** (15 min): `CLAUDE.md` en `plan.md` bijwerken, lijst voor morgen.

Na elke goedgekeurde stap: commit + push → Vercel zet het online.

## 9. Vandaag en morgen

**Vandaag moet online:** home (hero, werkgrid, about, contact), JAJA volledig, de andere cases minstens in een nette korte versie, mobiel goed, en een eigen domein als dat lukt.

**Mag morgen:**
- Cases verder aanvullen waar beeld of tekst ontbreekt.
- Teksten verfijnen.
- Extra beweging of een licht 3D-effect.
- Een Nederlandse versie.

## 10. Blinde vlekken / risico's
- **Beelden zijn de bottleneck.** Zonder link kan ik niet verder dan het designsysteem. Ik bouw JAJA zodra die map binnen is, de rest kan later binnendruppelen.
- **Grote video's:** ik maak ze kleiner (korte loop, geen geluid). Duurt het te lang? Dan vandaag een stilstaand beeld, de video morgen.
- **Domein bij GoDaddy:** het doorwijzen (DNS) kan tot een paar uur duren. Vandaag staat de site in elk geval op de `.vercel.app`-link.
- **Vercel-branch:** de site staat online vanaf `claude/brief-overview-p1z3nr` (de enige branch, dus de standaard). Werkt prima. Later kan dit `main` worden.
- **Vercel Hobby** is bedoeld voor niet-commercieel gebruik. Later is Pro de nette keuze voor een bedrijfssite.
- **Lang gesprek:** na stap 4 eventueel een verse sessie starten met "Lees CLAUDE.md en plan.md en ga verder."
- **Rechten:** alle werk mag openbaar (bevestigd). Bij Santani staat haar rol expliciet.
- **Telefoonnummer op de site:** dat is haar keuze. Er is een kleine kans op spam.

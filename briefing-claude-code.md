# Werkinstructie voor Claude Code: de website van RINK Design

Opgesteld op 3 oktober 2026. Geef dit bestand aan Claude Code in de map rink-website.

Claude, dit is je werkinstructie voor vandaag. Lees alles voordat je begint. Je helpt de eigenaar van RINK Design om vandaag haar portfoliowebsite online te zetten. Het doel staat in de bijlage onderaan: haar eigen verhaal en contentopzet.

## Wie je helpt

- Ze is grafisch ontwerper: brand identity, packaging, digital design en art direction. Opleiding AMFI, gewerkt bij Code d'Azur en Westvliet de Groot, nu freelance onder de naam RINK.
- Ze gebruikt Claude Code vandaag voor het eerst. Ze kan niet programmeren. Ze heeft wel een heel scherp oog voor typografie, grid, compositie en beweging. Neem haar oordeel over hoe iets eruitziet altijd serieus.
- Ze werkt op een Mac met een Pro-abonnement.
- Tijd: 4 tot 6 uur. Aan het eind van de dag staat de site online. Morgen schaaft ze bij.
- De site zelf is óók portfolio. Gewoon netjes is niet genoeg. Hij moet laten zien wat zij kan.

## Hoe je werkt

1. **Jij leidt, één stap tegelijk.** Begin elke stap met wat je gaat doen en waarom, in twee of drie zinnen. Sluit af met wat er af is en wat de volgende stap is.
2. **Vragen stel je als aanklikbare keuzes.** Gebruik je vraagtool (AskUserQuestion). Twee tot vier opties per vraag, met korte uitleg per optie. Zet je advies bovenaan met "(Aanbevolen)". Hooguit vier vragen per ronde. Nooit een lange lijst vragen in gewone tekst.
3. **Eerst interview, dan plan, dan bouwen.** Je bouwt niets aan de site voordat zij "ja" heeft gezegd op `plan.md`. In het plan staan poorten: momenten waarop je stopt en haar laat kijken.
4. **Laat zien, vertel niet alleen.** Na elke bouwstap open je de site in de browser. Maak een schermafbeelding op desktopbreedte én op mobielbreedte (375 pixels). Kijk eerst zelf kritisch voordat je het haar laat zien.
5. **Controleer jezelf voor elke poort.** Stel jezelf drie vragen. Klopt het met het plan? Zou een topstudio dit zo opleveren? Werkt het op mobiel? Herstel eerst wat niet goed is. Laat haar daarna kijken.
6. **Leg vast wat je leert.** Maak in de projectmap een `CLAUDE.md` aan. Daarin staat wie ze is, haar stijlregels, haar besluiten en deze werkwijze. Werk het bij na elk besluit. `plan.md` houdt de stand bij met vinkjes.
7. **Bewaar in kleine stappen.** Na elke goedgekeurde stap maak je een commit en push je naar GitHub. Vercel zet het dan vanzelf online. Leg haar de eerste keer uit wat dat is: een commit is een bewaarpunt, push stuurt het naar GitHub, Vercel zet het online.
8. **Wachtwoorden, betalingen en accounts doet zij zelf.** Jij opent de pagina en zegt precies waar ze moet klikken. Laat haar nooit een wachtwoord, sleutel of code in de chat plakken. Gebruik inlogcommando's die de browser openen.
9. **Blokkade? Eén handeling.** Lukt iets niet zonder haar, geef haar dan één complete handeling. Geen drie rondes heen en weer.
10. **Houd het simpel.** Geen database, geen CMS, geen contactformulier, geen inlogsysteem, geen cookies. Gewoon een snelle site met pagina's en beeld.
11. **Bewaak de tijd.** Zeg bij elke fase hoeveel tijd ervoor staat. Loopt het uit? Stel dan voor wat naar morgen kan. De site moet vandaag online, ook als nog niet elke case vol staat.
12. **Simpel Nederlands.** Korte zinnen. Een moeilijk woord leg je meteen uit tussen haakjes. Bijvoorbeeld: "deploy (de site online zetten)".
13. **Verzin niks over klanten.** Geen jaartallen, rollen, resultaten of citaten die zij niet heeft gegeven. Ontbreekt er iets? Zet een duidelijke plaatshouder neer en zet het op de lijst voor morgen.
14. **Verse start bij een lang gesprek.** Wordt het gesprek lang (meestal na fase 4), zorg dan dat `plan.md` en `CLAUDE.md` bij zijn. Stel voor een nieuwe sessie te starten met: "Lees CLAUDE.md en plan.md en ga verder."

## Fase 1: gereedschap klaarzetten (30 minuten)

Doel: alles staat klaar, en een testpagina staat al online. Dan weet je zeker dat de keten werkt voordat het echte werk begint.

1. Kijk wat er al op haar Mac staat: `git --version`, `node --version`. Ontbreekt git, start dan `xcode-select --install` en laat haar op "Installeer" klikken.
2. Installeer Node.js (LTS-versie). Kies een manier zonder beheerderswachtwoord als dat kan, bijvoorbeeld via nvm of fnm. Vraagt iets toch om haar Mac-wachtwoord? Laat haar dat zelf in de Terminal typen.
3. **GitHub** (waar de code bewaard wordt): laat haar zelf een gratis account maken op github.com. Installeer de GitHub CLI en log in met `gh auth login`. Dat opent de browser.
4. **Vercel** (dat zet de site online): laat haar een gratis Hobby-account maken op vercel.com met "Continue with GitHub". Log in met `npx vercel login`.
5. Zet een simpele testpagina ("RINK — binnenkort") online via GitHub en Vercel. Geef haar de link. Laat het haar openen op haar telefoon.
6. Kijk of de skill `frontend-design` beschikbaar is. Zo ja, gebruik hem bij al het ontwerpwerk. Zo nee, zoek niet lang en ga door.

## Fase 2: interview (45 minuten)

Doel: je weet wie RINK is, hoe de site eruit moet zien, en wat er aan beeld en tekst is. Werk in rondes van hooguit vier keuzevragen.

**Ronde A, RINK zelf**
- Wie moet ze vooral overtuigen: merken, bureaus of beide?
- In welke taal komt de site? Haar labels zijn Engels. Advies: vandaag één taal. Een tweede taal kan later.
- Mag al het werk openbaar? Vraag het per project waar je twijfelt.
- Heeft ze al een domeinnaam, zoals rinkdesign.nl? Zo ja, waar gekocht?

**Ronde B, hoe het ontwerp tot stand komt.** Dit is haar keuze. Leg de opties eerlijk uit, met wat elke optie vandaag kost:
- **Claude ontwerpt met haar.** Op basis van haar referenties en stijlregels. Zij stuurt live bij in de browser.
- **Een open-source template als basis.** Jij zoekt drie tot vijf portfoliotemplates op GitHub. Eisen: vrije licentie (MIT of vergelijkbaar), recent bijgewerkt, met een live demo. Je laat de demo's zien, zij kiest, en daarna maak je hem helemaal RINK.
- **Zij ontwerpt in Figma** (of heeft al een ontwerp) en jij bouwt het na. Dat kost vandaag meer tijd.
- **Een mix.**

Vraag in elk geval naar haar drie tot vijf voorbeeldsites. Open ze in de browser. Benoem per site wat opvalt: typografie, grid, beweging, hoe het werk wordt getoond. Vraag wat ze daarvan wil en wat juist niet.

**Ronde C, stijl**
- Lettertypen: heeft ze vaste fonts? Mag ze die op het web gebruiken (een webfontlicentie)? Anders stel je passende fonts van Google Fonts of Fontshare voor.
- Kleur: zwart-wit met één accent, of mag elke case zijn eigen kleur meenemen?
- Beweging: rustig en strak, of uitgesproken? Laat voorbeelden zien.

**Ronde D, beeld.** Kijk in haar map `RINK beelden` (meestal op het bureaublad). Vraagt de Mac om toegang tot het Bureaublad, zeg haar dat ze op OK klikt. Tel per project wat er is. Maak een tabel in `plan.md`: project, aantal beelden, status (klaar / deels / niets). Vertel haar wat je met de beelden doet:
- Je maakt ze zelf webklaar met een script: JPG of WebP, langste zijde 2400 pixels, liefst onder 800 KB. De originelen blijven onaangeroerd.
- Video: MP4, korte loop zonder geluid, onder 10 MB.
- Grote originelen gaan nooit naar GitHub.

**Ronde E, tekst.** Per case is een paar zinnen genoeg. Laat haar ruwe tekst typen of plakken. Jij maakt het strak en kort. Zij keurt. Bij Santani staat duidelijk wat haar eigen rol was en wat samen met anderen is gemaakt.

## Fase 3: plan met poorten (20 minuten)

Schrijf `plan.md` in de projectmap. Kort en helder. Daarin staat:

1. **Doel** in twee zinnen.
2. **Techniek** met waarom. Advies: Next.js met Tailwind CSS en Motion (voor beweging), online via Vercel. Bepaalt het gekozen template iets anders? Volg dan het template.
3. **Pagina's.** De homepagina loopt in één lijn: impact, positionering, selected work, about, contact. Elke case heeft een eigen pagina, bijvoorbeeld `/work/jaja`. Onderaan elke case staat "Next project".
4. **Designsysteem.** Fonts, grid, witruimte, kleuren, en hoe koppen en tekst eruitzien.
5. **Bouwblokken voor de cases.** Hero, tekstblok, grote visual, beeldgrid, twee naast elkaar, video, concept 1 naast concept 2 (voor The Cat), visual wall (voor coffeeshop packaging), slotbeeld, next project. Elke case kiest zijn eigen blokken in zijn eigen volgorde. Zo heeft elke case zijn eigen ritme binnen één systeem.
6. **Content los van ontwerp.** Elke case wordt één eigen bestand met tekst en beeldvolgorde. Zo kan zij later zelf tekst of volgorde aanpassen zonder aan het ontwerp te komen.
7. **Contentstatus per case** (de tabel uit ronde D).
8. **Bouwstappen met poorten** (fase 4 hieronder), met vinkjes.
9. **Vandaag en morgen.** Wat moet vandaag online? Wat mag morgen?

Doe een blinde-vlekkenronde voordat je het laat zien. Wat ben je vergeten? Wat kan vandaag misgaan? Geef haar daarna een keuzevraag: "Akkoord, bouwen" (Aanbevolen) of "Aanpassen".

## Fase 4: bouwen (2,5 uur)

Elke stap eindigt met een poort. Je laat zien, zij keurt, jij maakt een commit en pusht.

1. **Basis en eerste echte uitrol** (15 minuten). Het project staat op, vervangt de testpagina en staat online.
2. **Designsysteem** (25 minuten). Fonts, grid, kleuren, kop- en tekststijlen. Laat een stijlpagina zien. **Poort:** klopt de basis?
3. **Landing en selected work** (30 minuten). Grote hero met het sterkste werk. RINK met BRAND / PACKAGING / DIGITAL. Daaronder het werkoverzicht volgens haar wireframe: JAJA groot, daarna paren, coffeeshop packaging breed. **Poort.**
4. **Case-sjabloon plus JAJA volledig** (30 minuten). JAJA is de hero case. Die laat het hele systeem zien. **Poort:** dit is het belangrijkste moment van de dag.
5. **De andere zeven cases** (30 minuten). Elk met wat er aan beeld klaarstaat. Don Gelato voelt als een editorial. The Cat zet twee concepten naast elkaar. Coffeeshop packaging is een grote beeldwand met weinig tekst. Ontbreekt beeld? Dan een nette, korte versie. **Poort.**
6. **About en contact** (15 minuten). About is kort: hoe ze ontwerpt, waar ze goed in is, MAKE IT DISTINCTIVE / MAKE IT TANGIBLE / MAKE IT WORK, en haar achtergrond. Contact is clean: LET'S WORK TOGETHER, de vier diensten, e-mail, Instagram en LinkedIn.
7. **Beweging en overgangen** (20 minuten). Beeld komt binnen bij het scrollen. Reactie bij hover op werk. Rustige overgangen tussen pagina's. Snel: meestal onder 0,4 seconde. Zet iemand "minder beweging" aan op zijn apparaat, dan staat het uit. **Poort.**
8. **Mobiel en snelheid** (15 minuten). Check elke pagina op 375 pixels breed. Beeld laadt pas als het in beeld komt. Elk beeld heeft een alt-tekst (een korte beschrijving voor zoekmachines en blinden). Draai Lighthouse (een snelheidstest in de browser). Doel: 90 of hoger op snelheid.

## Fase 5: live (30 minuten)

1. Zet de laatste versie online op Vercel. Geef haar de link.
2. Paginatitel, korte beschrijving, deelafbeelding (wat je ziet als iemand de link deelt in WhatsApp of LinkedIn) en favicon (het icoontje in het browsertabblad).
3. Laat haar de site openen op haar eigen telefoon en één keer door alles klikken.
4. **Eigen domein** (alleen als ze er een heeft). Voeg het toe in Vercel. Zeg haar precies welke DNS-instellingen (de wegwijzer van haar domein naar Vercel) ze bij haar domeinpartij moet invullen. Inloggen daar doet zij zelf. Zeg erbij dat het tot een paar uur kan duren voordat het werkt.
5. Zeg het eerlijk: het gratis Hobby-account van Vercel is bedoeld voor niet-commercieel gebruik. Voor een bedrijfssite is later het Pro-account de nette keuze. Vandaag starten op Hobby is prima.

## Fase 6: afronden (15 minuten)

1. Werk `CLAUDE.md` en `plan.md` bij: wat af is, wat open staat, en een lijst voor morgen om bij te schaven.
2. Laatste commit en push.
3. Geef haar een kort overzicht: de link van de live site, de link naar GitHub, en hoe ze morgen verdergaat.
4. Leg in drie zinnen uit wat ze vandaag heeft geleerd: commit, push en uitrol.

## Wat je niet doet

- Bouwen voordat zij "ja" heeft gezegd op het plan.
- Feiten verzinnen over klanten of projecten.
- Wachtwoorden, sleutels of betaalgegevens typen of laten plakken.
- Een database, CMS, formulier, inlogsysteem of tracking met cookies toevoegen.
- Grote originele beeldbestanden (meer dan 5 MB) naar GitHub sturen.
- Meer dan vier vragen tegelijk stellen, of vragen stellen in een lange tekstlijst.

# Bijlage: het verhaal en de contentopzet van RINK

Dit is haar eigen tekst. De woorden zijn niet veranderd, alleen de opmaak. Dit is de bron voor de inhoud en de opbouw van de site.

## Het verhaal

Ik wil een werkende website voor RINK Design bouwen die in de basis functioneert als één sterke, interactieve landingpage en digitale showcase van mij als designer.

De website moet niet aanvoelen als een traditioneel portfolio waarin je alleen door projecten bladert. De landingpage moet echt iets opbouwen: vanaf het eerste moment mijn stijl en niveau neerzetten, vervolgens duidelijk maken wat ik doe en waar mijn kracht ligt, mijn beste werk laten zien en uiteindelijk bewijzen wat ik kan door middel van sterke case studies.

De website zelf is dus óók onderdeel van mijn portfolio. Typografie, grid, compositie, interactie, motion, overgangen en de manier waarop projecten worden gepresenteerd moeten mijn grafische en digitale skills laten zien.

Potentiële klanten, bedrijven en bureaus moeten binnen een paar seconden begrijpen wie RINK is en wat ik doe, maar vervolgens steeds verder de website in getrokken worden.

De basisopbouw moet daarom zijn:

IMPACT → POSITIONING → SELECTED WORK → CASE STUDIES → ABOUT / APPROACH → CONTACT

## Website flow

01 — LANDING → 02 — SELECTED WORK (8 projects) → 03 — INDIVIDUAL CASES → 04 — ABOUT → 05 — CONTACT

## 01 — Landing

Direct beginnen met sterk werk.

RINK
BRAND PACKAGING DIGITAL

Grote hero-mockup / productcompositie. Geen lange introductie. Het werk moet meteen duidelijk maken wat RINK doet.

## 02 — Selected work

Overzicht van alle 8 projecten. Alle projecten zijn aanklikbaar naar een individuele case.

| # | Project | Disciplines |
| --- | --- | --- |
| 01 | JAJA | Brand / Packaging / Digital |
| 02 | SOIREE | Identity / Packaging |
| 03 | PURPLE RAIN | Identity / Packaging |
| 04 | DON GELATO | Art Direction / Identity / Packaging / Photography |
| 05 | BIG PUSH | Identity / Digital |
| 06 | SANTANI | Concept / Creative Direction / Social |
| 07 | THE CAT | Concept / Packaging |
| 08 | SELECTED COFFEESHOP PACKAGING | Packaging / Print / Production |

## 03 — Individual cases

**01 — JAJA.** Uitgebreidste hero case. Content depth ★★★★★.
- IDENTITY — De visuele identiteit en ontwikkeling van het merk.
- PRODUCTS — De verschillende productlijnen en hoe de identiteit over alle producten wordt doorgevoerd.
- PRODUCTION — Materialen, drukwerk, afwerkingen, technische details en productie.
- CAMPAIGNS — Campagnes, activaties en commerciële uitingen.
- DIGITAL DESIGN — Digitale merkuitingen en assets.
- SOCIAL — Social content, formats en visuele communicatie.
- WEBSITES — B2B & B2C — De digitale merkwereld en beide commerciële websites.

Dit wordt de case die het duidelijkst laat zien hoe breed ik binnen één merk kan werken.

**02 — SOIREE.** Complete branding & packaging case. Content depth ★★★★★.
- CONCEPT — Het oorspronkelijke idee en de richting van de rebrand.
- IDENTITY — Logo, typografie, kleuren en visuele identiteit.
- GRAPHIC — Grafische taal, elementen, patronen en visuele systemen.
- PACKAGING — Doorvertaling van de identiteit naar de verpakkingen.
- APPLICATION — Toepassing van het merk op verschillende fysieke en/of digitale touchpoints.

**03 — PURPLE RAIN.** Branding & packaging case. Content depth ★★★★☆.
- CONCEPT → IDENTITY → GRAPHIC → PACKAGING → APPLICATION

Zelfde logische disciplines als Soiree, maar visueel moet de case volledig zijn eigen wereld krijgen.

**04 — DON GELATO.** Art direction / brand / photography. Content depth ★★★★☆.
- ART DIRECTION — De algemene visuele wereld en creatieve richting.
- GRAPHIC IDENTITY — Typografie, kleur, grafische elementen en merktaal.
- PACKAGING — Verpakkingsontwerp en productpresentatie.
- APPLICATION — Doorvertaling naar verschillende toepassingen.
- CAMPAIGN PHOTOGRAPHY — Fotografie, campagnebeelden, styling en visuele content.

Deze case mag veel meer als een visueel verhaal/editorial aanvoelen.

**05 — BIG PUSH.** Digital case. Content depth ★★★★☆.
- CONCEPT — Nieuwe positionering en visuele richting.
- IDENTITY — De identiteit en grafische basis.
- WEBSITE & ASSETS — Webdesign, desktop/mobile en bijbehorende digitale assets.

Kortere case, maar belangrijk om mijn digitale designkant duidelijk te laten zien.

**06 — SANTANI.** Creative launch case. Content depth ★★★☆☆.
- CONCEPT — Het idee en de creatieve basis.
- LAUNCH — Hoe het concept werd geïntroduceerd.
- CREATIVE DIRECTION — Visuele richting en creatieve keuzes.
- SOCIAL CONTENT — Content en uitingen rondom de lancering.

Hier duidelijk aangeven wat mijn eigen rol was en wat gezamenlijk met anderen is ontwikkeld.

**07 — THE CAT.** Ladies Bag. Content depth ★★★☆☆. Deze case draait specifiek om de ontwikkeling van de Ladies Bag.
- CONCEPT 01 — Eerste creatieve richting. Concept → Graphics → Packaging → Final visual
- CONCEPT 02 — Tweede creatieve richting. Concept → Graphics → Packaging → Final visual
- Eventueel afsluiten met beide concepten naast elkaar.

Dit wordt juist interessant omdat je hiermee laat zien dat één briefing tot twee compleet verschillende creatieve oplossingen kan leiden.

**08 — SELECTED COFFEESHOP PACKAGING.** Visual packaging archive. Content depth ★★★☆☆, visual depth ★★★★★.

Geen traditionele case study. Een selectie van mijn beste packagingwerk voor verschillende coffeeshopmerken. Veel visuals, weinig tekst. Bijvoorbeeld De Baron, Shiva, Highlife, Smokey en andere sterke packagingprojecten. Mix van packaging, rolling papers, boxes, bags, product ranges, displays, print details, finishes en close-ups. Het mag bijna als een grote visual wall / packaging gallery functioneren.

## 04 — About

Kort en professioneel. Niet uitgebreid vertellen wie ik persoonlijk ben, maar vooral: hoe ik ontwerp, waar ik goed in ben, hoe ik naar merken kijk.

Eventueel:
MAKE IT DISTINCTIVE.
MAKE IT TANGIBLE.
MAKE IT WORK.

Daaronder kort mijn achtergrond: AMFI · Code d'Azur · Westvliet de Groot · Freelance / RINK

## 05 — Contact

Heel clean.

LET'S WORK TOGETHER.
Brand Identity · Packaging · Digital Design · Art Direction
Email / Instagram / LinkedIn

## Kort wireframe

```
LANDING
[GROTE HERO MOCKUP]
RINK
BRAND / PACKAGING / DIGITAL
↓
SELECTED WORK
[01 JAJA — LARGE]
[02 SOIREE] [03 PURPLE RAIN]
[04 DON GELATO] [05 BIG PUSH]
[06 SANTANI] [07 THE CAT]
[08 SELECTED COFFEESHOP PACKAGING — WIDE]
↓
Klik → INDIVIDUAL CASE
[HERO]
PROJECT NAME
Disciplines / Year
↓
[CONTENT SECTION 01]
↓
[GROTE VISUAL]
↓
[CONTENT SECTION 02]
↓
[GRID / DETAILS]
↓
[CONTENT SECTION 03]
↓
[FINAL HERO]
↓
NEXT PROJECT →

Na alle projecten:
ABOUT
↓
CONTACT
```

De cases hoeven bewust niet exact dezelfde structuur of lengte te hebben. RINK heeft één sterk grafisch websitesysteem, maar ieder project krijgt binnen dat systeem genoeg vrijheid om zijn eigen identiteit te laten spreken.

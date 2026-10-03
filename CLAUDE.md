# RINK Design — portfoliowebsite

Lees bij een nieuwe sessie eerst dit bestand, daarna `plan.md` (zodra die er is) en `briefing-claude-code.md` (de volledige werkinstructie).

## Wie
- Eigenaar van RINK Design: grafisch ontwerper (brand identity, packaging, digital design, art direction).
- AMFI · Code d'Azur · Westvliet de Groot · nu freelance als RINK.
- Kan niet programmeren, heeft een heel scherp oog voor typografie, grid, compositie en beweging. Haar oordeel over hoe iets eruitziet is leidend.

## Werkwijze (kort)
- Jij leidt, één stap tegelijk. Simpel Nederlands, korte zinnen, moeilijke woorden meteen uitleggen.
- Vragen als aanklikbare keuzes (max. 4 per ronde, advies bovenaan met "(Aanbevolen)").
- Eerst interview → `plan.md` → pas bouwen na haar "ja".
- Na elke bouwstap: screenshot desktop + mobiel (375px), zelf kritisch kijken, dan poort.
- Na elke goedgekeurde stap: commit + push. Vercel zet het online.
- Wachtwoorden, betalingen, accounts doet zij zelf.
- Niets verzinnen over klanten (geen jaartallen, rollen, resultaten, citaten). Plaatshouder + lijst voor morgen.
- Geen database, CMS, formulier, login of cookies. Geen originelen > 5 MB naar GitHub.

## Omgeving
- Claude Code draait in de cloud (niet op haar Mac). Repo: github.com/rink-design/portfolio, branch `claude/brief-overview-p1z3nr`.
- Beelden komen niet van haar bureaublad; zij uploadt ze (chat of GitHub).

## Besluiten
- Doelgroep: merken én bureaus. Toon professioneel, het werk spreekt.
- Taal: Engels (Nederlands eventueel later).
- Alle 8 projecten mogen openbaar online.
- Domein: koopt ze zelf bij GoDaddy; koppelen in fase 5.
- Ontwerpaanpak: mix — Claude ontwerpt met haar, op basis van een open-source template.
- Referenties: collinscole.framer.website, dept.global, itsoffbrand.com, patrickjane.framer.website, lusion.co.
- Sfeer: licht & warm (gebroken wit / warm grijs, zoals Offbrand).
- Typografie: gigantische grotesk over de volle breedte (zoals Collins).
- Werk op home: strak grid, groot beeld, volgens haar wireframe.
- Beweging: uitgesproken met type & beeld (geen zware 3D/WebGL vandaag).
- Geen open-source template (alles was developer-stijl); referenties zijn het 'template'. Basis: Next.js + Tailwind + Motion.
- Font: Inter Display (gratis, Google/rsms).
- Kleur: warm neutraal + één vaste RINK-accentkleur (kleur nog te kiezen).
- Logo: ze uploadt haar eigen RINK-logo.
- Beelden: via één Dropbox/Drive-link, per project een map (01-jaja … 08-coffeeshop-packaging).
- Bestandsnamen = volgorde + optioneel weergave-woord: `01.jpg`, `04-groot.jpg`, `05-duo.jpg`, `07-telefoon.mp4`, `08-laptop.mp4`. Alleen een nummer = Claude kiest.
- Video's en websites mogen in code-mockups (telefoon/laptop-frame); eigen Photoshop-mockups kan ook.
- Volgorde bouwen: JAJA eerst als proefcase → poort + kort interview over weergave → die regels gelden voor de andere 7 cases.
- Teksten: Claude schrijft concept (Engels), zij keurt. Concept in `teksten-concept.md`.
- Geen jaartallen bij cases.
- Santani: stage bij Code d'Azur, uit opdracht. Haar rol: concept, projectmanagement, graphics (samen met medestudenten). Social media: later alleen, als werk, een tijdje (formulering te bevestigen).
- Contact: e-mail rinkevanderakt@gmail.com. Instagram 'Design by Rinke', LinkedIn 'Rinke van de Rakt' (exacte links nog nodig).
- Tokens sparen: beelden niet één voor één bekijken, per project één contactblad.

## Techniek-notities
- Chromium-screenshots: launch met `--ignore-certificate-errors-spki-list=PS48cX347wDVcRynzq+DFqswl2PLNE1sG6uQvxMCOS0=` (vertrouwt alleen de proxy-CA van deze omgeving).

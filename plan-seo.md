# Plan: vindbaar als freelance designer (SEO)

Status: interview klaar 5 okt. Nog niet gebouwd. Wacht op haar "ja".

## Doel
Gevonden worden door studio's, merkeigenaren/mkb en grote bedrijven die een freelance designer zoeken voor een tijdelijk project. Regio: Amsterdam + Randstad + remote.

## Besluiten (uit het interview)
- Positionering: **Freelance Brand & Packaging Designer**. Brand en Art Direction vooraan; alle diensten blijven staan.
- Korte regel onder de header (EN): "Freelance brand & packaging designer in Amsterdam. Available for projects and temporary team support." (NL-versie volgt in stap 3.)
- Naam: **Rinke van de Rakt** én **RINK Design** (About, footer, verborgen data, Google-beschrijving).
- Talen: Engels (/) en Nederlands (/nl), met kleine NL/EN-knop. Geen automatische doorstuur op browsertaal.
- Zichtbare tekst: één korte regel + onderaan een kleine alinea.
- Meten: Vercel Web Analytics (cookievrij, geen banner) + Google Search Console (zij maakt het account).
- Extra: e-mailknop met voorgevuld onderwerp ("Freelance project").
- LinkedIn-teksten klaarzetten (kop, over-mij, profielzin); zij plakt ze zelf.
- "Activaties": Big Push, JAJA, The Cat. WACHT op haar feiten per case. Tot dan niets over activaties op de site.
- Niet nu: Google Bedrijfsprofiel, Behance, Dribbble, PDF, aparte 404, aparte 'Hire me'-pagina.

## Stappen (elke stap apart live)

### Stap 1: onzichtbaar fundament (geen visuele wijziging)
- `app/sitemap.ts` en `app/robots.ts` (stijl-pagina blijft uitgesloten).
- Canonical-adres per pagina (https://www.byrink.com/...).
- Structured data (JSON-LD): `Person` + `ProfessionalService` (naam, e-mail, telefoon, LinkedIn, Amsterdam, werkgebied Randstad, diensten, "freelance") en `CreativeWork` per case. Geen straatadres.
- Betere titels en beschrijvingen per pagina, met woorden als freelance, Amsterdam, packaging, brand identity, art direction.
- Alt-teksten nalopen (nu "titel — discipline, image N").
- Open Graph en Twitter-kaart afmaken (ook per case).
- Vercel Web Analytics aanzetten.
- Search Console: verificatie-tag klaarzetten. Zij maakt het account en voegt byrink.com toe.
- Snelle meting van snelheid (Lighthouse), alleen rapporteren; beeld/video alleen aanpassen met akkoord.

### Stap 2: zichtbare tekst (eerst preview als Artifact)
- Korte regel onder de header (bij de labels).
- Kleine alinea onderaan (About of footer), Engels. Concept in `teksten-concept.md`, zij keurt.
- E-mailknop met voorgevuld onderwerp.
- H1-structuur nalopen (nu staat de naam vooral als beeld/SVG).

### Stap 3: Nederlands
- Route `/nl` voor home en alle 10 cases; `hreflang`-links tussen EN en NL; sitemap in beide talen.
- Claude schrijft NL-concept van alle teksten; zij keurt.
- NL/EN-knop (klein, in de nav-stijl).
- Nederlandse zoektermen in titels en beschrijving: freelance grafisch ontwerper Amsterdam, verpakkingsontwerp, huisstijl laten maken, art direction.

## Wat zij zelf doet
- Search Console-account + eigendom bevestigen.
- LinkedIn-teksten plakken en profiel op "open to work / freelance" zetten.
- Feiten over de activaties bij Big Push, JAJA en The Cat aanleveren.
- Na een tijd (4–8 weken) kijken welke zoekwoorden binnenkomen; dan scherpen we aan.

## Eerlijk over verwachting
SEO is traag. Google heeft weken tot maanden nodig. Zoektermen als "freelance designer Amsterdam" zijn druk; onze beste kansen zijn de specifieke combinaties (packaging, brand + naam). Je naam en RINK Design moeten snel bovenaan komen.

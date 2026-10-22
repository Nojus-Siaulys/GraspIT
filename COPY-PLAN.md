# Copy plan — homepage, Lithuanian first

Status: draft 2026-10-22. Direction: **Bento × Swiss** (`previews-app`, route `#/bento-swiss`). Voice: "mes" (we), two people, plain Lithuanian, no hype.
Everything marked **[confirm]** needs a fact only the owner has. Nothing below invents a number: figures are the commitments the old site already makes.

## Rules for the copy
1. We write "mes / mūsų", never "aš". The two of us are named on the page.
2. Every claim is either a commitment we control (price, days, support, source code) or a real number. No "1000+ klientų" style counters until real (DESIGN-RULES 21, 29).
3. The H1 carries the search phrase ("svetainių kūrimas") and a concrete promise; the sub-line carries the human part.
4. Each chapter opens with one sentence that answers a question directly (AnswerBox pattern, DESIGN-RULES 17), so AI answers can quote it.
5. Prices are always visible, in euros, with "nuo" (from). Fixed price, no hourly billing.
6. Lithuanian typography: „ “ quotes, € after nothing (write €350), spaces in thousands, non-breaking space before units.

## Decisions taken (2026-10-22)
- Websites and shops lead. AI automations get one line and a sub-page, not a homepage chapter.
- Prices stay €350 / €700 and we add a monthly care plan as the upsell. **Care plan price [confirm].**
- Contact: email, phone, 30-minute booking link. No Messenger/WhatsApp.
- English: same offer translated after Lithuanian launch.

## Chapters, slots and first drafts
Chapter order follows rule 28, plus two additions: **Procesas** (the 5-step process, needed because the nav promises it) and **DUK** (FAQ with JSON-LD, needed for AIO). **Confirmed by the owner 2026-10-22; both are in the preview.**

| # | Chapter | Job | Slots filled from |
|---|---|---|---|
| 0 | Top strip + header | Be reachable | phone, email, LT/EN switch |
| 1 | Hero | Say what, for whom, how much | price anchor, delivery days |
| 2 | Proof strip | Four commitments as big numbers | old site's promises |
| 3 | Darbai | Show real work | real screenshots **[confirm: which projects]** |
| 4 | Paslaugos | Three offers with price | pricing above |
| 5 | Procesas | Remove fear of the unknown | 5-step process |
| 6 | Kodėl mes | Without / with table | commitments |
| 7 | Komanda ir atsiliepimai | Faces and real quotes | **[confirm: people, quotes]** |
| 8 | DUK | Answer objections, feed AI answers | below |
| 9 | Kontaktai | One field, one promise | email, booking link |

### 1 Hero
- Eyebrow: Svetainių studija Lietuvoje
- H1 (keyword-led, recommended): **Svetainių kūrimas verslui: fiksuota kaina, nuo €350**
- H1 (brand-led alternative): Svetainės, kurios atneša užklausas
- Sub: Esame dviejų žmonių studija. Kuriame svetaines ir el. parduotuves smulkiam ir vidutiniam verslui: per 7–14 dienų, su 30 dienų pagalba po paleidimo.
- Primary CTA: Gauti pasiūlymą · Secondary: Žiūrėti darbus
- Reassurance: Nemokama konsultacija. Fiksuotą pasiūlymą atsiunčiame per 24 val. po pokalbio.
- Price block: nuo €350 · 7 dienos

### 2 Proof strip (commitments, not statistics)
| Number | Label |
|---|---|
| 24 val. | Fiksuotas pasiūlymas po pirmo pokalbio |
| 7 d. | Pradinė svetainė paruošta |
| 30 d. | Pagalba po paleidimo |
| 100 % | Svetainės kodas ir turinys jūsų |

Swap in real numbers (projects shipped, years) only when the owner confirms them.

### 3 Darbai
- Heading: Darbai, kuriais didžiuojamės **[confirm: only if real]**
- Each card: project name, type (Svetainė / El. parduotuvė), one-line result. Real screenshots only. Until three real projects exist, show one project and a line "Daugiau darbų netrukus" rather than filler.

### 4 Paslaugos
- Heading: Trys būdai pradėti
- Intro (AnswerBox): Kiek kainuoja svetainė? Pradinė svetainė iki 4 puslapių kainuoja nuo €350, svetainė su parduotuve ir turinio valdymu nuo €700. Kaina fiksuota prieš pradedant darbą.
- A **Svetainė** · nuo €350 · Iki 4 puslapių, pritaikyta telefonui, paruošta per 7 dienas.
- B **Svetainė ar parduotuvė** · nuo €700 · Neribotas puslapių skaičius, el. parduotuvė, turinio valdymas, paruošta per 14 dienų.
- C **Priežiūros planas** · €__/mėn. **[confirm]** · Talpinimas, atnaujinimai ir smulkūs pakeitimai, kad svetainė liktų sveika.
- Line under the list: Reikia automatizuoti laiškus ar procesus? Kuriame ir dirbtinio intelekto automatizacijas, nuo €950.

### 5 Procesas
1. Pokalbis (30 min, nemokamas) 2. Fiksuotas pasiūlymas per 24 val. 3. Dizainas ir kūrimas, nuoroda peržiūrai 4. Jūsų pastabos 5. Paleidimas ir perdavimas.

### 6 Kodėl mes (table, same rows read by answer engines)
| Be aiškaus susitarimo | Su mumis |
|---|---|
| Kaina keičiasi darbo metu | Fiksuota kaina prieš pradedant |
| Rezultatą matote tik pabaigoje | Nuoroda peržiūrai viso kūrimo metu |
| Kodas lieka kūrėjo rankose | Visas kodas ir turinys perduodami jums |
| Po paleidimo lieka vienas | 30 dienų pagalbos po paleidimo |

Heading: Kuo skiriamės nuo šabloninės svetainės. Keep it about practices we can prove, not about competitors.

### 7 Komanda ir atsiliepimai
- Heading: Mes dviese. **[confirm: two names, roles, who owns design / development, one-sentence bio, photo]**
- Quotes: only real, with name, role, company. Until then, hide the quote row rather than show placeholders.

### 8 DUK (also FAQPage JSON-LD)
- Kiek kainuoja svetainė? · Kiek laiko trunka kūrimas? · Ar kodas man priklauso? · Kas bus po paleidimo? · Ar galite sukurti el. parduotuvę? · Ar dirbate ne Vilniuje?
- Each answer starts with the direct answer in one sentence, then detail.

### 9 Kontaktai
- Heading: Papasakokite apie savo svetainę
- Sub: Parašykite el. paštą ir atsakysime per **[confirm: N]** val. Arba užsisakykite 30 min pokalbį.
- Form: one field (el. paštas) + Siųsti. Reassurance: Be įsipareigojimų.
- Footer: legal name and entity **[confirm: MB / IĮ / other, code, VAT]**, Privatumo politika, Taisyklės.

## SEO and AIO hooks for the homepage
- Title: Svetainių kūrimas verslui nuo €350 | {brand}. Description: price, days, 30-day support in under 160 characters.
- One `<h1>`; chapter headings are `<h2>`; the without/with table and DUK are real HTML so they can be quoted.
- JSON-LD: `ProfessionalService` (both people as `Person` once named), `FAQPage`, `Offer` for the three prices. Keep `llms.txt` and `hreflang` (lt default, en later).
- City pages (Vilnius, Kaunas, Klaipėda) stay as separate pages and link from Paslaugos.

## What I still need from the owner
1. The two people: names, roles, photos, one-line bios.
2. Care plan monthly price.
3. Real proof: shipped projects you can show (names, screenshots), any real quotes, any real numbers worth putting in the proof strip.
4. Legal entity and company details for the footer.
5. Reply-time promise (hours) and the booking link tool (Cal.com, Calendly, other).
6. ~~OK to add the Procesas and DUK chapters~~ — done, confirmed.

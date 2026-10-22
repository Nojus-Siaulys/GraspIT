# Design rules — draft 1

Part 1 holds whatever look we choose. Part 3 is the open conversation about the look itself. Once a direction is picked, Part 1 plus the chosen tokens become `DESIGN.md` in the site repo, which the Impeccable and Hallmark design skills read automatically.

## Part 1 — Rules that hold for every direction

### Foundations
1. **Tokens, not values.** Colors, fonts, radii, spacing and shadows live as CSS variables in one file (Tailwind v4 `@theme`). Components never contain hex values or font names. A rebrand or rename then means editing one file. (The current `globals.css` already starts this: `--background`, `--accent`, `--navy`, `--font-display`.)
2. **Component library first.** Primitives (button, input, dialog, accordion, tabs, tooltip, sheet) come from shadcn/ui on Radix, added with the CLI and restyled through the tokens. We hand-build only studio-specific sections (Hero, PricingTable, CaseStudyCard...). No new dependency without a written reason.
3. **One system, two languages.** Every string lives in the i18n file in Lithuanian and English. Design for Lithuanian text that is longer than English: no fixed-width buttons, no single-line-only headings, test every layout with the Lithuanian copy first. Fonts must ship the `latin-ext` subset (ą č ę ė į š ų ū ž); the current layout already does.
4. **Two typefaces at most**: one display, one text. Body 17–18 px, line height 1.6, line length 60–70 characters. One modular type scale (ratio about 1.25), set as tokens.
5. **Spacing and grid.** 4 px base unit, 8-step scale, sections separated by 96 px (desktop) / 64 px (mobile). One content width (1200 px), 12 columns, mobile gutter 16 px. No horizontal scroll at 320, 375, 414 and 768 px.
6. **Color discipline.** One neutral family, one accent, status colors for success/error only. The accent is for the primary action and links, never decoration. Text and UI contrast meets WCAG AA (4.5:1 body, 3:1 large text and controls).

### Behaviour
7. **One primary action per screen.** The header button and every CtaBand say the same thing ("Get a quote" / "Gauti pasiūlymą"). Secondary actions are visibly quieter.
8. **Prices are visible.** Fixed prices in EUR, "one-time" stated, what is included next to the price. One PricingTable component reused everywhere, fed from one data file.
9. **Motion is cheap and optional.** Animate `transform` and `opacity` only; 150–250 ms for interface feedback, 400–600 ms for one-time reveals; one reveal pattern across the site; honour `prefers-reduced-motion`. No scroll-jacking.
10. **At most one decorative effect per page**, loaded lazily, never in the first viewport's critical path. Heavy hero media is not allowed to be the LCP element.
11. **Accessibility is a build rule.** Visible `:focus-visible` ring, 44 px touch targets, one `<h1>` per page, skip link, labelled form fields with inline errors, `lang` on `<html>` and `lang`/`hreflang` per page, alt text on every image.
12. **We eat our own cooking.** Targets on mobile: LCP under 2.0 s, CLS under 0.05, first-load JavaScript as small as the page allows, Lighthouse 90+ in all four categories. A studio that sells fast sites cannot ship a slow one.

### Content and imagery
13. **We, not I.** Copy speaks as the studio. Two real people with photos, names and roles on Home and Studio.
14. **Honest proof only.** No invented numbers, logos, testimonials or "happy clients" counts. If we have no real figure, the block is removed, not filled.
15. **Real work, plainly shown.** Case studies use real screenshots in a simple frame (no drawn browser chrome, no fake device mockups), what we did, the result only if measured. No stock photos of people at laptops.
16. **No emoji as UI.** Status dots, icons (Lucide) and illustrations are drawn from the system. The old "🟢 Available" badge becomes a token-colored dot.

### Content that answer engines can read
17. Every service, pricing and blog page opens with an **AnswerBox** (2–3 sentence direct answer), uses question-style H2s, real `<table>` price tables and a visible FaqList with JSON-LD. Team cards carry `Person` markup. These are components, so every page gets them for free.

### Banned patterns
Gradient blobs and mesh/smoke backgrounds as the main visual idea, italic or emphasised-word headings, the identical hero → three cards → CTA rhythm on every page, auto-playing video as hero, cookie-cutter "Trusted by 500+ teams" strips, lorem-ipsum-level copy ("We turn ideas into real products").

### Trust and conversion (implemented in all six front-page previews)
18. **Price anchor in the hero.** A "from €…" figure and a delivery time sit above the fold, so the buyer knows the order of magnitude before they scroll.
19. **One primary action, repeated.** The same CTA appears in the nav, the hero, the closing block and a sticky bar on mobile. Secondary actions are visually quieter.
20. **Reassurance next to every ask.** One short line under the CTA (no obligation, reply time) and under the email field.
21. **Trust points directly after the hero**, four at most, each a concrete claim. Claims must be true before launch; placeholders stay placeholders until they are.
22. **Faces before logos.** The two team members are visible in the hero area. No client-logo strip or counters until real ones exist.
23. **One-field lead capture at the end** (email, then the follow-up happens by reply). Longer forms live on /kontaktai.
24. **Services show a price and a next step on each card**, not just a description.
25. **No fake browser chrome or invented screenshots.** Work samples use real captures only.

Mobile was checked at 375px for all six previews: no horizontal overflow, CTAs stay reachable.

### Page structure (from the reference sites, owner feedback 2026-10-22)
Reviewed: astraeuswealth.com, upsunday.co, svetainiucentras.lt, menoti.lt. The owner's complaint about the first previews: too many squares, and the page reads as one block with no cut-offs between sections.
26. **Sections are bands, not boxes.** Each section is a full-width band with its own background, vertical padding of 64–96px, a numbered label and a heading. Backgrounds alternate white → light grey → dark → white; a dark band marks the proof strip and a signal-colour band marks the contact section. (Astraeus alternates dark and light; Menoti cuts from a dark hero to white.)
27. **Boxes are the exception.** Hero, trust points, services and quotes are open type on the band, separated by hairlines. Image tiles are allowed only for photos and work samples, at most three per section.
28. **Fixed chapter order:** Hero → proof strip → Work → Services → Process → Why us (with a without/with table) → About us (story, competence, work ethic) → Team and quotes → FAQ → Contact. Each chapter has one job and one heading.
29. **Proof strip right after the hero:** four large numbers with small labels (svetainiucentras.lt and Menoti both lead with experience, client count, response time, uptime). Placeholders stay "00" until the numbers are real (rule 21).
30. **Work is shown large:** big project images with a caption row (name, type, arrow), as Menoti and UpSunday do. Real project captures only.
31. **A without/with table** under "Why us" turns the care plan into a visible upsell (svetainiucentras.lt). It is a real `<table>` so answer engines can read it.
32. **Contact chapter shows the team.** Both faces, a "we reply within N hours" line and a one-field form (UpSunday's "Book a call" block). A phone and email strip sits above the header, since Lithuanian buyers expect to see both.
33. **Real names on quotes:** person, role, company. Menoti and UpSunday both do this.
34. **No emphasised-word headings,** even though Astraeus highlights a phrase in colour. The "emphasised-word headings" ban under Banned patterns stands.

## Part 2 — What the current site tells us
Read from the `Portfolio1` repo (not yet reviewed in a browser):
- **Keep:** the token structure in `globals.css`, `latin-ext` fonts, bilingual i18n discipline, fixed-price process copy, city pages, `llms.txt`, `hreflang`, JSON-LD, focus-visible styles.
- **Change:** personal "I/Nojus" voice; `PERSONAL` constants and the "Hire me" button; stat tiles that may not be real; emoji status badge; four decorative backgrounds (marble, mesh, smoke, grid) plus a scroll-video hero, which conflict with rules 10 and 12; English-only slugs for Lithuanian pages.
- **Check:** the live Lighthouse/LCP numbers and the real values behind the About stats before deciding what stays.

## Part 3 — Design direction (for discussion)
Three candidates. They differ in feeling; all obey Part 1 and all are built from the same tokens, so switching later is cheap.

**A. Navy studio (evolve the current identity)**
Silver-white surfaces, deep navy ink, one blue accent; Bricolage Grotesque + DM Sans. Reads as dependable and technical. Lowest risk and keeps the existing brand equity; the risk is looking like every blue business site.

**B. Warm craft**
Off-white paper, near-black ink, one warm accent (terracotta or amber); a characterful serif for headlines with a clean sans for text. Human, small-team, editorial; team photos and real work carry the page. Stands out from Lithuanian competitors, but it is a new identity and should wait for the naming decision.

**C. Dark showcase**
Near-black canvas, large live-site previews, high-contrast type, one electric accent. Portfolio-led and high-end. Fits bigger budgets; harder to keep accessible and warm for a €350 buyer.

**Recommendation:** A now, built with strict tokens (rule 1), with B's human layer (real team photos, plainer copy, more white space) on top. That gives continuity under the current domain, and if the studio renames later we swap the token file instead of redesigning.

### Colour palettes for trust (2026-10-22, previewed on Bento × Swiss with `?palette=`)
Colour associations are only a nudge: they vary by culture and context, and clear contrast, real proof and plain wording do more for trust than any hue. Within that limit, blue and green are the safest families for a service people pay for (blue reads as stable and competent, green as calm and growth), and red is the weakest because it also signals warning and urgency. All four candidates pass WCAG AA (ink on white 13–18:1, white on accent 5.5–6.7:1, muted text 5.3–6.4:1).

| Palette | Ink | Accent | Grey band | Feel |
|---|---|---|---|---|
| Trust blue (recommended) | `#0b1f3f` | `#1d4ed8` | `#eef2f9` | Stable, competent; closest to the current navy identity |
| Navy + teal | `#0f2747` | `#0f766e` | `#eaf3f3` | Competent and calm; a little less common than plain blue |
| Graphite + cobalt | `#16181d` | `#2f54eb` | `#f0f1f3` | Neutral, precise; the most "tech studio" |
| **Forest + sand (chosen by the owner 2026-10-22)** | `#10372b` | `#1f6b4f` | `#f3efe6` | Grounded and warm; stands out from blue competitors |
| Red (original) | `#0d0d0d` | `#e4002b` | `#eeeeea` | Energetic; kept only for comparison |

Rule 35: one ink, one accent, one grey band colour per palette, set as tokens in a single theme block, so changing palette (or renaming the studio) is a one-block edit.

## Part 4 — Component and design libraries (shortlist, checked 2026-10-22)
"Checked" = read on the library's own site today. "Unverified" = from general knowledge, confirm before relying on it. None of these have been judged visually side by side yet.

| Library | What it is | Checked facts | Fit |
|---|---|---|---|
| **shadcn/ui** | Copy-in components on Radix or Base UI, Tailwind | Top pick in the 2026 roundups; Foreman's own UI and the live site already use Radix + Tailwind v4 | **Foundation.** Plain by default, so the tokens decide the look. |
| **Tailark** | Marketing blocks and pages for shadcn | "Multiple styles", Radix or Base UI, built on Next.js; pricing not shown on the page | Strong fit for hero, pricing, team, FAQ sections. |
| **Shadcnblocks** | Largest shadcn block library | 2,478 blocks (292 hero, 96 pricing, 41 team, 30 contact, 26 FAQ), 21 templates, 39 themes; one-time $149 / $299 / $399 | Breadth; needs strict curation to stay consistent. |
| **Untitled UI React** | Clean, mainstream SaaS-style kit on React Aria + Tailwind 4 | Free base; PRO one-time Solo $349, Studio $999 (8 users); 40 landing and 20 pricing page examples | Cleanest "mainstream" look; a different primitive base than Radix. |
| **Mantine** | Complete styled library | v9.7.3, 120+ components, native CSS (no runtime), Styles API | Good if we prefer fewer decisions over Tailwind-native code. |
| **Radix Themes** | Zero-config styled layer on Radix | Open source, wrap in `<Theme>`; theming options not read | Polished and calm (unverified). |
| **HeroUI** | React Aria + Tailwind v4 | Component count and licence not stated on its page | Modern and rounded (unverified). |
| **daisyUI** | Tailwind plugin, pure CSS | 68 components, 35 themes, free | Easy theming, but its look is recognisably playful. |
| **Tailwind Plus** | Official Tailwind marketing templates and blocks | Page was a login wall; nothing verified | Worth checking price and templates. |
| MUI, Ant Design | Material / enterprise-admin look | Roundups only | Wrong signal for a design studio's own site. |
| Animation-first registries (Aceternity, Magic UI) | Effects and dark "tech" showcase blocks | Not checked | Excluded by rules 9, 10 and the banned list. |

Working recommendation: **shadcn/ui as the foundation, plus one marketing block source (Tailark or Shadcnblocks), all restyled by our tokens.** Untitled UI is the benchmark for a clean mainstream look and the main paid alternative.

Questions that decide it: who the typical buyer is (a trades business owner or a small company's marketing person), what we want to be remembered for (reliable and fast, or distinctive taste), and whether a rename is likely in the next 6–12 months.

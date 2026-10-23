# Product context — web studio (brand: GraspIT; old names WebGenas / WebGenius)

Status: draft 2026-10-22. Facts below come from the existing site repo `Nojus-Siaulys/Portfolio1` and from the owner's answers. Anything marked **[confirm]** is not decided.

## What this is
A two-person studio that designs and builds websites, online shops and AI-agent automations for small and medium businesses.
The existing site is a one-person portfolio ("I", Nojus). The new site becomes a **studio site ("we", team)**.

## Facts we already have
- Brand today: **WebGenas** (Lithuanian, also the legal/default name) and **WebGenius** (English-facing). Domain stays as is for now: webgenas.com. A name and domain change is possible later, so the design must survive a rename (see DESIGN-RULES, rule 1).
- Market: **Lithuania first**, English market later. Lithuanian is the default language.
- Current offers (from the repo's pricing copy and `public/llms.txt`):
  - Websites: Starter €350 (up to 4 pages, 7 days), Pro €700 (unlimited pages, shop, CMS, 14 days), Enterprise custom.
  - AI agent services: Email automation €950, Workflow automation €1,500, custom suite; optional monitoring €25/month.
  - Fixed price, no hourly billing, 30 days post-launch support, full source code handed over.
- Process today (5 steps): discovery call, fixed-price proposal within 24 h, design and build with a private staging link, review, launch and handover.
- Existing SEO base: bilingual `/lt` + `/en` with hreflang, city landing pages (Vilnius, Kaunas, Klaipėda) in Lithuanian, 3 Lithuanian price/comparison blog posts, Service + FAQPage JSON-LD, sitemap, `llms.txt`.
- Stack on the live site: Next.js 16, React 19, TypeScript, Tailwind v4, Motion, Supabase + Drizzle, Resend, Vercel.

## Owner decisions so far
- Complete overhaul: design, structure, pricing, contact.
- Keep the domain for now; name change later is possible.
- Replan SEO and AI-answer optimisation (AIO) as part of the overhaul.
- Visual direction is **still open** and is the next conversation (see DESIGN-RULES, section 3).
- Work with Foreman: use its skills and component libraries, **do not use the free AI models** for this project.

## Decided 2026-10-22
- Palette: Forest + sand (ink `#10372b`, accent `#1f6b4f`, sand band `#f3efe6`).
- Direction: Bento × Swiss (see DESIGN-RULES, page structure rules 26–34, and COPY-PLAN.md).
- Websites and shops lead; AI automations get one line and a sub-page.
- Prices stay €350 / €700; add a monthly care plan (price still to confirm).
- Contact channels: email, phone, 30-minute booking link.
- English: same offer, translated after the Lithuanian launch.
- Homepage keeps the Procesas (5 steps) and DUK (FAQ) chapters; the Bento × Swiss preview carries the Lithuanian draft copy.
- Brand renamed to **GraspIT** (from "grasp": to understand). The homepage gains an **Apie mus** chapter: how we think, what we know (competence), how we work (work ethic). **Domain [confirm]:** the live domain is still webgenas.com, which no longer matches the brand; decide whether to buy a GraspIT domain and redirect.

## Still open **[confirm]** (decisions 2, 3 partly, 5 and 7 are settled above)
1. Second team member: name, role, what each person owns (design / development / AI), photo and short bio. The About page needs real people.
2. Does the studio keep the AI-agent service line, or focus on websites and shops first?
3. Pricing for two people: keep €350 / €700 / custom, or reposition upward? Add a monthly care plan (hosting, updates, small edits)?
4. Real proof we can show: how many projects are actually shipped, which clients agree to be named, any real testimonials. The old About page has stat tiles ("Years experience", "Projects shipped", "Happy clients"); only real numbers may stay.
5. Contact channels: email, phone, Messenger (already used), WhatsApp, booking link for a 30-minute call.
6. Legal entity and invoicing details for the footer and terms (MB / IĮ / other).
7. English market: same offers and prices, or a separate English proposition?
8. Company story for Apie mus: how the studio started, the real origin of the name GraspIT, one project or result you are proud of, whether the tech stack (Next.js, React, TypeScript) and the four work principles are accurate.

## Confirmed 2026-10-23
- Audience: local service businesses.
- Website creation starts at EUR 350; final price depends on requested scope.
- Experience working with WordPress websites; offer design restyling and structure updates.
- Real projects and team photos will be supplied later.
- No production domain yet. Placeholder contact email is explicitly nonfunctional.
- Existing green G/cursor logo in public/img/logo.png anchors the identity.
- Awwwards references are inspiration, never client work or an implied EUR 350 deliverable.

## Portfolio scope confirmed 2026-10-23
Only Colorlisse, IriVitam (user wrote Iravitam), and Kalvita.lt are approved portfolio projects. Exclude work completed at the internship employer, including previously proposed GO BETTER. Do not infer the user's exact role or claim measured outcomes. Colorlisse and Kalvita have real homepage captures. IriVitam has no confirmed public URL or screenshot yet. Keep public copy plain and practical.

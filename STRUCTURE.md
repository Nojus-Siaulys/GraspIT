# Site structure — draft 1

Principle: every page answers one question a Lithuanian small-business owner actually types or asks an AI assistant, and ends in one next step (talk to us). Nothing is built from scratch: pages are assembled from the shared sections listed at the bottom.

## Sitemap

| Page | Question it answers | Primary next step |
|---|---|---|
| Home `/` | Who are you and can I trust you with my website? | Get a quote |
| Services `/paslaugos` (overview) | What can you build for me? | Open a service |
| Websites `/paslaugos/svetaines` | Do I need a website, and what does it cost? | See prices |
| Online shops `/paslaugos/el-parduotuves` | Can you sell my products online? | Get a quote |
| AI agents `/paslaugos/ai-agentai` | Can automation save me time? | Book a call |
| Pricing `/kainos` | How much, exactly? What is included? | Choose a package |
| Work `/darbai` + case study pages | Have you done this before? | Get a quote |
| Studio `/studija` | Who are the people behind it? | Talk to us |
| Process `/procesas` (or a section on Home and Pricing) | What happens after I write to you? | Start |
| Contact `/kontaktai` | How do I reach you? | Send the form / call |
| Blog `/tinklarastis` | Answers to common questions (cost, WordPress vs custom, shops) | Read, then quote |
| City pages `/svetainiu-kurimas-vilnius`, `-kaunas`, `-klaipeda` (LT only) | Web development near me | Get a quote |
| Legal: privacy, terms | Required | none |

Notes
- Lithuanian URLs for Lithuanian pages. The live site uses English slugs under `/lt` (for example `/lt/pricing`); localised slugs are better for Lithuanian search but need a route map. **[confirm]** Recommended: yes, keep the old URLs as 301 redirects.
- `/lt` is the default and `/en` is added page by page when there is real English copy. Never ship machine-translated pages; the old site already uses reciprocal `hreflang` and an `x-default`, keep that.
- Contact is reachable from every page (header button, sticky mobile bar, footer).

## Home page order (persuade)
1. Hero: one sentence of what we do and for whom, price anchor ("from €350"), one primary CTA, one secondary link to Work.
2. Proof strip: real client logos or real numbers only; otherwise skip the strip.
3. Services: three entries (websites, shops, AI agents), each a link.
4. Selected work: 2–3 case studies with real screenshots.
5. Process: 5 steps, short.
6. Pricing teaser: the three packages in the shared pricing component.
7. Team: both people, photo and one line each.
8. FAQ: 5–6 real questions (cost, time, hosting, ownership of code, support).
9. Final CTA with the contact form.

## Contact (replan)
- One short form: name, email, phone (optional), what you need (dropdown), budget range, message. Validation with the same Zod schema on client and server.
- Beside the form: email, phone, Messenger/WhatsApp, and a "book a 30-minute call" link. Reply-time promise on the page ("we answer within one working day") only if we can keep it.
- A confirmation state that says what happens next and when.

## Pricing (replan, numbers are the owner's call)
- Show three packages plus a "what is included" table; fixed prices in EUR, "one-time" stated, hosting and domain costs explained in plain words.
- Optional monthly care plan and the AI-agent monitoring fee shown as add-ons, not hidden.
- Same pricing component on Home, Pricing and city pages so numbers never drift. `Offer` JSON-LD is generated from the same data.

## SEO and AIO (first frame; the full plan is a separate step)
- Keep and extend: city pages, comparison blog posts, `llms.txt`, hreflang, JSON-LD.
- Make every service and blog page extractable by AI answer engines: a 2–3 sentence answer at the top, question-style H2s, real HTML price tables, a visible FAQ with `FAQPage` markup, an author/team card with `Person` markup, `ProfessionalService` + `Organization` for the studio with both founders.
- Entity consistency: one studio name, address/service area and contact set everywhere (site, Google Business Profile, social, directories). A future rename is the biggest SEO risk, so decide the name before investing in link building.
- Measure: Search Console, Vercel Analytics, and a small monthly check of what ChatGPT, Gemini and Perplexity answer for 5–10 Lithuanian queries.

## Shared sections (the "component library" for pages)
Hero, ServiceCard, PricingTable, ProcessSteps, CaseStudyCard, TeamCard, FaqList (with JSON-LD), AnswerBox (TL;DR), ContactForm, CtaBand, CityLanding (existing), ArticleLayout.
Primitives come from shadcn/ui (Radix) restyled with the design tokens; see DESIGN-RULES.

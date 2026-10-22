# GraspIT

Lithuanian website for a two-person web studio. The chosen direction is **Bento × Swiss**, with the Forest + sand palette.

## Development

```bash
cd previews-app
npm ci
npm run dev
```

The website opens at `/`. The homepage introduces the offer and links to full pages, rather than showing every section in full.

- `/paslaugos/` and individual website, shop and AI service pages
- `/kainos/`, `/procesas/`, `/apie-mus/`, `/darbai/`
- `/duk/` — 22 questions grouped by topic
- `/kontaktai/`
- Bento × Swiss is the only design. The old gallery and alternative previews have been removed; old hash preview URLs open the main website.

## Build and verify

```bash
cd previews-app
npm run build
npm run check:pages
npm run lint
npm run preview
```

The build generates HTML for all 11 website pages in `previews-app/dist`, including visible content without JavaScript. Each page has a unique title, description and Open Graph metadata. The DUK page includes FAQPage JSON-LD generated from the same data as its visible answers. Native question disclosure widgets also work without JavaScript. `check:pages` checks the generated HTML, internal links and FAQ markup.

For publication, set the confirmed production origin at build time:

```bash
SITE_URL=https://your-confirmed-domain.lt npm run build
```

This generates absolute canonical URLs, `sitemap.xml` and the sitemap reference in `robots.txt`. No domain is assumed while the GraspIT domain decision is pending. FAQ markup does not guarantee rich results or search rankings.

Serve `dist` as a static directory with directory index support. Redirect `/duk` to `/duk/` (and likewise for the other page directories), and serve the corresponding `index.html`. Vite development and preview handle those redirects. Configure your production host to return `404.html` with HTTP 404 for unknown URLs; do not configure a universal SPA fallback to the homepage.

## Content and launch requirements

- `previews-app/src/site/content.ts` — page metadata, services, shared FAQ answers.
- `previews-app/src/site/Site.tsx` — page layouts and shared navigation.
- `PRODUCT.md`, `STRUCTURE.md`, `DESIGN-RULES.md`, `COPY-PLAN.md` — source planning notes. The latest multi-page structure supersedes the original full homepage plan.

Contact details are still placeholders in `src/content-lt.ts`. The contact page intentionally shows that requests are unavailable until real contact details are supplied; it does not pretend to send a form. Add a real email/phone before launch. Booking, legal details, privacy policy, care plan price, team biographies, client work and testimonials still need owner-confirmed information. Client results and team identities have not been invented. The work page currently identifies its visual as a studio design demonstration.

The stock hero photo is supplied for layout. Confirm its licence or replace it with owned photography before publication.

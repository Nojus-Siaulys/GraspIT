# GraspIT

Lithuanian website for a two-person web studio. The chosen direction is **Bento × Swiss**, with the Forest + sand palette.

## Development

```bash
cd previews-app
npm ci
npm run dev
```

The website opens at `/`. The homepage introduces the offer and links to full pages, rather than showing every section in full.

- `/paslaugos/` and individual website, shop, AI and WordPress restyling service pages
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

The build generates HTML for all 12 website pages in `previews-app/dist`, including visible content without JavaScript. Each page has a unique title, description and Open Graph metadata. The DUK page includes FAQPage JSON-LD generated from the same data as its visible answers. Native question disclosure widgets also work without JavaScript. `check:pages` checks the generated HTML, internal links and FAQ markup.

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

The site targets local service businesses. Website creation starts at EUR 350; the final price depends on scope. The homepage separates new websites from WordPress restyling and shows the three approved portfolio projects: Colorlisse, Kalvita, and IriVitam. Colorlisse and Kalvita use real homepage captures and public links. IriVitam still needs a confirmed public URL and screenshot. Work completed at the owner's internship employer is excluded.

Contact details remain unconfigured; a visibly nonfunctional example address is shown. The brief form downloads a local text file or opens an email draft once a real contact email is configured. It does not submit requests to a backend. Booking, business details, privacy content, team biographies, and testimonials still need confirmed information before launch.

The current photo sections use optimized generated WebP illustrations. The workspace background stays fixed on desktop when reduced motion is not requested, and scrolls normally on mobile and with reduced motion. The unused stock assets are retained but are not used in the current homepage.

## Contact configuration

Copy `previews-app/.env.example` to `previews-app/.env.local`. Set the confirmed public `VITE_CONTACT_EMAIL` and optional `VITE_CONTACT_PHONE`, then restart Vite. With an email configured, the brief form opens a draft in the visitor's email application; the visitor sends it themselves. Without it, the form downloads a local text brief and clearly says nothing was sent. No form data is submitted to a backend or stored in local storage.

Shared prices and package features live in `src/site/pricing.ts`. Contact settings and CTA copy live in `src/site/settings.ts`. Fonts are hosted locally with Lithuanian character support.

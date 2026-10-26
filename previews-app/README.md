# GraspIT website

React + TypeScript + Vite, styled with Tailwind.

Run `npm ci` and `npm run dev` for development. Run `npm run build`, `npm run check:pages` and `npm run lint` for validation; `npm run preview` serves the static build.

See [the repository README](../README.md) for routes, prerendering, production domain configuration and outstanding launch content.

The personal project library is served at `/biblioteka/`, independently of client work at `/darbai/`. Curated descriptions and technology tags live in `src/site/personalProjects.ts`; filters and search live in `src/site/ProjectLibrary.tsx`. Descriptions were reviewed against the owner's GitHub repositories on 2026-10-23. Only verified public repositories receive code links. The page does not call authenticated GitHub APIs or include repository credentials.

## Project inquiries and decision content

`server/contact.ts` handles the inquiry endpoint; `api/contact.ts` is the Vercel Node adapter. The same handler runs under Vite dev and preview. Set server-only `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`, and `SITE_URL`; never expose the sending key through `VITE_` variables. See `docs/PALEIDIMAS.md` for the remaining owner inputs. Without delivery configuration the UI offers an explicitly labelled local download and the endpoint refuses submission. Run `npm run test:contact` for integration tests using a mock provider (no real mail).

Client case studies are defined in `src/site/caseStudies.ts` and rendered by `CaseStudy.tsx`. `DecisionContent.tsx` contains concrete service scenarios, the interactive structure example, and package scope. The package finder passes non-personal selections through URL parameters into `ContactBrief`.

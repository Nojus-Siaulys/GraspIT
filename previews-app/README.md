# GraspIT website

React + TypeScript + Vite, styled with Tailwind.

Run `npm ci` and `npm run dev` for development. Run `npm run build`, `npm run check:pages` and `npm run lint` for validation; `npm run preview` serves the static build.

See [the repository README](../README.md) for routes, prerendering, production domain configuration and outstanding launch content.

The personal project library is served at `/biblioteka/`, independently of client work at `/darbai/`. Curated descriptions and technology tags live in `src/site/personalProjects.ts`; filters and search live in `src/site/ProjectLibrary.tsx`. Descriptions were reviewed against the owner's GitHub repositories on 2026-10-23. Only verified public repositories receive code links. The page does not call authenticated GitHub APIs or include repository credentials.

import { readFile, readdir, writeFile, mkdir } from "node:fs/promises"
import { render, pages, posts, services, structuredData } from "../dist-ssr/prerender.js"

const template = await readFile("dist/index.html", "utf8")
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]
  )
// Match the responsive room image in HeroBackdrop; the two screen captures remain separate.
const heroImage = "/img/generated/hero-real-websites-v3.webp"
// HeroBackdrop uses a mobile picture source; preload only the matching room photo.
const mobileHero = heroImage?.replace(/\.webp$/, "-mobile.webp")
const hasMobileHero = Boolean(mobileHero) && (await readdir(`dist${mobileHero.replace(/[^/]+$/, "")}`).catch(() => [])).includes(mobileHero.split("/").pop())
const preload = (href, media) =>
  `\n    <link rel="preload" as="image" href="${escape(href)}"${media ? ` media="${media}"` : ""} fetchpriority="high" />`
const heroPreload = heroImage
  ? hasMobileHero
    ? preload(heroImage, "(min-width: 640px)") + preload(mobileHero, "(max-width: 639px)")
    : preload(heroImage)
  : ""
const configuredUrl = process.env.SITE_URL
let origin
if (configuredUrl) {
  const url = new URL(configuredUrl)
  if (
    url.protocol !== "https:" ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      "SITE_URL must be the public HTTPS origin, for example https://your-domain.lt"
    )
  }
  origin = url.origin
}
for (const [path, page] of Object.entries(pages)) {
  const canonical = origin
    ? `${origin}${path === "/" ? "/" : `${path}/`}`
    : null
  const post = path.startsWith("/blogas/") ? posts.find((p) => `/blogas/${p.slug}` === path) : null
  const jsonLd = JSON.stringify(structuredData(path, origin ?? "")).replace(/</g, "\\u003c")
  const metadata = [
    `<meta property="og:type" content="${post ? "article" : "website"}" />`,
    ...(post
      ? [
          `<meta property="article:published_time" content="${post.date}" />`,
          `<meta property="article:modified_time" content="${post.updated ?? post.date}" />`,
          `<meta property="article:section" content="${escape(post.label)}" />`,
        ]
      : []),
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta name="theme-color" content="#10372b" />`,
    `<link rel="apple-touch-icon" href="/img/logo.png" />`,
    `<meta property="og:locale" content="lt_LT" />`,
    `<meta property="og:site_name" content="GraspIT" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.intro)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(canonical
      ? [
          `<link rel="canonical" href="${escape(canonical)}" />`,
          `<meta property="og:url" content="${escape(canonical)}" />`,
          // Share cards are made by `npm run og`. Crawlers need an absolute URL, so they are linked only once SITE_URL is set.
          `<meta property="og:image" content="${escape(`${origin}/og/${path === "/" ? "home" : path.slice(1).replaceAll("/", "-")}.png`)}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${escape(page.heading)}" />`,
        ]
      : []),
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ")
  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(page.intro)}" />`
    )
    .replace(
      "</head>",
      `    ${metadata}${path === "/" && heroImage ? heroPreload : ""}\n  </head>`
    )
    .replace(
      '<div id="root"></div>',
      () => `<div id="root">${render(path)}</div>`
    )
  const directory = path === "/" ? "dist" : `dist${path}`
  await mkdir(directory, { recursive: true })
  await writeFile(`${directory}/index.html`, html)
}
const notFound = template
  .replace(/<title>.*?<\/title>/s, "<title>Puslapis nerastas | GraspIT</title>")
  .replace("</head>", '<meta name="robots" content="noindex" /></head>')
  .replace(
    '<div id="root"></div>',
    () => `<div id="root">${render("/404")}</div>`
  )
await writeFile("dist/404.html", notFound)
// Search engines and AI answer engines may crawl everything except the internal design previews and API.
// AI crawlers are listed by name so the intent stays explicit even if a default rule changes later.
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot"]
await writeFile(
  "dist/robots.txt",
  [
    "User-agent: *",
    "Allow: /",
    "Disallow: /previews/",
    "Disallow: /api/",
    "",
    ...aiBots.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", "Disallow: /previews/", "Disallow: /api/", ""]),
    ...(origin ? [`Sitemap: ${origin}/sitemap.xml`, ""] : []),
  ].join("\n")
)
const absolute = (path) => `${origin ?? ""}${path === "/" ? "/" : `${path}/`}`
if (origin) {
  const urls = Object.keys(pages)
    .map((path) => {
      const post = posts.find((p) => `/blogas/${p.slug}` === path)
      const lastmod = post ? `<lastmod>${post.updated ?? post.date}</lastmod>` : ""
      return `<url><loc>${escape(absolute(path))}</loc>${lastmod}</url>`
    })
    .join("\n")
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  )
}
// llms.txt: a plain summary of the site for AI tools (proposed standard, see llmstxt.org).
const line = (path) => `- [${pages[path].heading}](${absolute(path)}): ${pages[path].intro}`
await writeFile(
  "dist/llms.txt",
  [
    "# GraspIT",
    "",
    "> Dviejų žmonių svetainių studija Lietuvoje. Kuriame ir atnaujiname svetaines, el. parduotuves ir AI automatizacijas vietiniam paslaugų verslui. Svetainės nuo €350, verslo svetainės ir el. parduotuvės nuo €700, fiksuota kaina pagal sutartą apimtį, 30 dienų pagalba po paleidimo. Kalba: lietuvių.",
    "",
    "## Paslaugos",
    line("/paslaugos"),
    ...services.map((s) => line(s.href)),
    line("/kainos"),
    line("/procesas"),
    "",
    "## Darbai ir komanda",
    line("/darbai"),
    ...Object.keys(pages).filter((p) => p.startsWith("/darbai/")).map(line),
    line("/apie-mus"),
    "",
    "## Klausimai ir straipsniai",
    line("/duk"),
    line("/blogas"),
    ...posts.map((p) => line(`/blogas/${p.slug}`)),
    "",
    "## Kontaktai",
    line("/kontaktai"),
    "",
  ].join("\n")
)
console.log(
  `Prerendered ${Object.keys(pages).length} Lithuanian pages and 404. ${origin ? "Canonical URLs and sitemap generated." : "Set SITE_URL to the confirmed public domain for canonical URLs and sitemap."}`
)

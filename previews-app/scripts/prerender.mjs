import { readFile, readdir, writeFile, mkdir } from "node:fs/promises"
import { render, pages } from "../dist-ssr/prerender.js"

const template = await readFile("dist/index.html", "utf8")
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]
  )
// The home hero photo is a CSS background, so the browser finds it late and it becomes the largest paint.
// Read its URL from the built stylesheet and preload it on the home page only.
let heroImage
for (const file of (await readdir("dist/assets")).filter((name) => name.endsWith(".css"))) {
  const css = await readFile(`dist/assets/${file}`, "utf8")
  heroImage ??= css.match(/\.home-hero\{[^}]*url\(["']?([^"')]+\.webp)["']?\)/)?.[1]
}
// index.css swaps in a "-mobile" copy of the hero on phones (max-width 639px); preload only the one the browser will use.
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
  const metadata = [
    `<meta property="og:type" content="website" />`,
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
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`
)
if (origin) {
  const urls = Object.keys(pages)
    .map(
      (path) =>
        `<url><loc>${escape(`${origin}${path === "/" ? "/" : `${path}/`}`)}</loc></url>`
    )
    .join("\n")
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  )
}
console.log(
  `Prerendered ${Object.keys(pages).length} Lithuanian pages and 404. ${origin ? "Canonical URLs and sitemap generated." : "Set SITE_URL to the confirmed public domain for canonical URLs and sitemap."}`
)

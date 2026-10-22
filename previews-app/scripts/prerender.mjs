import { readFile, writeFile, mkdir } from "node:fs/promises"
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
    ...(canonical
      ? [
          `<link rel="canonical" href="${escape(canonical)}" />`,
          `<meta property="og:url" content="${escape(canonical)}" />`,
        ]
      : []),
  ].join("\n    ")
  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(page.intro)}" />`
    )
    .replace("</head>", `    ${metadata}\n  </head>`)
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

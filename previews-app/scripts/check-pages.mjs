import assert from "node:assert/strict"
import { readFile, access } from "node:fs/promises"
import { pages } from "../dist-ssr/prerender.js"
const titles = new Set()
for (const path of Object.keys(pages)) {
  const html = await readFile(
    `dist${path === "/" ? "" : path}/index.html`,
    "utf8"
  )
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${path}: one h1`)
  assert.ok(html.includes('<html lang="lt">'), `${path}: Lithuanian language`)
  assert.deepEqual(
    [...html.matchAll(/data-theme="([^"]+)"/g)].map(match => match[1]),
    ["bento-swiss"],
    `${path}: only the main Bento × Swiss design`
  )
  assert.ok(!html.includes("<iframe"), `${path}: no embedded design previews`)
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
  assert.ok(title && !titles.has(title), `${path}: unique title`)
  titles.add(title)
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `${path}: description`
  )
  assert.match(
    html,
    /<main id="turinys">.+<\/main>/s,
    `${path}: prerendered main content`
  )
  const card = `og/${path === "/" ? "home" : path.slice(1).replaceAll("/", "-")}.png`
  await access(`public/${card}`)
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/, `${path}: twitter card`)
  if (process.env.SITE_URL) assert.ok(html.includes(`/${card}"`), `${path}: absolute og:image`)
  for (const [, href] of html.matchAll(/href="(\/[^"?#]*)(?:#[^"]*)?"/g)) {
    if (
      href.startsWith("/assets/") ||
      href.startsWith("/img/") ||
      href === "/favicon.png"
    )
      continue
    assert.ok(
      pages[href.replace(/\/$/, "") || "/"],
      `${path}: known internal link ${href}`
    )
    assert.ok(href.endsWith("/"), `${path}: directory URL ${href}`)
  }
  if (path === "/duk") {
    const schema = JSON.parse(
      html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]
    )
    assert.equal(schema["@type"], "FAQPage")
    assert.equal(schema.mainEntity.length, 22)
    assert.equal((html.match(/<details\b/g) ?? []).length, 22)
    for (const question of schema.mainEntity) {
      assert.ok(
        html.includes(question.name),
        `visible FAQ question: ${question.name}`
      )
      assert.ok(
        html.includes(question.acceptedAnswer.text),
        `visible FAQ answer: ${question.name}`
      )
    }
  }
}
assert.match(
  await readFile("dist/404.html", "utf8"),
  /name="robots" content="noindex"/
)
await assert.rejects(access("dist/stiliai/index.html"), { code: "ENOENT" })
console.log(
  `PASS: ${titles.size} prerendered pages, unique titles, Lithuanian metadata, internal directory links, 22 visible FAQ answers matching JSON-LD, noindex 404, no alternative designs or gallery.`
)

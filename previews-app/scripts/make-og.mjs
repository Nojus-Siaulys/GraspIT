// Renders one 1200x630 social card per page into public/og/. The PNGs are committed, so a normal build needs no browser.
// Run after `npm run build` (it reads page titles from dist-ssr) whenever a page heading changes:
//   npm run build && npm run og
// Needs Chrome or Edge; set CHROME_PATH if it is not in a default location.
import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { pages } from "../dist-ssr/prerender.js"

const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((candidate) => candidate && existsSync(candidate))
if (!chrome) throw new Error("Chrome or Edge not found. Set CHROME_PATH.")

const fonts = resolve("node_modules/@fontsource-variable/geist/files")
const logo = pathToFileURL(resolve("public/img/logo.png")).href
const font = (name, range) =>
  `@font-face{font-family:G;font-weight:100 900;src:url(${pathToFileURL(join(fonts, name)).href});unicode-range:${range}}`
const css = `${font("geist-latin-wght-normal.woff2", "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122")}
${font("geist-latin-ext-wght-normal.woff2", "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF")}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#10372b;color:#fff;font-family:G,Arial,sans-serif;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
body:after{content:"";position:absolute;right:-120px;bottom:-120px;width:420px;height:420px;border-radius:50%;background:#f3efe6;opacity:.1}
.brand{display:flex;align-items:center;gap:16px;font-size:34px;font-weight:800;letter-spacing:-.02em}
.brand img{width:52px;height:52px;border-radius:8px;background:#fff;padding:3px;object-fit:contain}
.eyebrow{font-size:24px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#9fd8b8}
h1{margin-top:22px;font-size:78px;line-height:1.04;font-weight:700;letter-spacing:-.045em;max-width:980px}
.foot{font-size:26px;color:#f3efe6;opacity:.85}`

const slug = (path) => (path === "/" ? "home" : path.slice(1).replaceAll("/", "-"))
const escape = (value) => value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])
const work = await mkdtemp(join(tmpdir(), "graspit-og-"))
await mkdir("public/og", { recursive: true })

for (const [path, page] of Object.entries(pages)) {
  const home = path === "/"
  const heading = home ? "Svetainės vietiniam verslui, kurios aiškiai pristato paslaugas." : page.heading
  const html = `<!doctype html><meta charset="utf-8"><style>${css}</style>
<div class="brand"><img src="${logo}" alt="">GraspIT</div>
<div><p class="eyebrow">${escape(home ? "Svetainių kūrimas ir atnaujinimas" : page.label)}</p><h1>${escape(heading)}</h1></div>
<p class="foot">Svetainės ir el. parduotuvės verslui</p>`
  const file = join(work, `${slug(path)}.html`)
  await writeFile(file, html)
  const out = resolve(`public/og/${slug(path)}.png`)
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--window-size=1200,630", "--allow-file-access-from-files", "--virtual-time-budget=4000", `--screenshot=${out}`, pathToFileURL(file).href], { stdio: "ignore" })
  console.log("og:", slug(path))
}
console.log(`Wrote ${Object.keys(pages).length} cards to public/og/ (${(await readFile("public/og/home.png")).length} bytes for home).`)

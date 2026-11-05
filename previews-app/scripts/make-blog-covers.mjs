// Renders original blog cover illustrations (1600x900 PNG) in the GraspIT palette. Add a scene per new post.
// Usage (from previews-app, needs Playwright with Chromium): node scripts/make-blog-covers.mjs . /tmp/covers
// then convert to WebP into public/img/blog/<slug>.webp and <slug>-800.webp.
import { chromium } from "playwright"
import { pathToFileURL } from "node:url"
import { join } from "node:path"

const root = process.argv[2]
const out = process.argv[3]
const fonts = join(root, "node_modules/@fontsource-variable/geist/files")
const f = (n, r) => `@font-face{font-family:G;font-weight:100 900;src:url(${pathToFileURL(join(fonts, n)).href});unicode-range:${r}}`

const css = `${f("geist-latin-wght-normal.woff2", "U+0000-00FF,U+2000-206F,U+20AC")}
${f("geist-latin-ext-wght-normal.woff2", "U+0100-02FF,U+1E00-1EFF")}
*{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#10372b;--acc:#1f6b4f;--sand:#f3efe6;--mint:#bfe8d8;--mute:#5b6560;--line:#d9d3c5}
body{width:1600px;height:900px;overflow:hidden;font-family:G,Arial,sans-serif;color:var(--ink);background:var(--sand);position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:80px 80px;opacity:.55}
.blob{position:absolute;border-radius:50%}
.card{position:absolute;background:#fff;border:2px solid var(--ink);border-radius:18px;box-shadow:14px 14px 0 var(--ink)}
.dark{background:var(--ink);color:#fff}
.bar{height:14px;border-radius:7px;background:#e6e1d6}
.bar.g{background:var(--mint)}.bar.d{background:var(--ink)}
.chip{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:999px;border:2px solid var(--ink);font-weight:700;font-size:22px;background:#fff}
.browser-top{height:54px;border-bottom:2px solid var(--ink);display:flex;align-items:center;gap:10px;padding:0 20px}
.dot{width:14px;height:14px;border-radius:50%;border:2px solid var(--ink)}
.url{margin-left:18px;flex:1;height:30px;border-radius:15px;background:var(--sand);font-size:17px;display:flex;align-items:center;padding:0 16px;color:var(--mute)}
.tick{width:34px;height:34px;border-radius:50%;background:var(--acc);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;flex:none}
.label{font-size:20px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--acc)}`

const browser = (url, body, style) => `<div class="card" style="${style}"><div class="browser-top"><i class="dot"></i><i class="dot"></i><i class="dot"></i><div class="url">${url}</div></div>${body}</div>`

const scenes = {
  "kiek-kainuoja-svetaine": `
<div class="blob" style="width:620px;height:620px;background:var(--mint);right:-80px;top:-120px"></div>
<div class="card" style="left:150px;top:110px;width:640px;height:680px;padding:46px">
  <p class="label">Pasiūlymas</p>
  <h2 style="font-size:46px;letter-spacing:-.03em;margin:14px 0 30px">Svetainė verslui</h2>
  ${[["Dizainas ir struktūra","Vienkartinė"],["Iki 4 puslapių","Vienkartinė"],["Pritaikymas telefonams","Vienkartinė"],["Domenas","Kasmet"],["Talpinimas","Kas mėnesį"]].map(([a,b],i)=>`<div style="display:flex;justify-content:space-between;align-items:center;border-top:2px solid ${i?'#e6e1d6':'var(--ink)'};padding:20px 0;font-size:25px"><span style="font-weight:600">${a}</span><span style="font-size:19px;padding:6px 14px;border-radius:999px;background:${i>2?'var(--sand)':'var(--mint)'};font-weight:700">${b}</span></div>`).join("")}
  <div style="display:flex;justify-content:space-between;align-items:flex-end;border-top:3px solid var(--ink);padding-top:22px;margin-top:6px"><span style="font-size:24px;font-weight:700">Kūrimas</span><span style="font-size:64px;font-weight:800;letter-spacing:-.04em">nuo €350</span></div>
</div>
<div class="card dark" style="left:880px;top:200px;width:520px;height:250px;padding:40px">
  <p class="label" style="color:var(--mint)">Vienkartinės</p>
  <div style="display:flex;gap:14px;margin-top:26px;align-items:flex-end;height:110px">${[100,80,64,40].map(h=>`<div style="flex:1;height:${h}%;background:var(--mint);border-radius:8px"></div>`).join("")}</div>
</div>
<div class="card" style="left:960px;top:520px;width:480px;height:230px;padding:40px">
  <p class="label">Periodinės</p>
  <div style="display:flex;gap:14px;margin-top:26px;align-items:flex-end;height:96px">${Array.from({length:12},()=>`<div style="flex:1;height:34%;background:var(--acc);border-radius:6px"></div>`).join("")}</div>
</div>`,

  "svetaine-ar-socialiniai-tinklai": `
<div class="blob" style="width:560px;height:560px;background:var(--mint);left:-140px;bottom:-200px"></div>
<div class="card" style="left:190px;top:90px;width:360px;height:720px;border-radius:46px;padding:26px">
  <div style="height:16px;width:110px;border-radius:8px;background:var(--ink);margin:0 auto 26px"></div>
  ${[0,1,2].map(i=>`<div style="border:2px solid #e6e1d6;border-radius:18px;padding:16px;margin-bottom:16px"><div style="display:flex;gap:12px;align-items:center;margin-bottom:14px"><div style="width:40px;height:40px;border-radius:50%;background:${i==1?'var(--acc)':'var(--mint)'}"></div><div class="bar" style="width:140px"></div></div><div style="height:${i==0?110:60}px;border-radius:12px;background:var(--sand);margin-bottom:10px"></div><div style="display:flex;gap:16px;font-size:24px">♥ <span style="color:var(--mute)">💬</span></div></div>`).join("")}
</div>
<div style="position:absolute;left:600px;top:400px;font-size:90px;font-weight:300;color:var(--acc)">→</div>
${browser("jusuverslas.lt", `<div style="padding:40px 46px"><p class="label">Jūsų svetainė</p><div style="font-size:52px;font-weight:800;letter-spacing:-.04em;line-height:1.05;margin:18px 0 26px">Paslaugos, kainos<br>ir kontaktai vienoje vietoje</div><div style="display:flex;gap:14px;margin-bottom:34px"><span class="chip" style="background:var(--ink);color:#fff">Susisiekti</span><span class="chip">Paslaugos</span></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${[0,1,2].map(()=>`<div style="height:120px;border-radius:14px;background:var(--sand);border:2px solid #e6e1d6;padding:16px"><div class="bar g" style="width:60%;margin-bottom:12px"></div><div class="bar" style="width:85%"></div></div>`).join("")}</div></div>`, "left:740px;top:130px;width:700px;height:620px")}
<div class="chip" style="position:absolute;left:1180px;top:80px;background:var(--mint)">🔍 Randama Google</div>`,

  "techninis-seo-sarasas": `
<div class="blob" style="width:600px;height:600px;background:var(--mint);right:-120px;bottom:-180px"></div>
<div class="card" style="left:140px;top:90px;width:700px;height:720px;padding:46px">
  <p class="label">Techninis SEO</p>
  <h2 style="font-size:44px;letter-spacing:-.03em;margin:14px 0 22px">Kontrolinis sąrašas</h2>
  ${["Turinys matomas be JavaScript","Unikalūs title ir description","Viena H1 antraštė","sitemap.xml ir robots.txt","Mobilioji versija","Struktūriniai duomenys","HTTPS"].map((t,i)=>`<div style="display:flex;gap:18px;align-items:center;padding:13px 0;border-top:2px solid ${i?'#efeae0':'var(--ink)'};font-size:25px;font-weight:600"><span class="tick">✓</span>${t}</div>`).join("")}
</div>
<div class="card dark" style="left:920px;top:150px;width:520px;height:330px;padding:40px">
  <p class="label" style="color:var(--mint)">Core Web Vitals</p>
  <div style="display:flex;justify-content:space-between;margin-top:34px">${["LCP","INP","CLS"].map(k=>`<div style="text-align:center"><div style="width:112px;height:112px;border-radius:50%;border:12px solid var(--mint);border-right-color:#2f5a4b;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800">✓</div><div style="margin-top:16px;font-size:24px;font-weight:700">${k}</div></div>`).join("")}</div>
</div>
<div class="card" style="left:980px;top:560px;width:460px;height:190px;padding:34px;font-family:ui-monospace,Consolas,monospace;font-size:21px;line-height:1.6">
  <div><b>User-agent:</b> *</div><div><b>Allow:</b> /</div><div style="color:var(--acc)"><b>Sitemap:</b> /sitemap.xml</div>
</div>`,

  "geo-ai-paieska": `
<div class="blob" style="width:640px;height:640px;background:var(--mint);left:-160px;top:-200px"></div>
<div class="card" style="left:260px;top:130px;width:1080px;height:640px;padding:46px 54px">
  <div style="display:flex;align-items:center;gap:16px;margin-bottom:34px"><div style="width:52px;height:52px;border-radius:14px;background:var(--ink);color:var(--mint);display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">✦</div><p class="label">AI asistentas</p></div>
  <div style="margin-left:auto;width:fit-content;max-width:620px;background:var(--ink);color:#fff;border-radius:24px 24px 6px 24px;padding:24px 30px;font-size:30px;font-weight:600">Kas Klaipėdoje gali sukurti svetainę?</div>
  <div style="margin-top:34px;max-width:820px;background:var(--sand);border:2px solid var(--ink);border-radius:24px 24px 24px 6px;padding:30px 34px">
    <div style="font-size:27px;line-height:1.45;margin-bottom:20px">Svetainių kūrimo paslaugas regione siūlo kelios studijos. Pavyzdžiui, <mark style="background:var(--mint);padding:2px 8px;border-radius:6px;font-weight:700;color:var(--ink)">jūsų verslas</mark> kuria svetaines nuo €350 ir…</div>
    <div class="bar" style="width:90%;margin-bottom:12px"></div><div class="bar" style="width:70%;margin-bottom:26px"></div>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><span class="chip" style="font-size:19px;background:var(--mint)">[1] jusuverslas.lt</span><span class="chip" style="font-size:19px">[2] katalogas.lt</span><span class="chip" style="font-size:19px">[3] google.com/maps</span></div>
  </div>
</div>`,

  "kada-atnaujinti-svetaine": `
<div class="blob" style="width:560px;height:560px;background:var(--mint);right:-120px;top:-160px"></div>
${browser("senasverslas.lt", `<div style="padding:26px;filter:grayscale(1)"><div style="height:70px;background:#c9c4b8;margin-bottom:14px"></div><div style="display:grid;grid-template-columns:1fr 2fr;gap:14px">${`<div style="height:300px;background:#e2ddd2"></div><div>${Array.from({length:9},(_,i)=>`<div class="bar" style="width:${95-i*6}%;margin-bottom:12px;height:10px"></div>`).join("")}<div style="height:110px;background:#e2ddd2;margin-top:18px"></div></div>`}</div></div><div style="position:absolute;left:24px;bottom:24px" class="chip">Prieš</div>`, "left:120px;top:170px;width:620px;height:560px;box-shadow:10px 10px 0 #8a948f;border-color:#8a948f")}
<div style="position:absolute;left:770px;top:390px;font-size:90px;color:var(--acc)">→</div>
${browser("jusuverslas.lt", `<div style="padding:38px 42px"><div style="font-size:48px;font-weight:800;letter-spacing:-.04em;line-height:1.05;margin-bottom:22px">Aiški svetainė.<br>Telefonui ir kompiuteriui.</div><div style="display:flex;gap:12px;margin-bottom:30px"><span class="chip" style="background:var(--ink);color:#fff">Susisiekti</span><span class="chip">Darbai</span></div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">${[0,1].map(()=>`<div style="height:130px;border-radius:14px;background:var(--sand);border:2px solid #e6e1d6;padding:16px"><div class="bar g" style="width:55%;margin-bottom:12px"></div><div class="bar" style="width:85%"></div></div>`).join("")}</div></div><div style="position:absolute;left:24px;bottom:24px;background:var(--mint)" class="chip">Po</div>`, "left:880px;top:120px;width:620px;height:640px")}`,

  "google-verslo-profilis": `
<div style="position:absolute;inset:0;background:#e9e4d8"></div>
<svg width="1600" height="900" style="position:absolute;inset:0"><g stroke="#fff" stroke-width="26" fill="none" stroke-linecap="round"><path d="M-20 260 C 300 230, 520 330, 820 300 S 1300 200, 1640 260"/><path d="M-20 640 C 380 600, 700 700, 1100 620 S 1500 560, 1640 600"/><path d="M420 -20 C 460 260, 380 560, 470 920"/><path d="M1180 -20 C 1140 300, 1260 560, 1200 920"/></g><g stroke="#fff" stroke-width="12" fill="none"><path d="M-20 450 L 1640 470"/><path d="M800 -20 L 760 920"/></g><rect x="880" y="340" width="230" height="110" rx="10" fill="#bfe8d8"/><rect x="160" y="700" width="200" height="140" rx="10" fill="#bfe8d8"/></svg>
${[[300,180],[1350,380],[620,720]].map(([x,y])=>`<div style="position:absolute;left:${x}px;top:${y}px;width:40px;height:40px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#8a948f;border:3px solid #fff"></div>`).join("")}
<div style="position:absolute;left:770px;top:330px;width:76px;height:76px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--acc);border:5px solid #fff;box-shadow:0 10px 0 rgba(16,55,43,.25)"></div>
<div class="card" style="left:150px;top:170px;width:560px;height:530px;padding:40px">
  <div style="height:150px;border-radius:14px;background:linear-gradient(135deg,var(--mint),var(--sand));margin-bottom:26px"></div>
  <h2 style="font-size:40px;letter-spacing:-.03em">Jūsų verslas</h2>
  <p style="font-size:22px;color:var(--mute);margin:8px 0 18px">Paslaugos · Klaipėda</p>
  <p style="font-size:22px;margin-bottom:26px"><b style="color:var(--acc)">Atidaryta</b> · iki 18:00</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap"><span class="chip" style="background:var(--ink);color:#fff">Svetainė</span><span class="chip">Skambinti</span><span class="chip">Maršrutas</span></div>
</div>`,

  "kaip-pradeti-el-parduotuve": `
<div class="blob" style="width:600px;height:600px;background:var(--mint);left:-160px;bottom:-220px"></div>
${browser("jusuparduotuve.lt", `<div style="padding:32px 36px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:26px"><p class="label">Katalogas</p><span class="chip" style="font-size:19px">🛒 2</span></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px">${[0,1,2,3,4,5].map(i=>`<div style="border:2px solid #e6e1d6;border-radius:14px;padding:14px"><div style="height:120px;border-radius:10px;background:${i%2?'var(--sand)':'var(--mint)'};margin-bottom:12px"></div><div class="bar" style="width:80%;margin-bottom:10px"></div><div style="font-weight:800;font-size:22px">€${[24,39,18,52,31,45][i]}</div></div>`).join("")}</div></div>`, "left:130px;top:100px;width:820px;height:700px")}
<div class="card dark" style="left:1030px;top:150px;width:420px;height:260px;padding:36px">
  <p class="label" style="color:var(--mint)">Apmokėjimas</p>
  <div style="display:flex;flex-direction:column;gap:14px;margin-top:22px">${["Elektroninė bankininkystė","Mokėjimo kortelė"].map((t,i)=>`<div style="display:flex;gap:14px;align-items:center;font-size:23px;font-weight:600"><span style="width:26px;height:26px;border-radius:50%;border:3px solid var(--mint);${i?'':'background:var(--mint)'}"></span>${t}</div>`).join("")}</div>
</div>
<div class="card" style="left:1060px;top:480px;width:390px;height:280px;padding:34px">
  <p class="label">Pristatymas</p>
  <div style="display:flex;gap:22px;align-items:center;margin-top:26px"><div style="width:120px;height:110px;background:#d8b98a;border:3px solid var(--ink);border-radius:10px;position:relative"><div style="position:absolute;left:50%;top:0;bottom:0;width:20px;margin-left:-10px;background:#c4a06b"></div></div><div style="font-size:23px;font-weight:600;line-height:1.5">Paštomatas<br><span style="color:var(--mute)">arba kurjeris</span></div></div>
</div>`,
}

const browserApp = await chromium.launch()
const page = await browserApp.newPage({ viewport: { width: 1600, height: 900 } })
for (const [slug, body] of Object.entries(scenes)) {
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>${css}</style><div class="grid"></div>${body}`, { waitUntil: "load" })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(out, `${slug}.png`) })
  console.log("cover:", slug)
}
await browserApp.close()

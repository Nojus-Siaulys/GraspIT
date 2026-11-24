import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createServer } from "node:http"
import { test } from "node:test"
import { createContactHandler } from "./contact.ts"
import { briefText, completeInquiry, contentNeeds, draftInquiry, inquiryFromParams, inquiryServices } from "../src/site/inquiryDraft.ts"

// Every service page sends its own `service` name to the contact form. The names are read from the page data
// so a new service cannot be added without the server and the questionnaire knowing it.
const pageServiceNames = [...readFileSync(new URL("../src/site/serviceDetails.ts", import.meta.url), "utf8").matchAll(/^\s{4}service: "([^"]+)"/gm)].map(match => match[1])

test("the service pages send fourteen different service names", () => {
  assert.equal(pageServiceNames.length, 14)
  assert.equal(new Set(pageServiceNames).size, 14)
})

test("the server accepts every service name a service page sends", async () => {
  const config = { key: "test-only-key", from: "GraspIT <sender@example.invalid>", to: "owner@example.invalid" }
  const rejected: string[] = []
  for (const service of pageServiceNames) {
    // A fresh handler per name, so the five-per-minute limit of one handler never decides the result.
    const handler = createContactHandler(config, async () => new Response(JSON.stringify({ id: "mock-id" }), { status: 200 }))
    const server = createServer((req, res) => { void handler(req, res) })
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve))
    const address = server.address()
    assert.ok(address && typeof address === "object")
    const url = `http://127.0.0.1:${address.port}`
    try {
      const body = { name: "Testas", email: "visitor@example.invalid", service, budget: "", message: "Tai yra tik izoliuotas formos bandymas.", website: "" }
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Origin: url }, body: JSON.stringify(body) })
      if (response.status !== 200) rejected.push(`${service} (${response.status})`)
    } finally { server.closeAllConnections(); await new Promise<void>(resolve => server.close(() => resolve())) }
  }
  assert.deepEqual(rejected, [])
})

test("the questionnaire reaches every service the pages send", () => {
  assert.deepEqual(Object.values(inquiryServices).sort(), [...pageServiceNames].sort())
})

test("each questionnaire choice drafts a first message about its own service", () => {
  const about: Record<string, RegExp> = {
    website: /svetain/i, shop: /parduotuv/i, redesign: /atnaujinti/i, automation: /automatiz|rankin/i,
    apps: /program/i, integrations: /integracij/i, seo: /SEO/, motion: /judes/i, ads3d: /3D/, social: /socialin/i,
    geo: /ChatGPT|AI asistent/, chatbot: /asistent/i, analytics: /analitik/i, bots: /bot/i,
  }
  assert.deepEqual(Object.keys(inquiryServices).sort(), Object.keys(about).sort())
  for (const need of Object.keys(about)) {
    const preparation = ["website", "shop", "redesign"].includes(need) ? "some" : "several"
    const answers = [need, preparation, "later"]
    assert.equal(completeInquiry(answers), true, `${need} should be complete`)
    const text = draftInquiry(answers)
    assert.ok(text.startsWith("Sveiki,"), need)
    assert.ok(text.length > 150 && text.length < 2000, need)
    assert.doesNotMatch(text, /undefined|@|€/, need)
    assert.match(text, about[need], need)
  }
})

test("answers typed on any service page reach the contact form", () => {
  const missing = pageServiceNames.filter(service => !briefText(JSON.stringify({ service, answers: [["Kas jus domina?", "Pavyzdinis atsakymas"]] }), service).startsWith("Sveiki,"))
  assert.deepEqual(missing, [])
})

test("a link from the questionnaire result opens the contact form with the same service and answers", () => {
  for (const need of Object.keys(inquiryServices)) {
    const preparation = contentNeeds.includes(need) ? "all" : "clear"
    const { answers, service } = inquiryFromParams(new URLSearchParams({ need, preparation, timing: "soon" }))
    assert.deepEqual(answers, [need, preparation, "soon"], need)
    assert.equal(service, inquiryServices[need], need)
  }
})

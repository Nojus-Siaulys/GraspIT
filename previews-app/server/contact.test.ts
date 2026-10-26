import assert from "node:assert/strict"
import { createServer } from "node:http"
import { test } from "node:test"
import { createContactHandler } from "./contact.ts"

const config = { key: "test-only-key", from: "GraspIT <sender@example.invalid>", to: "owner@example.invalid" }
const valid = { name: "Testas", email: "visitor@example.invalid", service: "Svetainė", budget: "Dar nežinau", message: "Tai yra tik izoliuotas formos bandymas.", website: "" }
async function withApi(handler: ReturnType<typeof createContactHandler>, run: (url: string) => Promise<void>) {
  const server = createServer((req, res) => { void handler(req, res) })
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve))
  const address = server.address()
  assert.ok(address && typeof address === "object")
  try { await run(`http://127.0.0.1:${address.port}`) }
  finally { server.closeAllConnections(); await new Promise<void>(resolve => server.close(() => resolve())) }
}
const post = (url: string, body: unknown, origin = url) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Origin: origin }, body: JSON.stringify(body) })

test("unconfigured delivery never reports successful submission", async () => {
  await withApi(createContactHandler({}, async () => { throw new Error("Transport must not be called") }), async url => {
    assert.deepEqual(await (await fetch(url)).json(), { enabled: false })
    assert.equal((await post(url, valid)).status, 503)
  })
})
test("valid request goes only to the configured inbox, with the visitor as reply-to", async () => {
  let calls = 0
  await withApi(createContactHandler(config, async (url, init) => {
    calls++; assert.equal(url, "https://api.resend.com/emails")
    const body = JSON.parse(String(init?.body))
    assert.deepEqual(body.to, [config.to]); assert.equal(body.reply_to, valid.email)
    assert.ok(body.text.includes(valid.message)); assert.equal(body.html, undefined)
    return new Response(JSON.stringify({ id: "mock-id" }), { status: 200 })
  }), async url => {
    assert.deepEqual(await (await fetch(url)).json(), { enabled: true })
    assert.deepEqual(await (await post(url, valid)).json(), { sent: true })
    assert.equal(calls, 1)
  })
})
test("invalid fields, honeypot, foreign origin, and oversized payload never reach the email service", async () => {
  await withApi(createContactHandler(config, async () => { throw new Error("Transport must not be called") }), async url => {
    assert.equal((await post(url, { ...valid, email: "bad" })).status, 400)
    assert.equal((await post(url, { ...valid, service: "Unexpected" })).status, 400)
    assert.equal((await post(url, { ...valid, website: "spam" })).status, 400)
    assert.equal((await post(url, valid, "https://other.example.invalid")).status, 403)
    assert.equal((await post(url, { ...valid, message: "a".repeat(17000) })).status, 413)
  })
})
test("provider errors never return a success response", async () => {
  await withApi(createContactHandler(config, async () => new Response("rejected", { status: 403 })), async url => {
    const response = await post(url, valid)
    assert.equal(response.status, 502); assert.equal(((await response.json()) as { sent?: boolean }).sent, undefined)
  })
})
test("the sixth attempt within a minute is rate limited", async () => {
  await withApi(createContactHandler(config, async () => new Response("{}")), async url => {
    for (let index = 0; index < 5; index++) assert.equal((await post(url, valid)).status, 200)
    const response = await post(url, valid)
    assert.equal(response.status, 429); assert.equal(response.headers.get("retry-after"), "60")
  })
})

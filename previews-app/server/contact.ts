import type { IncomingMessage, ServerResponse } from "node:http"

export type ContactConfig = { key?: string; from?: string; to?: string; origin?: string }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const services = ["Svetainė", "El. parduotuvė", "Svetainės atnaujinimas", "AI automatizacija", "Dar nežinau"]
export function createContactHandler(config: ContactConfig, send: typeof fetch = fetch) {
  const ready = Boolean(config.key && config.from && config.to && emailPattern.test(config.to))
  const attempts = new Map<string, { count: number; until: number }>()
  return async (req: IncomingMessage & { body?: unknown }, res: ServerResponse) => {
    const json = (status: number, data: object) => { res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }); res.end(JSON.stringify(data)) }
    if (req.method === "GET") return json(200, { enabled: ready })
    if (req.method !== "POST") { res.setHeader("Allow", "GET, POST"); return json(405, { error: "Šis veiksmas negalimas." }) }
    const origin = req.headers.origin
    let sameOrigin = false
    try { sameOrigin = Boolean(origin && (new URL(origin).host === req.headers.host || new URL(origin).origin === config.origin)) } catch { /* Malformed origins are refused. */ }
    if (!sameOrigin) return json(403, { error: "Atnaujinkite puslapį ir bandykite dar kartą." })
    if (!ready) return json(503, { error: "Užklausų siuntimas dar neprijungtas. Aprašymą galite išsisaugoti savo įrenginyje." })
    if (!req.headers["content-type"]?.startsWith("application/json")) return json(415, { error: "Netinkamas užklausos formatas." })
    if (Number(req.headers["content-length"] ?? 0) > 16384) return json(413, { error: "Aprašymas per ilgas." })
    const now = Date.now()
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key)
    const address = process.env.VERCEL ? String(req.headers["x-vercel-forwarded-for"] ?? req.socket.remoteAddress) : req.socket.remoteAddress ?? "local"
    const entry = attempts.get(address) ?? { count: 0, until: now + 60000 }
    if (entry.count >= 5 || (!attempts.has(address) && attempts.size >= 1000)) { res.setHeader("Retry-After", "60"); return json(429, { error: "Per daug bandymų. Palaukite minutę ir bandykite dar kartą." }) }
    entry.count++; attempts.set(address, entry)
    let body: unknown
    try {
      if (req.body !== undefined) body = req.body
      else {
        const chunks: Buffer[] = []
        let length = 0
        await new Promise<void>((resolve, reject) => {
          req.on("data", (chunk: Buffer) => { length += chunk.length; if (length <= 16384) chunks.push(chunk) })
          req.on("end", resolve); req.on("error", reject)
        })
        if (length > 16384) return json(413, { error: "Aprašymas per ilgas." })
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"))
      }
    } catch { return json(400, { error: "Nepavyko perskaityti užklausos. Bandykite dar kartą." }) }
    if (!body || typeof body !== "object" || Array.isArray(body)) return json(400, { error: "Patikrinkite formos laukus." })
    const data = body as Record<string, unknown>
    const field = (key: string) => typeof data[key] === "string" ? data[key].trim() : ""
    if (field("website")) return json(400, { error: "Užklausos pateikti nepavyko." })
    const name = field("name"), email = field("email"), service = field("service"), budget = field("budget"), message = field("message")
    if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name) || !emailPattern.test(email) || email.length > 200 || !services.includes(service) || budget.length > 100 || message.length < 10 || message.length > 3000) return json(400, { error: "Patikrinkite vardą, el. paštą ir projekto aprašymą (10–3000 simbolių)." })
    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(10000),
        headers: { Authorization: `Bearer ${config.key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: config.from, to: [config.to], reply_to: email, subject: `GraspIT užklausa: ${service}`, text: `Vardas: ${name}\nEl. paštas: ${email}\nPaslauga: ${service}\nBiudžetas: ${budget || "Nenurodytas"}\n\n${message}` }),
      })
      if (!response.ok) return json(502, { error: "Šiuo metu išsiųsti nepavyko. Jūsų įrašai liko formoje. Bandykite dar kartą arba išsisaugokite aprašymą." })
      return json(200, { sent: true })
    } catch { return json(502, { error: "Nepavyko patvirtinti išsiuntimo. Įrašai liko formoje. Bandykite dar kartą vėliau." }) }
  }
}

export const contactConfig = (): ContactConfig => ({ key: process.env.RESEND_API_KEY, from: process.env.CONTACT_FROM, to: process.env.CONTACT_TO, origin: process.env.SITE_URL })

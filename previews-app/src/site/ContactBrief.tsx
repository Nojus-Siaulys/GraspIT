import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowRight, Check, Download } from "lucide-react"

const serviceOptions = ["Svetainė", "El. parduotuvė", "Svetainės atnaujinimas", "AI automatizacija", "Dar nežinau"]
function initialBrief() {
  if (typeof window === "undefined") return { service: "Dar nežinau", message: "", selected: false }
  const params = new URLSearchParams(window.location.search)
  const service = params.get("paslauga") ?? "Dar nežinau"
  const notes = [["Turinys", params.get("turinys")], ["Darbo procesas", params.get("procesas")], ["Norima darbų pradžia", params.get("terminas")], ["Dominantis pavyzdys", params.get("pavyzdys")], ["Paketas", params.get("paketas")]].filter(([, value]) => value).map(([label, value]) => `${label}: ${value!.slice(0, 160)}`)
  return { service: serviceOptions.includes(service) ? service : "Dar nežinau", message: notes.length ? notes.join("\n") + "\n\nApie mano projektą:\n" : "", selected: serviceOptions.includes(service) && params.has("paslauga") }
}

export function ContactBrief() {
  const [initial] = useState(initialBrief)
  const [service, setService] = useState(initial.service)
  const [enabled, setEnabled] = useState(false)
  const [checked, setChecked] = useState(false)
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [notice, setNotice] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const abort = new AbortController()
    fetch("/api/contact", { signal: abort.signal }).then(response => response.ok ? response.json() : { enabled: false }).then(data => { setEnabled(data.enabled === true); setChecked(true) }).catch(() => { if (!abort.signal.aborted) setChecked(true) })
    return () => abort.abort()
  }, [])
  function read() {
    const data = new FormData(formRef.current!)
    return { name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), service: String(data.get("service") ?? ""), budget: String(data.get("budget") ?? ""), message: String(data.get("message") ?? ""), website: String(data.get("website") ?? "") }
  }
  function download() {
    const data = read()
    const text = `GraspIT · Projekto aprašymas\n\nVardas: ${data.name}\nEl. paštas: ${data.email}\nPaslauga: ${data.service}\nBiudžetas: ${data.budget}\n\n${data.message}`
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }))
    const link = document.createElement("a"); link.href = url; link.download = "graspit-projekto-aprasymas.txt"; link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setNotice("Aprašymas atsisiųstas į jūsų įrenginį. Užklausa niekur neišsiųsta.")
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!enabled || busy) return
    setBusy(true); setNotice("")
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(read()), signal: AbortSignal.timeout(15000) })
      const result = await response.json()
      if (!response.ok || result.sent !== true) { setNotice(result.error || "Išsiųsti nepavyko. Jūsų įrašai liko formoje."); return }
      setSent(true)
    } catch { setNotice("Nepavyko patvirtinti išsiuntimo. Jūsų įrašai liko formoje. Bandykite vėliau arba išsisaugokite aprašymą.") }
    finally { setBusy(false) }
  }
  const field = "mt-2 min-h-12 w-full rounded-md border border-foreground/30 bg-background px-3 py-3 text-base"
  if (sent) return <div className="ux-panel mt-8 bg-secondary p-6" role="status"><Check className="size-6" /><h3 className="mt-4 text-2xl font-semibold">Užklausa išsiųsta.</h3><p className="mt-3 leading-relaxed">Ačiū, kad papasakojote apie projektą. Susisieksime jūsų nurodytu el. paštu ir susitarsime dėl pirmo pokalbio.</p><a href="/procesas/" className="ux-text-link mt-5">Kas bus toliau<ArrowRight className="size-4" /></a></div>
  return <form ref={formRef} onSubmit={submit} className="mt-8 space-y-5 border-t border-foreground/20 pt-6" aria-labelledby="brief-heading">
    <h3 id="brief-heading" className="text-2xl font-bold tracking-tight">Jūsų projekto pradžia</h3>
    {initial.selected && <p className="ux-panel bg-secondary p-4 text-sm leading-relaxed">Jūsų pasirinkimas perkeltas į formą. Galite jį papildyti arba pakeisti.</p>}
    {checked && !enabled && <p className="border-l-2 border-foreground/40 pl-4 text-sm leading-relaxed text-muted-foreground">Užklausų siuntimą dar ruošiame. Kol kas galite paruošti ir išsisaugoti projekto aprašymą — jis mums nebus išsiųstas.</p>}
    <fieldset disabled={busy} className="space-y-5 disabled:opacity-60">
      <legend className="sr-only">Projekto informacija</legend>
      <div className="grid gap-5 sm:grid-cols-2"><label className="block font-medium" htmlFor="brief-name">Vardas<input id="brief-name" name="name" autoComplete="name" required minLength={2} maxLength={100} className={field} /></label><label className="block font-medium" htmlFor="brief-email">El. paštas<input id="brief-email" name="email" type="email" autoComplete="email" required maxLength={200} className={field} /></label></div>
      <label className="block font-medium" htmlFor="brief-service">Kas domina?<select id="brief-service" name="service" value={service} onChange={event => setService(event.target.value)} className={field}>{serviceOptions.map(item => <option key={item}>{item}</option>)}</select></label>
      <label className="block font-medium" htmlFor="brief-budget">Numatytas biudžetas <span className="text-sm font-normal text-muted-foreground">(neprivaloma)</span><input id="brief-budget" name="budget" placeholder="Galite nurodyti intervalą arba dar nežinoti" maxLength={100} className={field} /></label>
      <label className="block font-medium" htmlFor="brief-project">Ką norėtumėte išspręsti?<textarea id="brief-project" name="message" defaultValue={initial.message} required minLength={10} maxLength={3000} rows={6} aria-describedby="brief-help" placeholder={service === "Svetainės atnaujinimas" ? "Dabartinės svetainės adresas ir kas joje netenkina…" : "Jūsų veikla, kam skirta svetainė ir ko iš jos tikitės…"} className={field} /></label>
      <div className="ux-honeypot" aria-hidden="true"><label htmlFor="brief-website">Palikite tuščią<input id="brief-website" name="website" autoComplete="off" tabIndex={-1} /></label></div>
      <p id="brief-help" className="text-xs leading-relaxed text-muted-foreground">Vardas, el. paštas ir aprašymas reikalingi užklausai. Duomenis naudosime atsakymui apie jūsų projektą. Slaptažodžių ar kitų slaptų duomenų nesiųskite.</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">{enabled && <button type="submit" disabled={busy} className="inline-flex min-h-12 items-center gap-3 rounded-md bg-foreground px-5 py-3 font-semibold text-white disabled:opacity-50">{busy ? "Siunčiama…" : "Siųsti užklausą"}<ArrowRight className="size-4" /></button>}<button type="button" onClick={download} className="ux-text-link"><Download className="size-4" />{enabled ? "Išsisaugoti kopiją" : "Atsisiųsti projekto aprašymą"}</button></div>
    </fieldset>
    <p role="status" aria-live="polite" className="text-sm leading-relaxed">{notice}</p>
    <noscript>Formai reikia JavaScript. Naudokite paskelbtus tiesioginius kontaktus.</noscript>
  </form>
}

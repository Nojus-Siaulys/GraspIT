import { useEffect, useRef, useState, type FormEvent } from "react"
import { ArrowRight, Check, Download } from "lucide-react"
import { PackageFinder } from "./PackageFinder"
import { completeInquiry, draftInquiry, inquiryFromParams, inquiryServices, inquirySummary } from "./inquiryDraft"

const serviceOptions = ["Svetainė", "El. parduotuvė", "Svetainės atnaujinimas", "AI automatizacija", "Dar nežinau"]
function initialBrief() {
  return inquiryFromParams(new URLSearchParams(typeof window === "undefined" ? "" : window.location.search))
}

export function ContactBrief() {
  const [initial] = useState(initialBrief)
  const [service, setService] = useState(initial.service)
  const [answers, setAnswers] = useState(initial.answers)
  const [message, setMessage] = useState(() => draftInquiry(initial.answers, initial.context))
  const [wizard, setWizard] = useState(!completeInquiry(initial.answers))
  const [editing, setEditing] = useState(!completeInquiry(initial.answers))
  const [dirty, setDirty] = useState(false)
  const [pendingDraft, setPendingDraft] = useState("")
  const headingRef = useRef<HTMLHeadingElement>(null)
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
    const extras = [data.get("url") ? `Dabartinė svetainė: ${String(data.get("url"))}` : "", String(data.get("extra") ?? "")].filter(Boolean)
    return { name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), service: String(data.get("service") ?? ""), budget: String(data.get("budget") ?? ""), message: [message, ...extras].filter(Boolean).join("\n\n"), website: String(data.get("website") ?? "") }
  }
  function finish(next: string[]) {
    const draft = draftInquiry(next, initial.context)
    setAnswers(next); setService(inquiryServices[next[0]]); setWizard(false)
    if (dirty) setPendingDraft(draft)
    else { setMessage(draft); setEditing(false) }
    requestAnimationFrame(() => { headingRef.current?.focus({ preventScroll: true }); headingRef.current?.scrollIntoView({ behavior: "auto", block: "start" }) })
  }
  function download() {
    const data = read()
    if (data.message.length > 3000) { setNotice("Aprašymas su papildymais gali būti iki 3000 simbolių. Sutrumpinkite tekstą."); return }
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
      const data = read()
      if (data.message.length < 10 || data.message.length > 3000) { setNotice("Aprašymas su papildymais turi būti nuo 10 iki 3000 simbolių."); setEditing(true); return }
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), signal: AbortSignal.timeout(15000) })
      const result = await response.json()
      if (!response.ok || result.sent !== true) { setNotice(result.error || "Išsiųsti nepavyko. Jūsų įrašai liko formoje."); return }
      setSent(true)
    } catch { setNotice("Nepavyko patvirtinti išsiuntimo. Jūsų įrašai liko formoje. Bandykite vėliau arba išsisaugokite aprašymą.") }
    finally { setBusy(false) }
  }
  const field = "mt-2 min-h-12 w-full rounded-md border border-foreground/30 bg-background px-3 py-3 text-base"
  if (sent) return <div className="ux-panel mt-8 bg-secondary p-6" role="status"><Check className="size-6" /><h3 className="mt-4 text-2xl font-semibold">Užklausa išsiųsta.</h3><p className="mt-3 leading-relaxed">Ačiū, kad papasakojote apie projektą. Susisieksime jūsų nurodytu el. paštu ir susitarsime dėl pirmo pokalbio.</p><a href="/procesas/" className="ux-text-link mt-5">Kas bus toliau<ArrowRight className="size-4" /></a></div>
  return <div>
    <section hidden={!wizard} aria-labelledby="contact-finder-heading">
      <p className="ux-eyebrow">Lengvesnė užklausos pradžia</p>
      <h2 id="contact-finder-heading" className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Nereikia galvoti, ką parašyti.</h2>
      <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">Atsakykite į 3 trumpus klausimus — iš jūsų pasirinkimų paruošime projekto aprašymą. Beliks įrašyti vardą ir el. paštą. Tekstą galėsite pataisyti.</p>
      <div className="mt-6">{wizard && <PackageFinder initialAnswers={answers} onComplete={finish} />}</div>
      <button type="button" onClick={() => setWizard(false)} className="mt-4 min-h-11 text-sm font-semibold underline underline-offset-4">{message ? "Grįžti į formą nekeičiant aprašymo" : "Praleisti klausimus ir pildyti pačiam"}</button>
    </section>
    <form hidden={wizard} ref={formRef} onSubmit={submit} className="space-y-5" aria-labelledby="brief-heading">
      <p className="ux-eyebrow">{completeInquiry(answers) ? "Liko tik kontaktai" : "Jūsų projekto pradžia"}</p>
      <h2 ref={headingRef} tabIndex={-1} id="brief-heading" className="scroll-mt-28 text-3xl font-bold tracking-tight outline-none md:text-4xl">{completeInquiry(answers) ? "Aprašymą paruošėme. Kaip su jumis susisiekti?" : "Papasakokite apie savo projektą."}</h2>
      <p className="leading-relaxed text-muted-foreground">{completeInquiry(answers) ? "Panaudojome klausimyno atsakymus. Jei tekstas tinka, nieko papildomai rašyti nereikia — užtenka jūsų vardo ir el. pašto." : "Galite parašyti savais žodžiais arba pasinaudoti trimis klausimais — jie padės paruošti aprašymą už jus."}</p>
      <div className="rounded-md border border-foreground/20 bg-secondary p-4">
        {completeInquiry(answers) && <><p className="text-sm font-semibold">Jūsų pasirinkimai</p><ul className="mt-3 flex flex-wrap gap-2">{inquirySummary(answers).map(label => <li key={label} className="rounded border border-foreground/20 bg-background px-3 py-1 text-xs">{label}</li>)}</ul></>}
        <button type="button" onClick={() => setWizard(true)} className="min-h-11 text-sm font-semibold underline underline-offset-4">{completeInquiry(answers) ? "Pakeisti klausimyno atsakymus" : "Padėti man užpildyti aprašymą"}</button>
      </div>
      {pendingDraft && <div className="rounded-md border border-foreground/30 bg-secondary p-4" role="status"><p className="text-sm leading-relaxed">Jūsų pataisytą tekstą išsaugojome. Ar pakeisti jį nauju aprašymu pagal atnaujintus atsakymus?</p><div className="mt-3 flex flex-wrap gap-4"><button type="button" onClick={() => { setMessage(pendingDraft); setPendingDraft(""); setDirty(false); setEditing(false) }} className="min-h-11 text-sm font-semibold underline">Naudoti naują aprašymą</button><button type="button" onClick={() => setPendingDraft("")} className="min-h-11 text-sm font-semibold underline">Palikti mano tekstą</button></div></div>}
      <fieldset disabled={busy} className="space-y-5 disabled:opacity-60">
        <legend className="sr-only">Projekto informacija</legend>
        <div className="grid gap-5 sm:grid-cols-2"><label className="block font-medium" htmlFor="brief-name">Jūsų vardas<input id="brief-name" name="name" autoComplete="name" placeholder="Vardas" required minLength={2} maxLength={100} className={field} /></label><label className="block font-medium" htmlFor="brief-email">El. paštas<input id="brief-email" name="email" type="email" autoComplete="email" placeholder="jusu@pastas.lt" required maxLength={200} className={field} /></label></div>
        {completeInquiry(answers) ? <input type="hidden" name="service" value={service} /> : <label className="block font-medium" htmlFor="brief-service">Kas domina?<select id="brief-service" name="service" value={service} onChange={event => setService(event.target.value)} className={field}>{serviceOptions.map(item => <option key={item}>{item}</option>)}</select></label>}
        <div className="rounded-md border border-foreground/25 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-semibold">Jūsų projekto aprašymas</h3>{completeInquiry(answers) && <span className="text-xs text-muted-foreground">Paruoštas iš jūsų atsakymų</span>}</div>
          {!editing && <p className="mt-4 whitespace-pre-line text-sm leading-7">{message}</p>}
          <label hidden={!editing} className="mt-3 block text-sm font-medium" htmlFor="brief-project">{completeInquiry(answers) ? "Pataisykite tekstą, jei norite" : "Ką norėtumėte sukurti arba išspręsti?"}<textarea id="brief-project" name="message" value={message} onChange={event => { setMessage(event.target.value); setDirty(true) }} required={editing} minLength={10} maxLength={3000} rows={8} aria-describedby="brief-help" placeholder="Trumpai apie jūsų veiklą ir norimą rezultatą…" className={field} /></label>
          {message && <button type="button" onClick={() => setEditing(!editing)} className="mt-3 min-h-11 text-sm font-semibold underline underline-offset-4">{editing ? "Baigti redaguoti" : "Noriu pataisyti tekstą"}</button>}
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{completeInquiry(answers) ? "Jei aprašymas tinka, galite jo nekeisti." : "Užtenka kelių sakinių. Techninių žinių nereikia."}</p>
        </div>
        <details className="border-y border-foreground/20 py-4"><summary className="cursor-pointer py-2 text-sm font-semibold">Pridėti daugiau informacijos (neprivaloma)</summary><div className="mt-4 space-y-4">
          <label className="block font-medium" htmlFor="brief-url">Dabartinės svetainės adresas<input id="brief-url" name="url" type="url" placeholder="https://" maxLength={250} className={field} /></label>
          <label className="block font-medium" htmlFor="brief-budget">Numatytas biudžetas<input id="brief-budget" name="budget" placeholder="Galite nurodyti intervalą arba palikti tuščią" maxLength={100} className={field} /></label>
          <label className="block font-medium" htmlFor="brief-extra">Kas dar svarbu?<textarea id="brief-extra" name="extra" rows={3} maxLength={1000} placeholder="Jūsų veikla, norimos funkcijos ar patinkanti svetainė…" className={field} /></label>
        </div></details>
        <div className="ux-honeypot" aria-hidden="true"><label htmlFor="brief-website">Palikite tuščią<input id="brief-website" name="website" autoComplete="off" tabIndex={-1} /></label></div>
        <p id="brief-help" className="text-xs leading-relaxed text-muted-foreground">Vardą, el. paštą ir projekto aprašymą naudosime atsakymui apie jūsų projektą. Slaptų duomenų nesiųskite.</p>
        {checked && !enabled && <p id="brief-unavailable" className="border-l-2 border-foreground/40 pl-4 text-sm leading-relaxed text-muted-foreground">Užklausų siuntimą dar ruošiame. Kol kas galite išsisaugoti aprašymą — jis mums nebus išsiųstas.</p>}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3"><button type="submit" disabled={busy || !enabled} aria-describedby={!enabled && checked ? "brief-unavailable" : undefined} className="inline-flex min-h-12 items-center gap-3 rounded-md bg-foreground px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Siunčiama…" : "Pateikti užklausą"}<ArrowRight className="size-4" /></button><button type="button" onClick={download} className="ux-text-link"><Download className="size-4" />{enabled ? "Išsisaugoti kopiją" : "Atsisiųsti projekto aprašymą"}</button></div>
      </fieldset>
      <p role="status" aria-live="polite" className="text-sm leading-relaxed">{notice}</p>
      <noscript>Formai reikia JavaScript. Naudokite paskelbtus tiesioginius kontaktus.</noscript>
    </form>
  </div>
}

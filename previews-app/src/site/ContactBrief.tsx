import { useState, type FormEvent } from "react"
import { contact } from "./settings"

export function ContactBrief() {
  const [notice, setNotice] = useState("")
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const brief = ["GraspIT · Projekto aprašymas", ...["Vardas", "El. paštas", "Paslauga", "Biudžetas", "Projektas"].map(key => key + ": " + String(data.get(key) ?? "").trim())].join("\n\n")
    if (contact.email) {
      window.location.href = "mailto:" + contact.email + "?subject=" + encodeURIComponent("Naujas projektas · GraspIT") + "&body=" + encodeURIComponent(brief)
      setNotice("Atidaromas el. pašto juodraštis. Peržiūrėkite jį ir išsiųskite savo pašto programoje. Svetainė užklausos neišsiuntė.")
    } else {
      const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }))
      const link = document.createElement("a")
      link.href = url
      link.download = "graspit-projekto-aprasymas.txt"
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setNotice("Aprašymas paruoštas atsisiųsti. Jis niekur neišsiųstas. Galėsite jį panaudoti, kai paskelbsime studijos kontaktus.")
    }
  }
  const field = "mt-2 min-h-12 w-full rounded-md border border-foreground/40 bg-background px-3 py-3 text-base"
  return <form onSubmit={prepare} className="mt-8 space-y-5 border-t border-foreground/20 pt-6" aria-labelledby="brief-heading">
    <h3 id="brief-heading" className="text-xl font-bold">Paruoškite projekto aprašymą</h3>
    <p id="brief-help" className="text-sm leading-relaxed text-muted-foreground">{contact.email ? "Paruošime laišką jūsų pašto programoje. Išsiuntimą patvirtinsite patys." : "Kontaktai dar ruošiami. Galite užpildyti ir atsisiųsti aprašymą savo įrenginyje."} Duomenys į serverį nesiunčiami ir naršyklėje nesaugomi.</p>
    <label className="block font-medium" htmlFor="brief-name">Vardas <span className="font-normal">(būtina)</span><input id="brief-name" name="Vardas" autoComplete="name" required maxLength={100} className={field} /></label>
    <label className="block font-medium" htmlFor="brief-email">El. paštas <span className="font-normal">(būtina)</span><input id="brief-email" name="El. paštas" type="email" autoComplete="email" required maxLength={200} className={field} /></label>
    <label className="block font-medium" htmlFor="brief-service">Kas domina?<select id="brief-service" name="Paslauga" className={field}><option>Svetainė</option><option>El. parduotuvė</option><option>AI automatizacija</option><option>Dar nežinau</option></select></label>
    <label className="block font-medium" htmlFor="brief-budget">Biudžetas <span className="font-normal">(neprivaloma)</span><input id="brief-budget" name="Biudžetas" maxLength={100} className={field} /></label>
    <label className="block font-medium" htmlFor="brief-project">Trumpai apie projektą <span className="font-normal">(būtina)</span><textarea id="brief-project" name="Projektas" required minLength={10} maxLength={2000} rows={5} aria-describedby="brief-help" className={field} /></label>
    <button type="submit" className="min-h-12 rounded-md bg-foreground px-5 py-3 font-semibold text-background">{contact.email ? "Paruošti el. laišką" : "Atsisiųsti aprašymą"}</button>
    <p role="status" aria-live="polite" className="text-sm leading-relaxed">{notice}</p>
    <noscript>Aprašymo paruošimui reikia JavaScript. Jei kontaktai paskelbti, naudokite tiesioginę el. pašto arba telefono nuorodą.</noscript>
  </form>
}

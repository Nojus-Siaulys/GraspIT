import { useState } from "react"
import { ArrowRight, RotateCcw } from "lucide-react"
import { prices } from "./pricing"
import { siteCopy } from "./settings"

type Need = "website" | "shop" | "redesign" | "automation"
type Content = "all" | "some" | "none"
type Timing = "soon" | "later" | "unsure"

const questions = [
  { key: "need", title: "Ko jums reikia?", options: [["website", "Naujos svetainės"], ["shop", "Parduoti internetu"], ["redesign", "Atnaujinti turimą svetainę"], ["automation", "Sutaupyti laiko automatizuojant darbus"]] },
  { key: "content", title: "Kiek turinio jau turite?", options: [["all", "Turiu tekstus ir nuotraukas"], ["some", "Dalį"], ["none", "Kol nieko"]] },
  { key: "timing", title: "Kada norėtumėte pradėti?", options: [["soon", "Per artimiausias savaites"], ["later", "Per kelis mėnesius"], ["unsure", "Dar tik galvoju"]] },
] as const

// Starting prices and timings are the ones already published on the pricing and service pages.
const results: Record<Need, { title: string; price: string; detail: string; href: string }> = {
  website: { title: "Verslo svetainė", price: `nuo ${prices.website}`, detail: "Pradinė svetainė iki 4 puslapių, orientyras – 7 dienos.", href: "/paslaugos/svetaines/" },
  shop: { title: "El. parduotuvė", price: `nuo ${prices.shop}`, detail: "Katalogas, pirkimo kelias ir turinio valdymas, orientyras – 14 dienų.", href: "/paslaugos/el-parduotuves/" },
  redesign: { title: "Svetainės dizaino atnaujinimas", price: "kaina pagal apimtį", detail: "Pirmiausia peržiūrime dabartinę svetainę ir sutariame, ką keisti.", href: "/paslaugos/svetainiu-atnaujinimas/" },
  automation: { title: "Darbo procesų automatizavimas", price: `nuo ${prices.email}`, detail: "Pradedame nuo vieno aiškaus poreikio, pavyzdžiui, laiškų tvarkymo.", href: "/paslaugos/ai-agentai/" },
}
const contentNote: Record<Content, string> = {
  all: "Turimas turinys paspartins darbą.",
  some: "Trūkstamą turinį aptarsime pokalbio metu. Jo rengimas skaičiuojamas atskirai, jei neįtrauktas į pasiūlymą.",
  none: "Padėsime susiplanuoti, kokio turinio reikia. Jo rengimas skaičiuojamas atskirai, jei neįtrauktas į pasiūlymą.",
}
const timingNote: Record<Timing, string> = {
  soon: "Jei jau norite pradėti, pirmas pokalbis nemokamas.",
  later: "Nereikia skubėti: pirmas pokalbis nemokamas ir neįpareigoja.",
  unsure: "Galvoti dar galima kartu: pirmas pokalbis nemokamas ir neįpareigoja.",
}

export function PackageFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const done = step >= questions.length
  const [need, content, timing] = answers as [Need, Content, Timing]
  const result = done ? results[need] : null
  const question = questions[step]

  const choose = (value: string) => { setAnswers([...answers.slice(0, step), value]); setStep(step + 1) }
  const back = () => setStep(Math.max(0, step - 1))
  const restart = () => { setAnswers([]); setStep(0) }

  return <div className="rounded-lg border border-foreground/25 bg-background p-6 md:p-10">
    {!done && question ? <fieldset>
      <legend className="flex w-full items-center justify-between gap-4 text-sm text-muted-foreground"><span>{step + 1} / {questions.length}</span><span aria-hidden="true" className="flex flex-1 gap-1.5">{questions.map((item, index) => <span key={item.key} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-[var(--signal)]" : "bg-foreground/15"}`} />)}</span></legend>
      <h3 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">{question.title}</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {question.options.map(([value, label]) => <button key={value} type="button" onClick={() => choose(value)} aria-pressed={answers[step] === value} className="min-h-14 rounded-lg border border-foreground/30 px-5 py-3 text-left text-lg font-semibold hover:border-foreground hover:bg-secondary motion-safe:transition-colors">{label}</button>)}
      </div>
      {step > 0 && <button type="button" onClick={back} className="mt-5 min-h-11 font-semibold text-muted-foreground underline underline-offset-4">Atgal</button>}
    </fieldset> : result && <div role="status" aria-live="polite">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-[var(--signal)]">Jums gali tikti</p>
      <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{result.title}</h3>
      <p className="mt-2 text-2xl font-bold">{result.price}</p>
      <p className="mt-4 max-w-[55ch] text-lg leading-relaxed">{result.detail}</p>
      <ul className="mt-4 max-w-[60ch] space-y-2 text-muted-foreground"><li>{contentNote[content]}</li><li>{timingNote[timing]}</li></ul>
      <p className="mt-4 text-sm text-muted-foreground">Tai tik orientyras. Tikslią kainą ir terminą fiksuojame pasiūlyme.</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href="/kontaktai/" style={{ color: "var(--background)" }} className="inline-flex min-h-12 items-center gap-3 rounded-md bg-foreground px-6 py-3 font-semibold text-background">{siteCopy.cta}<ArrowRight className="size-4" aria-hidden="true" /></a>
        <a href={result.href} className="inline-flex min-h-12 items-center gap-2 border-b border-current py-2 font-semibold">Daugiau apie šią paslaugą<ArrowRight className="size-4" aria-hidden="true" /></a>
        <button type="button" onClick={restart} className="inline-flex min-h-11 items-center gap-2 font-semibold text-muted-foreground"><RotateCcw className="size-4" aria-hidden="true" />Rinktis iš naujo</button>
      </div>
    </div>}
    <noscript><p className="mt-4">Pasirinkimui reikia JavaScript. Visas paslaugas rasite <a href="/paslaugos/" className="font-semibold underline">paslaugų puslapyje</a>.</p></noscript>
  </div>
}

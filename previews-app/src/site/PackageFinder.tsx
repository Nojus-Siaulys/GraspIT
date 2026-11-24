import { useEffect, useId, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react"
import { prices } from "./pricing"
import { serviceGroups } from "./content"
import { contentNeeds, inquiryServices } from "./inquiryDraft"

type Option = { value: string; label: string; detail: string }
type Question = { title: string; help: string; options: Option[] }
type Need = "website" | "shop" | "redesign" | "automation" | "apps" | "integrations" | "seo" | "motion" | "ads3d" | "social" | "geo" | "chatbot" | "analytics" | "bots"

const needQuestion: Question = {
  title: "Ką norite padaryti?",
  help: "Pasirinkite pagrindinį tikslą. Techninių žinių nereikia, viską aptarsime kartu.",
  options: [
    { value: "website", label: "Pristatyti verslą internete", detail: "Kai paslaugos ir kontaktai išbarstyti, o klientas turi jų ieškoti." },
    { value: "shop", label: "Parduoti prekes internetu", detail: "Kai norite prekiauti internetu ir patogiai valdyti turinį." },
    { value: "redesign", label: "Atnaujinti turimą svetainę", detail: "Kai svetainė yra, bet atrodo pasenusi arba nepatogi telefone." },
    { value: "automation", label: "Sumažinti pasikartojantį darbą", detail: "Kai pasikartojantys laiškai ar procesai atima per daug laiko." },
    { value: "apps", label: "Sukurti programą savo darbui", detail: "Kai Excel, laiškai ir užrašai nebeužtenka kasdieniam darbui." },
    { value: "integrations", label: "Sujungti sistemas", detail: "Kai tie patys duomenys perrašomi ranka iš vienos sistemos į kitą." },
    { value: "seo", label: "SEO ir svetainės priežiūra", detail: "Kai paleistos svetainės niekas neprižiūri ir nežinote, ką pagerinti." },
    { value: "motion", label: "Judesio reklama", detail: "Kai norite trumpo video, kuris sustabdo žmogų socialiniuose tinkluose." },
    { value: "ads3d", label: "3D reklama", detail: "Kai produktas turi atrodyti ryškiai, o paprastų nuotraukų nepakanka." },
    { value: "social", label: "Socialinių tinklų paketas", detail: "Kai norite reguliariai skelbti TikTok, Reels ar Facebook ir neturite laiko kurti." },
    { value: "geo", label: "Būti matomam AI atsakymuose", detail: "Kai klientai klausia ChatGPT, o jis jūsų nemini." },
    { value: "chatbot", label: "Atsakyti klientams iš karto", detail: "Kai į tuos pačius klausimus atsakote kelis kartus per dieną." },
    { value: "analytics", label: "Matyti skaičius vienoje vietoje", detail: "Kai ataskaitą kas savaitę dėliojate ranka iš kelių failų." },
    { value: "bots", label: "Telegram ar Discord botas", detail: "Kai norite pranešimų apie užsakymus ar pokyčius iš karto." },
  ],
}
// First screen: three areas, as on /paslaugos/. The second screen shows only the choices of that area.
const areaNeeds: Record<string, string[]> = { websites: ["website", "shop", "redesign", "geo"], apps: ["automation", "chatbot", "apps", "integrations", "analytics", "bots", "seo"], ads: ["motion", "ads3d", "social"] }
const areaQuestion: Question = {
  title: "Kokia sritis jums artimiausia?",
  help: "Pasirinkite sritį, o tada tikslesnį poreikį. Techninių žinių nereikia.",
  options: serviceGroups.map(group => ({ value: group.id, label: group.title, detail: group.text })),
}
const contentQuestion: Question = {
  title: "Ką jau turite svetainei?",
  help: "Turime omenyje tekstus apie veiklą, paslaugų ar prekių aprašymus ir nuotraukas. Nieko tokio, jei dar ne viskas paruošta.",
  options: [
    { value: "all", label: "Didžiąją dalį turinio jau turiu", detail: "Tekstai ir nuotraukos paruošti arba juos galima perkelti iš esamos svetainės." },
    { value: "some", label: "Turiu dalį turinio", detail: "Kai kas paruošta, bet dar trūksta tekstų, aprašymų ar nuotraukų." },
    { value: "none", label: "Turinio dar neturiu", detail: "Pirmiausia reikia išsiaiškinti, ką paruošti svetainei." },
  ],
}
const workflowQuestion: Question = {
  title: "Ar žinote, kurį darbą norite automatizuoti?",
  help: "Pavyzdžiui: rūšiuoti laiškus, paruošti atsakymų juodraščius ar perkelti duomenis tarp sistemų.",
  options: [
    { value: "clear", label: "Žinau konkrečią užduotį", detail: "Galiu paaiškinti, ką darau rankiniu būdu ir kokio rezultato tikiuosi." },
    { value: "several", label: "Turiu kelias idėjas", detail: "Reikia padėti atsirinkti, nuo kurios užduoties verta pradėti." },
    { value: "explore", label: "Dar noriu išsiaiškinti galimybes", detail: "Pasikartojančio darbo yra, bet nežinau, ką būtų galima automatizuoti." },
  ],
}
const taskQuestion: Question = {
  title: "Ar jau žinote, ko tiksliai norite?",
  help: "Pakanka kelių žodžių. Detales aptarsime pokalbyje.",
  options: [
    { value: "clear", label: "Žinau, ko noriu", detail: "Galiu paaiškinti, ką reikia padaryti ir kokio rezultato tikiuosi." },
    { value: "several", label: "Turiu kelias idėjas", detail: "Reikia padėti pasirinkti, nuo ko pradėti." },
    { value: "explore", label: "Dar noriu išsiaiškinti galimybes", detail: "Dar nežinau, kas man tiktų." },
  ],
}
const timingQuestion: Question = {
  title: "Kada norėtumėte pradėti darbus?",
  help: "Klausiame apie darbų pradžią, o ne paleidimo datą. Tikslų grafiką suderinsime aptarę projektą.",
  options: [
    { value: "soon", label: "Per artimiausias kelias savaites", detail: "Norėčiau netrukus aptarti projektą ir susitarti dėl pradžios." },
    { value: "later", label: "Per artimiausius kelis mėnesius", detail: "Planuoju iš anksto ir dar turiu laiko pasiruošti." },
    { value: "unsure", label: "Konkrečios datos dar neturiu", detail: "Kol kas noriu suprasti galimybes, kainą ir darbų eigą." },
  ],
}
const results: Record<Need, { title: string; price: string; detail: string; href: string }> = {
  website: { title: "Naujos svetainės kūrimas", price: `Nuo ${prices.website}`, detail: "Jūsų tikslui gali pakakti pradinės svetainės iki 4 puslapių: pristatyti veiklą, paslaugas ir pateikti kontaktus. Tokio projekto orientacinė trukmė — 7 dienos, kai sutarta apimtis ir paruoštas turinys.", href: "/paslaugos/svetaines/" },
  shop: { title: "El. parduotuvės kūrimas", price: `Nuo ${prices.shop}`, detail: "Aptarsime prekių katalogą, pirkimo žingsnius, mokėjimą ir pristatymą. Orientacinė projekto trukmė — 14 dienų; ji priklauso nuo sutartos apimties, integracijų ir turinio paruošimo.", href: "/paslaugos/el-parduotuves/" },
  redesign: { title: "Esamos svetainės atnaujinimas", price: "Kaina įvertinus svetainę", detail: "Pirmiausia peržiūrėsime dabartinę svetainę: kas joje trukdo lankytojui, ką verta išlaikyti ir ką pakeisti. Galite kreiptis ir dėl WordPress, ir dėl kitaip sukurtos svetainės.", href: "/paslaugos/svetainiu-atnaujinimas/" },
  automation: { title: "Darbo procesų automatizavimas", price: "Kaina aptariama po pokalbio", detail: "Pradėsime nuo vienos pasikartojančios užduoties. Aptarsime, kokius įrankius naudojate, kokio rezultato reikia ir ką turės patikrinti žmogus. Galimybę automatizuoti įvertinsime prieš siūlydami sprendimą.", href: "/paslaugos/ai-agentai/" },
  apps: { title: "Programos kūrimas", price: "Kaina pagal apimtį", detail: "Pradėsime nuo vienos darbo eigos, kurią dabar atliekate lentelėse, laiškuose ar užrašuose. Aptarsime, kas ja naudosis ir ką programa turi parodyti.", href: "/paslaugos/programos/" },
  integrations: { title: "Sistemų integracija", price: "Kaina pagal apimtį", detail: "Aptarsime, kurias sistemas naudojate ir kurie duomenys dabar perrašomi ranka. Pradėsime nuo vieno ryšio tarp dviejų sistemų.", href: "/paslaugos/integracijos/" },
  seo: { title: "SEO ir svetainės priežiūra", price: "Kaina pagal apimtį", detail: "Peržiūrėsime techninę svetainės būklę ir smulkius trūkumus. Aptarsime, ar reikia vienkartinės patikros, ar nuolatinės priežiūros.", href: "/paslaugos/seo-prieziura/" },
  motion: { title: "Judesio reklama", price: "Kaina pagal apimtį", detail: "Aptarsime, ką norite parodyti ir kur video bus rodomas: socialiniuose tinkluose ar svetainėje.", href: "/paslaugos/judesio-reklamos/" },
  ads3d: { title: "3D reklama", price: "Kaina pagal apimtį", detail: "Aptarsime, kurį produktą reikia parodyti ir kur vaizdas bus naudojamas. Pažiūrėsime, ar pakanka esamų nuotraukų, ar reikia 3D modelio.", href: "/paslaugos/3d-reklamos/" },
  social: { title: "Socialinių tinklų paketas", price: "Kaina pagal apimtį", detail: "Aptarsime, kuriuose tinkluose skelbiate ir kaip dažnai. Paketų apimtį ir kainas rasite paslaugos puslapyje.", href: "/paslaugos/socialiniu-tinklu-paketas/" },
  geo: { title: "AI matomumo patikra", price: "Kaina pagal apimtį", detail: "Sudarysime klausimų, kuriuos užduotų jūsų pirkėjai, sąrašą ir patikrinsime, ar AI asistentai jus mini. Pažiūrėsime, ką jie siūlo vietoj jūsų.", href: "/paslaugos/ai-matomumas/" },
  chatbot: { title: "AI pokalbių asistentas", price: "Kaina pagal apimtį", detail: "Aptarsime dažniausius klientų klausimus ir kur asistentas turi veikti: svetainėje ar Messenger'yje. Sutarsime, ką jis perduoda jums.", href: "/paslaugos/ai-asistentas/" },
  analytics: { title: "Duomenų analitika", price: "Kaina pagal apimtį", detail: "Aptarsime, kokius skaičius norite matyti ir kur dabar laikomi duomenys. Pradėsime nuo vienos ataskaitos.", href: "/paslaugos/duomenu-analitika/" },
  bots: { title: "Telegram ar Discord botas", price: "Kaina pagal apimtį", detail: "Aptarsime, ką botas turi daryti, kas juo naudosis ir prie kokių sistemų jį reikia prijungti.", href: "/paslaugos/telegram-discord-botai/" },
}
const preparationNotes: Record<string, string> = {
  all: "Peržiūrėsime jūsų tekstus bei nuotraukas ir aptarsime, ką galima panaudoti.",
  some: "Sudarysime trūkstamo turinio sąrašą ir sutarsime, kas jį paruoš. Jei jo rengimas kainuos papildomai, tai nurodysime pasiūlyme.",
  none: "Padėsime susidaryti reikalingų tekstų ir nuotraukų sąrašą. Turinio rengimo apimtį bei kainą aptarsime atskirai.",
  clear: "Pokalbiui pravers vienas užduoties pavyzdys: kaip ją atliekate dabar ir ko norėtumėte atsisakyti.",
  several: "Kartu palyginsime idėjas ir išsirinksime vieną aiškų darbą, nuo kurio verta pradėti.",
  explore: "Pokalbio metu pereisime per jūsų darbo eigą ir pažiūrėsime, ar yra tinkama užduotis automatizavimui.",
}
const timingNotes: Record<string, string> = {
  soon: "Aptarę projektą patvirtinsime, kada galime pradėti. Šis pasirinkimas datos nerezervuoja.",
  later: "Galėsime iš anksto susiplanuoti darbų pradžią ir pasiruošimą.",
  unsure: "Galite pradėti nuo pokalbio ir nuspręsti vėliau. Užsakyti paslaugos neprivalote.",
}

export function PackageFinder({ initialAnswers = [], onComplete }: { initialAnswers?: string[]; onComplete?: (answers: string[]) => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(initialAnswers)
  const [group, setGroup] = useState<string | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const id = useId()
  const questions = [needQuestion, contentNeeds.includes(answers[0]) ? contentQuestion : answers[0] === "automation" ? workflowQuestion : taskQuestion, timingQuestion]
  const done = step === questions.length
  const [need, preparation, timing] = answers
  const result = done ? results[need as Need] : null
  const activeGroup = group ?? Object.keys(areaNeeds).find(key => areaNeeds[key].includes(need)) ?? null
  const choosingArea = step === 0 && !activeGroup
  const question = step === 0 ? (activeGroup ? { ...needQuestion, options: needQuestion.options.filter(option => areaNeeds[activeGroup].includes(option.value)) } : areaQuestion) : questions[step]
  const selection = choosingArea ? undefined : answers[step]
  const labels = questions.map((item, index) => item.options.find(option => option.value === answers[index])?.label ?? "")
  const taskLike = !contentNeeds.includes(need)
  const inquiry = result ? "/kontaktai/?" + new URLSearchParams({
    paslauga: inquiryServices[need],
    [taskLike ? "procesas" : "turinys"]: labels[1],
    terminas: labels[2],
    need, preparation, timing,
  }).toString() : "/kontaktai/"

  useEffect(() => { if (step > 0) heading.current?.focus({ preventScroll: true }) }, [step])
  function choose(value: string) {
    if (choosingArea) { setGroup(value); setAnswers([]); return }
    // Changing the service invalidates answers to its service-specific questions.
    setAnswers(previous => previous[step] === value ? previous : [...previous.slice(0, step), value])
  }
  function changeArea() { setGroup(null); setAnswers([]) }
  function restart() { setAnswers([]); setGroup(null); setStep(0) }
  const primary = "inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-foreground px-6 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-40"

  return <div className="rounded-lg border border-foreground/25 bg-background p-4 sm:p-6 md:p-10">
    <p className={`text-sm leading-relaxed text-muted-foreground ${onComplete ? "max-md:hidden" : ""}`}>{onComplete ? "3 trumpi klausimai · iš atsakymų paruošime jūsų projekto aprašymą" : "3 trumpi klausimai · apie 1 minutę · kontaktų čia nereikia"}</p>
    <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground"><span>{done ? "Jūsų rezultatas" : `Klausimas ${step + 1} iš 3`}</span><span aria-hidden="true" className="flex flex-1 gap-1.5">{questions.map((_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-[var(--signal)]" : "bg-foreground/15"}`} />)}</span></div>
    {!done && question ? <div>
      <h3 ref={heading} tabIndex={-1} id={`${id}-heading`} className="mt-6 text-2xl font-bold tracking-tight outline-none md:text-3xl">{question.title}</h3>
      <p id={`${id}-help`} className="mt-3 max-w-[65ch] leading-relaxed text-muted-foreground">{question.help}</p>
      <fieldset aria-labelledby={`${id}-heading`} aria-describedby={`${id}-help`} className="mt-6 grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">Pasirinkite vieną atsakymą</legend>
        {question.options.map(option => <label key={option.value} className={`relative flex cursor-pointer items-start gap-3 rounded-lg border p-3 sm:p-4 motion-safe:transition-colors ${selection === option.value ? "border-foreground bg-secondary" : "border-foreground/25 hover:border-foreground hover:bg-secondary/50"}`}>
          <input type="radio" name={`${id}-${step}`} value={option.value} checked={selection === option.value} onChange={() => choose(option.value)} className="mt-1 size-4 shrink-0 accent-foreground" />
          <span><span className="block text-base font-semibold leading-snug">{option.label}</span><span className="mt-1 block text-sm leading-snug text-muted-foreground">{option.detail}</span></span>
        </label>)}
      </fieldset>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className="inline-flex min-h-12 items-center gap-2 font-semibold"><ArrowLeft className="size-4" aria-hidden="true" />Ankstesnis klausimas</button> : activeGroup ? <button type="button" onClick={changeArea} className="inline-flex min-h-12 items-center gap-2 font-semibold"><ArrowLeft className="size-4" aria-hidden="true" />Kita sritis</button> : <span className="text-sm text-muted-foreground">Pasirinkite vieną atsakymą.</span>}
        {!choosingArea && <button type="button" disabled={!selection} onClick={() => step === 2 && onComplete ? onComplete(answers) : setStep(step + 1)} className={primary}>{step === 2 ? onComplete ? "Paruošti užklausos aprašymą" : "Rodyti rekomendaciją" : "Kitas klausimas"}<ArrowRight className="size-4" aria-hidden="true" /></button>}
      </div>
    </div> : result && <div>
      <p className="mt-6 text-xs font-bold uppercase tracking-[.14em] text-[var(--signal)]">Pagal jūsų atsakymus siūlome</p>
      <h3 ref={heading} tabIndex={-1} className="mt-3 text-3xl font-bold tracking-tight outline-none md:text-4xl">{result.title}</h3>
      <p className="mt-3 text-2xl font-bold">{result.price}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Tai pradinis orientyras. Tikslią kainą, darbų apimtį ir terminą pateiksime įvertinę projektą.</p>
      <p className="mt-5 max-w-[65ch] text-lg leading-relaxed">{result.detail}</p>
      <div className="mt-6 rounded-md bg-secondary p-4 sm:p-5">
        <h4 className="font-semibold">Jūsų pasirinkimai</h4>
        <dl className="mt-3 grid gap-3 text-sm">{["Tikslas", taskLike ? "Užduotis" : "Turinys", "Norima darbų pradžia"].map((label, index) => <div key={label} className="grid gap-1 sm:grid-cols-[10rem_1fr]"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium">{labels[index]}</dd></div>)}</dl>
        <button type="button" onClick={() => setStep(0)} className="mt-4 min-h-11 text-sm font-semibold underline underline-offset-4">Pakeisti atsakymus</button>
      </div>
      <h4 className="mt-6 font-semibold">Ką aptarsime toliau?</h4>
      <ul className="mt-3 max-w-[65ch] space-y-3 text-muted-foreground">{[preparationNotes[preparation], timingNotes[timing]].map(note => <li key={note} className="flex gap-3"><Check className="mt-1 size-4 shrink-0" aria-hidden="true" /><span>{note}</span></li>)}</ul>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={inquiry} style={{ color: "#fff" }} className={primary}>Pereiti į projekto formą<ArrowRight className="size-4" aria-hidden="true" /></a>
        <a href={result.href} className="inline-flex min-h-12 items-center gap-2 border-b border-current py-2 font-semibold">Apie šią paslaugą<ArrowRight className="size-4" aria-hidden="true" /></a>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Pasirinkimai bus perkelti į formą. Čia dar nieko neišsiunčiate ir paslaugos neužsakote.</p>
      <button type="button" onClick={restart} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground"><RotateCcw className="size-4" aria-hidden="true" />Pradėti iš naujo</button>
    </div>}
    <noscript><p className="mt-4">Klausimynui reikia JavaScript. Visas paslaugas rasite <a href="/paslaugos/" className="font-semibold underline">paslaugų puslapyje</a>.</p></noscript>
  </div>
}
// Inquiry CTA keeps a light label on its dark background.

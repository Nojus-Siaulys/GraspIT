export const inquiryServices: Record<string, string> = { website: "Svetainė", shop: "El. parduotuvė", redesign: "Svetainės atnaujinimas", automation: "AI automatizacija" }
const preparationLabels: Record<string, string> = { all: "Turiu tekstus ir nuotraukas", some: "Turiu dalį turinio", none: "Turinio dar neturiu", clear: "Žinau konkrečią užduotį", several: "Turiu kelias idėjas", explore: "Noriu išsiaiškinti galimybes" }
const timingLabels: Record<string, string> = { soon: "Artimiausiomis savaitėmis", later: "Per kelis mėnesius", unsure: "Datos dar neturiu" }
export function completeInquiry(answers: string[]) {
  const [need, preparation, timing] = answers
  return Boolean(Object.hasOwn(inquiryServices, need) && (need === "automation" ? ["clear", "several", "explore"] : ["all", "some", "none"]).includes(preparation) && Object.hasOwn(timingLabels, timing))
}
export function inquirySummary(answers: string[]) {
  return [inquiryServices[answers[0]], preparationLabels[answers[1]], timingLabels[answers[2]]].filter(Boolean)
}
export function draftInquiry(answers: string[], context: { example?: string; package?: string } = {}) {
  if (!completeInquiry(answers)) return ""
  const [need, preparation, timing] = answers
  const opening: Record<string, string> = {
    website: "Sveiki, norėčiau naujos svetainės savo verslui. Noriu, kad klientai matytų, ką darau, ir lengvai su manimi susisiektų.",
    shop: "Sveiki, norėčiau el. parduotuvės savo prekėms. Noriu patogaus prekių katalogo ir aiškaus pirkimo kelio. Norėčiau aptarti mokėjimo ir pristatymo galimybes.",
    redesign: "Sveiki, norėčiau atnaujinti turimą svetainę. Norėčiau kartu įvertinti jos dizainą, turinio išdėstymą bei patogumą naudotis telefonu ir sutarti, ką verta pakeisti.",
    automation: "Sveiki, norėčiau sumažinti pasikartojantį rankinį darbą. Norėčiau aptarti dabartinį procesą, naudojamus įrankius ir įvertinti, kuriuos veiksmus būtų galima automatizuoti.",
  }
  const prep: Record<string, string> = {
    all: "Tekstus ir nuotraukas jau turiu. Norėčiau, kad įvertintumėte, ką galima panaudoti ir ką reikėtų pritaikyti.",
    some: "Dalį tekstų ir nuotraukų jau turiu. Norėčiau kartu susidaryti trūkstamo turinio sąrašą ir sutarti, kas jį paruoš.",
    none: "Tekstų ir nuotraukų dar neturiu. Norėčiau pagalbos susiplanuojant, kokio turinio reikės ir kaip jį paruošti.",
    clear: "Turiu konkrečią užduotį, kurios eigą galiu paaiškinti per pokalbį.",
    several: "Turiu kelias idėjas. Norėčiau pagalbos pasirenkant vieną užduotį, nuo kurios verta pradėti.",
    explore: "Konkretaus sprendimo dar nežinau. Norėčiau išsiaiškinti galimybes ir pradėti nuo aiškiai apibrėžtos užduoties.",
  }
  const time: Record<string, string> = { soon: "Darbus norėčiau pradėti per artimiausias kelias savaites, jei turėtumėte galimybę.", later: "Darbus norėčiau pradėti per artimiausius kelis mėnesius.", unsure: "Konkrečios pradžios datos dar neturiu — kol kas noriu geriau suprasti galimybes." }
  return [opening[need], prep[preparation] + " " + time[timing], context.example ? `Dominantis darbų pavyzdys: ${context.example}.` : "", context.package ? `Dominantis paketas: ${context.package}.` : "", "Norėčiau sužinoti siūlomą darbų apimtį, preliminarią kainą ir terminą. Dėl detalių galime susitarti per pirmą pokalbį."].filter(Boolean).join("\n\n")
}
export function inquiryFromParams(params: URLSearchParams) {
  const service = params.get("paslauga") ?? ""
  const need = params.get("need") ?? Object.keys(inquiryServices).find(key => inquiryServices[key] === service) ?? ""
  const oldPreparation = params.get(need === "automation" ? "procesas" : "turinys") ?? ""
  const preparation = params.get("preparation") ?? (need === "automation"
    ? oldPreparation.includes("konkrečią") ? "clear" : oldPreparation.includes("kelias") ? "several" : oldPreparation ? "explore" : ""
    : oldPreparation.includes("dalį") ? "some" : /neturiu|Kol nieko/.test(oldPreparation) ? "none" : oldPreparation ? "all" : "")
  const oldTiming = params.get("terminas") ?? ""
  const timing = params.get("timing") ?? (/savait/.test(oldTiming) ? "soon" : /mėnes/.test(oldTiming) ? "later" : oldTiming ? "unsure" : "")
  const answers = [need, preparation, timing]
  return { answers: completeInquiry(answers) ? answers : Object.hasOwn(inquiryServices, need) ? [need] : [], service: Object.hasOwn(inquiryServices, need) ? inquiryServices[need] : "Dar nežinau", context: { example: params.get("pavyzdys")?.slice(0, 160), package: params.get("paketas")?.slice(0, 160) } }
}

export const briefKey = "graspit-brief"
const briefOpenings: Record<string, string> = {
  Svetainė: "Sveiki, norėčiau aptarti svetainės kūrimą.",
  "El. parduotuvė": "Sveiki, norėčiau aptarti el. parduotuvės kūrimą.",
  "Svetainės atnaujinimas": "Sveiki, norėčiau aptarti svetainės atnaujinimą.",
  "AI automatizacija": "Sveiki, norėčiau aptarti automatizaciją.",
  Programa: "Sveiki, norėčiau aptarti programos kūrimą.",
  "SEO ir priežiūra": "Sveiki, norėčiau aptarti svetainės SEO ir priežiūrą.",
}
// Answers from a service page, kept in sessionStorage so free text never goes into the URL.
export function briefText(raw: string | null, service: string) {
  let saved: { service?: unknown; answers?: unknown } | null
  try { saved = JSON.parse(raw ?? "null") } catch { return "" }
  if (!Object.hasOwn(briefOpenings, service) || saved?.service !== service || !Array.isArray(saved.answers)) return ""
  const lines = saved.answers.map(item => {
    const [line, answer] = Array.isArray(item) ? item : []
    const text = String(answer ?? "").trim().slice(0, 800)
    return text ? `${String(line)} ${text}` : ""
  }).filter(Boolean)
  return lines.length ? [briefOpenings[service], ...lines].join("\n") : ""
}

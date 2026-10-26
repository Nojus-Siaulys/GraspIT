import { useState } from "react"
import { ArrowRight, Check, MousePointer2, LayoutTemplate, Layers, Image, MessageSquare } from "lucide-react"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"
const scenarios = [
  { title: "Klientai vis klausia to paties telefonu.", text: "Paslaugos, darbo eiga ir svarbiausi atsakymai — vienoje vietoje, kurią galima tiesiog nusiųsti klientui.", link: "Pristatyti paslaugas", href: "/paslaugos/svetaines/", example: "Pavyzdys: meistras, specialistas, paslaugų įmonė." },
  { title: "Darbus rodote tik socialiniuose tinkluose.", text: "Sutvarkyta darbų galerija ir aiškus susisiekimas padeda žmogui peržiūrėti tai, kas jam aktualu.", link: "Pamatyti paslaugų svetainės pavyzdį", href: "/darbai/kalvita/", example: "Pavyzdys: individualūs gaminiai, remontas, kūrybinės paslaugos." },
  { title: "Prekes užsako per žinutes.", text: "Prekės informacija, pasirinkimas ir užsakymo kelias padeda pirkėjui suprasti, ką ir kaip įsigyti.", link: "Aptarti el. parduotuvę", href: "/paslaugos/el-parduotuves/", example: "Pavyzdys: nedidelis prekių ženklas ar specializuotas katalogas." },
]

export function ServiceScenarios() {
  return <section className="py-16 md:py-24" aria-labelledby="situations-heading"><div className={wrap}><p className="ux-eyebrow">Jūsų situacija</p><div className="mt-5 grid gap-5 lg:grid-cols-2"><h2 id="situations-heading" className="max-w-[22ch] text-3xl font-bold leading-tight tracking-tight md:text-5xl">Atpažįstate savo kasdienybę?</h2><p className="max-w-[45ch] text-lg leading-relaxed text-muted-foreground">Pradėti galima nuo to, kas šiandien nepatogu jums ar jūsų klientams. Iš to ir atsiranda svetainės užduotis.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{scenarios.map((item, index) => <article key={item.title} className="ux-panel flex flex-col bg-secondary p-6 md:p-8"><p className="ux-eyebrow text-muted-foreground">0{index + 1}</p><h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight">{item.title}</h3><p className="mt-5 leading-relaxed">{item.text}</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.example}</p><a href={item.href} className="ux-text-link mt-auto pt-7">{item.link}<ArrowRight className="size-4 shrink-0" /></a></article>)}</div></div></section>
}

const structure = [
  { label: "Prisistatymas", question: "Ar čia rasiu tai, ko ieškau?", purpose: "Pirmas ekranas trumpai pasako, kuo užsiimate, kam padedate ir nuo ko pradėti.", result: "Lankytojas supranta jūsų pasiūlymą.", icon: LayoutTemplate },
  { label: "Paslaugos", question: "Kuris sprendimas tinka man?", purpose: "Atskiros paslaugų kortelės padeda palyginti galimybes ir pasirinkti pagal savo poreikį.", result: "Lankytojas atpažįsta jam tinkamą paslaugą.", icon: Layers },
  { label: "Darbų pavyzdžiai", question: "Kaip tai atrodo praktiškai?", purpose: "Atlikti darbai su trumpu kontekstu parodo, kaip jūsų paslauga pritaikoma iš tikrųjų.", result: "Lankytojas gali įvertinti jūsų darbą.", icon: Image },
  { label: "Susisiekimas", question: "Kaip pradėti pokalbį?", purpose: "Aiškūs kontaktai ir trumpa forma padeda kreiptis net tada, kai žmogus dar nežino visų detalių.", result: "Lankytojas žino kitą žingsnį.", icon: MessageSquare },
] as const

export function StructureExplorer() {
  const [active, setActive] = useState(0)
  const item = structure[active]
  const choose = (index: number) => setActive(index)
  const sectionProps = (index: number) => ({
    type: "button" as const,
    onClick: () => choose(index),
    "aria-pressed": active === index,
    "aria-label": `${structure[index].label}: parodyti paskirtį`,
    "aria-controls": "structure-explanation",
    className: `sx-page-block sx-block-${index}`,
  })
  return <section className="bg-secondary py-12 md:py-16" aria-labelledby="structure-heading"><div className={wrap}>
    <p className="ux-eyebrow">Kaip planuojame jūsų svetainę</p>
    <h2 id="structure-heading" className="mt-5 max-w-[24ch] text-3xl font-bold leading-tight tracking-tight md:text-5xl">Nuo pirmo įspūdžio iki užklausos.</h2>
    <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted-foreground">Žemiau — supaprastintas svetainės maketas. Paspauskite jo dalį ir sužinokite, ką ji padeda padaryti lankytojui.</p>
    <div className="sx-layout mt-9">
      <div className="sx-guide">
        <div role="group" aria-label="Pasirinkite svetainės dalį" className="sx-choices">{structure.map((part, index) => {
          const Icon = part.icon
          return <button key={part.label} type="button" aria-pressed={active === index} aria-controls="structure-explanation" onClick={() => choose(index)} className="sx-choice"><span className="sx-number">0{index + 1}</span><Icon className="size-4 shrink-0" aria-hidden="true" /><span>{part.label}</span><ArrowRight className="ml-auto size-4 shrink-0" aria-hidden="true" /></button>
        })}</div>
        <div id="structure-explanation" className="sx-explanation" aria-live="polite" aria-atomic="true">
          <p className="ux-eyebrow text-muted-foreground">Lankytojo klausimas / 0{active + 1}</p>
          <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight">„{item.question}“</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{item.purpose}</p>
          <p className="sx-result"><Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{item.result}</p>
        </div>
      </div>
      <div className="sx-canvas" aria-label="Interaktyvus svetainės maketas">
        <div className="sx-browser"><span className="sx-browser-dots" aria-hidden="true"><i /><i /><i /></span><span>jūsų-svetainė.lt</span><span className="sx-demo-label">Maketas</span></div>
        <div className="sx-page" role="group" aria-label="Paspauskite maketo dalį">
          <div className="sx-page-nav" aria-hidden="true"><span className="sx-logo"><span /> JŪSŲ ŽENKLAS</span><span className="sx-nav-lines"><i /><i /><i /></span></div>
          <button {...sectionProps(0)}><span className="sx-block-label"><span>01</span> Prisistatymas</span><span className="sx-hero-content"><span><span className="sx-mock-heading">Jūsų veikla.<br />Aiškiai.</span><span className="sx-mock-copy">Ką siūlote ir kam padedate.</span><span className="sx-mock-action">Pagrindinis veiksmas <ArrowRight className="size-3" aria-hidden="true" /></span></span><span className="sx-abstract-hero" aria-hidden="true"><i /><i /><i /></span></span></button>
          <button {...sectionProps(1)}><span className="sx-block-label"><span>02</span> Paslaugos</span><span className="sx-service-grid">{[1,2,3].map(number => <span key={number} className="sx-mini-card"><span className="sx-mini-icon" aria-hidden="true">0{number}</span><span className="sx-mini-title">Paslauga {number}</span><span className="sx-skeleton-lines" aria-hidden="true"><i /><i /></span></span>)}</span></button>
          <button {...sectionProps(2)}><span className="sx-block-label"><span>03</span> Darbų pavyzdžiai</span><span className="sx-work-grid">{[1,2,3].map(number => <span key={number} className="sx-mini-work"><span className={`sx-work-art sx-work-art-${number}`} aria-hidden="true"><i /><i /></span><span className="sx-mini-title">Projektas {number}</span></span>)}</span></button>
          <button {...sectionProps(3)}><span className="sx-block-label"><span>04</span> Susisiekimas</span><span className="sx-contact-content"><span className="sx-contact-title">Pradėkime<br />pokalbį.</span><span className="sx-form-outline" aria-hidden="true"><span>Vardas <i /></span><span>El. paštas <i /></span><span className="sx-form-send">Užklausos veiksmas <ArrowRight className="size-3" /></span></span></span></button>
        </div>
        <p className="sx-caption"><MousePointer2 className="size-4 shrink-0" aria-hidden="true" />Pasirinkite bet kurį iš 4 maketo blokų. Tai demonstracija — duomenys čia nevedami.</p>
      </div>
    </div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-4"><p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">Jūsų svetainei dalių skaičių ir jų eiliškumą parinksime pagal verslo tikslą.</p><a href="/kontaktai/?paslauga=Svetain%C4%97" className="ux-text-link">Aptarti savo svetainę<ArrowRight className="size-4" /></a></div>
  </div></section>
}

export function PackageScope() {
  return <section className="py-16 md:py-24" aria-labelledby="scope-heading"><div className={wrap}><p className="ux-eyebrow">Kas bus sukurta</p><h2 id="scope-heading" className="mt-5 max-w-[23ch] text-3xl font-bold tracking-tight md:text-5xl">Kaina lengviau suprantama, kai matote apimtį.</h2><div className="mt-10 grid gap-4 lg:grid-cols-2"><article className="ux-panel bg-secondary p-6 md:p-9"><h3 className="text-2xl font-semibold tracking-tight">Iki 4 puslapių — pavyzdinė struktūra</h3><ol className="mt-6">{[["Pradžia", "Kas esate, ką darote ir kaip susisiekti."], ["Paslaugos", "Ką siūlote ir kokiam klientui tai tinka."], ["Darbai arba apie mus", "Pavyzdžiai ir kontekstas pasitikėjimui."], ["Kontaktai", "Aiškus kelias iki užklausos."]].map(([title, text], index) => <li key={title} className="flex gap-4 border-t border-foreground/20 py-4"><span className="text-xs text-muted-foreground">0{index + 1}</span><div><h4 className="font-semibold">{title}</h4><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div></li>)}</ol><p className="mt-4 text-sm text-muted-foreground">Puslapių paskirtį galime keisti pagal jūsų veiklą. Tai apimties pavyzdys.</p></article><div className="grid gap-4"><article className="ux-panel p-6 md:p-9"><h3 className="text-xl font-semibold">Ką paruošiame kartu?</h3><ul className="mt-5 space-y-3">{["Puslapių ir pagrindinių veiksmų planą", "Turinio bei nuotraukų sąrašą", "Sutartą dizainą, pritaikymą ekranams ir patikrą"].map(text => <li key={text} className="flex gap-3"><Check className="mt-1 size-4 shrink-0" />{text}</li>)}</ul></article><article className="ux-panel bg-foreground p-6 text-white md:p-9"><h3 className="text-xl font-semibold">Kas aptariama papildomai?</h3><p className="mt-4 leading-relaxed text-white/80">Domenas ir talpinimas, tekstų rašymas, mokamos integracijos, papildomos kalbos ir didesnės funkcijos. Prieš pradėdami įvardijame, kas įtraukta į jūsų pasiūlymą.</p></article></div></div></div></section>
}

import { HeroBackdrop } from "./HeroBackdrop"
import { CaseStudy } from "./CaseStudy"
import { ServiceDetails, ServiceScenarios, StructureExplorer, PackageScope } from "./DecisionContent"
import { Legal } from "./Legal"
import type { ServiceKind } from "./serviceDetails"
import { ProjectLibrary } from "./ProjectLibrary"
import { About } from "./About"
import { ProjectGallery } from "./ProjectGallery"
import { MoreWorks } from "./MoreWorks"
import { StudioScene, TrustPhoto } from "./Photography"
import { contact, phoneHref, siteCopy } from "./settings"
import { CookieNotice } from "./CookieNotice"
import { MobileCallBar, Testimonials, TrustStrip } from "./Trust"
import { BackToTop } from "./BackToTop"
import { Footer } from "./Footer"
import { PageBackdrop, pageBackdrops } from "./PageBackdrop"
import { Media } from "./Media"
import { hasMedia, type MediaId } from "./mediaSlots"
import { ServiceIndex } from "./ServiceIndex"
import { PackageFinder } from "./PackageFinder"
import { PhoneCollapse } from "./PhoneCollapse"
import { prices } from "./pricing"
import { PriceAnatomy } from "./PriceAnatomy"
import { ContactBrief } from "./ContactBrief"
import { BlogIndex, BlogPost, RelatedArticles } from "./Blog"
import { useEffect, useState, type ReactNode } from "react"
import { ArrowDown, ArrowRight, Menu, Phone, X } from "lucide-react"
import { lt } from "@/content-lt"
import { allFaq, faqGroups, navigation, pages, services } from "./content"

const pageUrl = (path: string) =>
  path === "/" ? path : path.replace(/\/?(#.*)?$/, "/$1")
const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"
const band = "py-16 md:py-24"
const eyebrow = "text-xs font-bold uppercase tracking-[.16em]"
const heading =
  "text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.04] tracking-[-.045em]"
const linkStyle =
  "inline-flex min-h-12 items-center gap-3 border-b border-current py-2 font-semibold hover:gap-5 motion-safe:transition-all"


function Brand() {
  return (
    <span className="font-display inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight"><img src="/img/logo-96.png" alt="" width="36" height="36" className="size-9 rounded bg-background p-0.5 object-contain" />
      <span>Grasp<span className="text-[var(--brand-it)]">IT</span></span>
    </span>
  )
}
function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={pageUrl(href)} className={linkStyle}>
      {children}
      <ArrowRight className="size-4 shrink-0" />
    </a>
  )
}
function Section({
  number,
  label,
  title,
  children,
  sand = false,
  id,
  compact = false,
}: {
  number: string
  label: string
  title: string
  children: ReactNode
  sand?: boolean
  id?: string
  compact?: boolean
}) {
  return (
    <section id={id} className={`${compact ? "py-8 md:py-24" : band} scroll-mt-20 ${sand ? "bg-secondary" : "bg-background"}`}>
      <div className={wrap}>
        <div className={`${compact ? "mb-0 gap-0 md:mb-10 md:gap-4" : "mb-10 gap-4"} grid lg:grid-cols-12`}>
          <p className={`${eyebrow} lg:col-span-3 ${compact ? "max-md:hidden" : ""}`}>
            <span className="mr-3 text-[var(--signal)]">{number}</span>
            {label}
          </p>
          <h2 className={`${heading} max-w-[23ch] lg:col-span-9 ${compact ? "max-md:sr-only" : ""}`}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}
function FaqItems({ items }: { items: typeof allFaq }) {
  return (
    <div className="border-b border-foreground">
      {items.map((f) => (
        <details key={f.q} className="group border-t border-foreground">
          <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold md:text-xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="text-2xl font-normal group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[70ch] pr-6 pb-6 text-lg leading-relaxed text-muted-foreground">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  )
}
function Home() {
  const cards: { id: MediaId; title: string; text: string; href: string; link: string; note: string }[] = [
    { id: "homeNew", title: "Reikia naujos svetainės", text: "Neturite svetainės? Sudėliosime paslaugas, darbus ir kontaktus ten, kur jų ieškos.", href: "/paslaugos/svetaines/", link: "Apie svetainių kūrimą", note: "Nuo " + prices.website },
    { id: "homeRedesign", title: "Noriu atnaujinti turimą", text: "Turite svetainę, bet ji atrodo pasenusi? Atnaujinsime dizainą ir pritaikysime telefonui, taip pat WordPress.", href: "/paslaugos/svetainiu-atnaujinimas/", link: "Apie svetainės atnaujinimą", note: "Kaina pagal apimtį" },
  ]
  return <>
    <section className="home-hero">
      <HeroBackdrop />
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-12`}>
        <div className="hero-copy lg:col-span-12">
          <p className={eyebrow}>GraspIT · Programos, svetainės, automatizacija</p>
          <h1 className="mt-8 max-w-[22ch] text-[clamp(2.4rem,4.8vw,4.6rem)] font-bold leading-[1.05] tracking-[-.045em]">Kuriame programas verslams</h1>
          <p className="mt-7 max-w-[43ch] text-lg leading-relaxed md:text-xl">Pradedame nuo pokalbio apie tai, ką šiandien darote rankomis. Kainą sakome po jo, prieš pradėdami darbą.</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="/kontaktai/" className="hero-primary cta-glow inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md px-6 py-3 font-semibold">{siteCopy.cta}<ArrowRight className="size-4" /></a>
            <Link href="/darbai/">Peržiūrėti darbus</Link>
          </div>
          <p className="hero-price mt-6 max-w-[48ch] text-sm leading-relaxed">{siteCopy.note}</p>
          <a href="/kainos/" className="hero-price mt-3 inline-flex min-h-11 items-center gap-3 text-sm"><span>Svetainės nuo <strong>{prices.website}</strong></span><span aria-hidden="true">·</span><span>Kainos ir sąlygos</span><ArrowRight className="size-4" /></a>
        </div>
      </div>
    </section>
    <TrustStrip />
    <Section number="01" label="Paslaugos" title="Pradėkite nuo tos paslaugos, kurios labiausiai trūksta." sand>
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((item, i) => <article key={item.title} className="lift flex flex-col overflow-hidden rounded-lg border border-foreground/20 bg-background">
          {hasMedia(item.id) && <Media id={item.id} className="rounded-none" />}
          <div className="flex flex-1 flex-col p-7 md:p-9">
            <p className={eyebrow}>0{i + 1} / {item.note}</p>
            <h3 className="mt-5 text-3xl font-bold tracking-tight">{item.title}</h3>
            <p className="my-5 max-w-[40ch] text-lg leading-relaxed text-muted-foreground">{item.text}</p>
            <div className="mt-auto"><Link href={item.href}>{item.link}</Link></div>
          </div>
        </article>)}
      </div>
      <div className="mt-7"><Link href="/paslaugos/">Visos paslaugos</Link></div>
    </Section>
    <PhoneCollapse title="Atpažįstate savo kasdienybę?"><ServiceScenarios /></PhoneCollapse>
    <Section number="02" label="Atlikti darbai" title="Mūsų kurtos svetainės.">
      <ProjectGallery />
      <div className="mt-9"><Link href="/darbai/">Visi darbai</Link></div>
    </Section>
    <Section number="03" label="Pasirinkimas" title="Nuo ko pradėti jūsų projektą?" sand>
      <div className="lg:ml-[25%]"><PackageFinder /></div>
    </Section>
    <Testimonials />
    <PhoneCollapse title="Nuo pirmo įspūdžio iki užklausos."><StructureExplorer /></PhoneCollapse>
    <StudioScene />
    <Section number="04" label="Apie mus" title="Kas kuria GraspIT?">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <img src="/img/team/team-professional.webp" alt="Abu GraspIT komandos nariai prie šviesios sienos" width={1086} height={1448} loading="lazy" decoding="async" className="aspect-[4/5] w-full max-w-[360px] rounded-lg object-cover lg:col-span-4" />
        <div className="lg:col-span-8">
          <p className="max-w-[30ch] text-3xl leading-snug font-semibold tracking-tight">Esame dviejų žmonių komanda. Su jumis kalbasi tie, kurie ir kuria.</p>
          <div className="mt-7"><Link href="/apie-mus/">Susipažinkite su mumis</Link></div>
        </div>
      </div>
    </Section>
    <PhoneCollapse title="Patarimai, kaip būti randamam internete"><RelatedArticles path="/" title="Patarimai, kaip būti randamam internete" /></PhoneCollapse>
    <Section number="05" label="Klausimai" title="Prieš užsakant svetainę." sand>
      <div className="lg:ml-[25%]"><FaqItems items={[allFaq[0], allFaq[5], allFaq[19]]} /><div className="mt-6"><Link href="/duk/">Visi klausimai ir atsakymai</Link></div></div>
    </Section>
  </>
}
function Pricing() {
  return (
    <>
    <section className={`${band} bg-secondary`} aria-labelledby="price-anatomy-heading">
      <div className={wrap}>
        <h2 id="price-anatomy-heading" className="ux-eyebrow mb-8"><span className="mr-3 text-[var(--signal)]">01</span>Paslaugų kainos</h2>
        <PriceAnatomy />
      </div>
    </section>
    <section className="pt-16 md:pt-24">
      <div className={`${wrap} grid gap-8 md:grid-cols-2`}>
        <div>
          <h3 className="mb-3 text-2xl font-bold">Kas skaičiuojama atskirai?</h3>
          <p className="leading-relaxed text-muted-foreground">Domenas, talpinimas, mokamų paslaugų mokesčiai ir papildomas turinio rengimas, jei jie neįvardyti pasiūlyme.</p>
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-bold">Priežiūra po paleidimo</h3>
          <p className="leading-relaxed text-muted-foreground">Talpinimo, atnaujinimų ir smulkių pakeitimų planą sudarome atskirai, pagal tai, ko reikia jūsų svetainei.</p>
          <Link href="/duk/#prieziura">Apie pagalbą ir priežiūrą</Link>
        </div>
      </div>
    </section>
    <PackageScope />
    <Section number="02" label="Pasirinkimas" title="Nežinote, kuris variantas tinka?" sand><PackageFinder /></Section>
    </>
  )
}
const processDetails = [
  "Aptariame veiklą, klientus ir tai, ko tikitės iš svetainės.",
  "Per 24 val. po pokalbio atsiunčiame kainą, apimtį ir terminą.",
  "Kuriame. Privačioje nuorodoje matote, kaip juda darbas.",
  "Peržiūrite, rašote pastabas, mes jas įgyvendiname.",
  "Patikriname, paleidžiame, perduodame kodą ir turinį. Dar 30 dienų padedame.",
]
function Process() {
  return (
    <Section
      number="01"
      label="Projekto eiga"
      title="Kaip vyksta darbas?"
    >
<div className="mb-12 grid items-center gap-8 lg:grid-cols-2"><div><p className="text-2xl font-semibold leading-snug">Penki žingsniai. Kainą žinote jau antrame.</p><p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-muted-foreground">Visą laiką žinote, kas vyksta ir kas bus toliau.</p></div>{hasMedia("processWork") ? <Media id="processWork" /> : <div className="aspect-[3/2] overflow-hidden rounded-lg"><TrustPhoto /></div>}</div>
      <ol>
        {lt.process.map((p, i) => (
          <li
            key={p.t}
            className="grid gap-4 border-t border-foreground py-8 lg:grid-cols-12"
          >
            <span className="text-5xl font-bold tracking-tight text-[var(--signal)] lg:col-span-2">
              0{i + 1}
            </span>
            <h3 className="text-2xl font-bold lg:col-span-3">{p.t}</h3>
            <p className="max-w-[65ch] text-lg leading-relaxed text-muted-foreground lg:col-span-7">
              {processDetails[i]}
            </p>
          </li>
        ))}
      </ol>
      <p className="border-t border-foreground pt-6 text-muted-foreground">
        Apie pasikeitusią apimtį ar terminą pasakome iš karto, o ne paleidimo dieną.
      </p>
    </Section>
  )
}
const serviceTitles: Record<ServiceKind, string> = {
  websites: "Kiekviena dalis turi savo paskirtį.",
  shop: "Kiekviena dalis turi savo paskirtį.",
  redesign: "Geresnė svetainė. Išlaikant tai, kas veikia.",
  ai: "Automatizuojame tai, ką galima apibrėžti.",
  apps: "Programa pagal jūsų darbo būdą.",
  seo: "Svetainė, kuria rūpinamasi ir po paleidimo.",
  motion: "Vienas aiškus video, kuris pasako visą žinutę.",
  ads3d: "Produktas, kuris atrodo geriau nei nuotraukoje.",
  social: "Reguliarus turinys be jūsų kūrimo darbo.",
  integrations: "Duomenys keliauja patys.",
  geo: "Sužinokite, ką AI sako apie jūsų verslą.",
  chatbot: "Atsakymas klientui iš karto, net vakare.",
  analytics: "Svarbiausi skaičiai vienoje vietoje.",
  bots: "Pranešimai ir užduotys ten, kur jau bendraujate.",
}
const serviceRows: Record<ServiceKind, string[][]> = {
  websites: [
    ["Aiški struktūra", "Lankytojas greitai randa paslaugas, kainas ir kaip susisiekti."],
    ["Dizainas visiems ekranams", "Išdėstymas pritaikomas telefonams, planšetėms ir kompiuteriams."],
    ["Pagrindas paieškai", "Suplanuojame adresus, antraštes ir aprašymus paieškai."],
  ],
  shop: [
    ["Prekių katalogas", "Suplanuojame kategorijas ir prekių informaciją, kad pirkėjui būtų lengva rasti reikiamą."],
    ["Pirkimo kelias", "Aptariame krepšelį, mokėjimo ir pristatymo būdus. Integracijų mokesčiai nurodomi atskirai."],
    ["Turinio valdymas", "Sutariame, ką norėsite tvarkyti savarankiškai."],
  ],
  redesign: [
    ["Dizainas ir struktūra", "Aiškiau pristatome paslaugas ir sutvarkome navigaciją."],
    ["Mobilioji versija", "Pritaikome tekstą, mygtukus ir išdėstymą mažam ekranui."],
    ["WordPress svetainės", "Netenkina dabartinis dizainas? Aptarsime, ką keisti."],
  ],
  ai: [
    ["Pasikartojantys laiškai", "Laiškų rūšiavimas ir atsakymų ruošimas."],
    ["Darbo procesai", "Sujungiame aiškius žingsnius į vieną procesą."],
    ["Kontrolė ir patikra", "Sutariame, kur sprendimą patvirtina žmogus ir kokie duomenys naudojami."],
  ],
  apps: [
    ["Užsakymų ir užklausų valdymas", "Visa informacija vienoje vietoje, su aiškiomis būsenomis."],
    ["Klientų ir komandos prieiga", "Sutariame, kas ką mato ir ką gali keisti."],
    ["Ataskaitos", "Svarbiausi skaičiai matomi be rankinio skaičiavimo."],
  ],
  seo: [
    ["Techninė būklė", "Tikriname adresus, antraštes, aprašymus ir pritaikymą telefonams."],
    ["Matomumas paieškoje", "Stebime indeksavimą ir paieškos užklausas, atnaujiname pasenusią informaciją."],
    ["Priežiūra", "Talpinimas, atnaujinimai ir smulkūs pakeitimai pagal sutartą planą."],
  ],
  motion: [
    ["Trumpas video", "Apie 15–30 sekundžių, kad žinutė pasakyta, kol žmogus neperslinko toliau."],
    ["Pritaikytas telefonui", "9:16 formatas tinka TikTok, Reels ir Facebook."],
    ["Jūsų stilius", "Naudojame jūsų logotipą, spalvas ir sutartą tekstą."],
  ],
  ads3d: [
    ["3D produkto vaizdas", "Kuriame pagal jūsų nuotraukas ir matmenis."],
    ["Video arba paveikslėliai", "Sukame, artiname, rodome detales, o rezultatą gaunate paruoštą skelbti."],
    ["Peržiūra prieš baigiant", "Parodome rezultatą ir kartu tikriname, ką dar reikia patikslinti."],
  ],
  social: [
    ["4 video per savaitę", "Trumpi, 9:16 formato, skirti TikTok, Reels ar Facebook."],
    ["Du paketai", "Paprastesni įrašai už €200 arba sudėtingesni už €300 per savaitę."],
    ["Aiški tvarka", "Iš anksto sutariame, apie ką kuriame, kas skelbia ir kiek pataisymų įskaičiuota."],
  ],
  integrations: [
    ["Sujungtos sistemos", "El. paštą, lenteles, parduotuvę ir dokumentus sujungiame į vieną grandinę."],
    ["Dokumentai iš duomenų", "Sąskaita ar kitas dokumentas užpildomas iš gauto užsakymo duomenų."],
    ["Aiškiai sutarti duomenys", "Iš anksto sutariame, kokie duomenys kur keliauja ir kas juos mato."],
  ],
  geo: [
    ["Pirkėjo klausimai", "AI asistentams užduodame tuos klausimus, kuriuos užduotų jūsų klientas."],
    ["Kas paminimas", "Užsirašome, ar esate atsakyme, kurioje vietoje ir kas paminimas vietoj jūsų."],
    ["Ką keisti", "Pateikiame darbų sąrašą svetainei ir šaltiniams, kuriais remiasi AI."],
  ],
  chatbot: [
    ["Jūsų informacija", "Asistentas remiasi tik jūsų kainomis, paslaugomis ir atsakymais."],
    ["Perdavimas žmogui", "Ko nežino, nesugalvoja: pasiūlo susisiekti ir surenka kontaktą."],
    ["Patikra prieš paleidimą", "Kartu peržiūrime atsakymus į tikrus klientų klausimus."],
  ],
  analytics: [
    ["Duomenys iš kelių vietų", "Sujungiame parduotuvę, lenteles ir kitas sistemas."],
    ["Skydelis be rankinio darbo", "Ataskaita atsinaujina pati, nereikia jos kas savaitę dėlioti."],
    ["Sutarti rodikliai", "Rodome tuos skaičius, pagal kuriuos priimate sprendimus."],
  ],
  bots: [
    ["Pranešimai", "Nauja užklausa, užsakymas ar klaida iš karto atkeliauja į Telegram ar Discord."],
    ["Stebėjimas ir santraukos", "Botas tikrina šaltinius ir atsiunčia tai, kas svarbu."],
    ["Bendruomenei", "Pasitinka naujus narius, suteikia roles ir atsako į pasikartojančius klausimus."],
  ],
}

function Services({ path }: { path: string }) {
  if (path === "/paslaugos")
    return (
      <>
        <ServiceIndex />
        <ServiceScenarios />
        <Section
          number="04"
          label="Pirmas žingsnis"
          title="Nežinote, nuo ko pradėti?"
        >
          <div className="lg:ml-[25%]">
            <p className="mb-5 max-w-[60ch] text-xl leading-relaxed">
              Pradėkite nuo verslo poreikio. Ar klientui reikia suprasti
              paslaugą ir susisiekti, nusipirkti prekę, ar pateikti informaciją?
              Pagal tai susidėliosime struktūrą.
            </p>
            <Link href="/procesas/">Kaip planuojame projektą</Link>
          </div>
        </Section>
      </>
    )
  const kind: ServiceKind = path.endsWith("el-parduotuves") ? "shop"
    : path.endsWith("ai-agentai") ? "ai"
    : path.endsWith("programos") ? "apps"
    : path.endsWith("seo-prieziura") ? "seo"
    : path.endsWith("svetainiu-atnaujinimas") ? "redesign"
    : path.endsWith("judesio-reklamos") ? "motion"
    : path.endsWith("3d-reklamos") ? "ads3d"
    : path.endsWith("socialiniu-tinklu-paketas") ? "social"
    : path.endsWith("integracijos") ? "integrations"
    : path.endsWith("ai-matomumas") ? "geo"
    : path.endsWith("ai-asistentas") ? "chatbot"
    : path.endsWith("duomenu-analitika") ? "analytics"
    : path.endsWith("botai") ? "bots"
    : "websites"
  const slot = services.find((service) => service.href === path)?.media
  const rows = serviceRows[kind]
  return (
    <>
      <Section number="01" label="Sprendimo dalys" title={serviceTitles[kind]} sand>
        {slot && hasMedia(slot) && <Media id={slot} className="mb-10" />}
        <div className="grid gap-8 md:grid-cols-3">
          {rows.map(([t, d], i) => (
            <article key={t} className="border-t border-foreground pt-5">
              <span className={`${eyebrow} text-[var(--signal)]`}>0{i + 1}</span>
              <h2 className="mt-6 mb-4 text-2xl font-bold">{t}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </Section>
      <ServiceDetails kind={kind} />
    </>
  )
}
function Contact() {
  const readyEmail = contact.email.length > 0
  const readyPhone = contact.phone.length > 0
  const next = [
    ["Pokalbis", "Pirmas 30 minučių pokalbis. Išsiaiškiname jūsų veiklą, tikslą ir ko reikia."],
    ["Pasiūlymas", "Per 24 val. po pokalbio atsiunčiame fiksuotos kainos pasiūlymą su apimtimi ir terminu."],
    ["Jūsų sprendimas", "Darbus pradedame tik jums patvirtinus pasiūlymą. Iki tol niekas jūsų neįpareigoja."],
  ]
  return (
    <Section
      number="01"
      label="Jūsų projektas"
      title="Pradėkime nuo jūsų idėjos"
      sand
      compact
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="order-1 min-w-0 rounded-lg bg-background p-3 sm:p-5 md:p-8">
          <ContactBrief />
          {(readyPhone || readyEmail) && <div className="mt-8 border-t border-foreground/20 pt-6"><p className="mb-3 text-sm text-muted-foreground">Norite susisiekti tiesiogiai?</p>
            {readyPhone && <a href={phoneHref} className="inline-flex min-h-11 items-center gap-3 font-semibold"><Phone className="size-5" aria-hidden="true" />{contact.phone}</a>}
            {readyEmail && <p className="mt-3"><a className={linkStyle} href={`mailto:${contact.email}`}>{contact.email}<ArrowRight className="size-4" /></a></p>}
          </div>}

        </div>
        <div className="order-2">
          {hasMedia("contactPhoto") && <Media id="contactPhoto" className="mb-10" />}
          <h2 className="text-2xl font-bold tracking-tight">Kas bus toliau?</h2>
          <ol className="mt-6 space-y-6">
            {next.map(([t, d], i) => (
              <li key={t} className="flex gap-5 border-t border-foreground pt-4">
                <span className="text-sm text-[var(--signal)]">0{i + 1}</span>
                <div><h3 className="text-xl font-bold">{t}</h3><p className="mt-1 max-w-[48ch] leading-relaxed text-muted-foreground">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
function Work() {
  return <>
    <Section number="01" label="Projektai" title="Nuo poreikio iki veikiančios svetainės.">
      <p className="mb-8 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">Atverkite projekto pristatymą: pamatysite, kam skirta svetainė, iš kokių dalių ji sudaryta ir kodėl padaryta būtent taip.</p>
      <ProjectGallery />
    </Section>
    <Section number="02" label="Daugiau darbų" title="Paleistos svetainės Lenkijos klientams." sand>
      <p className="mb-8 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">Kiekvienai iš jų atnaujintas dizainas gyvoje svetainėje.</p>
      <MoreWorks kind="live" />
    </Section>
    <Section number="03" label="Dizaino pasiūlymai" title="Dizainai, kurie dar nepaleisti.">
      <p className="mb-8 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">Tai dizaino pasiūlymai: jie nėra paleisti klientų svetainėse.</p>
      <MoreWorks kind="proposals" />
    </Section>
    <StructureExplorer />
  </>
}
export function Site({ path = "/" }: { path?: string }) {
  const [menu, setMenu] = useState(false)
  // The header slides away while reading down and at the very bottom; it returns on any scroll up and at the top.
  const [navHidden, setNavHidden] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    const update = () => {
      const y = window.scrollY
      const bottom = document.documentElement.scrollHeight - window.innerHeight
      if (y < 80) { setNavHidden(false); last = y; return }
      if (bottom - y < 4) { setNavHidden(true); last = y; return }
      if (Math.abs(y - last) < 4) return
      setNavHidden(y > last)
      last = y
    }
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  // While the phone menu is open the page behind it stays still, and it closes if the window grows into the desktop layout.
  useEffect(() => {
    if (!menu) return
    const desktop = window.matchMedia("(min-width: 1024px)")
    const leave = () => { if (desktop.matches) setMenu(false) }
    document.documentElement.style.overflow = "hidden"
    desktop.addEventListener("change", leave)
    return () => { document.documentElement.style.overflow = ""; desktop.removeEventListener("change", leave) }
  }, [menu])
  useEffect(() => {
    if (!menu) return
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false)
        document.querySelector<HTMLButtonElement>('[aria-controls="mobilus-meniu"]')?.focus()
      }
    }
    document.addEventListener("keydown", close)
    return () => document.removeEventListener("keydown", close)
  }, [menu])
  const page = pages[path]
  const photo = pageBackdrops[path]
  useEffect(() => {
    document.documentElement.lang = "lt"
    document.title = page?.title ?? "Puslapis nerastas | GraspIT"
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute(
      "content",
      page?.intro ?? "Šis puslapis nerastas. Grįžkite į GraspIT pradžią."
    )
  }, [page])
  return (
    <div data-theme="bento-swiss" className={`min-h-screen ${contact.phone ? "pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0" : ""}`}>
      <a
        href="#turinys"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:p-4"
      >
        Pereiti prie turinio
      </a>
      <div className="bg-foreground text-background">
        <div
          className={`${wrap} flex min-h-9 items-center justify-between gap-4 py-2 text-xs`}
        >
          <span>Svetainės ir el. parduotuvės verslui</span>
          <span>Nepriklausoma studija · LT</span>
        </div>
      </div>
      <header data-hidden={navHidden && !menu ? "true" : undefined} className="site-header sticky top-0 z-40 border-b border-foreground bg-background/95 backdrop-blur">
        <div className={`${wrap} flex h-20 items-center justify-between gap-4`}>
          <a href="/" aria-label="GraspIT – pradžia">
            <Brand />
          </a>
          <nav
            aria-label="Pagrindinis meniu"
            className="hidden items-center gap-6 text-sm font-medium lg:flex"
          >
            {navigation.map(([href, text]) => (
              <a
                key={href}
                href={pageUrl(href)}
                aria-current={
                  path === href || path.startsWith(href + "/")
                    ? "page"
                    : undefined
                }
                className="nav-link py-2"
              >
                {text}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {contact.phone && (
              <a href={phoneHref} className="hidden min-h-11 items-center gap-2 px-2 text-sm font-semibold xl:inline-flex"><Phone className="size-4" aria-hidden="true" />{contact.phone}</a>
            )}
            <a
              href="/kontaktai/"
              style={{ color: "var(--background)" }}
              className="cta-glow hidden min-h-11 items-center rounded-md bg-foreground px-5 text-sm font-semibold text-background sm:inline-flex"
            >
              {siteCopy.ctaShort} <ArrowRight className="ml-3 size-4" />
            </a>
            <button
              type="button"
              aria-label={menu ? "Uždaryti meniu" : "Atverti meniu"}
              aria-expanded={menu}
              aria-controls="mobilus-meniu"
              onClick={() => setMenu(!menu)}
              className="flex size-12 items-center justify-center rounded border border-foreground lg:hidden"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <nav
            id="mobilus-meniu"
            aria-label="Mobilusis meniu"
            className={`${wrap} grid max-h-[calc(100svh-6.5rem)] overflow-y-auto overscroll-contain border-t border-foreground pb-6 lg:hidden`}
          >
            {[...navigation, ["/kontaktai", "Kontaktai"]].map(
              ([href, text]) => (
                <a
                  key={href}
                  className="flex min-h-14 items-center justify-between border-b border-foreground/20 text-xl"
                  href={pageUrl(href)}
                  aria-current={path === href ? "page" : undefined}
                >
                  {text}
                  {path === href && <span aria-hidden="true" className="size-2 rounded-full bg-[var(--signal)]" />}
                </a>
              )
            )}
            <a href="/kontaktai/" className="mt-6 inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-foreground px-6 font-semibold" style={{ color: "var(--background)" }}>{siteCopy.ctaShort}<ArrowRight className="size-4" aria-hidden="true" /></a>
            {contact.phone && <a href={phoneHref} className="mt-3 inline-flex min-h-14 items-center justify-center gap-3 rounded-md border border-foreground/40 px-6 font-semibold"><Phone className="size-4" aria-hidden="true" />{contact.phone}</a>}
          </nav>
        )}
      </header>
      <main id="turinys">
        {!page ? (
          <section className={`${wrap} ${band}`}>
            <h1 className={heading}>Puslapis nerastas.</h1>
            <Link href="/">Grįžti į pradžią</Link>
          </section>
        ) : path === "/" ? (
          <Home />
        ) : (
          <>
            <section className={`${path === "/kontaktai" ? "py-9 md:py-24" : band} ${photo ? "relative isolate overflow-hidden bg-[#0b2219] text-white" : "border-b border-foreground/20"}`}>
              {photo && <PageBackdrop name={photo} />}
              <div className={`${wrap} ${photo ? "relative z-10" : ""}`}>
                <nav
                  aria-label="Naršymo kelias"
                  className={`mb-6 flex flex-wrap items-center gap-2 text-sm ${photo ? "text-white/80" : "text-muted-foreground"}`}
                >
                  <a href="/" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:underline">
                    Pradžia
                  </a>
                  <span aria-hidden="true">/</span>
                  {path.startsWith("/paslaugos/") && (
                    <>
                      <a href="/paslaugos/" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:underline">
                        Paslaugos
                      </a>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                  {path.startsWith("/blogas/") && <><a href="/blogas/" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:underline">Blogas</a><span aria-hidden="true">/</span></>}
                  {path.startsWith("/darbai/") && <><a href="/darbai/" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:underline">Darbai</a><span aria-hidden="true">/</span></>}
                  <span aria-current="page">{page.label}</span>
                </nav>
                <p className={`${eyebrow} ${photo ? "text-[#bfe8d8]" : "text-[var(--signal)]"}`}>
                  {page.label}
                </p>
                <h1 className={path.startsWith("/blogas/") ? "mt-5 mb-8 max-w-[24ch] text-[clamp(1.9rem,5vw,4.6rem)] leading-[1.02] font-bold tracking-[-.045em]" : "mt-5 mb-8 max-w-[20ch] text-[clamp(2rem,7vw,6.4rem)] leading-[.98] font-bold tracking-[-.05em]"}>
                  {page.heading}
                </h1>
                <div className={`grid gap-6 border-t pt-6 lg:grid-cols-12 ${photo ? "border-white/70" : "border-foreground"}`}>
                  <span className="hidden lg:col-span-3 lg:block">
                    <ArrowDown className="size-6" />
                  </span>
                  <p className="max-w-[65ch] text-xl leading-relaxed lg:col-span-8">
                    {page.intro}
                  </p>
                </div>
              </div>
            </section>
            {path.startsWith("/paslaugos") && <Services path={path} />}
            {path === "/kainos" && <Pricing />}
            {path === "/procesas" && <Process />}
            {path === "/apie-mus" && <About />}
            {path === "/darbai" && <Work />}
            {path.startsWith("/darbai/") && <CaseStudy slug={path.split("/")[2]} />}
            {path === "/biblioteka" && <ProjectLibrary />}
            {path === "/kontaktai" && <Contact />}
            {path === "/privatumo-politika" && <Legal kind="privacy" />}
            {path === "/slapukai" && <Legal kind="cookies" />}
            {path === "/blogas" && <BlogIndex />}
            {path.startsWith("/blogas/") && <BlogPost slug={path.split("/")[2]} />}
            {path === "/duk" && (
              <>
                <div
                  className={`${wrap} flex flex-wrap gap-3 py-8`}
                  aria-label="DUK temos"
                >
                  {faqGroups.map((g) => (
                    <a
                      key={g.id}
                      href={`#${g.id}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-foreground px-4 text-sm hover:bg-secondary"
                    >
                      {g.title}
                    </a>
                  ))}
                </div>
                {faqGroups.map((g, i) => (
                  <section
                    key={g.id}
                    id={g.id}
                    className={`${band} scroll-mt-24 ${i % 2 ? "bg-secondary" : "bg-background"}`}
                  >
                    <div className={`${wrap} grid gap-8 lg:grid-cols-12`}>
                      <div className="lg:col-span-4">
                        <p className={`${eyebrow} mb-4 text-[var(--signal)]`}>
                          0{i + 1} / DUK
                        </p>
                        <h2 className="max-w-[16ch] text-3xl font-bold tracking-tight">
                          {g.title}
                        </h2>
                      </div>
                      <div className="lg:col-span-8">
                        <FaqItems items={g.items} />
                      </div>
                    </div>
                  </section>
                ))}
              </>
            )}
          </>
        )}
        {page && ["/paslaugos", "/kainos", "/duk", "/procesas", "/darbai"].some((p) => path === p || path.startsWith(p + "/")) && !path.startsWith("/darbai/") && <RelatedArticles path={path} />}
        {path !== "/kontaktai" && (
          <section className={`${band} bg-[var(--signal)] text-white`}>
            <div className={`${wrap} grid items-end gap-8 lg:grid-cols-12`}>
              <div className="lg:col-span-8">
                <p className={`${eyebrow} mb-6`}>Susisiekime</p>
                <h2 className="max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] leading-none font-bold tracking-[-.045em]">
                  Parašykite, kas jums reikalinga.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="mb-6 text-lg text-white/85">
                  Atsakysime, ką galime padaryti, kiek tai kainuos ir kiek užtruks.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {contact.phone ? (
                    <a href={phoneHref} style={{ color: "var(--foreground)" }} className="inline-flex min-h-[52px] items-center gap-3 rounded-md bg-white px-6 py-3 font-semibold text-foreground"><Phone className="size-4" aria-hidden="true" />{contact.phone}</a>
                  ) : (
                    <a href="/kontaktai/" style={{ color: "var(--foreground)" }} className="cta-glow inline-flex min-h-[52px] items-center gap-4 rounded-md bg-white px-6 py-3 font-semibold text-foreground">{siteCopy.cta} <ArrowRight className="size-4" /></a>
                  )}
                  {contact.phone && <a href="/kontaktai/" className="inline-flex min-h-12 items-center gap-2 border-b border-current py-2 font-semibold text-white">{siteCopy.write}<ArrowRight className="size-4" aria-hidden="true" /></a>}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/80">{siteCopy.note}</p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer links={navigation} />
      {path !== "/kontaktai" && contact.phone && <div aria-hidden="true" className="h-[calc(4.25rem+env(safe-area-inset-bottom))] bg-foreground md:hidden" />}
      <BackToTop />
      {path !== "/kontaktai" && !menu && <MobileCallBar />}
      <CookieNotice path={path} />
    </div>
  )
}

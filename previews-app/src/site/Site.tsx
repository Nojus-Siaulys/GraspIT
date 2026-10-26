import { HeroBackdrop } from "./HeroBackdrop"
import { CaseStudy } from "./CaseStudy"
import { ServiceScenarios, StructureExplorer, PackageScope } from "./DecisionContent"
import { ProjectLibrary } from "./ProjectLibrary"
import { About } from "./About"
import { ProjectGallery } from "./ProjectGallery"
import { StudioScene, TrustPhoto } from "./Photography"
import { contact, phoneHref, siteCopy } from "./settings"
import { MobileCallBar, Testimonials, TrustStrip } from "./Trust"
import { Media } from "./Media"
import { hasMedia, type MediaId } from "./mediaSlots"
import { PackageFinder } from "./PackageFinder"
import { prices, pricingPackages } from "./pricing"
import { ContactBrief } from "./ContactBrief"
import { useEffect, useState, type ReactNode } from "react"
import { ArrowDown, ArrowRight, Check, Menu, Phone, X } from "lucide-react"
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
      <span>GraspIT</span>
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
}: {
  number: string
  label: string
  title: string
  children: ReactNode
  sand?: boolean
}) {
  return (
    <section className={`${band} ${sand ? "bg-secondary" : "bg-background"}`}>
      <div className={wrap}>
        <div className="mb-10 grid gap-4 lg:grid-cols-12">
          <p className={`${eyebrow} lg:col-span-3`}>
            <span className="mr-3 text-[var(--signal)]">{number}</span>
            {label}
          </p>
          <h2 className={`${heading} max-w-[23ch] lg:col-span-9`}>{title}</h2>
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
    { id: "homeNew", title: "Reikia naujos svetainės", text: "Sukursime vietą jūsų paslaugoms, darbams ir kontaktams.", href: "/paslaugos/svetaines/", link: "Apie svetainių kūrimą", note: "Nuo " + prices.website },
    { id: "homeRedesign", title: "Noriu atnaujinti turimą", text: "Atnaujinsime dizainą ir pritaikysime telefonams, taip pat WordPress svetainėms.", href: "/paslaugos/svetainiu-atnaujinimas/", link: "Apie svetainės atnaujinimą", note: "Kaina pagal apimtį" },
  ]
  return <>
    <section className="home-hero">
      <HeroBackdrop />
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-12`}>
        <div className={`hero-copy ${hasMedia("heroVideo") ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <p className={eyebrow}>GraspIT · Svetainės vietiniam verslui</p>
          <h1 className="mt-8 max-w-[16ch] text-[clamp(2.8rem,5.8vw,5.6rem)] font-bold leading-[1.03] tracking-[-.05em]">Kuriame ir atnaujiname svetaines verslui.</h1>
          <p className="mt-7 max-w-[43ch] text-lg leading-relaxed md:text-xl">Padedame vietiniams verslams aiškiai pristatyti paslaugas internete.</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="/kontaktai/" className="hero-primary inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md px-6 py-3 font-semibold">{siteCopy.cta}<ArrowRight className="size-4" /></a>
            <Link href="/darbai/">Peržiūrėti darbus</Link>
          </div>
          <p className="hero-price mt-6 max-w-[48ch] text-sm leading-relaxed">{siteCopy.note}</p>
          <a href="/kainos/" className="hero-price mt-3 inline-flex min-h-11 items-center gap-3 text-sm"><span>Svetainės nuo <strong>{prices.website}</strong></span><span aria-hidden="true">·</span><span>Kainos ir sąlygos</span><ArrowRight className="size-4" /></a>
        </div>
        {hasMedia("heroVideo") && <div className="lg:col-span-5"><Media id="heroVideo" className="shadow-2xl" /></div>}
      </div>
    </section>
    <TrustStrip />
    <Section number="01" label="Paslaugos" title="Ko reikia jūsų verslui?" sand>
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((item, i) => <article key={item.title} className="flex flex-col overflow-hidden rounded-lg border border-foreground/20 bg-background">
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
    <ServiceScenarios />
    <Section number="02" label="Atlikti darbai" title="Kelios mūsų kurtos svetainės.">
      <ProjectGallery />
      <div className="mt-9"><Link href="/darbai/">Visi darbai</Link></div>
    </Section>
    <Section number="03" label="Pasirinkimas" title="Nuo ko pradėti jūsų projektą?" sand>
      <div className="lg:ml-[25%]"><PackageFinder /></div>
    </Section>
    <Testimonials />
    <StructureExplorer />
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
    <Section number="05" label="Klausimai" title="Prieš užsakant svetainę." sand>
      <div className="lg:ml-[25%]"><FaqItems items={[allFaq[0], allFaq[5], allFaq[19]]} /><div className="mt-6"><Link href="/duk/">Visi klausimai ir atsakymai</Link></div></div>
    </Section>
  </>
}
function Pricing() {
  return (
    <>
    <Section
      number="01"
      label="Paketai"
      title="Svetainių kūrimo kainos"
      sand
    >
      <div className="grid gap-6 md:grid-cols-2">
        {pricingPackages.map((p, i) => (
          <article
            key={p.t}
            className={`flex flex-col rounded-lg border border-foreground p-6 md:p-9 ${i ? "bg-foreground text-background" : "bg-background"}`}
          >
            <span className={eyebrow}>0{i + 1} / Vienkartinis kūrimas</span>
            <h2 className="mt-8 text-2xl font-bold">{p.t}</h2>
            <p className="mt-3 mb-5">
              <span className="text-sm">nuo </span>
              <span className="text-6xl font-bold tracking-tight">{p.p}</span>
            </p>
            <p className="mb-8 opacity-75">{p.d}</p>
            <ul className="mb-8 space-y-4">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 border-t border-current/25 pt-3"
                >
                  <Check className="mt-1 size-4 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={"/kontaktai/?" + new URLSearchParams({ paslauga: i ? "Dar nežinau" : "Svetainė", paketas: p.t }).toString()}
              className="mt-auto inline-flex items-center justify-between border-t border-current pt-5 font-semibold"
            >
              Aptarti šį sprendimą
              <ArrowRight className="size-5" />
            </a>
          </article>
        ))}
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-2xl font-bold">Kas skaičiuojama atskirai?</h3>
          <p className="leading-relaxed text-muted-foreground">Domenas, talpinimas, mokamų paslaugų mokesčiai ir papildomas turinio rengimas, jei jie neįvardyti pasiūlyme.</p>
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-bold">Priežiūra po paleidimo</h3>
          <p className="leading-relaxed text-muted-foreground">Talpinimo, atnaujinimų ir smulkių pakeitimų planą derinome individualiai.</p>
          <Link href="/duk/#prieziura">Apie pagalbą ir priežiūrą</Link>
        </div>
      </div>
    </Section>
    <PackageScope />
    <Section number="02" label="Pasirinkimas" title="Nežinote, kuris variantas tinka?" sand><PackageFinder /></Section>
    </>
  )
}
const processDetails = [
  "Aptariame veiklą, auditoriją ir tai, ką svetainė turi pasiekti.",
  "Fiksuotą kainą, apimtį ir terminą atsiunčiame per 24 val. po pokalbio.",
  "Kuriame sutartus puslapius. Jūs gaunate privačią nuorodą ir matote, kaip juda darbas.",
  "Kartu peržiūrime turinį, surenkame pastabas ir jas įgyvendiname.",
  "Patikriname, paleidžiame ir perduodame kodą bei turinį. Toliau 30 dienų padedame.",
]
function Process() {
  return (
    <Section
      number="01"
      label="Projekto eiga"
      title="Kaip vyksta darbas?"
    >
<div className="mb-12 grid items-center gap-8 lg:grid-cols-2"><div><p className="text-2xl font-semibold leading-snug">Pirmiausia susitariame. Tada kuriame.</p><p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-muted-foreground">Viso projekto metu žinote, kas vyksta ir koks kitas žingsnis.</p></div>{hasMedia("processWork") ? <Media id="processWork" /> : <div className="aspect-[3/2] overflow-hidden rounded-lg"><TrustPhoto /></div>}</div>
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
        Apie pasikeitusią apimtį ar terminą kalbamės iš karto.
      </p>
    </Section>
  )
}
function WebsiteRedesign() {
return <><Section number="01" label="Svetainės dizaino atnaujinimas" title="Geresnė svetainė. Išlaikant tai, kas veikia." sand>
{hasMedia("serviceRedesign") && <Media id="serviceRedesign" className="mb-10" />}
<div className="grid gap-8 lg:grid-cols-2"><p className="text-2xl leading-relaxed">Turite svetainę, bet ji nebeatspindi jūsų verslo? Pirmiausia įvertiname, ką verta išlaikyti.</p><div className="space-y-6">{[["Dizainas ir struktūra","Aiškiau pristatome paslaugas ir sutvarkome navigaciją."],["Mobilioji versija","Pritaikome tekstą, mygtukus ir išdėstymą mažam ekranui."],["WordPress svetainės","Netenkina dabartinis dizainas? Aptarsime, ką keisti."]].map(([t,d])=><div key={t} className="border-t border-foreground/30 pt-4"><h3 className="text-xl font-bold">{t}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{d}</p></div>)}</div></div>
</Section><Section number="02" label="Pirmas žingsnis" title="Pradėkime nuo jūsų dabartinės svetainės."><p className="mb-6 max-w-[55ch] text-xl leading-relaxed">Parodykite svetainės adresą ir pasakykite, kas netenkina. Kainą suderinsime pagal apimtį.</p><Link href="/kontaktai/">Aptarti svetainės atnaujinimą</Link></Section></>
}

function Services({ path }: { path: string }) {
  if (path === "/paslaugos/svetainiu-atnaujinimas") return <WebsiteRedesign />
  if (path === "/paslaugos")
    return (
      <>
        <Section
          number="01"
          label="Pasirinkimas"
          title="Mūsų paslaugos"
          sand
        >
          <div className="grid gap-5 md:grid-cols-2">
{services.map((service, index) => (
<a key={service.href} href={pageUrl(service.href)} className="group flex min-h-64 flex-col justify-between rounded-lg border border-foreground bg-background p-6 md:p-9">
<div className="flex items-center justify-between gap-5"><span className={eyebrow}>{service.number} / {index === 0 ? "Aiškus pristatymas" : index === 1 ? "Pardavimas internetu" : index === 2 ? "Mažiau rankinio darbo" : "Svetainės dizaino atnaujinimas"}</span><ArrowRight aria-hidden="true" className="size-6 shrink-0 motion-safe:transition-transform group-hover:translate-x-1" /></div>
<div className="mt-9 grid gap-6 lg:grid-cols-2"><div><h3 className="text-3xl font-bold tracking-tight md:text-4xl">{service.title}</h3><p className="mt-4 max-w-[45ch] text-lg leading-relaxed">{service.text}</p></div><div className="flex flex-col justify-end lg:items-end"><span className="text-3xl font-bold">{service.price}</span><span className="mt-2 text-sm">Pagal sutartą darbų apimtį</span></div></div>
</a>))}
</div>
        </Section>
        <ServiceScenarios />
        <Section
          number="02"
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
  const store = path.endsWith("el-parduotuves")
  const ai = path.endsWith("ai-agentai")
  const slot: MediaId = ai ? "serviceAutomation" : store ? "serviceShop" : "serviceWebsites"
  const rows = ai
    ? [
        [
          "Pasikartojantys laiškai",
          `Laiškų rūšiavimas ir atsakymų ruošimas. Nuo ${prices.email}.`,
        ],
        [
          "Darbo procesai",
          `Sujungiame aiškius žingsnius į vieną procesą. Nuo ${prices.workflow}.`,
        ],
        [
          "Kontrolė ir patikra",
          "Sutariame, kur sprendimą patvirtina žmogus ir kokie duomenys naudojami.",
        ],
      ]
    : store
      ? [
          [
            "Prekių katalogas",
            "Suplanuojame kategorijas ir prekių informaciją, kad pirkėjui būtų lengva rasti reikiamą.",
          ],
          [
            "Pirkimo kelias",
            "Aptariame krepšelį, mokėjimo ir pristatymo būdus. Integracijų mokesčiai nurodomi atskirai.",
          ],
          [
            "Turinio valdymas",
            "Sutariame, ką norėsite tvarkyti savarankiškai.",
          ],
        ]
      : [
          [
            "Aiški struktūra",
            "Lankytojas greitai randa paslaugas, kainas ir kaip susisiekti.",
          ],
          [
            "Dizainas visiems ekranams",
            "Išdėstymas pritaikomas telefonams, planšetėms ir kompiuteriams.",
          ],
          [
            "Pagrindas paieškai",
            "Suplanuojame adresus, antraštes ir aprašymus paieškai.",
          ],
        ]
  return (
    <>
      <Section
        number="01"
        label="Sprendimo dalys"
        title={
          ai
            ? "Automatizuojame tai, ką galima apibrėžti."
            : "Kiekviena dalis turi savo paskirtį."
        }
        sand
      >
        {hasMedia(slot) && <Media id={slot} className="mb-10" />}
        <div className="grid gap-8 md:grid-cols-3">
          {rows.map(([t, d], i) => (
            <article key={t} className="border-t border-foreground pt-5">
              <span className={`${eyebrow} text-[var(--signal)]`}>
                0{i + 1}
              </span>
              <h2 className="mt-6 mb-4 text-2xl font-bold">{t}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {d}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        number="02"
        label="Prieš startą"
        title="Pirmiausia – apimtis ir susitarimas."
      >
        <div className="lg:ml-[25%]">
          <p className="mb-6 max-w-[65ch] text-xl leading-relaxed">
            {ai
              ? "Aptariame dabartinį procesą ir naudojamas priemones. Paslaugų tiekėjų mokesčiai vertinami atskirai. Slaptažodžių per viešą formą nesiųskite."
              : "Išsiaiškiname puslapius, funkcijas ir turinį, tada pateikiame kainą ir terminą. Domenas ir talpinimas aptariami atskirai."}
          </p>
          <Link href={ai ? "/kontaktai/" : "/kainos/"}>
            {ai ? "Aptarti automatizaciją" : "Palyginti paketus ir kainas"}
          </Link>
        </div>
      </Section>
    </>
  )
}
function Contact() {
  const readyEmail = contact.email.length > 0
  const readyPhone = contact.phone.length > 0
  const next = [
    ["Pokalbis", "Pirmas 30 minučių pokalbis nemokamas. Išsiaiškiname jūsų veiklą, tikslą ir ko reikia."],
    ["Pasiūlymas", "Per 24 val. po pokalbio atsiunčiame fiksuotos kainos pasiūlymą su apimtimi ir terminu."],
    ["Jūsų sprendimas", "Darbus pradedame tik jums patvirtinus pasiūlymą. Iki tol niekas jūsų neįpareigoja."],
  ]
  return (
    <Section
      number="01"
      label="Jūsų projektas"
      title="Papasakokite, ko reikia"
      sand
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
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
          <h2 className="mt-12 text-xl font-bold tracking-tight">Pokalbiui nereikia ruoštis</h2>
          <p className="mt-2 max-w-[48ch] leading-relaxed text-muted-foreground">Jei norite, pagalvokite apie tai. Į visa tai atsakysime kartu.</p>
          <ul className="mt-4 space-y-3 text-lg">
            {[
              "Kokia jūsų veikla ir kas yra jūsų klientas?",
              "Reikia naujos svetainės, parduotuvės ar atnaujinimo?",
              "Ką turite: domeną, tekstus, nuotraukas?",
              "Koks numatytas biudžetas ir norimas terminas?",
            ].map((t) => (
              <li key={t} className="border-t border-foreground/25 pt-3">{t}</li>
            ))}
          </ul>
        </div>
        <div className="order-1 rounded-lg bg-background p-7 md:order-1 md:p-10 lg:order-2">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Paprasčiausia – pakalbėti.
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            Trumpai papasakokite apie veiklą ir norimą rezultatą. Techninių sprendimų iš anksto žinoti nereikia.
          </p>
          {readyPhone && <a href={phoneHref} className="inline-flex min-h-[52px] items-center gap-3 rounded-md bg-foreground px-6 py-3 font-semibold text-white"><Phone className="size-5" aria-hidden="true" />{contact.phone}</a>}
          {readyEmail && <p className="mt-5"><a className={linkStyle} href={`mailto:${contact.email}`}>{contact.email}<ArrowRight className="size-4" /></a></p>}
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{siteCopy.note}</p>
          <ContactBrief />

        </div>
      </div>
    </Section>
  )
}
function Work() {
  return <>
    <Section number="01" label="Projektai" title="Nuo poreikio iki konkretaus sprendimo.">
      <p className="mb-8 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">Atverkite projekto pristatymą: pamatysite jo paskirtį, svetainės dalis ir svarbiausių sprendimų logiką.</p>
      <ProjectGallery />
    </Section>
    <StructureExplorer />
  </>
}
export function Site({ path = "/" }: { path?: string }) {
  const [menu, setMenu] = useState(false)
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
  useEffect(() => {
    document.documentElement.lang = "lt"
    document.title = page?.title ?? "Puslapis nerastas | GraspIT"
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute(
      "content",
      page?.intro ?? "Šis puslapis nerastas. Grįžkite į GraspIT pradžią."
    )
  }, [page])
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "lt",
    mainEntity: allFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
  return (
    <div data-theme="bento-swiss" className={`min-h-screen ${contact.phone ? "pb-[4.5rem] md:pb-0" : ""}`}>
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
      <header className="sticky top-0 z-40 border-b border-foreground bg-background/95 backdrop-blur">
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
                className="py-2 underline-offset-8 hover:underline aria-[current=page]:underline"
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
              className="hidden min-h-11 items-center rounded-md bg-foreground px-5 text-sm font-semibold text-background sm:inline-flex"
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
            className={`${wrap} grid border-t border-foreground pb-5 lg:hidden`}
          >
            {[...navigation, ["/kontaktai", "Kontaktai"]].map(
              ([href, text]) => (
                <a
                  key={href}
                  className="border-b border-foreground/20 py-3 text-lg"
                  href={pageUrl(href)}
                  aria-current={path === href ? "page" : undefined}
                >
                  {text}
                </a>
              )
            )}
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
            <section className={`${band} border-b border-foreground/20`}>
              <div className={wrap}>
                <nav
                  aria-label="Naršymo kelias"
                  className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
                >
                  <a href="/" className="inline-flex min-h-11 items-center hover:underline">
                    Pradžia
                  </a>
                  <span aria-hidden="true">/</span>
                  {path.startsWith("/paslaugos/") && (
                    <>
                      <a href="/paslaugos/" className="inline-flex min-h-11 items-center hover:underline">
                        Paslaugos
                      </a>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                  {path.startsWith("/darbai/") && <><a href="/darbai/" className="inline-flex min-h-11 items-center hover:underline">Darbai</a><span aria-hidden="true">/</span></>}
                  <span aria-current="page">{page.label}</span>
                </nav>
                <p className={`${eyebrow} text-[var(--signal)]`}>
                  {page.label}
                </p>
                <h1 className="mt-5 mb-8 max-w-[20ch] text-[clamp(2.7rem,7vw,6.4rem)] leading-[.98] font-bold tracking-[-.05em]">
                  {page.heading}
                </h1>
                <div className="grid gap-6 border-t border-foreground pt-6 lg:grid-cols-12">
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
                      className="rounded-full border border-foreground px-4 py-2 text-sm hover:bg-secondary"
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
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
                  }}
                />
              </>
            )}
          </>
        )}
        {path !== "/kontaktai" && (
          <section className={`${band} bg-[var(--signal)] text-white`}>
            <div className={`${wrap} grid items-end gap-8 lg:grid-cols-12`}>
              <div className="lg:col-span-8">
                <p className={`${eyebrow} mb-6`}>Susisiekime</p>
                <h2 className="max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] leading-none font-bold tracking-[-.045em]">
                  Pakalbėkime apie jūsų svetainę.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="mb-6 text-lg text-white/85">
                  Papasakokite apie savo veiklą. Pasakysime, ką galime padaryti, kiek tai kainuos ir kiek laiko užtruks.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {contact.phone ? (
                    <a href={phoneHref} style={{ color: "var(--foreground)" }} className="inline-flex min-h-[52px] items-center gap-3 rounded-md bg-white px-6 py-3 font-semibold text-foreground"><Phone className="size-4" aria-hidden="true" />{contact.phone}</a>
                  ) : (
                    <a href="/kontaktai/" style={{ color: "var(--foreground)" }} className="inline-flex min-h-[52px] items-center gap-4 rounded-md bg-white px-6 py-3 font-semibold text-foreground">{siteCopy.cta} <ArrowRight className="size-4" /></a>
                  )}
                  {contact.phone && <a href="/kontaktai/" className="inline-flex min-h-12 items-center gap-2 border-b border-current py-2 font-semibold text-white">{siteCopy.write}<ArrowRight className="size-4" aria-hidden="true" /></a>}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/80">{siteCopy.note}</p>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="bg-foreground py-12 text-background">
        <div className={wrap}>
          <div className="grid gap-10 border-b border-background/25 pb-10 md:grid-cols-2">
            <div>
              <a href="/" className="inline-flex min-h-11 items-center text-2xl font-bold tracking-tight"><Brand /></a>
              <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-background/65">
                Svetainės, el. parduotuvės ir aiškūs sprendimai jūsų verslui.
              </p>
              {(contact.phone || contact.email) && (
                <p className="mt-5 grid gap-1 text-sm">
                  {contact.phone && <a href={phoneHref} className="inline-flex min-h-11 items-center gap-2 font-semibold hover:underline"><Phone className="size-4" aria-hidden="true" />{contact.phone}</a>}
                  {contact.email && <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center hover:underline">{contact.email}</a>}
                </p>
              )}
            </div>
            <nav
              aria-label="Poraštės meniu"
              className="grid grid-cols-2 gap-4 text-sm"
            >
              {[...navigation, ["/kontaktai", "Kontaktai"]].map(([href, t]) => (
                <a key={href} href={pageUrl(href)} className="inline-flex min-h-11 items-center hover:underline">
                  {t}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-4 text-xs text-background/60">
            <span>© GraspIT</span>
            <span>Svetainių kūrimas ir atnaujinimas</span>
          </div>
        </div>
      </footer>
      {path !== "/kontaktai" && <MobileCallBar />}
    </div>
  )
}

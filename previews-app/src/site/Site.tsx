import { useEffect, useState, type ReactNode } from "react"
import { ArrowDown, ArrowRight, Check, Menu, X } from "lucide-react"
import { lt, img } from "@/content-lt"
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
const buttonStyle =
  "inline-flex min-h-[52px] items-center justify-center gap-3 rounded-md bg-foreground px-6 py-3 font-semibold text-background hover:bg-[var(--signal)]"

function Brand() {
  return (
    <span className="font-display text-2xl font-extrabold tracking-tight">
      Grasp<span className="text-[var(--signal)]">IT</span>
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
function ServiceList() {
  return (
    <div className="border-b border-foreground">
      {services.map((s) => (
        <a
          href={pageUrl(s.href)}
          key={s.href}
          className="group grid items-baseline gap-3 border-t border-foreground py-7 lg:grid-cols-12"
        >
          <span className={`${eyebrow} text-[var(--signal)] lg:col-span-1`}>
            {s.number}
          </span>
          <h3 className="text-2xl font-bold tracking-tight lg:col-span-4">
            {s.title}
          </h3>
          <p className="max-w-[40ch] text-muted-foreground lg:col-span-4">
            {s.text}
          </p>
          <span className="font-semibold lg:col-span-2">{s.price}</span>
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 lg:justify-self-end" />
        </a>
      ))}
    </div>
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
  return (
    <>
      <section className={`${band} bg-background`}>
        <div className={wrap}>
          <p className={`${eyebrow} text-[var(--signal)]`}>
            Svetainių kūrimas verslui · Lietuva
          </p>
          <h1 className="mt-6 max-w-[16ch] text-[clamp(3rem,8.5vw,7.4rem)] leading-[.96] font-bold tracking-[-.055em]">
            Pirmiausia suprantame.
            <br />
            <span className="text-[var(--signal)]">Tada kuriame.</span>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-foreground pt-6 lg:grid-cols-12">
            <p className="max-w-[43ch] text-xl leading-relaxed lg:col-span-6">
              {pages["/"].intro}
            </p>
            <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:col-start-8">
              <a
                className={buttonStyle}
                style={{ color: "var(--background)" }}
                href="/kontaktai/"
              >
                Aptarkime jūsų projektą <ArrowRight className="size-4" />
              </a>
              <p className="text-sm text-muted-foreground">
                Svetainės nuo €350 · kodas ir turinys jūsų
              </p>
            </div>
          </div>
          <div className="relative mt-12 overflow-hidden">
            <img
              src={img.hero}
              alt="Pokalbis apie būsimą projektą prie bendro stalo"
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover grayscale md:aspect-[21/7]"
            />
            <span className="absolute bottom-4 left-4 bg-background px-4 py-2 text-sm font-medium">
              Aiškumas nuo pirmo pokalbio.
            </span>
          </div>
        </div>
      </section>
      <div className="bg-foreground py-8 text-background">
        <div className={`${wrap} grid gap-6 sm:grid-cols-3`}>
          {[
            ["01", "Fiksuota kaina prieš pradedant"],
            ["02", "Matote darbą kūrimo metu"],
            ["03", "30 dienų pagalbos po paleidimo"],
          ].map(([n, t]) => (
            <p key={n} className="border-t border-background/30 pt-3 text-sm">
              <span className="mr-4 opacity-60">{n}</span>
              {t}
            </p>
          ))}
        </div>
      </div>
      <Section
        number="01"
        label="Ką kuriame"
        title="Jūsų tikslui. Ne dėl funkcijų skaičiaus."
        sand
      >
        <ServiceList />
        <div className="mt-6">
          <Link href="/paslaugos/">Plačiau apie paslaugas</Link>
        </div>
      </Section>
      <Section
        number="02"
        label="Kaip dirbame"
        title="Nuo „reikia svetainės“ iki aiškaus plano."
      >
        <div className="grid gap-8 md:grid-cols-3 lg:ml-[25%]">
          {[
            [
              "Išgirstame",
              "Išsiaiškiname, kas jūsų klientas ir ką jis turėtų padaryti svetainėje.",
            ],
            [
              "Sutariame",
              "Apibrėžiame puslapius, funkcijas, kainą ir terminą.",
            ],
            [
              "Sukuriame",
              "Rodome peržiūrą, aptariame pastabas ir pasiruošiame paleidimui.",
            ],
          ].map(([t, d], i) => (
            <div key={t} className="border-t border-foreground pt-4">
              <span className="text-sm text-[var(--signal)]">0{i + 1}</span>
              <h3 className="mt-5 mb-3 text-2xl font-bold">{t}</h3>
              <p className="text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 lg:ml-[25%]">
          <Link href="/procesas/">Visi penki projekto etapai</Link>
        </div>
      </Section>
      <Section
        number="03"
        label="Studija"
        title="Dirbame dviese. Mąstome kartu."
        sand
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="text-2xl leading-snug font-semibold lg:col-span-5">
            Už svetainės – žmonės, kurie nori suprasti jūsų verslą.
          </p>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Bendraujate tiesiogiai su kūrėjais. Pirmiausia išklausome, tada
              siūlome struktūrą ir dizainą. Kad lankytojas suprastų jūsų vertę
              ir žinotų, ką daryti toliau.
            </p>
            <Link href="/apie-mus/">Susipažinkite su mūsų požiūriu</Link>
          </div>
        </div>
      </Section>
      <Section
        number="04"
        label="Prieš pradedant"
        title="Turbūt jau turite klausimų."
      >
        <div className="lg:ml-[25%]">
          <FaqItems items={[allFaq[0], allFaq[5], allFaq[19]]} />
          <div className="mt-6">
            <Link href="/duk/">Visi klausimai ir atsakymai</Link>
          </div>
        </div>
      </Section>
    </>
  )
}
function Pricing() {
  return (
    <Section
      number="01"
      label="Paketai"
      title="Pasirinkite tinkamą pradžią."
      sand
    >
      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            t: "Pradinė svetainė",
            p: "€350",
            d: "Aiškus jūsų verslo pristatymas.",
            features: [
              "Iki 4 puslapių",
              "Pritaikymas telefonams ir planšetėms",
              "Orientacinis terminas – 7 dienos",
              "Kodo ir turinio perdavimas",
              "30 dienų pagalbos po paleidimo",
            ],
          },
          {
            t: "Verslo svetainė / el. parduotuvė",
            p: "€700",
            d: "Kai reikia daugiau turinio ar pardavimo internetu.",
            features: [
              "Puslapių skaičius pagal sutartą struktūrą",
              "Turinio valdymas",
              "El. parduotuvė pagal sutartą apimtį",
              "Orientacinis terminas – 14 dienų",
              "Kodo perdavimas ir 30 dienų pagalbos",
            ],
          },
        ].map((p, i) => (
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
              href="/kontaktai/"
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
          <h3 className="mb-3 text-2xl font-bold">
            Kas skaičiuojama atskirai?
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Domenas, talpinimas, mokamų paslaugų mokesčiai ir papildomas turinio
            rengimas, jei jie neįvardyti pasiūlyme. Prieš pradėdami atskiriame
            vienkartines ir periodines išlaidas. Mokesčių taikymą ir galutinę
            mokėtiną sumą nurodome individualiame pasiūlyme.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-bold">Priežiūra po paleidimo</h3>
          <p className="leading-relaxed text-muted-foreground">
            Galime aptarti talpinimo, atnaujinimų ir smulkių pakeitimų planą. Jo
            kaina priklauso nuo apimties ir derinama individualiai.
          </p>
          <Link href="/duk/#prieziura">Apie pagalbą ir priežiūrą</Link>
        </div>
      </div>
    </Section>
  )
}
const processDetails = [
  "Išsiaiškiname veiklą, auditoriją, svetainės tikslą ir turimas priemones. Aptariame, kas svarbiausia lankytojui, ir kokio rezultato tikitės.",
  "Pasiūlyme apibrėžiame puslapius, funkcijas, darbų apimtį, mokėjimo sąlygas ir terminą. Fiksuotos kainos pasiūlymą pateikiame per 24 val. po pokalbio.",
  "Paruošiame struktūrą ir dizainą, kuriame sutartus puslapius. Jūs gaunate privačią nuorodą ir matote, kaip juda darbas.",
  "Kartu peržiūrime turinį, navigaciją ir pagrindinius veiksmus. Surenkame pastabas, atskiriame sutartus pataisymus nuo naujų funkcijų.",
  "Patikriname svetainę, paleidžiame ir perduodame kodą bei turinį. Aptariame prieigas ir naudojamas paslaugas. Toliau teikiame 30 dienų pagalbą.",
]
function Process() {
  return (
    <Section
      number="01"
      label="Projekto eiga"
      title="Penki žingsniai. Be spėliojimo."
    >
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
        Terminą skaičiuojame pagal sutartą grafiką ir turinio paruošimą. Apie
        pasikeitusią apimtį ar vėluojančius sprendimus kalbamės iš karto.
      </p>
    </Section>
  )
}
function About() {
  return (
    <>
      <Section
        number="01"
        label="Mūsų požiūris"
        title="Ne nuo šablono. Nuo supratimo."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <p className="text-2xl leading-snug font-semibold">
            Gera svetainė turi aiškiai atsakyti: ką siūlote, kam tai skirta ir
            kodėl verta kreiptis.
          </p>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>{lt.about.story[0]}</p>
            <p>
              Maža komanda leidžia išlaikyti tiesioginį ryšį. Sprendimus
              aiškiname paprastai, o darbą rodome dar kūrimo metu.
            </p>
          </div>
        </div>
      </Section>
      <Section
        number="02"
        label="Darbo principai"
        title="Aiškūs susitarimai yra gero darbo dalis."
        sand
      >
        <div className="lg:ml-[25%]">
          {lt.about.ethic.map((e) => (
            <div
              key={e.t}
              className="grid gap-3 border-t border-foreground py-6 md:grid-cols-2"
            >
              <h3 className="text-xl font-bold">{e.t}</h3>
              <p className="text-lg text-muted-foreground">{e.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
function Services({ path }: { path: string }) {
  if (path === "/paslaugos")
    return (
      <>
        <Section
          number="01"
          label="Pasirinkimas"
          title="Ką turėtų padėti padaryti jūsų svetainė?"
          sand
        >
          <ServiceList />
        </Section>
        <Section
          number="02"
          label="Pirmas žingsnis"
          title="Nežinote, ko tiksliai reikia?"
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
  const rows = ai
    ? [
        [
          "Pasikartojantys laiškai",
          "Aptariame laiškų rūšiavimą, informacijos ištraukimą ir atsakymų ruošimą. El. pašto automatizacija – nuo €950.",
        ],
        [
          "Darbo procesai",
          "Sujungiame aiškiai apibrėžtus žingsnius ir įvertiname naudojamas sistemas. Procesų automatizacija – nuo €1 500.",
        ],
        [
          "Kontrolė ir patikra",
          "Sutariame, kur sprendimą patvirtina žmogus, kokie duomenys naudojami ir kaip vertinamas rezultatas.",
        ],
      ]
    : store
      ? [
          [
            "Prekių katalogas",
            "Suplanuojame kategorijas, prekių informaciją ir pasirinkimus, kad pirkėjui būtų lengva rasti tai, ko reikia.",
          ],
          [
            "Pirkimo kelias",
            "Aptariame krepšelį, mokėjimo ir pristatymo būdus. Konkrečios integracijos ir jų mokesčiai įvardijami atskirai.",
          ],
          [
            "Turinio valdymas",
            "Iš anksto sutariame, kokias prekes, tekstus ir informaciją norėsite tvarkyti savarankiškai.",
          ],
        ]
      : [
          [
            "Aiški struktūra",
            "Atskirai pristatome tai, ką lankytojas nori sužinoti: paslaugas, kainas, jūsų požiūrį ir kitą žingsnį.",
          ],
          [
            "Dizainas visiems ekranams",
            "Pritaikome išdėstymą telefonams, planšetėms ir kompiuteriams, išlaikydami aiškią teksto ir veiksmų hierarchiją.",
          ],
          [
            "Pagrindas paieškai",
            "Suplanuojame puslapių adresus, antraštes ir aprašymus. Sutartą SEO darbų apimtį įvardijame pasiūlyme.",
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
              ? "Aptariame dabartinį procesą, naudojamas priemones ir duomenų prieigas. Paslaugų tiekėjų mokesčiai bei priežiūra vertinami atskirai. Slaptažodžių ar jautrių duomenų per viešą formą nesiųskite."
              : "Išsiaiškiname reikalingus puslapius, funkcijas ir turinį. Tuomet pateikiame kainą ir terminą. Domeno, talpinimo ir papildomų paslaugų išlaidas aptariame atskirai."}
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
  const readyEmail = !lt.email.startsWith("[")
  const readyPhone = !lt.phone.startsWith("[")
  return (
    <Section
      number="01"
      label="Jūsų projektas"
      title="Keli sakiniai, nuo kurių pradėsime."
      sand
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <ol className="space-y-6">
            {[
              "Kokia jūsų veikla ir kas yra jūsų klientas?",
              "Reikia naujos svetainės, parduotuvės ar atnaujinimo?",
              "Ką turite: domeną, tekstus, nuotraukas?",
              "Koks numatytas biudžetas ir norimas terminas?",
            ].map((t, i) => (
              <li
                key={t}
                className="flex gap-5 border-t border-foreground pt-4 text-xl"
              >
                <span className="text-sm text-[var(--signal)]">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-lg bg-background p-7 md:p-10">
          <h2 className="mb-5 text-3xl font-bold tracking-tight">
            Aptarkime, ko jums reikia.
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            Pirmas 30 minučių pokalbis nemokamas. Po jo paruošiame fiksuotos
            kainos pasiūlymą pagal aptartą apimtį.
          </p>
          {readyEmail && (
            <a className={linkStyle} href={`mailto:${lt.email}`}>
              {lt.email}
              <ArrowRight className="size-4" />
            </a>
          )}
          {readyPhone && (
            <p className="mt-5">
              <a
                className={linkStyle}
                href={`tel:${lt.phone.replace(/\s/g, "")}`}
              >
                {lt.phone}
              </a>
            </p>
          )}
          {!readyEmail && !readyPhone && (
            <p className="border-t border-foreground pt-5 text-muted-foreground">
              Tiesioginiai studijos kontaktai dar ruošiami. Užklausų priėmimas
              šioje svetainės versijoje kol kas neveikia.
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}
function Work() {
  return (
    <Section
      number="01"
      label="Vizualinė kryptis"
      title="Daugiau aiškumo. Mažiau triukšmo."
      sand
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div
          className="overflow-hidden rounded-lg border border-foreground bg-background p-6 md:p-10"
          aria-label="GraspIT dizaino principų demonstracija"
        >
          <span className={eyebrow}>GraspIT / Dizaino studija</span>
          <p className="my-10 text-5xl leading-none font-bold tracking-tight">
            Svarbu tai,
            <br />
            kas padeda
            <br />
            <span className="text-[var(--signal)]">suprasti.</span>
          </p>
          <div className="grid grid-cols-3 gap-3">
            {["#10372b", "#1f6b4f", "#f3efe6"].map((color) => (
              <div
                key={color}
                className="aspect-square rounded-md border border-foreground/20"
                style={{ background: color }}
              />
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Miško žalia · smėlis · aiški tipografija
          </p>
        </div>
        <div>
          <h2 className="mb-5 text-3xl font-bold">
            Šios svetainės dizaino kryptis
          </h2>
          <p className="mb-5 text-lg leading-relaxed text-muted-foreground">
            „Bento × Swiss“ jungia tvarkingą tinklelio struktūrą, ryškią
            antraščių hierarchiją ir saikingai naudojamus informacijos blokus.
            Šis maketas yra studijos dizaino demonstracija.
          </p>
          <p className="mb-5 text-muted-foreground">
            Patvirtintus klientų projektus ir jų rezultatus pristatysime
            atskirai. Demonstracijos nepateikiame kaip kliento darbo.
          </p>
          <Link href="/paslaugos/">Ką galime sukurti jūsų verslui</Link>
        </div>
      </div>
    </Section>
  )
}
export function Site({ path = "/" }: { path?: string }) {
  const [menu, setMenu] = useState(false)
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
    <div
      data-theme="bento-swiss"
      data-palette="forest"
      className="min-h-screen"
    >
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
            <a
              href="/kontaktai/"
              style={{ color: "var(--background)" }}
              className="hidden min-h-11 items-center rounded-md bg-foreground px-5 text-sm font-semibold text-background sm:inline-flex"
            >
              Aptarkime projektą <ArrowRight className="ml-3 size-4" />
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
                  className="mb-10 flex flex-wrap gap-2 text-sm text-muted-foreground"
                >
                  <a href="/" className="hover:underline">
                    Pradžia
                  </a>
                  <span aria-hidden="true">/</span>
                  {path.startsWith("/paslaugos/") && (
                    <>
                      <a href="/paslaugos/" className="hover:underline">
                        Paslaugos
                      </a>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
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
                <p className={`${eyebrow} mb-6`}>Kitas žingsnis</p>
                <h2 className="max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] leading-none font-bold tracking-[-.045em]">
                  Jūsų verslas turi ką papasakoti.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="mb-6 text-lg text-white/80">
                  Padėkime klientams tai suprasti. Pradėkime nuo pokalbio apie
                  jūsų svetainę.
                </p>
                <a
                  href="/kontaktai/"
                  style={{ color: "#10372b" }}
                  className="inline-flex min-h-[52px] items-center gap-4 rounded-md bg-white px-6 py-3 font-semibold text-[#10372b]"
                >
                  Aptarkime projektą <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="bg-foreground py-12 text-background">
        <div className={wrap}>
          <div className="grid gap-10 border-b border-background/25 pb-10 md:grid-cols-2">
            <div>
              <a href="/" className="text-2xl font-bold tracking-tight">
                GraspIT
              </a>
              <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-background/65">
                Svetainės, el. parduotuvės ir aiškūs sprendimai jūsų verslui.
              </p>
            </div>
            <nav
              aria-label="Poraštės meniu"
              className="grid grid-cols-2 gap-4 text-sm"
            >
              {[...navigation, ["/kontaktai", "Kontaktai"]].map(([href, t]) => (
                <a key={href} href={pageUrl(href)} className="hover:underline">
                  {t}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-4 text-xs text-background/60">
            <span>© GraspIT</span>
            <span>Pirmiausia suprantame. Tada kuriame.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

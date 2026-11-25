import { useRef, useState } from "react"
import { ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react"

import { serviceGroups, services } from "./content"
import { details, type ServiceKind } from "./serviceDetails"
import { serviceIcons } from "./serviceIcons"

// What raises each price, shortened from that service's own price note and price FAQ in serviceDetails.ts.
// The business website has none written yet, so its column is left out.
const priced: Record<string, [kind: ServiceKind, raises: string[]]> = {
  "/paslaugos/svetaines": ["websites", []],
  "/paslaugos/el-parduotuves": ["shop", ["Didesnis katalogas", "Prekių variantai", "Daugiau mokėjimo ir pristatymo būdų", "Integracijos"]],
  "/paslaugos/svetainiu-atnaujinimas": ["redesign", ["Dabartinės svetainės apimtis"]],
  "/paslaugos/seo-prieziura": ["seo", ["Talpinimo darbai", "Atnaujinimai", "Smulkūs pakeitimai"]],
  "/paslaugos/ai-matomumas": ["geo", ["Daugiau tikrinamų klausimų", "Daugiau AI asistentų"]],
  "/paslaugos/programos": ["apps", ["Programos apimtis"]],
  "/paslaugos/ai-agentai": ["ai", ["Proceso apimtis"]],
  "/paslaugos/integracijos": ["integrations", ["Daugiau sistemų", "Ilgesnė jų grandinė"]],
  "/paslaugos/ai-asistentas": ["chatbot", ["Kur asistentas veiks", "Kiek informacijos jam reikia"]],
  "/paslaugos/duomenu-analitika": ["analytics", ["Daugiau duomenų šaltinių", "Daugiau ataskaitų"]],
  "/paslaugos/telegram-discord-botai": ["bots", ["Daugiau boto užduočių", "Integracijos"]],
  "/paslaugos/judesio-reklamos": ["motion", ["Ilgesnis video", "Didesnis sudėtingumas"]],
  "/paslaugos/3d-reklamos": ["ads3d", ["Sudėtingesnis produktas", "Ilgesnis video"]],
  "/paslaugos/socialiniu-tinklu-paketas": ["social", ["Daugiau judesio", "Sudėtingesni efektai"]],
}

const heading = "ux-eyebrow mb-3 text-[var(--signal)]"
const line = "relative rounded-lg px-4 py-3 font-semibold lg:before:absolute lg:before:top-1/2 lg:before:w-14 lg:before:border-t-2 lg:before:border-foreground/25"
const arrow = "grid size-10 place-items-center rounded-md border border-foreground hover:bg-foreground hover:text-background md:size-12"

// One service's price as a diagram: what is in it on the left, the price in the middle, what raises it on the right.
function Anatomy({ service }: { service: (typeof services)[number] }) {
  const [kind, raises] = priced[service.href]
  const detail = details[kind]
  const row = (start: string) => detail.gets.find(([label]) => label.startsWith(start))?.[1]
  const amount = service.price.replace(/^(nuo |Kaina (aptariama )?)/, "")
  const outside = row("Ko kainoje")
  const time = row("Kiek")
  return <>
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_380px_1fr] lg:gap-x-14">
      <div className="max-lg:order-2">
        <h4 className={heading}>Įeina į kainą</h4>
        <ul className="grid gap-2.5">
          {detail.included.items.map((item) => <li key={item} className={`${line} border-l-[6px] border-[var(--signal)] bg-background lg:before:left-full`}>{item}</li>)}
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl bg-foreground p-7 text-center text-background max-lg:order-1 lg:aspect-square lg:rounded-full lg:p-9">
        <h3 className="text-lg font-bold">{service.title}</h3>
        <p className={`my-2 font-bold leading-[1.05] ${amount.length > 6 ? "text-4xl" : "text-7xl lg:text-[5.25rem]"}`}>
          {service.price.startsWith("nuo ") && <span className="block text-lg font-semibold leading-none">nuo</span>}
          {amount}
        </p>
        <p className="text-sm text-[#bfe8d8]">{row("Ką gau")}</p>
      </div>
      {raises.length > 0 && <div className="max-lg:order-3">
        <h4 className={heading}>Kas didina kainą</h4>
        <ul className="grid gap-2.5">
          {raises.map((item) => <li key={item} className={`${line} flex items-start gap-2 border border-[var(--raise-border)] bg-[var(--raise)] lg:before:right-full`}><ArrowUp aria-hidden="true" className="mt-1 size-4 shrink-0" />{item}</li>)}
        </ul>
      </div>}
    </div>
    {outside && <div className="mt-8 rounded-lg border-2 border-dashed border-foreground/50 px-5 py-4">
      <h4 className="ux-eyebrow mb-1">Į kainą neįeina</h4>
      <p>{outside}</p>
    </div>}
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {time && <div className="border-t-2 border-foreground pt-3"><h4 className={heading}>Kiek užtrunka</h4><p>{time}</p></div>}
      <div className="border-t-2 border-foreground pt-3"><h4 className={heading}>Ką darote jūs</h4><p>{row("Ką darote")}</p></div>
      <a href={`/kontaktai/?paslauga=${encodeURIComponent(detail.service)}`} className="inline-flex min-h-14 items-center justify-center gap-3 self-start rounded-md bg-foreground px-6 font-semibold text-background!">
        Aptarti šią kainą<ArrowRight aria-hidden="true" className="size-4" />
      </a>
    </div>
  </>
}

export function PriceAnatomy() {
  const [active, setActive] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const settle = useRef(0)
  const itemWidth = () => (track.current?.firstElementChild as HTMLElement).offsetWidth
  function choose(index: number) {
    const next = (index + services.length) % services.length
    setActive(next)
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    track.current?.scrollTo({ left: next * itemWidth(), behavior: calm ? "auto" : "smooth" })
  }
  // A swipe picks whatever came to rest in the middle.
  function onScroll() {
    window.clearTimeout(settle.current)
    settle.current = window.setTimeout(() => {
      if (track.current) setActive(Math.round(track.current.scrollLeft / itemWidth()))
    }, 150)
  }
  return <>
    <div className="mb-2 flex justify-between gap-4 md:px-[60px]">
      <p className="ux-eyebrow text-[var(--signal)]">{serviceGroups.find((group) => group.id === services[active].group)?.title}</p>
      <p className="ux-eyebrow whitespace-nowrap text-[var(--signal)]">{active + 1} / {services.length}</p>
    </div>
    <div className="mb-10 grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-1.5 md:grid-cols-[3rem_minmax(0,1fr)_3rem] md:gap-3">
      <button type="button" aria-label="Ankstesnė paslauga" onClick={() => choose(active - 1)} className={arrow}><ChevronLeft aria-hidden="true" className="size-5" /></button>
      <div ref={track} onScroll={onScroll} role="group" aria-label="Pasirinkite paslaugą" className="relative flex snap-x snap-mandatory overflow-x-auto px-[calc(50%-75px)] [mask-image:linear-gradient(90deg,transparent,#000_24%,#000_76%,transparent)] [scrollbar-width:none] md:px-[calc(50%-92px)] [&::-webkit-scrollbar]:hidden">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.href]
          return <button key={service.href} type="button" aria-pressed={index === active} onClick={() => choose(index)} className={`flex w-[150px] shrink-0 snap-center flex-col items-center gap-2.5 border-b-[3px] px-3 pt-4 pb-4 text-center text-sm font-semibold leading-snug md:w-[184px] ${index === active ? "rounded-t-md border-foreground bg-background" : "border-foreground/15"}`}>
            <Icon aria-hidden="true" className="size-6" />{service.title}
          </button>
        })}
      </div>
      <button type="button" aria-label="Kita paslauga" onClick={() => choose(active + 1)} className={arrow}><ChevronRight aria-hidden="true" className="size-5" /></button>
    </div>
    {/* Every price stays in the page for search engines; only the chosen one is shown. */}
    {services.map((service, index) => <div key={service.href} hidden={index !== active}><Anatomy service={service} /></div>)}
  </>
}

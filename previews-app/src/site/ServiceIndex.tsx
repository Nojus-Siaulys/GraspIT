import { useState, useSyncExternalStore } from "react"
import { ArrowRight } from "lucide-react"

import { serviceGroups, services, type Service } from "./content"
import { Media } from "./Media"
import { serviceIcons } from "./serviceIcons"

// One service's demo, text and price, shown beside the list on wide screens.
function ServiceInfo({ service, video }: { service: Service; video: boolean }) {
  return <>
    {video && service.media && <Media id={service.media} className="mb-6 border border-foreground/20" />}
    <p className="text-lg leading-relaxed text-muted-foreground">{service.text}</p>
    <p className="ux-eyebrow mt-5 text-[var(--signal)]">Ką gausite</p>
    <p className="mt-2 leading-relaxed">{service.gets}</p>
    <p className="mt-5 text-2xl font-bold">{service.price}</p>
    {/* text-background! because the theme's unlayered `a { color: inherit }` beats a plain utility. */}
    <a href={`${service.href}/`} className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-md bg-foreground px-5 font-semibold text-background!">
      Apie paslaugą<span className="sr-only">: {service.title}</span>
      <ArrowRight aria-hidden="true" className="size-4" />
    </a>
  </>
}

// Phones and tablets get tiles instead of the list: icon, name and a short price, the whole tile is the link.
function Tile({ service }: { service: Service }) {
  const Icon = serviceIcons[service.href]
  return <a href={`${service.href}/`} className="flex h-full flex-col rounded-lg border border-foreground/20 bg-background p-3 lg:hidden">
    <Icon aria-hidden="true" className="size-6 text-[var(--signal)]" />
    <h3 className="mt-3 mb-2 text-[clamp(0.8125rem,3.8vw,0.95rem)] font-bold leading-snug">{service.title}</h3>
    <p className="mt-auto text-sm text-muted-foreground first-letter:uppercase">{service.price.replace(/^Kaina (aptariama )?/, "")}</p>
  </a>
}

// The preview is hidden below 1024 px, so its video is not added there either: a phone must not download it.
const wideScreen = "(min-width: 1024px)"
function onWidthChange(notify: () => void) {
  const query = window.matchMedia(wideScreen)
  query.addEventListener("change", notify)
  return () => query.removeEventListener("change", notify)
}

export function ServiceIndex() {
  const [active, setActive] = useState(services[0])
  const wide = useSyncExternalStore(onWidthChange, () => window.matchMedia(wideScreen).matches, () => false)
  return <section className="bg-secondary py-10 md:py-16">
    <div className="mx-auto grid max-w-[1280px] gap-14 px-5 md:px-8 lg:grid-cols-2">
      <div className="space-y-8 lg:space-y-14">
        {serviceGroups.map((group, groupIndex) => <div key={group.id} id={group.id} className="scroll-mt-24">
          <p className="ux-eyebrow text-[var(--signal)] max-lg:hidden">0{groupIndex + 1}</p>
          <h2 className="text-2xl font-bold tracking-tight lg:mt-2 lg:text-4xl">{group.title}</h2>
          <p className="mt-3 mb-6 max-w-[48ch] text-lg leading-relaxed text-muted-foreground max-lg:hidden">{group.text}</p>
          <ul className="grid grid-cols-2 gap-2 max-lg:mt-3 max-[339px]:grid-cols-1 md:grid-cols-3 lg:block lg:border-b lg:border-foreground">
            {services.filter((service) => service.group === group.id).map((service, index) => {
              const number = String(index + 1).padStart(2, "0")
              return <li key={service.href} className="lg:border-t lg:border-foreground">
                <a href={`${service.href}/`} onMouseEnter={() => setActive(service)} onFocus={() => setActive(service)} className={`hidden min-h-16 items-center gap-4 px-3 py-3 lg:flex ${active === service ? "bg-foreground text-background!" : ""}`}>
                  <span className="ux-eyebrow">{number}</span>
                  <h3 className="flex-1 text-xl font-bold leading-snug">{service.title}</h3>
                  <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
                </a>
                <Tile service={service} />
              </li>
            })}
          </ul>
        </div>)}
      </div>
      <aside aria-label="Pasirinktos paslaugos peržiūra" className="hidden lg:block">
        {/* Every service's text stays in the page; only the chosen one is shown and gets its video. */}
        {services.map((service) => <div key={service.href} hidden={service !== active} className="sticky top-24">
          <p className="mb-4 text-3xl font-bold tracking-tight">{service.title}</p>
          <ServiceInfo service={service} video={wide && service === active} />
        </div>)}
      </aside>
    </div>
  </section>
}

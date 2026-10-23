import { Check, Phone } from "lucide-react"
import { lt } from "@/content-lt"
import { testimonials } from "./testimonials"
import { contact, phoneHref } from "./settings"
import { showPlaceholders } from "./mediaSlots"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"
const eyebrow = "text-xs font-bold uppercase tracking-[.16em]"

// Four commitments the studio already makes elsewhere on the site (content-lt.ts), placed where a visitor decides.
export function TrustStrip() {
  return <section className="border-b border-foreground/15 bg-secondary py-8 md:py-10" aria-label="Kaip dirbame">
    <div className={`${wrap} grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4`}>
      {lt.trust.map(item => <div key={item.t} className="flex gap-3">
        <Check className="mt-1 size-5 shrink-0 text-[var(--signal)]" aria-hidden="true" />
        <div><h2 className="font-bold">{item.t}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.d}</p></div>
      </div>)}
    </div>
  </section>
}

// Real quotes render for everyone. Placeholder quotes render only in the dev server so they can be designed around, never published.
export function Testimonials() {
  const visible = testimonials.filter(item => !item.placeholder || showPlaceholders)
  if (visible.length === 0) return null
  return <section className="bg-background py-16 md:py-24" aria-labelledby="testimonials-heading">
    <div className={wrap}>
      <p className={`${eyebrow} text-[var(--signal)]`}>Atsiliepimai</p>
      <h2 id="testimonials-heading" className="mt-4 max-w-[22ch] text-3xl font-bold tracking-tight md:text-4xl">Ką sako klientai.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {visible.map((item, index) => <figure key={index} className={`flex flex-col rounded-lg border p-6 md:p-7 ${item.placeholder ? "border-dashed border-foreground/40" : "border-foreground/20"}`}>
          {item.placeholder && <p className="mb-4 text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Vieta atsiliepimui · rodoma tik kuriant</p>}
          <blockquote className="text-lg leading-relaxed">“{item.quote}”</blockquote>
          <figcaption className="mt-auto pt-6 text-sm"><span className="font-bold">{item.name}</span><span className="block text-muted-foreground">{item.role}</span></figcaption>
        </figure>)}
      </div>
    </div>
  </section>
}

// Phone is the strongest trust signal on mobile. The bar exists only once a real number is configured.
export function MobileCallBar() {
  if (!contact.phone) return null
  return <div className="fixed inset-x-0 bottom-0 z-30 border-t border-foreground/20 bg-background/95 px-4 py-2 backdrop-blur md:hidden">
    <div className="flex gap-2">
      <a href={phoneHref} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-foreground px-4 font-semibold text-background" style={{ color: "var(--background)" }}><Phone className="size-4" aria-hidden="true" />Paskambinti</a>
      <a href="/kontaktai/" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-md border border-foreground/40 px-4 font-semibold">Parašyti</a>
    </div>
  </div>
}

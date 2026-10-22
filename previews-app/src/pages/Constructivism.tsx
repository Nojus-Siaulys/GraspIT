import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

const btn = "h-14 rounded-none border-4 border-foreground px-7 text-lg font-bold uppercase tracking-wide"
const hard = "shadow-[8px_8px_0_0_#111]"

export default function Constructivism() {
  return (
    <PreviewShell id="constructivism" label="Constructivism">
      <header className="border-b-[6px] border-foreground">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5">
          <a href="#/constructivism" className="font-display text-3xl font-bold uppercase tracking-tight">
            <span className="mr-2 inline-block size-5 rotate-45 bg-primary align-middle" />
            {c.brand}
          </a>
          <nav className="hidden gap-7 font-display text-lg font-medium uppercase tracking-wider lg:flex" aria-label="Main">
            {c.nav.map((n) => (
              <a key={n} href="#/constructivism" className="hover:text-primary">{n}</a>
            ))}
          </nav>
          <Button className="hidden h-11 rounded-none border-4 border-foreground px-5 font-bold uppercase sm:inline-flex">{c.cta}</Button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-10 lg:grid-cols-[1.15fr_.85fr] lg:pt-14">
          <div>
            <Badge className="mb-5 h-8 -rotate-2 rounded-none bg-foreground px-3 font-display text-base font-medium uppercase tracking-widest text-background">
              {c.eyebrow}
            </Badge>
            <h1 className={`border-4 border-foreground bg-foreground p-5 font-display text-[clamp(2.6rem,7.4vw,6.6rem)] font-bold uppercase leading-[.92] tracking-tight text-background shadow-[10px_10px_0_0_var(--primary)] md:p-7`}>
              {c.title}
            </h1>
            <p className="mt-8 max-w-xl text-xl font-medium">{c.sub}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className={`${btn} ${hard}`}>{c.cta1} <ArrowRight className="size-6" /></Button>
              <Button variant="outline" className={`${btn} bg-transparent`}>{c.cta2}</Button>
            </div>
            <p className="mt-5 font-semibold uppercase tracking-wide">▲ {c.micro}</p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden border-4 border-foreground bg-primary">
            <img src={img.hero} alt="Two people shaking hands across a desk" className="absolute inset-0 size-full object-cover grayscale contrast-125 mix-blend-multiply" />
            <div className="absolute bottom-0 right-0 h-[34%] w-[38%] bg-foreground [clip-path:polygon(0_100%,100%_100%,50%_0)]" />
            <div className="absolute -left-[10%] top-[30%] h-[9%] w-[140%] -rotate-[32deg] bg-foreground" />
            <div className="absolute right-[8%] top-[10%] size-[16%] rounded-full border-4 border-foreground bg-[var(--ochre)]" />
            <div className="absolute bottom-[8%] left-[6%] -rotate-6 border-4 border-foreground bg-secondary-foreground px-4 py-3 text-foreground">
              <div className="font-display text-sm uppercase tracking-widest">{c.from}</div>
              <div className="font-display text-5xl font-bold leading-none">{c.price}</div>
              <div className="font-display text-sm uppercase tracking-widest">{c.days}</div>
            </div>
          </div>
        </section>

        <section className="border-y-[6px] border-foreground" aria-label={c.trustTitle}>
          <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
            {c.trust.map((t, i) => (
              <div key={t.t} className={`border-b-4 border-foreground p-6 lg:border-b-0 lg:border-r-4 lg:last:border-r-0 ${i % 2 ? "bg-primary text-primary-foreground" : ""}`}>
                <div className="font-display text-6xl font-bold leading-none">0{i + 1}</div>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight">{t.t}</h3>
                <p className="mt-1 font-medium">{t.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">{c.servicesTitle}</h2>
            <p className="max-w-sm text-lg font-medium">{c.servicesSub}</p>
          </div>
          <div className="grid border-4 border-foreground md:grid-cols-3">
            {c.services.map((s, i) => (
              <Card key={s.t} className="gap-3 rounded-none border-0 border-b-4 bg-card p-6 ring-0 last:border-b-0 md:border-b-0 md:border-r-4 md:last:border-r-0 border-foreground">
                <div className="font-display text-8xl font-bold leading-none text-transparent [-webkit-text-stroke:2px_#111]">0{i + 1}</div>
                <h3 className="font-display text-3xl font-bold uppercase leading-tight">{s.t}</h3>
                <p className="text-lg">{s.d}</p>
                <Badge className="mt-auto w-fit -rotate-2 rounded-none bg-primary px-3 py-1 font-display text-lg uppercase tracking-wide text-primary-foreground h-auto">{s.p}</Badge>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16">
          <div className="grid border-4 border-foreground md:grid-cols-3">
            {[
              { src: img.sites, alt: "Website pages arranged around a laptop", cap: c.nav[1], bg: "bg-primary", cls: "grayscale contrast-125 mix-blend-multiply" },
              { src: img.team, alt: "Team placeholder silhouettes", cap: c.nav[4], bg: "bg-[var(--ochre)]", cls: "object-contain p-4 mix-blend-multiply" },
              { src: img.trust, alt: "Puzzle piece with the word trust", cap: c.trustTitle, bg: "bg-card", cls: "grayscale contrast-125 mix-blend-multiply" },
            ].map((p) => (
              <figure key={p.cap} className="border-b-4 border-foreground last:border-b-0 md:border-b-0 md:border-r-4 md:last:border-r-0">
                <div className={`${p.bg} aspect-[4/3]`}>
                  <img src={p.src} alt={p.alt} className={`size-full object-cover ${p.cls}`} />
                </div>
                <figcaption className="border-t-4 border-foreground px-4 py-3 font-display text-2xl font-bold uppercase">{p.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-4xl font-bold uppercase leading-[.95] md:text-6xl">{c.closeTitle}</h2>
              <p className="mt-4 max-w-xl text-lg">{c.closeSub}</p>
            </div>
            <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-14 rounded-none border-4 border-background bg-background px-4 text-lg text-foreground" />
              <Button className="h-14 rounded-none border-4 border-background px-6 text-lg font-bold uppercase">{c.send}</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-5 pb-24 pt-8 text-sm font-semibold uppercase tracking-wide">
        <span>{c.footer.rights}</span><span>{c.footer.note}</span><span>{c.footer.privacy} · {c.footer.terms}</span>
      </footer>
      <Button className="fixed inset-x-0 bottom-0 z-50 h-14 rounded-none border-t-4 border-foreground text-lg font-bold uppercase sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

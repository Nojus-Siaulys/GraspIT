import { ArrowRight, Check, Monitor, ShoppingCart, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

const icons = [Monitor, ShoppingCart, Sparkles]
const tileBg = ["var(--flat-teal)", "var(--flat-yellow)", "var(--flat-coral)", "var(--flat-blue)"]
const big = "h-12 rounded-full px-7 text-base font-semibold"

export default function Flat() {
  return (
    <PreviewShell id="flat" label="Flat">
      <header className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#/flat" className="font-display flex items-center gap-2.5 text-xl font-bold">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--flat-teal)] text-lg">S</span>
          {c.brand}
        </a>
        <nav className="hidden gap-7 text-[15px] font-semibold text-muted-foreground lg:flex" aria-label="Main">
          {c.nav.map((n) => (
            <a key={n} href="#/flat" className="hover:text-foreground">{n}</a>
          ))}
        </nav>
        <Button className="hidden h-11 rounded-full px-6 font-semibold sm:inline-flex">{c.cta}</Button>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 pt-6 lg:grid-cols-2 lg:pt-10">
          <div>
            <Badge className="h-8 rounded-full bg-[var(--flat-yellow)] px-4 text-sm font-bold text-foreground">{c.eyebrow}</Badge>
            <h1 className="mb-0 mt-5 text-[2.5rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">{c.title}</h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">{c.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className={big}>{c.cta1} <ArrowRight /></Button>
              <Button variant="secondary" className={`${big} bg-[var(--flat-yellow)] hover:bg-[var(--flat-yellow)]/80`}>{c.cta2}</Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex">
                {[0, 1].map((i) => (
                  <Avatar key={i} className={`size-12 border-4 border-background ${i ? "-ml-3" : ""}`} style={{ background: tileBg[i] }}>
                    <AvatarFallback className="bg-transparent text-[10px] font-bold text-foreground">{c.photo}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="flex items-center gap-2 text-[15px] font-semibold"><Check className="size-4 text-[var(--flat-teal)]" /> {c.micro}</p>
            </div>
          </div>
          <div className="relative">
            <img src={img.sites} alt="Website pages arranged around a laptop" className="aspect-[16/10] w-full rounded-[2rem] object-cover" />
            <div className="absolute bottom-2 left-2 rounded-2xl bg-foreground px-5 py-3 text-background sm:left-6">
              <span className="text-sm opacity-80">{c.from}</span>{" "}
              <strong className="font-display text-2xl">{c.price}</strong>
              <span className="ml-2 text-sm opacity-80">{c.days}</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-6" aria-label={c.trustTitle}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.trust.map((t, i) => (
              <div key={t.t} className="rounded-3xl p-6 text-foreground" style={{ background: tileBg[i] }}>
                <span className="mb-3 grid size-10 place-items-center rounded-full bg-white"><Check className="size-5" /></span>
                <h3 className="text-lg font-bold">{t.t}</h3>
                <p className="mt-1 text-[15px] font-medium">{t.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-6">
          <div className="grid gap-4 md:grid-cols-3">
            <img src={img.hero} alt="Two people shaking hands across a desk" className="h-64 w-full rounded-3xl object-cover" />
            <div className="grid h-64 place-items-center rounded-3xl p-5" style={{ background: "var(--flat-yellow)" }}>
              <img src={img.team} alt="Team placeholder silhouettes" className="max-h-full w-full object-contain" />
            </div>
            <img src={img.trust} alt="Puzzle piece with the word trust" className="h-64 w-full rounded-3xl object-cover" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-9 max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{c.servicesTitle}</h2>
            <p className="mt-3 text-muted-foreground">{c.servicesSub}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {c.services.map((s, i) => {
              const Icon = icons[i]
              return (
                <Card key={s.t} className="gap-3 rounded-3xl p-3 ring-0">
                  <CardHeader>
                    <span className="mb-3 grid size-14 place-items-center rounded-full text-foreground" style={{ background: tileBg[i] }}>
                      <Icon className="size-7" />
                    </span>
                    <CardTitle className="font-display text-xl font-bold">{s.t}</CardTitle>
                    <CardDescription className="text-base">{s.d}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Badge className="h-8 rounded-full px-4 text-sm font-bold" style={{ background: tileBg[i], color: "#1f2d3d" }}>{s.p}</Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-[var(--flat-yellow)] p-8 text-foreground md:p-14">
            <span className="absolute -right-10 -top-10 size-40 rounded-full bg-[var(--flat-coral)]" />
            <span className="absolute -bottom-12 right-24 size-28 rounded-full bg-[var(--flat-teal)]" />
            <div className="relative max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.closeTitle}</h2>
              <p className="mt-3 font-medium">{c.closeSub}</p>
              <form className="mt-6 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-12 rounded-full border-0 bg-white px-5 text-base" />
                <Button className="h-12 rounded-full px-6 text-base font-semibold">{c.send}</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-5 pb-28 text-[15px] text-muted-foreground">
        <div className="flex flex-wrap justify-between gap-4 border-t pt-6">
          <span>{c.footer.rights}</span><span>{c.footer.note}</span><span>{c.footer.privacy} · {c.footer.terms}</span>
        </div>
      </footer>
      <Button className="fixed inset-x-3 bottom-3 z-50 h-12 rounded-full text-base font-semibold shadow-lg sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

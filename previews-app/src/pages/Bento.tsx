import { ArrowRight, Check, Monitor, ShoppingCart, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

const icons = [Monitor, ShoppingCart, Sparkles]
const tiles = ["var(--tile-sand)", "var(--tile-sage)", "var(--tile-sky)"]
const tile = "rounded-[28px] ring-0 p-2"

export default function Bento() {
  return (
    <PreviewShell id="bento" label="Bento">
      <header className="sticky top-3 z-40 mx-auto mt-3 flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full bg-card px-3 pl-5 shadow-sm ring-1 ring-black/5">
        <a href="#/bento" className="flex items-center gap-2 text-lg font-extrabold">
          <span className="grid size-7 place-items-center rounded-full bg-primary text-sm text-primary-foreground">S</span>
          {c.brand}
        </a>
        <nav className="hidden gap-6 text-sm font-semibold text-muted-foreground lg:flex" aria-label="Main">
          {c.nav.map((n) => (
            <a key={n} href="#/bento" className="hover:text-foreground">{n}</a>
          ))}
        </nav>
        <Button className="h-10 rounded-full px-5 font-bold">{c.cta}</Button>
      </header>

      <main className="mx-auto max-w-6xl px-3.5 pb-24 pt-5">
        <section className="grid gap-3.5 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
          <Card className={`${tile} lg:col-span-2 lg:row-span-2`}>
            <CardContent className="flex h-full flex-col justify-between gap-8 p-5 md:p-7">
              <div>
                <Badge variant="secondary" className="h-7 rounded-full px-3 text-xs font-bold">{c.eyebrow}</Badge>
                <h1 className="mb-0 mt-5 text-[2.3rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{c.title}</h1>
                <p className="mt-4 max-w-md text-muted-foreground">{c.sub}</p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2.5">
                  <Button className="h-12 rounded-full px-6 text-base font-bold">{c.cta1} <ArrowRight /></Button>
                  <Button variant="outline" className="h-12 rounded-full px-6 text-base font-bold">{c.cta2}</Button>
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground"><Check className="size-4" /> {c.micro}</p>
              </div>
            </CardContent>
          </Card>

          <Card className={tile} style={{ background: "var(--tile-sage)" }}>
            <CardContent className="flex h-full min-h-[170px] flex-col justify-between p-5">
              <span className="text-sm font-semibold text-muted-foreground">{c.from}</span>
              <div>
                <div className="text-5xl font-extrabold tracking-tight">{c.price}</div>
                <div className="mt-1 font-semibold">{c.days}</div>
              </div>
            </CardContent>
          </Card>

          <Card className={tile} style={{ background: "var(--tile-sand)" }}>
            <CardContent className="flex h-full min-h-[170px] flex-col justify-between p-5">
              <img src={img.team} alt="Team placeholder silhouettes" className="h-24 w-full object-contain object-left" />
              <div className="font-bold">{c.nav[4]}</div>
            </CardContent>
          </Card>

          <Card className={`${tile} lg:col-span-2`} style={{ background: "var(--tile-sky)" }}>
            <CardContent className="grid h-full gap-3 p-5 sm:grid-cols-[1.2fr_1fr]">
              <img src={img.sites} alt="Website pages arranged around a laptop" className="min-h-[130px] w-full rounded-2xl object-cover" />
              <div className="flex flex-col justify-between gap-3">
                <Badge className="h-7 w-fit rounded-full px-3 text-xs font-bold">{c.nav[1]}</Badge>
                <div className="font-bold">{c.services[0].t}</div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-3.5 grid gap-3.5 lg:grid-cols-3">
          <div className="relative min-h-[300px] overflow-hidden rounded-[28px] lg:col-span-2">
            <img src={img.hero} alt="Two people shaking hands across a desk" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-6 max-w-sm text-2xl font-extrabold leading-tight text-white">{c.closeTitle}</p>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-[28px]">
            <img src={img.trust} alt="Puzzle piece with the word trust" className="absolute inset-0 size-full object-cover" />
            <Badge className="absolute left-4 top-4 h-7 rounded-full px-3 text-xs font-bold">{c.trustTitle}</Badge>
          </div>
        </section>

        <section className="mt-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4" aria-label={c.trustTitle}>
          {c.trust.map((t) => (
            <Card key={t.t} className={tile}>
              <CardContent className="p-5">
                <span className="mb-3 grid size-9 place-items-center rounded-full bg-secondary"><Check className="size-4" /></span>
                <h3 className="text-base font-extrabold">{t.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.d}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-3.5 grid gap-3.5 lg:grid-cols-3">
          {c.services.map((s, i) => {
            const Icon = icons[i]
            return (
              <Card key={s.t} className={`${tile} min-h-[260px] transition-transform hover:-translate-y-0.5`} style={{ background: tiles[i] }}>
                <CardHeader className="p-5">
                  <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-white"><Icon className="size-6" /></span>
                  <CardTitle className="font-display text-xl font-extrabold">{s.t}</CardTitle>
                  <CardDescription className="text-base text-foreground/70">{s.d}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-between px-5 pb-4 font-bold">
                  {s.p} <ArrowRight className="size-5" />
                </CardContent>
              </Card>
            )
          })}
        </section>

        <Card className="mt-3.5 rounded-[28px] bg-primary p-2 text-primary-foreground ring-0">
          <CardContent className="flex flex-wrap items-center justify-between gap-6 p-6 md:p-10">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{c.closeTitle}</h2>
              <p className="mt-3 text-white/70">{c.closeSub}</p>
            </div>
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-12 rounded-full border-0 bg-white px-5 text-base text-foreground" />
              <Button variant="secondary" className="h-12 rounded-full px-6 text-base font-bold">{c.send}</Button>
            </form>
          </CardContent>
        </Card>

        <footer className="flex flex-wrap justify-between gap-4 px-3 pt-8 text-sm text-muted-foreground">
          <span>{c.footer.rights}</span><span>{c.footer.note}</span><span>{c.footer.privacy} · {c.footer.terms}</span>
        </footer>
      </main>
      <Button className="fixed inset-x-3 bottom-3 z-50 h-12 rounded-full text-base font-bold shadow-lg sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

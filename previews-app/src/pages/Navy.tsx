import { ArrowRight, Check, Monitor, ShoppingCart, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

const icons = [Monitor, ShoppingCart, Sparkles]
const big = "h-12 rounded-xl px-6 text-base font-semibold"

export default function Navy() {
  return (
    <PreviewShell id="navy" label="Navy studio (recommended)">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-5 px-5">
          <a href="#/navy" className="font-display flex items-center gap-2.5 text-xl font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-[var(--band)] text-base text-white">S</span>
            {c.brand}
          </a>
          <nav className="hidden gap-7 text-[15px] font-medium text-muted-foreground lg:flex" aria-label="Main">
            {c.nav.map((n) => (
              <a key={n} href="#/navy" className="hover:text-foreground">{n}</a>
            ))}
          </nav>
          <Button className="hidden h-11 rounded-xl px-5 text-[15px] font-semibold sm:inline-flex">{c.cta}</Button>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-12 md:pt-[72px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
            <div>
              <Badge variant="outline" className="h-8 gap-2 rounded-full bg-card px-3.5 text-[15px] font-medium">
                <span className="size-2 rounded-full bg-[var(--warm)]" />
                {c.eyebrow}
              </Badge>
              <h1 className="mb-0 mt-5 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                {c.title}
              </h1>
              <p className="mt-5 max-w-[34rem] text-lg text-muted-foreground md:text-xl">{c.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className={big}>
                  {c.cta1} <ArrowRight />
                </Button>
                <Button variant="outline" className={big}>{c.cta2}</Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-[15px] text-muted-foreground">
                <Check className="size-4 text-primary" /> {c.micro}
              </p>
            </div>

            <div className="relative min-h-[380px] overflow-hidden rounded-[28px] lg:min-h-[520px]">
              <img src={img.hero} alt="Two people shaking hands across a desk" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3a]/70 via-transparent to-transparent" />
              <Card className="absolute inset-x-4 bottom-4 gap-4 rounded-[22px] p-5 shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex">
                    {[0, 1].map((i) => (
                      <Avatar key={i} className={`hatch size-14 border-4 border-card ${i ? "-ml-3" : ""}`}>
                        <AvatarFallback className="bg-transparent text-[10px] text-muted-foreground">{c.photo}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[var(--band)] px-4 py-2.5 text-[var(--band-foreground)]">
                    <span>
                      {c.from} <strong className="font-display text-2xl text-[var(--warm)]">{c.price}</strong>
                    </span>
                    <span className="text-sm opacity-80">{c.days}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-12 grid gap-6 rounded-[20px] border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4" aria-label={c.trustTitle}>
            {c.trust.map((t) => (
              <div key={t.t}>
                <h3 className="flex items-center gap-2 text-base font-bold">
                  <Check className="size-4 text-primary" /> {t.t}
                </h3>
                <p className="mt-1 text-[15px] text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-10 pt-14">
          <div className="mb-9 grid items-center gap-8 md:grid-cols-2">
            <div className="max-w-xl">
              <span className="text-[13px] font-semibold uppercase tracking-[.08em] text-primary">{c.nav[0]}</span>
              <h2 className="mb-3 mt-3 text-4xl font-bold tracking-tight md:text-5xl">{c.servicesTitle}</h2>
              <p className="text-muted-foreground">{c.servicesSub}</p>
            </div>
            <img src={img.sites} alt="Website pages arranged around a laptop" className="aspect-[16/9] w-full rounded-[22px] object-cover" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {c.services.map((s, i) => {
              const Icon = icons[i]
              return (
                <Card key={s.t} className="gap-3 rounded-[18px] p-3 transition-transform hover:-translate-y-0.5">
                  <CardHeader>
                    <div className="mb-3 grid size-12 place-items-center rounded-xl bg-secondary text-primary">
                      <Icon className="size-6" />
                    </div>
                    <CardTitle className="font-display text-xl font-bold">{s.t}</CardTitle>
                    <CardDescription className="text-base">{s.d}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto flex items-center justify-between border-t pt-4 font-semibold">
                    {s.p} <ArrowRight className="size-5 text-primary" />
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Card className="justify-between gap-4 rounded-[22px] bg-secondary p-6 ring-0">
              <img src={img.team} alt="Team placeholder silhouettes" className="h-48 w-full object-contain" />
              <div>
                <h3 className="font-display text-xl font-bold">{c.nav[4]}</h3>
                <p className="text-muted-foreground">{c.photo} placeholder. Real portraits go here.</p>
              </div>
            </Card>
            <div className="relative min-h-[260px] overflow-hidden rounded-[22px]">
              <img src={img.trust} alt="Puzzle piece with the word trust" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1b3a]/80 to-transparent p-5 pt-16 text-white">
                <h3 className="font-display text-xl font-bold">{c.trust[0].t}</h3>
                <p className="text-white/80">{c.trust[0].d}</p>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-7 rounded-[28px] bg-[var(--band)] p-8 text-[var(--band-foreground)] md:p-14">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{c.closeTitle}</h2>
              <p className="mt-3 text-white/75">{c.closeSub}</p>
            </div>
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-12 rounded-xl border-0 bg-white px-4 text-base text-[var(--band)]" />
              <Button className="h-12 rounded-xl px-5 text-base font-semibold">{c.send}</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-5 pb-28 pt-10 text-[15px] text-muted-foreground">
        <div className="flex flex-wrap justify-between gap-4 border-t pt-6">
          <span>{c.footer.rights}</span>
          <span>{c.footer.note}</span>
          <span>{c.footer.privacy} · {c.footer.terms}</span>
        </div>
      </footer>
      <Button className="fixed inset-x-3 bottom-3 z-50 h-12 rounded-xl text-base font-semibold shadow-lg sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

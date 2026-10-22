import { ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

const pill = "h-12 rounded-full px-7 text-[17px] font-normal"
const link = "inline-flex items-center text-[19px] text-[var(--link)] hover:underline"

export default function Apple() {
  return (
    <PreviewShell id="apple" label="Apple-inspired">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-[1024px] items-center justify-between gap-4 px-5 text-[13px]">
          <a href="#/apple" className="text-[15px] font-semibold">{c.brand}</a>
          <nav className="hidden gap-8 text-[#424245] md:flex" aria-label="Main">
            {c.nav.map((n) => (
              <a key={n} href="#/apple" className="hover:text-black">{n}</a>
            ))}
          </nav>
          <Button className="h-7 rounded-full px-3.5 text-xs font-normal">{c.cta}</Button>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[980px] px-5 pb-10 pt-16 text-center md:pt-24">
          <p className="text-xl font-semibold text-[#bf4800] md:text-2xl">{c.eyebrow}</p>
          <h1 className="mx-auto mb-0 mt-3 max-w-[15ch] text-[clamp(2.8rem,8.4vw,6rem)] font-semibold leading-[1.03] tracking-[-0.045em]">{c.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl leading-snug text-muted-foreground md:text-[28px] md:leading-[1.2]">{c.sub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Button className={pill}>{c.cta1}</Button>
            <a href="#/apple" className={link}>{c.cta2} <ChevronRight className="size-5" /></a>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">{c.micro}</p>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 pb-5">
          <img src={img.hero} alt="Two people shaking hands across a desk" className="aspect-[16/9] w-full rounded-[28px] object-cover md:aspect-[2/1]" />
        </section>

        <section className="mx-auto max-w-[1100px] px-5">
          <div className="grid min-h-[300px] place-items-center rounded-[28px] bg-[#f5f5f7] py-10 md:min-h-[420px]">
            <div className="text-center">
              <div className="mx-auto mb-5 flex w-fit">
                {[0, 1].map((i) => (
                  <Avatar key={i} className={`size-20 border-4 border-[#f5f5f7] bg-white ${i ? "-ml-4" : ""}`}>
                    <AvatarFallback className="bg-white text-[11px] text-muted-foreground">{c.photo}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{c.from}</p>
              <p className="text-6xl font-semibold tracking-[-0.04em] md:text-8xl">{c.price}</p>
              <p className="mt-1 text-lg text-muted-foreground">{c.days}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[980px] px-5 py-16" aria-label={c.trustTitle}>
          <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            {c.trust.map((t) => (
              <div key={t.t}>
                <h3 className="text-[21px] font-semibold tracking-tight">{t.t}</h3>
                <p className="mt-1.5 text-[17px] text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 pb-16">
          <div className="grid gap-5 md:grid-cols-3">
            <img src={img.sites} alt="Website pages arranged around a laptop" className="h-64 w-full rounded-[28px] object-cover" />
            <div className="grid h-64 place-items-center rounded-[28px] bg-[#f5f5f7] p-6">
              <img src={img.team} alt="Team placeholder silhouettes" className="max-h-full w-full object-contain" />
            </div>
            <img src={img.trust} alt="Puzzle piece with the word trust" className="h-64 w-full rounded-[28px] object-cover" />
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 pb-6">
          <h2 className="mb-8 text-center text-4xl font-semibold tracking-[-0.035em] md:text-6xl">{c.servicesTitle}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {c.services.map((s, i) => (
              <Card key={s.t} className={`min-h-[260px] justify-between gap-8 rounded-[28px] bg-[#f5f5f7] px-8 py-10 text-center ring-0 md:min-h-[320px] ${i === 0 ? "md:col-span-2" : ""}`}>
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{s.t}</h3>
                  <p className="mx-auto mt-3 max-w-md text-lg text-muted-foreground md:text-xl">{s.d}</p>
                  <p className="mt-3 text-lg">{s.p}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-6">
                  <Button className="h-10 rounded-full px-5 text-base font-normal">{c.cta1}</Button>
                  <a href="#/apple" className={link}>{c.cta2} <ChevronRight className="size-5" /></a>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[760px] px-5 py-24 text-center">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] md:text-6xl">{c.closeTitle}</h2>
          <p className="mt-4 text-xl text-muted-foreground">{c.closeSub}</p>
          <form className="mx-auto mt-8 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-12 rounded-full bg-[#f5f5f7] px-5 text-[17px]" />
            <Button className={pill}>{c.send}</Button>
          </form>
        </section>
      </main>

      <footer className="border-t bg-[#f5f5f7] px-5 pb-24 pt-6 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-[980px] flex-wrap justify-between gap-4">
          <span>{c.footer.rights}</span><span>{c.footer.note}</span><span>{c.footer.privacy} · {c.footer.terms}</span>
        </div>
      </footer>
      <Button className="fixed inset-x-3 bottom-3 z-50 h-12 rounded-full text-base font-normal shadow-lg sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

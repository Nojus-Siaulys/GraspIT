import { ChevronRight, Clock, Globe, MessageCircle, ShieldCheck, ShoppingBag, Sparkles, Wallet } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

// iOS vocabulary: grouped background, inset lists with hairlines, squircle app icons,
// "Get" pills, widgets, translucent bars, a bottom action bar on phones.
const trustIcons = [ShieldCheck, Clock, Wallet, MessageCircle]
const trustColors = ["var(--ios-green)", "var(--primary)", "var(--ios-orange)", "var(--ios-purple)"]
const serviceIcons = [Globe, ShoppingBag, Sparkles]
const serviceColors = ["var(--primary)", "var(--ios-indigo)", "var(--ios-teal)"]

const getPill = "h-8 rounded-full bg-secondary px-4 text-[15px] font-bold text-secondary-foreground hover:bg-secondary/70"
const widget = "h-36 rounded-[22px] bg-card p-4 shadow-none ring-0"

function Icon({ I, color, size = 30 }: { I: typeof Globe; color: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center text-white" style={{ background: color, width: size, height: size, borderRadius: size * 0.225 }}>
      <I style={{ width: size * 0.56, height: size * 0.56 }} strokeWidth={2.2} />
    </span>
  )
}

function Group({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div>
      {title && <h2 className="mb-1.5 px-4 text-[13px] font-normal uppercase tracking-wide text-muted-foreground">{title}</h2>}
      <div className="divide-y divide-[#c6c6c8]/60 overflow-hidden rounded-[14px] bg-card">{children}</div>
    </div>
  )
}

export default function Ios() {
  return (
    <PreviewShell id="ios" label="iOS / iPhone">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f9f9f9]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-[1000px] items-center justify-between gap-3 px-4">
          <a href="#/ios" className="flex items-center gap-2 text-[17px] font-semibold">
            <Icon I={Sparkles} color="var(--primary)" size={26} /> {c.brand}
          </a>
          <nav className="hidden gap-6 text-[15px] text-primary md:flex" aria-label="Main">
            {c.nav.slice(0, 5).map((n) => (
              <a key={n} href="#/ios">{n}</a>
            ))}
          </nav>
          <Button className="h-8 rounded-full px-4 text-[15px] font-semibold">{c.cta}</Button>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] space-y-8 px-4 pb-28 pt-6 md:pb-16">
        <section className="grid items-stretch gap-4 md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-center py-2 md:py-8">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-primary">{c.eyebrow}</p>
            <h1 className="mb-0 mt-2 text-[clamp(2.2rem,6vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">{c.title}</h1>
            <p className="mt-4 max-w-md text-[17px] leading-snug text-muted-foreground">{c.sub}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="h-12 rounded-[14px] px-6 text-[17px] font-semibold">{c.cta1}</Button>
              <Button variant="ghost" className="h-12 rounded-[14px] px-3 text-[17px] font-normal text-primary hover:bg-primary/10">
                {c.cta2} <ChevronRight className="size-5" />
              </Button>
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground">{c.micro}</p>
          </div>

          <Card className="relative min-h-[340px] justify-between overflow-hidden rounded-[28px] border-0 bg-[#1c1c1e] p-6 text-white shadow-lg ring-0">
            <img src={img.hero} alt="Two people shaking hands across a desk" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
            <p className="relative text-[13px] font-semibold uppercase tracking-wide text-white/85">{c.eyebrow}</p>
            <div className="relative">
              <div className="mb-4 flex">
                {[0, 1].map((i) => (
                  <Avatar key={i} className={`size-14 border-[3px] border-black/40 bg-white/90 ${i ? "-ml-3" : ""}`}>
                    <AvatarFallback className="bg-white/90 text-[10px] text-muted-foreground">{c.photo}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-[15px] text-white/80">{c.from}</p>
              <p className="text-6xl font-bold tracking-[-0.04em]">{c.price}</p>
              <p className="text-[17px] text-white/85">{c.days}</p>
            </div>
          </Card>
        </section>

        <section className="grid grid-cols-3 gap-3" aria-label="At a glance">
          {[
            { l: "Team", v: "2", s: "people", color: "var(--ios-orange)" },
            { l: "Delivery", v: "00", s: "days", color: "var(--ios-green)" },
            { l: "Reply", v: "00", s: "hours", color: "var(--primary)" },
          ].map((w) => (
            <Card key={w.l} className={`${widget} justify-between`}>
              <span className="text-[13px] font-semibold uppercase" style={{ color: w.color }}>{w.l}</span>
              <div>
                <div className="text-4xl font-bold leading-none tracking-tight md:text-5xl">{w.v}</div>
                <div className="mt-1 text-[13px] text-muted-foreground">{w.s}</div>
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-3 md:grid-cols-3" aria-label="Featured">
          {[
            { src: img.sites, alt: "Website pages arranged around a laptop", cap: c.nav[1], sub: c.services[0].t, fit: "object-cover" },
            { src: img.team, alt: "Team placeholder silhouettes", cap: c.nav[4], sub: `${c.photo} placeholder`, fit: "object-contain p-4" },
            { src: img.trust, alt: "Puzzle piece with the word trust", cap: c.trustTitle, sub: c.trust[0].t, fit: "object-cover" },
          ].map((f) => (
            <Card key={f.cap} className="gap-0 overflow-hidden rounded-[22px] bg-card p-0 shadow-none ring-0">
              <img src={f.src} alt={f.alt} className={`h-44 w-full ${f.fit}`} />
              <div className="px-4 py-3">
                <p className="text-[11px] font-semibold uppercase text-primary">{f.cap}</p>
                <p className="text-[17px] font-semibold leading-tight">{f.sub}</p>
              </div>
            </Card>
          ))}
        </section>

        <Group title={c.trustTitle}>
          {c.trust.map((t, i) => (
            <a key={t.t} href="#/ios" className="flex items-center gap-3 px-4 py-3 active:bg-black/5">
              <Icon I={trustIcons[i]} color={trustColors[i]} />
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] leading-tight">{t.t}</span>
                <span className="block text-[13px] text-muted-foreground">{t.d}</span>
              </span>
              <ChevronRight className="size-5 text-[#c4c4c7]" />
            </a>
          ))}
        </Group>

        <Group title={c.servicesTitle}>
          {c.services.map((s, i) => (
            <div key={s.t} className="flex items-center gap-4 px-4 py-4">
              <Icon I={serviceIcons[i]} color={serviceColors[i]} size={60} />
              <div className="min-w-0 flex-1">
                <h3 className="text-[17px] font-semibold leading-tight">{s.t}</h3>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{s.d}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button className={getPill}>{s.p}</Button>
                <span className="text-[11px] text-muted-foreground">{c.days}</span>
              </div>
            </div>
          ))}
        </Group>
        <p className="px-4 text-[13px] text-muted-foreground">{c.servicesSub}</p>

        <section className="rounded-[28px] bg-card px-5 py-10 text-center md:px-10 md:py-14">
          <h2 className="mx-auto max-w-xl text-[clamp(1.8rem,4.5vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.025em]">{c.closeTitle}</h2>
          <p className="mx-auto mt-3 max-w-md text-[17px] text-muted-foreground">{c.closeSub}</p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-12 rounded-[12px] border-0 bg-[#767680]/12 px-4 text-[17px]" />
            <Button className="h-12 rounded-[12px] px-6 text-[17px] font-semibold">{c.send}</Button>
          </form>
        </section>
      </main>

      <footer className="px-4 pb-28 text-center text-[13px] text-muted-foreground md:pb-10">
        {c.footer.rights} · {c.footer.note} · {c.footer.privacy} · {c.footer.terms}
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f9f9f9]/85 px-4 pb-6 pt-2.5 backdrop-blur-xl md:hidden">
        <Button className="h-12 w-full rounded-[14px] text-[17px] font-semibold">{c.cta}</Button>
      </div>
    </PreviewShell>
  )
}

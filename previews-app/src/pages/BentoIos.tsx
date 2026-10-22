import { ChevronRight, Clock, Globe, Mail, MessageCircle, Phone, ShieldCheck, ShoppingBag, Sparkles, Wallet } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

// Hybrid v2: iOS vocabulary (squircle icons, grouped lists, App Store price pills, bottom bar)
// organised as full-width bands: white / grouped grey / iOS blue.
const trustIcons = [ShieldCheck, Clock, Wallet, MessageCircle]
const trustColors = ["var(--ios-green)", "var(--primary)", "var(--ios-orange)", "var(--ios-purple)"]
const serviceIcons = [Globe, ShoppingBag, Sparkles]
const serviceColors = ["var(--primary)", "var(--ios-indigo)", "var(--ios-teal)"]
const wrap = "mx-auto max-w-[1100px] px-4"
const band = "py-16 md:py-24"
const getPill = "h-8 rounded-full bg-secondary px-4 text-[15px] font-bold text-secondary-foreground hover:bg-secondary/70"
const group = "divide-y divide-[#c6c6c8]/60 overflow-hidden rounded-[18px] bg-card"

function Icon({ I, color, size = 30 }: { I: typeof Globe; color: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center text-white" style={{ background: color, width: size, height: size, borderRadius: size * 0.225 }}>
      <I style={{ width: size * 0.56, height: size * 0.56 }} strokeWidth={2.2} />
    </span>
  )
}

function Head({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="mb-8 md:mb-12">
      <p className={`text-[13px] font-semibold uppercase tracking-wide ${light ? "text-white/80" : "text-primary"}`}>{eyebrow}</p>
      <h2 className="m-0 mt-1.5 max-w-[22ch] text-[clamp(1.9rem,4.6vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.03em]">{title}</h2>
    </div>
  )
}

export default function BentoIos() {
  return (
    <PreviewShell id="bento-ios" label="Hybrid: Bento × iOS">
      <div className="bg-[#1c1c1e] text-white">
        <div className={`${wrap} flex h-9 items-center justify-between text-[12px]`}>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="size-3.5" /> {c.phone}</span>
            <span className="hidden items-center gap-1.5 sm:flex"><Mail className="size-3.5" /> {c.email}</span>
          </span>
          <span>LT / EN</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f9f9f9]/80 backdrop-blur-xl">
        <div className={`${wrap} flex h-12 items-center justify-between gap-3`}>
          <a href="#/bento-ios" className="flex items-center gap-2 text-[17px] font-semibold">
            <Icon I={Sparkles} color="var(--primary)" size={26} /> {c.brand}
          </a>
          <nav className="hidden gap-6 text-[15px] text-primary md:flex" aria-label="Main">
            {c.nav.slice(0, 5).map((n) => (
              <a key={n} href="#/bento-ios">{n}</a>
            ))}
          </nav>
          <Button className="h-8 rounded-full px-4 text-[15px] font-semibold">{c.cta}</Button>
        </div>
      </header>

      <main>
        {/* Hero: white */}
        <section className={`bg-white ${band}`}>
          <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]`}>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-primary">{c.eyebrow}</p>
              <h1 className="mb-0 mt-2 text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.035em]">{c.title}</h1>
              <p className="mt-4 max-w-md text-[19px] leading-snug text-muted-foreground">{c.sub}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button className="h-12 rounded-[14px] px-6 text-[17px] font-semibold">{c.cta1}</Button>
                <Button variant="ghost" className="h-12 rounded-[14px] px-3 text-[17px] font-normal text-primary hover:bg-primary/10">
                  {c.cta2} <ChevronRight className="size-5" />
                </Button>
              </div>
              <p className="mt-3 text-[13px] text-muted-foreground">{c.micro}</p>
            </div>
            <div className="relative min-h-[340px] overflow-hidden rounded-[28px] shadow-lg">
              <img src={img.hero} alt="Two people shaking hands across a desk" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/20" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                <div>
                  <p className="text-[15px] text-white/80">{c.from}</p>
                  <p className="text-5xl font-bold tracking-[-0.04em]">{c.price}</p>
                  <p className="text-[15px] text-white/85">{c.days}</p>
                </div>
                <div className="flex">
                  {[0, 1].map((i) => (
                    <Avatar key={i} className={`size-12 border-[3px] border-black/40 bg-white/90 ${i ? "-ml-3" : ""}`}>
                      <AvatarFallback className="bg-white/90 text-[10px] text-muted-foreground">{c.photo}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof strip: iOS blue */}
        <section className="bg-primary py-12 text-white md:py-16" aria-label={c.trustTitle}>
          <div className={`${wrap} grid gap-8 sm:grid-cols-2 lg:grid-cols-4`}>
            {c.stats.map((s, i) => (
              <div key={i}>
                <div className="text-[clamp(2.8rem,5.5vw,4.4rem)] font-bold leading-none tracking-[-0.04em]">{s.n}</div>
                <p className="mt-1.5 text-[15px] text-white/80">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work: white, Today-style cards */}
        <section className={`bg-white ${band}`}>
          <div className={wrap}>
            <Head eyebrow={c.nav[1]} title={c.workTitle} />
            <div className="grid gap-5 md:grid-cols-3">
              {c.work.map((w, i) => (
                <a key={i} href="#/bento-ios" className="group block">
                  <div className="overflow-hidden rounded-[22px] bg-secondary">
                    <img src={img.sites} alt="Website pages arranged around a laptop" className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" style={{ objectPosition: ["30% 50%", "50% 50%", "70% 50%"][i] }} />
                  </div>
                  <div className="mt-3 flex items-center gap-3 px-1">
                    <Icon I={Globe} color={serviceColors[i]} size={40} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[17px] font-semibold leading-tight">{w.t}</p>
                      <p className="text-[13px] text-muted-foreground">{w.k}</p>
                    </div>
                    <span className={getPill.replace("h-8", "h-7 inline-flex items-center")}>{c.cta2}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Services: grouped grey */}
        <section className={`bg-background ${band}`}>
          <div className={wrap}>
            <Head eyebrow={c.nav[0]} title={c.servicesTitle} />
            <div className={group}>
              {c.services.map((s, i) => (
                <div key={s.t} className="flex items-center gap-4 px-4 py-5">
                  <Icon I={serviceIcons[i]} color={serviceColors[i]} size={60} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[19px] font-semibold leading-tight">{s.t}</h3>
                    <p className="mt-0.5 text-[15px] text-muted-foreground">{s.d}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Button className={getPill}>{s.p}</Button>
                    <span className="text-[11px] text-muted-foreground">{c.days}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us: white */}
        <section className={`bg-white ${band}`}>
          <div className={wrap}>
            <Head eyebrow={c.trustTitle} title={c.whyTitle} />
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-5">
                <img src={img.trust} alt="Puzzle piece with the word trust" className="aspect-[16/10] w-full rounded-[22px] object-cover" />
                <div className={group}>
                  {c.trust.map((t, i) => (
                    <a key={t.t} href="#/bento-ios" className="flex items-center gap-3 px-4 py-3">
                      <Icon I={trustIcons[i]} color={trustColors[i]} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[17px] leading-tight">{t.t}</span>
                        <span className="block text-[13px] text-muted-foreground">{t.d}</span>
                      </span>
                      <ChevronRight className="size-5 text-[#c4c4c7]" />
                    </a>
                  ))}
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#c6c6c8] hover:bg-transparent">
                    <TableHead className="whitespace-normal h-12 px-0 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">{c.whyCols[0]}</TableHead>
                    <TableHead className="whitespace-normal h-12 px-0 text-[13px] font-semibold uppercase tracking-wide text-primary">{c.whyCols[1]}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {c.why.map(([a, b]) => (
                    <TableRow key={a} className="border-[#c6c6c8]/60 hover:bg-transparent">
                      <TableCell className="whitespace-normal px-0 py-5 text-[17px] text-muted-foreground">{a}</TableCell>
                      <TableCell className="whitespace-normal px-0 py-5 text-[17px] font-semibold">{b}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Team and quotes: grouped grey */}
        <section className={`bg-background ${band}`}>
          <div className={wrap}>
            <Head eyebrow={c.nav[4]} title={c.teamTitle} />
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-4">
                <div className="grid place-items-center rounded-[22px] bg-card p-4">
                  <img src={img.team} alt="Team placeholder silhouettes" className="h-40 w-full object-contain" />
                </div>
                <div className={group}>
                  {c.people.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3">
                      <Avatar className="size-11"><AvatarFallback className="bg-secondary text-[10px] text-muted-foreground">{c.photo}</AvatarFallback></Avatar>
                      <div><div className="text-[17px] font-semibold leading-tight">{p.n}</div><div className="text-[13px] text-muted-foreground">{p.r}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
                {c.quotes.map((q, i) => (
                  <figure key={i} className="m-0 flex flex-col justify-between rounded-[22px] bg-card p-5">
                    <blockquote className="m-0 text-[17px] leading-snug">“{q.q}”</blockquote>
                    <figcaption className="mt-4 text-[13px]"><b>{q.n}</b><br /><span className="text-muted-foreground">{q.o}</span></figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact: dark */}
        <section className={`bg-[#1c1c1e] ${band} text-center text-white`}>
          <div className="mx-auto max-w-[720px] px-4">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex">
                {[0, 1].map((i) => (
                  <Avatar key={i} className={`size-12 border-[3px] border-[#1c1c1e] bg-white ${i ? "-ml-3" : ""}`}>
                    <AvatarFallback className="bg-white text-[10px] text-muted-foreground">{c.photo}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="flex items-center gap-2 text-[15px] text-white/70"><i className="size-2 rounded-full bg-[var(--ios-green)]" /> {c.online}</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em]">{c.closeTitle}</h2>
            <p className="mt-3 text-[19px] text-white/70">{c.closeSub}</p>
            <form className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-12 rounded-[12px] border-0 bg-white px-4 text-[17px] text-foreground" />
              <Button className="h-12 rounded-[12px] px-6 text-[17px] font-semibold">{c.send}</Button>
            </form>
            <p className="mt-3 text-[13px] text-white/60">{c.micro}</p>
          </div>
        </section>
      </main>

      <footer className="bg-[#1c1c1e] px-4 pb-28 pt-2 text-center text-[13px] text-white/50 md:pb-8">
        {c.footer.rights} · {c.footer.note} · {c.footer.privacy} · {c.footer.terms}
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#f9f9f9]/85 px-4 pb-6 pt-2.5 backdrop-blur-xl md:hidden">
        <Button className="h-12 w-full rounded-[14px] text-[17px] font-semibold">{c.cta}</Button>
      </div>
    </PreviewShell>
  )
}

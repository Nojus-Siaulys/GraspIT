import { ChevronRight, Mail, Phone } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

// Hybrid v2: Apple's calm centred type with Bento's rounded image tiles,
// organised as full-width bands (white / grey / dark) so each chapter is clearly separate.
const pill = "h-12 rounded-full px-7 text-[17px] font-normal"
const link = "inline-flex items-center text-[19px] text-[var(--link)] hover:underline"
const wrap = "mx-auto max-w-[1100px] px-5"
const band = "py-20 md:py-28"

function Head({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <p className={`text-lg font-semibold md:text-xl ${dark ? "text-[#ff9f5a]" : "text-[var(--warm)]"}`}>{eyebrow}</p>
      <h2 className="mx-auto mb-0 mt-2 max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.04em]">{title}</h2>
    </div>
  )
}

export default function BentoApple() {
  return (
    <PreviewShell id="bento-apple" label="Hybrid: Bento × Apple">
      <div className="bg-[#1d1d1f] text-[#f5f5f7]">
        <div className={`${wrap} flex h-9 items-center justify-between text-[12px]`}>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="size-3.5" /> {c.phone}</span>
            <span className="hidden items-center gap-1.5 sm:flex"><Mail className="size-3.5" /> {c.email}</span>
          </span>
          <span>LT / EN</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className={`${wrap} flex h-12 items-center justify-between gap-4 text-[13px]`}>
          <a href="#/bento-apple" className="text-[15px] font-semibold">{c.brand}</a>
          <nav className="hidden gap-8 text-[#424245] md:flex" aria-label="Main">
            {c.nav.map((n) => (
              <a key={n} href="#/bento-apple" className="hover:text-black">{n}</a>
            ))}
          </nav>
          <Button className="h-7 rounded-full px-3.5 text-xs font-normal">{c.cta}</Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-white pb-16 pt-16 text-center md:pb-24 md:pt-24">
          <div className={wrap}>
            <p className="text-xl font-semibold text-[var(--warm)] md:text-2xl">{c.eyebrow}</p>
            <h1 className="mx-auto mb-0 mt-3 max-w-[15ch] text-[clamp(2.8rem,8vw,6rem)] font-semibold leading-[1.03] tracking-[-0.045em]">{c.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-xl leading-snug text-muted-foreground md:text-[26px] md:leading-[1.2]">{c.sub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Button className={pill}>{c.cta1}</Button>
              <a href="#/bento-apple" className={link}>{c.cta2} <ChevronRight className="size-5" /></a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {c.micro} · {c.from} <b className="text-foreground">{c.price}</b> · {c.days}
            </p>
            <img src={img.hero} alt="Two people shaking hands across a desk" className="mt-12 aspect-[16/9] w-full rounded-[28px] object-cover md:aspect-[2/1]" />
          </div>
        </section>

        {/* Proof strip: dark */}
        <section className="bg-[#1d1d1f] py-16 text-[#f5f5f7] md:py-20" aria-label={c.trustTitle}>
          <div className={`${wrap} grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4`}>
            {c.stats.map((s, i) => (
              <div key={i}>
                <div className="text-[clamp(3rem,6vw,4.6rem)] font-semibold leading-none tracking-[-0.045em]">{s.n}</div>
                <p className="mt-2 text-[17px] text-[#a1a1a6]">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work: white */}
        <section className={`bg-white ${band}`}>
          <div className={wrap}>
            <Head eyebrow={c.nav[1]} title={c.workTitle} />
            <div className="grid gap-5 md:grid-cols-3">
              {c.work.map((w, i) => (
                <a key={i} href="#/bento-apple" className="group block text-center">
                  <div className="overflow-hidden rounded-[28px] bg-[#f5f5f7]">
                    <img src={img.sites} alt="Website pages arranged around a laptop" className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" style={{ objectPosition: ["30% 50%", "50% 50%", "70% 50%"][i] }} />
                  </div>
                  <p className="mt-4 text-xl font-semibold">{w.t}</p>
                  <p className="text-[17px] text-muted-foreground">{w.k}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Services: grey */}
        <section className={`bg-[#f5f5f7] ${band}`}>
          <div className={wrap}>
            <Head eyebrow={c.nav[0]} title={c.servicesTitle} />
            <div className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#d2d2d7]">
              {c.services.map((s) => (
                <div key={s.t} className="px-4 text-center md:px-8">
                  <h3 className="text-3xl font-semibold tracking-[-0.03em]">{s.t}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-lg text-muted-foreground">{s.d}</p>
                  <p className="mt-3 text-lg">{s.p}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    <Button className="h-10 rounded-full px-5 text-base font-normal">{c.cta1}</Button>
                    <a href="#/bento-apple" className={link}>{c.cta2} <ChevronRight className="size-5" /></a>
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
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <img src={img.trust} alt="Puzzle piece with the word trust" className="aspect-[4/3] w-full rounded-[28px] object-cover" />
              <Table>
                <TableHeader>
                  <TableRow className="border-[#d2d2d7] hover:bg-transparent">
                    <TableHead className="whitespace-normal h-12 px-0 text-[15px] font-semibold text-muted-foreground">{c.whyCols[0]}</TableHead>
                    <TableHead className="whitespace-normal h-12 px-0 text-[15px] font-semibold text-primary">{c.whyCols[1]}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {c.why.map(([a, b]) => (
                    <TableRow key={a} className="border-[#d2d2d7] hover:bg-transparent">
                      <TableCell className="whitespace-normal px-0 py-5 text-lg text-muted-foreground">{a}</TableCell>
                      <TableCell className="whitespace-normal px-0 py-5 text-lg font-semibold">{b}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-14 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {c.trust.map((t) => (
                <div key={t.t}>
                  <h3 className="text-[21px] font-semibold tracking-tight">{t.t}</h3>
                  <p className="mt-1.5 text-[17px] text-muted-foreground">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team and quotes: grey */}
        <section className={`bg-[#f5f5f7] ${band}`}>
          <div className={wrap}>
            <Head eyebrow={c.nav[4]} title={c.teamTitle} />
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <img src={img.team} alt="Team placeholder silhouettes" className="mx-auto h-44 w-full object-contain" />
              <div className="mt-6 flex flex-wrap justify-center gap-8">
                {c.people.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 text-left">
                    <Avatar className="size-12"><AvatarFallback className="bg-white text-[10px] text-muted-foreground">{c.photo}</AvatarFallback></Avatar>
                    <div><div className="font-semibold">{p.n}</div><div className="text-sm text-muted-foreground">{p.r}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              {c.quotes.map((q, i) => (
                <figure key={i} className="m-0 text-center">
                  <blockquote className="m-0 text-xl leading-snug">“{q.q}”</blockquote>
                  <figcaption className="mt-4 text-[15px]"><b>{q.n}</b><br /><span className="text-muted-foreground">{q.o}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Contact: dark */}
        <section className={`bg-[#1d1d1f] ${band} text-center text-[#f5f5f7]`}>
          <div className="mx-auto max-w-[760px] px-5">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="flex">
                {[0, 1].map((i) => (
                  <Avatar key={i} className={`size-12 border-[3px] border-[#1d1d1f] bg-white ${i ? "-ml-3" : ""}`}>
                    <AvatarFallback className="bg-white text-[10px] text-muted-foreground">{c.photo}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="flex items-center gap-2 text-[15px] text-[#a1a1a6]"><i className="size-2 rounded-full bg-[#30d158]" /> {c.online}</span>
            </div>
            <h2 className="text-[clamp(2.2rem,5.4vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em]">{c.closeTitle}</h2>
            <p className="mt-4 text-xl text-[#a1a1a6]">{c.closeSub}</p>
            <form className="mx-auto mt-8 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-12 rounded-full border-0 bg-white px-5 text-[17px] text-foreground" />
              <Button className={pill}>{c.send}</Button>
            </form>
            <p className="mt-3 text-sm text-[#a1a1a6]">{c.micro}</p>
          </div>
        </section>
      </main>

      <footer className="bg-[#f5f5f7] pb-24 pt-6 text-xs text-muted-foreground sm:pb-8">
        <div className={`${wrap} flex flex-wrap justify-between gap-4`}>
          <span>{c.footer.rights}</span><span>{c.footer.note}</span><span>{c.footer.privacy} · {c.footer.terms}</span>
        </div>
      </footer>
      <Button className="fixed inset-x-3 bottom-3 z-50 h-12 rounded-full text-base font-normal shadow-lg sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

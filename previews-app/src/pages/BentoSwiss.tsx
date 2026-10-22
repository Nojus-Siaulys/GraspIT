import { ArrowRight, Check, Mail, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { lt as c, img } from "@/content-lt"
import { PreviewShell } from "./shared"

// Hybrid v2 (after feedback): Swiss discipline with Bento used sparingly.
// Every section is a full-width band with its own background, label and heading,
// so the page reads as a sequence of chapters. Tiles only appear for photos.
const btn = "h-[52px] rounded-md px-6 text-base font-semibold"
const wrap = "mx-auto max-w-[1280px] px-5"
const band = "py-16 md:py-24"
const label = "text-xs font-bold uppercase tracking-[.14em]"

function Head({ n, name, title, tone = "" }: { n: string; name: string; title: string; tone?: string }) {
  return (
    <div className="mb-10 grid gap-3 md:mb-14 lg:grid-cols-12">
      <span className={`${label} lg:col-span-3`}>
        <b className="mr-2 text-[var(--signal)]">{n}</b>
        <span className={tone || "text-muted-foreground"}>{name}</span>
      </span>
      <h2 className="m-0 text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.04em] lg:col-span-9">{title}</h2>
    </div>
  )
}

export default function BentoSwiss() {
  return (
    <PreviewShell id="bento-swiss" label="Hybrid: Bento × Swiss">
      <div className="bg-foreground text-background">
        <div className={`${wrap} flex h-9 items-center justify-between text-[13px]`}>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="size-3.5" /> {c.phone}</span>
            <span className="hidden items-center gap-1.5 sm:flex"><Mail className="size-3.5" /> {c.email}</span>
          </span>
          <span className="font-semibold">LT / EN</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-foreground bg-background/95 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
          <a href="#/bento-swiss" className="font-display flex items-center text-xl font-extrabold tracking-tight">
            <i className="mr-2 inline-block size-3 rounded-full bg-[var(--signal)]" /> {c.brand}
          </a>
          <nav className="hidden gap-7 text-[15px] font-medium lg:flex" aria-label="Main">
            {c.nav.map((n) => (
              <a key={n} href="#/bento-swiss" className="hover:underline hover:underline-offset-[6px]">{n}</a>
            ))}
          </nav>
          <Button className="h-10 rounded-md px-5 text-[15px] font-semibold">{c.cta}</Button>
        </div>
      </header>

      <main>
        {/* 01 Hero — open layout, no boxes */}
        <section className={`bg-background ${band}`}>
          <div className={wrap}>
            <span className={`${label} text-[var(--signal)]`}>{c.eyebrow}</span>
            <h1 className="mb-0 mt-5 max-w-[16ch] text-[clamp(2.8rem,8vw,7.6rem)] font-bold leading-[.95] tracking-[-0.05em]">{c.title}</h1>
            <div className="mt-10 grid gap-8 border-t border-foreground pt-6 lg:grid-cols-12">
              <p className="max-w-[34ch] text-xl lg:col-span-4">{c.sub}</p>
              <div className="flex flex-col items-start gap-2 lg:col-span-4">
                <Button className={btn}>{c.cta1} <ArrowRight /></Button>
                <p className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-[var(--signal)]" /> {c.micro}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <span className="text-sm text-muted-foreground">{c.from}</span>
                <div className="font-display text-[clamp(3.4rem,7vw,5.6rem)] font-extrabold leading-[.9] tracking-[-0.06em] text-[var(--signal)]">{c.price}</div>
                <span className="text-sm text-muted-foreground">{c.days}</span>
              </div>
            </div>
            <img src={img.hero} alt="Two people shaking hands across a desk" className="mt-12 aspect-[16/9] w-full object-cover grayscale contrast-110 md:aspect-[21/8]" />
          </div>
        </section>

        {/* 02 Proof strip — dark band */}
        <section className="bg-foreground py-14 text-background md:py-20" aria-label={c.trustTitle}>
          <div className={wrap}>
            <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {c.stats.map((s, i) => (
                <div key={i} className="border-t border-background/40 pr-6 pt-5 lg:[&:not(:first-child)]:pl-6 lg:[&:not(:first-child)]:border-l lg:border-t-0 lg:border-l-background/30 lg:[&:first-child]:border-l-0">
                  <div className="font-display text-[clamp(3rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.05em]">{s.n}</div>
                  <p className="mt-2 text-sm text-background/70">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Work — large visuals, caption rows */}
        <section className={`bg-background ${band}`}>
          <div className={wrap}>
            <Head n="02" name={c.nav[1]} title={c.workTitle} />
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
              {c.work.map((w, i) => (
                <a key={i} href="#/bento-swiss" className="group block">
                  <div className="overflow-hidden bg-secondary">
                    <img
                      src={img.sites}
                      alt="Website pages arranged around a laptop"
                      className="aspect-[4/3] w-full object-cover grayscale contrast-110 transition-transform duration-300 group-hover:scale-[1.03]"
                      style={{ objectPosition: ["30% 50%", "50% 50%", "70% 50%"][i] }}
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between border-t border-foreground pt-3">
                    <span className="text-lg font-bold tracking-tight">{w.t}</span>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">{w.k} <ArrowRight className="size-4" /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Services — grey band, ruled rows */}
        <section className={`bg-secondary ${band}`}>
          <div className={wrap}>
            <Head n="03" name={c.nav[0]} title={c.servicesTitle} />
            <p className="mb-8 max-w-[62ch] text-xl lg:ml-[25%]">{c.servicesIntro}</p>
            <div className="border-b border-foreground">
              {c.services.map((s, i) => (
                <div key={s.t} className="grid items-baseline gap-x-6 gap-y-2 border-t border-foreground py-7 lg:grid-cols-12">
                  <span className="text-sm font-bold text-[var(--signal)] lg:col-span-1">{"ABC"[i]}</span>
                  <h3 className="m-0 text-[1.9rem] font-bold leading-tight tracking-tight lg:col-span-4">{s.t}</h3>
                  <p className="m-0 max-w-[40ch] text-muted-foreground lg:col-span-4">{s.d}</p>
                  <span className="font-semibold lg:col-span-2">{s.p}</span>
                  <ArrowRight className="size-5 lg:col-span-1 lg:justify-self-end" />
                </div>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-muted-foreground lg:ml-[25%]">{c.aiLine}</p>
          </div>
        </section>

        {/* 04b Process: white band */}
        <section className={`bg-background ${band}`}>
          <div className={wrap}>
            <Head n="04" name={c.nav[2]} title={c.processTitle} />
            <ol className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-5">
              {c.process.map((p, i) => (
                <li key={p.t} className="border-t border-foreground pt-4">
                  <span className="font-display text-5xl font-extrabold leading-none tracking-[-0.05em] text-[var(--signal)]">0{i + 1}</span>
                  <h3 className="m-0 mt-4 text-xl font-bold tracking-tight">{p.t}</h3>
                  <p className="m-0 mt-1 text-[15px] text-muted-foreground">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 Why — comparison table + trust photo */}
        <section className={`bg-secondary ${band}`}>
          <div className={wrap}>
            <Head n="05" name={c.trustTitle} title={c.whyTitle} />
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-5">
                <img src={img.trust} alt="Puzzle piece with the word trust" className="aspect-[4/3] w-full object-cover grayscale contrast-110" />
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {c.trust.map((t, i) => (
                    <li key={t.t} className="border-t border-foreground pt-3">
                      <span className="text-sm font-bold text-[var(--signal)]">0{i + 1}</span>
                      <h3 className="m-0 mt-1 text-base font-bold">{t.t}</h3>
                      <p className="m-0 mt-0.5 text-sm text-muted-foreground">{t.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0 lg:col-span-7">
                <Table>
                  <TableHeader>
                    <TableRow className="border-foreground hover:bg-transparent">
                      <TableHead className="whitespace-normal h-12 w-[45%] px-0 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">{c.whyCols[0]}</TableHead>
                      <TableHead className="whitespace-normal h-12 px-0 text-xs font-bold uppercase tracking-[.14em] text-[var(--signal)]">{c.whyCols[1]}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {c.why.map(([a, b]) => (
                      <TableRow key={a} className="border-foreground/30 hover:bg-transparent">
                        <TableCell className="whitespace-normal px-0 py-5 text-lg text-muted-foreground">{a}</TableCell>
                        <TableCell className="whitespace-normal px-0 py-5 text-lg font-semibold">{b}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* 06 Team + quotes — grey band */}
        <section className={`bg-background ${band}`}>
          <div className={wrap}>
            <Head n="06" name={c.nav[4]} title={c.teamTitle} />
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <img src={img.team} alt="Team placeholder silhouettes" className="h-56 w-full bg-secondary object-contain p-4" />
                <div className="mt-5 grid gap-3">
                  {c.people.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 border-t border-foreground pt-3">
                      <Avatar className="size-12"><AvatarFallback className="bg-secondary text-[10px] text-muted-foreground">{c.photo}</AvatarFallback></Avatar>
                      <div><div className="font-bold">{p.n}</div><div className="text-sm text-muted-foreground">{p.r}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
                {c.quotes.map((q, i) => (
                  <figure key={i} className="m-0 border-t border-foreground pt-4">
                    <blockquote className="m-0 text-lg leading-snug">“{q.q}”</blockquote>
                    <figcaption className="mt-4 text-sm"><b>{q.n}</b><br /><span className="text-muted-foreground">{q.o}</span></figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 07 FAQ: grey band */}
        <section className={`bg-secondary ${band}`}>
          <div className={wrap}>
            <Head n="07" name={c.nav[5]} title={c.faqTitle} />
            <Accordion type="single" collapsible className="border-b border-foreground lg:ml-[25%] lg:w-auto">
              {c.faq.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`} className="border-t border-foreground">
                  <AccordionTrigger className="py-5 text-left text-xl font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="max-w-[62ch] pb-5 text-lg text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 08 Contact — signal band */}
        <section className={`bg-[var(--signal)] ${band} text-white`}>
          <div className={wrap}>
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex">
                    {[0, 1].map((i) => (
                      <Avatar key={i} className={`size-12 border-[3px] border-[var(--signal)] bg-white ${i ? "-ml-3" : ""}`}>
                        <AvatarFallback className="bg-white text-[10px] text-muted-foreground">{c.photo}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="flex items-center gap-2 text-sm font-semibold"><i className="size-2 rounded-full bg-white" /> {c.online}</span>
                </div>
                <h2 className="m-0 max-w-[16ch] text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[.98] tracking-[-0.045em]">{c.closeTitle}</h2>
              </div>
              <div className="lg:col-span-5">
                <p className="mb-5 text-xl">{c.closeSub}</p>
                <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                  <Input type="email" placeholder={c.emailPh} aria-label="Email" className="h-[52px] rounded-md border-0 bg-white px-4 text-base text-foreground" />
                  <Button className="h-[52px] rounded-md bg-foreground px-6 text-base font-semibold text-white hover:bg-white hover:text-black">{c.send}</Button>
                </form>
                <a href="#/bento-swiss" className="mt-4 inline-flex items-center gap-1.5 border-b-2 border-white pb-0.5 text-base font-semibold">{c.booking} <ArrowRight className="size-4" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground pb-24 pt-10 text-sm text-background/70 md:pb-10">
        <div className={`${wrap} flex flex-wrap justify-between gap-4`}>
          <span>{c.footer.rights}</span><span>{c.footer.note}</span><span>{c.footer.privacy} · {c.footer.terms}</span>
        </div>
      </footer>
      <Button className="fixed inset-x-0 bottom-0 z-50 h-14 rounded-none text-base font-semibold sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

import { ArrowRight, Check, Mail, Phone } from "lucide-react"
import { useRef, useState } from "react"
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

// Anchors for the nav, in the same order as c.nav (Kainos points at the priced service list).
const navTargets = ["paslaugos", "darbai", "procesas", "kainos", "apie-mus", "duk"]
const real = (v: string) => !v.startsWith("[")

function scrollToId(id: string) {
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" })
}

// Keeps the hash router happy: the href is a fallback, the click scrolls inside the page.
const go = (id: string, after?: () => void) => (e: React.MouseEvent) => {
  e.preventDefault()
  after?.()
  scrollToId(id)
}

// Phone / email become tel: / mailto: links once the owner replaces the [placeholders].
function Reach({ value, scheme }: { value: string; scheme: "tel" | "mailto" }) {
  if (!real(value)) return <>{value}</>
  const target = scheme === "tel" ? value.replace(/\s/g, "") : value
  return <a href={`${scheme}:${target}`} className="hover:underline">{value}</a>
}

// "Grasp" in the surrounding text colour, "IT" in the accent (lighter tint on dark bands).
function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <>
      Grasp<span className={dark ? "text-[color-mix(in_oklab,var(--signal),white_55%)]" : "text-[var(--signal)]"}>IT</span>
    </>
  )
}

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
  const [interest, setInterest] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const toContact = go("kontaktai")
  const pick = (name: string) => go("kontaktai", () => setInterest(name))
  return (
    <PreviewShell id="bento-swiss" label="Hybrid: Bento × Swiss">
      <div className="bg-foreground text-background">
        <div className={`${wrap} flex h-9 items-center justify-between text-[13px]`}>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="size-3.5" /> <Reach value={c.phone} scheme="tel" /></span>
            <span className="hidden items-center gap-1.5 sm:flex"><Mail className="size-3.5" /> <Reach value={c.email} scheme="mailto" /></span>
          </span>
          <span className="font-semibold">LT <span className="font-normal opacity-50" title="Anglų kalba – netrukus">/ EN</span></span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-foreground bg-background/95 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
          <a href="#/bento-swiss" onClick={go("top")} aria-label="GraspIT – į pradžią" className="font-display flex items-center text-xl font-extrabold tracking-tight">
            <img src={img.logo} alt="" className="mr-2.5 size-9" /> <Brand />
          </a>
          <nav className="hidden gap-7 text-[15px] font-medium lg:flex" aria-label="Main">
            {c.nav.map((n, i) => (
              <a key={n} href="#/bento-swiss" onClick={go(navTargets[i])} className="hover:underline hover:underline-offset-[6px]">{n}</a>
            ))}
          </nav>
          <Button onClick={toContact} className="h-10 rounded-md px-5 text-[15px] font-semibold">{c.cta}</Button>
        </div>
      </header>

      <main>
        {/* 01 Hero — open layout, no boxes */}
        <section id="top" className={`bg-background ${band}`}>
          <div className={wrap}>
            <span className={`${label} text-[var(--signal)]`}>{c.eyebrow}</span>
            <h1 className="mb-0 mt-5 max-w-[16ch] text-[clamp(2.8rem,8vw,7.6rem)] font-bold leading-[.95] tracking-[-0.05em]">{c.title}</h1>
            <div className="mt-10 grid gap-8 border-t border-foreground pt-6 lg:grid-cols-12">
              <p className="max-w-[38ch] text-xl lg:col-span-6">{c.sub}</p>
              <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:col-start-8">
                <Button onClick={toContact} className={btn}>{c.cta1} <ArrowRight /></Button>
                <p className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 shrink-0 text-[var(--signal)]" /> {c.micro}</p>
                <p className="text-sm text-muted-foreground">
                  Svetainės {c.from} <b className="text-foreground">{c.price}</b> · paruošiamos per 7–14 dienų
                </p>
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
        <section id="darbai" className={`scroll-mt-16 bg-background ${band}`}>
          <div className={wrap}>
            <Head n="02" name={c.nav[1]} title={c.workTitle} />
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
              {c.work.map((w, i) => (
                <div key={i} className="group block">
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
                    <span className="text-sm text-muted-foreground">{w.k}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Services — grey band, ruled rows */}
        <section id="paslaugos" className={`scroll-mt-16 bg-secondary ${band}`}>
          <div className={wrap}>
            <Head n="03" name={c.nav[0]} title={c.servicesTitle} />
            <p className="mb-8 max-w-[62ch] text-xl lg:ml-[25%]">{c.servicesIntro}</p>
            <div id="kainos" className="scroll-mt-20 border-b border-foreground">
              {c.services.map((s, i) => (
                <a key={s.t} href="#/bento-swiss" onClick={pick(s.t)} className="group grid items-baseline gap-x-6 gap-y-2 border-t border-foreground py-7 transition-colors hover:bg-background/60 lg:grid-cols-12">
                  <span className="text-sm font-bold text-[var(--signal)] lg:col-span-1">{"ABC"[i]}</span>
                  <h3 className="m-0 text-[1.9rem] font-bold leading-tight tracking-tight lg:col-span-4">{s.t}</h3>
                  <p className="m-0 max-w-[40ch] text-muted-foreground lg:col-span-4">{s.d}</p>
                  <span className="font-semibold lg:col-span-2">{s.p}</span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 lg:col-span-1 lg:justify-self-end" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-muted-foreground lg:ml-[25%]">{c.aiLine}</p>
          </div>
        </section>

        {/* 04b Process: white band */}
        <section id="procesas" className={`scroll-mt-16 bg-background ${band}`}>
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
        <section id="kodel" className={`scroll-mt-16 bg-secondary ${band}`}>
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

        {/* 06 About: story, competence, work ethic. White band */}
        <section id="apie-mus" className={`scroll-mt-16 bg-background ${band}`}>
          <div className={wrap}>
            <Head n="06" name={c.nav[4]} title={c.about.title} />
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <p className="m-0 text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-snug tracking-[-0.02em] lg:col-span-5"><Brand />{c.about.lead.slice(c.brand.length)}</p>
              <div className="flex flex-col gap-5 text-xl lg:col-span-6 lg:col-start-7">
                {c.about.story.map((t) => (
                  <p key={t} className="m-0">{t}</p>
                ))}
              </div>
            </div>

            <div className="mt-16 md:mt-20">
              <span className={`${label} text-muted-foreground`}>{c.about.competenceTitle}</span>
              <div className="mt-4 grid gap-8 sm:grid-cols-3">
                {c.about.competence.map((k, i) => (
                  <div key={k.t} className="border-t border-foreground pt-4">
                    <span className="text-sm font-bold text-[var(--signal)]">0{i + 1}</span>
                    <h3 className="m-0 mt-3 text-2xl font-bold leading-tight tracking-tight">{k.t}</h3>
                    <p className="m-0 mt-2 text-[17px] text-muted-foreground">{k.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 md:mt-20">
              <span className={`${label} text-muted-foreground`}>{c.about.ethicTitle}</span>
              <div className="mt-4 border-b border-foreground">
                {c.about.ethic.map((e) => (
                  <div key={e.t} className="grid gap-x-6 gap-y-1 border-t border-foreground py-5 lg:grid-cols-12">
                    <h3 className="m-0 text-xl font-bold tracking-tight lg:col-span-5">{e.t}</h3>
                    <p className="m-0 text-[17px] text-muted-foreground lg:col-span-7">{e.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 07 Team + quotes: grey band */}
        <section id="komanda" className={`scroll-mt-16 bg-secondary ${band}`}>
          <div className={wrap}>
            <Head n="07" name="Komanda" title={c.teamTitle} />
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <img src={img.team} alt="Team placeholder silhouettes" className="h-56 w-full bg-background object-contain p-4" />
                <div className="mt-5 grid gap-3">
                  {c.people.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 border-t border-foreground pt-3">
                      <Avatar className="size-12"><AvatarFallback className="bg-background text-[10px] text-muted-foreground">{c.photo}</AvatarFallback></Avatar>
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

        {/* 08 FAQ: white band */}
        <section id="duk" className={`scroll-mt-16 bg-background ${band}`}>
          <div className={wrap}>
            <Head n="08" name={c.nav[5]} title={c.faqTitle} />
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
        <section id="kontaktai" className={`scroll-mt-16 bg-[var(--signal)] ${band} text-white`}>
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
                {interest && !sent && (
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    {c.interestLabel}: {interest}
                    <button type="button" onClick={() => setInterest(null)} aria-label="Pašalinti pasirinkimą" className="rounded px-1.5 text-base leading-none hover:bg-white/20">×</button>
                  </p>
                )}
                {sent ? (
                  <p role="status" className="m-0 border-t-2 border-white pt-4 text-xl font-semibold">{c.sent}</p>
                ) : (
                  // Preview only: nothing is sent yet. Wire to the mail service (Resend) when the site is built.
                  <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                    <Input ref={emailRef} required type="email" placeholder={c.emailPh} aria-label="El. paštas" className="h-[52px] rounded-md border-0 bg-white px-4 text-base text-foreground" />
                    <Button type="submit" className="h-[52px] rounded-md bg-foreground px-6 text-base font-semibold text-white hover:bg-white hover:text-black">{c.send}</Button>
                  </form>
                )}
                <a
                  href={real(c.bookingUrl) ? c.bookingUrl : "#/bento-swiss"}
                  {...(real(c.bookingUrl) ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: (e: React.MouseEvent) => { e.preventDefault(); emailRef.current?.focus() } })}
                  className="mt-4 inline-flex items-center gap-1.5 border-b-2 border-white pb-0.5 text-base font-semibold"
                >
                  {c.booking} <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground pb-24 pt-10 text-sm text-background/70 md:pb-10">
        <div className={`${wrap} flex flex-wrap justify-between gap-4`}>
          <span>© <Brand dark /></span><span>{c.footer.note}</span><span title="Puslapiai bus paruošti prieš paleidimą">{c.footer.privacy} · {c.footer.terms}</span>
        </div>
      </footer>
      <Button onClick={toContact} className="fixed inset-x-0 bottom-0 z-50 h-14 rounded-none text-base font-semibold sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

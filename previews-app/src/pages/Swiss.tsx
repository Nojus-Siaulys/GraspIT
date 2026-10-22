import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { c, img } from "@/content"
import { PreviewShell } from "./shared"

const btn = "h-[52px] rounded-none px-6 text-base font-semibold"
const grid = "grid grid-cols-12 gap-x-6"

export default function Swiss() {
  return (
    <PreviewShell id="swiss" label="Swiss style">
      <header className="border-b border-foreground">
        <div className={`${grid} mx-auto h-16 max-w-[1280px] items-center px-6`}>
          <a href="#/swiss" className="font-display col-span-7 flex items-center text-xl font-extrabold tracking-tight lg:col-span-3">
            <i className="mr-2 inline-block size-3 rounded-full bg-[var(--signal)]" /> {c.brand}
          </a>
          <nav className="col-span-7 hidden gap-6 text-[15px] font-medium lg:flex" aria-label="Main">
            {c.nav.map((n) => (
              <a key={n} href="#/swiss" className="hover:underline hover:underline-offset-[6px]">{n}</a>
            ))}
          </nav>
          <a href="#/swiss" className="col-span-5 flex items-center justify-self-end border-b-2 border-[var(--signal)] pb-0.5 text-[15px] font-semibold lg:col-span-2">
            {c.cta} <ArrowRight className="ml-1.5 size-5" />
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[1280px] px-6 pt-14">
          <div className={grid}>
            <div className="col-span-12 pt-0 text-sm text-muted-foreground lg:col-span-3 lg:pt-3">
              <b className="mb-1 block text-foreground">01</b>
              {c.eyebrow}
            </div>
            <h1 className="col-span-12 mt-5 text-[clamp(2.7rem,8.2vw,8rem)] font-bold leading-[.96] tracking-[-0.05em] lg:col-span-9 lg:mt-0">
              {c.title}
            </h1>
          </div>

          <Separator className="mt-12 bg-foreground" />
          <div className={`${grid} pt-5`}>
            <p className="col-span-12 max-w-[36ch] text-xl lg:col-span-5 lg:col-start-4">{c.sub}</p>
            <div className="col-span-12 mt-6 flex flex-col items-start gap-3 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <Button className={btn}>{c.cta1} <ArrowRight /></Button>
              <Button variant="outline" className={`${btn} border-2 border-foreground`}>{c.cta2}</Button>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-4 text-[var(--signal)]" /> {c.micro}
              </p>
            </div>
          </div>

          <Separator className="mt-14 bg-foreground" />
          <div className={`${grid} items-end py-5`}>
            <div className="col-span-12 mb-2 text-sm text-muted-foreground lg:col-span-3">{c.from}</div>
            <div className="font-display col-span-12 text-[clamp(3.4rem,11vw,9.5rem)] font-extrabold leading-[.9] tracking-[-0.06em] lg:col-span-9">
              {c.price}
              <small className="ml-3 font-sans text-base font-medium tracking-normal text-muted-foreground">{c.days}</small>
            </div>
          </div>

          <div className={`${grid} pb-14`}>
            <img src={img.hero} alt="Two people shaking hands across a desk" className="col-span-12 aspect-[21/9] w-full object-cover grayscale contrast-110 lg:col-span-9 lg:col-start-4" />
          </div>
        </section>

        <section className="border-t border-foreground">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 px-6 sm:grid-cols-2 lg:grid-cols-4" aria-label={c.trustTitle}>
            {c.trust.map((t, i) => (
              <div key={t.t} className="border-b border-border py-6 pr-5 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <span className="text-sm font-bold text-[var(--signal)]">0{i + 1}</span>
                <h3 className="mb-1.5 mt-2.5 text-xl font-bold tracking-tight">{t.t}</h3>
                <p className="text-[15px] text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pt-20">
          <Separator className="bg-foreground" />
          <div className={`${grid} py-4`}>
            <div className="col-span-12 text-sm text-muted-foreground lg:col-span-3">
              <b className="mb-1 block text-foreground">02</b>
              {c.nav[0]}
            </div>
            <h2 className="col-span-12 mt-3 text-[clamp(2rem,5vw,3.8rem)] font-bold leading-none tracking-[-0.04em] lg:col-span-9 lg:mt-0">
              {c.servicesTitle}
            </h2>
          </div>
          {c.services.map((s, i) => (
            <div key={s.t} className="border-t border-border last:border-b last:border-b-foreground">
              <div className={`${grid} items-baseline py-6`}>
                <span className="col-span-2 text-sm font-bold text-[var(--signal)] lg:col-span-1">{"ABC"[i]}</span>
                <h3 className="col-span-10 text-[1.7rem] font-bold leading-tight tracking-tight lg:col-span-4">{s.t}</h3>
                <p className="col-span-12 col-start-3 my-2 text-muted-foreground lg:col-span-4 lg:col-start-6 lg:my-0">{s.d}</p>
                <span className="col-span-8 col-start-3 font-semibold lg:col-span-2 lg:col-start-10">{s.p}</span>
                <ArrowRight className="col-span-2 col-start-11 size-5 justify-self-end lg:col-span-1 lg:col-start-12" />
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pt-20">
          <Separator className="bg-foreground" />
          <div className={`${grid} py-4`}>
            <div className="col-span-12 text-sm text-muted-foreground lg:col-span-3">
              <b className="mb-1 block text-foreground">03</b>
              {c.nav[1]} / {c.nav[4]}
            </div>
            <div className="col-span-12 mt-3 grid gap-6 sm:grid-cols-3 lg:col-span-9 lg:mt-0">
              {[
                { src: img.sites, alt: "Website pages arranged around a laptop", cap: c.nav[1], cls: "grayscale contrast-110" },
                { src: img.team, alt: "Team placeholder silhouettes", cap: c.nav[4], cls: "bg-secondary p-4 object-contain" },
                { src: img.trust, alt: "Puzzle piece with the word trust", cap: c.trustTitle, cls: "grayscale contrast-110" },
              ].map((p) => (
                <figure key={p.cap}>
                  <img src={p.src} alt={p.alt} className={`aspect-[4/3] w-full object-cover ${p.cls}`} />
                  <figcaption className="mt-2 text-sm font-semibold">{p.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 bg-[var(--signal)] py-16 text-white md:py-[72px]">
          <div className="mx-auto max-w-[1280px] px-6">
            <h2 className="max-w-[16ch] text-[clamp(2.4rem,6.4vw,5.6rem)] font-bold leading-[.98] tracking-[-0.045em]">{c.closeTitle}</h2>
            <p className="my-6 max-w-[30rem] text-xl">{c.closeSub}</p>
            <Button className={`${btn} bg-black text-white hover:bg-white hover:text-black`}>{c.cta1} <ArrowRight /></Button>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-4 px-6 pb-24 pt-7 text-sm text-muted-foreground">
        <span>{c.footer.rights}</span><span>{c.footer.note}</span><span>{c.footer.privacy} · {c.footer.terms}</span>
      </footer>
      <Button className="fixed inset-x-0 bottom-0 z-50 h-14 rounded-none text-base font-semibold sm:hidden">{c.cta}</Button>
    </PreviewShell>
  )
}

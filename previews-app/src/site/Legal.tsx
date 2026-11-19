import { ArrowRight } from "lucide-react"
import { documents, legal } from "./legalText"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"
const placeholder = /(\[ĮRAŠYTI[^\]]*\])/

// Unfilled details stay visible on the page, highlighted, until they are replaced in legalText.ts.
function Text({ children }: { children: string }) {
  return <>{children.split(placeholder).map((part, index) => index % 2 ? <mark key={index} className="rounded bg-[#fff1b8] px-1 text-foreground">{part}</mark> : part)}</>
}

export function Legal({ kind }: { kind: "privacy" | "cookies" }) {
  const { sections } = documents[kind]
  return <section className="py-16 md:py-24"><div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
    <aside className="lg:col-span-3">
      <div className="lg:sticky lg:top-28">
        <p className="ux-eyebrow">Atnaujinta</p>
        <p className="mt-3 font-semibold">{legal.updated}</p>
        <nav aria-label="Puslapio turinys" className="mt-8 hidden lg:block">
          <ol className="space-y-1 text-sm">{sections.map((section, index) => <li key={section.h}><a href={`#dalis-${index + 1}`} className="inline-flex min-h-9 items-center gap-3 hover:underline"><span className="text-muted-foreground">0{index + 1}</span>{section.h}</a></li>)}</ol>
        </nav>
      </div>
    </aside>
    <div className="space-y-12 lg:col-span-8">
      {sections.map((section, index) => <section key={section.h} id={`dalis-${index + 1}`} className="scroll-mt-28 border-t border-foreground pt-6" aria-labelledby={`dalis-${index + 1}-h`}>
        <h2 id={`dalis-${index + 1}-h`} className="text-2xl font-bold tracking-tight md:text-3xl"><span className="mr-3 text-base text-[var(--signal)]">0{index + 1}</span>{section.h}</h2>
        {section.p?.map(text => <p key={text} className="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted-foreground"><Text>{text}</Text></p>)}
        {section.list && <ul className="mt-4 max-w-[65ch] list-disc space-y-2 pl-5 text-lg leading-relaxed text-muted-foreground">{section.list.map(item => <li key={item}><Text>{item}</Text></li>)}</ul>}
        {section.cards && <div className="mt-6 grid gap-4">{section.cards.map(card => <article key={card.title} className="ux-panel bg-secondary p-6">
          <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
          <dl className="mt-4">{card.rows.map(([label, value]) => <div key={label} className="grid gap-1 border-t border-foreground/20 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6"><dt className="text-sm font-semibold">{label}</dt><dd className="leading-relaxed"><Text>{value}</Text></dd></div>)}</dl>
        </article>)}</div>}
        {section.link && <a href={section.link.href} className="ux-text-link mt-5">{section.link.text}<ArrowRight className="size-4" aria-hidden="true" /></a>}
      </section>)}
    </div>
  </div></section>
}

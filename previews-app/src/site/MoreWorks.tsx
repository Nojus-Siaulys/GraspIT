import { ArrowUpRight } from "lucide-react"
import { designProposals, liveWorks } from "./otherWorks"

// Small cards: a live site opens in a new tab; a design proposal has no link and says it was never published.
export function MoreWorks({ kind }: { kind: "live" | "proposals" }) {
  const items = kind === "live" ? liveWorks : designProposals
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {items.map((work, index) => <article key={work.name} className="lift ux-panel flex flex-col overflow-hidden bg-background">
      <div className="relative border-b border-foreground/15 bg-white">
        <img src={work.image} alt={`${work.name}: ${kind === "live" ? "svetainės pradinis puslapis" : "dizaino pasiūlymo pradinis puslapis"}`} width={1280} height={850} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
        {kind === "proposals" && <span className="absolute left-3 top-3 rounded-md bg-foreground px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-background">Dizaino pasiūlymas · nepaleista</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="ux-eyebrow text-muted-foreground">0{index + 1} / {work.type}</p>
        <h3 className="mt-4 text-2xl font-bold tracking-tight">{work.name}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{work.text}</p>
        {kind === "live" && "url" in work && <a href={work.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold">Atverti svetainę<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only">(naujame lange)</span></a>}
      </div>
    </article>)}
  </div>
}

import { ArrowRight, ArrowUpRight } from "lucide-react"
import { caseStudies } from "./caseStudies"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"

export function CaseStudy({ slug }: { slug: string }) {
  const project = caseStudies.find(item => item.slug === slug)
  if (!project) return null
  return <>
    <section className="bg-secondary py-12 md:py-16" aria-label={`${project.name}: projekto apžvalga`}>
      <div className={`${wrap} grid gap-5 lg:grid-cols-12`}>
        <article className="ux-panel bg-background p-6 md:p-9 lg:col-span-7"><p className="ux-eyebrow">01 / Svetainės tikslas</p><h2 className="mt-6 max-w-[29ch] text-2xl font-semibold leading-snug tracking-tight md:text-3xl">{project.goal}</h2><a href={project.url} target="_blank" rel="noopener noreferrer" className="ux-text-link mt-8">Atverti {project.name}<ArrowUpRight className="size-4" /><span className="sr-only">(naujame lange)</span></a></article>
        <article className="ux-panel p-6 md:p-9 lg:col-span-5"><p className="ux-eyebrow">02 / Projekto dalys</p><ul className="mt-6">{project.scope.map((item, index) => <li key={item} className="flex gap-4 border-t border-foreground/20 py-4 text-lg"><span className="text-xs text-muted-foreground">0{index + 1}</span>{item}</li>)}</ul></article>
        <figure className="ux-panel overflow-hidden bg-white lg:col-span-12"><img src={project.image} alt={`${project.name} svetainės pradinis puslapis`} width={1280} height={850} className="max-h-[42rem] w-full object-contain object-top" /><figcaption className="border-t border-foreground/20 p-4 text-xs text-muted-foreground">{project.name} / Svetainės pradžios puslapio ekrano kopija</figcaption></figure>
      </div>
    </section>
    <section className="py-16 md:py-24"><div className={wrap}><p className="ux-eyebrow">03 / Sprendimų logika</p><h2 className="mt-5 max-w-[22ch] text-3xl font-bold tracking-tight md:text-5xl">Kodėl ši svetainė sudėliota taip.</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{project.decisions.map((item, index) => <article key={item.title} className="border-t border-foreground/30 pt-5"><span className="ux-eyebrow text-muted-foreground">0{index + 1}</span><h3 className="mt-6 text-2xl font-semibold tracking-tight">{item.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p></article>)}</div><div className="ux-panel mt-10 grid gap-5 bg-foreground p-6 text-white md:grid-cols-3 md:p-9"><h3 className="ux-eyebrow">Ką pritaikytume jūsų projektui</h3><p className="text-xl leading-relaxed md:col-span-2">{project.takeaway}</p></div><div className="mt-8 flex flex-wrap items-center justify-between gap-4"><a href={`/kontaktai/?paslauga=${encodeURIComponent(project.service)}&pavyzdys=${project.name}`} className="ux-text-link">Aptarti panašų projektą<ArrowRight className="size-4" /></a><a href="/darbai/" className="ux-text-link">Visi darbai<ArrowRight className="size-4" /></a></div></div></section>
  </>
}

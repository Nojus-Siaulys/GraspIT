import { ArrowRight, ArrowUpRight } from "lucide-react"
import { caseStudies } from "./caseStudies"

export function ProjectGallery() {
  return <div className="grid gap-6 md:grid-cols-2">
    {caseStudies.map((project, index) => <article key={project.slug} className="ux-panel overflow-hidden bg-secondary">
      <a href={`/darbai/${project.slug}/`} className="project-preview group block overflow-hidden border-b border-foreground/15 bg-white" aria-label={`${project.name}: projekto pristatymas`}><img src={project.image} alt={`${project.name} svetainės pradžios puslapis`} width={1280} height={850} loading="lazy" decoding="async" className="aspect-[16/9] max-h-56 w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.015]" /></a>
      <div className="p-6 md:p-8"><p className="ux-eyebrow text-muted-foreground">0{index + 1} / {project.type}</p><h3 className="mt-4 text-3xl font-bold tracking-tight"><a href={`/darbai/${project.slug}/`}>{project.name}</a></h3><p className="mt-3 max-w-[45ch] leading-relaxed text-muted-foreground">{project.summary}</p><div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-foreground/20 pt-4"><a href={`/darbai/${project.slug}/`} className="ux-text-link">Projekto pristatymas<ArrowRight className="size-4" /></a><a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm">Atverti svetainę<ArrowUpRight className="size-4" /><span className="sr-only">(naujame lange)</span></a></div></div>
    </article>)}
  </div>
}

import { ArrowUpRight } from "lucide-react"
import { projects } from "./projects"

export function ProjectGallery() {
  const items = projects
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((project) => <article key={project.name} className="min-w-0">
      {project.image ? <a href={project.url!} target="_blank" rel="noopener noreferrer" aria-label={project.name + " – atverti svetainę naujame lange"} className="project-preview group block overflow-hidden rounded-lg border border-foreground/15 bg-secondary">
        <img src={project.image} alt={project.name + " svetainės pradžios puslapis"} width={1280} height={850} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.015]" />
      </a> : <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-foreground/15 bg-secondary">
        <p className="text-2xl font-bold tracking-tight">{project.name}</p>
      </div>}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-2 border-t border-foreground/25 pt-4">
        <div><p className="mb-2 text-xs font-bold uppercase tracking-[.14em]">{project.type}</p><h3 className="text-2xl font-bold tracking-tight">{project.name}</h3></div>
        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-2 text-xs font-semibold">Atverti svetainę <ArrowUpRight className="size-5" /><span className="sr-only">(naujame lange)</span></a>}
      </div>
      <p className="mt-2 max-w-[55ch] text-base leading-relaxed text-muted-foreground">{project.description}</p>
    </article>)}
  </div>
}


import { ArrowUpRight } from "lucide-react"
import { projects } from "./projects"

export function ProjectGallery({ featured = false }: { featured?: boolean }) {
  const items = projects
  return <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
    {items.map((project, index) => <article key={project.name} className={featured && index === 0 ? "md:col-span-2" : ""}>
      {project.image ? <a href={project.url!} target="_blank" rel="noopener noreferrer" aria-label={project.name + " – atverti svetainę naujame lange"} className="project-preview group block overflow-hidden rounded-lg border border-foreground/15 bg-secondary">
        <img src={project.image} alt={project.name + " svetainės pradžios puslapis"} width={1280} height={850} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.015]" />
      </a> : <div className="flex aspect-[16/10] items-center justify-center rounded-lg border border-foreground/15 bg-secondary">
        <p className="text-5xl font-bold tracking-tight md:text-6xl">{project.name}</p>
      </div>}
      <div className="mt-5 flex items-start justify-between gap-4 border-t border-foreground/25 pt-5">
        <div><p className="mb-2 text-xs font-bold uppercase tracking-[.14em]">{project.type}</p><h3 className="text-3xl font-bold tracking-tight">{project.name}</h3></div>
        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-2 text-sm font-semibold">Atverti svetainę <ArrowUpRight className="size-5" /><span className="sr-only">(naujame lange)</span></a>}
      </div>
      <p className="mt-3 max-w-[55ch] text-lg leading-relaxed text-muted-foreground">{project.description}</p>
    </article>)}
  </div>
}


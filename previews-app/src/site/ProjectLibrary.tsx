import { useState } from "react"
import { ArrowRight, ArrowUpRight, Code2, Cpu, Search, Terminal } from "lucide-react"
import { personalProjects, projectCategories, type ProjectCategory } from "./personalProjects"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"

export function ProjectLibrary() {
  const [category, setCategory] = useState<ProjectCategory>("Visi")
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLocaleLowerCase("lt")
  const filtered = personalProjects.filter(project =>
    (category === "Visi" || project.category === category) &&
    [project.title, project.description, project.category, ...project.technologies, ...Object.values(project.story)].join(" ").toLocaleLowerCase("lt").includes(normalizedQuery)
  )

  return <>
    <section className="bg-secondary py-10 md:py-12" aria-label="Apie biblioteką">
      <div className={`${wrap} grid gap-6 md:grid-cols-12`}>
        <p className="text-4xl font-bold tracking-tight md:col-span-3">{personalProjects.length}<span className="mt-2 block text-sm font-medium tracking-normal text-muted-foreground">asmeniniai projektai</span></p>
        <div className="md:col-span-9"><p className="max-w-[64ch] text-lg leading-relaxed">Čia Nojaus asmeniniai projektai: idėjos, kurias norėjosi išbandyti, įrankiai sau ir eksperimentai su naujomis technologijomis.</p><p className="mt-3 max-w-[70ch] leading-relaxed text-muted-foreground">Dalis jų dar kuriami. Ši biblioteka parodo, ką tyrinėjau ir prie ko dirbau; klientams atliktus darbus rasite <a href="/darbai/" className="font-semibold underline underline-offset-4">atskirame darbų puslapyje</a>.</p></div>
      </div>
    </section>
    <section className="bg-background py-12 md:py-16" aria-labelledby="library-heading">
      <div className={wrap}>
        <h2 id="library-heading" className="text-3xl font-bold tracking-tight md:text-4xl">Projektai ir jų istorijos</h2>
        <div className="mt-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2" aria-label="Projektų kategorijos">
            {projectCategories.map(item => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`min-h-11 rounded-full border border-foreground/25 px-4 py-2 text-sm font-semibold ${category === item ? "bg-foreground text-white" : "bg-background hover:bg-secondary"}`}>{item}<span className="ml-2 opacity-70">{item === "Visi" ? personalProjects.length : personalProjects.filter(project => project.category === item).length}</span></button>)}
          </div>
          <label className="flex min-h-12 items-center gap-3 rounded-md border border-foreground/30 px-4 lg:w-80"><Search className="size-4 shrink-0" aria-hidden="true" /><span className="sr-only">Ieškoti projekto ar technologijos</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Projektas arba technologija…" className="min-w-0 w-full bg-transparent py-3 text-sm outline-none" /></label>
        </div>
        <p className="mt-5 text-sm text-muted-foreground" role="status">Rodoma {filtered.length} iš {personalProjects.length} projektų</p>
        <div className="mt-6 grid items-start gap-5 md:grid-cols-2">
          {filtered.map(project => {
            const Icon = project.category === "AI ir LLM" ? Cpu : project.category === "Python" ? Terminal : Code2
            return <article key={project.id} id={project.id} className="rounded-lg border border-foreground/20 bg-background p-6 md:p-8">
              <div className="flex items-center justify-between gap-4"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em]"><Icon className="size-4" aria-hidden="true" />{project.category}</span><span className="text-right text-xs text-muted-foreground">{project.kind}</span></div>
              <h3 className="mt-7 text-3xl font-bold tracking-tight">{project.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>
              <ul aria-label={`${project.title}: technologijos`} className="mt-5 flex flex-wrap gap-2">{project.technologies.map(technology => <li key={technology} className="rounded bg-secondary px-3 py-1.5 text-xs font-medium">{technology}</li>)}</ul>
              <div className="mt-7 space-y-6 border-t border-foreground/20 pt-6">
                {[["Iš kur kilo idėja", project.story.idea], ["Kokią problemą sprendžiau", project.story.problem], ["Kur projektas liko", project.story.direction]].map(([label, text]) => <div key={label}><h4 className="text-sm font-bold">{label}</h4><p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p></div>)}
                <div className="border-l-2 border-foreground/35 pl-4"><h4 className="text-xs font-bold uppercase tracking-[.1em]">Ką išsinešiau</h4><p className="mt-2 text-sm leading-7">{project.story.lesson}</p></div>
              </div>
              <details className="group mt-6 border-t border-foreground/20 pt-4"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">Techninė pusė<span aria-hidden="true" className="text-xl group-open:rotate-45">+</span></summary><div className="pb-3"><p className="mt-3 text-sm leading-relaxed">{project.focus}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div></details>
              <div className="mt-4 border-t border-foreground/15 pt-4">{project.repository ? <a href={project.repository} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold">Peržiūrėti kodą GitHub<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only">(naujame lange)</span></a> : <p className="py-3 text-sm text-muted-foreground">Kodas šiuo metu neviešinamas.</p>}</div>
            </article>
          })}
        </div>
        {filtered.length === 0 && <div className="rounded-lg border border-foreground/20 bg-secondary px-6 py-12 text-center"><h3 className="text-xl font-bold">Tokio projekto neradome.</h3><p className="mt-3 text-muted-foreground">Pabandykite kitą technologiją arba peržiūrėkite visus projektus.</p><button type="button" onClick={() => { setQuery(""); setCategory("Visi") }} className="mt-5 min-h-11 border-b border-current font-semibold">Rodyti visus projektus</button></div>}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-foreground/25 pt-6"><p className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground">Asmeniniai projektai suteikia erdvės bandyti, klysti ir mokytis. Čia svarbi ir pati kūrimo eiga.</p><a href="https://github.com/Nojus-Siaulys" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 font-semibold">Nojus GitHub<ArrowUpRight className="size-4" /><span className="sr-only">(naujame lange)</span></a></div>
      </div>
    </section>
    <section className="bg-secondary py-12 md:py-16"><div className={`${wrap} flex flex-wrap items-center justify-between gap-6`}><div><p className="text-xs font-bold uppercase tracking-[.14em]">Verslui atlikti darbai</p><h2 className="mt-3 text-2xl font-bold tracking-tight">Ieškote klientų projektų?</h2></div><a href="/darbai/" className="inline-flex min-h-12 items-center gap-3 border-b border-current py-2 font-semibold">Peržiūrėti atliktus darbus<ArrowRight className="size-4" /></a></div></section>
  </>
}

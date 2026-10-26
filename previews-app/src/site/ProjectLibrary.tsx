import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { ArrowRight, ArrowUpRight, Bot, CarFront, ChevronLeft, ChevronRight, Gem, Hammer, Handshake, Lightbulb, Palette, PencilLine, RotateCcw, Search, Shuffle, X } from "lucide-react"
import { personalProjects, projectCategories, type PersonalProject, type ProjectCategory } from "./personalProjects"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"

// Every project uses the same surface. Green communicates actions and key takeaways.
const icons: Record<string, typeof Hammer> = {
  foreman: Hammer, pensila: PencilLine, gintara: Gem, "python-bot": Bot,
  refernet: Handshake, "car-market": CarFront, portfolio: Palette,
}

// Bento rhythm: tile widths repeat 4-2 / 3-3 / 2-4 on a six-column grid.
const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-4"]

const steps = [
  { key: "idea", label: "Idėja", prompt: "Iš kur kilo idėja" },
  { key: "problem", label: "Problema", prompt: "Kokią problemą sprendžiau" },
  { key: "direction", label: "Kur liko", prompt: "Kur projektas liko" },
  { key: "lesson", label: "Pamoka", prompt: "Ką išsinešiau" },
] as const

const pickRandom = <T,>(items: T[], not?: T) => {
  const pool = items.length > 1 ? items.filter(item => item !== not) : items
  return pool[Math.floor(Math.random() * pool.length)]
}

export function ProjectLibrary() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [category, setCategory] = useState<ProjectCategory>("Visi")
  const [query, setQuery] = useState("")
  const [technology, setTechnology] = useState<string | null>(null)
  // Prerendering runs without a window; the client mounts fresh, so a #project link opens straight away.
  const [openId, setOpenId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    const id = window.location.hash.slice(1)
    return personalProjects.some(project => project.id === id) ? id : null
  })
  const normalizedQuery = query.trim().toLocaleLowerCase("lt")
  const filtered = useMemo(() => personalProjects.filter(project =>
    (category === "Visi" || project.category === category) &&
    (!technology || project.technologies.includes(technology)) &&
    [project.title, project.description, project.category, ...project.technologies, ...Object.values(project.story)].join(" ").toLocaleLowerCase("lt").includes(normalizedQuery)
  ), [category, technology, normalizedQuery])

  useEffect(() => {
    if (!gridRef.current || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tiles = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.lib-tile'))
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-revealed', 'true')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    tiles.forEach(tile => {
      if (tile.dataset.revealed === 'true') return
      tile.dataset.revealed = 'false'
      observer.observe(tile)
    })
    return () => observer.disconnect()
  }, [filtered])

  const open = (id: string | null) => {
    setOpenId(id)
    window.history.replaceState(null, "", id ? `#${id}` : window.location.pathname + window.location.search)
  }
  const reset = () => { setQuery(""); setCategory("Visi"); setTechnology(null) }
  const surprise = () => open(pickRandom(filtered.map(project => project.id), openId ?? undefined))
  const openProject = personalProjects.find(project => project.id === openId)
  const openIndex = openProject ? filtered.findIndex(project => project.id === openProject.id) : -1
  const neighbour = (offset: number) => filtered.length > 1 && openIndex >= 0 ? filtered[(openIndex + offset + filtered.length) % filtered.length] : undefined

  return <>
    <section className="bg-secondary py-10 md:py-12" aria-label="Apie biblioteką">
      <div className={`${wrap} grid items-center gap-6 md:grid-cols-12`}>
        <p className="text-5xl font-bold tracking-tight md:col-span-3 md:text-6xl">{personalProjects.length}<span className="mt-2 block text-sm font-medium tracking-normal text-muted-foreground">asmeniniai projektai</span></p>
        <div className="md:col-span-9">
          <p className="max-w-[60ch] text-lg leading-relaxed">Čia Nojaus idėjos, kurias norėjosi išbandyti. Pasirinkite projektą: nuo pirmos idėjos ir spręstos problemos iki to, ką išmokau. Nežinote, nuo ko pradėti? Leiskite pasirinkti už jus.</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" onClick={surprise} disabled={filtered.length === 0} className="lib-press inline-flex min-h-12 items-center gap-2 rounded-md bg-foreground px-5 font-semibold text-white disabled:opacity-50"><Shuffle className="size-4" aria-hidden="true" />Nustebink mane</button>
            <p className="text-sm text-muted-foreground">Dalis projektų dar kuriami. Klientų darbus rasite <a href="/darbai/" className="font-semibold text-foreground underline underline-offset-4">atskirame puslapyje</a>.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-background py-12 md:py-16" aria-labelledby="library-heading">
      <div className={wrap}>
        <h2 id="library-heading" className="text-3xl font-bold tracking-tight md:text-4xl">Projektai ir jų istorijos</h2>
        <div className="mt-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Projektų kategorijos">
            {projectCategories.map(item => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`lib-press min-h-11 rounded-md border border-foreground/25 px-4 py-2 text-sm font-semibold ${category === item ? "bg-foreground text-white" : "bg-background hover:bg-secondary"}`}>{item}<span className="ml-2 opacity-70">{item === "Visi" ? personalProjects.length : personalProjects.filter(project => project.category === item).length}</span></button>)}
          </div>
          <label className="flex min-h-12 items-center gap-3 rounded-md border border-foreground/30 px-5 lg:w-80"><Search className="size-4 shrink-0" aria-hidden="true" /><span className="sr-only">Ieškoti projekto ar technologijos</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Projektas arba technologija…" className="min-w-0 w-full bg-transparent py-3 text-sm outline-none" /></label>
        </div>
        <div className="mt-5 flex min-h-8 flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <p role="status">Rodoma {filtered.length} iš {personalProjects.length} projektų</p>
          {technology && <button type="button" onClick={() => setTechnology(null)} className="inline-flex min-h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-semibold text-white">{technology}<X className="size-3.5" aria-hidden="true" /><span className="sr-only">Pašalinti technologijos filtrą</span></button>}
        </div>

        <div ref={gridRef} className="lib-grid mt-6 grid gap-4 md:grid-cols-6">
          {filtered.map((project, index) => {
            const Icon = icons[project.id] ?? Lightbulb
            return <article key={project.id} id={project.id} style={{ "--reveal-delay": `${(index % 2) * 60}ms` } as CSSProperties} className={`lib-tile group relative flex flex-col overflow-hidden rounded-md p-6 md:p-8 ${spans[index % spans.length]}`}>
              <div className="flex items-start justify-between gap-4">
                <span className="lib-index" aria-hidden="true">{String(personalProjects.indexOf(project) + 1).padStart(2, "0")}<Icon className="size-5" /></span>
                <span className="rounded-md border border-current/30 px-3 py-1 text-xs font-semibold opacity-80">{project.kind}</span>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.12em] opacity-70">{project.category}</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                <button type="button" onClick={() => open(project.id)} aria-haspopup="dialog" className="text-left after:absolute after:inset-0 after:content-['']">{project.title}<span className="sr-only">: skaityti istoriją</span></button>
              </h3>
              <p className="mt-3 max-w-[52ch] leading-relaxed opacity-85">{project.description}</p>
              <ul aria-label={`${project.title}: technologijos`} className="relative z-10 mt-5 flex flex-wrap gap-2">
                {project.technologies.map(item => <li key={item}><button type="button" onClick={() => setTechnology(technology === item ? null : item)} aria-pressed={technology === item} title={`Rodyti projektus su ${item}`} className="lib-chip min-h-8 rounded-md px-3 text-xs font-semibold">{item}</button></li>)}
              </ul>
              <p className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold" aria-hidden="true">Skaityti istoriją<ArrowRight className="lib-arrow size-4" /></p>
              <noscript>
                <div className="mt-4 space-y-3 border-t border-current/30 pt-4 text-sm leading-relaxed">
                  {steps.map(step => <p key={step.key}><strong>{step.prompt}: </strong>{project.story[step.key]}</p>)}
                </div>
              </noscript>
            </article>
          })}
        </div>

        {filtered.length === 0 && <div className="rounded-2xl border border-foreground/20 bg-secondary px-6 py-12 text-center"><h3 className="text-xl font-bold">Tokio projekto neradome.</h3><p className="mt-3 text-muted-foreground">Pabandykite kitą technologiją arba peržiūrėkite visus projektus.</p><button type="button" onClick={reset} className="lib-press mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-foreground px-5 font-semibold text-white"><RotateCcw className="size-4" aria-hidden="true" />Rodyti visus projektus</button></div>}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-foreground/25 pt-6"><p className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground">Asmeniniai projektai suteikia erdvės bandyti, klysti ir mokytis. Čia svarbi ir pati kūrimo eiga.</p><a href="https://github.com/Nojus-Siaulys" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 font-semibold">Nojus GitHub<ArrowUpRight className="size-4" /><span className="sr-only">(naujame lange)</span></a></div>
      </div>
    </section>

    <section className="bg-secondary py-12 md:py-16"><div className={`${wrap} flex flex-wrap items-center justify-between gap-6`}><div><p className="text-xs font-bold uppercase tracking-[.14em]">Verslui atlikti darbai</p><h2 className="mt-3 text-2xl font-bold tracking-tight">Ieškote klientų projektų?</h2></div><a href="/darbai/" className="inline-flex min-h-12 items-center gap-3 border-b border-current py-2 font-semibold">Peržiūrėti atliktus darbus<ArrowRight className="size-4" /></a></div></section>

    {openProject && <StoryDialog key={openProject.id} project={openProject} onClose={() => open(null)} onPrev={neighbour(-1) && (() => open(neighbour(-1)!.id))} onNext={neighbour(1) && (() => open(neighbour(1)!.id))} onSurprise={filtered.length > 1 ? surprise : undefined} />}
  </>
}

function StoryDialog({ project, onClose, onPrev, onNext, onSurprise }: { project: PersonalProject; onClose: () => void; onPrev?: () => void; onNext?: () => void; onSurprise?: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const number = String(personalProjects.indexOf(project) + 1).padStart(2, "0")

  useEffect(() => {
    const dialog = dialogRef.current
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    if (dialog && !dialog.open) dialog.showModal()
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
      trigger?.focus({ preventScroll: true })
    }
  }, [])

  const requestClose = () => {
    const dialog = dialogRef.current
    if (!dialog || dialog.dataset.closing) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { dialog.close(); return }
    dialog.dataset.closing = 'true'
    const animation = dialog.animate([
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(8px)' },
    ], { duration: 160, easing: 'cubic-bezier(.4, 0, 1, 1)', fill: 'forwards' })
    animation.finished.then(() => dialog.close()).catch(() => dialog.close())
  }

  return <dialog ref={dialogRef} aria-labelledby="story-title" onClose={onClose} onCancel={event => { event.preventDefault(); requestClose() }} onClick={event => { if (event.target === dialogRef.current) requestClose() }} className="lib-dialog">
    <div className="lib-dialog-bar">
      <p>Biblioteka <span aria-hidden="true">/</span> Projektas {number}</p>
      <button type="button" onClick={requestClose} className="lib-close"><span>Uždaryti</span><X className="size-5" aria-hidden="true" /></button>
    </div>

    <header className="lib-project-head">
      <div>
        <p className="lib-label">{project.category} <span aria-hidden="true">/</span> {project.kind}</p>
        <h2 id="story-title">{project.title}</h2>
      </div>
      <p className="lib-project-summary">{project.description}</p>
    </header>

    {project.screenshots?.length ? <ProjectGallery screenshots={project.screenshots} /> : null}

    <div className="lib-project-grid">
      <div className="lib-story-grid">
        {steps.map((item, index) => <section key={item.key} className={`lib-story-block ${item.key === "lesson" ? "lib-story-lesson" : ""}`} aria-labelledby={`story-${item.key}`}>
          <div className="lib-section-label"><span aria-hidden="true">0{index + 1}</span><h3 id={`story-${item.key}`}>{item.prompt}</h3></div>
          {item.key === "lesson" ? <blockquote>{project.story[item.key]}</blockquote> : <p>{project.story[item.key]}</p>}
        </section>)}
      </div>

      <aside className="lib-project-aside" aria-label={`${project.title}: techninė pusė`}>
        <section className="lib-tech-block">
          <h3 className="lib-label">Techninė pusė</h3>
          <p className="lib-tech-focus">{project.focus}</p>
          <ol className="lib-feature-list">{project.features.map((feature, index) => <li key={feature}><span aria-hidden="true">0{index + 1}</span><p>{feature}</p></li>)}</ol>
        </section>
        <section className="lib-stack-block">
          <h3 className="lib-label">Technologijos</h3>
          <ul aria-label={`${project.title}: technologijos`}>{project.technologies.map(item => <li key={item}>{item}</li>)}</ul>
          {project.repository ? <a href={project.repository} target="_blank" rel="noopener noreferrer" className="lib-source">Peržiūrėti kodą<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only">GitHub (naujame lange)</span></a> : <p className="lib-private">Kodas šiuo metu neviešinamas.</p>}
        </section>
      </aside>
    </div>

    <footer className="lib-project-footer">
      <button type="button" onClick={onPrev} disabled={!onPrev}><ChevronLeft className="size-4" aria-hidden="true" />Ankstesnis</button>
      {onSurprise && <button type="button" onClick={onSurprise}><Shuffle className="size-4" aria-hidden="true" /><span>Atsitiktinis</span></button>}
      <button type="button" onClick={onNext} disabled={!onNext}>Kitas<ChevronRight className="size-4" aria-hidden="true" /></button>
    </footer>
  </dialog>
}


function ProjectGallery({ screenshots }: { screenshots: NonNullable<PersonalProject["screenshots"]> }) {
  const [selected, setSelected] = useState(0)
  const shot = screenshots[selected]
  return <section className="lib-gallery" aria-label="Projekto ekrano kopijos">
    <header className="lib-gallery-head">
      <h3 className="lib-label">Vaizdai iš projekto</h3>
      {screenshots.length > 1 && <div className="lib-gallery-controls" role="group" aria-label="Pasirinkti projekto vaizdą">{screenshots.map((item, index) => <button key={item.src} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index}><span aria-hidden="true">0{index + 1}</span><span>{item.label}</span></button>)}</div>}
    </header>
    <figure>
      <div className="lib-gallery-screen"><img key={shot.src} src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} decoding="async" /></div>
      <figcaption aria-live="polite"><span>0{selected + 1} / 0{screenshots.length}</span><span>{shot.label}</span></figcaption>
    </figure>
  </section>
}

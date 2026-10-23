import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { ArrowRight, ArrowUpRight, Bot, CarFront, ChevronLeft, ChevronRight, Gem, Hammer, Handshake, Lightbulb, Palette, PencilLine, RotateCcw, Search, Shuffle, X } from "lucide-react"
import { personalProjects, projectCategories, type PersonalProject, type ProjectCategory } from "./personalProjects"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"

// One colour system, not seven unrelated colours: every tile shares the same lightness and chroma and only the hue moves,
// along an analogous arc (clay → amber → moss → sage → teal) that sits next to the brand forest green and sand.
// Text is always brand ink on the tile, and accents share one lightness so white icons keep AA contrast.
const brandInk = "#10372b"
const tint = (hue: number) => `oklch(0.93 0.045 ${hue})`
const accentOf = (hue: number) => `oklch(0.48 0.1 ${hue})`
// accent fills the icon badge; strong is the darker twin used for text and bars on white.
type Tone = { bg: string; ink: string; accent: string; strong: string; icon: typeof Hammer }
const tones: Record<string, Tone> = {
  foreman: { bg: brandInk, ink: "#ffffff", accent: "oklch(0.78 0.11 155)", strong: accentOf(155), icon: Hammer },
  pensila: { bg: tint(55), ink: brandInk, accent: accentOf(55), strong: accentOf(55), icon: PencilLine },
  gintara: { bg: tint(85), ink: brandInk, accent: accentOf(85), strong: accentOf(85), icon: Gem },
  "python-bot": { bg: tint(120), ink: brandInk, accent: accentOf(120), strong: accentOf(120), icon: Bot },
  refernet: { bg: tint(150), ink: brandInk, accent: accentOf(150), strong: accentOf(150), icon: Handshake },
  "car-market": { bg: tint(190), ink: brandInk, accent: accentOf(190), strong: accentOf(190), icon: CarFront },
  portfolio: { bg: "#f3efe6", ink: brandInk, accent: "#1f6b4f", strong: "#1f6b4f", icon: Palette },
}
const fallbackTone: Tone = { bg: "#f3efe6", ink: brandInk, accent: "#1f6b4f", strong: "#1f6b4f", icon: Lightbulb }
const toneOf = (project: PersonalProject) => tones[project.id] ?? fallbackTone
const toneStyle = (tone: Tone) => ({ "--tone-bg": tone.bg, "--tone-ink": tone.ink, "--tone-accent": tone.accent, "--tone-strong": tone.strong, "--tone-icon": tone.ink === "#ffffff" ? brandInk : "#ffffff" } as CSSProperties)

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
          <p className="max-w-[60ch] text-lg leading-relaxed">Čia Nojaus idėjos, kurias norėjosi išbandyti. Pasirinkite kortelę ir perskaitykite istoriją po vieną žingsnį. Nežinote, nuo ko pradėti? Leiskite pasirinkti už jus.</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" onClick={surprise} disabled={filtered.length === 0} className="lib-press inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-5 font-semibold text-white disabled:opacity-50"><Shuffle className="size-4" aria-hidden="true" />Nustebink mane</button>
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
            {projectCategories.map(item => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`lib-press min-h-11 rounded-full border border-foreground/25 px-4 py-2 text-sm font-semibold ${category === item ? "bg-foreground text-white" : "bg-background hover:bg-secondary"}`}>{item}<span className="ml-2 opacity-70">{item === "Visi" ? personalProjects.length : personalProjects.filter(project => project.category === item).length}</span></button>)}
          </div>
          <label className="flex min-h-12 items-center gap-3 rounded-full border border-foreground/30 px-5 lg:w-80"><Search className="size-4 shrink-0" aria-hidden="true" /><span className="sr-only">Ieškoti projekto ar technologijos</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Projektas arba technologija…" className="min-w-0 w-full bg-transparent py-3 text-sm outline-none" /></label>
        </div>
        <div className="mt-5 flex min-h-8 flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <p role="status">Rodoma {filtered.length} iš {personalProjects.length} projektų</p>
          {technology && <button type="button" onClick={() => setTechnology(null)} className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-semibold text-white">{technology}<X className="size-3.5" aria-hidden="true" /><span className="sr-only">Pašalinti technologijos filtrą</span></button>}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-6">
          {filtered.map((project, index) => {
            const tone = toneOf(project)
            const Icon = tone.icon
            return <article key={project.id} id={project.id} style={toneStyle(tone)} className={`lib-tile group relative flex flex-col overflow-hidden rounded-2xl p-6 md:p-7 ${spans[index % spans.length]} ${index % 2 ? "lib-tilt-right" : "lib-tilt-left"}`}>
              <div className="flex items-start justify-between gap-4">
                <span className="lib-icon grid size-14 place-items-center rounded-2xl" aria-hidden="true"><Icon className="size-7" /></span>
                <span className="rounded-full border border-current/30 px-3 py-1 text-xs font-semibold opacity-80">{project.kind}</span>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.12em] opacity-70">{project.category}</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                <button type="button" onClick={() => open(project.id)} aria-haspopup="dialog" className="text-left after:absolute after:inset-0 after:content-['']">{project.title}<span className="sr-only">: skaityti istoriją</span></button>
              </h3>
              <p className="mt-3 max-w-[52ch] leading-relaxed opacity-85">{project.description}</p>
              <ul aria-label={`${project.title}: technologijos`} className="relative z-10 mt-5 flex flex-wrap gap-2">
                {project.technologies.map(item => <li key={item}><button type="button" onClick={() => setTechnology(technology === item ? null : item)} aria-pressed={technology === item} title={`Rodyti projektus su ${item}`} className="lib-chip min-h-8 rounded-full px-3 text-xs font-semibold">{item}</button></li>)}
              </ul>
              <div className="lib-peek mt-5">
                <div><p className="border-l-2 border-current/50 pl-3 text-sm leading-relaxed opacity-90"><span className="font-bold">Pamoka: </span>{project.story.lesson}</p></div>
              </div>
              <p className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold" aria-hidden="true">Skaityti istoriją<ArrowRight className="lib-arrow size-4" /></p>
              <noscript>
                <div className="mt-4 space-y-3 border-t border-current/30 pt-4 text-sm leading-relaxed">
                  {steps.map(step => <p key={step.key}><strong>{step.prompt}: </strong>{project.story[step.key]}</p>)}
                </div>
              </noscript>
            </article>
          })}
        </div>

        {filtered.length === 0 && <div className="rounded-2xl border border-foreground/20 bg-secondary px-6 py-12 text-center"><h3 className="text-xl font-bold">Tokio projekto neradome.</h3><p className="mt-3 text-muted-foreground">Pabandykite kitą technologiją arba peržiūrėkite visus projektus.</p><button type="button" onClick={reset} className="lib-press mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 font-semibold text-white"><RotateCcw className="size-4" aria-hidden="true" />Rodyti visus projektus</button></div>}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-foreground/25 pt-6"><p className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground">Asmeniniai projektai suteikia erdvės bandyti, klysti ir mokytis. Čia svarbi ir pati kūrimo eiga.</p><a href="https://github.com/Nojus-Siaulys" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 font-semibold">Nojus GitHub<ArrowUpRight className="size-4" /><span className="sr-only">(naujame lange)</span></a></div>
      </div>
    </section>

    <section className="bg-secondary py-12 md:py-16"><div className={`${wrap} flex flex-wrap items-center justify-between gap-6`}><div><p className="text-xs font-bold uppercase tracking-[.14em]">Verslui atlikti darbai</p><h2 className="mt-3 text-2xl font-bold tracking-tight">Ieškote klientų projektų?</h2></div><a href="/darbai/" className="inline-flex min-h-12 items-center gap-3 border-b border-current py-2 font-semibold">Peržiūrėti atliktus darbus<ArrowRight className="size-4" /></a></div></section>

    {openProject && <StoryDialog key={openProject.id} project={openProject} onClose={() => open(null)} onPrev={neighbour(-1) && (() => open(neighbour(-1)!.id))} onNext={neighbour(1) && (() => open(neighbour(1)!.id))} onSurprise={filtered.length > 1 ? surprise : undefined} />}
  </>
}

function StoryDialog({ project, onClose, onPrev, onNext, onSurprise }: { project: PersonalProject; onClose: () => void; onPrev?: () => void; onNext?: () => void; onSurprise?: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [step, setStep] = useState(0)
  const [seen, setSeen] = useState<number[]>([0])
  const tone = toneOf(project)
  const Icon = tone.icon
  const current = steps[step]
  const goTo = (next: number) => { setStep(next); setSeen(previous => previous.includes(next) ? previous : [...previous, next]) }
  const last = step === steps.length - 1

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return <dialog ref={dialogRef} aria-labelledby="story-title" onClose={onClose} onClick={event => { if (event.target === dialogRef.current) dialogRef.current?.close() }} style={toneStyle(tone)} className="lib-dialog m-auto w-[min(60rem,calc(100vw-1.5rem))] max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-3xl bg-background p-0 text-foreground">
    <header className="lib-dialog-head flex items-start gap-4 p-5 md:p-8">
      <span className="lib-icon grid size-14 shrink-0 place-items-center rounded-2xl md:size-16" aria-hidden="true"><Icon className="size-7 md:size-8" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-[.12em] opacity-75">{project.category} · {project.kind}</p>
        <h2 id="story-title" className="mt-1 text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h2>
      </div>
      <button type="button" onClick={() => dialogRef.current?.close()} className="lib-press grid size-11 shrink-0 place-items-center rounded-full border border-current/40"><X className="size-5" aria-hidden="true" /><span className="sr-only">Uždaryti</span></button>
    </header>

    <div className="grid gap-8 p-5 md:grid-cols-5 md:p-8">
      <div className="md:col-span-3">
        <div role="tablist" aria-label="Projekto istorijos žingsniai" className="flex flex-wrap gap-2">
          {steps.map((item, index) => <button key={item.key} type="button" role="tab" id={`tab-${item.key}`} aria-selected={step === index} aria-controls="story-panel" onClick={() => goTo(index)} className={`lib-press min-h-11 rounded-full border px-4 text-sm font-semibold ${step === index ? "border-transparent bg-foreground text-white" : seen.includes(index) ? "border-foreground/40 bg-secondary" : "border-foreground/25 bg-background hover:bg-secondary"}`}><span className="mr-2 opacity-60">{index + 1}</span>{item.label}</button>)}
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">{steps.map((item, index) => <span key={item.key} className="h-1.5 flex-1 rounded-full transition-colors" style={{ background: index <= step ? "var(--tone-strong)" : "color-mix(in srgb, var(--foreground) 12%, transparent)" }} />)}</div>

        <div key={current.key} id="story-panel" role="tabpanel" aria-labelledby={`tab-${current.key}`} className="lib-step mt-6 min-h-52">
          <h3 className="text-sm font-bold uppercase tracking-[.12em]" style={{ color: "var(--tone-strong)" }}>{current.prompt}</h3>
          {last
            ? <blockquote className="mt-4 rounded-2xl p-5 text-xl font-semibold leading-snug md:p-6 md:text-2xl" style={{ background: "var(--tone-bg)", color: "var(--tone-ink)" }}>{project.story[current.key]}</blockquote>
            : <p className="mt-4 text-lg leading-8 md:text-xl md:leading-9">{project.story[current.key]}</p>}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {last
            ? <button type="button" onClick={() => setStep(0)} className="lib-press inline-flex min-h-12 items-center gap-2 rounded-full border border-foreground/40 px-5 font-semibold"><RotateCcw className="size-4" aria-hidden="true" />Skaityti iš pradžių</button>
            : <button type="button" onClick={() => goTo(step + 1)} className="lib-press inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-5 font-semibold text-white">Toliau: {steps[step + 1].label}<ArrowRight className="size-4" aria-hidden="true" /></button>}
          {step > 0 && !last && <button type="button" onClick={() => goTo(step - 1)} className="min-h-12 px-2 font-semibold text-muted-foreground underline underline-offset-4">Atgal</button>}
        </div>
      </div>

      <aside className="md:col-span-2" aria-label={`${project.title}: techninė pusė`}>
        <div className="rounded-2xl p-5" style={{ background: "var(--tone-bg)", color: "var(--tone-ink)" }}>
          <h3 className="text-xs font-bold uppercase tracking-[.12em] opacity-75">Techninė pusė</h3>
          <p className="mt-3 text-sm leading-relaxed">{project.focus}</p>
          <ul className="mt-4 space-y-2">{project.features.map((feature, index) => <li key={feature} className="flex gap-3 rounded-xl bg-white/45 p-3 text-sm leading-relaxed"><span className="grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold" style={{ background: "var(--tone-ink)", color: "var(--tone-bg)" }} aria-hidden="true">{index + 1}</span>{feature}</li>)}</ul>
        </div>
        <ul aria-label={`${project.title}: technologijos`} className="mt-4 flex flex-wrap gap-2">{project.technologies.map(item => <li key={item} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold">{item}</li>)}</ul>
        <div className="mt-5">{project.repository ? <a href={project.repository} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4">Peržiūrėti kodą GitHub<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only">(naujame lange)</span></a> : <p className="text-sm text-muted-foreground">Kodas šiuo metu neviešinamas.</p>}</div>
      </aside>
    </div>

    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-foreground/15 p-4 md:px-8">
      <button type="button" onClick={onPrev} disabled={!onPrev} className="lib-press inline-flex min-h-11 items-center gap-1 rounded-full px-3 font-semibold disabled:opacity-40"><ChevronLeft className="size-4" aria-hidden="true" />Ankstesnis</button>
      {onSurprise && <button type="button" onClick={onSurprise} className="lib-press inline-flex min-h-11 items-center gap-2 rounded-full bg-secondary px-4 font-semibold"><Shuffle className="size-4" aria-hidden="true" />Atsitiktinis</button>}
      <button type="button" onClick={onNext} disabled={!onNext} className="lib-press inline-flex min-h-11 items-center gap-1 rounded-full px-3 font-semibold disabled:opacity-40">Kitas<ChevronRight className="size-4" aria-hidden="true" /></button>
    </footer>
  </dialog>
}

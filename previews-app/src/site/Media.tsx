import { useEffect, useRef, useState } from "react"
import { Camera, Maximize2, Video } from "lucide-react"
import { media, showPlaceholders, type MediaId, type MediaItem } from "./mediaSlots"

// Animated previews live in /public/previews. The iframe is added only on the client and only near the viewport,
// so prerendered HTML stays free of embeds and the page's first load does not pay for them.
// With `grow`, the preview reports how tall its screens really are and the frame never ends up shorter, so nothing is cut off.
export function MediaEmbed({ item, className, decorative = false, grow = false }: { item: MediaItem; className: string; decorative?: boolean; grow?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [live, setLive] = useState(false)
  const [needed, setNeeded] = useState(0)
  useEffect(() => {
    if (!grow) return
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.type !== "preview-height") return
      setNeeded(Number(event.data.height) || 0)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [grow])
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLive(true)
        io.disconnect()
      }
    }, { rootMargin: "240px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`embed-frame w-full overflow-hidden rounded-lg border border-foreground/30 bg-secondary ${className}`} style={{ "--ratio": item.ratio, minHeight: needed || undefined } as React.CSSProperties}>
    {live && <iframe ref={frame} src={item.embed} title={item.alt} tabIndex={decorative ? -1 : undefined} loading="lazy" className="size-full border-0" />}
  </div>
}

export function Media({ id, className = "" }: { id: MediaId; className?: string }) {
  const item: MediaItem = media[id]
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (item.kind === "video" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause()
  }, [item.kind])
  const frame = `w-full overflow-hidden rounded-lg object-cover ${className}`
  const style = { aspectRatio: item.ratio }

  if (item.embed) return <MediaEmbed item={item} className={className} grow />
  // Text inside the film is too small at phone width, so phones get a button that opens it full screen.
  const enlarge = () => {
    const v = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
    if (!v) return
    if (v.requestFullscreen) void v.requestFullscreen()
    else v.webkitEnterFullscreen?.()
  }
  if (item.src && item.kind === "video") return <div className="relative">
    <video ref={ref} src={item.src} poster={item.poster} aria-label={item.alt} autoPlay muted loop playsInline preload="none" className={frame} style={style} />
    <button type="button" onClick={enlarge} className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-md bg-background px-4 text-sm font-semibold text-foreground md:hidden"><Maximize2 className="size-4" aria-hidden="true" />Padidinti</button>
  </div>
  if (item.src) return <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className={frame} style={style} />
  if (!showPlaceholders) return null

  const Icon = item.kind === "video" ? Video : Camera
  if (item.brief) return <div role="group" aria-label={`Turinio planas: ${item.label}`} className={`media-slot p-6 text-left md:p-7 ${className}`}>
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground text-background"><Icon className="size-5" aria-hidden="true" /></span>
      <p className="text-xs font-bold uppercase tracking-[.12em]">Planuojamas {item.kind === "video" ? "video" : "vaizdas"} · tik kuriant</p>
    </div>
    <p className="mt-4 text-xl font-bold leading-snug">{item.label}</p>
    <dl className="mt-5 space-y-4 text-sm leading-relaxed">
      {[["Kam ši vieta skirta?", item.brief.purpose], ["Ką čia parodysime?", item.brief.shows], ["Ką reikia paruošti?", item.brief.prepare]].map(([title, text]) => <div key={title}><dt className="font-semibold">{title}</dt><dd className="mt-1 text-muted-foreground">{text}</dd></div>)}
    </dl>
    <p className="mt-5 border-t border-foreground/25 pt-4 text-xs leading-relaxed text-muted-foreground"><strong className="font-semibold text-foreground">Formatas: </strong>{item.brief.format}</p>
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Tai pasiruošimo pastabos. Įdėjus nuotrauką ar video, šį bloką pakeis pats turinys.</p>
  </div>
  return <div role="img" aria-label={`Vieta ${item.kind === "video" ? "video" : "nuotraukai"}: ${item.label}`} className={`media-slot flex flex-col items-center justify-center gap-3 p-6 text-center ${className}`} style={style}>
    <span className="grid size-12 place-items-center rounded-full bg-foreground text-background"><Icon className="size-5" aria-hidden="true" /></span>
    <p className="text-sm font-bold uppercase tracking-[.12em]">Vieta {item.kind === "video" ? "video" : "nuotraukai"}</p>
    <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">{item.label}</p>
    <p className="text-xs text-muted-foreground">Rodoma tik kuriant</p>
  </div>
}

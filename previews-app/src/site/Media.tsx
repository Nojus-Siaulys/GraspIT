import { useEffect, useRef, useState } from "react"
import { Camera, Video } from "lucide-react"
import { media, showPlaceholders, type MediaId, type MediaItem } from "./mediaSlots"

// Animated previews live in /public/previews. The iframe is added only on the client and only near the viewport,
// so prerendered HTML stays free of embeds and the page's first load does not pay for them.
function Embed({ item, className }: { item: MediaItem; className: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [live, setLive] = useState(false)
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
  return <div ref={ref} className={`embed-frame w-full overflow-hidden rounded-lg border border-foreground/30 bg-secondary ${className}`} style={{ "--ratio": item.ratio } as React.CSSProperties}>
    {live && <iframe src={item.embed} title={item.alt} loading="lazy" className="size-full border-0" />}
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

  if (item.embed) return <Embed item={item} className={className} />
  if (item.src && item.kind === "video") return <video ref={ref} src={item.src} poster={item.poster} aria-label={item.alt} autoPlay muted loop playsInline preload="metadata" className={frame} style={style} />
  if (item.src) return <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className={frame} style={style} />
  if (!showPlaceholders) return null

  const Icon = item.kind === "video" ? Video : Camera
  return <div role="img" aria-label={`Vieta ${item.kind === "video" ? "video" : "nuotraukai"}: ${item.label}`} className={`media-slot flex flex-col items-center justify-center gap-3 p-6 text-center ${className}`} style={style}>
    <span className="grid size-12 place-items-center rounded-full bg-foreground text-background"><Icon className="size-5" aria-hidden="true" /></span>
    <p className="text-sm font-bold uppercase tracking-[.12em]">Vieta {item.kind === "video" ? "video" : "nuotraukai"}</p>
    <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">{item.label}</p>
    <p className="text-xs text-muted-foreground">Rodoma tik kuriant</p>
  </div>
}

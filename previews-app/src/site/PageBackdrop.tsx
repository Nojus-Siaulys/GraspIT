import { useEffect, useRef } from "react"

// Photographed header backgrounds for inner pages. They scroll slower than the page, like the home hero.
// Photos are free Unsplash images; sources are listed in public/img/headers/CREDITS.md.
export const pageBackdrops: Record<string, string> = {
  "/paslaugos": "services",
  "/biblioteka": "library",
  "/procesas": "process",
  "/apie-mus": "about",
}

export function PageBackdrop({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const update = () => {
      const pastTop = Math.max(0, -element.parentElement!.getBoundingClientRect().top)
      element.style.setProperty("--hero-shift", `${Math.min(pastTop * .18, 160)}px`)
      frame = 0
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    return () => { window.removeEventListener("scroll", schedule); cancelAnimationFrame(frame) }
  }, [])
  return <div ref={ref} className="page-backdrop" aria-hidden="true">
    <picture>
      <source media="(max-width: 639px)" srcSet={`/img/headers/${name}-mobile.webp`} />
      <img src={`/img/headers/${name}.webp`} alt="" decoding="async" />
    </picture>
    <div className="page-backdrop-shade" />
  </div>
}

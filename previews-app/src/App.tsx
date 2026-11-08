import { useEffect } from "react"
import { Site } from "@/site/Site"
import { smoothScroll } from "@/site/smoothScroll"

export default function App() {
  useEffect(() => {
    // Retire the old hash-based design previews while preserving section anchors.
    const clearPreviewRoute = () => {
      if (window.location.hash.startsWith("#/")) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        )
      }
    }
    clearPreviewRoute()
    window.addEventListener("hashchange", clearPreviewRoute)
    return () => window.removeEventListener("hashchange", clearPreviewRoute)
  }, [])

  useEffect(() => {
    // Slow, eased wheel scrolling. Loaded after first paint; skipped when the visitor asks for less motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let stop = () => {}
    let cancelled = false
    Promise.all([import("lenis"), import("lenis/dist/lenis.css")]).then(([{ default: Lenis }]) => {
      if (cancelled) return
      const lenis = new Lenis({ autoRaf: true, duration: 1.3 })
      smoothScroll.lenis = lenis
      stop = () => {
        smoothScroll.lenis = undefined
        lenis.destroy()
      }
    })
    return () => {
      cancelled = true
      stop()
    }
  }, [])

  const path = window.location.pathname.replace(/\/+$/, "") || "/"
  return <Site path={path} />
}

import { useEffect } from "react"
import { Site } from "@/site/Site"

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

  const path = window.location.pathname.replace(/\/+$/, "") || "/"
  return <Site path={path} />
}

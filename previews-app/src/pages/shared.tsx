import { useEffect, useState, type ReactNode } from "react"

export const isEmbed = () => window.location.hash.includes("embed")

// "#/bento-swiss?palette=blue" picks a colour palette for the hybrid; no value = Forest + sand (chosen 2026-10-22).
export const palettes = [
  { id: "forest", label: "Forest + sand (chosen)", swatch: "#1f6b4f" },
  { id: "blue", label: "Trust blue", swatch: "#1d4ed8" },
  { id: "teal", label: "Navy + teal", swatch: "#0f766e" },
  { id: "graphite", label: "Graphite + cobalt", swatch: "#2f54eb" },
  { id: "red", label: "Red (original)", swatch: "#e4002b" },
]
const readPalette = () => new URLSearchParams(window.location.hash.split("?")[1]).get("palette") ?? "forest"

function usePalette() {
  const [palette, setPalette] = useState(readPalette())
  useEffect(() => {
    const on = () => setPalette(readPalette())
    window.addEventListener("hashchange", on)
    return () => window.removeEventListener("hashchange", on)
  }, [])
  return palette
}

export function PreviewShell({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: ReactNode
}) {
  const palette = usePalette()
  const picker = id === "bento-swiss"
  return (
    <div data-theme={id} data-palette={picker && palette !== "red" ? palette : undefined} className="min-h-screen">
      {!isEmbed() && (
        <div className="flex items-center justify-between gap-3 bg-[#111] px-4 py-1.5 text-xs font-medium text-white">
          <span>
            <a href="#/" className="underline underline-offset-4">
              ← All styles
            </a>
            {"  ·  "}
            <b>Preview:</b> {label}
          </span>
          <span className="hidden sm:inline">Placeholder text — design only</span>
        </div>
      )}
      {!isEmbed() && picker && (
        <div className="flex flex-wrap items-center gap-2 bg-[#222] px-4 py-1.5 text-xs text-white">
          <span className="mr-1 font-semibold">Palette:</span>
          {palettes.map((p) => (
            <a
              key={p.id}
              href={`#/${id}${p.id === "forest" ? "" : `?palette=${p.id}`}`}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${palette === p.id ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"}`}
            >
              <i className="inline-block size-3 rounded-full" style={{ background: p.swatch }} />
              {p.label}
            </a>
          ))}
        </div>
      )}
      {children}
    </div>
  )
}

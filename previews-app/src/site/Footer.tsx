import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { contact, phoneHref, siteCopy } from "./settings"

type Item = readonly [href: string, label: string]

const pageUrl = (path: string) =>
  path === "/" ? path : path.replace(/\/?(#.*)?$/, "/$1")

const word = "GraspIT"

// Giant wordmark: sized so "GraspIT" spans the footer width exactly, letters rise in once when the footer scrolls into view.
function Wordmark() {
  const box = useRef<HTMLAnchorElement>(null)
  const text = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = box.current
    const label = text.current
    const footer = element?.closest("footer")
    if (!element || !label || !footer) return
    footer.classList.add("fm-js")

    const fit = () => {
      const width = element.clientWidth
      if (!width) return
      const previous = label.style.fontSize
      label.style.fontSize = "100px"
      const natural = label.getBoundingClientRect().width
      label.style.fontSize = previous
      if (!natural) return
      const size = (100 * width) / natural
      element.style.setProperty("--fm-fs", `${size}px`)
      element.style.setProperty("--fm-h", `${size * 0.8}px`)
      label.style.top = `${-size * 0.1}px`
    }
    fit()
    const resize = new ResizeObserver(fit)
    resize.observe(element)
    document.fonts?.ready.then(fit)

    const reveal = () => footer.classList.add("fm-in")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      reveal()
      return () => resize.disconnect()
    }
    const seen = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { reveal(); seen.disconnect() }
    }, { threshold: 0.25 })
    seen.observe(footer)
    return () => { resize.disconnect(); seen.disconnect() }
  }, [])

  return (
    <a ref={box} href="/" className="fm-wordmark" aria-label="GraspIT, į puslapio pradžią">
      <span ref={text} aria-hidden="true">
        {[...word].map((letter, index) => <i key={index} style={{ transitionDelay: `${index * 70}ms` }}>{letter}</i>)}
      </span>
    </a>
  )
}

export function Footer({ links }: { links: readonly Item[] }) {
  const items = [...links, ["/kontaktai", "Kontaktai"] as const]
  // Two columns, read down the first and then the second, so numbers follow the visual order.
  const half = Math.ceil(items.length / 2)
  const ordered = Array.from({ length: half }, (_, row) => [items[row], items[row + half]]).flat().filter(Boolean) as Item[]
  const number = (item: Item) => String(items.indexOf(item) + 1).padStart(2, "0")

  return (
    <footer className="fm bg-foreground text-background">
      <div className="fm-inner">
        <div className="fm-head">
          <div>
            <h2>Papasakokite, ko reikia jūsų svetainei.</h2>
            <div className="fm-acts">
              <a href="/kontaktai/" className="fm-btn">{siteCopy.ctaShort}<ArrowRight className="size-4" aria-hidden="true" /></a>
              {contact.phone && <a href={phoneHref} className="fm-phone">{contact.phone}</a>}
              {contact.email && <a href={`mailto:${contact.email}`} className="fm-phone">{contact.email}</a>}
            </div>
          </div>
          <nav aria-label="Poraštės meniu">
            <ul className="fm-cols">
              {ordered.map((item) => (
                <li key={item[0]}>
                  <a href={pageUrl(item[0])}><i aria-hidden="true">{number(item)}</i>{item[1]}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="fm-meta">
          <span className="fm-dim">© GraspIT · Svetainių kūrimas ir atnaujinimas{contact.email && ` · ${contact.email}`}</span>
        </div>
        <Wordmark />
      </div>
    </footer>
  )
}

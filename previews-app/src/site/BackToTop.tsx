import { useEffect, useRef, useState } from "react"
import { ArrowUp } from "lucide-react"
import { contact } from "./settings"

// Icon-only button. Appears after about one screen of scrolling and switches colour over the dark footer so it never blends in.
// On phones it sits above the fixed call bar when that bar is shown.
export function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null)
  const [show, setShow] = useState(false)
  const [onFooter, setOnFooter] = useState(false)
  useEffect(() => {
    const update = () => {
      setShow(window.scrollY > 700)
      const button = ref.current?.getBoundingClientRect()
      const footer = document.querySelector("footer")?.getBoundingClientRect()
      setOnFooter(Boolean(button && footer && footer.top < button.top + button.height / 2))
    }
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])
  const goTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" })
    event.currentTarget.blur()
  }
  const tone = onFooter
    ? "text-background [filter:drop-shadow(0_0_3px_var(--foreground))]"
    : "text-foreground [filter:drop-shadow(0_0_3px_var(--background))]"
  return (
    <button
      ref={ref}
      type="button"
      onClick={goTop}
      aria-label="Grįžti į puslapio viršų"
      tabIndex={show ? 0 : -1}
      className={`fixed right-3 z-40 grid size-12 place-items-center md:right-7 md:bottom-8 motion-safe:transition ${tone} ${contact.phone ? "bottom-[5.25rem]" : "bottom-5"} ${show ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"}`}
    >
      <ArrowUp className="size-7" strokeWidth={2.75} aria-hidden="true" />
    </button>
  )
}

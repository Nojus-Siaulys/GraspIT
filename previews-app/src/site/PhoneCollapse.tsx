import { useRef, useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"

// On a phone a long home section shows only its heading and a button; from 768 px up nothing changes.
// The section stays in the page HTML, and without JavaScript the style in <noscript> shows it again.
export function PhoneCollapse({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const content = useRef<HTMLDivElement>(null)
  function show() {
    setOpen(true)
    requestAnimationFrame(() => content.current?.focus({ preventScroll: true }))
  }
  return <>
    <div ref={content} tabIndex={-1} className={open ? "outline-none" : "phone-collapsed"}>{children}</div>
    {!open && <div className="bg-background py-8 md:hidden"><div className={wrap}>
      <h2 className="text-3xl font-bold leading-tight tracking-tight">{title}</h2>
      <button type="button" onClick={show} className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-md border border-foreground/40 px-5 font-semibold">Rodyti daugiau<ChevronDown className="size-4" aria-hidden="true" /></button>
    </div></div>}
    <noscript><style>{".phone-collapsed{display:block!important}"}</style></noscript>
  </>
}

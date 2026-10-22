import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const hybrids = [
  {
    id: "bento-apple",
    name: "Bento × Apple",
    note: "Bento tiles on a calm grey page, with Apple's big centred headline, quiet colour and link-style secondary actions. Premium and easy to read.",
  },
  {
    id: "bento-ios",
    name: "Bento × iOS",
    note: "Bento tiles as iPhone widgets: app-style icons, App Store price pills, grouped lists and a bottom action bar on phones. Friendly and familiar.",
  },
  {
    id: "bento-swiss",
    name: "Bento × Swiss",
    note: "Pasirinkta GraspIT svetainė: Forest + sand, 11 atskirų puslapių, trumpas pradinis puslapis ir išsamus DUK.",
  },
]

const styles = [
  {
    id: "navy",
    name: "Navy studio",
    note: "Evolves the current silver, navy and blue identity into a studio look. Added: both team faces and the price anchor in the first screen.",
  },
  {
    id: "swiss",
    name: "Swiss style",
    note: "Strict 12-column grid, huge flush-left type, one red signal. Added: the price as a typographic statement, numbered sections.",
  },
  {
    id: "constructivism",
    name: "Constructivism",
    note: "Bold geometry, thick rules, flat offset shadows, red on cream. Added: black text on cream for contrast, trust points as numbered blocks.",
  },
  {
    id: "flat",
    name: "Flat",
    note: "Solid colour, simple shapes, friendly illustration. Added: colour-coded trust tiles, ink text on every colour for contrast.",
  },
  {
    id: "bento",
    name: "Bento",
    note: "Modular tiles, each with one job. Added: team, price and work preview visible together in the first screen.",
  },
  {
    id: "apple",
    name: "Apple-inspired",
    note: "Calm, centred, huge type and generous space. Added: a one-field lead capture in the closing section.",
  },
  {
    id: "ios",
    name: "iPhone / iOS",
    note: "The iOS app look: grouped lists with app-style icons, App Store price pills, widgets and a bottom action bar on phones. Added: price, delivery and reply time as widgets.",
  },
]

function Thumb({ id }: { id: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1280))
    ro.observe(el)
    setScale(el.clientWidth / 1280)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={box} className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border bg-white">
      <iframe
        title={`${id} preview`}
        src={`${import.meta.env.BASE_URL}#/${id}?embed`}
        loading="lazy"
        tabIndex={-1}
        className="pointer-events-none absolute left-0 top-0 h-[800px] w-[1280px] origin-top-left border-0"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  )
}

function Section({ title, list }: { title: string; list: { id: string; name: string; note: string }[] }) {
  return (
    <>
      <h2 className="mt-12 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <Card key={s.id} className="gap-4 p-4">
              <Thumb id={s.id} />
              <CardHeader className="px-1">
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  {s.name}
                </CardTitle>
                <CardDescription>{s.note}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto px-1">
                <Button asChild>
                  <a href={s.id === "bento-swiss" ? "/" : `#/${s.id}`}>
                    {s.id === "bento-swiss" ? "Atverti svetainę" : "Open"} <ArrowRight />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  )
}

export default function Gallery() {
  return (
    <div data-theme="gallery" className="min-h-screen">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Front page previews</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Pasirinkta „Bento × Swiss“ kryptis jau išplėtota į kelių puslapių GraspIT svetainę.
          Kitos kortelės – ankstesni vieno puslapio dizaino eskizai.
        </p>
        <Section title="Bento hybrids" list={hybrids} />
        <Section title="All styles" list={styles} />
      </div>
    </div>
  )
}

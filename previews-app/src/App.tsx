import { useEffect, useRef, useState } from "react"
import Gallery from "@/Gallery"
import Apple from "@/pages/Apple"
import Bento from "@/pages/Bento"
import BentoApple from "@/pages/BentoApple"
import BentoIos from "@/pages/BentoIos"
import BentoSwiss from "@/pages/BentoSwiss"
import Constructivism from "@/pages/Constructivism"
import Flat from "@/pages/Flat"
import Ios from "@/pages/Ios"
import Navy from "@/pages/Navy"
import Swiss from "@/pages/Swiss"

const routes: Record<string, () => React.ReactElement> = {
  navy: Navy,
  swiss: Swiss,
  constructivism: Constructivism,
  flat: Flat,
  bento: Bento,
  apple: Apple,
  ios: Ios,
  "bento-apple": BentoApple,
  "bento-ios": BentoIos,
  "bento-swiss": BentoSwiss,
}

const current = () => window.location.hash.replace(/^#\/?/, "").split("?")[0]

// "#/full/<id>": the whole page at desktop width (1280), scaled to fit the window.
function FullView({ id }: { id: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(2400)
  // Optional "?w=760" fixes the target width in px (for small panes); default is the window width.
  const target = () => Number(new URLSearchParams(window.location.hash.split("?")[1]).get("w")) || window.innerWidth
  const [scale, setScale] = useState(target() / 1280)
  useEffect(() => {
    const onResize = () => setScale(target() / 1280)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  const measure = () => {
    const doc = frame.current?.contentDocument
    if (doc) setHeight(doc.documentElement.scrollHeight)
  }
  return (
    <div style={{ height: height * scale, overflow: "hidden" }}>
      <iframe
        ref={frame}
        title={`${id} full page`}
        src={`${import.meta.env.BASE_URL}#/${id}?embed`}
        onLoad={() => {
          measure()
          setTimeout(measure, 800)
        }}
        style={{ width: 1280, height, border: 0, transform: `scale(${scale})`, transformOrigin: "top left" }}
      />
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(current())
  useEffect(() => {
    const onChange = () => {
      setRoute(current())
      window.scrollTo(0, 0)
    }
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  if (route.startsWith("full/")) return <FullView key={window.location.hash} id={route.slice(5)} />
  const Page = routes[route]
  return Page ? <Page /> : <Gallery />
}

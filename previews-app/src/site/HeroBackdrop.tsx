import { useEffect, useRef } from "react"

type Point = readonly [number, number]

// Project an original 1280 × 720 capture into the photographed screen.
// The browser keeps the source capture intact instead of baking it into a tiny image.
function perspective(corners: readonly Point[]) {
  const source: Point[] = [[0, 0], [1280, 0], [1280, 720], [0, 720]]
  const matrix: number[][] = []
  corners.forEach(([u, v], index) => {
    const [x, y] = source[index]
    matrix.push([x, y, 1, 0, 0, 0, -u * x, -u * y, u])
    matrix.push([0, 0, 0, x, y, 1, -v * x, -v * y, v])
  })
  for (let column = 0; column < 8; column++) {
    const pivot = matrix.reduce((best, row, index) => index >= column && Math.abs(row[column]) > Math.abs(matrix[best][column]) ? index : best, column)
    ;[matrix[column], matrix[pivot]] = [matrix[pivot], matrix[column]]
    const divisor = matrix[column][column]
    matrix[column] = matrix[column].map(value => value / divisor)
    matrix.forEach((row, index) => {
      if (index === column) return
      const factor = row[column]
      matrix[index] = row.map((value, cell) => value - factor * matrix[column][cell])
    })
  }
  const [a, b, c, d, e, f, g, h] = matrix.map(row => row[8])
  return `matrix3d(${a},${d},0,${g},${b},${e},0,${h},0,0,1,0,${c},${f},0,1)`
}

const monitor = perspective([[316, 142], [957, 130], [973, 523], [322, 539]])
const laptop = perspective([[1034, 409], [1399, 423], [1379, 677], [1005, 652]])

export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!element || preference.matches) return
    let frame = 0
    const update = () => {
      const hero = element.parentElement!
      const pastTop = Math.max(0, -hero.getBoundingClientRect().top)
      element.style.setProperty("--hero-shift", `${Math.min(pastTop * .18, 200)}px`)
      frame = 0
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    return () => { window.removeEventListener("scroll", schedule); cancelAnimationFrame(frame) }
  }, [])

  return <div ref={ref} className="hero-backdrop" aria-hidden="true">
    <svg className="hero-art" viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid slice" focusable="false">
      <foreignObject width="1536" height="1024">
        <div className="hero-photo-stage">
          <picture><source media="(max-width: 639px)" srcSet="/img/generated/hero-real-websites-v3-mobile.webp" /><img className="hero-room-photo" src="/img/generated/hero-real-websites-v3.webp" alt="" width={1536} height={1024} fetchPriority="high" /></picture>
          <img className="hero-screen-capture" src="/img/hero-screens/studio-freight.jpg" alt="" width={1280} height={720} style={{ transform: monitor }} fetchPriority="high" />
          <img className="hero-screen-capture" src="/img/hero-screens/malvah-studio.jpg" alt="" width={1280} height={720} style={{ transform: laptop }} fetchPriority="high" />
        </div>
      </foreignObject>
    </svg>
    <div className="hero-readability-shade" />
  </div>
}

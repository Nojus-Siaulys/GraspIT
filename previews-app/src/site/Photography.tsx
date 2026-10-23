const photoRoot = "/img/generated/"

export function StudioScene() {
  return <section className="studio-scene" aria-labelledby="scene-heading">
    <div className="studio-scene-shade" />
    <div className="studio-scene-copy">
      <p className="text-xs font-bold uppercase tracking-[.16em]">Kaip dirbame</p>
      <h2 id="scene-heading" className="mt-5 max-w-[18ch] text-[clamp(2.3rem,5vw,4.7rem)] font-bold leading-[1.05] tracking-tight">Pirmiausia aptariame jūsų svetainę.</h2>
      <a href="/procesas/" className="mt-7 inline-flex min-h-12 items-center border-b border-current text-lg font-semibold">Kaip dirbame →</a>
    </div>
  </section>
}

export function TrustPhoto() {
  return <img src={photoRoot + "handshake.webp"} width={1536} height={1024} loading="lazy" decoding="async"
    alt="Rankų paspaudimas prie darbo stalo"
    className="h-full min-h-64 w-full rounded-lg object-cover" />
}

export function EditorialPhoto({ subject }: { subject: "workspace" | "brand" }) {
  return <img src={photoRoot + "brand-triptych.webp"} width={1944} height={809} loading="lazy" decoding="async"
    alt={subject === "workspace" ? "Šviesus darbo stalas su kompiuteriu ir žalia lempa" : "Žalios ir smėlio spalvos skulptūra su žymeklio simboliu"}
    className="editorial-photo"
    style={{ objectPosition: subject === "workspace" ? "left center" : "right center" }} />
}


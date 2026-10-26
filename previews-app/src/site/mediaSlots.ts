// Photo and video slots. Fill `src` (a path under /public, e.g. "/img/team/studio.webp") to publish a real asset.
// Empty slots are visible during local development so missing media is easy to track.
// Production builds hide them unless VITE_SHOW_PLACEHOLDERS=1; use 0 to hide locally.
// `embed` points at a self-contained animated preview under /public/previews (loaded lazily in an iframe, client-side only).
export type MediaItem = { kind: "photo" | "video"; ratio: string; label: string; alt: string; src?: string; poster?: string; embed?: string; brief?: { purpose: string; shows: string; prepare: string; format: string } }

const flag = (import.meta as ImportMeta & { env: Record<string, string | boolean | undefined> }).env
export const showPlaceholders = flag.VITE_SHOW_PLACEHOLDERS === "1" || (flag.DEV === true && flag.VITE_SHOW_PLACEHOLDERS !== "0")

export const media = {
  heroVideo: { kind: "video", ratio: "16 / 10", label: "Trumpa sukurtos svetainės peržiūra", alt: "Pavyzdinės svetainės peržiūra kompiuteryje ir telefone", embed: "/previews/hero.html?v=1" },
  homeNew: { kind: "photo", ratio: "16 / 10", label: "Nauja svetainė kompiuteryje ir telefone", alt: "Pavyzdinė nauja svetainė kompiuteryje ir telefone", embed: "/previews/home-new.html?v=1" },
  homeRedesign: { kind: "photo", ratio: "16 / 10", label: "Svetainės palyginimas prieš ir po atnaujinimo", alt: "Pavyzdinė svetainė prieš ir po atnaujinimo", embed: "/previews/home-redesign.html?v=1" },
  processWork: { kind: "photo", ratio: "3 / 2", label: "Projekto eiga: nuo pokalbio iki paleidimo", alt: "Penki projekto žingsniai: pokalbis, pasiūlymas, kūrimas, pastabos ir paleidimas", embed: "/previews/process.html?v=1" },
  aboutVideo: { kind: "video", ratio: "16 / 9", label: "Prisistatymo video: kas esame ir kaip dirbame", alt: "GraspIT komandos prisistatymas", embed: "/previews/about.html?v=1" },
  contactPhoto: { kind: "photo", ratio: "4 / 3", label: "GraspIT komanda", alt: "Abu GraspIT komandos nariai neformalioje nuotraukoje lauke", src: "/img/team/team-casual.webp" },
  serviceWebsites: { kind: "video", ratio: "16 / 9", label: "Svetainės peržiūros įrašas (slinkimas per puslapį)", alt: "Pavyzdinės verslo svetainės peržiūra: struktūra, pritaikymas ekranams ir paieškos pagrindas", embed: "/previews/websites.html?v=3" },
  serviceShop: { kind: "video", ratio: "16 / 9", label: "Parduotuvės įrašas: katalogas, krepšelis, užsakymas", alt: "Pavyzdinės el. parduotuvės peržiūra: katalogas, pirkimo kelias ir turinio valdymas", embed: "/previews/shop.html?v=3" },
  serviceAutomation: { kind: "photo", ratio: "16 / 9", label: "Automatizacijos schema ar ekrano kadras", alt: "Pavyzdinė laiškų ir darbo procesų automatizacija su žmogaus patvirtinimu", embed: "/previews/automation.html?v=3" },
  serviceRedesign: { kind: "photo", ratio: "16 / 9", label: "Prieš / po palyginimas", alt: "Pavyzdinė svetainė prieš ir po atnaujinimo", embed: "/previews/redesign.html?v=3" },
} satisfies Record<string, MediaItem>

export type MediaId = keyof typeof media
export const hasMedia = (id: MediaId) => Boolean((media[id] as MediaItem).src || (media[id] as MediaItem).embed) || showPlaceholders

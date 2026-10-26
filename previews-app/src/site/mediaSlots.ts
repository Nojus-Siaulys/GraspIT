// Photo and video slots. Fill `src` (a path under /public, e.g. "/img/team/studio.webp") to publish a real asset.
// Empty slots are visible during local development so missing media is easy to track.
// Production builds hide them unless VITE_SHOW_PLACEHOLDERS=1; use 0 to hide locally.
// `embed` points at a self-contained animated preview under /public/previews (loaded lazily in an iframe, client-side only).
export type MediaItem = { kind: "photo" | "video"; ratio: string; label: string; alt: string; src?: string; poster?: string; embed?: string }

const flag = (import.meta as ImportMeta & { env: Record<string, string | boolean | undefined> }).env
export const showPlaceholders = flag.VITE_SHOW_PLACEHOLDERS === "1" || (flag.DEV === true && flag.VITE_SHOW_PLACEHOLDERS !== "0")

export const media = {
  heroVideo: { kind: "video", ratio: "16 / 10", label: "Trumpas įrašas (10–15 s, be garso): kaip peržiūrima jūsų kurta svetainė", alt: "Jūsų kurtos svetainės peržiūra" },
  homeNew: { kind: "photo", ratio: "16 / 10", label: "Nauja svetainė telefone ir kompiuteryje (maketas arba nuotrauka)", alt: "Nauja svetainė telefone ir kompiuteryje" },
  homeRedesign: { kind: "photo", ratio: "16 / 10", label: "Prieš / po: atnaujinta esama svetainė", alt: "Svetainė prieš ir po atnaujinimo" },
  processWork: { kind: "photo", ratio: "3 / 2", label: "Darbo kadras: jūs prie ekrano, eskizų ar su klientu", alt: "GraspIT komanda dirba prie projekto" },
  aboutVideo: { kind: "video", ratio: "16 / 9", label: "Prisistatymo video (30–60 s): kas esate ir kaip dirbate", alt: "GraspIT komandos prisistatymas" },
  contactPhoto: { kind: "photo", ratio: "4 / 3", label: "Jūsų abiejų nuotrauka šalia kontaktų: veidas padeda paskambinti", alt: "GraspIT komanda" },
  serviceWebsites: { kind: "video", ratio: "16 / 9", label: "Svetainės peržiūros įrašas (slinkimas per puslapį)", alt: "Pavyzdinės verslo svetainės peržiūra: struktūra, pritaikymas ekranams ir paieškos pagrindas", embed: "/previews/websites.html?v=3" },
  serviceShop: { kind: "video", ratio: "16 / 9", label: "Parduotuvės įrašas: katalogas, krepšelis, užsakymas", alt: "Pavyzdinės el. parduotuvės peržiūra: katalogas, pirkimo kelias ir turinio valdymas", embed: "/previews/shop.html?v=3" },
  serviceAutomation: { kind: "photo", ratio: "16 / 9", label: "Automatizacijos schema ar ekrano kadras", alt: "Pavyzdinė laiškų ir darbo procesų automatizacija su žmogaus patvirtinimu", embed: "/previews/automation.html?v=3" },
  serviceRedesign: { kind: "photo", ratio: "16 / 9", label: "Prieš / po palyginimas", alt: "Pavyzdinė svetainė prieš ir po atnaujinimo", embed: "/previews/redesign.html?v=3" },
} satisfies Record<string, MediaItem>

export type MediaId = keyof typeof media
export const hasMedia = (id: MediaId) => Boolean((media[id] as MediaItem).src || (media[id] as MediaItem).embed) || showPlaceholders

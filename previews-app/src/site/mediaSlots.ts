// Photo and video slots. Fill `src` (a path under /public, e.g. "/img/team/studio.webp") to publish a real asset.
// Empty slots are visible during local development so missing media is easy to track.
// Production builds hide them unless VITE_SHOW_PLACEHOLDERS=1; use 0 to hide locally.
// `embed` points at a self-contained animated preview under /public/previews (loaded lazily in an iframe, client-side only).
export type MediaItem = { kind: "photo" | "video"; ratio: string; label: string; alt: string; src?: string; poster?: string; embed?: string; brief?: { purpose: string; shows: string; prepare: string; format: string } }

const flag = (import.meta as ImportMeta & { env: Record<string, string | boolean | undefined> }).env
export const showPlaceholders = flag.VITE_SHOW_PLACEHOLDERS === "1" || (flag.DEV === true && flag.VITE_SHOW_PLACEHOLDERS !== "0")

export const media = {
  heroVideo: { kind: "video", ratio: "16 / 10", label: "Trumpa sukurtos svetainės peržiūra", alt: "Pavyzdinės svetainės peržiūra kompiuteryje ir telefone", embed: "/previews/hero.html?v=3" },
  homeNew: { kind: "photo", ratio: "16 / 10", label: "Mūsų sukurtos svetainės", alt: "Dvi GraspIT sukurtos svetainės: Kalvita ir Colorlisse", embed: "/previews/home-new.html?v=7" },
  homeRedesign: { kind: "photo", ratio: "16 / 10", label: "Svetainės palyginimas prieš ir po atnaujinimo", alt: "Pavyzdinė svetainė prieš ir po atnaujinimo", embed: "/previews/home-redesign.html?v=5" },
  processWork: { kind: "photo", ratio: "3 / 2", label: "Projekto eiga: nuo pokalbio iki paleidimo", alt: "Penki projekto žingsniai: pokalbis, pasiūlymas, kūrimas, pastabos ir paleidimas", embed: "/previews/process.html?v=2" },
  aboutVideo: { kind: "video", ratio: "16 / 9", label: "Prisistatymo video: kas esame ir kaip dirbame", alt: "GraspIT komandos prisistatymas", embed: "/previews/about.html?v=1" },
  contactPhoto: { kind: "photo", ratio: "4 / 3", label: "GraspIT komanda", alt: "Abu GraspIT komandos nariai neformalioje nuotraukoje lauke", src: "/img/team/team-casual.webp" },
  serviceWebsites: { kind: "video", ratio: "16 / 9", label: "Svetainės pavyzdys: nuo paieškos iki užklausos", alt: "Pavyzdinis scenarijus: klientas randa verslo svetainę paieškoje, ji telpa ir telefone, ir kompiuteryje, o užklausa iškart atkeliauja savininkui", src: "/previews/websites.mp4", poster: "/previews/websites-poster.jpg" },
  serviceShop: { kind: "video", ratio: "16 / 9", label: "Parduotuvės pavyzdys: nuo žinučių iki užsakymo", alt: "Pavyzdinis scenarijus: užsakymai žinutėmis virsta parduotuve su preke, krepšeliu, užsakymo keliu ir savininko prekių valdymu", src: "/previews/shop.mp4", poster: "/previews/shop-poster.jpg" },
  serviceAutomation: { kind: "video", ratio: "16 / 9", label: "Automatizacijos pavyzdys: nuo laiško iki atsakymo", alt: "Pavyzdinis scenarijus: gautas klientų laiškas, paruoštas atsakymo juodraštis, įrašas lentelėje ir priminimas, o išsiųsti atsakymą tvirtina žmogus", src: "/previews/automation.mp4", poster: "/previews/automation-poster.jpg" },
  serviceApps: { kind: "video", ratio: "16 / 9", label: "Programos pavyzdys: nuo Excel lentelės iki programos", alt: "Pavyzdinis scenarijus: Excel lentelė, laiškai ir užrašai virsta viena užsakymų programa su užsakymo kortele, klientų peržiūra telefone, rolėmis ir savaitės ataskaita", src: "/previews/programos.mp4", poster: "/previews/programos-poster.jpg" },
  serviceRedesign: { kind: "video", ratio: "16 / 9", label: "Atnaujinimo pavyzdys: prieš ir po", alt: "Pavyzdinis scenarijus: sena svetainė, sprendimas ką palikti, naujas dizainas tinkamas ir telefonui, senų adresų nukreipimai", src: "/previews/redesign.mp4", poster: "/previews/redesign-poster.jpg" },
  serviceIntegrations: { kind: "video", ratio: "16 / 9", label: "Integracijų pavyzdys", alt: "Pavyzdinis scenarijus: keturios sistemos susijungia, o gautas užsakymas pats užpildo lentelę ir sąskaitą, be perrašymo ranka", src: "/previews/integracijos.mp4", poster: "/previews/integracijos-poster.jpg" },
  serviceSeo: { kind: "video", ratio: "16 / 9", label: "SEO ir priežiūros pavyzdys", alt: "Pavyzdinis scenarijus: techninė svetainės patikra, smulkių trūkumų taisymas, stebėjimas ir kliento prašomi pakeitimai", src: "/previews/seo.mp4", poster: "/previews/seo-poster.jpg" },
  serviceGeo: { kind: "video", ratio: "16 / 9", label: "AI matomumo pavyzdys", alt: "Pavyzdinis scenarijus: klientas klausia AI asistento, patikrinama, ar verslas minimas ir kodėl, ir sudaromas darbų sąrašas", src: "/previews/geo.mp4", poster: "/previews/geo-poster.jpg" },
  serviceChatbot: { kind: "video", ratio: "16 / 9", label: "Pokalbių asistento pavyzdys", alt: "Pavyzdinis scenarijus: asistentas atsako į pasikartojančius klausimus, o ko nežino, perduoda žmogui", src: "/previews/chatbot.mp4", poster: "/previews/chatbot-poster.jpg" },
  serviceAnalytics: { kind: "video", ratio: "16 / 9", label: "Duomenų analitikos pavyzdys", alt: "Pavyzdinis scenarijus: duomenys iš parduotuvės, lentelės ir buhalterijos sujungiami į vieną ataskaitų skydelį", src: "/previews/analytics.mp4", poster: "/previews/analytics-poster.jpg" },
  serviceBots: { kind: "video", ratio: "16 / 9", label: "Botų pavyzdys", alt: "Pavyzdinis scenarijus: botas praneša apie užsakymą, siunčia santrauką, priima užsakymus ir pasitinka naujus narius", src: "/previews/bots.mp4", poster: "/previews/bots-poster.jpg" },
} satisfies Record<string, MediaItem>

export type MediaId = keyof typeof media
export const hasMedia = (id: MediaId) => Boolean((media[id] as MediaItem).src || (media[id] as MediaItem).embed) || showPlaceholders

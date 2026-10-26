// Photo and video slots. Fill `src` (a path under /public, e.g. "/img/team/studio.webp") to publish a real asset.
// Empty slots are visible during local development so missing media is easy to track.
// Production builds hide them unless VITE_SHOW_PLACEHOLDERS=1; use 0 to hide locally.
// `embed` points at a self-contained animated preview under /public/previews (loaded lazily in an iframe, client-side only).
export type MediaItem = { kind: "photo" | "video"; ratio: string; label: string; alt: string; src?: string; poster?: string; embed?: string; brief?: { purpose: string; shows: string; prepare: string; format: string } }

const flag = (import.meta as ImportMeta & { env: Record<string, string | boolean | undefined> }).env
export const showPlaceholders = flag.VITE_SHOW_PLACEHOLDERS === "1" || (flag.DEV === true && flag.VITE_SHOW_PLACEHOLDERS !== "0")

export const media = {
  heroVideo: {
    kind: "video", ratio: "16 / 10", label: "Trumpa sukurtos svetainės peržiūra", alt: "Jūsų kurtos svetainės peržiūra",
    brief: {
      purpose: "Pirmajame ekrane iškart parodyti, ką kuriame. Lankytojas turėtų pamatyti veikiančią svetainę ir suprasti, kokio rezultato gali tikėtis, dar prieš skaitydamas apie paslaugas.",
      shows: "Vieną tikrą GraspIT kurtą svetainę: pirmą ekraną, sklandų slinkimą iki paslaugų ir kontaktų, tada trumpą vaizdą telefone. Rodysime puslapio struktūrą, teksto aiškumą ir patogų naudojimą.",
      prepare: "Pasirinkti užbaigtą projektą, kurį galime viešai rodyti, ir įrašyti jo ekraną kompiuteryje bei telefone. Be naršyklės juostų, pranešimų ar asmeninių duomenų. Svetimų darbų nepristatyti kaip savų.",
      format: "10–15 s · be garso · 16:10 · MP4 arba WebM · su viršelio kadru. Jei animacija išjungta, paliekamas aiškus statiškas vaizdas.",
    },
  },
  homeNew: {
    kind: "photo", ratio: "16 / 10", label: "Nauja svetainė kompiuteryje ir telefone", alt: "Nauja svetainė telefone ir kompiuteryje",
    brief: {
      purpose: "Prie naujos svetainės paslaugos parodyti konkretų rezultatą: vientisą verslo pristatymą, kuris patogiai veikia ir dideliame, ir mažame ekrane.",
      shows: "Tos pačios mūsų kurtos svetainės kompiuterinę ir mobilią versijas viename vaizde. Turi matytis pagrindinė antraštė, paslaugos ir aiškus susisiekimo mygtukas, o ne vien įrenginių korpusai.",
      prepare: "Padaryti ryškius užbaigto projekto ekrano kadrus abiem dydžiais ir sudėti juos į paprastą kompoziciją. Naudoti tikrą turinį, išlaikyti svetainės spalvas ir pakankamą mastelį, kad būtų įžiūrimas dizainas.",
      format: "16:10 · WebP · rekomenduojamas plotis bent 1600 px · panaši kompozicija kaip gretimame atnaujinimo pavyzdyje.",
    },
  },
  homeRedesign: {
    kind: "photo", ratio: "16 / 10", label: "Svetainės palyginimas prieš ir po atnaujinimo", alt: "Svetainė prieš ir po atnaujinimo",
    brief: {
      purpose: "Paaiškinti, ką keičia svetainės atnaujinimas. Lankytojas turėtų iškart pastebėti aiškesnį turinį, tvarkingesnį išdėstymą ir lengviau randamą kelią iki kontakto.",
      shows: "Tos pačios svetainės tą pačią dalį prieš ir po atnaujinimo, vienodu masteliu, su žymomis „Prieš“ ir „Po“. Palyginimas turi rodyti konkrečius skirtumus, o ne du nesusijusius dizainus. Tai gali būti ir WordPress, ir kita svetainė.",
      prepare: "Surinkti ankstesnės ir atnaujintos versijos ekrano kadrus, kuriuos leidžiama rodyti. Jei tikro palyginimo neturime, paruošti aiškiai pažymėtą demonstracinį pavyzdį ir nepriskirti jam kliento ar išgalvotų rezultatų.",
      format: "16:10 · WebP · rekomenduojamas plotis bent 1600 px · abu kadrai vienodomis sąlygomis, su įskaitomomis palyginimo žymomis.",
    },
  },
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

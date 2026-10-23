const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env
const email = (env.VITE_CONTACT_EMAIL ?? "").trim()
const phone = (env.VITE_CONTACT_PHONE ?? "").trim()
export const contact = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "",
  phone: /^\+?[\d ()-]{7,}$/.test(phone) ? phone : "",
}
// Until a real number is configured the contact page shows a clearly labelled example number, still wired as a tap-to-call link.
export const phoneLabel = contact.phone || "+370 000 00000"
export const phoneHref = `tel:${phoneLabel.replace(/[\s()-]/g, "")}`
// One calm primary action everywhere. Wording invites a conversation; it makes no promise beyond what the FAQ and process pages already state.
export const siteCopy = {
  cta: "Aptarkime jūsų projektą",
  ctaShort: "Aptarkime projektą",
  call: "Paskambinkite",
  write: "Arba parašykite",
  note: "Pirmas pokalbis nemokamas. Fiksuotą pasiūlymą atsiųsime per 24 val. po jo.",
}

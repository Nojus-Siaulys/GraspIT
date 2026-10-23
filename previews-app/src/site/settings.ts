const env = (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env
const email = (env.VITE_CONTACT_EMAIL ?? "").trim()
const phone = (env.VITE_CONTACT_PHONE ?? "").trim()
export const contact = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "",
  phone: /^\+?[\d ()-]{7,}$/.test(phone) ? phone : "",
}
export const siteCopy = { cta: "Gauti pasiūlymą" }

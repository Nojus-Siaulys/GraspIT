import { useEffect, useSyncExternalStore } from "react"

const key = "graspit-slapukai"
const changed = "graspit-slapukai-changed"

const subscribe = (notify: () => void) => {
  window.addEventListener(changed, notify)
  window.addEventListener("storage", notify)
  return () => { window.removeEventListener(changed, notify); window.removeEventListener("storage", notify) }
}
const seen = () => { try { return localStorage.getItem(key) !== null } catch { return false } }

// Shown once on the first visit. The site sets no cookies, so this only informs; it asks for no choice.
// Acknowledging it is remembered in localStorage (documented on the cookie page). The server snapshot says "seen",
// so prerendered pages carry no notice and hydration matches.
export function CookieNotice({ path }: { path: string }) {
  const acknowledged = useSyncExternalStore(subscribe, seen, () => true)
  const visible = !acknowledged && path !== "/slapukai" && path !== "/privatumo-politika"
  useEffect(() => {
    document.documentElement.toggleAttribute("data-cookie-notice", visible)
    return () => document.documentElement.removeAttribute("data-cookie-notice")
  }, [visible])
  if (!visible) return null
  const accept = () => {
    try { localStorage.setItem(key, "1") } catch { /* storage blocked: the notice shows again next visit */ }
    window.dispatchEvent(new Event(changed))
  }
  return <section aria-label="Slapukų pranešimas" className="cookie-notice fixed inset-x-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-40 rounded-lg border border-foreground bg-background p-4 shadow-[0_18px_40px_-20px_rgb(16_55_43/.5)] md:inset-x-auto md:bottom-6 md:left-6 md:w-[26rem] md:p-5">
    <p className="font-semibold">Slapukai</p>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Ši svetainė nenaudoja slapukų, statistikos ar reklamos įrankių. Naršyklėje išsaugome tik tai, ko reikia jūsų pradėtai užklausai.</p>
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      <button type="button" onClick={accept} className="inline-flex min-h-11 items-center rounded-md bg-foreground px-6 font-semibold" style={{ color: "var(--background)" }}>Gerai</button>
      <a href="/slapukai/" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Plačiau</a>
    </div>
  </section>
}

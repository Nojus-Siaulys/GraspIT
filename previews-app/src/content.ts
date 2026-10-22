// Placeholder copy only. It exists to judge layout, rhythm and hierarchy.
// The real studio copy is written later (the old site's text was single-person).
export const c = {
  brand: "Studio",
  nav: ["Services", "Work", "Process", "Pricing", "Team", "FAQ"],
  cta: "Primary action",
  eyebrow: "Eyebrow label",
  title: "Headline that says what the studio does and for whom.",
  sub: "One or two supporting sentences go here. Placeholder text, used only to judge layout and rhythm.",
  cta1: "Primary action",
  cta2: "Secondary action",
  micro: "Reassurance line goes here",
  from: "from",
  days: "00 days",
  price: "€000",
  photo: "Photo",
  trustTitle: "Trust points",
  trust: [
    { t: "Trust point one", d: "Short supporting line." },
    { t: "Trust point two", d: "Short supporting line." },
    { t: "Trust point three", d: "Short supporting line." },
    { t: "Trust point four", d: "Short supporting line." },
  ],
  servicesTitle: "Services",
  servicesSub: "Section intro goes here.",
  services: [
    { t: "Service one", d: "Short description of the service goes here.", p: "from €000" },
    { t: "Service two", d: "Short description of the service goes here.", p: "from €000" },
    { t: "Service three", d: "Short description of the service goes here.", p: "from €000" },
  ],
  closeTitle: "Closing headline that asks for the next step",
  closeSub: "One supporting sentence about what happens after sending.",
  emailPh: "email@example.com",
  send: "Send",
  stats: [
    { n: "00+", l: "Stat label" },
    { n: "000", l: "Stat label" },
    { n: "00 h", l: "Stat label" },
    { n: "00 %", l: "Stat label" },
  ],
  workTitle: "Work",
  workSub: "Section intro goes here.",
  work: [
    { t: "Project name", k: "Website" },
    { t: "Project name", k: "Online shop" },
    { t: "Project name", k: "Website" },
  ],
  whyTitle: "Heading about why the studio, not a template",
  whyCols: ["Without", "With the studio"],
  why: [
    ["Pain point one", "Benefit one"],
    ["Pain point two", "Benefit two"],
    ["Pain point three", "Benefit three"],
    ["Pain point four", "Benefit four"],
  ],
  teamTitle: "Team",
  people: [
    { n: "Name Surname", r: "Role" },
    { n: "Name Surname", r: "Role" },
  ],
  quotes: [
    { q: "Client quote goes here. One or two sentences about the result.", n: "Name Surname", o: "Company" },
    { q: "Client quote goes here. One or two sentences about the result.", n: "Name Surname", o: "Company" },
    { q: "Client quote goes here. One or two sentences about the result.", n: "Name Surname", o: "Company" },
  ],
  phone: "+000 000 00000",
  email: "hello@example.com",
  online: "We reply within 00 hours",
  footer: { rights: "© Studio", note: "Legal details go here", privacy: "Privacy", terms: "Terms" },
}

// Stock photos supplied by the owner, used as placeholders only (licence to be checked before launch).
const base = import.meta.env.BASE_URL
export const img = {
  hero: `${base}img/handshake.webp`,
  team: `${base}img/team.png`,
  sites: `${base}img/websites.jpg`,
  trust: `${base}img/trust.jpg`,
  logo: `${base}img/logo.png`,
}

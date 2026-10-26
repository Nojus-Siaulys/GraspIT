export const caseStudies = [
  {
    slug: "colorlisse", name: "Colorlisse", type: "El. parduotuvė", image: "/img/projects/colorlisse.webp", url: "https://colorlisse.lt/",
    summary: "Profesionalios kirpėjų folijos pristatymas ir užsakymas internetu.",
    goal: "Padėti kirpėjui suprasti produktą, įvertinti jo savybes ir pereiti prie užsakymo vienoje svetainėje.",
    scope: ["Produkto ir jo savybių pristatymas", "Prekių pasirinkimas ir užsakymo kelias", "Parduotuvės bei klientų paskyrų struktūra"],
    decisions: [
      { title: "Pirmiausia — pats produktas", text: "Pristatymas sukasi apie kirpėjų foliją ir jos naudojimą. Aiški produkto informacija padeda žmogui įvertinti, ar tai tinka jo darbui." },
      { title: "Nuo susidomėjimo iki užsakymo", text: "Prekės pristatymas ir pirkimo veiksmai yra to paties kelio dalys. Žmogui nereikia ieškoti, kur pradėti užsakymą." },
      { title: "Daugiau nei vitrininis puslapis", text: "Projekte numatyta užsakymų, klientų ir prekių administravimo dalis. Vieša svetainė ir vidiniai procesai projektuojami kaip viena sistema." },
    ],
    takeaway: "El. parduotuvėje dizainas turi padėti pasirinkti. Vien gražaus pirmo ekrano neužtenka — svarbi informacija ir tolesnis pirkimo kelias.",
    service: "El. parduotuvė",
  },
  {
    slug: "kalvita", name: "Kalvita", type: "Paslaugų svetainė", image: "/img/projects/kalvita.webp", url: "https://kalvita.lt/",
    summary: "Kalvystės paslaugos, atliktų darbų pristatymas ir kelias iki susisiekimo.",
    goal: "Vienoje vietoje pristatyti kalvystės paslaugas, parodyti darbų pobūdį ir padėti lankytojui pradėti pokalbį apie savo sumanymą.",
    scope: ["Kalvystės paslaugų pristatymas", "Atliktų darbų galerija", "Kontaktų ir užklausos kelias"],
    decisions: [
      { title: "Darbus reikia pamatyti", text: "Kalvystės paslaugą lengviau įvertinti per atliktus darbus. Galerija suteikia konkretų kontekstą tam, ką žmogus perskaito apie paslaugas." },
      { title: "Paslauga turi būti suprantama", text: "Paslaugų pristatymas padeda susieti meistrų darbus su paties lankytojo poreikiu, o ne palieka jį vien su nuotraukų rinkiniu." },
      { title: "Kitas žingsnis — pokalbis", text: "Individualiam darbui svarbi užklausa ir poreikio aptarimas. Todėl kontaktai yra natūrali paslaugų bei darbų peržiūros tąsa." },
    ],
    takeaway: "Paslaugų verslo svetainėje atlikti darbai yra pokalbio pradžia. Lankytojui reikia suprasti ne tik ką mato, bet ir kaip aptarti panašų savo projektą.",
    service: "Svetainė",
  },
] as const

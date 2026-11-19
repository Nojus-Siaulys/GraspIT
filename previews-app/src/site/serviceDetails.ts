import { allFaq } from "./content"
import { prices, pricingPackages } from "./pricing"

export type ServiceKind = "websites" | "shop" | "redesign" | "ai" | "apps" | "seo"

export type Detail = {
  id: string
  service: string
  fit: { eyebrow: string; heading: string; items: { title: string; text: string; example: string }[] }
  included: { items: string[]; note: string }
  faq: { heading: string; items: { q: string; a: string }[] }
  questions: { label: string; line: string; placeholder?: string; options?: string[]; long?: boolean }[]
}

// Answers already written on the FAQ page are reused, so a price or term is stated in one place only.
const fromFaq = (...questions: string[]) => questions.map(q => allFaq.find(item => item.q === q)!)

export const details: Record<ServiceKind, Detail> = {
  websites: {
    id: "websites",
    service: "Svetainė",
    fit: { eyebrow: "Kam tinka", heading: "Kai klientai jūsų neranda arba nesupranta pasiūlymo.", items: [
      { title: "Informacija išbarstyta", text: "Paslaugos, kainos ir kontaktai gyvena socialiniuose tinkluose ar žinutėse, o klientas turi jų ieškoti.", example: "Pavyzdys: meistras, specialistas, paslaugų įmonė." },
      { title: "Norite būti randami paieškoje", text: "Aiški struktūra, antraštės ir aprašymai padeda paieškos sistemoms suprasti puslapį.", example: "Techninis paruošimas savaime pozicijų negarantuoja." },
      { title: "Reikia vietos darbams parodyti", text: "Darbų galerija su trumpu kontekstu padeda žmogui įvertinti, ką galite padaryti.", example: "Pavyzdys: Kalvitos paslaugų svetainė." },
    ] },
    included: { note: `Kaina nuo ${prices.website}. Domenas, talpinimas, tekstų rengimas ir mokamos integracijos aptariami atskirai.`, items: pricingPackages[0].features },
    faq: { heading: "Apie svetainės kūrimą.", items: fromFaq("Kiek laiko trunka sukurti svetainę?", "Ką reikia paruošti prieš svetainės kūrimą?", "Ar galėsiu matyti svetainę dar prieš paleidimą?") },
    questions: [
      { label: "Kuo užsiimate?", line: "Mano veikla:", long: true, placeholder: "Pvz., teikiu santechnikos paslaugas Kauno rajone" },
      { label: "Ar jau turite svetainę?", line: "Dabartinė svetainė:", options: ["Neturiu", "Turiu, bet norėčiau naują", "Turiu tik domeną"] },
      { label: "Kada norėtumėte paleisti?", line: "Norimas laikas:", options: ["Kuo greičiau", "Per mėnesį", "Per kelis mėnesius", "Nežinau"] },
    ],
  },
  shop: {
    id: "shop",
    service: "El. parduotuvė",
    fit: { eyebrow: "Kam tinka", heading: "Kai norite prekiauti internetu be žinučių maratonų.", items: [
      { title: "Prekes užsako žinutėmis", text: "Prekės, pasirinkimai ir užsakymo kelias vienoje vietoje, kad pirkėjui nereikėtų klausinėti.", example: "Pavyzdys: nedidelis prekių ženklas ar specializuotas katalogas." },
      { title: "Norite patys tvarkyti prekes", text: "Iš anksto sutariame, ką redaguosite savarankiškai. Valdymo funkcijas įvardijame pasiūlyme.", example: "Pavyzdys: prekių aprašymai, nuotraukos, atsargos." },
      { title: "Reikia mokėjimų ir pristatymo", text: "Mokėjimo ir pristatymo būdus aptariame planuodami. Jų operatorių mokesčiai vertinami atskirai.", example: "Pavyzdys: Colorlisse el. parduotuvė." },
    ] },
    included: { note: `Kaina nuo ${prices.shop}. Tiksli suma priklauso nuo katalogo, prekių variantų, mokėjimo ir pristatymo būdų bei integracijų.`, items: pricingPackages[1].features },
    faq: { heading: "Apie el. parduotuvę.", items: fromFaq("Kiek kainuoja sukurti el. parduotuvę?", "Ar galima prijungti mokėjimus ir pristatymą?", "Ar galėsiu pats keisti svetainės turinį?") },
    questions: [
      { label: "Ką parduodate?", line: "Ką parduodu:", long: true, placeholder: "Pvz., rankų darbo žvakės ir dovanų rinkiniai" },
      { label: "Kiek prekių maždaug turite?", line: "Prekių kiekis:", options: ["Iki 20", "20–100", "Daugiau nei 100", "Nežinau"] },
      { label: "Kaip priimate užsakymus dabar?", line: "Kaip priimu užsakymus dabar:", placeholder: "Pvz., per Instagram žinutes" },
    ],
  },
  redesign: {
    id: "redesign",
    service: "Svetainės atnaujinimas",
    fit: { eyebrow: "Kam tinka", heading: "Kai svetainė jau yra, bet nebeatspindi jūsų verslo.", items: [
      { title: "Dizainas atrodo pasenęs", text: "Aiškiau pristatome paslaugas ir sutvarkome navigaciją, išlaikydami tai, kas veikia.", example: "Pirmiausia įvertiname, ką verta palikti." },
      { title: "Telefone nepatogu", text: "Pritaikome tekstą, mygtukus ir išdėstymą mažam ekranui.", example: "Prieš paleidimą tikriname skirtingo pločio ekranuose." },
      { title: "WordPress svetainė netenkina", text: "Aptariame, ką keisti dabartinėje svetainėje ir kaip perkelti reikalingą turinį.", example: "Planuojame ir senų adresų peradresavimus." },
    ] },
    included: { note: "Kaina pagal apimtį: ją suderiname įvertinę dabartinę svetainę.", items: [
      "Dabartinės svetainės struktūros, turinio ir techninės būklės įvertinimas",
      "Aptarimas, ką išlaikyti ir ką perkurti",
      "Reikalingo turinio perkėlimas",
      "Senų puslapių peradresavimų planas",
      "Pritaikymas telefonams ir planšetėms",
    ] },
    faq: { heading: "Apie svetainės atnaujinimą.", items: fromFaq("Ar galite atnaujinti esamą svetainę?", "Ar galėsiu matyti svetainę dar prieš paleidimą?", "Kokia pagalba teikiama po paleidimo?") },
    questions: [
      { label: "Dabartinės svetainės adresas", line: "Dabartinė svetainė:", placeholder: "https://" },
      { label: "Kas jus labiausiai netenkina?", line: "Kas netenkina:", long: true, placeholder: "Pvz., atrodo pasenusi ir telefone nepatogu" },
      { label: "Ant ko ji sukurta?", line: "Platforma:", options: ["WordPress", "Kita platforma", "Nežinau"] },
    ],
  },
  ai: {
    id: "ai",
    service: "AI automatizacija",
    fit: { eyebrow: "Kam tinka", heading: "Kai tas pats darbas kartojasi kiekvieną dieną.", items: [
      { title: "Tie patys laiškai", text: "Klientai klausia to paties, o atsakymus tenka ruošti rankiniu būdu.", example: "Pavyzdys: kainų užklausos, užsakymo būsena." },
      { title: "Rankiniu būdu perkeliami duomenys", text: "Informacija iš laiško ar formos kopijuojama į kitą sistemą ar lentelę.", example: "Pavyzdys: užklausos iš pašto į užsakymų lentelę." },
      { title: "Žingsniai, kuriuos lengva pamiršti", text: "Priminimai, patvirtinimai ir tolesni veiksmai, kurie priklauso nuo žmogaus atminties.", example: "Pavyzdys: atsakymas klientui po savaitės." },
    ] },
    included: { note: "Kainos čia nerodome: kiekvienas procesas skirtingas, todėl kainą sutariame po pokalbio. Paslaugų tiekėjų mokesčiai vertinami atskirai.", items: [
      "Dabartinio proceso ir naudojamų priemonių aptarimas",
      "Viena aiški pirmoji užduotis, nuo kurios pradedame",
      "Sutartas būdas, kaip tikrinsime rezultatą",
      "Aiškiai nustatyta, kur sprendimą patvirtina žmogus",
      "Iš anksto sutarta, kokie duomenys naudojami",
    ] },
    faq: { heading: "Apie automatizaciją.", items: [
      { q: "Ar AI atsakys klientams be žmogaus?", a: "Tik ten, kur tai sutariame. Kiekvienai užduočiai nusprendžiame, kur sprendimą patvirtina žmogus." },
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo proceso apimties. Ją sutariame po pokalbio, prieš pradėdami darbą." },
      { q: "Ką daryti su slaptais duomenimis?", a: "Slaptažodžių ir slaptų duomenų per svetainės formą nesiųskite. Kokie duomenys naudojami, sutariame iš anksto." },
    ] },
    questions: [
      { label: "Kokį procesą norite automatizuoti?", line: "Procesas, kurį norėčiau automatizuoti:", long: true, placeholder: "Pvz., atsakymai į kainų užklausas laiškais" },
      { label: "Kiek laiko jis užima per savaitę?", line: "Kiek laiko jis užima per savaitę:", options: ["Iki 2 val.", "2–5 val.", "5–10 val.", "Daugiau nei 10 val.", "Nežinau"] },
      { label: "Kokiomis priemonėmis naudojatės?", line: "Kokiomis priemonėmis naudojuosi:", placeholder: "Pvz., Gmail, Excel, parduotuvės sistema" },
    ],
  },
  apps: {
    id: "apps",
    service: "Programa",
    fit: { eyebrow: "Kam tinka", heading: "Kai Excel ir laiškai nebeužtenka.", items: [
      { title: "Informacija išbarstyta", text: "Užsakymai ir užklausos gyvena laiškuose, lentelėse ir užrašuose, o bendros apžvalgos niekas neturi.", example: "Pavyzdys: užsakymų valdymas vienoje vietoje." },
      { title: "Klientai nuolat klausia, kas vyksta", text: "Klientas pats mato užsakymo ar paslaugos būseną, o jums nereikia atsakinėti.", example: "Pavyzdys: klientų portalas." },
      { title: "Ataskaitos renkamos ranka", text: "Skaičiai iš kelių vietų sudedami rankiniu būdu kiekvieną savaitę.", example: "Pavyzdys: savaitės ataskaita be skaičiavimo." },
    ] },
    included: { note: "Kainos čia nerodome: programos būna labai skirtingos, todėl kainą sutariame po pokalbio, kai aiški apimtis.", items: [
      "Pokalbis apie dabartinį darbą ir tai, ko programai reikia",
      "Aiški apimtis: kas bus pirmoje versijoje, o kas vėliau",
      "Matomas rezultatas jau kūrimo metu",
      "Sutarta, kas turi prieigą ir kokie duomenys saugomi",
    ] },
    faq: { heading: "Apie programas.", items: [
      { q: "Nuo ko pradedama?", a: "Nuo pokalbio. Aptariame, ką šiandien darote rankiniu būdu ir kas svarbiausia pirmai versijai." },
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo apimties. Ją sutariame po pokalbio, prieš pradėdami darbą." },
      { q: "Ar galėsiu ką nors pridėti vėliau?", a: "Pirmajai versijai pasirenkame svarbiausią dalį, o kitus norus aptariame atskirai." },
    ] },
    questions: [
      { label: "Ką programa turėtų daryti?", line: "Ką programa turėtų daryti:", long: true, placeholder: "Pvz., rodyti užsakymus ir jų būsenas vienoje vietoje" },
      { label: "Kiek žmonių ja naudosis?", line: "Kiek žmonių ja naudosis:", options: ["1–2", "3–10", "11–50", "Daugiau nei 50", "Nežinau"] },
      { label: "Kaip tai darote dabar?", line: "Kaip tai darau dabar:", placeholder: "Pvz., Excel lentelė ir laiškai" },
    ],
  },
  seo: {
    id: "seo",
    service: "SEO ir priežiūra",
    fit: { eyebrow: "Kam tinka", heading: "Kai svetainė paleista, bet niekas jos neprižiūri.", items: [
      { title: "Užklausų mažai, o priežasties nežinote", text: "Patikriname indeksavimą, adresus, antraštes ir aprašymus, kad matytumėte, ką galima pagerinti.", example: "Pozicijų neprižadame: jas lemia ir konkurencija." },
      { title: "Informacija pasensta", text: "Kainos, kontaktai ir paslaugų aprašymai laikui bėgant keičiasi. Sutariame, kas juos atnaujina.", example: "Pavyzdys: pasikeitė darbo laikas ar kontaktai." },
      { title: "Nėra kam atlikti smulkių pakeitimų", text: "Smulkūs pakeitimai, atnaujinimai ir talpinimas tvarkomi pagal sutartą planą.", example: "Plano apimtį ir trečiųjų šalių išlaidas įvardijame iš anksto." },
    ] },
    included: { note: "Vienos mėnesinės kainos neskelbiame: kainą pateikiame pagal reikalingus darbus.", items: [
      "Svetainės techninės būklės patikra",
      "Indeksavimo ir paieškos užklausų stebėjimas",
      "Pasenusios informacijos atnaujinimas",
      "Smulkūs pakeitimai pagal sutartą planą",
      "Aiškiai įvardyti darbai ir trečiųjų šalių išlaidos",
    ] },
    faq: { heading: "Apie SEO ir priežiūrą.", items: fromFaq("Ar svetainei reikia nuolatinio SEO?", "Kiek kainuoja svetainės priežiūra?", "Ar garantuojate pirmą vietą Google?") },
    questions: [
      { label: "Svetainės adresas", line: "Svetainė:", placeholder: "https://" },
      { label: "Kas šiuo metu kelia rūpestį?", line: "Kas kelia rūpestį:", long: true, placeholder: "Pvz., mažai užklausų arba reikia nuolat keisti turinį" },
      { label: "Ar svetainę kūrėte pas mus?", line: "Svetainės kūrėjas:", options: ["Taip", "Ne", "Nežinau"] },
    ],
  },
}

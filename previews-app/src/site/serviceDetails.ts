import { allFaq } from "./content"
import { prices, pricingPackages } from "./pricing"

export type ServiceKind = "websites" | "shop" | "redesign" | "ai" | "apps" | "seo" | "motion" | "ads3d" | "social" | "integrations" | "geo" | "chatbot" | "analytics" | "bots"

export type Detail = {
  id: string
  service: string
  // "Ką gausite" rows in plain words: what is delivered, what the client does, how long, what the price leaves out.
  gets: [label: string, text: string][]
  packages?: { name: string; price: string; text: string }[]
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
    gets: [["Ką gaunate", "Svetainę iki 4 puslapių, pritaikytą telefonui ir planšetei, ir visą jos kodą bei turinį."],["Ką darote jūs", "Atsiunčiate tekstus, nuotraukas ir pastabas, kai rodome peržiūrą."],["Kiek užtrunka", "Pradinį sprendimą paruošiame per 7 dienas, kai turime reikalingą turinį."],["Ko kainoje nėra", "Domeno, talpinimo, tekstų rašymo ir mokamų integracijų: jos skaičiuojamos atskirai."]],
    fit: { eyebrow: "Kam tinka", heading: "„Mūsų niekas neranda, o radęs nesupranta, ką darome.“", items: [
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
    gets: [["Ką gaunate", "Parduotuvę su prekių katalogu, krepšeliu ir užsakymo keliu, kurią galėsite patys papildyti."],["Ką darote jūs", "Pateikiate prekes, nuotraukas ir sakote, kaip norite priimti mokėjimus bei pristatyti."],["Kiek užtrunka", "Orientacinis terminas – 14 dienų."],["Ko kainoje nėra", "Mokėjimo ir pristatymo operatorių mokesčių bei papildomų integracijų: jos vertinamos atskirai."]],
    fit: { eyebrow: "Kam tinka", heading: "„Užsakymus renkame žinutėmis.“", items: [
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
    gets: [["Ką gaunate", "Naują esamos svetainės dizainą ir struktūrą, perkeltą reikalingą turinį ir senų adresų nukreipimus."],["Ką darote jūs", "Duodate dabartinės svetainės adresą ir pasakote, kas netenkina."],["Kiek užtrunka", "Terminą pasakome, kai įvertiname dabartinę svetainę."]],
    fit: { eyebrow: "Kam tinka", heading: "„Svetainė yra, bet jau nebeatspindi, ką darome.“", items: [
      { title: "Dizainas atrodo pasenęs", text: "Aiškiau pristatome paslaugas ir sutvarkome navigaciją, išlaikydami tai, kas veikia.", example: "Pirmiausia įvertiname, ką verta palikti." },
      { title: "Telefone nepatogu", text: "Pritaikome tekstą, mygtukus ir išdėstymą mažam ekranui.", example: "Prieš paleidimą tikriname skirtingo pločio ekranuose." },
      { title: "WordPress svetainė netenkina", text: "Aptariame, ką keisti dabartinėje svetainėje ir kaip perkelti reikalingą turinį.", example: "Planuojame ir senų adresų peradresavimus." },
    ] },
    included: { note: "Kaina pagal apimtį: ją suderiname įvertinę dabartinę svetainę.", items: [
      "Pažiūrime, kas veikia dabartinėje svetainėje: struktūra, turinys, techninė būklė",
      "Kartu nusprendžiame, ką palikti, o ką perkurti",
      "Perkeliame reikalingą turinį",
      "Suplanuojame senų puslapių nukreipimus",
      "Pritaikome telefonams ir planšetėms",
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
    gets: [["Ką gaunate", "Vieną veikiantį procesą ir sutartą būdą, kaip tikrinsime rezultatą."],["Ką darote jūs", "Papasakojate, kaip darbas vyksta dabar, ir patvirtinate, kur sprendimą priima žmogus."],["Ko kainoje nėra", "Paslaugų tiekėjų mokesčių: jie vertinami atskirai."]],
    fit: { eyebrow: "Kam tinka", heading: "„Tą patį darbą darome kiekvieną dieną.“", items: [
      { title: "Tie patys laiškai", text: "Klientai klausia to paties, o atsakymus tenka ruošti rankiniu būdu.", example: "Pavyzdys: kainų užklausos, užsakymo būsena." },
      { title: "Rankiniu būdu perkeliami duomenys", text: "Informacija iš laiško ar formos kopijuojama į kitą sistemą ar lentelę.", example: "Pavyzdys: užklausos iš pašto į užsakymų lentelę." },
      { title: "Žingsniai, kuriuos lengva pamiršti", text: "Priminimai, patvirtinimai ir tolesni veiksmai, kurie priklauso nuo žmogaus atminties.", example: "Pavyzdys: atsakymas klientui po savaitės." },
    ] },
    included: { note: "Kainos čia nerodome: kiekvienas procesas skirtingas, todėl kainą sutariame po pokalbio. Paslaugų tiekėjų mokesčiai vertinami atskirai.", items: [
      "Aptariame, kaip darbas vyksta dabar ir kokiomis priemonėmis naudojatės",
      "Pradedame nuo vienos užduoties",
      "Sutariame, kaip tikrinsime rezultatą",
      "Nustatome, kur sprendimą patvirtina žmogus",
      "Iš anksto susitariame, kokie duomenys naudojami",
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
    gets: [["Ką gaunate", "Pirmą veikiančią versiją su tuo, ką sutarėme pirmai daliai. Kitus norus aptariame atskirai."],["Ką darote jūs", "Žiūrite rezultatą kūrimo metu ir sakote, kas netinka."],["Kiek užtrunka", "Terminą pasakome, kai aiški pirmos versijos apimtis."]],
    fit: { eyebrow: "Kam tinka", heading: "„Mums nebeužtenka Excel ir laiškų.“", items: [
      { title: "Informacija išbarstyta", text: "Užsakymai ir užklausos gyvena laiškuose, lentelėse ir užrašuose, o bendros apžvalgos niekas neturi.", example: "Pavyzdys: užsakymų valdymas vienoje vietoje." },
      { title: "Klientai nuolat klausia, kas vyksta", text: "Klientas pats mato užsakymo ar paslaugos būseną, o jums nereikia atsakinėti.", example: "Pavyzdys: klientų portalas." },
      { title: "Ataskaitos renkamos ranka", text: "Skaičiai iš kelių vietų sudedami rankiniu būdu kiekvieną savaitę.", example: "Pavyzdys: savaitės ataskaita be skaičiavimo." },
    ] },
    included: { note: "Kainos čia nerodome: programos būna labai skirtingos, todėl kainą sutariame po pokalbio, kai aiški apimtis.", items: [
      "Pasikalbame apie dabartinį darbą ir tai, ko programai reikia",
      "Sutariame, kas bus pirmoje versijoje, o kas vėliau",
      "Rodome rezultatą jau kūrimo metu",
      "Sutariame, kas turi prieigą ir kokie duomenys saugomi",
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
    gets: [["Ką gaunate", "Techninės būklės patikrą ir sutartus atnaujinimus bei smulkius pakeitimus."],["Ką darote jūs", "Pasakote, kas svetainėje keičiasi, o ką atnaujinti turime mes."],["Ko kainoje nėra", "Pozicijų paieškoje negarantuojame. Trečiųjų šalių išlaidas įvardijame iš anksto."]],
    fit: { eyebrow: "Kam tinka", heading: "„Svetainę paleidome, bet niekas jos neprižiūri.“", items: [
      { title: "Užklausų mažai, o priežasties nežinote", text: "Patikriname indeksavimą, adresus, antraštes ir aprašymus, kad matytumėte, ką galima pagerinti.", example: "Pozicijų neprižadame: jas lemia ir konkurencija." },
      { title: "Informacija pasensta", text: "Kainos, kontaktai ir paslaugų aprašymai laikui bėgant keičiasi. Sutariame, kas juos atnaujina.", example: "Pavyzdys: pasikeitė darbo laikas ar kontaktai." },
      { title: "Nėra kam atlikti smulkių pakeitimų", text: "Smulkūs pakeitimai, atnaujinimai ir talpinimas tvarkomi pagal sutartą planą.", example: "Plano apimtį ir trečiųjų šalių išlaidas įvardijame iš anksto." },
    ] },
    included: { note: "Vienos mėnesinės kainos neskelbiame: kainą pateikiame pagal reikalingus darbus.", items: [
      "Patikriname svetainės techninę būklę",
      "Stebime indeksavimą ir paieškos užklausas",
      "Atnaujiname pasenusią informaciją",
      "Darome smulkius pakeitimus pagal sutartą planą",
      "Iš anksto užrašome darbus ir trečiųjų šalių išlaidas",
    ] },
    faq: { heading: "Apie SEO ir priežiūrą.", items: fromFaq("Ar svetainei reikia nuolatinio SEO?", "Kiek kainuoja svetainės priežiūra?", "Ar garantuojate pirmą vietą Google?") },
    questions: [
      { label: "Svetainės adresas", line: "Svetainė:", placeholder: "https://" },
      { label: "Kas šiuo metu kelia rūpestį?", line: "Kas kelia rūpestį:", long: true, placeholder: "Pvz., mažai užklausų arba reikia nuolat keisti turinį" },
      { label: "Ar svetainę kūrėte pas mus?", line: "Svetainės kūrėjas:", options: ["Taip", "Ne", "Nežinau"] },
    ],
  },
  integrations: {
    id: "integrations",
    service: "Integracijos",
    gets: [["Ką gaunate", "Sujungtas jūsų naudojamas sistemas, kad duomenų ir dokumentų nebereikėtų perrašyti ranka."], ["Ką darote jūs", "Pasakote, kokias sistemas naudojate ir kur duomenis tenka perrašyti ranka."], ["Ko kainoje nėra", "Paslaugų tiekėjų mokesčių: jie vertinami atskirai."]],
    fit: { eyebrow: "Kam tinka", heading: "„Tuos pačius duomenis perrašome kelis kartus.“", items: [
      { title: "Užsakymas iš laiško į lentelę", text: "Informacija iš laiško ar formos kopijuojama į kitą sistemą ar lentelę.", example: "Pavyzdys: užsakymas iš pašto į užsakymų lentelę." },
      { title: "Dokumentai pildomi ranka", text: "Dokumentas pildomas iš naujo, nors visi duomenys jau yra sistemoje.", example: "Pavyzdys: sąskaita pagal gautą užsakymą." },
      { title: "Duomenys nesutampa", text: "Kai duomenys gyvena keliose vietose, jie greitai nebesutampa.", example: "Pavyzdys: prekės likutis parduotuvėje ir lentelėje." },
    ] },
    included: { note: "Kainos čia nerodome: kiekviena sistemų grandinė skirtinga, todėl kainą sutariame po pokalbio. Paslaugų tiekėjų mokesčiai vertinami atskirai.", items: [
      "Aptariame, kokias sistemas naudojate ir kur duomenys perrašomi ranka",
      "Pradedame nuo vienos grandinės, pavyzdžiui, užsakymas, lentelė, sąskaita",
      "Sutariame, kokie duomenys kur keliauja ir kas juos mato",
      "Sutariame, kaip tikrinsime rezultatą",
    ] },
    faq: { heading: "Apie integracijas.", items: [
      { q: "Nuo ko pradedama?", a: "Nuo pokalbio apie sistemas, kuriomis jau naudojatės, ir vietas, kur duomenis perrašote ranka. Pradedame nuo vienos grandinės." },
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo sistemų ir grandinės apimties. Ją sutariame po pokalbio, prieš pradėdami darbą." },
      { q: "Ar reikės keisti sistemas, kuriomis naudojuosi?", a: "Kai įmanoma, jungiame tai, ką jau naudojate. Ar tai įmanoma jūsų atveju, išsiaiškiname pokalbyje." },
    ] },
    questions: [
      { label: "Kokias sistemas naudojate?", line: "Naudojamos sistemos:", placeholder: "Pvz., Gmail, Excel, parduotuvės sistema" },
      { label: "Kur duomenis perrašote ranka?", line: "Kur perrašau ranka:", long: true, placeholder: "Pvz., užsakymus iš laiškų į lentelę" },
      { label: "Kiek kartų per savaitę?", line: "Kiek kartų per savaitę:", options: ["Iki 10", "10–30", "Daugiau nei 30", "Nežinau"] },
    ],
  },
  motion: {
    id: "motion",
    service: "Judesio reklama",
    gets: [["Ką gaunate", "Vieną trumpą reklaminį video, apie 15–30 sekundžių, 9:16 formatu (TikTok, Reels), paruoštą skelbti."], ["Ką darote jūs", "Papasakojate apie produktą ar paslaugą ir atsiunčiate logotipą bei nuotraukas, jei jų turite."], ["Ko kainoje nėra", "Reklamos biudžeto, kurį mokate TikTok ar Meta. Rezultatų (peržiūrų, klientų) nežadame."]],
    fit: { eyebrow: "Kam tinka", heading: "„Norime, kad žmonės sustotų ir pažiūrėtų.“", items: [
      { title: "Reikia vieno aiškaus video", text: "Vieną žinutę pasakome per kelias sekundes: kas tai, kam skirta ir ką daryti toliau.", example: "Pavyzdys: nauja paslauga ar akcija." },
      { title: "Nuotraukų nepakanka", text: "Paprastas paveikslėlis lengvai praslysta, o judesys sulaiko žvilgsnį.", example: "Pavyzdys: prekių rinkinys, kuris turi pasirodyti ryškiai." },
      { title: "Neturite, kas sumontuotų", text: "Video sumontuojame mes, o jūs gaunate failą, kurį belieka paskelbti.", example: "Formatas – 9:16, tinka TikTok, Reels ir Facebook." },
    ] },
    included: { note: "Kaina aptariama po pokalbio: ji priklauso nuo video ilgio ir sudėtingumo.", items: [
      "Vienas trumpas reklaminis video, apie 15–30 sekundžių",
      "9:16 formatas, paruoštas TikTok, Reels ar Facebook",
      "Jūsų logotipas, spalvos ir sutartas tekstas",
      "Pasakome iš anksto, kiek pataisymų įskaičiuota",
    ] },
    faq: { heading: "Apie judesio reklamas.", items: [
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo video ilgio ir sudėtingumo. Ją sutariame po pokalbio, prieš pradėdami darbą." },
      { q: "Ar video atneš klientų?", a: "To negalime pažadėti: rezultatas priklauso ir nuo pasiūlymo, ir nuo to, kam rodoma reklama. Mūsų darbas – aiškus ir gerai atrodantis video." },
      { q: "Ar į kainą įeina reklamos apmokėjimas?", a: "Ne. Reklamos biudžetą mokate pats TikTok ar Meta pagal pasirinktą sumą." },
    ] },
    questions: [
      { label: "Ką reklamuosime?", line: "Ką reklamuoti:", long: true, placeholder: "Pvz., naują paslaugą arba produktą" },
      { label: "Kur skelbsite?", line: "Kur skelbsiu:", options: ["TikTok", "Instagram Reels", "Facebook", "Kelis iš šių", "Nežinau"] },
      { label: "Ar turite logotipą ir nuotraukų?", line: "Logotipas ir nuotraukos:", options: ["Taip", "Tik logotipą", "Neturiu", "Nežinau"] },
    ],
  },
  ads3d: {
    id: "ads3d",
    service: "3D reklama",
    gets: [["Ką gaunate", "Jūsų produkto 3D vaizdą arba trumpą video, sukurtą kompiuteriu."], ["Ką darote jūs", "Atsiunčiate produkto nuotraukas iš kelių pusių ir matmenis."], ["Ko kainoje nėra", "Reklamos biudžeto, kurį mokate TikTok ar Meta. Rezultatų nežadame."]],
    fit: { eyebrow: "Kam tinka", heading: "„Produktas turi atrodyti geriau nei nuotraukoje.“", items: [
      { title: "Produktas dar negaminamas", text: "Parodome, kaip jis atrodys, kol tikro dar nėra.", example: "Pavyzdys: naujas gaminys ar pakuotė." },
      { title: "Reikia ryškaus kadro", text: "Sukame, artiname ir rodome detales, kurių nuotraukoje nesimato.", example: "Pavyzdys: kokybės ar medžiagos detalė." },
      { title: "Norite vieno stiliaus visoms reklamoms", text: "Tas pats 3D vaizdas tinka ir video, ir paveikslėliams.", example: "Formatus aptariame prieš pradėdami." },
    ] },
    included: { note: "Kaina aptariama po pokalbio: ji priklauso nuo produkto sudėtingumo ir video ilgio.", items: [
      "Produkto 3D vaizdas pagal jūsų nuotraukas ir matmenis",
      "Trumpas video arba paveikslėliai reklamai",
      "Jūsų spalvos ir sutarta žinutė",
      "Iš anksto sutariame, kiek pataisymų įskaičiuota",
    ] },
    faq: { heading: "Apie 3D reklamas.", items: [
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo produkto sudėtingumo ir to, ką norite gauti. Ją sutariame po pokalbio, prieš pradėdami darbą." },
      { q: "Ar tai bus identiška tikram produktui?", a: "Stengiamės kuo tiksliau pagal jūsų nuotraukas ir matmenis. Prieš baigdami parodome rezultatą ir pasakome, ką dar galima patikslinti." },
      { q: "Ar į kainą įeina reklamos apmokėjimas?", a: "Ne. Reklamos biudžetą mokate pats TikTok ar Meta pagal pasirinktą sumą." },
    ] },
    questions: [
      { label: "Koks tai produktas?", line: "Produktas:", long: true, placeholder: "Pvz., rankų darbo žvakė stikliniame inde" },
      { label: "Ką norite gauti?", line: "Ką norėčiau gauti:", options: ["Trumpą video", "Paveikslėlius", "Ir video, ir paveikslėlius", "Nežinau"] },
      { label: "Ar turite nuotraukų ir matmenis?", line: "Nuotraukos ir matmenys:", options: ["Taip", "Tik nuotraukas", "Neturiu", "Nežinau"] },
    ],
  },
  social: {
    id: "social",
    service: "Socialinių tinklų paketas",
    gets: [["Ką gaunate", "4 trumpus video per savaitę, 9:16 formatu, skirtus TikTok, Reels ar Facebook."], ["Ką darote jūs", "Sutariame iš anksto, apie ką kuriame ir kas skelbia."], ["Ko kainoje nėra", "Reklamos biudžeto, kurį mokate TikTok ar Meta. Rezultatų (peržiūrų, klientų) nežadame."]],
    packages: [
      { name: "Paprastesni įrašai", price: "€200 per savaitę", text: "4 trumpi video per savaitę, paprastesnio montažo." },
      { name: "Sudėtingesni įrašai", price: "€300 per savaitę", text: "4 trumpi video per savaitę, daugiau judesio ir sudėtingesnių efektų." },
    ],
    fit: { eyebrow: "Kam tinka", heading: "„Norime skelbti kas savaitę, bet neturime kada kurti.“", items: [
      { title: "Socialiniai tinklai užmiršti", text: "Reguliarus skelbimas laiko jus matomus, kai neturite laiko kurti patys.", example: "Pavyzdys: kavinė, salonas, treniruočių klubas." },
      { title: "Reikia vienodo stiliaus", text: "Visi video atrodo kaip vieno prekės ženklo, ne atsitiktinai sumontuoti.", example: "Spalvas ir žinutę sutariame iš anksto." },
      { title: "Norite aiškios savaitės kainos", text: "Žinote, kiek mokate per savaitę ir ką už tai gaunate.", example: "Du paketai: €200 ir €300 per savaitę." },
    ] },
    included: { note: "Kaina per savaitę. Pasirenkate paprastesnius arba sudėtingesnius įrašus.", items: [
      "4 trumpi video per savaitę",
      "9:16 formatas, tinka TikTok, Reels ir Facebook",
      "Jūsų logotipas, spalvos ir sutarta žinutė",
      "Iš anksto sutariame, kas skelbia ir kiek pataisymų įskaičiuota",
    ] },
    faq: { heading: "Apie socialinių tinklų paketą.", items: [
      { q: "Kuo skiriasi du paketai?", a: "Abu apima 4 trumpus video per savaitę. €200 paketo įrašai paprastesni, €300 paketo – su daugiau judesio ir sudėtingesniais efektais." },
      { q: "Ar į kainą įeina reklamos apmokėjimas?", a: "Ne. Reklamos biudžetą mokate pats TikTok ar Meta pagal pasirinktą sumą." },
      { q: "Ar pažadate daugiau klientų?", a: "Ne. Rezultatas priklauso ir nuo pasiūlymo, ir nuo to, kam rodomas turinys. Mūsų darbas – reguliarūs, gerai atrodantys video." },
    ] },
    questions: [
      { label: "Kokį verslą reklamuosime?", line: "Verslas:", long: true, placeholder: "Pvz., plaukų salonas Kaune" },
      { label: "Kur skelbsite?", line: "Kur skelbsiu:", options: ["TikTok", "Instagram Reels", "Facebook", "Kelis iš šių", "Nežinau"] },
      { label: "Kuris paketas labiau tinka?", line: "Paketas:", options: ["Paprastesni įrašai (€200 per savaitę)", "Sudėtingesni įrašai (€300 per savaitę)", "Dar nežinau"] },
    ],
  },
  geo: {
    id: "geo",
    service: "AI matomumas",
    gets: [["Ką gaunate", "Ataskaitą, ar ChatGPT, Perplexity ir kiti AI asistentai mini jūsų verslą, kai pirkėjas klausia apie jūsų sritį, ir ką jie siūlo vietoj jūsų."], ["Ką darote jūs", "Pasakote, ką parduodate, kur dirbate ir kokius konkurentus žinote."], ["Ko kainoje nėra", "Pažado, kad AI jus rekomenduos. Atsakymus lemia ir kiti šaltiniai, kurių nekontroliuojame."]],
    fit: { eyebrow: "Kam tinka", heading: "„Klientai klausia ChatGPT, o mūsų jis nemini.“", items: [
      { title: "Nežinote, ką AI sako apie jus", text: "Užduodame AI asistentams tuos klausimus, kuriuos užduotų jūsų pirkėjas, ir užsirašome, kas paminimas.", example: "Pavyzdys: „kur Klaipėdoje užsisakyti roletus?“" },
      { title: "Vietoj jūsų minimi konkurentai", text: "Pažiūrime, iš kokių šaltinių AI ima informaciją apie konkurentus ir ko trūksta apie jus.", example: "Pavyzdys: katalogai, atsiliepimai, straipsniai." },
      { title: "Svetainė AI neperskaitoma", text: "Patikriname, ar AI robotai gali pasiekti svetainę ir ar joje aiškiai parašyta, ką darote, kur ir už kiek.", example: "Tikriname robots.txt, struktūrinius duomenis ir turinį." },
    ] },
    included: { note: "Kaina aptariama po pokalbio: ji priklauso nuo to, kiek klausimų ir AI asistentų tikriname.", items: [
      "Sudarome klausimų sąrašą, kurį užduotų jūsų pirkėjai",
      "Tikriname atsakymus keliuose AI asistentuose",
      "Užsirašome, kas paminimas vietoj jūsų ir kokie šaltiniai cituojami",
      "Patikriname, ar svetainė pasiekiama AI robotams",
      "Pateikiame darbų sąrašą: ką keisti svetainėje ir kitur",
    ] },
    faq: { heading: "Apie AI matomumą.", items: [
      { q: "Ar garantuojate, kad ChatGPT mus rekomenduos?", a: "Ne. AI atsakymus lemia daug šaltinių, kurių nekontroliuojame. Galime išmatuoti, kaip yra dabar, ir pasakyti, ką verta keisti." },
      { q: "Kuo tai skiriasi nuo SEO?", a: "SEO žiūri, kur esate Google paieškoje. Čia tikriname, ar AI asistentai jus mini savo atsakymuose ir kuo remiasi. Dalis darbų sutampa, pavyzdžiui, aiški svetainės struktūra." },
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo klausimų ir tikrinamų AI asistentų skaičiaus. Ją sutariame po pokalbio, prieš pradėdami darbą." },
    ] },
    questions: [
      { label: "Ką parduodate ir kur?", line: "Ką parduodu ir kur:", long: true, placeholder: "Pvz., montuojame roletus Klaipėdos apskrityje" },
      { label: "Svetainės adresas", line: "Svetainė:", placeholder: "https://" },
      { label: "Ar žinote pagrindinius konkurentus?", line: "Konkurentai:", placeholder: "Pvz., dvi įmonės, kurias klientai mini dažniausiai" },
    ],
  },
  chatbot: {
    id: "chatbot",
    service: "AI pokalbių asistentas",
    gets: [["Ką gaunate", "Pokalbių asistentą svetainėje arba Messenger'yje, kuris atsako į klientų klausimus pagal jūsų pateiktą informaciją."], ["Ką darote jūs", "Atsiunčiate kainas, paslaugų aprašymus ir dažniausius klausimus, o paskui peržiūrite asistento atsakymus."], ["Ko kainoje nėra", "AI paslaugų tiekėjų mokesčių už naudojimą: jie priklauso nuo pokalbių kiekio ir vertinami atskirai."]],
    fit: { eyebrow: "Kam tinka", heading: "„Į tuos pačius klausimus atsakome kelis kartus per dieną.“", items: [
      { title: "Tie patys klausimai", text: "Darbo laikas, kainos, pristatymas, ar turite prekę. Asistentas atsako iš karto, net vakare.", example: "Pavyzdys: „ar dirbate šeštadienį?“" },
      { title: "Klientas nelaukia atsakymo", text: "Jei atsakymas ateina rytoj, žmogus jau parašė kitiems. Asistentas atsako tuoj pat ir surenka kontaktą.", example: "Sudėtingesnį klausimą perduoda jums." },
      { title: "Atsakymai turi būti tikslūs", text: "Asistentas remiasi tik jūsų pateikta informacija. Ko nežino, to nesugalvoja, o pasiūlo susisiekti su jumis.", example: "Prieš paleidimą kartu patikriname atsakymus." },
    ] },
    included: { note: "Kaina aptariama po pokalbio: ji priklauso nuo to, kur asistentas veiks ir kiek informacijos jam reikia.", items: [
      "Surenkame informaciją, kuria remsis asistentas",
      "Sutariame, į ką jis atsako pats, o ką perduoda jums",
      "Įdiegiame svetainėje arba Messenger'yje",
      "Prieš paleidimą patikriname atsakymus su jūsų klausimais",
      "Paaiškiname, kaip atnaujinti informaciją",
    ] },
    faq: { heading: "Apie AI pokalbių asistentą.", items: [
      { q: "Ar asistentas gali pasakyti netiesą?", a: "Riziką mažiname: asistentas remiasi tik jūsų pateikta informacija, o ko nežino, pasiūlo susisiekti su jumis. Prieš paleidimą atsakymus patikriname kartu." },
      { q: "Ar matysiu, ką klientai klausia?", a: "Taip, jei taip sutariame. Pokalbių istorija padeda pamatyti, ko klientams trūksta svetainėje." },
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo apimties. Ją sutariame po pokalbio, prieš pradėdami darbą. AI tiekėjų mokesčiai už naudojimą skaičiuojami atskirai." },
    ] },
    questions: [
      { label: "Kokius klausimus klientai užduoda dažniausiai?", line: "Dažniausi klientų klausimai:", long: true, placeholder: "Pvz., kainos, darbo laikas, pristatymo terminai" },
      { label: "Kur asistentas turėtų veikti?", line: "Kur veiktų asistentas:", options: ["Svetainėje", "Messenger", "Abiejose vietose", "Nežinau"] },
      { label: "Kiek užklausų gaunate per savaitę?", line: "Užklausų per savaitę:", options: ["Iki 20", "20–100", "Daugiau nei 100", "Nežinau"] },
    ],
  },
  analytics: {
    id: "analytics",
    service: "Duomenų analitika",
    gets: [["Ką gaunate", "Ataskaitų skydelį (pvz., Power BI), kuriame pagrindiniai jūsų verslo skaičiai matomi vienoje vietoje ir atsinaujina patys."], ["Ką darote jūs", "Pasakote, kokius skaičius žiūrite dabar ir iš kur juos imate, ir suteikiate prieigą prie duomenų."], ["Ko kainoje nėra", "Programų licencijų, pavyzdžiui, Power BI Pro: jos priklauso nuo naudotojų skaičiaus ir vertinamos atskirai."]],
    fit: { eyebrow: "Kam tinka", heading: "„Ataskaitą kas savaitę dėliojame ranka.“", items: [
      { title: "Skaičiai keliose vietose", text: "Pardavimai parduotuvėje, išlaidos lentelėje, užsakymai buhalterijoje. Sujungiame juos į vieną vaizdą.", example: "Pavyzdys: pardavimai pagal prekę ir mėnesį." },
      { title: "Ataskaita užtrunka", text: "Tą pačią ataskaitą kas savaitę sudedate iš kelių failų. Skydelis ją parodo be rankinio darbo.", example: "Pavyzdys: savaitės pardavimų apžvalga." },
      { title: "Sunku pamatyti tendenciją", text: "Lentelėje matote skaičius, bet ne tai, kas keičiasi. Grafikai parodo, kas auga, o kas krenta.", example: "Pavyzdys: kurios prekės parduodamos vis prasčiau." },
    ] },
    included: { note: "Kaina aptariama po pokalbio: ji priklauso nuo duomenų šaltinių ir ataskaitų skaičiaus.", items: [
      "Aptariame, kokius sprendimus priimate pagal skaičius",
      "Sujungiame duomenis iš jūsų naudojamų sistemų ir lentelių",
      "Sukuriame skydelį su sutartais rodikliais",
      "Sutariame, kas mato kokius duomenis",
      "Paaiškiname, kaip skydeliu naudotis",
    ] },
    faq: { heading: "Apie duomenų analitiką.", items: [
      { q: "Kokias programas naudojate?", a: "Dažniausiai Power BI, nes jis jungiasi prie Excel ir daugelio verslo sistemų. Jei jau naudojate kitą įrankį, pirmiausia pažiūrime, ar galima dirbti su juo." },
      { q: "Ar mano duomenys turi būti tvarkingi?", a: "Nebūtinai. Dalį duomenų sutvarkymo įtraukiame į darbą. Kiek jo reikės, pasakome pamatę duomenis." },
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo duomenų šaltinių ir ataskaitų skaičiaus. Ją sutariame po pokalbio, prieš pradėdami darbą." },
    ] },
    questions: [
      { label: "Kokius skaičius norite matyti?", line: "Norimi skaičiai:", long: true, placeholder: "Pvz., pardavimai pagal prekę ir mėnesį, marža" },
      { label: "Kur dabar laikomi duomenys?", line: "Kur laikomi duomenys:", placeholder: "Pvz., Excel, el. parduotuvė, buhalterijos programa" },
      { label: "Kaip dažnai ruošiate ataskaitas?", line: "Ataskaitų dažnis:", options: ["Kas savaitę", "Kas mėnesį", "Retai", "Nežinau"] },
    ],
  },
  bots: {
    id: "bots",
    service: "Telegram ir Discord botai",
    gets: [["Ką gaunate", "Veikiantį Telegram ar Discord botą, kuris siunčia pranešimus, priima užsakymus arba seka jums svarbius pokyčius."], ["Ką darote jūs", "Papasakojate, ką botas turi daryti ir kas juo naudosis."], ["Ko kainoje nėra", "Serverio ir išorinių paslaugų mokesčių, jei botui jų reikia: juos įvardijame iš anksto."]],
    fit: { eyebrow: "Kam tinka", heading: "„Norime žinoti iš karto, kai kažkas nutinka.“", items: [
      { title: "Pranešimai komandai", text: "Nauja užklausa, užsakymas ar klaida svetainėje iš karto atkeliauja į Telegram grupę.", example: "Pavyzdys: pranešimas apie naują užsakymą." },
      { title: "Stebėjimas", text: "Botas tikrina jums svarbius šaltinius ir praneša, kai atsiranda kas nors nauja.", example: "Pavyzdys: kasdienė santrauka rytais." },
      { title: "Bendruomenė Discord'e", text: "Botas pasitinka naujus narius, suteikia roles ir atsako į pasikartojančius klausimus.", example: "Pavyzdys: klubo ar kurso bendruomenė." },
    ] },
    included: { note: "Kaina aptariama po pokalbio: ji priklauso nuo to, ką botas turi daryti ir prie kokių sistemų jungtis.", items: [
      "Sutariame, ką botas daro ir kas juo naudojasi",
      "Sukuriame ir paleidžiame botą",
      "Prijungiame prie jūsų sistemų, jei reikia",
      "Iš anksto įvardijame serverio ir paslaugų mokesčius",
    ] },
    faq: { heading: "Apie botus.", items: [
      { q: "Kur veiks botas?", a: "Telegram'e arba Discord'e, priklausomai nuo to, kur jūs ir jūsų komanda ar bendruomenė jau bendraujate." },
      { q: "Ar botui reikia serverio?", a: "Priklauso nuo užduoties. Kai kuriems pakanka kartą per dieną paleidžiamo darbo, kitiems reikia nuolat veikiančio serverio. Kainą įvardijame iš anksto." },
      { q: "Kiek tai kainuos?", a: "Kaina priklauso nuo boto užduočių ir integracijų. Ją sutariame po pokalbio, prieš pradėdami darbą." },
    ] },
    questions: [
      { label: "Ką botas turėtų daryti?", line: "Ką botas turėtų daryti:", long: true, placeholder: "Pvz., pranešti grupei apie naujus užsakymus" },
      { label: "Kur jis veiks?", line: "Kur veiks botas:", options: ["Telegram", "Discord", "Dar nežinau"] },
      { label: "Kas juo naudosis?", line: "Kas naudosis:", options: ["Tik aš", "Mūsų komanda", "Klientai ar bendruomenė", "Nežinau"] },
    ],
  },
}

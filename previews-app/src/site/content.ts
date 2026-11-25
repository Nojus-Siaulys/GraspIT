import type { MediaId } from "./mediaSlots.js"
import { prices } from "./pricing.js"
import { posts } from "./posts.js"
export const navigation = [
  ["/paslaugos", "Paslaugos"],
  ["/darbai", "Darbai"],
  ["/biblioteka", "Biblioteka"],
  ["/procesas", "Procesas"],
  ["/kainos", "Kainos"],
  ["/blogas", "Blogas"],
  ["/apie-mus", "Apie mus"],
  ["/duk", "DUK"],
] as const

export const pages: Record<
  string,
  { title: string; heading: string; intro: string; label: string }
> = {
  "/": {
    title: "Programos, svetainės, automatizacija verslui | GraspIT",
    heading: "Kuriame ir atnaujiname svetaines verslui.",
    intro:
      `Dviejų žmonių studija: programos, svetainės, automatizacija. Pradedame nuo pokalbio, kainą pasakome prieš darbą. Svetainės nuo ${prices.website}.`,
    label: "Svetainių studija Lietuvoje",
  },
  "/paslaugos": {
    title: "Svetainės, programos, automatizacija ir video | GraspIT",
    heading: "Pasakykite problemą, parinksime paslaugą",
    intro:
      "Svetainės, programos, automatizacija ir trumpi reklaminiai video. Raskite situaciją, panašią į jūsų, ir pamatysite, ką gausite ir kaip pradedame.",
    label: "Paslaugos",
  },
  "/paslaugos/svetaines": {
    title: `Interneto svetainių kūrimas nuo ${prices.website} | GraspIT`,
    heading: "Svetainė jūsų verslui",
    intro:
      `Kuriame verslo svetaines nuo ${prices.website}. Pradinę iki 4 puslapių svetainę paruošiame per 7 dienas pagal sutartą apimtį ir gavę reikalingą turinį.`,
    label: "Svetainių kūrimas",
  },
  "/paslaugos/el-parduotuves": {
    title: `Elektroninių parduotuvių kūrimas nuo ${prices.shop} | GraspIT`,
    heading: "El. parduotuvių kūrimas",
    intro:
      `Kuriame el. parduotuves su turinio valdymu nuo ${prices.shop}. Katalogą, mokėjimus, pristatymą ir integracijas aptariame prieš fiksuodami kainą.`,
    label: "El. parduotuvių kūrimas",
  },
  "/paslaugos/ai-agentai": {
    title: "AI automatizacija verslui | GraspIT",
    heading: "Darbo procesų automatizavimas",
    intro:
      "Automatizuojame laiškų ir darbo procesus pasitelkdami dirbtinį intelektą. Pradedame nuo vienos aiškios užduoties ir sutariame, kaip tikrinsime rezultatą.",
    label: "AI automatizacija",
  },
  "/paslaugos/programos": {
    title: "Programos ir vidaus sistemos verslui | GraspIT",
    heading: "Programos ir vidaus sistemos",
    intro:
      "Kuriame programas kasdieniam darbui: užsakymų valdymą, rezervacijas, klientų portalą ar ataskaitas. Pradedame nuo pokalbio ir aiškios apimties.",
    label: "Programos",
  },
  "/paslaugos/svetainiu-atnaujinimas": {
    title: "Svetainių dizaino atnaujinimas | GraspIT",
    heading: "Svetainių atnaujinimas",
    intro: "Atnaujiname esamų svetainių dizainą, struktūrą ir pritaikymą telefonams. Pirmiausia įvertiname dabartinę svetainę, tada suderiname darbų apimtį ir kainą.",
    label: "Svetainės dizaino atnaujinimas",
  },
  "/paslaugos/seo-prieziura": {
    title: "Svetainės SEO ir priežiūra | GraspIT",
    heading: "SEO ir svetainės priežiūra",
    intro:
      "Po paleidimo svetainę verta prižiūrėti: stebėti indeksavimą, atnaujinti informaciją ir tvarkyti smulkius pakeitimus. Kainą pateikiame pagal reikalingus darbus.",
    label: "SEO ir priežiūra",
  },
  "/paslaugos/integracijos": {
    title: "Integracijos ir dokumentų automatizavimas | GraspIT",
    heading: "Integracijos ir dokumentų automatizavimas",
    intro:
      "Sujungiame jūsų naudojamas sistemas, kad duomenys ir dokumentai nereikalautų perrašymo ranka. Pradedame nuo vienos grandinės. Kaina aptariama po pokalbio.",
    label: "Integracijos",
  },
  "/paslaugos/judesio-reklamos": {
    title: "Judesio reklamos socialiniams tinklams | GraspIT",
    heading: "Judesio reklamos",
    intro:
      "Kuriame trumpus reklaminius video socialiniams tinklams: apie 15–30 sekundžių, 9:16 formatu, paruoštus skelbti. Kaina aptariama po pokalbio.",
    label: "Judesio reklamos",
  },
  "/paslaugos/3d-reklamos": {
    title: "3D reklamos ir produktų vaizdai | GraspIT",
    heading: "3D reklamos",
    intro:
      "Sukuriame jūsų produkto 3D vaizdą arba trumpą video, kai paprastų nuotraukų nepakanka. Kaina aptariama po pokalbio.",
    label: "3D reklamos",
  },
  "/paslaugos/socialiniu-tinklu-paketas": {
    title: "Socialinių tinklų paketas: 4 trumpi video per savaitę | GraspIT",
    heading: "Socialinių tinklų paketas",
    intro:
      "Keturi trumpi video per savaitę TikTok, Reels ar Facebook: paprastesni už €200 arba sudėtingesni už €300 per savaitę. Reklamos biudžetas mokamas atskirai.",
    label: "Socialinių tinklų paketas",
  },
  "/paslaugos/ai-matomumas": {
    title: "AI matomumas: ar ChatGPT mini jūsų verslą | GraspIT",
    heading: "AI matomumas",
    intro:
      "Patikriname, ar ChatGPT, Perplexity ir kiti AI asistentai mini jūsų verslą, kai pirkėjas klausia apie jūsų sritį, ką jie siūlo vietoj jūsų ir ką verta pakeisti. Kaina aptariama po pokalbio.",
    label: "AI matomumas",
  },
  "/paslaugos/ai-asistentas": {
    title: "AI pokalbių asistentas svetainei ir Messenger | GraspIT",
    heading: "AI pokalbių asistentas",
    intro:
      "Asistentas svetainėje ar Messenger'yje atsako į dažnus klientų klausimus pagal jūsų pateiktą informaciją, o sudėtingesnius perduoda jums. Kaina aptariama po pokalbio.",
    label: "AI pokalbių asistentas",
  },
  "/paslaugos/duomenu-analitika": {
    title: "Duomenų analitika ir Power BI ataskaitos | GraspIT",
    heading: "Duomenų analitika",
    intro:
      "Sujungiame duomenis iš parduotuvės, lentelių ir kitų sistemų į vieną ataskaitų skydelį, kuris atsinaujina pats. Kaina aptariama po pokalbio.",
    label: "Duomenų analitika",
  },
  "/paslaugos/telegram-discord-botai": {
    title: "Telegram ir Discord botai verslui | GraspIT",
    heading: "Telegram ir Discord botai",
    intro:
      "Kuriame botus, kurie praneša apie naujus užsakymus, seka jums svarbius pokyčius ar padeda tvarkyti bendruomenę. Kaina aptariama po pokalbio.",
    label: "Telegram ir Discord botai",
  },
  "/kainos": {
    title: `Svetainių kūrimo kainos: nuo ${prices.website} ir ${prices.shop} | GraspIT`,
    heading: "Kas įskaičiuota į kainą, o kas ne",
    intro:
      `Du paketai: pradinė svetainė nuo ${prices.website}, verslo svetainė ar el. parduotuvė nuo ${prices.shop}. Ką jie apima, kas skaičiuojama atskirai ir kaip susitariame dėl mokėjimo.`,
    label: "Kainos",
  },
  "/procesas": {
    title: "Kaip vyksta svetainės kūrimas: 5 etapai | GraspIT",
    heading: "Nieko nepradedame, kol nepatvirtinate kainos.",
    intro:
      "Pasiūlymą gaunate antrame žingsnyje, o darbus pradedame, kai jį patvirtinate. Kūrimo metu matote peržiūrą ir rašote pastabas.",
    label: "Procesas",
  },
  "/apie-mus": {
    title: "GraspIT komanda – apie mus ir mūsų darbus",
    heading: "Susipažinkite su GraspIT komanda",
    intro:
      "Esame dviejų žmonių studija. Su jumis kalbasi tie patys žmonės, kurie planuoja, kuria ir paleidžia jūsų svetainę.",
    label: "Apie mus",
  },
  "/biblioteka": {
    title: "Asmeninių projektų biblioteka | GraspIT",
    heading: "Idėjos, kurioms norėjosi parašyti kodą.",
    intro: "Asmeniniai Nojaus projektai ir technologijų eksperimentai — nuo AI įrankių iki web platformų. Kuriu iš smalsumo, mokydamasis ir bandydamas savo idėjas.",
    label: "Biblioteka",
  },
  "/darbai": {
    title: "Atlikti darbai – Colorlisse ir Kalvita | GraspIT",
    heading: "Atlikti darbai",
    intro: "El. parduotuvė ir paslaugų svetainė: skirtingi verslai, skirtingi lankytojo keliai. Pažiūrėkite, kam skirtas kiekvienas projektas ir kaip jis veikia.",
    label: "Darbai",
  },
  "/darbai/colorlisse": {
    title: "Colorlisse el. parduotuvė – projekto pristatymas | GraspIT",
    heading: "Colorlisse. Produktas ir kelias iki užsakymo.",
    intro: "Profesionalios kirpėjų folijos pristatymas ir pardavimas internetu. Kam skirta svetainė, iš ko ji sudaryta ir kodėl padaryta taip.",
    label: "Colorlisse / El. parduotuvė",
  },
  "/darbai/kalvita": {
    title: "Kalvita paslaugų svetainė – projekto pristatymas | GraspIT",
    heading: "Kalvita. Darbai, kurie pradeda pokalbį.",
    intro: "Kalvystės paslaugų ir atliktų darbų pristatymas. Kaip paslaugų informacija ir galerija veda iki susisiekimo.",
    label: "Kalvita / Paslaugų svetainė",
  },
  "/duk": {
    title: "DUK apie svetainių kūrimą, kainas ir priežiūrą | GraspIT",
    heading: "Dažniausi klausimai",
    intro:
      "Kiek kainuoja svetainė, ko reikia pradžiai ir kas vyksta po paleidimo? Čia rasite atsakymus apie kūrimą, el. parduotuves, SEO ir priežiūrą.",
    label: "Dažniausiai užduodami klausimai",
  },
  "/blogas": {
    title: "Blogas apie svetaines, SEO ir AI paiešką verslui | GraspIT",
    heading: "Patarimai, kaip būti randamam internete",
    intro:
      "Praktiški straipsniai apie svetainių kainas, techninį SEO, matomumą Google ir AI asistentų atsakymuose. Be reklamos biudžeto – su aiškiais žingsniais.",
    label: "Blogas",
  },
  "/privatumo-politika": {
    title: "Privatumo politika | GraspIT",
    heading: "Privatumo politika",
    intro: "Kaip GraspIT tvarko duomenis, kuriuos paliekate užklausos formoje ar parašę mums, kiek laiko juos saugo ir kokias teises turite.",
    label: "Privatumo politika",
  },
  "/slapukai": {
    title: "Slapukai ir panašios technologijos | GraspIT",
    heading: "Slapukai",
    intro: "Šioje svetainėje slapukų nenaudojame. Čia aprašome, ką svetainė išsaugo jūsų įrenginyje ir kodėl.",
    label: "Slapukai",
  },
  "/kontaktai": {
    title: "Aptarkime jūsų svetainę | GraspIT kontaktai",
    heading: "Rašykite arba skambinkite",
    intro:
      "Ką siūlote, kam parduodate ir ką turėtų padėti pasiekti svetainė? Trumpas projekto aprašymas – gera pokalbio pradžia.",
    label: "Kontaktai",
  },
}

for (const post of posts) {
  pages[`/blogas/${post.slug}`] = {
    title: post.metaTitle,
    heading: post.title,
    intro: post.description,
    label: post.label,
  }
}

export type Service = { href: string; title: string; text: string; gets: string; price: string; number: string; group: string; media?: MediaId }
export const services: Service[] = [
  {
    href: "/paslaugos/svetaines",
    title: "Verslo svetainės",
    text: "Kai paslaugos ir kontaktai išbarstyti, o klientas turi jų ieškoti.",
    gets: "Veikiančią svetainę iki 4 puslapių, pritaikytą telefonui, ir visą jos kodą.",
    price: `nuo ${prices.website}`,
    number: "01",
    group: "websites",
    media: "serviceWebsites",
  },
  {
    href: "/paslaugos/el-parduotuves",
    title: "El. parduotuvės",
    text: "Kai norite prekiauti internetu ir patogiai valdyti turinį.",
    gets: "Parduotuvę su prekių katalogu ir pirkimo keliu, kurią galėsite patys papildyti.",
    price: `nuo ${prices.shop}`,
    number: "02",
    group: "websites",
    media: "serviceShop",
  },
  { href: "/paslaugos/svetainiu-atnaujinimas", title: "Svetainės dizaino atnaujinimas", text: "Kai svetainė yra, bet atrodo pasenusi arba nepatogi telefone.", gets: "Naują esamos svetainės dizainą ir struktūrą bei senų adresų nukreipimus.", price: "Kaina pagal apimtį", number: "03", group: "websites", media: "serviceRedesign" },
  { href: "/paslaugos/seo-prieziura", title: "SEO ir svetainės priežiūra", text: "Kai paleistos svetainės niekas neprižiūri ir nežinote, ką pagerinti.", gets: "Techninę svetainės patikrą ir sutartus atnaujinimus bei smulkius pakeitimus.", price: "Kaina pagal darbus", number: "04", group: "websites", media: "serviceSeo" },
  { href: "/paslaugos/ai-matomumas", title: "AI matomumas", text: "Kai klientai klausia ChatGPT, o jis jūsų nemini.", gets: "Ataskaitą, ar AI asistentai jus mini, ką siūlo vietoj jūsų ir ką verta pakeisti.", price: "Kaina aptariama po pokalbio", number: "11", group: "websites" },
  { href: "/paslaugos/programos", title: "Programos ir vidaus sistemos", text: "Kai Excel, laiškai ir užrašai nebeužtenka kasdieniam darbui.", gets: "Pirmą veikiančią programos versiją, kurią galite išbandyti dar kuriant.", price: "Kaina aptariama po pokalbio", number: "05", group: "apps", media: "serviceApps" },
  {
    href: "/paslaugos/ai-agentai",
    title: "AI automatizacija",
    text: "Kai pasikartojantys laiškai ar procesai atima per daug laiko.",
    gets: "Vieną veikiantį procesą, pavyzdžiui, parengtus atsakymų į laiškus juodraščius. Ten, kur sutariame, sprendimą patvirtinate jūs.",
    price: "Kaina aptariama po pokalbio",
    number: "06",
    group: "apps",
    media: "serviceAutomation",
  },
  { href: "/paslaugos/integracijos", title: "Integracijos ir dokumentų automatizavimas", text: "Kai tie patys duomenys perrašomi ranka iš vienos sistemos į kitą.", gets: "Sujungtas jūsų naudojamas sistemas, kad duomenų ir dokumentų nebereikėtų perrašyti ranka.", price: "Kaina aptariama po pokalbio", number: "07", group: "apps", media: "serviceIntegrations" },
  { href: "/paslaugos/ai-asistentas", title: "AI pokalbių asistentas", text: "Kai į tuos pačius klientų klausimus atsakote kelis kartus per dieną.", gets: "Asistentą svetainėje ar Messenger'yje, kuris atsako pagal jūsų informaciją ir sudėtingesnius klausimus perduoda jums.", price: "Kaina aptariama po pokalbio", number: "12", group: "apps" },
  { href: "/paslaugos/duomenu-analitika", title: "Duomenų analitika", text: "Kai ataskaitą kas savaitę dėliojate ranka iš kelių failų.", gets: "Ataskaitų skydelį, kuriame svarbiausi skaičiai matomi vienoje vietoje ir atsinaujina patys.", price: "Kaina aptariama po pokalbio", number: "13", group: "apps" },
  { href: "/paslaugos/telegram-discord-botai", title: "Telegram ir Discord botai", text: "Kai norite žinoti iš karto, kai atsiranda užsakymas ar kažkas pasikeičia.", gets: "Veikiantį botą, kuris siunčia pranešimus, priima užsakymus arba seka pokyčius.", price: "Kaina aptariama po pokalbio", number: "14", group: "apps" },
  { href: "/paslaugos/judesio-reklamos", title: "Judesio reklamos", text: "Kai norite trumpo video, kuris sustabdo žmogų socialiniuose tinkluose.", gets: "Trumpą reklaminį video, apie 15–30 sekundžių, 9:16 formatu, paruoštą skelbti.", price: "Kaina aptariama po pokalbio", number: "08", group: "ads" },
  { href: "/paslaugos/3d-reklamos", title: "3D reklamos", text: "Kai produktas turi atrodyti ryškiai, o paprastų nuotraukų nepakanka.", gets: "Jūsų produkto 3D vaizdą arba trumpą video, sukurtą kompiuteriu.", price: "Kaina aptariama po pokalbio", number: "09", group: "ads" },
  { href: "/paslaugos/socialiniu-tinklu-paketas", title: "Socialinių tinklų paketas", text: "Kai norite reguliariai skelbti TikTok, Reels ar Facebook ir neturite laiko kurti.", gets: "4 trumpus video per savaitę. Du paketai: paprastesni arba sudėtingesni įrašai.", price: "€200–€300 per savaitę", number: "10", group: "ads" },
]

// Cards on /paslaugos are shown in these three groups; `group` on each service picks its place.
export const serviceGroups = [
  { id: "websites", title: "Svetainės", text: "Kad klientas jus rastų, suprastų, ką darote, ir galėtų parašyti ar nusipirkti." },
  { id: "apps", title: "Programos ir automatizacija", text: "Kai tą patį darbą darote ranka: laiškai, lentelės, užsakymai." },
  { id: "ads", title: "Reklama ir video", text: "Trumpi video, kurie parodo jūsų veiklą socialiniuose tinkluose." },
] as const

export const faqGroups = [
  {
    id: "kaina",
    title: "Kaina ir susitarimas",
    items: [
      {
        q: "Kiek kainuoja interneto svetainės kūrimas?",
        a: `Pigiausia – ${prices.website}: svetainė iki 4 puslapių. Verslo svetainė su turinio valdymu ar el. parduotuvė – nuo ${prices.shop}. Brangina: daugiau puslapių, funkcijų ir sudėtingesnis dizainas. Tikslią sumą užrašome pasiūlyme prieš pradėdami darbą.`,
      },
      {
        q: "Kas įskaičiuota į svetainės kainą?",
        a: "Į pradinį paketą įeina: iki 4 puslapių, pritaikymas telefonams ir planšetėms, kodo ir turinio perdavimas, 30 dienų pagalba po paleidimo. Atskirai skaičiuojame domeną, talpinimą, tekstų rašymą ir mokamas integracijas. Konkrečius puslapius ir funkcijas surašome pasiūlyme.",
      },
      {
        q: "Ar kaina gali pasikeisti kūrimo metu?",
        a: "Sutartos apimties kaina nesikeičia. Keistis ji gali tik tada, kai prireikia naujų puslapių ar funkcijų: pirmiausia pasakome, kiek tai kainuos ir ar pasikeis terminas. Papildomų darbų be jūsų sutikimo nepradedame.",
      },
      {
        q: "Ar domenas ir talpinimas yra vienkartinės išlaidos?",
        a: "Ne. Domeną ir talpinimą reikia periodiškai pratęsti pagal pasirinkto tiekėjo sąlygas. Tai atskira nuo vienkartinės kūrimo kainos. Pasiūlyme išsiaiškiname, ką jau turite ir ko dar reikės.",
      },
      {
        q: "Kaip susitariama dėl apmokėjimo?",
        a: "Mokėjimo etapus ir terminus užrašome pasiūlyme prieš pradedant darbą. Vienodo avanso visiems projektams nenustatome. Prieš patvirtindami pasiūlymą matote visą kainą, mokėjimo sąlygas ir darbų apimtį.",
      },
    ],
  },
  {
    id: "kurimas",
    title: "Pasiruošimas ir kūrimas",
    items: [
      {
        q: "Kiek laiko trunka sukurti svetainę?",
        a: "Pradinė svetainė – orientaciniu terminu 7 dienos, didesnė svetainė ar el. parduotuvė – 14 dienų. Tikslų grafiką sutariame pasiūlyme. Jei vėluoja tekstai, nuotraukos ar jūsų pastabos, kartu pakoreguojame paleidimo datą.",
      },
      {
        q: "Ką reikia paruošti prieš svetainės kūrimą?",
        a: "Pradžiai pakanka papasakoti apie veiklą, klientus ir tai, ko tikitės iš svetainės. Pravers logotipas, paslaugų ar prekių sąrašas, turimi tekstai, nuotraukos ir svetainės, kurios jums patinka. Jei turite domeną ar seną svetainę, pasakykite per pirmą pokalbį.",
      },
      {
        q: "Kas paruošia svetainės tekstus ir nuotraukas?",
        a: "Tai sutariame prieš pradėdami. Jei tekstus ir nuotraukas turite, pritaikome juos naujai struktūrai. Jei dar ne, tekstų ar nuotraukų paruošimą įtraukiame į atskirą susitarimą su sava kaina. Nuotraukoms reikia teisių jas naudoti.",
      },
      {
        q: "Ar galėsiu matyti svetainę dar prieš paleidimą?",
        a: "Taip. Kūrimo metu gaunate privačią peržiūros nuorodą ir prieš paleidimą pateikiate pastabas. Kiek pakeitimų daroma ir kaip juos derinsime, sutariame projekto pradžioje.",
      },
      {
        q: "Ar svetainė bus pritaikyta mobiliesiems telefonams?",
        a: "Taip. Išdėstymą pritaikome telefonams, planšetėms ir kompiuteriams. Prieš paleidimą tikriname, ar tekstas skaitomas, ar veikia meniu ir pagrindiniai mygtukai skirtingo pločio ekranuose.",
      },
      {
        q: "Ar galite atnaujinti esamą svetainę?",
        a: "Taip. Pirmiausia pažiūrime į struktūrą, turinį ir techninę būklę. Tada sakome, ką verta palikti, ką perkurti ir kaip perkelti turinį. Jei keičiasi adresai, suplanuojame senų puslapių nukreipimus, kad lankytojai nepatektų į neveikiančias nuorodas.",
      },
    ],
  },
  {
    id: "parduotuve",
    title: "El. parduotuvės ir valdymas",
    items: [
      {
        q: "Kiek kainuoja sukurti el. parduotuvę?",
        a: `Nuo ${prices.shop}, su turinio valdymu. Brangina: didesnis katalogas, prekių variantai, daugiau mokėjimo ir pristatymo būdų, integracijos. Tai aptariame prieš pateikdami fiksuotos kainos pasiūlymą.`,
      },
      {
        q: "Ar galėsiu pats keisti svetainės turinį?",
        a: "Taip, jei turinio valdymas įtrauktas į apimtį. Iš anksto sutariame, ką norėsite redaguoti patys: tekstus, nuotraukas, prekes ar ką nors kita. Pradiniame pakete visų valdymo funkcijų nėra – kas įtraukta, parašome pasiūlyme.",
      },
      {
        q: "Ar galima prijungti mokėjimus ir pristatymą?",
        a: "Taip. Tai aptariame planuodami parduotuvę. Pasirinkimas priklauso nuo to, kur prekiaujate, su kuo dirbate ir ko reikia verslui. Mokėjimo operatorių, vežėjų ir kitų paslaugų sutartis bei mokesčius vertiname atskirai nuo parduotuvės kūrimo.",
      },
    ],
  },
  {
    id: "seo",
    title: "SEO ir svetainės turinys",
    items: [
      {
        q: "Ar nauja svetainė bus paruošta Google paieškai?",
        a: "Kuriant tvarkome puslapių struktūrą, adresus, antraštes ir aprašymus, pritaikymą telefonams ir tai, kad paieškos sistemos matytų turinį. Konkrečius darbus surašome pasiūlyme. Techninis paruošimas pozicijų negarantuoja.",
      },
      {
        q: "Ar garantuojate pirmą vietą Google?",
        a: "Ne. Pozicijas lemia konkurencija, turinio nauda, svetainės autoritetas ir daug kitų dalykų. Galime sutarti konkrečius techninius ir turinio darbus, bet ne pažadėti vietos, kurios nekontroliuojame.",
      },
      {
        q: "Kam reikalingas atskiras DUK puslapis?",
        a: "Lankytojas greitai randa atsakymus apie kainą, kūrimą ir priežiūrą. Aiškūs klausimai ir konkretūs atsakymai padeda ir paieškos sistemoms suprasti turinį. Struktūriniai duomenys gali aprašyti DUK, bet neužtikrina išplėstų paieškos rezultatų ar paminėjimo dirbtinio intelekto atsakymuose.",
      },
      {
        q: "Ar svetainei reikia nuolatinio SEO?",
        a: "Priklauso nuo tikslų ir konkurencijos. Po paleidimo verta stebėti indeksavimą, paieškos užklausas ir gaunamų užklausų skaičių, atnaujinti pasenusią informaciją ir pildyti naudingu turiniu. Nuolatinis SEO ar turinio darbas yra atskira apimtis, jei jo nėra pasiūlyme.",
      },
    ],
  },
  {
    id: "prieziura",
    title: "Nuosavybė ir pagalba",
    items: [
      {
        q: "Kam priklausys svetainė ir jos kodas?",
        a: "Jums. Paleidžiant perduodame svetainės kodą ir turinį. Trečiųjų šalių paslaugų, šriftų ar vaizdų licencijos galioja pagal jų tiekėjų sąlygas. Prieigas ir naudojamas paslaugas aptariame perduodami projektą.",
      },
      {
        q: "Kokia pagalba teikiama po paleidimo?",
        a: "30 dienų pagalba. Kiek ji apima ir kaip pranešti apie problemą, aptariame perduodami svetainę. Naujos funkcijos ar didesni pakeitimai – atskirai. Ilgesnei pagalbai galima sutarti priežiūros planą.",
      },
      {
        q: "Kiek kainuoja svetainės priežiūra?",
        a: "Kainą pateikiame pagal reikalingus darbus: talpinimą, atnaujinimus ir smulkius pakeitimus. Vienos mėnesinės kainos kol kas neskelbiame. Prieš susitardami užrašome, kas įtraukta ir kokios trečiųjų šalių išlaidos yra atskirai.",
      },
      {
        q: "Ar dirbate su klientais visoje Lietuvoje?",
        a: "Taip, visoje Lietuvoje. Projekto informaciją ir pastabas galime derinti nuotoliu. Pokalbio formatą ir bendravimo kanalą sutariame prieš pradėdami.",
      },
    ],
  },
]

export const allFaq = faqGroups.flatMap((group) => group.items)

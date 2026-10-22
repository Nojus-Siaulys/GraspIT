export const navigation = [
  ["/paslaugos", "Paslaugos"],
  ["/darbai", "Darbai"],
  ["/procesas", "Procesas"],
  ["/kainos", "Kainos"],
  ["/apie-mus", "Apie mus"],
  ["/duk", "DUK"],
] as const

export const pages: Record<
  string,
  { title: string; heading: string; intro: string; label: string }
> = {
  "/": {
    title: "Svetainių kūrimas verslui nuo €350 | GraspIT",
    heading: "Pirmiausia suprantame. Tada kuriame.",
    intro:
      "Kuriame svetaines ir el. parduotuves smulkiam bei vidutiniam verslui. Aiški struktūra, apgalvotas dizainas ir fiksuota kaina prieš pradedant.",
    label: "Svetainių studija Lietuvoje",
  },
  "/paslaugos": {
    title: "Svetainių, el. parduotuvių kūrimas ir automatizacija | GraspIT",
    heading: "Sprendimas prasideda nuo jūsų tikslo.",
    intro:
      "Pristatyti paslaugas, parduoti internetu ar sutrumpinti kasdienius darbus? Parenkame tai, ko reikia jūsų verslui, ir iš anksto sutariame darbų apimtį.",
    label: "Paslaugos",
  },
  "/paslaugos/svetaines": {
    title: "Interneto svetainių kūrimas nuo €350 | GraspIT",
    heading: "Svetainė, kurioje aišku, ką siūlote.",
    intro:
      "Kuriame verslo svetaines nuo €350. Pradinį iki 4 puslapių sprendimą paruošiame per 7 dienas pagal sutartą apimtį ir gavę reikalingą turinį.",
    label: "Svetainių kūrimas",
  },
  "/paslaugos/el-parduotuves": {
    title: "Elektroninių parduotuvių kūrimas nuo €700 | GraspIT",
    heading: "Nuo pirmos prekės iki aiškaus užsakymo.",
    intro:
      "Kuriame el. parduotuves su turinio valdymu nuo €700. Katalogą, mokėjimus, pristatymą ir integracijas aptariame prieš fiksuodami kainą.",
    label: "El. parduotuvių kūrimas",
  },
  "/paslaugos/ai-agentai": {
    title: "AI automatizacija verslui nuo €950 | GraspIT",
    heading: "Mažiau pasikartojimo. Daugiau laiko darbui.",
    intro:
      "Automatizuojame laiškų ir darbo procesus pasitelkdami dirbtinį intelektą. Pradedame nuo vienos aiškios užduoties ir sutariame, kaip tikrinsime rezultatą.",
    label: "AI automatizacija",
  },
  "/kainos": {
    title: "Svetainių kūrimo kainos: nuo €350 ir €700 | GraspIT",
    heading: "Aiški apimtis. Fiksuota kaina.",
    intro:
      "Pradinė svetainė – nuo €350, verslo svetainė ar el. parduotuvė – nuo €700. Galutinę kainą sutariame prieš pradėdami; papildomi darbai aptariami atskirai.",
    label: "Kainos",
  },
  "/procesas": {
    title: "Kaip vyksta svetainės kūrimas: 5 etapai | GraspIT",
    heading: "Žinote, kas vyksta. Kiekviename etape.",
    intro:
      "Nuo pirmo pokalbio iki svetainės perdavimo – penki aiškūs žingsniai. Kūrybos metu matote peržiūrą ir galite pateikti pastabas.",
    label: "Procesas",
  },
  "/apie-mus": {
    title: "Apie GraspIT – dviejų žmonių svetainių studija",
    heading: "Maža komanda. Tiesioginis ryšys.",
    intro:
      "Esame dviejų žmonių studija. Su jumis kalbasi tie patys žmonės, kurie planuoja, kuria ir paleidžia jūsų svetainę.",
    label: "Apie mus",
  },
  "/darbai": {
    title: "Svetainių dizaino kryptis ir darbai | GraspIT",
    heading: "Dizainas turi padėti suprasti.",
    intro:
      "Aiški hierarchija, lengvai randama informacija ir vienas suprantamas kitas žingsnis. Taip žiūrime į kiekvieną svetainę.",
    label: "Darbai",
  },
  "/duk": {
    title: "DUK apie svetainių kūrimą, kainas ir priežiūrą | GraspIT",
    heading: "Geri klausimai. Aiškūs atsakymai.",
    intro:
      "Kiek kainuoja svetainė, ko reikia pradžiai ir kas vyksta po paleidimo? Čia rasite atsakymus apie kūrimą, el. parduotuves, SEO ir priežiūrą.",
    label: "Dažniausiai užduodami klausimai",
  },
  "/kontaktai": {
    title: "Aptarkime jūsų svetainę | GraspIT kontaktai",
    heading: "Pradėkime nuo jūsų verslo.",
    intro:
      "Ką siūlote, kam parduodate ir ką turėtų padėti pasiekti svetainė? Trumpas projekto aprašymas – gera pokalbio pradžia.",
    label: "Kontaktai",
  },
}

export const services = [
  {
    href: "/paslaugos/svetaines",
    title: "Verslo svetainės",
    text: "Kai svarbu aiškiai pristatyti paslaugas ir padėti klientui kreiptis.",
    price: "nuo €350",
    number: "01",
  },
  {
    href: "/paslaugos/el-parduotuves",
    title: "El. parduotuvės",
    text: "Kai norite prekiauti internetu ir patogiai valdyti turinį.",
    price: "nuo €700",
    number: "02",
  },
  {
    href: "/paslaugos/ai-agentai",
    title: "AI automatizacija",
    text: "Kai pasikartojantys laiškai ar procesai atima per daug laiko.",
    price: "nuo €950",
    number: "03",
  },
]

export const faqGroups = [
  {
    id: "kaina",
    title: "Kaina ir susitarimas",
    items: [
      {
        q: "Kiek kainuoja interneto svetainės kūrimas?",
        a: "Pradinė iki 4 puslapių svetainė kainuoja nuo €350. Verslo svetainė su turinio valdymu ar el. parduotuvė – nuo €700. Galutinė kaina priklauso nuo funkcijų, dizaino ir sutartos darbų apimties. Ją fiksuojame pasiūlyme prieš pradėdami kūrimą.",
      },
      {
        q: "Kas įskaičiuota į svetainės kainą?",
        a: "Pradinio paketo apimtis – iki 4 puslapių svetainė, pritaikyta telefonams ir planšetėms, kodo ir turinio perdavimas bei 30 dienų pagalba po paleidimo. Konkrečius puslapius ir funkcijas įvardijame pasiūlyme. Domeną, talpinimą, tekstų rengimą ir mokamas integracijas aptariame atskirai.",
      },
      {
        q: "Ar kaina gali pasikeisti kūrimo metu?",
        a: "Sutartos apimties kaina yra fiksuota. Jei kūrimo metu prireikia naujų puslapių ar papildomų funkcijų, pirmiausia aptariame jų kainą ir poveikį terminui. Papildomus darbus pradedame suderinę pakeitimus.",
      },
      {
        q: "Ar domenas ir talpinimas yra vienkartinės išlaidos?",
        a: "Ne. Domeno registracija ir svetainės talpinimas paprastai pratęsiami periodiškai pagal pasirinkto tiekėjo sąlygas. Šias išlaidas svarbu atskirti nuo vienkartinės kūrimo kainos. Pasiūlyme išsiaiškiname, ką jau turite ir kokių paslaugų dar reikės.",
      },
      {
        q: "Kaip susitariama dėl apmokėjimo?",
        a: "Mokėjimo etapus ir terminus suderiname individualiame pasiūlyme prieš pradėdami darbą. Vienodos avanso dalies visiems projektams čia nenurodome: prieš patvirtindami pasiūlymą turite žinoti visą kainą, mokėjimo sąlygas ir darbų apimtį.",
      },
    ],
  },
  {
    id: "kurimas",
    title: "Pasiruošimas ir kūrimas",
    items: [
      {
        q: "Kiek laiko trunka sukurti svetainę?",
        a: "Pradinės svetainės orientyras – 7 dienos, didesnės svetainės ar el. parduotuvės – 14 dienų. Tikslų grafiką sutariame pasiūlyme pagal funkcijas ir reikalingą turinį. Jei vėluoja tekstai, nuotraukos ar grįžtamasis ryšys, kartu peržiūrime paleidimo datą.",
      },
      {
        q: "Ką reikia paruošti prieš svetainės kūrimą?",
        a: "Pradžiai pakanka aprašyti veiklą, tikslinį klientą ir svetainės tikslą. Pravers logotipas, paslaugų ar prekių sąrašas, turimi tekstai, nuotraukos ir patinkančių svetainių pavyzdžiai. Jei turite domeną ar seną svetainę, apie tai pasakykite per pirmą pokalbį.",
      },
      {
        q: "Kas paruošia svetainės tekstus ir nuotraukas?",
        a: "Turinio paruošimo atsakomybes sutariame prieš kūrimą. Jei jau turite tekstus ir nuotraukas, aptariame jų pritaikymą naujai struktūrai. Jei turinį dar reikia sukurti, jo apimtį ir kainą įtraukiame į atskirą susitarimą. Nuotraukoms būtinos tinkamos naudojimo teisės.",
      },
      {
        q: "Ar galėsiu matyti svetainę dar prieš paleidimą?",
        a: "Taip. Kūrimo metu gaunate privačią peržiūros nuorodą. Prieš viešą paleidimą peržiūrite sutartus puslapius ir pateikiate pastabas. Pakeitimų apimtį ir derinimo tvarką aptariame projekto pradžioje.",
      },
      {
        q: "Ar svetainė bus pritaikyta mobiliesiems telefonams?",
        a: "Taip. Svetainės išdėstymą pritaikome telefonams, planšetėms ir kompiuteriams. Prieš paleidimą tikriname teksto skaitomumą, navigaciją ir pagrindinius veiksmus skirtingo pločio ekranuose.",
      },
      {
        q: "Ar galite atnaujinti esamą svetainę?",
        a: "Taip, pirmiausia įvertiname jos struktūrą, turinį ir techninę būklę. Tuomet aptariame, ką verta išlaikyti, ką perkurti ir kaip perkelti reikalingą turinį. Keičiant adresus svarbu suplanuoti senų puslapių peradresavimus, kad lankytojai nerastų neveikiančių nuorodų.",
      },
    ],
  },
  {
    id: "parduotuve",
    title: "El. parduotuvės ir valdymas",
    items: [
      {
        q: "Kiek kainuoja sukurti el. parduotuvę?",
        a: "El. parduotuvės su turinio valdymu kaina prasideda nuo €700. Tiksli suma priklauso nuo katalogo, prekių variantų, mokėjimo ir pristatymo būdų bei integracijų. Šiuos poreikius aptariame prieš pateikdami fiksuotos kainos pasiūlymą.",
      },
      {
        q: "Ar galėsiu pats keisti svetainės turinį?",
        a: "Taip, kai į projekto apimtį įtrauktas turinio valdymas. Iš anksto sutariame, kokius tekstus, nuotraukas, prekes ar kitą informaciją norėsite redaguoti savarankiškai. Pradinio paketo nereikėtų laikyti turinčiu visas valdymo funkcijas – jos turi būti nurodytos pasiūlyme.",
      },
      {
        q: "Ar galima prijungti mokėjimus ir pristatymą?",
        a: "Taip, šias integracijas aptariame planuodami parduotuvę. Pasirinkimas priklauso nuo prekybos rinkos, tiekėjų ir verslo poreikių. Mokėjimo operatorių, vežėjų ir kitų paslaugų sutartys bei jų mokesčiai vertinami atskirai nuo parduotuvės kūrimo.",
      },
    ],
  },
  {
    id: "seo",
    title: "SEO ir svetainės turinys",
    items: [
      {
        q: "Ar nauja svetainė bus paruošta Google paieškai?",
        a: "Kuriant svarbu aiški puslapių struktūra, aprašomieji adresai, atskiros antraštės ir metaaprašymai, mobilusis pritaikymas bei paieškos sistemoms pasiekiamas turinys. Konkrečius SEO darbus įvardijame pasiūlyme. Techninis paruošimas savaime negarantuoja paieškos pozicijų.",
      },
      {
        q: "Ar garantuojate pirmą vietą Google?",
        a: "Ne. Paieškos pozicijas lemia konkurencija, turinio nauda, svetainės autoritetas ir daugybė kitų veiksnių. Galime sutarti konkrečius techninius ir turinio darbus, tačiau ne pažadėti poziciją, kurios nekontroliuojame.",
      },
      {
        q: "Kam reikalingas atskiras DUK puslapis?",
        a: "DUK padeda lankytojui greitai rasti atsakymus apie kainą, kūrimą ir priežiūrą. Aiškūs klausimai ir konkretūs atsakymai taip pat padeda paieškos sistemoms suprasti turinį. Struktūriniai duomenys gali jį aprašyti, tačiau negarantuoja išplėstų paieškos rezultatų ar paminėjimo AI atsakymuose.",
      },
      {
        q: "Ar svetainei reikia nuolatinio SEO?",
        a: "Tai priklauso nuo tikslų ir konkurencijos. Po paleidimo verta stebėti indeksavimą, paieškos užklausas ir užklausų skaičių, atnaujinti pasenusią informaciją bei plėsti naudingą turinį. Nuolatinis turinio ar SEO darbas yra atskira apimtis, jei jis neįtrauktas į pasiūlymą.",
      },
    ],
  },
  {
    id: "prieziura",
    title: "Nuosavybė ir pagalba",
    items: [
      {
        q: "Kam priklausys svetainė ir jos kodas?",
        a: "Paleidimo metu perduodame svetainės kodą ir turinį jums. Projekte naudojamų trečiųjų šalių paslaugų, šriftų ar vaizdų licencijos galioja pagal jų tiekėjų sąlygas. Prieigas ir naudojamas paslaugas aptariame perduodami projektą.",
      },
      {
        q: "Kokia pagalba teikiama po paleidimo?",
        a: "Po paleidimo teikiame 30 dienų pagalbą. Jos ribas ir pranešimo apie problemas tvarką aptariame perduodami svetainę. Naujos funkcijos ar didesni pakeitimai derinami atskirai; vėlesnei pagalbai galima aptarti priežiūros planą.",
      },
      {
        q: "Kiek kainuoja svetainės priežiūra?",
        a: "Priežiūros kainą pateikiame pagal reikalingus darbus: talpinimą, atnaujinimus ir smulkius pakeitimus. Vienos patvirtintos mėnesinės kainos kol kas neskelbiame. Prieš susitariant svarbu aiškiai įvardyti įtrauktus darbus ir trečiųjų šalių išlaidas.",
      },
      {
        q: "Ar dirbate su klientais visoje Lietuvoje?",
        a: "Taip, paslaugas siūlome verslams visoje Lietuvoje. Projekto informaciją ir pastabas galime derinti nuotoliu. Pokalbio formatą ir bendravimo kanalą sutariame prieš pradėdami.",
      },
    ],
  },
]

export const allFaq = faqGroups.flatMap((group) => group.items)

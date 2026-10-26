export const projectCategories = ["Visi", "AI ir LLM", "Web projektai", "Python"] as const
export type ProjectCategory = typeof projectCategories[number]

export type PersonalProject = {
  id: string
  title: string
  category: Exclude<ProjectCategory, "Visi">
  kind: string
  description: string
  technologies: string[]
  focus: string
  features: string[]
  story: { idea: string; problem: string; direction: string; lesson: string }
  screenshots?: { src: string; label: string; alt: string; width: number; height: number }[]
  repository?: string
}

// Curated from repository documentation and source on 2026-10-23.
// Only app is public; private repositories intentionally have no source links.
export const personalProjects: PersonalProject[] = [
  {
    id: "foreman", title: "Foreman", category: "AI ir LLM", kind: "Kuriamas įrankis",
    description: "Asmeninė AI programavimo darbų sistema: nuo užduoties plano ir darbo kortelių iki kodo patikrų bei peržiūros.",
    screenshots: [{"src": "/img/projects/foreman-board.jpg", "label": "Užduočių lenta", "alt": "Foreman užduočių lenta su modelių darbų eilėmis. Pradinė būsena be vykdomų užduočių.", "width": 1240, "height": 715}],
    story: {
      idea: "Pradėjau nuo klausimo: ar keli AI modeliai galėtų dirbti prie vieno projekto tvarkingiau, jei kiekvienas gautų mažą, aiškią užduotį? Taip atsirado Foreman — bandymas susikurti savo programavimo dirbtuves.",
      problem: "AI gali greitai parašyti kodą, bet kažkam vis tiek reikia išlaikyti bendrą kryptį, patikrinti rezultatą ir sujungti atskiras dalis. Norėjau mažiau rankinio užduočių nešiojimo tarp skirtingų įrankių.",
      direction: "Foreman laikau asmenine laboratorija, o ne užbaigtu produktu visiems. Naują funkciją verta pridėti tik tada, kai ji iš tikrųjų palengvina darbą — kitaip pats pagalbininkas tampa dar vienu projektu, kurį reikia prižiūrėti.",
      lesson: "Daugiau modelių savaime nereiškia geresnio rezultato. Aiški užduotis ir gera patikra dažnai svarbesnės už dar vieną agentą.",
    },
    technologies: ["TypeScript", "Node.js", "React", "SQLite", "Vitest"],
    focus: "Kaip paskirstyti programavimo užduotis skirtingiems modeliams ir vertinti jų rezultatą pagal patikras, o ne vien sugeneruotą kodą.",
    features: ["Komandinės eilutės įrankis ir web sąsaja užduotims stebėti.", "Užduočių vykdymo eiga su tipų, kodo ir testų patikromis.", "Modelių palyginimo eksperimentai, rezultatų istorija ir žinių biblioteka."],
  },
  {
    id: "pensila", title: "Pensila", category: "AI ir LLM", kind: "Asmeninis įrankis",
    description: "macOS meniu juostos programa su dviem pagalbininkais: TextFix teksto taisymui ir FileBox vietiniams failams.",
    story: {
      idea: "Pensila kilo iš paprasto noro: pažymėti sakinį, paspausti klavišą ir gauti aiškesnį tekstą ten pat, kur rašau. Nenorėjau dėl vienos pataisos nuolat atsidaryti atskiro pokalbio lango.",
      problem: "Maži pasikartojantys veiksmai — kopijavimas, langų keitimas, teksto grąžinimas atgal — išblaško labiau, nei atrodo. Prie teksto pagalbininko prisidėjo ir FileBox, skirtas patogiau pasiekti vietinius failus.",
      direction: "Projektą palikau orientuotą į savo darbo eigą. Padaryti patogų įrankį vienam kompiuteriui ir paruošti jį visiems macOS naudotojams yra skirtingos užduotys. Platesnį platinimą kol kas atidėjau.",
      lesson: "Kartais geras asmeninis projektas neturi tapti startuoliu. Pakanka, kad jis sutaupytų kelis nereikalingus veiksmus kasdien.",
    },
    technologies: ["Python", "macOS", "Vietinis LLM", "Node.js"],
    focus: "Kaip vietinį kalbos modelį patogiai pritaikyti kasdieniam darbui, neišeinant iš programos, kurioje rašau.",
    features: ["Pažymėto teksto taisymas ir perrašymas klaviatūros trumpiniais.", "Keli teksto režimai: aiškiau, trumpiau, formaliau arba vertimas.", "Atskiras FileBox langas vietiniams failams ir vaizdo įrašams."],
  },
  {
    id: "gintara", title: "Gintara", category: "AI ir LLM", kind: "MVP eksperimentas",
    description: "Žinių bazės prototipas logistikos įmonėms: dokumentai, atsakymai su šaltiniais ir transporto taisyklių pokyčių stebėjimas vienoje vietoje.",
    screenshots: [{"src": "/img/projects/gintara-answer.jpg", "label": "Atsakymas su šaltiniais", "alt": "Gintara pristatymo puslapyje pateiktas atsakymo su šaltiniais pavyzdys.", "width": 1231, "height": 710}, {"src": "/img/projects/gintara-home.jpg", "label": "Pristatymo puslapis", "alt": "Gintara pagrindinis puslapis apie įmonės žinių paiešką.", "width": 1231, "height": 710}],
    story: {
      idea: "Gintara prasidėjo nuo minties apie įmonės atmintį: kas nutinka žinioms, kai jos išmėtytos dokumentuose, laiškuose ir žmonių galvose? Norėjau pabandyti sukurti vietą, kur būtų galima tiesiog užduoti klausimą.",
      problem: "Logistikos situacijose neužtenka sklandžiai skambančio atsakymo. Svarbu žinoti jo šaltinį, ar informacija dar aktuali ir kuriam klientui ji taikoma. Todėl pagrindinis eksperimentas buvo atsakymai su nuorodomis į dokumentus.",
      direction: "Toliau plėsti vien techninę dalį nebūtų pakakę. Tokiam įrankiui reikia realių darbo situacijų ir nuolatinio specialistų grįžtamojo ryšio. Kol nėra tokio bendradarbiavimo, prasmingiau išlaikyti aiškų prototipą.",
      lesson: "AI produkto vertę lemia ne vien modelis. Duomenų kokybė, šaltiniai ir galimybė patikrinti atsakymą yra pačios produkto dalys.",
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "pgvector", "RAG"],
    focus: "Kaip pateikti naudingą AI atsakymą remiantis konkrečiais dokumentais ir parodyti, iš kur paimta informacija.",
    features: ["Dokumentų įkėlimas ir paieška jų turinyje.", "Pokalbio sąsaja su nuorodomis į atsakymo šaltinius.", "Klientų informacijos ir taisyklių pokyčių peržiūros."],
  },
  {
    id: "refernet", title: "ReferNet", category: "Web projektai", kind: "Platformos prototipas",
    description: "B2B platformos idėja agentūroms, kurios nori perduoti netinkamus užsakymus partneriams ir sekti rekomendacijų eigą.",
    screenshots: [{"src": "/img/projects/refernet-home.jpg", "label": "Pristatymo puslapis", "alt": "ReferNet pagrindinis puslapis apie užklausų perdavimą agentūroms.", "width": 1226, "height": 707}, {"src": "/img/projects/refernet-economics.jpg", "label": "Rekomendacijų modelis", "alt": "ReferNet puslapyje paaiškintas rekomendacijos mokesčio ir mokėjimų modelis.", "width": 1226, "height": 707}],
    story: {
      idea: "ReferNet idėja — užklausa, kuri netinka vienai agentūrai, gali būti geras projektas kitai. Norėjau išbandyti, kaip toks perdavimas galėtų vykti aiškiai, su matoma eiga ir sutartomis sąlygomis.",
      problem: "Paprasta rekomendacija dažnai pasibaigia persiųstu kontaktu. Vėliau neaišku, ar partneris susisiekė, kas vyksta su užklausa ir ar buvo laikomasi susitarimo. Platformos prototipas turėjo suteikti šiam procesui struktūrą.",
      direction: "Idėją pristabdžiau ties produkto patikrinimo riba: vien suprogramuoti partnerių sąrašą neužtenka. Pirmiausia reikia agentūrų, kurios norėtų taip bendradarbiauti. Be jų papildomos funkcijos būtų tik spėjimai.",
      lesson: "Prekyvietės sunkiausia dalis nebūtinai yra kodas. Kartais svarbiausias kitas žingsnis — pokalbis su būsimu naudotoju.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Zod"],
    focus: "Kaip sudėtingą partnerių ir rekomendacijų procesą paversti suprantama web produkto struktūra.",
    features: ["Idėją pristatantis puslapis ir registracijos į pilotą forma.", "Atskiros partnerių, rekomendacijų ir užklausų sritys kode.", "Darbo su formomis, validacija ir valdymo skydeliu eksperimentai."],
    repository: "https://github.com/Nojus-Siaulys/app",
  },
  {
    id: "car-market", title: "CarMarket", category: "Web projektai", kind: "Asmeninis prototipas",
    description: "Automobilių skelbimų ir prekybos platformos eksperimentas su katalogu, paieška bei atskiromis pirkėjo ir administratoriaus sritimis.",
    screenshots: [{"src": "/img/projects/carmarket-detail.jpg", "label": "Demonstracinis skelbimas", "alt": "CarMarket demonstracinis automobilio skelbimas su nuotraukomis, kaina ir pardavėjo informacija.", "width": 1274, "height": 717}, {"src": "/img/projects/carmarket-home.jpg", "label": "Pradinis puslapis", "alt": "CarMarket pradinis puslapis su automobilių paieška.", "width": 1274, "height": 717}],
    story: {
      idea: "CarMarket norėjau pasistatyti kaip didesnę web kūrimo treniruotę. Automobilių platforma tam patogi: čia susitinka katalogas, paieška, paskyros, nuotraukos ir skirtingi naudotojų veiksmai.",
      problem: "Kai skelbimų daug, gražaus pradinio puslapio neužtenka. Žmogus turi greitai atsirinkti tinkamus automobilius, išsisaugoti dominančius ir suprasti, ką daryti toliau. Mane domino visas šis kelias, ne vien atskiros kortelės dizainas.",
      direction: "Palikau projektą prototipo stadijoje: mokymosi tikslas buvo išbandyti platesnę sistemos struktūrą, o ne paleisti dar vieną skelbimų verslą. Realiam produktui papildomai reikėtų skelbimų kokybės priežiūros ir nuolatinio administravimo.",
      lesson: "Didesnė svetainė nėra tiesiog daugiau puslapių. Katalogas, paskyros ir administravimas turi veikti kaip vienas nuoseklus produktas.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Drizzle", "PostgreSQL"],
    focus: "Kaip sujungti katalogo paiešką, vartotojo paskyrą ir prekybos eigą viename didesniame web projekte.",
    features: ["Automobilių katalogo ir paieškos puslapiai su demonstraciniais duomenimis.", "Mėgstamų skelbimų, pardavimo ir užsakymų sritys.", "Prisijungimo, administravimo ir atsiskaitymo integracijų struktūra."],
  },
  {
    id: "python-bot", title: "Python automatizavimo botas", category: "Python", kind: "Tyrimų eksperimentas",
    description: "Python projektas, kuriame tyrinėjau Polymarket įvykių stebėjimą, asinchroninį duomenų rinkimą ir strategijų simuliavimą.",
    story: {
      idea: "Šį botą pradėjau iš techninio smalsumo: norėjau suprasti, kaip programa gali stebėti įvykius, apdoroti kelis duomenų srautus ir pagal taisykles nuspręsti, ką daryti toliau.",
      problem: "Su gyvais duomenimis viskas vyksta ne taip tvarkingai kaip trumpame kodo pavyzdyje. Užklausos vėluoja, duomenys kartojasi, ryšys nutrūksta. Dėl to nemaža projekto dalis tapo būsenos, klaidų ir simuliacijų valdymu.",
      direction: "Projektą palikau tyrimų ir simuliavimo lygmenyje. Mane čia labiau domino automatizavimo logika nei nuolat veikiančio prekybos įrankio palaikymas. Simuliacija pati savaime neįrodo, kaip sistema elgtųsi realiomis sąlygomis.",
      lesson: "Svarbu patikrinti ne tik sėkmingą scenarijų. Sistema daug apie save pasako tada, kai duomenų trūksta arba kažkas neveikia.",
    },
    technologies: ["Python", "asyncio", "aiohttp", "SQLite"],
    focus: "Asinchroniniai procesai, būsenos saugojimas ir taisyklių tikrinimas simuliacijose. Tai techninis eksperimentas, be pažadų apie finansinius rezultatus.",
    features: ["Asinchroninis darbas su išoriniais duomenų šaltiniais.", "Atskiri istorinių duomenų analizės ir simuliavimo scenarijai.", "Būsenos saugojimo bei veiksmų žurnalo logika."],
  },
  {
    id: "portfolio", title: "Portfolio eksperimentai", category: "Web projektai", kind: "Dizaino ir kodo studijos",
    description: "Asmeninės portfolio svetainės versijos, kuriose bandžiau skirtingą dizainą, animacijas ir savo darbų pristatymo būdus.",
    screenshots: [{"src": "/img/projects/portfolio-home.jpg", "label": "WebGenas / lietuviška versija", "alt": "Ankstesnės WebGenas portfolio versijos pagrindinis puslapis lietuvių kalba.", "width": 1265, "height": 712}],
    story: {
      idea: "Portfolio versijos buvo vieta išbandyti tai, ko nebūtinai dėčiau į kliento svetainę: kitokį judesį, drąsesnį išdėstymą ar naują vizualinį efektą. Kartu ieškojau, kaip geriausiai pristatyti savo darbus.",
      problem: "Lengva pasidaryti puslapį, kuris patinka pačiam kūrėjui, bet lankytojui nepasako, ką jis moka. Bandžiau rasti balansą tarp charakterio, aiškaus turinio ir patogaus naršymo.",
      direction: "Senesnes versijas palikau kaip bandymų archyvą. Kiekvienos idėjos neverta prižiūrėti kaip atskiro gyvo puslapio — geresnius sprendimus galima pasiimti į kitą versiją, o likusius tiesiog palikti kaip mokymosi etapą.",
      lesson: "Efektas turi padėti turiniui. Jei lankytojas prisimena tik animaciją, bet nesupranta, ką siūlau, dizainas dar nebaigtas.",
    },
    technologies: ["Next.js", "React", "Tailwind CSS", "Motion"],
    focus: "Kaip turinį, judesį ir puslapių struktūrą suderinti taip, kad žmogui būtų lengva susipažinti su mano darbais.",
    features: ["Projektų pristatymo, tinklaraščio ir kainodaros puslapių struktūra.", "Kelių kalbų maršrutai ir dalijimosi vaizdai.", "Animacijų, vizualinių efektų ir formų eksperimentai."],
  },
]

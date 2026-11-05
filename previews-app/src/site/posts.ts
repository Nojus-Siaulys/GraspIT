import { prices } from "./pricing.js"

// Blog articles. Inline links use [text](/path/) and are rendered as normal anchors.
// Keep facts general and checkable: no invented statistics, no promised rankings.
export type Block = string | { list: string[] } | { steps: string[] }
export type Post = {
  slug: string
  title: string
  metaTitle: string
  description: string
  label: string
  date: string
  updated?: string
  minutes: number
  summary: string[]
  sections: { h: string; body: Block[] }[]
  faq?: { q: string; a: string }[]
  related: { href: string; text: string }[]
}

export const blogAuthor = "GraspIT komanda"

export const posts: Post[] = [
  {
    slug: "kiek-kainuoja-svetaine",
    title: "Kiek kainuoja svetainė verslui 2026 metais?",
    metaTitle: "Kiek kainuoja svetainė verslui 2026 m.? Kainos ir išlaidos | GraspIT",
    description:
      "Kas lemia svetainės kainą, kokios išlaidos yra vienkartinės, o kokios kartojasi kasmet, ir kaip palyginti kelis pasiūlymus.",
    label: "Kainos",
    date: "2026-11-05",
    minutes: 6,
    summary: [
      `Paprasta verslo svetainė GraspIT kainuoja nuo ${prices.website}, verslo svetainė su turinio valdymu ar el. parduotuvė – nuo ${prices.shop}.`,
      "Kainą labiausiai lemia puslapių skaičius, funkcijos, turinio paruošimas ir integracijos.",
      "Domenas, talpinimas ir priežiūra – periodinės išlaidos, jas verta atskirti nuo vienkartinės kūrimo kainos.",
      "Lyginkite ne tik sumą, bet ir tai, kas tiksliai įeina į pasiūlymą.",
    ],
    sections: [
      {
        h: "Kodėl svetainių kainos taip skiriasi?",
        body: [
          "Klausimas „kiek kainuoja svetainė?“ panašus į klausimą „kiek kainuoja namas?“. Vienas atsakymas neegzistuoja, nes po tuo pačiu žodžiu slepiasi labai skirtingi darbai: nuo vieno puslapio vizitinės kortelės iki el. parduotuvės su šimtais prekių, mokėjimais ir pristatymu.",
          "Todėl naudingiau suprasti, iš ko kaina susideda. Tada skirtingus pasiūlymus galima palyginti sąžiningai.",
        ],
      },
      {
        h: "Kas lemia svetainės kainą",
        body: [
          {
            list: [
              "Puslapių skaičius ir struktūra. Keturių puslapių svetainė (pradžia, paslaugos, apie, kontaktai) reikalauja mažiau darbo nei dvidešimties puslapių svetainė su atskiru puslapiu kiekvienai paslaugai.",
              "Funkcijos. Kontaktų forma, rezervacijos, kelios kalbos, turinio valdymas, klientų paskyros ar prekių katalogas – kiekviena funkcija prideda darbo ir testavimo.",
              "Turinys. Jei tekstus ir nuotraukas turite, darbas paprastesnis. Jei juos reikia sukurti, tai atskira apimtis.",
              "Dizainas. Pritaikytas šablonas ir nuo nulio kuriamas dizainas skiriasi laiku.",
              "Integracijos. Mokėjimai, siuntų tarnybos, buhalterinė apskaita ar CRM sistema dažnai turi ir savo mokesčius.",
            ],
          },
        ],
      },
      {
        h: "Vienkartinės ir periodinės išlaidos",
        body: [
          "Dažna klaida – žiūrėti tik į kūrimo kainą. Svetainė turi ir išlaidų, kurios kartojasi:",
          {
            list: [
              "Domenas (pvz., jusuverslas.lt) registruojamas metams ir kasmet pratęsiamas.",
              "Talpinimas (serveris, kuriame veikia svetainė) dažniausiai mokamas kas mėnesį arba kas metus.",
              "Priežiūra: atnaujinimai, atsarginės kopijos, smulkūs pakeitimai. Ypač svarbu WordPress svetainėms, kurių įskiepius reikia reguliariai atnaujinti.",
              "Mokamos paslaugos: el. pašto dėžutės, rezervacijų sistemos, mokėjimų operatorių komisiniai.",
            ],
          },
          "Prieš pasirašydami paprašykite, kad pasiūlyme šios išlaidos būtų išvardytos atskirai. Taip išvengsite netikėtumų po paleidimo.",
        ],
      },
      {
        h: "Konstruktorius, šablonas ar individuali svetainė?",
        body: [
          "Svetainių konstruktoriai leidžia pradėti pigiai, tačiau už platformą paprastai mokama kas mėnesį, o išsikraustyti į kitą platformą būna sudėtinga. Šabloninė WordPress svetainė – lankstesnė, bet reikalauja priežiūros. Individualiai kurta svetainė kainuoja daugiau darbo pradžioje, tačiau ją galima tiksliai pritaikyti jūsų verslui ir greičiui.",
          "Nė vienas variantas nėra „teisingas“ visiems. Svarbiausia, kad žinotumėte, ką gaunate, kam priklausys svetainė ir kiek kainuos ją išlaikyti.",
        ],
      },
      {
        h: "Kiek kainuoja svetainė GraspIT",
        body: [
          `Pradinė iki 4 puslapių svetainė kainuoja nuo ${prices.website}, orientacinis terminas – 7 dienos. Verslo svetainė su turinio valdymu ar el. parduotuvė – nuo ${prices.shop}, orientacinis terminas – 14 dienų. Galutinę kainą fiksuojame pasiūlyme prieš pradėdami darbą. Daugiau – [kainų puslapyje](/kainos/).`,
          "Į kainą įeina pritaikymas telefonams, kodo ir turinio perdavimas bei 30 dienų pagalba po paleidimo. Domenas, talpinimas ir mokamos integracijos aptariami atskirai.",
        ],
      },
      {
        h: "Kaip palyginti kelis pasiūlymus",
        body: [
          {
            steps: [
              "Ar pasiūlyme išvardyti konkretūs puslapiai ir funkcijos?",
              "Ar kaina fiksuota, ar skaičiuojama valandomis?",
              "Kas paruošia tekstus ir nuotraukas?",
              "Ar po paleidimo gausite kodą ir prieigas – kam priklausys svetainė?",
              "Kokia pagalba įeina po paleidimo ir kiek kainuos vėlesnė priežiūra?",
              "Ar svetainė bus paruošta paieškai: antraštės, aprašymai, greitis, [techninis SEO](/blogas/techninis-seo-sarasas/)?",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: "Ar galima sukurti svetainę nemokamai?",
        a: "Kai kurie konstruktoriai turi nemokamus planus, tačiau juose dažniausiai rodoma platformos reklama, nėra nuosavo domeno ir ribojamos funkcijos. Verslui paprastai reikia bent nuosavo domeno ir talpinimo, todėl visiškai nemokama svetainė retai būna tinkama.",
      },
      {
        q: "Kiek kainuoja svetainės priežiūra per metus?",
        a: "Tai priklauso nuo svetainės tipo ir darbų: talpinimo, atnaujinimų, atsarginių kopijų ir smulkių pakeitimų. Paprašykite, kad priežiūros darbai ir kaina būtų įvardyti atskirai nuo kūrimo.",
      },
    ],
    related: [
      { href: "/kainos/", text: "Svetainių kūrimo kainos ir paketai" },
      { href: "/paslaugos/svetaines/", text: "Verslo svetainių kūrimas" },
      { href: "/duk/#kaina", text: "DUK apie kainą ir susitarimą" },
    ],
  },
  {
    slug: "svetaine-ar-socialiniai-tinklai",
    title: "Ar verslui reikia svetainės, jei turite Facebook ir Instagram?",
    metaTitle: "Svetainė ar tik Facebook? Ko reikia mažam verslui | GraspIT",
    description:
      "Socialiniai tinklai padeda bendrauti, svetainė – būti randamam. Kuo skiriasi jų vaidmuo ir kada verslui verta turėti abu.",
    label: "Strategija",
    date: "2026-11-05",
    minutes: 5,
    summary: [
      "Socialiniai tinklai tinka bendrauti ir rodyti naujienas, bet jūs nekontroliuojate, kas mato jūsų įrašus.",
      "Svetainė yra jūsų nuosava vieta: ją randa Google, ją cituoja AI asistentai, joje informacija neišnyksta sraute.",
      "Daugeliui vietinių verslų geriausiai veikia abu kanalai kartu: soc. tinklai atveda, svetainė įtikina ir padeda susisiekti.",
    ],
    sections: [
      {
        h: "Ką duoda socialiniai tinklai",
        body: [
          "Facebook ir Instagram puikiai tinka parodyti naujus darbus, akcijas ir kasdienybę. Žmonės ten jau leidžia laiką, todėl lengva pasiekti esamus sekėjus ir greitai atsakyti į žinutes.",
          "Tačiau yra ribų. Įrašų matomumą lemia platformos algoritmas, senesni įrašai pasimeta, o paskyra priklauso ne jums – ją gali apriboti ar užblokuoti platforma.",
        ],
      },
      {
        h: "Ką duoda svetainė",
        body: [
          {
            list: [
              "Jus randa paieškoje. Žmogus, ieškantis „kalvystės darbai Klaipėdoje“ ar „kirpėjų folija“, dažniausiai pradeda Google, o ne Facebook.",
              "AI asistentai remiasi svetainėmis. ChatGPT, Perplexity ir Google AI atsakymai dažnai cituoja viešai pasiekiamas svetaines. Apie tai plačiau – straipsnyje [kaip atsirasti AI atsakymuose](/blogas/geo-ai-paieska/).",
              "Informacija lieka vietoje. Paslaugos, kainos, DUK ir kontaktai nedingsta po savaitės.",
              "Daugiau pasitikėjimo. Aiški svetainė su atliktais darbais ir kontaktais daugeliui klientų yra ženklas, kad verslas veikia rimtai.",
              "Jūs kontroliuojate. Dizainas, turinys ir domenas priklauso jums.",
            ],
          },
        ],
      },
      {
        h: "Kada užtenka tik socialinių tinklų",
        body: [
          "Jei tik pradedate ir tikrinate idėją, socialinių tinklų paskyra gali būti pakankama pradžia. Bet kai norite, kad klientai jus rastų patys, ypač per Google, svetainė tampa būtina.",
        ],
      },
      {
        h: "Kokios svetainės užtenka pradžiai",
        body: [
          "Mažam paslaugų verslui dažnai pakanka 3–4 puslapių: pradžios, paslaugų, informacijos apie jus ir kontaktų. Svarbiausia, kad lankytojas per kelias sekundes suprastų, ką siūlote, kur dirbate ir kaip susisiekti.",
          `Tokią [pradinę svetainę](/paslaugos/svetaines/) kuriame nuo ${prices.website}. Ją vėliau galima plėsti – pridėti daugiau paslaugų puslapių, blogą ar parduotuvę.`,
          "Svetainę verta susieti su socialiniais tinklais ir [Google verslo profiliu](/blogas/google-verslo-profilis/): taip visi kanalai veda į tą pačią vietą.",
        ],
      },
    ],
    related: [
      { href: "/paslaugos/svetaines/", text: "Svetainių kūrimas verslui" },
      { href: "/darbai/", text: "Mūsų atlikti darbai" },
      { href: "/blogas/kiek-kainuoja-svetaine/", text: "Kiek kainuoja svetainė" },
    ],
  },
  {
    slug: "techninis-seo-sarasas",
    title: "Techninis SEO mažo verslo svetainei: 12 punktų sąrašas",
    metaTitle: "Techninis SEO: 12 punktų sąrašas verslo svetainei | GraspIT",
    description:
      "Praktinis techninio SEO sąrašas: indeksavimas, antraštės, sitemap, greitis, mobilioji versija, struktūriniai duomenys ir Search Console.",
    label: "SEO",
    date: "2026-11-05",
    minutes: 8,
    summary: [
      "Techninis SEO užtikrina, kad Google galėtų rasti, perskaityti ir suprasti jūsų svetainę.",
      "Svarbiausi dalykai: pasiekiamas turinys, unikalūs pavadinimai ir aprašymai, sitemap, greitis, mobilioji versija ir HTTPS.",
      "Struktūriniai duomenys ir vidinės nuorodos padeda paieškos sistemoms ir AI suprasti, kas jūs esate ir ką siūlote.",
      "Techninis SEO negarantuoja pozicijų, bet be jo net geras turinys gali likti nepastebėtas.",
    ],
    sections: [
      {
        h: "Kas yra techninis SEO",
        body: [
          "SEO (paieškos optimizavimas) turi tris dalis: techninę, turinio ir autoriteto. Techninė dalis – tai pamatas: ar paieškos sistemos gali pasiekti jūsų puslapius, ar jie greiti, ar aišku, apie ką kiekvienas puslapis. Toliau – sąrašas, kurį galite naudoti savo svetainei patikrinti.",
        ],
      },
      {
        h: "12 punktų sąrašas",
        body: [
          {
            steps: [
              "Turinys pasiekiamas be JavaScript. Jei svetainė rodo tekstą tik įsikrovus skriptams, paieškos robotai gali jo nematyti arba matyti vėliau. Geriausia, kai HTML jau turi visą tekstą (statinis generavimas ar serverio atvaizdavimas).",
              "Unikalus pavadinimas (title) kiekvienam puslapiui. Apie 50–60 simbolių, su pagrindiniu raktažodžiu ir prekės ženklu.",
              "Unikalus aprašymas (meta description). Jis dažnai rodomas paieškos rezultatuose ir turi paskatinti paspausti.",
              "Viena H1 antraštė puslapyje ir logiška H2–H3 hierarchija.",
              "Aiškūs adresai: /paslaugos/svetaines/, o ne /?p=123. Lietuviški žodžiai be lietuviškų raidžių adresuose veikia patikimiausiai.",
              "sitemap.xml ir robots.txt. Sitemap praneša, kokie puslapiai yra, robots.txt – ką robotams galima lankyti.",
              "Kanoniniai adresai (canonical), kad tas pats turinys nebūtų indeksuojamas keliais adresais.",
              "Mobilioji versija. Google svetaines vertina pagal mobiliąją versiją, todėl tekstas, mygtukai ir meniu turi gerai veikti telefone.",
              "Greitis. Stebėkite Core Web Vitals rodiklius: LCP (kaip greitai pasirodo pagrindinis turinys), INP (kaip greitai reaguoja į paspaudimus) ir CLS (ar turinys „nešokinėja“). Suspauskite nuotraukas, pvz., į WebP formatą.",
              "HTTPS. Saugus ryšys šiandien yra būtinas minimumas.",
              "Struktūriniai duomenys (Schema.org). Pažymėkite organizaciją, paslaugas, DUK ir straipsnius, kad paieškos sistemos aiškiau suprastų turinį.",
              "Google Search Console. Prijunkite svetainę, pateikite sitemap ir stebėkite indeksavimo klaidas bei paieškos užklausas.",
            ],
          },
        ],
      },
      {
        h: "Dažnos klaidos",
        body: [
          {
            list: [
              "Visi puslapiai su tuo pačiu pavadinimu, pvz., „Pradžia“.",
              "Svarbi informacija (kainos, darbo laikas) tik paveikslėlyje – robotai jos neperskaito.",
              "Atnaujinant svetainę pakeisti adresai be 301 peradresavimų. Apie tai – straipsnyje [kada atnaujinti svetainę](/blogas/kada-atnaujinti-svetaine/).",
              "Puslapiai, į kuriuos niekas nenukreipia. Vidinės nuorodos padeda ir lankytojams, ir robotams.",
              "Užmirštas „noindex“ žymėjimas po bandomosios versijos.",
            ],
          },
        ],
      },
      {
        h: "Ką daryti toliau",
        body: [
          "Techninis SEO yra pamatas, o ne visas namas. Kai jis tvarkingas, verta investuoti į naudingą turinį – paslaugų aprašymus, atsakymus į klientų klausimus, straipsnius. Taip pat verta pasirūpinti, kad jus suprastų ir [AI paieškos sistemos](/blogas/geo-ai-paieska/).",
          "Visas GraspIT kuriamas svetaines paruošiame pagal šį sąrašą. Jei turite svetainę, kuri neatitinka daugumos punktų, verta pagalvoti apie [svetainės atnaujinimą](/paslaugos/svetainiu-atnaujinimas/).",
        ],
      },
    ],
    faq: [
      {
        q: "Kiek laiko užtrunka, kol Google suindeksuoja naują svetainę?",
        a: "Tai gali užtrukti nuo kelių dienų iki kelių savaičių. Procesą pagreitina sitemap pateikimas Google Search Console ir nuorodos į svetainę iš kitų vietų, pavyzdžiui, Google verslo profilio ar socialinių tinklų.",
      },
      {
        q: "Ar techninis SEO garantuoja pirmą vietą Google?",
        a: "Ne. Pozicijas lemia konkurencija, turinio nauda, svetainės autoritetas ir daugybė kitų veiksnių. Techninis SEO pašalina kliūtis, kad turinys apskritai galėtų konkuruoti.",
      },
    ],
    related: [
      { href: "/paslaugos/svetaines/", text: "Svetainės, paruoštos paieškai" },
      { href: "/paslaugos/svetainiu-atnaujinimas/", text: "Esamos svetainės atnaujinimas" },
      { href: "/duk/#seo", text: "DUK apie SEO" },
    ],
  },
  {
    slug: "geo-ai-paieska",
    title: "Kaip verslui atsirasti ChatGPT, Perplexity ir Google AI atsakymuose",
    metaTitle: "GEO: kaip atsirasti ChatGPT ir AI paieškos atsakymuose | GraspIT",
    description:
      "Kas yra GEO (generatyvinių paieškos sistemų optimizavimas) ir ką vietinis verslas gali padaryti, kad AI asistentai jį rastų ir paminėtų.",
    label: "GEO",
    date: "2026-11-05",
    minutes: 7,
    summary: [
      "GEO – tai svetainės paruošimas taip, kad AI asistentai galėtų rasti, suprasti ir cituoti jūsų informaciją.",
      "AI robotams turi būti leista lankyti svetainę, o svarbūs faktai turi būti parašyti tekstu, ne paveikslėliuose.",
      "Klausimų ir atsakymų formatas, struktūriniai duomenys ir nuosekli informacija visame internete padeda labiausiai.",
      "Paminėjimo AI atsakymuose niekas negali garantuoti, bet galima ženkliai padidinti tikimybę.",
    ],
    sections: [
      {
        h: "Kas yra GEO",
        body: [
          "Vis daugiau žmonių klausimų užduoda ne paieškos laukelyje, o AI asistentui: „Kas Klaipėdoje gali sukurti svetainę?“, „Kiek kainuoja el. parduotuvė?“. Atsakymą sudaro AI, remdamasis šaltiniais internete.",
          "GEO (angl. Generative Engine Optimization) – tai darbai, kurie padeda jūsų svetainei tapti tokiu šaltiniu. Jie labai panašūs į gerą SEO, tik dar daugiau dėmesio skiriama aiškiems faktams ir struktūrai.",
        ],
      },
      {
        h: "Kaip AI asistentai randa informaciją",
        body: [
          "AI paieškos įrankiai naudoja savo robotus ir paieškos indeksus. Pavyzdžiui, OpenAI naudoja OAI-SearchBot ir GPTBot, Anthropic – ClaudeBot, Perplexity – PerplexityBot, o Google AI atsakymai remiasi Google paieškos indeksu.",
          "Jei svetainės robots.txt faile šie robotai užblokuoti arba turinys matomas tik įsikrovus JavaScript, AI jūsų informacijos gali tiesiog nematyti.",
        ],
      },
      {
        h: "7 žingsniai, kad AI suprastų jūsų verslą",
        body: [
          {
            steps: [
              "Leiskite AI robotams lankyti svetainę. Patikrinkite robots.txt – ar jame neužblokuoti GPTBot, OAI-SearchBot, ClaudeBot ir PerplexityBot.",
              "Rašykite faktus tekstu. Kas esate, ką siūlote, kur dirbate, kiek kainuoja, kaip susisiekti – tai turi būti aiškiai parašyta, ne vien nuotraukose ar PDF failuose.",
              "Atsakykite į klientų klausimus. Atskiras [DUK puslapis](/duk/) ir trumpi, tiesioginiai atsakymai labai tinka AI citatoms.",
              "Pirmiausia – esmė. Puslapio ar straipsnio pradžioje parašykite trumpą santrauką, o detales – toliau.",
              "Naudokite struktūrinius duomenis. Schema.org žymėjimai (Organization, Service, FAQPage, Article) aiškiai aprašo, kas yra kas.",
              "Būkite nuoseklūs visur. Tas pats pavadinimas, adresas ir kontaktai svetainėje, [Google verslo profilyje](/blogas/google-verslo-profilis/) ir kataloguose.",
              "Pridėkite llms.txt failą. Tai siūlomas (dar ne oficialus) standartas – trumpas svetainės turinio žemėlapis AI įrankiams. Jis negarantuoja rezultato, bet kainuoja nedaug.",
            ],
          },
        ],
      },
      {
        h: "Ko nedaryti",
        body: [
          {
            list: [
              "Nekurkite šimtų beverčių puslapių vien dėl raktažodžių – AI ir Google tokį turinį vertina prastai.",
              "Neslėpkite kainų ar sąlygų, jei jas galite atskleisti. Konkretūs faktai cituojami dažniau nei miglotas tekstas.",
              "Netikėkite pažadais „garantuotai būsite ChatGPT atsakyme“. To negali pažadėti niekas.",
            ],
          },
        ],
      },
      {
        h: "Kaip tai daroma GraspIT svetainėse",
        body: [
          "Kurdami svetaines generuojame visą tekstą statiniame HTML, žymime struktūrinius duomenis, ruošiame DUK, robots.txt su AI robotų leidimais ir llms.txt failą. Tai dalis mūsų [techninio SEO](/blogas/techninis-seo-sarasas/) pagrindo. Plačiau – [svetainių kūrimo puslapyje](/paslaugos/svetaines/).",
        ],
      },
    ],
    faq: [
      {
        q: "Ar GEO pakeičia SEO?",
        a: "Ne. GEO remiasi tais pačiais pagrindais: pasiekiamu, aiškiu ir naudingu turiniu. Svetainė, kuri gerai paruošta Google paieškai, dažniausiai turi gerą pagrindą ir AI paieškai.",
      },
      {
        q: "Ar reikia blokuoti AI robotus, kad jie nenaudotų mano turinio?",
        a: "Tai verslo sprendimas. Jei užblokuosite AI paieškos robotus, sumažės tikimybė, kad AI asistentai paminės jūsų verslą. Daugeliui paslaugų verslų matomumas svarbesnis, todėl robotus verta leisti.",
      },
    ],
    related: [
      { href: "/paslaugos/svetaines/", text: "Svetainės, paruoštos SEO ir AI paieškai" },
      { href: "/blogas/techninis-seo-sarasas/", text: "Techninio SEO sąrašas" },
      { href: "/duk/#seo", text: "DUK apie SEO" },
    ],
  },
  {
    slug: "kada-atnaujinti-svetaine",
    title: "7 ženklai, kad laikas atnaujinti verslo svetainę",
    metaTitle: "Kada atnaujinti svetainę? 7 ženklai ir patarimai | GraspIT",
    description:
      "Kaip suprasti, kad svetainė pasenusi, ir kaip ją atnaujinti neprarandant paieškos pozicijų bei lankytojų.",
    label: "Atnaujinimas",
    date: "2026-11-05",
    minutes: 5,
    summary: [
      "Jei svetainė nepatogi telefone, lėta ar nebeatspindi jūsų veiklos, ji greičiausiai atbaido klientus.",
      "Atnaujinti nebūtinai reiškia kurti iš naujo: kartais užtenka dizaino ir struktūros pokyčių.",
      "Keičiant adresus būtina suplanuoti 301 peradresavimus, kitaip galima prarasti paieškos pozicijas.",
    ],
    sections: [
      {
        h: "7 ženklai, kad svetainei reikia atnaujinimo",
        body: [
          {
            steps: [
              "Telefone tekstas per smulkus, mygtukai per maži, reikia didinti ekraną.",
              "Svetainė krauna ilgai, ypač mobiliuoju internetu.",
              "Paslaugos, kainos ar kontaktai pasenę, o juos pakeisti sudėtinga.",
              "Dizainas atrodo pasenęs ir nebeatspindi jūsų verslo lygio.",
              "Lankytojai skambina klausti to, kas turėtų būti parašyta svetainėje.",
              "WordPress ar įskiepiai seniai neatnaujinti, rodomi įspėjimai.",
              "Svetainės beveik nėra Google paieškoje pagal jūsų paslaugas.",
            ],
          },
        ],
      },
      {
        h: "Atnaujinti ar kurti iš naujo?",
        body: [
          "Jei svetainės pagrindas tvarkingas, dažnai pakanka atnaujinti dizainą, struktūrą ir pritaikyti telefonams. Jei sistema pasenusi, lėta ir sunkiai prižiūrima, kurti iš naujo gali būti pigiau ilgalaikėje perspektyvoje. Sprendimą verta priimti įvertinus dabartinę svetainę.",
        ],
      },
      {
        h: "Kaip atnaujinti neprarandant paieškos pozicijų",
        body: [
          {
            list: [
              "Prieš pradedant užsirašykite visus esamus adresus ir puslapius, kurie atveda daugiausia lankytojų (Google Search Console).",
              "Jei adresai keičiasi, kiekvienam senam adresui nustatykite 301 peradresavimą į naują atitikmenį.",
              "Išlaikykite vertingą turinį: tekstus, kurie atsako į klientų klausimus, nereikėtų tiesiog ištrinti.",
              "Po paleidimo pateikite naują sitemap ir stebėkite indeksavimo klaidas.",
              "Patikrinkite pavadinimus, aprašymus ir [techninį SEO](/blogas/techninis-seo-sarasas/) prieš ir po paleidimo.",
            ],
          },
        ],
      },
      {
        h: "Kaip dirbame mes",
        body: [
          "Pirmiausia įvertiname dabartinę svetainę ir pasakome, ką verta išlaikyti. Tada suderiname darbų apimtį ir kainą. Dirbame ir su WordPress svetainėmis. Daugiau – [svetainių atnaujinimo puslapyje](/paslaugos/svetainiu-atnaujinimas/).",
        ],
      },
    ],
    related: [
      { href: "/paslaugos/svetainiu-atnaujinimas/", text: "Svetainės dizaino atnaujinimas" },
      { href: "/procesas/", text: "Kaip vyksta projektas" },
      { href: "/darbai/", text: "Atlikti darbai" },
    ],
  },
  {
    slug: "google-verslo-profilis",
    title: "Google verslo profilis: kaip vietiniam verslui atsirasti Google Maps",
    metaTitle: "Google verslo profilis: vietinis SEO ir Google Maps | GraspIT",
    description:
      "Kaip susikurti ir sutvarkyti Google verslo profilį, kad vietiniai klientai jus rastų Google paieškoje ir žemėlapiuose.",
    label: "Vietinis SEO",
    date: "2026-11-05",
    minutes: 6,
    summary: [
      "Google verslo profilis (Google Business Profile) yra nemokamas ir rodomas Google paieškoje bei Maps.",
      "Tiksli kategorija, darbo laikas, nuotraukos ir nuoroda į svetainę – pagrindiniai dalykai.",
      "Tikri atsiliepimai ir atsakymai į juos stiprina pasitikėjimą.",
      "Profilis ir svetainė turi rodyti tą pačią informaciją.",
    ],
    sections: [
      {
        h: "Kodėl tai svarbu vietiniam verslui",
        body: [
          "Kai žmogus ieško paslaugos netoliese – „autoservisas Kretingoje“, „kirpykla Klaipėdoje“ – Google dažnai pirmiausia rodo žemėlapį su vietos verslais. Ten patenkama per Google verslo profilį. Jis nemokamas, todėl tai vienas naudingiausių žingsnių vietiniam verslui be jokių reklamos išlaidų.",
        ],
      },
      {
        h: "Kaip susikurti ir patvirtinti profilį",
        body: [
          {
            steps: [
              "Eikite į business.google.com ir prisijunkite su verslo Google paskyra.",
              "Įveskite tikslų verslo pavadinimą – tokį, kokį naudojate ir svetainėje.",
              "Pasirinkite pagrindinę kategoriją, kuri tiksliausiai apibūdina veiklą. Papildomas kategorijas pridėkite tik jei jos tikrai atitinka.",
              "Nurodykite adresą arba aptarnavimo zoną, jei važiuojate pas klientus.",
              "Pridėkite telefoną ir svetainės adresą.",
              "Patvirtinkite verslą Google nurodytu būdu.",
            ],
          },
        ],
      },
      {
        h: "Kaip profilį sutvarkyti, kad jis veiktų",
        body: [
          {
            list: [
              "Darbo laikas – tikslus, su šventinių dienų pakeitimais.",
              "Nuotraukos – tikros: patalpos, komanda, atlikti darbai. Ne nuotraukų bankų vaizdai.",
              "Paslaugų ar prekių sąrašas su trumpais aprašymais.",
              "Aprašymas – kas esate, ką darote ir kur dirbate, paprasta kalba.",
              "Reguliarūs įrašai apie naujienas ar atliktus darbus.",
            ],
          },
        ],
      },
      {
        h: "Atsiliepimai",
        body: [
          "Paprašykite patenkintų klientų palikti atsiliepimą – geriausia iš karto po darbo, su tiesiogine nuoroda. Atsakykite į visus atsiliepimus, taip pat ir neigiamus, ramiai ir konkrečiai. Niekada nepirkite atsiliepimų ir nerašykite jų patys: tai pažeidžia Google taisykles ir gali baigtis profilio apribojimu.",
        ],
      },
      {
        h: "Profilis ir svetainė turi veikti kartu",
        body: [
          "Profilis atveda žmogų, svetainė jį įtikina: parodo paslaugas, kainas, atliktus darbus ir atsakymus į klausimus. Pasirūpinkite, kad pavadinimas, adresas ir telefonas sutaptų visur – tai padeda ir Google, ir [AI paieškos sistemoms](/blogas/geo-ai-paieska/) suprasti, kad tai tas pats verslas.",
          "Jei dar neturite svetainės, į kurią galėtų vesti profilis, pradėkite nuo [paprastos verslo svetainės](/paslaugos/svetaines/).",
        ],
      },
    ],
    faq: [
      {
        q: "Ar Google verslo profilis mokamas?",
        a: "Ne, Google verslo profilis yra nemokamas. Mokamos tik Google reklamos, jei nuspręsite jas naudoti.",
      },
      {
        q: "Ar galiu turėti profilį, jei neturiu fizinio biuro?",
        a: "Taip. Jei paslaugas teikiate pas klientus, galite nurodyti aptarnavimo zoną ir paslėpti tikslų adresą.",
      },
    ],
    related: [
      { href: "/paslaugos/svetaines/", text: "Svetainės vietiniam verslui" },
      { href: "/blogas/svetaine-ar-socialiniai-tinklai/", text: "Svetainė ar socialiniai tinklai?" },
      { href: "/blogas/geo-ai-paieska/", text: "Kaip atsirasti AI atsakymuose" },
    ],
  },
  {
    slug: "kaip-pradeti-el-parduotuve",
    title: "Ko reikia norint pradėti el. parduotuvę Lietuvoje",
    metaTitle: "Kaip pradėti el. parduotuvę Lietuvoje: kontrolinis sąrašas | GraspIT",
    description:
      "Prekės, mokėjimai, pristatymas, pirkimo taisyklės ir parduotuvės sistema: ką apgalvoti prieš kuriant el. parduotuvę.",
    label: "El. prekyba",
    date: "2026-11-05",
    minutes: 7,
    summary: [
      "Prieš kuriant parduotuvę verta apgalvoti asortimentą, mokėjimų ir pristatymo būdus bei pirkimo taisykles.",
      "Lietuvoje pirkėjai įpratę prie elektroninės bankininkystės mokėjimų ir siuntų į paštomatus.",
      "Pirkimo taisyklės, privatumo politika ir informacija apie grąžinimą yra privalomos dalys, ne formalumas.",
      `El. parduotuvę GraspIT kuriame nuo ${prices.shop}.`,
    ],
    sections: [
      {
        h: "1. Prekės ir asortimentas",
        body: [
          "Pradėkite nuo aiškaus sąrašo: kiek prekių, ar yra variantų (dydžiai, spalvos), kokios kategorijos. Kiekvienai prekei reikės pavadinimo, aprašymo, kainos ir gerų nuotraukų. Būtent prekių informacija dažniausiai užtrunka ilgiausiai, todėl ją verta pradėti ruošti anksti.",
        ],
      },
      {
        h: "2. Mokėjimai",
        body: [
          "Lietuvoje pirkėjai dažniausiai moka per elektroninę bankininkystę ir kortele. Tam naudojami mokėjimų operatoriai, pavyzdžiui, Paysera, Montonio ar Stripe. Kiekvienas turi savo sąlygas ir komisinius, todėl juos verta palyginti prieš renkantis.",
        ],
      },
      {
        h: "3. Pristatymas",
        body: [
          "Populiariausi būdai – siuntos į paštomatus ir kurjeriu. Lietuvoje veikia keli tinklai, pavyzdžiui, LP Express, Omniva ir DPD. Apsispręskite, kokius būdus siūlysite, kiek tai kainuos pirkėjui ir ar bus nemokamo pristatymo riba.",
        ],
      },
      {
        h: "4. Teisinė informacija",
        body: [
          {
            list: [
              "Pirkimo taisyklės: kaip vyksta užsakymas, apmokėjimas, pristatymas ir grąžinimas.",
              "Teisė atsisakyti sutarties: ES vartotojai, perkantys internetu, daugeliu atvejų turi 14 dienų teisę grąžinti prekę.",
              "Privatumo politika ir slapukų informacija pagal BDAR.",
              "Pardavėjo rekvizitai: įmonės pavadinimas, kodas, kontaktai.",
            ],
          },
          "Šiuos dokumentus geriausia pasitikrinti su teisininku – svetainės kūrėjas juos įdiegia, bet neatsako už jų teisinį turinį.",
        ],
      },
      {
        h: "5. Parduotuvės sistema ir valdymas",
        body: [
          "Pagalvokite, ką norėsite tvarkyti patys: prekes, kainas, akcijas, užsakymų būsenas. Nuo to priklauso, kokia sistema tinka. Taip pat svarbu, kad parduotuvė būtų greita ir patogi telefone – didelė dalis pirkimų pradedama mobiliajame.",
        ],
      },
      {
        h: "6. Kaip pirkėjai jus ras",
        body: [
          "Kiekviena kategorija ir prekė turi turėti savo adresą, pavadinimą ir aprašymą. Struktūriniai duomenys padeda Google rodyti kainą ir prieinamumą. Pagrindai aprašyti [techninio SEO sąraše](/blogas/techninis-seo-sarasas/).",
          `Pavyzdį, kaip atrodo produktą pristatanti parduotuvė, rasite [Colorlisse projekte](/darbai/colorlisse/). Jei planuojate savo parduotuvę, peržiūrėkite [el. parduotuvių kūrimo paslaugą](/paslaugos/el-parduotuves/) – kainos nuo ${prices.shop}.`,
        ],
      },
    ],
    related: [
      { href: "/paslaugos/el-parduotuves/", text: "El. parduotuvių kūrimas" },
      { href: "/darbai/colorlisse/", text: "Colorlisse el. parduotuvė" },
      { href: "/duk/#parduotuve", text: "DUK apie el. parduotuves" },
    ],
  },
]

export const postBySlug = Object.fromEntries(posts.map((post) => [post.slug, post]))

// Which articles each service and info page points to.
export const relatedPosts: Record<string, string[]> = {
  "/": ["kiek-kainuoja-svetaine", "geo-ai-paieska", "google-verslo-profilis"],
  "/paslaugos": ["kiek-kainuoja-svetaine", "svetaine-ar-socialiniai-tinklai", "geo-ai-paieska"],
  "/paslaugos/svetaines": ["techninis-seo-sarasas", "geo-ai-paieska", "google-verslo-profilis"],
  "/paslaugos/el-parduotuves": ["kaip-pradeti-el-parduotuve", "techninis-seo-sarasas", "kiek-kainuoja-svetaine"],
  "/paslaugos/svetainiu-atnaujinimas": ["kada-atnaujinti-svetaine", "techninis-seo-sarasas", "geo-ai-paieska"],
  "/paslaugos/ai-agentai": ["geo-ai-paieska", "techninis-seo-sarasas", "kiek-kainuoja-svetaine"],
  "/kainos": ["kiek-kainuoja-svetaine", "kaip-pradeti-el-parduotuve", "kada-atnaujinti-svetaine"],
  "/duk": ["kiek-kainuoja-svetaine", "techninis-seo-sarasas", "geo-ai-paieska"],
  "/procesas": ["kiek-kainuoja-svetaine", "kada-atnaujinti-svetaine", "svetaine-ar-socialiniai-tinklai"],
  "/darbai": ["kaip-pradeti-el-parduotuve", "svetaine-ar-socialiniai-tinklai", "google-verslo-profilis"],
}

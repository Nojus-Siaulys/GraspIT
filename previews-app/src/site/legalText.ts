import { contact } from "./settings"

// The controller's own details are not filled in yet, so their section is hidden (`hidden: true`).
// When the sole proprietorship is registered: replace the three [ĮRAŠYTI] values and remove `hidden` from that section.
export const legal = {
  company: "[ĮRAŠYTI: individualios veiklos pavadinimas]",
  code: "[ĮRAŠYTI: veiklos kodas]",
  address: "[ĮRAŠYTI: buveinės adresas]",
  email: contact.email || "[ĮRAŠYTI: el. paštas duomenų klausimams]",
  updated: "2026-11-22",
}

export type LegalSection = {
  h: string
  p?: string[]
  list?: string[]
  cards?: { title: string; rows: [label: string, value: string][] }[]
  link?: { text: string; href: string }
  // Kept in the file but not shown on the page.
  hidden?: boolean
}
export type LegalDoc = { sections: LegalSection[] }

export const documents: Record<"privacy" | "cookies", LegalDoc> = {
  privacy: {
    sections: [
      {
        h: "Kas tvarko jūsų duomenis",
        hidden: true,
        p: [
          `Duomenų valdytojas: ${legal.company}, kodas ${legal.code}, buveinė ${legal.address}.`,
          `Klausimus apie duomenis rašykite el. paštu ${legal.email}. Šioje politikoje „BDAR“ reiškia Reglamentą (ES) 2016/679.`,
        ],
      },
      {
        h: "Kokius duomenis tvarkome ir kodėl",
        cards: [
          {
            title: "Užklausa per svetainės formą",
            rows: [
              ["Duomenys", "Vardas, el. paštas, pasirinkta paslauga ir projekto aprašymas. Neprivaloma: biudžetas, dabartinės svetainės adresas ir papildoma informacija."],
              ["Tikslas", "Atsakyti į jūsų užklausą ir, jei norite, parengti pasiūlymą."],
              ["Teisinis pagrindas", "Veiksmai jūsų prašymu prieš sudarant sutartį (BDAR 6 str. 1 d. b p.)."],
              ["Saugojimo laikas", "12 mėnesių nuo paskutinio susirašinėjimo, jei sutartis nesudaroma. Po to ištriname."],
            ],
          },
          {
            title: "Susirašinėjimas el. paštu ar telefonu",
            rows: [
              ["Duomenys", "Vardas, kontaktai ir tai, ką mums parašote ar pasakote."],
              ["Tikslas", "Aptarti jūsų projektą ir atsakyti į klausimus."],
              ["Teisinis pagrindas", "Veiksmai jūsų prašymu prieš sudarant sutartį (BDAR 6 str. 1 d. b p.)."],
              ["Saugojimo laikas", "12 mėnesių nuo paskutinio susirašinėjimo, jei sutartis nesudaroma."],
            ],
          },
          {
            title: "Sutarties vykdymas ir apskaita",
            rows: [
              ["Duomenys", "Rekvizitai, užsakymo ir sąskaitų duomenys."],
              ["Tikslas", "Atlikti sutartus darbus, išrašyti sąskaitas ir vesti apskaitą."],
              ["Teisinis pagrindas", "Sutarties vykdymas (BDAR 6 str. 1 d. b p.) ir teisinė prievolė vesti apskaitą (BDAR 6 str. 1 d. c p.)."],
              ["Saugojimo laikas", "Sutarties galiojimo laiką, o apskaitos dokumentus – teisės aktų nustatytais terminais."],
            ],
          },
          {
            title: "Svetainės ir formos apsauga",
            rows: [
              ["Duomenys", "IP adresas ir bandymų pateikti formą skaičius. Techninius žurnalus gali rinkti svetainės talpinimo tiekėjas Cloudflare."],
              ["Tikslas", "Apsaugoti formą nuo šlamšto ir piktnaudžiavimo, užtikrinti svetainės veikimą."],
              ["Teisinis pagrindas", "Teisėtas interesas – saugi svetainė ir forma be šlamšto (BDAR 6 str. 1 d. f p.)."],
              ["Saugojimo laikas", `Formos apsaugai IP adresas laikomas serverio atmintyje apie minutę ir nėra įrašomas į failus ar duomenų bazę. Techniniai žurnalai: kiek reikia saugumui ir svetainės veikimui, pagal Cloudflare sąlygas.`],
            ],
          },
        ],
      },
      {
        h: "Ko nedarome",
        p: ["Nenaudojame slapukų, statistikos ar reklamos įrankių, nesudarome jūsų profilio ir nepriimame automatizuotų sprendimų apie jus. Nesiunčiame naujienlaiškių ir neparduodame jūsų duomenų."],
      },
      {
        h: "Kas gauna jūsų duomenis",
        p: ["Šie tiekėjai duomenis tvarko mūsų vardu ir tik tiek, kiek reikia jų paslaugai teikti:"],
        list: [
          "Svetainės talpinimas: Cloudflare.",
          "Užklausos formos turinio pristatymas el. paštu: Resend.",
          "El. pašto paslauga: Google (Gmail).",
          "Domeno, apskaitos ir kiti pagalbiniai paslaugų teikėjai, jei jų prireikia ir tik tiek, kiek reikia jų paslaugai teikti. Apie tai pasakysime iš anksto, kai aptarsime jūsų projektą.",
          "Valstybės institucijos, kai to reikalauja teisės aktai.",
        ],
      },
      {
        h: "Duomenų perdavimas už Europos ekonominės erdvės ribų",
        p: [
          "Cloudflare, Resend ir Google yra JAV bendrovės, todėl jūsų užklausos turinys ir IP adresas gali būti perduodami į JAV.",
          "Perdavimo pagrindas: Europos Komisijos sprendimas dėl tinkamumo, susijęs su ES ir JAV duomenų privatumo programa (Įgyvendinimo sprendimas (ES) 2023/1795). Pagal šių tiekėjų skelbiamą informaciją, jie yra sertifikuoti pagal šią programą. Cloudflare ir Resend savo duomenų tvarkymo sutartyse papildomai nurodo standartines sutarčių sąlygas (Įgyvendinimo sprendimas (ES) 2021/914), kurios taikomos, jei programa nustotų galioti.",
          `Informaciją apie šias apsaugos priemones ar jų kopiją galite gauti parašę ${legal.email}.`,
        ],
      },
      {
        h: "Jūsų teisės",
        p: ["Turite teisę:"],
        list: [
          "susipažinti su savo duomenimis ir gauti jų kopiją (BDAR 15 str.);",
          "reikalauti ištaisyti netikslius duomenis (BDAR 16 str.);",
          "reikalauti ištrinti duomenis (BDAR 17 str.);",
          "apriboti duomenų tvarkymą (BDAR 18 str.);",
          "gauti savo pateiktus duomenis įprastu formatu (BDAR 20 str.);",
          "nesutikti, kad duomenys būtų tvarkomi remiantis teisėtu interesu (BDAR 21 str.).",
        ],
      },
      {
        h: "Kaip pasinaudoti teisėmis ir pateikti skundą",
        p: [
          `Rašykite ${legal.email}. Prieš kreipdamiesi į instituciją, parašykite mums: dažniausiai klausimą išsprendžiame greičiau.`,
          "Manydami, kad jūsų duomenys tvarkomi neteisėtai, turite teisę pateikti skundą Valstybinei duomenų apsaugos inspekcijai (BDAR 77 str.): L. Sapiegos g. 17, Vilnius, ada@ada.lt, vdai.lrv.lt.",
        ],
      },
      {
        h: "Ar privalote pateikti duomenis",
        p: ["Formoje privalomi vardas, el. paštas ir projekto aprašymas. Be jų negalėtume jums atsakyti. Kiti laukai neprivalomi."],
      },
      {
        h: "Slapukai",
        p: ["Svetainėje slapukų nenaudojame. Pirmą kartą atvėrus svetainę parodome trumpą pranešimą apie tai."],
        link: { text: "Apie slapukus ir naršyklės saugyklą", href: "/slapukai/" },
      },
      {
        h: "Politikos pakeitimai",
        p: [`Ši politika atnaujinta ${legal.updated}. Jei pradėsime naudoti statistikos ar kitus įrankius, pirmiausia atnaujinsime ją ir slapukų puslapį.`],
      },
    ],
  },
  cookies: {
    sections: [
      {
        h: "Trumpai",
        p: ["Ši svetainė nenustato slapukų ir nenaudoja statistikos, reklamos ar socialinių tinklų sekimo įrankių. Todėl sutikimo ar atsisakymo pasirinkimo nerodome, tik trumpai informuojame."],
      },
      {
        h: "Ką svetainė išsaugo jūsų įrenginyje",
        p: ["Du įrašai naršyklės saugykloje. Tai ne slapukai."],
        cards: [
          {
            title: "graspit-brief",
            rows: [
              ["Tikslas", "Perkelti atsakymus iš paslaugos puslapio į užklausos formą, kad nereikėtų rašyti iš naujo."],
              ["Kada atsiranda", "Tik paspaudus „Tęsti į užklausą“ paslaugos puslapyje."],
              ["Kiek laiko", "Kol uždarote naršyklės skirtuką arba išsiunčiate užklausą."],
              ["Kam siunčiama", "Niekam. Įrašas lieka jūsų naršyklėje."],
            ],
          },
          {
            title: "graspit-slapukai",
            rows: [
              ["Tikslas", "Atsiminti, kad matėte pranešimą apie slapukus, kad jo nerodytume kiekvieną kartą."],
              ["Kada atsiranda", "Paspaudus „Gerai“ pranešime."],
              ["Kiek laiko", "Kol patys išvalote naršyklės duomenis."],
              ["Kam siunčiama", "Niekam. Įrašas lieka jūsų naršyklėje."],
            ],
          },
        ],
      },
      {
        h: "Išorinės paslaugos",
        p: ["Šriftus talpiname patys, todėl dėl jų naršyklė nesikreipia į trečiųjų šalių serverius. Demonstracijos puslapiuose rodomi tos pačios svetainės failai."],
      },
      {
        h: "Kodėl nereikia sutikimo",
        p: [
          "Elektroninių ryšių įstatymo 73 str. 4 d. ir Direktyvos 2002/58/EB 5 str. 3 d. reikalauja sutikimo, kai informacija įrenginyje saugoma ne dėl paslaugos, kurią naudotojas pats užsisako. Išimtis taikoma, kai tai būtina tokiai paslaugai teikti. Čia saugykla reikalinga tik jūsų pradėtai užklausai užpildyti ir pranešimo pasirinkimui atsiminti, todėl sutikimo neprašome.",
        ],
      },
      {
        h: "Jei kas nors keisis",
        p: ["Jei pradėsime naudoti statistiką ar kitus slapukus, pirmiausia parodysime pasirinkimą sutikti ar atsisakyti ir atnaujinsime šį puslapį bei privatumo politiką. Slapukus visada galite ištrinti ar blokuoti naršyklės nustatymuose."],
        link: { text: "Privatumo politika", href: "/privatumo-politika/" },
      },
    ],
  },
}

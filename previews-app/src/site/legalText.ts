import { contact } from "./settings"

// Everything marked [ĮRAŠYTI: ...] must be replaced with real details before the site goes live.
// The pages show these markers highlighted, so a missing one is easy to spot.
export const legal = {
  company: "[ĮRAŠYTI: įmonės arba individualios veiklos pavadinimas]",
  code: "[ĮRAŠYTI: įmonės arba veiklos kodas]",
  address: "[ĮRAŠYTI: buveinės adresas]",
  email: contact.email || "[ĮRAŠYTI: el. paštas duomenų klausimams]",
  hosting: "[ĮRAŠYTI: svetainės talpinimo paslaugų teikėjas]",
  mailbox: "[ĮRAŠYTI: el. pašto paslaugų teikėjas]",
  accounting: "[ĮRAŠYTI: apskaitos paslaugų teikėjas, jei toks yra]",
  logRetention: "[ĮRAŠYTI: techninių žurnalų saugojimo laikas pagal talpinimo teikėjo sąlygas]",
  transferBasis: "[ĮRAŠYTI: perdavimo pagrindas, pvz., sprendimas dėl tinkamumo ar standartinės sutarčių sąlygos]",
  updated: "2026-11-08",
}

export type LegalSection = {
  h: string
  p?: string[]
  list?: string[]
  cards?: { title: string; rows: [label: string, value: string][] }[]
  link?: { text: string; href: string }
}
export type LegalDoc = { sections: LegalSection[] }

export const documents: Record<"privacy" | "cookies", LegalDoc> = {
  privacy: {
    sections: [
      {
        h: "Kas tvarko jūsų duomenis",
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
              ["Duomenys", "IP adresas ir bandymų pateikti formą skaičius. Techninius žurnalus gali rinkti talpinimo paslaugų teikėjas."],
              ["Tikslas", "Apsaugoti formą nuo šlamšto ir piktnaudžiavimo, užtikrinti svetainės veikimą."],
              ["Teisinis pagrindas", "Teisėtas interesas – saugi svetainė ir forma be šlamšto (BDAR 6 str. 1 d. f p.)."],
              ["Saugojimo laikas", `Formos apsaugai IP adresas laikomas serverio atmintyje apie minutę ir nėra įrašomas į failus ar duomenų bazę. Techniniai žurnalai: ${legal.logRetention}.`],
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
          `Svetainės talpinimas: ${legal.hosting}.`,
          "Užklausos formos turinio pristatymas el. paštu: Resend.",
          `El. pašto paslauga: ${legal.mailbox}.`,
          `Apskaita: ${legal.accounting}.`,
          "Valstybės institucijos, kai to reikalauja teisės aktai.",
        ],
      },
      {
        h: "Duomenų perdavimas už Europos ekonominės erdvės ribų",
        p: [`Resend yra JAV bendrovė, todėl užklausos formos turinys gali būti perduodamas į JAV. Perdavimo pagrindas: ${legal.transferBasis}.`],
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
        p: ["Svetainėje slapukų nenaudojame."],
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
        p: ["Ši svetainė nenustato slapukų ir nenaudoja statistikos, reklamos ar socialinių tinklų sekimo įrankių. Todėl slapukų sutikimo juostos nerodome."],
      },
      {
        h: "Ką svetainė išsaugo jūsų įrenginyje",
        p: ["Vienintelis įrašas – trumpalaikė naršyklės sesijos saugykla. Tai ne slapukas."],
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
        ],
      },
      {
        h: "Išorinės paslaugos",
        p: ["Šriftus talpiname patys, todėl dėl jų naršyklė nesikreipia į trečiųjų šalių serverius. Demonstracijos puslapiuose rodomi tos pačios svetainės failai."],
      },
      {
        h: "Kodėl nereikia sutikimo",
        p: [
          "Elektroninių ryšių įstatymo 73 str. 4 d. ir Direktyvos 2002/58/EB 5 str. 3 d. reikalauja sutikimo, kai informacija įrenginyje saugoma ne dėl paslaugos, kurią naudotojas pats užsisako. Išimtis taikoma, kai tai būtina tokiai paslaugai teikti. Čia saugykla reikalinga tik jūsų pradėtai užklausai užpildyti, todėl sutikimo neprašome.",
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

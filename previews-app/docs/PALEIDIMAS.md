# GraspIT: ką dar reikės pateikti

## Kad pradėtų veikti užklausų siuntimas

1. **Užklausų gavėjo el. paštas** — adresas, į kurį turi ateiti klientų užklausos (`CONTACT_TO`).
2. **Siuntėjo domenas ir adresas** — pvz., `GraspIT <uzklausos@jusu-domenas.lt>` (`CONTACT_FROM`). Domeną reikės patvirtinti Resend paskyroje, įrašant jų pateiktus DNS įrašus.
3. **Resend API raktas su siuntimo teise** (`RESEND_API_KEY`). Įrašykite jį į serverio / talpinimo paslaptis arba vietinį `.env.local`. Į pokalbį jo nesiųskite. Jis negali turėti `VITE_` prefikso ir negali patekti į Git.
4. **Galutinis svetainės adresas** — pvz., `https://jusu-domenas.lt` (`SITE_URL`). Jis naudojamas domeno patikrai, canonical adresams ir sitemap.
5. **Talpinimo vieta, vykdanti API**. Paruoštas `api/contact.ts` Vercel Node funkcijai; Vite dev ir preview aplinkoje veikia tas pats serverio handleris. Vien statiško failų talpinimo neužtenka laiškams siųsti. Pasirinkus kitą platformą reikės prijungti šį handlerį jos serverio aplinkoje.

Tuščias konfigūracijos pavyzdys yra `.env.example`. Vietiniam bandymui nukopijuokite į `.env.local`, užpildykite reikšmes ir perkraukite serverį. Vercel aplinkoje įrašykite tas pačias reikšmes kaip serverio aplinkos kintamuosius ir atlikite naują deployment.

Kol konfigūracija tuščia, forma siūlo tik aiškiai pažymėtą aprašymo atsisiuntimą. Ji neapsimeta išsiuntusi užklausą. Prijungus paslaugą atsiras siuntimo mygtukas, laukiama tikro serverio patvirtinimo, o klaidos atveju įrašai liks formoje.

## Vieši kontaktai ir turinys

- Viešas el. paštas (`VITE_CONTACT_EMAIL`) ir, jei norite, telefonas (`VITE_CONTACT_PHONE`). Tai gali skirtis nuo vidinio užklausų gavėjo adreso.
- Studijos / įmonės duomenys, kuriuos norite skelbti, ir patvirtinta informacija apie užklausų duomenų tvarkymą: kas gauna duomenis, kur jie laikomi ir kiek laiko juos saugosite. Dabar formoje yra trumpas paskirties paaiškinimas, ne išsami privatumo politika.
- Tikri klientų atsiliepimai, kuriuos klientai sutiko skelbti: tekstas, vardas, įmonė ar projektas. Išgalvoti atsiliepimai nerodomi.
- Colorlisse ir Kalvita pristatymų patvirtinimas: ar teisingai įvardytos projekto dalys ir jūsų indėlis. Patvirtinti terminai ar rezultatai gali būti pridėti vėliau; jie nebuvo išgalvoti.
- Jei norite tikro „prieš / po“ palyginimo — ankstesnės svetainės kadrai. Dabar vietoj jo įgyvendintas interaktyvus, aiškiai pažymėtas struktūros pavyzdys.

## Kas jau padaryta

- Atskiri `/darbai/colorlisse/` ir `/darbai/kalvita/` pristatymai.
- Konkrečių verslo situacijų blokai su nuorodomis į tinkamas paslaugas.
- Interaktyvus svetainės dalių pavyzdys.
- Paketų apimties paaiškinimas ir pavyzdinė keturių puslapių struktūra.
- Paslaugos pasirinkimo, turinio pasirengimo ir termino perdavimas į užklausos formą.
- Tikras serverio siuntimo adapteris, validacija, dydžio ir dažnio ribojimas, klaidų bei sėkmės būsenos; patikrinta su imituota siuntimo paslauga, tikrų laiškų nesiųsta.
- Pašalinti pavyzdiniai kontaktai, atsiliepimų rezervai ir įprastoje peržiūroje tušti media blokai.

Resend API dokumentacija: https://resend.com/docs/api-reference/emails/send-email

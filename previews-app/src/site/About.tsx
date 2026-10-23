import { ArrowRight } from "lucide-react"

const wrap = "mx-auto max-w-[1280px] px-5 md:px-8"
const eyebrow = "text-xs font-bold uppercase tracking-[.16em]"

export function About() {
  return <>
    <section className="bg-background py-12 md:py-20" aria-labelledby="team-heading">
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
        <figure className="lg:col-span-5">
          <img src="/img/team/team-professional.webp" alt="Abu GraspIT komandos nariai su kostiumais prie šviesios sienos" width={1086} height={1448} fetchPriority="high" className="mx-auto aspect-[3/4] w-full max-w-[420px] rounded-lg object-cover" />
          <figcaption className="mt-4 text-sm text-muted-foreground">Du žmonės. Viena komanda.</figcaption>
        </figure>
        <div className="lg:col-span-7">
          <p className={eyebrow}>01 / Susipažinkime</p>
          <h2 id="team-heading" className="mt-6 max-w-[18ch] text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1.06] tracking-tight">Už GraspIT — mes dviese.</h2>
          <p className="mt-7 max-w-[48ch] text-xl leading-relaxed">Kuriame svetaines ir el. parduotuves, atnaujiname esamą dizainą ir padedame aiškiau pristatyti verslą internete.</p>
          <p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-muted-foreground">Esame maža komanda, todėl su jumis bendrauja tie patys žmonės, kurie dirba prie jūsų svetainės. Kartu aptariame poreikius, rodome kuriamą rezultatą ir deriname pakeitimus.</p>
          <p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-muted-foreground">Mums svarbu, kad dizainas turėtų paskirtį: lankytojas suprastų, ką siūlote, lengvai rastų informaciją ir žinotų, kaip su jumis susisiekti.</p>
          <a href="/darbai/" className="mt-7 inline-flex min-h-12 items-center gap-3 border-b border-current py-2 font-semibold">Pažiūrėti, prie ko dirbome<ArrowRight className="size-4" /></a>
        </div>
      </div>
    </section>
    <section className="bg-secondary py-16 md:py-20" aria-labelledby="members-heading">
      <div className={wrap}>
        <p className={eyebrow}>02 / Komandos nariai</p>
        <h2 id="members-heading" className="mt-5 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">Kas rūpinasi jūsų svetaine.</h2>
        <article className="mt-10 grid gap-8 border-t border-foreground/25 pt-8 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <h3 className="text-4xl font-bold tracking-tight">Nojus</h3>
            <p className="mt-3 text-lg">Programavimas ir dizaino kryptis</p>
          </header>
          <div className="lg:col-span-8">
            <p className="max-w-[60ch] text-xl leading-relaxed">Programuoju ir rūpinuosi, kad svetainė ne tik veiktų, bet ir gerai atrodytų. Man svarbu bendras dizaino įspūdis ir detalės: šriftai, tarpai, spalvos bei patogus naršymas.</p>
            <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">Esu susipažinęs su HTML, CSS, JavaScript, TypeScript ir React. Mėgstu išbandyti skirtingus įrankius ir parinkti juos pagal tai, ko reikia konkrečiam projektui.</p>
            <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">Domiuosi web dizainu, didžiaisiais kalbos modeliais (LLM) ir tuo, kaip AI įrankiai gali padėti kuriant svetaines. Patinka ieškoti būdų, kaip idėją paversti aiškia, patogia naudoti sąsaja.</p>
            <ul aria-label="Nojaus technologijos ir interesai" className="mt-6 flex flex-wrap gap-2">
              {["HTML / CSS", "JavaScript", "TypeScript", "React", "Web dizainas", "LLM"].map(skill => <li key={skill} className="rounded-full border border-foreground/25 px-4 py-2 text-sm">{skill}</li>)}
            </ul>
            <a href="/biblioteka/" className="mt-6 inline-flex min-h-12 items-center gap-3 border-b border-current py-2 font-semibold">Mano asmeninių projektų biblioteka<ArrowRight className="size-4" /></a>
          </div>
        </article>
        <article className="mt-10 grid gap-8 border-t border-foreground/25 pt-8 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <h3 className="text-4xl font-bold tracking-tight">Nojus</h3>
            <p className="mt-3 text-lg">Techniniai sprendimai ir marketingas</p>
          </header>
          <div className="lg:col-span-8">
            <p className="max-w-[60ch] text-xl leading-relaxed">Rūpinuosi techniniais dalykais ir marketingu. Man svarbu, kad svetainė sklandžiai veiktų ir aiškiai pristatytų verslą žmonėms, kuriems jo paslaugos aktualios.</p>
            <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">Į svetainę žiūriu ir iš lankytojo pusės: ar lengva rasti reikiamą informaciją, suprasti pasiūlymą ir susisiekti. Techninius sprendimus sieju su tuo, ką verslas nori pasiekti internete.</p>
            <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">Už darbo ribų domiuosi sportu ir sveikata. Tai temos, kurioms skiriu dėmesio ir savo kasdienybėje.</p>
            <ul aria-label="Antrojo Nojaus veiklos sritys ir interesai" className="mt-6 flex flex-wrap gap-2">
              {["Techniniai sprendimai", "Marketingas", "Sportas", "Sveikata"].map(interest => <li key={interest} className="rounded-full border border-foreground/25 px-4 py-2 text-sm">{interest}</li>)}
            </ul>
          </div>
        </article>
      </div>
    </section>
    <section className="bg-background py-16 md:py-20" aria-labelledby="skills-heading">
      <div className={wrap}>
        <p className={eyebrow}>03 / Ką darome</p>
        <h2 id="skills-heading" className="mt-5 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">Nuo idėjos iki veikiančios svetainės.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            ["Dizainas ir struktūra", "Planuojame puslapių išdėstymą, navigaciją ir turinio pateikimą. Atnaujiname esamų svetainių išvaizdą, taip pat ir WordPress dizainą."],
            ["Svetainių kūrimas", "Kuriame verslo svetaines ir el. parduotuves. Pritaikome turinį skirtingiems ekranams, kad svetaine būtų patogu naudotis ir telefone."],
            ["Automatizacija", "Padedame supaprastinti pasikartojančias užduotis. Automatizacijos apimtį pradedame nuo konkretaus poreikio ir aiškaus laukiamo rezultato."],
          ].map(([title, text], index) => <article key={title} className="border-t border-foreground/25 pt-5"><span className={`${eyebrow} text-muted-foreground`}>0{index + 1}</span><h3 className="mt-5 text-2xl font-bold tracking-tight">{title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{text}</p></article>)}
        </div>
      </div>
    </section>
    <section className="bg-secondary py-16 md:py-20" aria-labelledby="casual-heading">
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <p className={eyebrow}>04 / Kita mūsų pusė</p>
          <h2 id="casual-heading" className="mt-6 max-w-[19ch] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">Ne visada su kostiumais.</h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted-foreground">Norime, kad pažintumėte žmones, su kuriais kursite savo svetainę. Su mumis galima kalbėti paprastai — nuo pirmos idėjos iki smulkių pastabų dizainui.</p>
        </div>
        <img src="/img/team/team-casual.webp" alt="Abu GraspIT komandos nariai neformalioje nuotraukoje lauke" width={1672} height={941} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-lg object-cover" />
      </div>
    </section>
    <section className="bg-background py-16 md:py-20" aria-labelledby="principles-heading">
      <div className={wrap}>
        <p className={eyebrow}>05 / Bendradarbiavimas</p>
        <h2 id="principles-heading" className="mt-5 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">Ko galite tikėtis iš mūsų.</h2>
        <div className="mt-10 grid gap-x-12 md:grid-cols-2">
          {[
            ["Tiesioginio bendravimo", "Kalbatės su žmonėmis, kurie dirba prie projekto. Sprendimus aptariame suprantamai."],
            ["Sutartos darbų apimties", "Prieš pradėdami suderiname, ką kuriame, kiek tai kainuos ir kokio turinio reikės iš jūsų."],
            ["Galimybės pateikti pastabas", "Kuriamą svetainę rodome darbo metu. Galite įvertinti kryptį ir pasakyti, ką norite pakeisti."],
            ["Pagalbos po paleidimo", "Perduodame kodą ir turinį, o pirmąsias 30 dienų padedame su iškilusiais klausimais."],
          ].map(([title, text]) => <article key={title} className="border-t border-foreground/25 py-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">{text}</p></article>)}
        </div>
      </div>
    </section>
  </>
}

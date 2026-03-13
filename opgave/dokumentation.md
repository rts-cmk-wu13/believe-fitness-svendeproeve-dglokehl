# Believe Fitness - Loke Hochheim Lunde (WU13)

---
## Om opgaven

Visse steder har jeg valgt at tilføje noget funktionalitet som ikke nødvendigvis stod som et krav i opgaven, men som jeg følte var relativt åbenlyst at gøre. Her er de ting som jeg har tilføjet/ændret på:

- Hvis man er logget ind som admin, bliver knappen til at tilmelde sig en klasse bliver ændret til at sige "Participants" og linker til siden med listen af deltagere, da jeg ikke synes at det giver mening at lade admin tilmelde sig sine egne klasser.
- I figma-designet er der kun et felt til navn i sign up-formen, men da API'et bruger fornavn og efternavn til brugere, har jeg valgt at lave felter til både fornavn og efternavn.
- I figma-designet ændrer ikonerne i headeren farve baseret på baggrunden, men der har jeg valgt at de bare er grå på alle sider, da det vil være ekstremt besværligt at få det til at ændre farve dynamisk og den grå farve vil kunne ses på de fleste baggrunde.
- I figma-designet ligner det at man skal sætte sin rating med en slider, men jeg har valgt at gøre så man bare kan trykke på stjernerne for at vælge sin rating, da jeg synes det føles mere intuitivt. Det var til gengæld også en del mere besværligt at implementere.
- Hvis man allerede er tilmeldt newsletter så kan man ikke tilmelde sig igen med den samme email.
- I kravene står der at splash-screen skal vises hver gang app'en åbnes, hvilket jeg har valgt at fortolke som en session, så derfor bruger jeg en cookie som udløber efter en session, til at holde styr på at vise den.

---
## Tech-stack

Jeg har brugt følgende:
- Next.js (med Typescript og Tailwind)
- Zod
- React Icons

Jeg har valgt at bruge Next.js som framework, da jeg foretrækker det over vanilla React og det fungerer godt til at lave denne type af dynamiske web-apps, på grund af server-side rendering og caching. Denne app er der en del sider hvor jeg dog ikke bruger caching, da det er indhold som helst skal opdateres med det samme.

Jeg har brugt Zod til validering af alle forms på siden, da det ikke er alt der bliver valideret i backenden. Der skulle også være error messages og det er nemt at implementere med Zod, da man bare skriver dem i schema'erne sammen med valideringen.

Jeg har brugt cookies og Next.js Proxy/Middleware til at holde styr på sessions (login og splash-screen) og til at protecte routes når man ikke er logget ind.

---
## Projekt-struktur

I `/app`-mappen har jeg splittet siderne op i to undermapper: `(auth)` og `(pages)` for overskuelighed, da jeg ikke redigerer de sider der ligger inde i `(auth)` ligeså meget som de andre.

Jeg har også en `/api`-mappe som indeholder alle server actions, mine fetch-funktioner, Zod schema'er og types. Jeg har lavet nogle "helper"-funktioner til at fetche alt indholdet på siden, da jeg synes det er lidt federe end at skrive hele fetchen hver gang. Jeg har en som cacher indholdet i 1 time (med mulighed for kortere eller længere tid) og en som ikke cacher.

I `/components`-mappen ligger alle komponenterne, inddelt i forskellige undermapper. De fleste af mapperne siger lidt sigselv, men den som hedder "blocks" er til komponenter som enten kun bliver brugt 1 gang, eller som bare ikke passer ind i nogle af de andre mapper

---
## FitnessClassStarRating Component

Et eksempel på et af mine komponenter er mit [FitnessClassStarRating](../components/blocks/FitnessClassStarRating.tsx) komponent, som viser en average rating af en klasse ud fra alle de ratings den klasse har fået.

Måden jeg får klassens average er ved at bruge min `getAvgRating` hjælperfunktion. Den tjekker først som der overhovedet er nogle ratings og hvis der ikke er, så returner den 0. Derefter deklarerer den en variabel som hedder `sum` og sætter den til 0. Så bruger den et for-loop til at loope igennem alle ratings for lægger dem sammen i `sum`-variablen. Til sidst dividerer den summen med længden af ratings-arrayet og bruger den `Math.round` til at afrunde tallet, da jeg ikke vil have nogle komma-tal.

```
export function getAvgRating(ratings: FitnessClassRating[]) {
    if (ratings.length < 1) return 0

    let sum = 0
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].rating
    }
    const result = Math.round(sum / ratings.length)
    return result
}
```

Inde i komponentet laver jeg så et array som bare indeholder 5 items, der bare er tal fra 1-5, hvilket jeg bruger til at mappe stjerne-ikonerne ud. Inde i det array tjekker jeg så om average rating'en så er højere end, eller lig med det tail som den er nået til i arrayet, hvor den så returnerer et stjerne-ikon med fill, og ellers så returnerer den et stjerne-ikon uden fill.

```
{[1,2,3,4,5].map((star) => {
	if (avgRating >= star) {
		return <FaStar key={star} />
	} else {
		return <FaRegStar key={star} />
	}
})}
```

Med de relativt simple trin har jeg lavet et komponent som kan vise hvor mange stjerner ud af 5 en klasse har, ud fra de ratings den har fået og hvis den ikke har nogle ratings vil alle stjernerne bare være uden fill.
import { lang } from "$lib/stores"
import { areas } from "./areas.js"

const VALID = ['nl', 'pa', 'fr', 'es', 'en'];

export function setLanguage(data){
    let requested = VALID.includes(data.lang) ? data.lang : 'en';

    // Eilanden kunnen via supportedLangs een whitelist opgeven (bv. Saba en Statia: NL + EN).
    // Wordt een niet-ondersteunde taal aangevraagd, val terug op de eerste taal in de lijst.
    const supported = areas[data.area_id]?.supportedLangs;
    if (supported && !supported.includes(requested)) {
        requested = supported[0];
    }

    lang.set(requested);
}

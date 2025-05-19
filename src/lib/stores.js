import { writable } from 'svelte/store';

export const w = writable(0);
export const h = writable(0);

export const datalaag = writable({indicator: "temperatureAvg", column: "Gemiddelde temperatuur", theme: "heat", season: "annual"});

export const theme = writable('heat')

export const area_id = writable(null)

export const areaSelection = writable(null)

export const lang = writable(null)

export const hoveredYear = writable(null)

export const indicatorOptionsArea = writable([])

export const themeOptions = writable([])
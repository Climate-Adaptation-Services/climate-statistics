import { get } from 'svelte/store';
import { lang } from '$lib/stores';
import { nederlands } from './nl.js';
import { english } from './en.js';
// TODO papiamens implement
// import { papiamens } from './pa.js';

export function t(key, replacements = {}) {
  const currentLang = get(lang);
  const translation =
    currentLang === 'en'
      ? english[key]
      // : currentLang === 'pa'
      // ? papiamens[key]
      : nederlands[key]; // Default to Dutch
  return Object.entries(replacements).reduce(
    (str, [placeholder, value]) => str.replace(`{${placeholder}}`, value),
    translation
  );
}
import { get } from 'svelte/store';
import { lang } from '$lib/stores';
import { nederlands } from './nl.js';
import { english } from './en.js';
import { papiamentu } from './pa.js';

export function t(key, replacements = {}) {
  const currentLang = get(lang);
  const translation =
    currentLang === 'en'
      ? english[key]
      : currentLang === 'pa'
      ? papiamentu[key]
      : currentLang === 'nl'
      ? nederlands[key]
      : english[key]; // Default to English
  return Object.entries(replacements).reduce(
    (str, [placeholder, value]) => str.replace(`{${placeholder}}`, value),
    translation
  );
}
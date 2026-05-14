import { derived } from 'svelte/store';
import { lang } from '$lib/stores';
import { nederlands } from './nl.js';
import { english } from './en.js';
import { papiamentu } from './pa.js';
import { french } from './fr.js';
import { spanish } from './es.js';

// t is een derived store zodat alle callers automatisch reageren op $lang-changes.
// Gebruik in Svelte-templates als $t('key') of $t('key', { placeholder: value }).
export const t = derived(lang, ($lang) => {
  const dict =
    $lang === 'en' ? english :
    $lang === 'pa' ? papiamentu :
    $lang === 'nl' ? nederlands :
    $lang === 'fr' ? french :
    $lang === 'es' ? spanish :
    english; // Default to English

  return (key, replacements = {}) => {
    const translation = dict[key];
    return Object.entries(replacements).reduce(
      (str, [placeholder, value]) => str?.replace(`{${placeholder}}`, value),
      translation
    );
  };
});
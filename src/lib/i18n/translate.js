import { derived } from 'svelte/store';
import { lang, area_id } from '$lib/stores';
import { nederlands } from './nl.js';
import { english } from './en.js';
import { papiamentu } from './pa.js';
import { papiamentoAruba } from './pa-aruba.js';
import { french } from './fr.js';
import { spanish } from './es.js';

// t is een derived store zodat alle callers automatisch reageren op $lang/$area_id-changes.
// Gebruik in Svelte-templates als $t('key') of $t('key', { placeholder: value }).
// Aruba heeft een eigen Papiamento-variant (etymologische spelling, Spaans-georiënteerd)
// die de Papiamentu van de BES-eilanden overschrijft via pa-aruba.js.
export const t = derived([lang, area_id], ([$lang, $area_id]) => {
  let dict;
  if ($lang === 'pa' && $area_id === 'ar') {
    dict = { ...papiamentu, ...papiamentoAruba };
  } else {
    dict =
      $lang === 'en' ? english :
      $lang === 'pa' ? papiamentu :
      $lang === 'nl' ? nederlands :
      $lang === 'fr' ? french :
      $lang === 'es' ? spanish :
      english; // Default to English
  }

  return (key, replacements = {}) => {
    const translation = dict[key];
    return Object.entries(replacements).reduce(
      (str, [placeholder, value]) => str?.replace(`{${placeholder}}`, value),
      translation
    );
  };
});
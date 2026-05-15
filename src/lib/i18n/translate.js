import { derived } from 'svelte/store';
import { lang, area_id } from '$lib/stores';
import { nederlands } from './nl.js';
import { english } from './en.js';
import { papiamentu } from './pa.js';
import { papiamentoAruba } from './pa-aruba.js';
import { papiamentuCuracao } from './pa-curacao.js';
import { french } from './fr.js';
import { spanish } from './es.js';

// Per-eiland Papiamento/Papiamentu overrides. Sleutels die hier niet voorkomen
// vallen terug op pa.js. Voeg nieuwe eilanden toe door een override-bestand
// te maken en hieronder te mappen.
const paAreaOverrides = {
  ar: papiamentoAruba,      // Aruba: Papiamento (etymologisch, Spaans-georiënteerd)
  cu: papiamentuCuracao,    // Curaçao: eigen Papiamentu-variant
};

// t is een derived store zodat alle callers automatisch reageren op $lang/$area_id-changes.
// Gebruik in Svelte-templates als $t('key') of $t('key', { placeholder: value }).
export const t = derived([lang, area_id], ([$lang, $area_id]) => {
  let dict;
  if ($lang === 'pa' && paAreaOverrides[$area_id]) {
    dict = { ...papiamentu, ...paAreaOverrides[$area_id] };
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
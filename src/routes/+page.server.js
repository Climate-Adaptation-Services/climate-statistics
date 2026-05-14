import { dsv } from 'd3';
import { areas } from '$lib/noncomponents/areas.js';

// Retry voor ECONNRESET-hiccups (vooral richting Hetzner Object Storage vanaf
// sommige Windows/netwerk-combinaties). 3 pogingen met korte backoff.
async function dsvWithRetry(delimiter, url, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await dsv(delimiter, url);
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) await new Promise(r => setTimeout(r, 300 * (i + 1)));
    }
  }
  throw lastError;
}

// Hetzner-CSV's gebruiken andere kolomnamen dan de oude Bonaire/Saba-gists.
// Climate: `indicator` ipv `variabel`; SeaLevel/LLHI: `time` ipv `year`.
// We mappen alles naar de oude namen zodat de Svelte-componenten ongewijzigd blijven.
const normalizeClimate = (row) => ({
  ...row,
  variabel: row.variabel ?? row.indicator
});

const normalizeSeaLevel = (row) => ({
  ...row,
  year: row.year !== undefined ? Number(row.year) : Number(row.time)
});

const normalizeLLHI = (row) => ({
  ...row,
  year: row.year !== undefined ? Number(row.year) : Number(row.time),
  // Bonaire/Saba sej_high is in meters, Hetzner lphi_max in cm. Components verwachten meters
  // (vermenigvuldigen daar met 100), dus Hetzner-waarden delen we hier door 100.
  sej_high: row.sej_high !== undefined ? Number(row.sej_high) : Number(row.lphi_max) / 100
});

export async function load({ url }) {
  const searchParams = url.searchParams;
  const lang = searchParams.get('lang');
  let area_id = searchParams.get('area_id') || 'bq';
  area_id = area_id.toLowerCase();

  // Preload all area data
  const areaData = {};
  for (const key in areas) {
    const { climate, seaLevel, llhi } = areas[key].dataUrls;
    const [climateData, seaLevelData, llhiData] = await Promise.all([
      dsvWithRetry(',', climate),
      dsvWithRetry(',', seaLevel),
      dsvWithRetry(',', llhi)
    ]);
    areaData[key] = {
      climateData: climateData.map(normalizeClimate),
      seaLevelData: seaLevelData.map(normalizeSeaLevel),
      llhiData: llhiData.map(normalizeLLHI)
    };
  }

  // Fetch zeespiegel_historisch (global, not area-specific)
  const zeespiegel_historisch = await dsvWithRetry(',', 'https://gist.githubusercontent.com/stichtingcas/a1bf8178404a14f81aeb9d02b21058f5/raw/fc65d6816f0c2bfde5787775abcd81bd7d31e4a5/zeespiegelstijging-historisch.csv');

  return {
    lang,
    area_id,
    areaData,
    zeespiegel_historisch
  };
}
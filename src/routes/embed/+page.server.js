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

export async function load({ url }) {
  const searchParams = url.searchParams;
  const lang = searchParams.get('lang');
  let area_id = searchParams.get('area_id') || 'bq';
  area_id = area_id.toLowerCase();

  // Validate area_id exists
  if (!areas[area_id]) {
    area_id = 'bq'; // fallback to Bonaire
  }

  // Only load data for the requested area for embedding
  const { seaLevel, llhi } = areas[area_id].dataUrls;
  const areaData = {
    [area_id]: {
      seaLevelData: await dsvWithRetry(',', seaLevel),
      llhiData: await dsvWithRetry(',', llhi)
    }
  };

  return {
    lang,
    area_id,
    areaData
  };
}
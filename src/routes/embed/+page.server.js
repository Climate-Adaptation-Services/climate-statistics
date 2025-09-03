import { dsv } from 'd3';
import { areas } from '$lib/noncomponents/areas.js';

export async function load({ url }) {
  const searchParams = url.searchParams;
  const lang = searchParams.get('lang');
  let area_id = searchParams.get('area_id') || 'bq';
  area_id = area_id.toLowerCase();

  // Only load data for the requested area for embedding
  const { seaLevel, llhi } = areas[area_id].dataUrls;
  const areaData = {
    [area_id]: {
      seaLevelData: await dsv(',', seaLevel),
      llhiData: await dsv(',', llhi)
    }
  };

  return {
    lang,
    area_id,
    areaData
  };
}
import { dsv } from 'd3';
import { areas } from '$lib/noncomponents/areas.js';

export async function load({ url }) {
  const searchParams = url.searchParams;
  const lang = searchParams.get('lang');
  let area_id = searchParams.get('area_id') || 'bq';
  area_id = area_id.toLowerCase();

  // Preload all area data
  const areaData = {};
  for (const key in areas) {
    const { climate, seaLevel, llhi } = areas[key].dataUrls;
    areaData[key] = {
      climateData: await dsv(',', climate),
      seaLevelData: await dsv(',', seaLevel),
      llhiData: await dsv(',', llhi)
    };
  }

  // Fetch zeespiegel_historisch (global, not area-specific)
  const zeespiegel_historisch = await dsv(',', 'https://gist.githubusercontent.com/stichtingcas/a1bf8178404a14f81aeb9d02b21058f5/raw/fc65d6816f0c2bfde5787775abcd81bd7d31e4a5/zeespiegelstijging-historisch.csv');

  return {
    lang,
    area_id,
    areaData,
    zeespiegel_historisch
  };
}
import { dsv } from 'd3';
import { areas } from '$lib/noncomponents/areas.js';

export async function load({ url }) {
  const searchParams = url.searchParams;
  const lang = searchParams.get('lang');
  let area_id = searchParams.get('area_id') || 'bq';
  area_id = area_id.toLowerCase();

  console.log('Embed server loading area:', area_id);

  try {
    // Validate area_id exists
    if (!areas[area_id]) {
      console.error('Invalid area_id:', area_id);
      area_id = 'bq'; // fallback
    }

    // Only load data for the requested area for embedding
    const { seaLevel, llhi } = areas[area_id].dataUrls;
    console.log('Loading data from URLs:', { seaLevel, llhi });
    
    const areaData = {
      [area_id]: {
        seaLevelData: await dsv(',', seaLevel),
        llhiData: await dsv(',', llhi)
      }
    };

    console.log('Data loaded successfully for area:', area_id);

    return {
      lang,
      area_id,
      areaData
    };
  } catch (error) {
    console.error('Error loading embed data:', error);
    throw error;
  }
}
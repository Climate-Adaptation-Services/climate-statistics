import { dsv } from "d3";
import { c as areas } from "../../chunks/areas.js";
async function dsvWithRetry(delimiter, url, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await dsv(delimiter, url);
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 300 * (i + 1)));
    }
  }
  throw lastError;
}
const normalizeClimate = (row) => ({
  ...row,
  variabel: row.variabel ?? row.indicator
});
const normalizeSeaLevel = (row) => ({
  ...row,
  year: row.year !== void 0 ? Number(row.year) : Number(row.time)
});
const normalizeLLHI = (row) => ({
  ...row,
  year: row.year !== void 0 ? Number(row.year) : Number(row.time),
  // Bonaire/Saba sej_high is in meters, Hetzner lphi_max in cm. Components verwachten meters
  // (vermenigvuldigen daar met 100), dus Hetzner-waarden delen we hier door 100.
  sej_high: row.sej_high !== void 0 ? Number(row.sej_high) : Number(row.lphi_max) / 100
});
async function load({ url }) {
  const searchParams = url.searchParams;
  const lang = searchParams.get("lang");
  let area_id = searchParams.get("area_id") || "bq";
  area_id = area_id.toLowerCase();
  const areaData = {};
  for (const key in areas) {
    const { climate, seaLevel, llhi } = areas[key].dataUrls;
    const [climateData, seaLevelData, llhiData] = await Promise.all([
      dsvWithRetry(",", climate),
      dsvWithRetry(",", seaLevel),
      dsvWithRetry(",", llhi)
    ]);
    areaData[key] = {
      climateData: climateData.map(normalizeClimate),
      seaLevelData: seaLevelData.map(normalizeSeaLevel),
      llhiData: llhiData.map(normalizeLLHI)
    };
  }
  const zeespiegel_historisch = await dsvWithRetry(",", "https://gist.githubusercontent.com/stichtingcas/a1bf8178404a14f81aeb9d02b21058f5/raw/fc65d6816f0c2bfde5787775abcd81bd7d31e4a5/zeespiegelstijging-historisch.csv");
  return {
    lang,
    area_id,
    areaData,
    zeespiegel_historisch
  };
}
export {
  load
};

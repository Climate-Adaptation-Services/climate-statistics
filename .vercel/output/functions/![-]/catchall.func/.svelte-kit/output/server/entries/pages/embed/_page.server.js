import { dsv } from "d3";
import { c as areas } from "../../../chunks/areas.js";
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
async function load({ url }) {
  const searchParams = url.searchParams;
  const lang = searchParams.get("lang");
  let area_id = searchParams.get("area_id") || "bq";
  area_id = area_id.toLowerCase();
  if (!areas[area_id]) {
    area_id = "bq";
  }
  const { seaLevel, llhi } = areas[area_id].dataUrls;
  const areaData = {
    [area_id]: {
      seaLevelData: await dsvWithRetry(",", seaLevel),
      llhiData: await dsvWithRetry(",", llhi)
    }
  };
  return {
    lang,
    area_id,
    areaData
  };
}
export {
  load
};

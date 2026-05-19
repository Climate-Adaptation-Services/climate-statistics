import { b as store_get, u as unsubscribe_stores, i as bind_props, a as pop, p as push } from "../../../chunks/index2.js";
import { c as areas, l as lang, h } from "../../../chunks/areas.js";
import { s as setLanguage, a as setArea, Z as Zeespiegelstijging } from "../../../chunks/setLanguage.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let selectedArea, seaLevelData, llhiData, areaName;
  let data = $$props["data"];
  {
    setLanguage(data);
    setArea(data.area_id);
  }
  selectedArea = data.area_id;
  seaLevelData = data.areaData[selectedArea]?.seaLevelData;
  llhiData = data.areaData[selectedArea]?.llhiData;
  areaName = areas && selectedArea && areas[selectedArea] && areas[selectedArea].localizedNames[store_get($$store_subs ??= {}, "$lang", lang)] ? areas[selectedArea].localizedNames[store_get($$store_subs ??= {}, "$lang", lang)] : selectedArea;
  if (typeof document !== "undefined" && store_get($$store_subs ??= {}, "$lang", lang)) {
    document.documentElement.lang = store_get($$store_subs ??= {}, "$lang", lang);
  }
  $$payload.out += `<main class="embed-container svelte-fb2kyw">`;
  if (seaLevelData) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="chart svelte-fb2kyw">`;
    if (store_get($$store_subs ??= {}, "$h", h) > 0) {
      $$payload.out += "<!--[-->";
      Zeespiegelstijging($$payload, {
        dataProjection: seaLevelData,
        dataLLHI: llhiData,
        areaName
      });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></main>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};

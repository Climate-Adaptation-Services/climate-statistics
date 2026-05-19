import { b as store_get, c as ensure_array_like, d as attr, e as escape_html, f as attr_style, h as stringify, u as unsubscribe_stores, i as bind_props, a as pop, p as push, j as attr_class, k as store_set } from "../../chunks/index2.js";
import "clsx";
import { t as theme, d as datalaag, a as t, b as area_id, c as areas, l as lang, e as themeOptions, f as areaSelection, i as indicatorOptionsArea, h } from "../../chunks/areas.js";
import * as d3 from "d3";
import { y as fallback } from "../../chunks/utils.js";
import { c as computeMargins, g as getBreakpoint, s as setLanguage, a as setArea, Z as Zeespiegelstijging } from "../../chunks/setLanguage.js";
import "../../chunks/client.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
async function tick() {
}
function Chart($$payload, $$props) {
  push();
  var $$store_subs;
  let droughtDataMax, droughtMax, windRange, yDomain, unit, xValue, yTickLabels, margin, innerWidth, innerHeight;
  let dataClimate = $$props["dataClimate"];
  let indicator = fallback($$props["indicator"], "");
  let areaName = fallback($$props["areaName"], "");
  let svgW = 0;
  let svgH = 0;
  let filteredData;
  const uid = Math.random().toString(36).slice(2, 9);
  const titleId = `chart-title-${uid}`;
  const descId = `chart-desc-${uid}`;
  const tableId = `chart-table-${uid}`;
  let maxData;
  let minData;
  function tickFormat(value) {
    if (store_get($$store_subs ??= {}, "$theme", theme) === "drought" || store_get($$store_subs ??= {}, "$datalaag", datalaag)?.indicator === "hotDays") {
      return d3.format(".0f")(value);
    } else {
      return d3.format(".1f")(value);
    }
  }
  const legendItems = [
    { labelKey: "scenarioCurrent", color: "#5A8A8A" },
    { labelKey: "scenarioLow", color: "#E68650" },
    { labelKey: "scenarioHigh", color: "#B5421E" }
  ];
  filteredData = dataClimate && dataClimate.length ? dataClimate.filter((x) => x.variabel.trim().toLowerCase() === store_get($$store_subs ??= {}, "$datalaag", datalaag).column.trim().toLowerCase()) : [];
  maxData = [
    {
      scenario: "2050",
      data: tickFormat(filteredData[0]?.["2050_max"])
    },
    {
      scenario: "2100",
      data: tickFormat(filteredData[0]?.["2100_max"])
    }
  ];
  minData = [
    {
      scenario: store_get($$store_subs ??= {}, "$t", t)("scenarioCurrent"),
      data: tickFormat(filteredData[0]?.["huidig"])
    },
    {
      scenario: "2050",
      data: tickFormat(filteredData[0]?.["2050_min"])
    },
    {
      scenario: "2100",
      data: tickFormat(filteredData[0]?.["2100_min"])
    }
  ];
  droughtDataMax = store_get($$store_subs ??= {}, "$theme", theme) === "drought" && dataClimate?.length ? Math.max(0, ...dataClimate.filter((d) => /neerslag/i.test(d.variabel ?? "")).flatMap((d) => [
    parseFloat(d.huidig),
    parseFloat(d["2050_min"]),
    parseFloat(d["2050_max"]),
    parseFloat(d["2100_min"]),
    parseFloat(d["2100_max"])
  ].filter((v) => !isNaN(v)))) : 0;
  droughtMax = Math.max(600, Math.ceil(droughtDataMax * 1.1 / 100) * 100);
  windRange = (() => {
    if (store_get($$store_subs ??= {}, "$theme", theme) !== "wind" || !dataClimate?.length) return null;
    const values = dataClimate.filter((d) => /wind/i.test(d.variabel ?? "")).flatMap((d) => [
      d.huidig,
      d["2050_min"],
      d["2050_max"],
      d["2100_min"],
      d["2100_max"]
    ]).map((v) => parseFloat(v)).filter((v) => !isNaN(v));
    if (!values.length) return null;
    return [
      Math.max(0, Math.floor(Math.min(...values) - 0.5)),
      Math.ceil(Math.max(...values) + 0.5)
    ];
  })();
  yDomain = store_get($$store_subs ??= {}, "$datalaag", datalaag)?.indicator === "hotDays" ? [0, 365] : store_get($$store_subs ??= {}, "$theme", theme) === "heat" ? [20, 33] : store_get($$store_subs ??= {}, "$theme", theme) === "wind" && store_get($$store_subs ??= {}, "$area_id", area_id) === "bq" ? [6, 10] : store_get($$store_subs ??= {}, "$theme", theme) === "wind" && (store_get($$store_subs ??= {}, "$area_id", area_id) === "se" || store_get($$store_subs ??= {}, "$area_id", area_id) === "sa") ? [5, 8] : store_get($$store_subs ??= {}, "$theme", theme) === "wind" && store_get($$store_subs ??= {}, "$area_id", area_id) === "sm" ? [2, 5] : store_get($$store_subs ??= {}, "$theme", theme) === "wind" && windRange ? windRange : store_get($$store_subs ??= {}, "$theme", theme) === "drought" ? [0, droughtMax] : [0, 600];
  unit = store_get($$store_subs ??= {}, "$datalaag", datalaag)?.indicator === "hotDays" ? store_get($$store_subs ??= {}, "$t", t)("dayUnit") : store_get($$store_subs ??= {}, "$theme", theme) === "heat" ? " °C" : store_get($$store_subs ??= {}, "$theme", theme) === "wind" ? " m/s" : " mm";
  xValue = (d) => d["scenario"];
  (() => {
    const maxAvg = maxData.reduce((sum, d) => sum + parseFloat(d.data), 0) / maxData.length;
    const minAvg = minData.reduce((sum, d) => sum + parseFloat(d.data), 0) / minData.length;
    return minAvg <= maxAvg;
  })();
  yTickLabels = d3.scaleLinear().domain(yDomain).nice().ticks(5).map((v) => tickFormat(v) + unit);
  margin = (() => {
    const m = computeMargins({
      width: svgW,
      height: svgH,
      yTickLabels,
      hasLegendOnRight: false
    });
    const bp = getBreakpoint();
    if (bp === "sm") return { ...m, left: 16, right: 16 };
    if (bp === "md") return { ...m, left: 32, right: 32 };
    return { ...m, left: 70, right: 70 };
  })();
  innerWidth = Math.max(0, svgW - margin.left - margin.right);
  innerHeight = Math.max(0, svgH - margin.top - margin.bottom);
  d3.scaleBand().domain(minData.map(xValue)).range([0, innerWidth]).paddingInner(0.25);
  d3.scaleLinear().domain(yDomain).range([innerHeight, 0]).nice();
  const each_array = ensure_array_like(legendItems);
  $$payload.out += `<section${attr("aria-labelledby", titleId)}${attr("aria-describedby", `${descId} ${tableId}`)} class="svelte-c93vv4"><div class="chart-viewport svelte-c93vv4"><svg class="svg_chart svelte-c93vv4"${attr("width", svgW)}${attr("height", svgH)} role="img"${attr("aria-labelledby", titleId)}${attr("aria-describedby", descId)}><title${attr("id", titleId)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("chartTitleClimate", { indicator, area: areaName }))}</title><desc${attr("id", descId)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("chartDescClimate"))}</desc><g class="g_chart"${attr("transform", `translate(${margin.left},${margin.top})`)}>`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></g></svg></div> <div class="chart-legend svelte-c93vv4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<span class="legend-item svelte-c93vv4"><span class="swatch svelte-c93vv4"${attr_style(`background-color: ${stringify(item.color)}`)} aria-hidden="true"></span> <span>${escape_html(store_get($$store_subs ??= {}, "$t", t)(item.labelKey))}</span></span>`;
  }
  $$payload.out += `<!--]--></div> <div${attr("id", tableId)} class="visually-hidden"><p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("chartDataSummary"))}</p> <table><caption>${escape_html(store_get($$store_subs ??= {}, "$t", t)("chartTitleClimate", { indicator, area: areaName }))}</caption><thead><tr><th scope="col">${escape_html(store_get($$store_subs ??= {}, "$t", t)("legendTitle"))}</th><th scope="col">${escape_html(store_get($$store_subs ??= {}, "$t", t)("scenarioCurrent"))}</th><th scope="col">2050</th><th scope="col">2100</th></tr></thead><tbody><tr><th scope="row">${escape_html(store_get($$store_subs ??= {}, "$t", t)("scenarioLow"))}</th><td>${escape_html(minData[0].data)}${escape_html(unit)}</td><td>${escape_html(minData[1].data)}${escape_html(unit)}</td><td>${escape_html(minData[2].data)}${escape_html(unit)}</td></tr><tr><th scope="row">${escape_html(store_get($$store_subs ??= {}, "$t", t)("scenarioHigh"))}</th><td>${escape_html(minData[0].data)}${escape_html(unit)}</td><td>${escape_html(maxData[0].data)}${escape_html(unit)}</td><td>${escape_html(maxData[1].data)}${escape_html(unit)}</td></tr></tbody></table></div></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { dataClimate, indicator, areaName });
  pop();
}
function Explanation($$payload, $$props) {
  push();
  var $$store_subs;
  let Tekst = "";
  function interpolate(template, vars) {
    return template?.replace(/{(\w+)}/g, (_, k) => vars[k] ?? "");
  }
  {
    const areaConf = areas[store_get($$store_subs ??= {}, "$area_id", area_id)]?.explanation;
    let baseTekst = "";
    if (areaConf) {
      const linkText = areaConf.scenariosLinkText?.[store_get($$store_subs ??= {}, "$lang", lang)] || "";
      const newTabHint = store_get($$store_subs ??= {}, "$t", t)("opensInNewTab") || "";
      const scenariosLink = areaConf.scenariosUrl && linkText ? `<a href="${areaConf.scenariosUrl}" target="_blank" rel="noopener noreferrer">${linkText}<span class="visually-hidden"> ${newTabHint}</span></a>` : linkText;
      const scenarioOriginExtra = areaConf.scenarioOriginExtra?.[store_get($$store_subs ??= {}, "$lang", lang)] || "";
      const currentClimateExtra = areaConf.currentClimateExtra?.[store_get($$store_subs ??= {}, "$lang", lang)] || "";
      const referencePeriod = areaConf.referencePeriod || "";
      let template = "";
      let extraVars = {};
      if (store_get($$store_subs ??= {}, "$theme", theme) === "slr") {
        template = store_get($$store_subs ??= {}, "$t", t)("explanationSeaLevelRiseTemplate");
      } else if (store_get($$store_subs ??= {}, "$datalaag", datalaag)) {
        const variable = store_get($$store_subs ??= {}, "$datalaag", datalaag).indicator === "hotDays" ? store_get($$store_subs ??= {}, "$t", t)("hotDaysVariable") : store_get($$store_subs ??= {}, "$t", t)(store_get($$store_subs ??= {}, "$datalaag", datalaag).indicator).split(" ").slice(0, 2).join(" ").toLowerCase();
        extraVars.variable = variable;
        if (store_get($$store_subs ??= {}, "$datalaag", datalaag).season === "annual") {
          template = store_get($$store_subs ??= {}, "$t", t)("explanationAnnualTemplate");
        } else {
          const seasonPeriod = areas[store_get($$store_subs ??= {}, "$area_id", area_id)]?.seasonperiod?.[store_get($$store_subs ??= {}, "$lang", lang)]?.[store_get($$store_subs ??= {}, "$datalaag", datalaag).season] || "";
          template = store_get($$store_subs ??= {}, "$t", t)("explanationSeasonalTemplate");
          extraVars.season = store_get($$store_subs ??= {}, "$t", t)(store_get($$store_subs ??= {}, "$datalaag", datalaag).season);
          extraVars.seasonperiodSuffix = seasonPeriod ? ` (${seasonPeriod})` : "";
        }
      }
      baseTekst = interpolate(template, {
        scenariosLink,
        scenarioOriginExtra,
        currentClimateExtra,
        referencePeriod,
        ...extraVars
      });
      if (store_get($$store_subs ??= {}, "$theme", theme) === "slr" && areaConf.hasLLHIParagraph) {
        baseTekst += store_get($$store_subs ??= {}, "$t", t)("explanationLLHIExtra");
      }
    }
    if (store_get($$store_subs ??= {}, "$datalaag", datalaag)?.indicator === "hotDays") {
      const threshold = areas[store_get($$store_subs ??= {}, "$area_id", area_id)]?.hotDaysThreshold;
      if (threshold !== void 0) {
        const formatted = store_get($$store_subs ??= {}, "$lang", lang) === "en" ? String(threshold) : String(threshold).replace(".", ",");
        const definition = interpolate(store_get($$store_subs ??= {}, "$t", t)("hotDaysDefinition"), { threshold: formatted });
        baseTekst = definition + " " + (baseTekst || "");
      }
    }
    Tekst = baseTekst || "";
  }
  $$payload.out += `<section><div><p class="explanation svelte-mpicsj">${html(Tekst)}</p></div></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Sidepanel($$payload, $$props) {
  push();
  var $$store_subs;
  let displayedTheme, activeThemeLabel, indicatorGroups, selectedGroup, groupOptions, visibleAreas;
  const themeIds = ["heat", "drought", "wind", "slr"];
  const themeIcons = {
    heat: "https://raw.githubusercontent.com/sophievanderhorst/data/main/hitte_carib.png",
    drought: "https://raw.githubusercontent.com/sophievanderhorst/data/main/droogte_carib.png",
    wind: "https://raw.githubusercontent.com/sophievanderhorst/data/main/wind_carib.png",
    slr: "https://raw.githubusercontent.com/sophievanderhorst/data/main/zst_carib.png"
  };
  let hoveredTheme = null;
  const seasonLabelKey = {
    annual: "seasonAnnual",
    dry: "seasonDry",
    wet: "seasonWet",
    transition: "seasonTransition"
  };
  function getIndicatorGroup(option) {
    if (option.indicator === "hotDays") return "hotDays";
    return option.indicator.replace(/Dry$|Wet$|Transition$/, "");
  }
  displayedTheme = store_get($$store_subs ??= {}, "$theme", theme);
  activeThemeLabel = areas[store_get($$store_subs ??= {}, "$area_id", area_id)]?.titles?.[store_get($$store_subs ??= {}, "$lang", lang)]?.[displayedTheme] || "";
  indicatorGroups = [
    ...new Set(store_get($$store_subs ??= {}, "$themeOptions", themeOptions).map(getIndicatorGroup))
  ];
  selectedGroup = store_get($$store_subs ??= {}, "$datalaag", datalaag) ? getIndicatorGroup(store_get($$store_subs ??= {}, "$datalaag", datalaag)) : indicatorGroups[0];
  groupOptions = store_get($$store_subs ??= {}, "$themeOptions", themeOptions).filter((o) => getIndicatorGroup(o) === selectedGroup);
  visibleAreas = store_get($$store_subs ??= {}, "$area_id", area_id) && areas[store_get($$store_subs ??= {}, "$area_id", area_id)] ? [
    store_get($$store_subs ??= {}, "$area_id", area_id),
    ...areas[store_get($$store_subs ??= {}, "$area_id", area_id)].switchableTo
  ].filter((v, i, arr) => arr.indexOf(v) === i).sort((a, b) => areas[a].name.localeCompare(areas[b].name)) : [];
  const each_array = ensure_array_like(themeIds);
  $$payload.out += `<section class="svelte-cy7zpk"><div class="panel-section svelte-cy7zpk"><h2 class="svelte-cy7zpk">${escape_html(store_get($$store_subs ??= {}, "$t", t)("chooseTheme"))}</h2> <div class="theme-row svelte-cy7zpk"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let themeId = each_array[$$index];
    $$payload.out += `<button${attr_class("theme-btn svelte-cy7zpk", void 0, {
      "active": store_get($$store_subs ??= {}, "$theme", theme) === themeId,
      "hovered": hoveredTheme === themeId
    })}${attr("id", themeId)} type="button"${attr("aria-label", areas[store_get($$store_subs ??= {}, "$area_id", area_id)]?.titles?.[store_get($$store_subs ??= {}, "$lang", lang)]?.[themeId] || themeId)}${attr("aria-pressed", store_get($$store_subs ??= {}, "$theme", theme) === themeId)}><img class="themelogo svelte-cy7zpk"${attr("src", themeIcons[themeId])} alt=""></button>`;
  }
  $$payload.out += `<!--]--></div> <p class="active-theme-label svelte-cy7zpk">${escape_html(activeThemeLabel)}</p></div> `;
  if (store_get($$store_subs ??= {}, "$theme", theme) !== "slr") {
    $$payload.out += "<!--[-->";
    if (indicatorGroups.length > 0) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(indicatorGroups);
      $$payload.out += `<div class="panel-section svelte-cy7zpk"><h2 id="indicator-heading" class="svelte-cy7zpk">${escape_html(store_get($$store_subs ??= {}, "$t", t)("chooseIndicator"))}</h2> <div class="pill-group pill-group--stacked svelte-cy7zpk" role="group" aria-labelledby="indicator-heading"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let group = each_array_1[$$index_1];
        $$payload.out += `<button type="button"${attr_class("pill svelte-cy7zpk", void 0, { "active": selectedGroup === group })}${attr("aria-pressed", selectedGroup === group)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)(group))}</button>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (groupOptions.length > 1) {
      $$payload.out += "<!--[-->";
      const each_array_2 = ensure_array_like(groupOptions);
      $$payload.out += `<div class="panel-section svelte-cy7zpk"><h2 id="season-heading" class="svelte-cy7zpk">${escape_html(store_get($$store_subs ??= {}, "$t", t)("chooseSeason"))}</h2> <div class="pill-group svelte-cy7zpk" role="group" aria-labelledby="season-heading"><!--[-->`;
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let option = each_array_2[$$index_2];
        $$payload.out += `<button type="button"${attr_class("pill svelte-cy7zpk", void 0, {
          "active": store_get($$store_subs ??= {}, "$datalaag", datalaag)?.indicator === option.indicator
        })}${attr("aria-pressed", store_get($$store_subs ??= {}, "$datalaag", datalaag)?.indicator === option.indicator)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)(seasonLabelKey[option.season] ?? option.indicator))}</button>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$areaSelection", areaSelection)) {
    $$payload.out += "<!--[-->";
    const each_array_3 = ensure_array_like(visibleAreas);
    $$payload.out += `<div class="panel-section svelte-cy7zpk"><h2 id="location-heading" class="svelte-cy7zpk">${escape_html(store_get($$store_subs ??= {}, "$t", t)("chooseLocation"))}</h2> <div class="country-row svelte-cy7zpk" role="group" aria-labelledby="location-heading"><!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let areaId = each_array_3[$$index_3];
      if (areas[areaId]) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="country-item svelte-cy7zpk"><button class="country-btn svelte-cy7zpk"${attr("id", areaId)} type="button"${attr("aria-labelledby", "caption-" + areaId)}${attr("aria-pressed", store_get($$store_subs ??= {}, "$area_id", area_id) === areaId)}><img${attr_class("countrylogo " + areaId + (store_get($$store_subs ??= {}, "$area_id", area_id) === areaId ? " activecountry" : ""), "svelte-cy7zpk")}${attr("src", areas[areaId].logo)} alt=""></button> <p${attr("id", "caption-" + areaId)}${attr_class("countrycaption " + areaId + (store_get($$store_subs ??= {}, "$area_id", area_id) === areaId ? " activecaption" : ""), "svelte-cy7zpk")}>${escape_html(areas[areaId].localizedNames[store_get($$store_subs ??= {}, "$lang", lang)])}</p></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="panel-section panel-section--explanation svelte-cy7zpk">`;
  Explanation($$payload);
  $$payload.out += `<!----></div></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let selectedArea, climateData, seaLevelData, llhiData, areaName, showAreaName;
  let data = $$props["data"];
  let mainEl;
  let previousAreaId = data.area_id;
  let chartTitle;
  {
    setLanguage(data);
    setArea(data.area_id);
    store_set(indicatorOptionsArea, areas[data.area_id].indicatorOptions);
    const filteredOptions = store_get($$store_subs ??= {}, "$indicatorOptionsArea", indicatorOptionsArea).filter((option) => option.theme === store_get($$store_subs ??= {}, "$theme", theme));
    store_set(themeOptions, filteredOptions);
    store_set(datalaag, store_get($$store_subs ??= {}, "$themeOptions", themeOptions)[0]);
  }
  selectedArea = store_get($$store_subs ??= {}, "$area_id", area_id) || data.area_id;
  climateData = data.areaData[selectedArea]?.climateData;
  seaLevelData = data.areaData[selectedArea]?.seaLevelData;
  llhiData = data.areaData[selectedArea]?.llhiData;
  store_get($$store_subs ??= {}, "$theme", theme) === "slr" ? chartTitle = store_get($$store_subs ??= {}, "$t", t)("seaLevelRise") : chartTitle = store_get($$store_subs ??= {}, "$t", t)(store_get($$store_subs ??= {}, "$datalaag", datalaag).indicator);
  areaName = areas && selectedArea && areas[selectedArea] && areas[selectedArea].localizedNames[store_get($$store_subs ??= {}, "$lang", lang)] ? areas[selectedArea].localizedNames[store_get($$store_subs ??= {}, "$lang", lang)] : selectedArea;
  showAreaName = areas?.[selectedArea]?.switchableTo?.length > 0;
  if (typeof document !== "undefined" && store_get($$store_subs ??= {}, "$lang", lang)) {
    document.documentElement.lang = store_get($$store_subs ??= {}, "$lang", lang);
  }
  if (typeof document !== "undefined" && selectedArea !== previousAreaId) {
    previousAreaId = selectedArea;
    tick().then(() => mainEl?.focus());
  }
  $$payload.out += `<a class="skip-link" href="#main">${escape_html(store_get($$store_subs ??= {}, "$t", t)("skipToMain"))}</a> <div class="App svelte-hftauj"><aside class="sidepanel svelte-hftauj"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("chooseTheme"))}>`;
  Sidepanel($$payload);
  $$payload.out += `<!----></aside> <main id="main" tabindex="-1" class="main_panel svelte-hftauj"><div class="chart-container svelte-hftauj"><header class="chart-header svelte-hftauj"><h1 class="chart-title svelte-hftauj" aria-live="polite" aria-atomic="true">${escape_html(chartTitle)}`;
  if (showAreaName) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="chart-title-sep svelte-hftauj">—</span> <span class="chart-title-area svelte-hftauj">${escape_html(areaName)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></h1></header> `;
  if (climateData) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="chart svelte-hftauj">`;
    if (store_get($$store_subs ??= {}, "$h", h) > 0 && store_get($$store_subs ??= {}, "$theme", theme) === "slr") {
      $$payload.out += "<!--[-->";
      Zeespiegelstijging($$payload, {
        dataProjection: seaLevelData,
        dataLLHI: llhiData,
        areaName
      });
    } else {
      $$payload.out += "<!--[!-->";
      Chart($$payload, {
        dataClimate: climateData,
        indicator: chartTitle,
        areaName
      });
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="mobile-explanation svelte-hftauj">`;
  Explanation($$payload);
  $$payload.out += `<!----></div></main></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};

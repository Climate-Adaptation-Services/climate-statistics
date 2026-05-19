import { d as attr, j as attr_class, i as bind_props, a as pop, p as push, l as clsx, b as store_get, h as stringify, u as unsubscribe_stores, c as ensure_array_like, e as escape_html } from "./index2.js";
import * as d3 from "d3";
import { w, a as t, g as hoveredYear, h, b as area_id, c as areas, f as areaSelection, l as lang } from "./areas.js";
import { annotation } from "d3-svg-annotation";
import { g as get } from "./index.js";
import "roughjs";
import { y as fallback } from "./utils.js";
const measureCache = /* @__PURE__ */ new Map();
let sharedCanvas;
function getContext() {
  if (typeof document === "undefined") return null;
  if (!sharedCanvas) sharedCanvas = document.createElement("canvas");
  return sharedCanvas.getContext("2d");
}
function measureTextWidth(text, fontSize = 14, fontFamily = "Silka, sans-serif") {
  const key = `${fontSize}|${fontFamily}|${text}`;
  if (measureCache.has(key)) return measureCache.get(key);
  const ctx = getContext();
  if (!ctx) {
    const fallback2 = String(text).length * fontSize * 0.6;
    measureCache.set(key, fallback2);
    return fallback2;
  }
  ctx.font = `${fontSize}px ${fontFamily}`;
  const width = ctx.measureText(String(text)).width;
  measureCache.set(key, width);
  return width;
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function computeMargins({
  width,
  height,
  yTickLabels = [],
  hasLegendOnRight = false,
  fontSize = 14
} = {}) {
  const longest = yTickLabels.reduce(
    (acc, label) => Math.max(acc, measureTextWidth(label, fontSize)),
    0
  );
  const left = clamp(longest + 16, 48, Math.max(60, width * 0.25));
  const right = hasLegendOnRight ? clamp(width * 0.15, 80, 160) : clamp(left, 24, 80);
  const top = clamp(height * 0.08, 24, 80);
  const bottom = clamp(height * 0.12, 40, 80);
  return { top, right, bottom, left };
}
function getBreakpoint(width) {
  return "sm";
}
function XAxis($$payload, $$props) {
  push();
  let scale = $$props["scale"];
  let xTransform = $$props["xTransform"];
  let yTransform = $$props["yTransform"];
  let className = $$props["className"];
  let axis = $$props["axis"];
  $$payload.out += `<g${attr("transform", `translate(${xTransform}, ${yTransform})`)}${attr_class(clsx(className))}></g>`;
  bind_props($$props, {
    scale,
    xTransform,
    yTransform,
    className,
    axis
  });
  pop();
}
function YAxis($$payload, $$props) {
  push();
  let scale = $$props["scale"];
  let xTransform = $$props["xTransform"];
  let yTransform = $$props["yTransform"];
  let className = $$props["className"];
  let axis = $$props["axis"];
  $$payload.out += `<g${attr("transform", `translate(${xTransform}, ${yTransform})`)}${attr_class(clsx(className))}></g>`;
  bind_props($$props, {
    scale,
    xTransform,
    yTransform,
    className,
    axis
  });
  pop();
}
function Line($$payload, $$props) {
  push();
  let data = $$props["data"];
  let color = $$props["color"];
  let variable = $$props["variable"];
  let legendText = $$props["legendText"];
  let xScale = $$props["xScale"];
  let yScale = $$props["yScale"];
  let className = $$props["className"];
  let margin = $$props["margin"];
  $$payload.out += `<g${attr_class(className + "g", "svelte-hndmbh")}><path${attr_class(className + "path", "svelte-hndmbh")}${attr("stroke", color)} stroke-width="2.2" fill="none"></path></g>`;
  bind_props($$props, {
    data,
    color,
    variable,
    legendText,
    xScale,
    yScale,
    className,
    margin
  });
  pop();
}
function LLHI($$payload, $$props) {
  push();
  var $$store_subs;
  let data = $$props["data"];
  let color = $$props["color"];
  let variable = $$props["variable"];
  let legendText = $$props["legendText"];
  let xScale = $$props["xScale"];
  let yScale = $$props["yScale"];
  let className = $$props["className"];
  let margin = $$props["margin"];
  const isNarrow = store_get($$store_subs ??= {}, "$w", w) < 768;
  const noteWrap = isNarrow ? Math.max(180, store_get($$store_subs ??= {}, "$w", w) * 0.5) : Math.min(220, Math.max(120, store_get($$store_subs ??= {}, "$w", w) * 0.22));
  const annotations = isNarrow ? [] : [
    {
      note: {
        label: get(t)("slrScenarioHighest"),
        wrap: noteWrap
      },
      data: { "year": 2059, variable: "120.26" },
      dy: -20,
      dx: store_get($$store_subs ??= {}, "$w", w) / 18
    }
  ];
  annotation().accessors({
    x: (d) => xScale(d.year),
    y: (d) => yScale(d.variable)
  }).accessorsInverse({
    date: (d) => xScale.invert(d.year),
    close: (d) => yScale.invert(d.variable)
  }).annotations(annotations);
  $$payload.out += `<g${attr_class(className.replaceAll(" ", "").replaceAll("&", "").replaceAll(".", "") + "g", "svelte-17sfcr5")} text-anchor="start"${attr("font-size", `${stringify(8 + store_get($$store_subs ??= {}, "$w", w) * 7e-3)}px`)}><path${attr_class(className.replaceAll(" ", "").replaceAll("&", "").replaceAll(".", "") + "path", "svelte-17sfcr5")}${attr("stroke", color)} stroke-width="1" fill="none" stroke-dasharray="8 4"></path></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    data,
    color,
    variable,
    legendText,
    xScale,
    yScale,
    className,
    margin
  });
  pop();
}
function Area($$payload, $$props) {
  push();
  let data = $$props["data"];
  let color = $$props["color"];
  let opacity = $$props["opacity"];
  let variable1 = $$props["variable1"];
  let variable2 = $$props["variable2"];
  let xScale = $$props["xScale"];
  let yScale = $$props["yScale"];
  let className = $$props["className"];
  let hachureAngle = $$props["hachureAngle"];
  d3.area().x((d) => xScale(d.year)).y0((d) => yScale(d[variable1])).y1((d) => yScale(d[variable2]));
  $$payload.out += `<g${attr_class("rough" + className)}${attr("opacity", opacity)}></g>`;
  bind_props($$props, {
    data,
    color,
    opacity,
    variable1,
    variable2,
    xScale,
    yScale,
    className,
    hachureAngle
  });
  pop();
}
function ZeespiegelHover($$payload, $$props) {
  push();
  var $$store_subs;
  let hoverBarWidth, years;
  let dataProjection = $$props["dataProjection"];
  let linesData = $$props["linesData"];
  let xScale = $$props["xScale"];
  let yScale = $$props["yScale"];
  let height = $$props["height"];
  let areaOpacity = $$props["areaOpacity"];
  let margin = $$props["margin"];
  let compact = fallback($$props["compact"], false);
  function valueTextForYear(year) {
    const row = dataProjection?.find((d) => d.year === year);
    if (!row) return String(year);
    const parts = linesData.map((line) => {
      const med = Math.round(row[line.median]);
      const lo = Math.round(row[line.variableLow]);
      const hi = Math.round(row[line.variableHigh]);
      return `${line.legendText}: ${store_get($$store_subs ??= {}, "$t", t)("median")} ${med} cm, ${store_get($$store_subs ??= {}, "$t", t)("range")} ${lo}–${hi} cm`;
    });
    return `${year} — ${parts.join("; ")}`;
  }
  hoverBarWidth = dataProjection.length > 1 ? xScale(dataProjection[1].year) - xScale(dataProjection[0].year) : 10;
  years = (dataProjection ?? []).map((d) => d.year).sort((a, b) => a - b);
  const each_array_4 = ensure_array_like(dataProjection);
  $$payload.out += `<g class="hover"><rect class="keyboard-hotspot svelte-kvbv27"${attr("x", margin.left)}${attr("y", margin.top)}${attr("width", Math.max(0, xScale.range()[1] - margin.left))}${attr("height", Math.max(0, height - margin.top))} fill="transparent" pointer-events="none" tabindex="0" role="slider"${attr("aria-label", store_get($$store_subs ??= {}, "$t", t)("chartYearSliderLabel"))}${attr("aria-valuemin", years[0])}${attr("aria-valuemax", years[years.length - 1])}${attr("aria-valuenow", store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear) ?? years[Math.floor(years.length / 2)])}${attr("aria-valuetext", valueTextForYear(store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear) ?? years[Math.floor(years.length / 2)]))}></rect>`;
  if (store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear) !== null) {
    $$payload.out += "<!--[-->";
    const each_array_2 = ensure_array_like(linesData);
    const each_array_3 = ensure_array_like(linesData);
    $$payload.out += `<g>`;
    if (compact) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(linesData);
      $$payload.out += `<g${attr("transform", `translate(${margin.left + 16}, 8)`)}><text x="0" y="0" class="legendYear" font-size="18" font-weight="700" dominant-baseline="hanging" fill="#333">${escape_html(Math.floor(store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear)))}</text><text x="82" y="4" class="legendCircles" font-size="11" fill="#666" dominant-baseline="hanging">${escape_html(store_get($$store_subs ??= {}, "$t", t)("median"))}</text><text x="150" y="4" class="legendCircles" font-size="11" fill="#666" dominant-baseline="hanging">${escape_html(store_get($$store_subs ??= {}, "$t", t)("range"))}</text><!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let d = each_array[i];
        const point = dataProjection.find((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear));
        $$payload.out += `<g${attr("transform", `translate(0, ${24 + i * 18})`)}><text x="0"${attr("fill", d.labelColor ?? d.color)} font-size="13" font-weight="600" dominant-baseline="hanging">${escape_html(d.legendText)}</text><text x="82"${attr("fill", d.labelColor ?? d.color)} font-size="13" dominant-baseline="hanging">${escape_html(Math.round(point[d.median]))} cm</text><text x="150"${attr("fill", d.labelColor ?? d.color)} font-size="13" dominant-baseline="hanging">${escape_html(Math.round(point[d.variableLow]))}–${escape_html(Math.round(point[d.variableHigh]))} cm</text></g>`;
      }
      $$payload.out += `<!--]--></g>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_1 = ensure_array_like(linesData);
      $$payload.out += `<g${attr("transform", `translate(${margin.left + 50},${margin.top + 40})`)} opacity="1"><text x="50" y="0" class="legendYear" font-size="24">${escape_html(Math.floor(store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear)))}</text><text x="64" y="30" class="legendYear" font-size="14">${escape_html(store_get($$store_subs ??= {}, "$t", t)("median"))}</text><text x="135" y="30" class="legendYear" font-size="14">${escape_html(store_get($$store_subs ??= {}, "$t", t)("range"))}</text><!--[-->`;
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let d = each_array_1[i];
        $$payload.out += `<g font-size="16"><text${attr("fill", d.labelColor ?? d.color)} class="legendCircles" x="-26"${attr("y", 35 + (linesData.length - i) * 20)}>${escape_html(d.legendText)}</text><text${attr("fill", d.labelColor ?? d.color)} class="legendCircles" x="64"${attr("y", 35 + (linesData.length - i) * 20)}>${escape_html(Math.round(dataProjection.filter((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))[0][d.median]) + " cm")}</text><text${attr("fill", d.labelColor ?? d.color)} class="legendCircles" x="135"${attr("y", 35 + (linesData.length - i) * 20)}>${escape_html(Math.round(dataProjection.filter((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))[0][d.variableLow]) + " - " + Math.round(dataProjection.filter((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))[0][d.variableHigh]) + " cm")}</text></g>`;
      }
      $$payload.out += `<!--]--></g>`;
    }
    $$payload.out += `<!--]--><path${attr("d", d3.line()([
      [
        xScale(Math.floor(store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))),
        0
      ],
      [
        xScale(Math.floor(store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))),
        height
      ]
    ]))} stroke="grey" opacity="0.5" stroke-width="1.8" fill="none" stroke-dasharray="5,5"></path><!--[-->`;
    for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
      let d = each_array_2[i];
      $$payload.out += `<rect${attr("fill", d.labelColor ?? d.color)}${attr("opacity", areaOpacity)}${attr("x", xScale(Math.floor(store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))) - 1.5)}${attr("y", yScale(dataProjection.filter((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))[0][d.variableHigh]))}${attr("height", yScale(dataProjection.filter((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))[0][d.variableLow]) - yScale(dataProjection.filter((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))[0][d.variableHigh]))} width="2"></rect>`;
    }
    $$payload.out += `<!--]--><!--[-->`;
    for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
      let d = each_array_3[i];
      $$payload.out += `<g><circle r="4" stroke="white" stroke-width="2"${attr("fill", d.labelColor ?? d.color)}${attr("cx", xScale(Math.floor(store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))))}${attr("cy", yScale(dataProjection.filter((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))[0][d.variableLow]))}></circle><circle r="4" stroke="white" stroke-width="2"${attr("fill", d.labelColor ?? d.color)}${attr("cx", xScale(Math.floor(store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))))}${attr("cy", yScale(dataProjection.filter((d2) => d2.year === store_get($$store_subs ??= {}, "$hoveredYear", hoveredYear))[0][d.variableHigh]))}></circle></g>`;
    }
    $$payload.out += `<!--]--></g>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<g class="hover-prompt"${attr("transform", `translate(${margin.left + 16},${margin.top + 40})`)}><text font-style="italic" text-anchor="start" fill="#666"><tspan>${escape_html(store_get($$store_subs ??= {}, "$t", t)("slrHover1"))}</tspan> <tspan x="0" y="1em">${escape_html(store_get($$store_subs ??= {}, "$t", t)("slrHover2"))}</tspan></text></g>`;
  }
  $$payload.out += `<!--]--><!--[-->`;
  for (let i = 0, $$length = each_array_4.length; i < $$length; i++) {
    let d = each_array_4[i];
    $$payload.out += `<rect${attr("width", hoverBarWidth)}${attr("height", height + 40)} fill="steelblue"${attr("x", xScale(d.year) - hoverBarWidth / 2)} y="0" fill-opacity="0"></rect>`;
  }
  $$payload.out += `<!--]--></g>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    dataProjection,
    linesData,
    xScale,
    yScale,
    height,
    areaOpacity,
    margin,
    compact
  });
  pop();
}
function Zeespiegelstijging($$payload, $$props) {
  push();
  var $$store_subs;
  let srYears, yTickLabels, stackedLegend, margin, innerWidth, innerHeight, xScale, yScale, xTickCount, xTickValues, xAxis, yAxis, median_lines;
  let dataProjection = $$props["dataProjection"];
  let dataLLHI = $$props["dataLLHI"];
  let areaName = fallback($$props["areaName"], "");
  const uid = Math.random().toString(36).slice(2, 9);
  const titleId = `slr-title-${uid}`;
  const descId = `slr-desc-${uid}`;
  const tableId = `slr-table-${uid}`;
  function rowFor(year) {
    return dataProjection.find((d) => d.year === year);
  }
  const yAxisTickFormat = (number) => d3.format(".3s")(number).replace(".000", "").replace(".00", "").replace(".0", "");
  const xAxisTickFormat = (number) => d3.format("d")(number).replace(",", "");
  const colorGematigd = "#216666";
  const colorSterk = "#e86013";
  const labelColorGematigd = colorGematigd;
  const labelColorSterk = "#B5421E";
  const areaOpacity = "0.6";
  srYears = (() => {
    if (!dataProjection?.length) return [];
    const all = dataProjection.map((d) => d.year).sort((a, b) => a - b);
    const first = all[0];
    const last = all[all.length - 1];
    const sampled = all.filter((y) => y % 10 === 0 || y === first || y === last);
    return [...new Set(sampled)].sort((a, b) => a - b);
  })();
  yTickLabels = d3.scaleLinear().domain([0, 140]).nice().ticks(5).map(yAxisTickFormat);
  stackedLegend = store_get($$store_subs ??= {}, "$w", w) < 768;
  margin = (() => {
    const m = computeMargins({
      width: store_get($$store_subs ??= {}, "$w", w),
      height: store_get($$store_subs ??= {}, "$h", h),
      yTickLabels,
      hasLegendOnRight: !stackedLegend
    });
    m.top = Math.max(m.top, 36);
    if (stackedLegend) {
      m.left = Math.max(m.left, 40);
      m.right = Math.min(m.right, 18);
      m.top = Math.max(m.top, 70);
      m.bottom = Math.max(m.bottom, 96);
    } else {
      m.left = Math.max(m.left, 70);
      m.bottom = Math.min(m.bottom, 36);
    }
    return m;
  })();
  innerWidth = Math.max(0, store_get($$store_subs ??= {}, "$w", w) - margin.left - margin.right);
  innerHeight = Math.max(0, store_get($$store_subs ??= {}, "$h", h) - margin.top - margin.bottom);
  xScale = d3.scaleLinear().domain([
    1995,
    dataProjection[dataProjection.length - 1].year
  ]).range([
    margin.left,
    stackedLegend ? margin.left + innerWidth : innerWidth
  ]);
  yScale = d3.scaleLinear().domain([0, 140]).range([innerHeight, margin.top]).nice();
  xTickCount = store_get($$store_subs ??= {}, "$w", w) < 480 ? 4 : store_get($$store_subs ??= {}, "$w", w) < 768 ? 6 : 12;
  xTickValues = xScale.ticks(xTickCount).filter(Number.isInteger);
  xAxis = d3.axisBottom(xScale).tickValues(xTickValues).tickSizeOuter(0).tickFormat(xAxisTickFormat);
  yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(yAxisTickFormat);
  median_lines = [
    {
      "median": "ssp126_50pc",
      "variableLow": "ssp126_5pc",
      "variableHigh": "ssp126_95pc",
      "color": colorGematigd,
      "labelColor": labelColorGematigd,
      "legendText": store_get($$store_subs ??= {}, "$t", t)("scenarioLow"),
      "hachureAngle": "140",
      "legendText2": store_get($$store_subs ??= {}, "$t", t)("withLow"),
      "y_offset_text": ["48", "62"],
      "patternId": "hatch-mild"
    },
    {
      "median": "ssp585_50pc",
      "variableLow": "ssp585_5pc",
      "variableHigh": "ssp585_95pc",
      "color": colorSterk,
      "labelColor": labelColorSterk,
      "legendText": store_get($$store_subs ??= {}, "$t", t)("scenarioHigh"),
      "hachureAngle": "60",
      "legendText2": store_get($$store_subs ??= {}, "$t", t)("withHigh"),
      "y_offset_text": ["53", "67"],
      "patternId": "hatch-sterk"
    }
  ];
  const each_array = ensure_array_like(median_lines);
  const each_array_1 = ensure_array_like(srYears);
  const each_array_2 = ensure_array_like(median_lines);
  $$payload.out += `<svg id="svg_zeespiegel_chart" role="img"${attr("aria-labelledby", titleId)}${attr("aria-describedby", descId)} class="svelte-xxlf5e"><title${attr("id", titleId)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("chartTitleSeaLevel", { area: areaName }))}</title><desc${attr("id", descId)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("chartDescSeaLevel"))}</desc><defs><pattern id="hatch-mild" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="5"${attr("stroke", colorGematigd)} stroke-width="1.5"></line></pattern><pattern id="hatch-sterk" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(-30)"><line x1="0" y1="0" x2="0" y2="5"${attr("stroke", colorSterk)} stroke-width="1.5"></line></pattern></defs>`;
  XAxis($$payload, {
    scale: xScale,
    xTransform: 0,
    yTransform: innerHeight,
    className: "lineChart__xAxis",
    axis: xAxis
  });
  $$payload.out += `<!---->`;
  YAxis($$payload, {
    xTransform: margin.left,
    yTransform: 0,
    scale: yScale,
    className: "lineChart__yAxis",
    axis: yAxis
  });
  $$payload.out += `<!---->`;
  if (stackedLegend) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<text class="y-axis-unit svelte-xxlf5e"${attr("x", margin.left)}${attr("y", margin.top - 8)} text-anchor="end">cm</text>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<text class="y-axis-label svelte-xxlf5e"${attr("transform", `translate(${Math.min(24, margin.left / 3)}, ${(margin.top + innerHeight) / 2}) rotate(-90)`)} text-anchor="middle">${escape_html(store_get($$store_subs ??= {}, "$t", t)("riseInCm"))}</text>`;
  }
  $$payload.out += `<!--]-->`;
  LLHI($$payload, {
    data: dataLLHI,
    color: "#5b5b5b",
    variable: "sej_high",
    legendText: "LLHI",
    xScale,
    yScale,
    className: "llhi" + store_get($$store_subs ??= {}, "$area_id", area_id),
    margin
  });
  $$payload.out += `<!----><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let median_line = each_array[i];
    $$payload.out += `<g>`;
    Line($$payload, {
      data: dataProjection,
      color: median_line.color,
      variable: median_line.median,
      legendText: "Median",
      xScale,
      yScale,
      className: "median" + median_line.legendText,
      margin
    });
    $$payload.out += `<!---->`;
    Area($$payload, {
      className: "areaChart" + median_line.legendText,
      data: dataProjection,
      variable1: median_line.variableLow,
      variable2: median_line.variableHigh,
      color: median_line.color,
      opacity: areaOpacity,
      xScale,
      yScale,
      hachureAngle: median_line.hachureAngle
    });
    $$payload.out += `<!---->`;
    if (stackedLegend) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<rect${attr("x", margin.left)}${attr("y", innerHeight + 26 + i * 22)} width="22" height="12"${attr("fill", `url(#${median_line.patternId})`)}></rect><line${attr("x1", margin.left)}${attr("x2", margin.left + 22)}${attr("y1", innerHeight + 32 + i * 22)}${attr("y2", innerHeight + 32 + i * 22)}${attr("stroke", median_line.color)} stroke-width="2"></line><text${attr("x", margin.left + 28)}${attr("y", innerHeight + 36 + i * 22)} class="legendText svelte-xxlf5e"${attr("fill", median_line.labelColor)}>${escape_html(median_line.legendText2)} ${escape_html(store_get($$store_subs ??= {}, "$t", t)("climateChange"))}</text>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<text${attr("x", innerWidth + 9)}${attr("y", yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 48)} class="legendText svelte-xxlf5e"${attr("fill", median_line.labelColor)}>${escape_html(median_line.legendText2)}</text><text${attr("x", innerWidth + 9)}${attr("y", yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 62)} class="legendText svelte-xxlf5e"${attr("fill", median_line.labelColor)}>${escape_html(store_get($$store_subs ??= {}, "$t", t)("climateChange"))}</text>`;
    }
    $$payload.out += `<!--]--></g>`;
  }
  $$payload.out += `<!--]-->`;
  if (stackedLegend) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<line${attr("x1", margin.left)}${attr("x2", margin.left + 22)}${attr("y1", innerHeight + 32 + 2 * 22)}${attr("y2", innerHeight + 32 + 2 * 22)} stroke="#5b5b5b" stroke-width="1.5" stroke-dasharray="4 3"></line><text${attr("x", margin.left + 28)}${attr("y", innerHeight + 36 + 2 * 22)} class="legendText svelte-xxlf5e" fill="#5b5b5b">${escape_html(store_get($$store_subs ??= {}, "$t", t)("slrScenarioHighestShort"))}</text>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  ZeespiegelHover($$payload, {
    dataProjection,
    linesData: median_lines,
    xScale,
    yScale,
    height: innerHeight,
    areaOpacity,
    margin,
    compact: stackedLegend
  });
  $$payload.out += `<!----></svg> <div${attr("id", tableId)} class="visually-hidden"><p>${escape_html(store_get($$store_subs ??= {}, "$t", t)("chartDataSummary"))}</p> <table><caption>${escape_html(store_get($$store_subs ??= {}, "$t", t)("chartTitleSeaLevel", { area: areaName }))}</caption><thead><tr><th scope="col">${escape_html(store_get($$store_subs ??= {}, "$t", t)("legendTitle"))}</th><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let y = each_array_1[$$index_1];
    $$payload.out += `<th scope="col">${escape_html(y)}</th>`;
  }
  $$payload.out += `<!--]--></tr></thead><tbody><!--[-->`;
  for (let $$index_4 = 0, $$length = each_array_2.length; $$index_4 < $$length; $$index_4++) {
    let line = each_array_2[$$index_4];
    const each_array_3 = ensure_array_like(srYears);
    const each_array_4 = ensure_array_like(srYears);
    $$payload.out += `<tr><th scope="row">${escape_html(line.legendText2)} ${escape_html(store_get($$store_subs ??= {}, "$t", t)("climateChange"))} — ${escape_html(store_get($$store_subs ??= {}, "$t", t)("median"))}</th><!--[-->`;
    for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
      let y = each_array_3[$$index_2];
      const r = rowFor(y);
      $$payload.out += `<td>${escape_html(r ? Math.round(r[line.median]) : "")} cm</td>`;
    }
    $$payload.out += `<!--]--></tr> <tr><th scope="row">${escape_html(line.legendText2)} ${escape_html(store_get($$store_subs ??= {}, "$t", t)("climateChange"))} — ${escape_html(store_get($$store_subs ??= {}, "$t", t)("range"))}</th><!--[-->`;
    for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
      let y = each_array_4[$$index_3];
      const r = rowFor(y);
      $$payload.out += `<td>${escape_html(r ? `${Math.round(r[line.variableLow])}–${Math.round(r[line.variableHigh])}` : "")} cm</td>`;
    }
    $$payload.out += `<!--]--></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { dataProjection, dataLLHI, areaName });
  pop();
}
function setArea(id) {
  const config = areas[id] || areas["bq"];
  area_id.set(config.area_id);
  areaSelection.set(!!config.switchableTo.length);
}
function setLanguage(data) {
  if (data.lang === "nl") {
    lang.set("nl");
  } else if (data.lang === "pa") {
    lang.set("pa");
  } else if (data.lang === "fr") {
    lang.set("fr");
  } else if (data.lang === "es") {
    lang.set("es");
  } else {
    lang.set("en");
  }
}
export {
  Zeespiegelstijging as Z,
  setArea as a,
  computeMargins as c,
  getBreakpoint as g,
  setLanguage as s
};

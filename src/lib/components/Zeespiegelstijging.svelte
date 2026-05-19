<script>
  import * as d3 from 'd3';
  import { t } from '$lib/i18n/translate.js';

  import XAxis from './axes/XAxis.svelte';
  import YAxis from './axes/YAxis.svelte';
  import Line from './Line.svelte';
  import LLHI from './LLHI.svelte';
  import Area from './Area.svelte'
  import ZeespiegelHover from './ZeespiegelHover.svelte';

  import { w, h, area_id } from '$lib/stores';
  import { computeMargins } from '$lib/noncomponents/chartLayout.js';

  export let dataProjection;
  export let dataLLHI
  export let areaName = '';

  // Unieke ids voor aria-labelledby / aria-describedby zodat meerdere instanties niet botsen.
  const uid = Math.random().toString(36).slice(2, 9);
  const titleId = `slr-title-${uid}`;
  const descId = `slr-desc-${uid}`;
  const tableId = `slr-table-${uid}`;

  // Sample-jaartallen voor de SR-tabel: elk 10e jaar + altijd het eerste en laatste jaartal.
  // Genoeg detail om de curve te volgen zonder de SR-gebruiker te overspoelen (~44 cellen).
  // Voor de fijnmazige data is er de keyboard-slider met aria-valuetext per jaar.
  $: srYears = (() => {
    if (!dataProjection?.length) return [];
    const all = dataProjection.map(d => d.year).sort((a, b) => a - b);
    const first = all[0];
    const last = all[all.length - 1];
    const sampled = all.filter(y => y % 10 === 0 || y === first || y === last);
    // Dedupe + sort (first/last kunnen al een %10-jaar zijn).
    return [...new Set(sampled)].sort((a, b) => a - b);
  })();
  function rowFor(year) {
    return dataProjection.find(d => d.year === year);
  }

  // const dataHistoric = data.zeespiegel_historisch;

  const yAxisTickFormat = number => d3
    .format('.3s')(number)
    .replace('.000', "")
    .replace('.00', "")
    .replace('.0', "")

  $: yTickLabels = d3.scaleLinear().domain([0, 140]).nice().ticks(5).map(yAxisTickFormat);
  $: stackedLegend = $w < 768;
  $: margin = (() => {
    const m = computeMargins({ width: $w, height: $h, yTickLabels, hasLegendOnRight: !stackedLegend });
    m.top = Math.max(m.top, 36);
    if (stackedLegend) {
      // Mobiel: geen legend rechts → plot mag dicht naar de rand, maar laat
      // genoeg ruimte voor het '2100' tick-label (rechts-uitgelijnd op de
      // laatste tick) zodat het niet wordt afgeknipt.
      m.left = Math.max(m.left, 40);
      m.right = Math.min(m.right, 18);
      // Ruimte BOVEN de plot voor de hover-tooltip (in plaats van op de plot).
      m.top = Math.max(m.top, 70);
      // Ruimte onder de plot voor 3 stacked legend-regels (mild, sterk, LLHI)
      // ZONDER overlap met x-as.
      m.bottom = Math.max(m.bottom, 96);
    } else {
      // Extra ruimte voor de geroteerde y-as titel (op x=24) naast de tick-labels.
      m.left = Math.max(m.left, 70);
      m.bottom = Math.min(m.bottom, 36);
    }
    return m;
  })();
  $: innerWidth = Math.max(0, $w - margin.left - margin.right)
  $: innerHeight = Math.max(0, $h - margin.top - margin.bottom)

  $: xScale = d3
    .scaleLinear()
    .domain([
      1995,
      dataProjection[dataProjection.length - 1].year
    ])
    // Op mobiel laten we de plot tot ($w - margin.right) doorlopen — anders
    // eindigt hij ~margin.left te vroeg en blijft er ~52px witruimte rechts.
    // Op desktop blijft de bestaande range zodat de legend-rechts onveranderd
    // op innerWidth+9 blijft staan.
    .range([margin.left, stackedLegend ? margin.left + innerWidth : innerWidth])

  $: yScale = d3
    .scaleLinear()
    .domain([
      0,
      140
    ])
    .range([innerHeight, margin.top])
    .nice()

  const xAxisTickFormat = number => d3
    .format('d')(number)
    .replace(',', '')

  // Hele jaartallen alleen — d3.ticks kan op smalle assen halve jaren produceren
  // (bv. 2017.5) die niet zinvol zijn voor een tijdas. Filter naar integers.
  // Minder ticks op smalle schermen om overlap te voorkomen.
  $: xTickCount = $w < 480 ? 4 : $w < 768 ? 6 : 12;
  $: xTickValues = xScale.ticks(xTickCount).filter(Number.isInteger);

  // Add scales to axis
  $: xAxis = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSizeOuter(0)
    .tickFormat(xAxisTickFormat);

  // Add scales to axis
  $: yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickFormat(yAxisTickFormat);


  // Afgestemd op het Climate Impact Atlas-palet: zelfde teal en oranje als de bar-chart en pills.
  const colorGematigd = '#216666'
  const colorSterk = '#e86013'
  // labelColor wordt gebruikt voor LEGEND-TEKST (niet voor lijnen/oppervlakken). #e86013 op wit
  // haalt maar 3.07:1 — te laag voor WCAG 1.4.3 AA (4.5:1). #B5421E (al in gebruik in de
  // bar-chart als 'colorsMax') haalt ~5:1 en blijft visueel in dezelfde oranje-familie.
  const labelColorGematigd = colorGematigd
  const labelColorSterk = '#B5421E'

  // Reactief op $t zodat legenda-teksten bij taalswitch meeveranderen.
  $: median_lines = [
    {
      'median':'ssp126_50pc',
      'variableLow': 'ssp126_5pc',
      'variableHigh': 'ssp126_95pc',
      'color': colorGematigd,
      'labelColor': labelColorGematigd,
      'legendText': $t('scenarioLow'),
      'hachureAngle': '140',
      'legendText2': $t('withLow'),
      'y_offset_text': ['48', '62'],
      'patternId': 'hatch-mild'
    }, {
      'median':'ssp585_50pc',
      'variableLow': 'ssp585_5pc',
      'variableHigh': 'ssp585_95pc',
      'color': colorSterk,
      'labelColor': labelColorSterk,
      'legendText': $t('scenarioHigh'),
      'hachureAngle': '60',
      'legendText2': $t('withHigh'),
      'y_offset_text': ['53', '67'],
      'patternId': 'hatch-sterk'
    }
  ]

  const areaOpacity = '0.6';

</script>

<svg id="svg_zeespiegel_chart" role="img" aria-labelledby={titleId} aria-describedby={descId}>
  <title id={titleId}>{$t('chartTitleSeaLevel', { area: areaName })}</title>
  <desc id={descId}>{$t('chartDescSeaLevel')}</desc>

  <defs>
    <!-- Diagonale arcering voor de legenda-swatch, in dezelfde richtingen
         als roughjs op de plot tekent (mild +140°, sterk +60°). -->
    <pattern id="hatch-mild" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(40)">
      <line x1="0" y1="0" x2="0" y2="5" stroke={colorGematigd} stroke-width="1.5" />
    </pattern>
    <pattern id="hatch-sterk" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(-30)">
      <line x1="0" y1="0" x2="0" y2="5" stroke={colorSterk} stroke-width="1.5" />
    </pattern>
  </defs>

  <XAxis scale={xScale} xTransform={0} yTransform={innerHeight} className="lineChart__xAxis" axis={xAxis}/>
  <YAxis xTransform={margin.left} yTransform={0} scale={yScale} className="lineChart__yAxis" axis={yAxis}/>
  {#if stackedLegend}
    <text
      class='y-axis-unit'
      x={margin.left}
      y={margin.top - 8}
      text-anchor='end'
    >cm</text>
  {:else}
    <text
      class='y-axis-label'
      transform={`translate(${Math.min(24, margin.left / 3)}, ${(margin.top + innerHeight) / 2}) rotate(-90)`}
      text-anchor='middle'
    >{$t("riseInCm")}</text>
  {/if}

  <LLHI data={dataLLHI} color={'#5b5b5b'} variable={'sej_high'} legendText='LLHI' xScale={xScale} yScale={yScale} className={'llhi'+$area_id} {margin} />

  {#each median_lines as median_line, i}
    <g>
      <Line data={dataProjection} color={median_line.color} variable={median_line.median} legendText='Median' xScale={xScale} yScale={yScale} className={'median' + median_line.legendText} {margin} />

      <Area className={'areaChart' + median_line.legendText} data={dataProjection}
        variable1={median_line.variableLow} variable2={median_line.variableHigh}
        color={median_line.color} opacity={areaOpacity} xScale={xScale} yScale={yScale}
        hachureAngle={median_line.hachureAngle}/>

      {#if stackedLegend}
        <!-- Swatch: gearceerd vlak (= bandbreedte / range) met mediaan-lijn er doorheen. -->
        <rect
          x={margin.left}
          y={innerHeight + 26 + i * 22}
          width="22"
          height="12"
          fill={`url(#${median_line.patternId})`}
        />
        <line
          x1={margin.left}
          x2={margin.left + 22}
          y1={innerHeight + 32 + i * 22}
          y2={innerHeight + 32 + i * 22}
          stroke={median_line.color}
          stroke-width="2"
        />
        <!-- Legenda-tekst: labelColor + volledige opacity voor WCAG-conform contrast (4.5:1).
             De swatch/lijn boven gebruikt nog de helderdere brand-kleur. -->
        <text
          x={margin.left + 28}
          y={innerHeight + 36 + i * 22}
          class='legendText'
          fill={median_line.labelColor}>
          {median_line.legendText2} {$t("climateChange")}
        </text>
      {:else}
        <text x={innerWidth + 9} y={yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 48} class='legendText' fill={median_line.labelColor}>
          {median_line.legendText2}
        </text>
        <text
          x={innerWidth + 9}
          y={yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 62}
          class='legendText'
          fill={median_line.labelColor}>
          {$t("climateChange")}
        </text>
      {/if}
    </g>
  {/each}

  {#if stackedLegend}
    <line
      x1={margin.left}
      x2={margin.left + 22}
      y1={innerHeight + 32 + 2 * 22}
      y2={innerHeight + 32 + 2 * 22}
      stroke="#5b5b5b"
      stroke-width="1.5"
      stroke-dasharray="4 3"
    />
    <text
      x={margin.left + 28}
      y={innerHeight + 36 + 2 * 22}
      class='legendText'
      fill="#5b5b5b">
      {$t("slrScenarioHighestShort")}
    </text>
  {/if}

  <ZeespiegelHover dataProjection={dataProjection} linesData={median_lines} xScale={xScale} yScale={yScale} height={innerHeight} areaOpacity={areaOpacity} {margin} compact={stackedLegend}/>

</svg>

<!-- Tekstueel alternatief op de zeespiegel-grafiek (WCAG SC 1.1.1). De interactieve hover-tooltip is
     niet keyboard-bereikbaar; deze tabel geeft de centrale waardes voor screen-reader-gebruikers. -->
<div id={tableId} class='visually-hidden'>
  <p>{$t('chartDataSummary')}</p>
  <table>
    <caption>{$t('chartTitleSeaLevel', { area: areaName })}</caption>
    <thead>
      <tr>
        <th scope='col'>{$t('legendTitle')}</th>
        {#each srYears as y}
          <th scope='col'>{y}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each median_lines as line}
        <tr>
          <th scope='row'>{line.legendText2} {$t('climateChange')} — {$t('median')}</th>
          {#each srYears as y}
            {@const r = rowFor(y)}
            <td>{r ? Math.round(r[line.median]) : ''} cm</td>
          {/each}
        </tr>
        <tr>
          <th scope='row'>{line.legendText2} {$t('climateChange')} — {$t('range')}</th>
          {#each srYears as y}
            {@const r = rowFor(y)}
            <td>{r ? `${Math.round(r[line.variableLow])}–${Math.round(r[line.variableHigh])}` : ''} cm</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  svg{
    width:100%;
    height:100%;
    /* Sta toe dat een tick-label (bv. '2100') net buiten de svg-rand zichtbaar
       blijft als margin.right minimaal is op mobiel. */
    overflow: visible;
  }

  .legendYear {
    font-weight: normal;
    font-size: var(--fs-md);
  }

  .legendCircles {
    font-weight: normal;
    font-size: var(--fs-xs);
  }

  .legendText {
    font-size: var(--fs-sm);
    font-weight: normal;
  }

  .y-axis-label,
  .y-axis-unit {
    font-size: var(--fs-sm);
    fill: var(--c-muted, #666);
  }

  @media (max-width: 480px) {
    .legendText,
    .y-axis-label,
    .y-axis-unit {
      font-size: var(--fs-xs);
    }
  }

</style>

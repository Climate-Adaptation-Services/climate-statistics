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
    // Extra ruimte voor de geroteerde y-as titel (op x=24) naast de tick-labels.
    m.left = Math.max(m.left, 70);
    if (!stackedLegend) m.bottom = Math.min(m.bottom, 36);
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
    .range([margin.left, innerWidth])
  // .nice()

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
  $: xTickValues = xScale.ticks(12).filter(Number.isInteger);

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

  // Reactief op $t zodat legenda-teksten bij taalswitch meeveranderen.
  $: median_lines = [
    {
      'median':'ssp126_50pc',
      'variableLow': 'ssp126_5pc',
      'variableHigh': 'ssp126_95pc',
      'color': colorGematigd,
      'legendText': $t('mild'),
      'hachureAngle': '140',
      'legendText2': $t('withMild'),
      'y_offset_text': ['48', '62']
    }, {
      'median':'ssp585_50pc',
      'variableLow': 'ssp585_5pc',
      'variableHigh': 'ssp585_95pc',
      'color': colorSterk,
      'legendText': $t('strong'),
      'hachureAngle': '60',
      'legendText2': $t('withStrong'),
      'y_offset_text': ['53', '67']
    }
  ]

  const areaOpacity = '0.6';

</script>

<svg id="svg_zeespiegel_chart">

  <XAxis scale={xScale} xTransform={0} yTransform={innerHeight} className="lineChart__xAxis" axis={xAxis}/>
  <YAxis xTransform={margin.left} yTransform={0} scale={yScale} className="lineChart__yAxis" axis={yAxis}/>
  <text
    class='y-axis-label'
    transform={`translate(${Math.min(24, margin.left / 3)}, ${(margin.top + innerHeight) / 2}) rotate(-90)`}
    text-anchor='middle'
  >{$t("riseInCm")}</text>

  <LLHI data={dataLLHI} color={'#5b5b5b'} variable={'sej_high'} legendText='LLHI' xScale={xScale} yScale={yScale} className={'llhi'+$area_id} {margin} />

  {#each median_lines as median_line, i}
    <g>
      <Line data={dataProjection} color={median_line.color} variable={median_line.median} legendText='Median' xScale={xScale} yScale={yScale} className={'median' + median_line.legendText} {margin} />

      <Area className={'areaChart' + median_line.legendText} data={dataProjection}
        variable1={median_line.variableLow} variable2={median_line.variableHigh}
        color={median_line.color} opacity={areaOpacity} xScale={xScale} yScale={yScale}
        hachureAngle={median_line.hachureAngle}/>

      {#if stackedLegend}
        <text
          x={margin.left}
          y={innerHeight + margin.bottom - 28 + i * 28}
          class='legendText'
          fill={median_line.color}
          opacity={areaOpacity + 0.2}>
          {median_line.legendText2} — {$t("climateChange")}
        </text>
      {:else}
        <text x={innerWidth + 9} y={yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 48} class='legendText' fill={median_line.color} opacity={areaOpacity + 0.2}>
          {median_line.legendText2}
        </text>
        <text
          x={innerWidth + 9}
          y={yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 62}
          class='legendText'
          fill={median_line.color}
          opacity={areaOpacity + 0.2}>
          {$t("climateChange")}
        </text>
      {/if}
    </g>
  {/each}


  <ZeespiegelHover dataProjection={dataProjection} linesData={median_lines} xScale={xScale} yScale={yScale} height={innerHeight} areaOpacity={areaOpacity} {margin}/>

</svg>

<style>
  svg{
    width:100%;
    height:100%;
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

  .y-axis-label {
    font-size: var(--fs-sm);
    fill: var(--c-muted, #666);
  }

  @media (max-width: 480px) {
    .legendText,
    .y-axis-label {
      font-size: var(--fs-xs);
    }
  }

</style>

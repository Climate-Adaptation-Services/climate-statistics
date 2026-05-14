<script>
  import * as d3 from "d3";
  import { datalaag, theme, area_id } from "$lib/stores.js";
  import Bar from './Bar.svelte';
  import { t } from "$lib/i18n/translate";
  import { computeMargins } from "$lib/noncomponents/chartLayout.js";

  export let dataClimate;

  let svgW = 0;
  let svgH = 0;
  let filteredData

$: filteredData = dataClimate && dataClimate.length
  ? dataClimate.filter(x => x.variabel.trim().toLowerCase() === $datalaag.column.trim().toLowerCase())
  : [];

  // colorsMin: [Reference (current), 2050 mild, 2100 mild]; colorsMax: [2050 strong, 2100 strong]
  const colorsMax = ['#E5CDC0', '#E5CDC0']
  const colorsMin = ['#5A8A8A', '#E68650', '#E68650']

  let maxData
  let minData

  function tickFormat(value){
    if ($theme === 'drought' || $datalaag?.indicator === 'hotDays') {return d3.format('.0f')(value)}
    else {return d3.format('.1f')(value)}
  }

  $: maxData = [
      {
        scenario:'2050',
        data: tickFormat(filteredData[0]?.['2050_max'])
      },
      {
        scenario:'2100',
        data: tickFormat(filteredData[0]?.['2100_max'])
    }]

  $: minData = [
    {
        scenario: t('scenarioCurrent'),
        data: tickFormat(filteredData[0]?.['huidig'])
      },
    {
      scenario:'2050',
      data: tickFormat(filteredData[0]?.['2050_min'])
    },
    {
      scenario:'2100',
      data: tickFormat(filteredData[0]?.['2100_min'])
    }]

  // Voor drought: schaal dynamisch op basis van data, zodat de neerslag-waarde niet
  // boven de chart uitvalt (sm/cu kunnen >1100 mm halen). Nice-ceiling naar 100s met 10% padding.
  $: dataMax = filteredData.length
    ? Math.max(
        parseFloat(filteredData[0]?.['huidig']) || 0,
        parseFloat(filteredData[0]?.['2050_min']) || 0,
        parseFloat(filteredData[0]?.['2050_max']) || 0,
        parseFloat(filteredData[0]?.['2100_min']) || 0,
        parseFloat(filteredData[0]?.['2100_max']) || 0
      )
    : 0;
  $: droughtMax = Math.max(600, Math.ceil(dataMax * 1.1 / 100) * 100);

  $: yDomain = $datalaag?.indicator === 'hotDays' ? [0,365]:
     $theme === 'heat' ? [20,33]:
     $theme === 'wind' && $area_id === 'bq' ? [6,10]:
     $theme === 'wind' && $area_id === 'se' ? [5,8]:
     $theme === 'wind' && $area_id === 'sm' ? [2,5]:
     $theme === 'drought' ? [0, droughtMax]:
    [0,600];

  $: unit = $datalaag?.indicator === 'hotDays' ? t('dayUnit'):
    $theme === 'heat' ? " °C":
    $theme === 'wind' ? " m/s":
    " mm";

  $: xValue = d => d['scenario']
  $: yValue = d => d['data']

  // Determine which dataset has smaller values to render on top
  $: shouldMinBeOnTop = (() => {
    // Compare average values of the datasets. So for 2050 and 2100. In theory you would want to check per scenario, but it would need more refactoring of the code and in practice this probably doesn't happen often?
    const maxAvg = maxData.reduce((sum, d) => sum + parseFloat(d.data), 0) / maxData.length;
    const minAvg = minData.reduce((sum, d) => sum + parseFloat(d.data), 0) / minData.length;

    return minAvg <= maxAvg;
  })();

  $: yTickLabels = d3.scaleLinear().domain(yDomain).nice().ticks(5).map(v => tickFormat(v) + unit);
  $: margin = computeMargins({ width: svgW, height: svgH, yTickLabels, hasLegendOnRight: false });
  $: innerWidth = Math.max(0, svgW - margin.left - margin.right);
  $: innerHeight = Math.max(0, svgH - margin.top - margin.bottom);

  $: xScale = d3.scaleBand()
      .domain(minData.map(xValue))
      .range([0, innerWidth])
      .paddingInner(0.25)
  $: yScale = d3.scaleLinear()
          .domain(yDomain)
          .range([innerHeight, 0])
          .nice()

  const legendItems = [
    { labelKey: 'scenarioCurrent', color: '#5A8A8A' },
    { labelKey: 'scenarioLow', color: '#E68650' },
    { labelKey: 'scenarioHigh', color: '#E5CDC0' }
  ];
</script>

<section>
  <div class='chart-viewport' bind:clientWidth={svgW} bind:clientHeight={svgH}>
    <svg class='svg_chart' width={svgW} height={svgH}>
      <g class='g_chart' transform={`translate(${margin.left},${margin.top})`}>
        {#if svgW > 0 && svgH > 0}
          {#if shouldMinBeOnTop}
            <Bar data={maxData} colors={colorsMax} {yScale} {xScale} {yValue} {xValue} {innerHeight} {yDomain} {unit} {tickFormat} className='mark_max' isSmaller={false}/>
            <Bar data={minData} colors={colorsMin} {yScale} {xScale} {yValue} {xValue} {innerHeight} {yDomain} {unit} {tickFormat} className='mark_min' isSmaller={true}/>
          {:else}
            <Bar data={minData} colors={colorsMin} {yScale} {xScale} {yValue} {xValue} {innerHeight} {yDomain} {unit} {tickFormat} className='mark_min' isSmaller={false}/>
            <Bar data={maxData} colors={colorsMax} {yScale} {xScale} {yValue} {xValue} {innerHeight} {yDomain} {unit} {tickFormat} className='mark_max' isSmaller={true}/>
          {/if}
        {/if}
      </g>
    </svg>
  </div>
  <div class='chart-legend'>
    {#each legendItems as item}
      <span class='legend-item'>
        <span class='swatch' style="background-color: {item.color}"></span>
        <span>{t(item.labelKey)}</span>
      </span>
    {/each}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }
  .chart-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md) 0;
    font-size: var(--fs-xs);
    color: var(--c-primary-dark, #184145);
  }
  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background-color: var(--c-bg-soft, #f2f2f2);
    border-radius: 999px;
    line-height: 1.3;
  }
  .swatch {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .chart-viewport {
    flex: 1;
    min-height: 0;
    width: 100%;
  }
  .svg_chart {
    display: block;
  }
</style>

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

  export let dataProjection;
  export let dataLLHI


  // const dataHistoric = data.zeespiegel_historisch;
  
  $: margin = {bottom:$h*0.05, top:$h*0.1, left:100, right:$w*0.1}
  $: innerWidth = $w - margin.left - margin.right
  $: innerHeight = $h - margin.top - margin.bottom

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

  // Add scales to axis
  $: xAxis = d3
    .axisBottom(xScale)
    .ticks(12)
    .tickFormat(xAxisTickFormat);

  const yAxisTickFormat = number => d3
    .format('.3s')(number)
    .replace('.000', "")
    .replace('.00', "")
    .replace('.0', "")

  // Add scales to axis
  $: yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickFormat(yAxisTickFormat);


  const colorGematigd = '#017676'
  const colorSterk = '#f44f01'

  const median_lines = [
    {
      'median':'ssp126_50pc',
      'variableLow': 'ssp126_5pc',
      'variableHigh': 'ssp126_95pc',
      'color': colorGematigd,
      'legendText': t('moderate'),
      'hachureAngle': '140',
      'legendText2': t('withModerate'),
      'y_offset_text': ['48', '62']
    }, {
      'median':'ssp585_50pc',
      'variableLow': 'ssp585_5pc',
      'variableHigh': 'ssp585_95pc',
      'color': colorSterk,
      'legendText': t('strong'),
      'hachureAngle': '60',
      'legendText2': t('withStrong'),
      'y_offset_text': ['53', '67']
    }
  ]

  const areaOpacity = '0.6';

</script>

<svg id="svg_zeespiegel_chart">

  <XAxis scale={xScale} xTransform={0} yTransform={innerHeight} className="lineChart__xAxis" axis={xAxis}/>
  <YAxis xTransform={margin.left} yTransform={0} scale={yScale} className="lineChart__yAxis" axis={yAxis}/>
  <text text-anchor='middle' transform='translate(50, {yScale(70)}) rotate(-90)'>{t("riseInCm")}</text>
  
  <LLHI data={dataLLHI} color={'#5b5b5b'} variable={'sej_high'} legendText='LLHI' xScale={xScale} yScale={yScale} className={'llhi'+$area_id} {margin} />
 
  {#each median_lines as median_line}
    <g>
      <Line data={dataProjection} color={median_line.color} variable={median_line.median} legendText='Median' xScale={xScale} yScale={yScale} className={'median' + median_line.legendText} {margin} />

      <Area className={'areaChart' + median_line.legendText} data={dataProjection} 
        variable1={median_line.variableLow} variable2={median_line.variableHigh} 
        color={median_line.color} opacity={areaOpacity} xScale={xScale} yScale={yScale} 
        width={innerWidth} height={innerHeight} hachureAngle={median_line.hachureAngle} fillStyle='hachure' 
        hachureGap='4'/>
      
      <text x={innerWidth + 9} y={yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 48} className='legendText' fill={median_line.color} opacity={areaOpacity + 0.2}>
        {median_line.legendText2}
      </text>
      <text 
        x={innerWidth + 9} 
        y={yScale(dataProjection[dataProjection.length - 1][median_line.variableHigh]) + 62}
        class='legendText' 
        fill={median_line.color} 
        opacity={areaOpacity + 0.2}>
        {t("climateChange")}
      </text>
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
    font-size: 17px;
  }

  .legendCircles {
    font-weight: normal;
    font-size: 11px;
  }

  .legendText {
    font-size: 13px;
    font-weight: normal;
  }

</style>

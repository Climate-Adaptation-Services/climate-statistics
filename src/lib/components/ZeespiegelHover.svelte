<script>
  import * as d3 from 'd3';

  export let dataProjection
  // export let dataHistoric
  export let linesData
  export let xScale
  export let yScale
  export let height
  export let areaOpacity
  export let margin

  import { hoveredYear } from '$lib/stores';
  import { t } from '$lib/i18n/translate';

  $: hoverBarWidth = dataProjection.length > 1
    ? xScale(dataProjection[1].year) - xScale(dataProjection[0].year)
    : 10;

</script>


<g class='hover'>
  {#if $hoveredYear !== null}
  <g>
    <!-- {/* Group to show hovered year and value ranges */} -->
    <g
      transform={`translate(${margin.left+50},${margin.top+40})`}
      opacity='1'
    >
      <!-- {/* Hovered year */} -->
      <text
        x='50'
        y='0'
        class='legendYear'
        font-size='24'
      >{Math.floor($hoveredYear)}</text>

      <text
        x='64'
        y='30'
        class='legendYear'
        font-size='14'
      >{$t("median")}</text>
      <text
        x='135'
        y='30'
        class='legendYear'
        font-size='14'
      >{$t("range")}</text>

      <!-- {/* Value ranges */} -->
      {#each linesData as d, i}
        <g font-size='16'>
          <text
            fill={d.color}
            class='legendCircles'
            x='-26'
            y={35 + (linesData.length - i) * 20}
          >{d.legendText}</text>
          <text
            fill={d.color}
            class='legendCircles'
            x='64'
            y={35 + (linesData.length - i) * 20}
          >{Math.round(dataProjection.filter(d2 => d2.year === $hoveredYear)[0][d.median]) + ' cm'}</text>
          <text
            fill={d.color}
            class='legendCircles'
            x='135'
            y={35 + (linesData.length - i) * 20}
          >{Math.round(dataProjection.filter(d2 => d2.year === $hoveredYear)[0][d.variableLow]) + ' - ' + Math.round(dataProjection.filter(d => d.year === $hoveredYear)[0][d.variableHigh]) + ' cm'}</text>
        </g>
      {/each}

      <!-- {/* Show the historic value if present, mean for a year */} -->
      <!-- {#if $hoveredYear < d3.max(dataHistoric.map(d => d.year))}
        <g font-size='13'>
          <text
            fill='black'
            class='legendCircles'
            x='-26'
            y={9 + (linesData.length + 1) * 15}
          >Gemeten</text>
          <text
            fill='black'
            class='legendCircles'
            x='44'
            y={9 + (linesData.length + 1) * 15}
          >{Math.round(meanHistoric[0] / meanHistoric[1] * 100) / 100 + ' cm'}</text>
        </g>
      {/if} -->
    </g>

    <!-- { /* dashed line to make extra clear what is hovered */ } -->
    <path
      d={d3.line()([[xScale(Math.floor($hoveredYear)), 0], [xScale(Math.floor($hoveredYear)), height]])}
      stroke={'grey'}
      opacity='0.5'
      stroke-width='1.8'
      fill="none"
      stroke-dasharray="5,5"
    />

    <!-- { /* line to indicate range of each area */ } { -->
      {#each linesData as d,i}
        <rect
          fill={d.color}
          opacity={areaOpacity}
          x={xScale(Math.floor($hoveredYear)) - 1.5}
          y={yScale(dataProjection.filter(d2 => d2.year === $hoveredYear)[0][d.variableHigh])}
          height={yScale(dataProjection.filter(d2 => d2.year === $hoveredYear)[0][d.variableLow])-
            yScale(dataProjection.filter(d2 => d2.year === $hoveredYear)[0][d.variableHigh])}
          width='2'
        />
      {/each}

    <!-- { /* circles to indicate the low and high bounds per area */ } { -->
      {#each linesData as d,i}
        <g>
          <circle
            r='4'
            stroke='white'
            stroke-width='2'
            fill={d.color}
            cx={xScale(Math.floor($hoveredYear))}
            cy={yScale(dataProjection.filter(d => d.year === $hoveredYear)[0][d.variableLow])}
          />
          <circle
            r='4'
            stroke='white'
            stroke-width='2'
            fill={d.color}
            cx={xScale(Math.floor($hoveredYear))}
            cy={yScale(dataProjection.filter(d => d.year === $hoveredYear)[0][d.variableHigh])}
          />
        </g>
      {/each}
    </g>
  {:else}
    <g transform={`translate(${margin.left+16},${margin.top+40})`}>
      <text font-style='italic' text-anchor='start' fill='#808080'>
        <tspan>{$t("slrHover1")}</tspan>
        <tspan x=0 y='1em'>{$t("slrHover2")}</tspan>
      </text>

    </g>
  {/if}

  <!-- {/* rects for hovering — pointer-events werken op zowel muis als touch.
       Op muis: enter → set, leave → unset (normaal hover-gedrag).
       Op touch: tap zet de hovered year en blijft sticky tot een andere tap,
       zodat de gebruiker de tooltip-info kan lezen. */ -->
  {#each dataProjection as d,i}
    <rect
      width={hoverBarWidth}
      height={height+40}
      fill='steelblue'
      x={xScale(d.year) - hoverBarWidth/2}
      y='0'
      fill-opacity='0'
      on:pointerenter={() => hoveredYear.set(d.year)}
      on:pointerleave={(e) => { if (e.pointerType === 'mouse') hoveredYear.set(null); }}
    />
  {/each}
</g>
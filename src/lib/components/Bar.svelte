<script>
  import * as d3 from "d3";
  import { afterUpdate } from 'svelte'

  export let data
  export let colors
  export let xScale
  export let yScale
  export let xValue
  export let yValue
  export let innerHeight
  export let unit
  export let yDomain
  export let className
  export let tickFormat
  export let isSmaller = false // New prop to indicate if this bar has smaller values

  // Position text below bar (dy positive) for smaller values, above bar (dy negative) for larger values
  $: barDy = isSmaller ? '1.1em' : '-0.5em';

  // Black text for smaller values (below bar), grey text for larger values (above bar)
  $: markTextColor = isSmaller ? 'black' : 'grey';

  // Skip de transitie als yDomain verandert (= schaal-wissel) — anders ziet de bar-interpolatie
  // er onlogisch uit doordat zowel positie als hoogte tegelijk over een nieuwe schaal interpoleren.
  let prevDomain = null;
  afterUpdate(() => {
    const domainChanged = prevDomain !== null && (prevDomain[0] !== yDomain[0] || prevDomain[1] !== yDomain[1]);
    const duration = domainChanged ? 0 : 800;
    prevDomain = [yDomain[0], yDomain[1]];

    d3.selectAll('.' + className + '_bartext')
        .data(data)
        .transition().duration(duration)
        .attr("transform", (d) => `translate (${0}, ${-Math.abs(yScale(yValue(d)) - yScale(yDomain[0]))})`)


		d3.selectAll('.' + className+ '_rect')
                 .data(data)
                 .transition().duration(duration)
                 .attr("transform", (d,i) => `translate (${xScale(xValue(d))}, ${yScale(yValue(d))})`)
                 .attr("height", (d) => Math.abs(yScale(yValue(d)) - yScale(yDomain[0])))
	});

  </script>

    {#each data as d,i}
      <g className={className} key={'key_' + i + className}>
          <rect
            class={className + '_rect'}
            key={xValue(d.data)}
            width={xScale.bandwidth()}
            fill={colors[i]}
            height={0}
            rx={4}
            ry={4}
            transform={`translate (${xScale(xValue(d))}, ${yScale(yDomain[0])})`}
          />
          <text
            class='tickmark'
            dy='0.7em'
            text-anchor='middle'
            transform={`translate (${xScale(xValue(d)) + xScale.bandwidth()/2}, ${innerHeight + 16})`}>
            {d.scenario}
          </text>
          <text
            class={className + '_bartext'}
            text-anchor='middle'
            x={(xScale(xValue(d)) + xScale.bandwidth()/2)}
            fill={markTextColor}
            y={yScale(yDomain[0])}
            dy={barDy}
          >
            {tickFormat(yValue(d)) + unit}
          </text>
        </g>
    {/each}

  <style>
    .tickmark{
      text-align: center;
      font-size: var(--fs-sm);
    }
    :global(text.mark_min_bartext),
    :global(text.mark_max_bartext) {
      font-size: var(--fs-sm);
    }
  </style>

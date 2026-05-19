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

  // WCAG SC 2.3.3: gebruikers met prefers-reduced-motion: reduce krijgen géén lange bar-animatie.
  // Server-side renderen heeft geen window, vandaar de typeof-check.
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transitionDuration = prefersReducedMotion ? 0 : 800;

  // Position text below bar (dy positive) for smaller values, above bar (dy negative) for larger values
  $: barDy = isSmaller ? '1.1em' : '-0.5em';

  // #666 i.p.v. 'grey' (#808080): grey haalt slechts 3.95:1 contrast op witte achtergrond, te laag voor
  // WCAG 1.4.3 AA (4.5:1 voor normale tekst). #666 haalt 5.74:1.
  $: markTextColor = isSmaller ? 'black' : '#666';

  // Te kleine bars: tekst past niet binnen de bar — duw hem dan boven de bar.
  const MIN_BAR_PX_FOR_INSIDE_LABEL = 24;
  function labelDy(value) {
    const barHeight = Math.abs(yScale(value) - yScale(yDomain[0]));
    if (isSmaller && barHeight < MIN_BAR_PX_FOR_INSIDE_LABEL) return '-0.5em';
    return barDy;
  }
  function labelFill(value) {
    const barHeight = Math.abs(yScale(value) - yScale(yDomain[0]));
    if (isSmaller && barHeight < MIN_BAR_PX_FOR_INSIDE_LABEL) return '#666';
    return markTextColor;
  }

  afterUpdate(() => {
    d3.selectAll('.' + className + '_bartext')
        .data(data)
        .transition().duration(transitionDuration)
        .attr("transform", (d) => `translate (${0}, ${-Math.abs(yScale(yValue(d)) - yScale(yDomain[0]))})`)


		d3.selectAll('.' + className+ '_rect')
                 .data(data)
                 .transition().duration(transitionDuration)
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
            fill={labelFill(yValue(d))}
            y={yScale(yDomain[0])}
            dy={labelDy(yValue(d))}
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
    /* Op smalle viewports staat de chart ook smal; verklein labels iets zodat
       de waarde-labels niet over de buur-bar lopen. */
    @media (max-width: 480px) {
      .tickmark,
      :global(text.mark_min_bartext),
      :global(text.mark_max_bartext) {
        font-size: var(--fs-xs);
      }
    }
  </style>

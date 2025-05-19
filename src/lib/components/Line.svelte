<script>
  import * as d3 from 'd3';
  import { afterUpdate } from 'svelte';
  export let data;
  export let color;
  export let variable;
  export let legendText;
  export let xScale;
  export let yScale;
  export let className;
  export let margin;

  afterUpdate(() => {
    d3.select('.' + className + 'path')
      .datum(data)
      .attr('d', d3.line()
        .x(d => xScale(d.year))
        .y(function(d) {
          if(legendText === 'LLHI'){
            return yScale(d[variable]*100)
          }else{
            return yScale(d[variable]);
          }
        }));
  });
</script>

<g class={className + 'g'}>
  <path
    class={className + 'path'}
    stroke={color}
    stroke-width='2.2'
    fill="none"
  />
</g>

<style>
  .lineChart__lineLabel{
    font-size:11px;
    font-weight:normal;
  }
</style>
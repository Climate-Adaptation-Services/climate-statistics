<script>
  import * as d3 from 'd3';
  import { afterUpdate, onMount } from 'svelte';

  export let scale;
  export let xTransform;
  export let yTransform;
  export let className;
  export let axis;

  afterUpdate(() => {
    d3.select('.' + className).call(axis);
  }, [axis]);

</script>

<g
  transform={`translate(${xTransform}, ${yTransform})`}
  class={className}
></g>
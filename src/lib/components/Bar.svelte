<script>
  import * as d3 from "d3";
  import {afterUpdate } from 'svelte'
  import { theme, area_id } from "$lib/stores.js";
  
  
  export let data
  export let colors
  export let xScale
  export let yScale
  export let xValue
  export let yValue
  export let screenHeight
  export let screenWidth
  export let unit
  export let yDomain
  export let className   
  export let tickFormat


  // Use area_id and areaName for logic instead of $area
  $: barOffset = $area_id === 'se' && $theme === 'wind' && className === 'mark_max' ? (-0.01*screenHeight):
    $area_id === 'se' && $theme === 'heat' && className === 'mark_max' ? (-0.01*screenHeight):
    $area_id === 'se' && $theme === 'drought' && className === 'mark_max' ? (-0.01*screenHeight):
    $area_id === 'bq' && $theme === 'heat' && className === 'mark_max' ? (-0.01*screenHeight):
    $area_id === 'bq' && $theme === 'wind' && className === 'mark_max' ? (-0.01*screenHeight):
    $area_id === 'sm' && $theme === 'wind' && className === 'mark_max' ? (-0.01*screenHeight):
    $area_id === 'sm' && $theme === 'heat' && className === 'mark_max' ? (-0.01*screenHeight):
    $area_id === 'sm' && $theme === 'drought' && className === 'mark_max' ? (-0.01*screenHeight):
    (0.02*screenHeight);

  $: markTextColor = $area_id === 'se' && $theme === 'wind' && className === 'mark_max' ? 'grey':
     $area_id === 'se' && $theme === 'heat' && className === 'mark_max' ? 'grey':
     $area_id === 'se' && $theme === 'drought' && className === 'mark_max' ? 'grey':
     $area_id === 'bq' && $theme === 'heat' && className === 'mark_max' ? 'grey':
     $area_id === 'bq' && $theme === 'wind' && className === 'mark_max' ? 'grey':
     $area_id === 'sm' && $theme === 'wind' && className === 'mark_max' ? 'grey':
     $area_id === 'sm' && $theme === 'heat' && className === 'mark_max' ? 'grey':
     $area_id === 'sm' && $theme === 'drought' && className === 'mark_max' ? 'grey':
     'black';

  afterUpdate(() => {
      
    d3.selectAll('.' + className + '_bartext')
        .data(data)
        .transition().duration(2000)
        .attr("transform", (d) => `translate (${0}, ${-Math.abs(yScale(yValue(d)) - yScale(yDomain[0]))})`)

          
		d3.selectAll('.' + className+ '_rect')
                 .data(data)
                 .transition().duration(2000)
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
            height = {0}
    
            transform = {`translate (${xScale(xValue(d))}, ${yScale(yDomain[0])})`}
          />
          <text
            class = {'tickmark'}
            dy = "0.7em"
            text-anchor="middle"
            transform = {`translate (${xScale(xValue(d)) + xScale.bandwidth()/2}, ${0.5*screenHeight+10}) `}>
            {d.scenario}
          </text>
          <text
            class={className + '_bartext'}
            text-anchor='middle'
            x={(xScale(xValue(d)) + xScale.bandwidth()/2)}
            fill= {markTextColor}
            y={yScale(yDomain[0])+barOffset}
            font-size = '2vh'
          >
            {tickFormat(yValue(d)) + unit}
          </text>
        </g>
    {/each}

  <style>
  </style>
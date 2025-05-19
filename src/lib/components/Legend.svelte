<script> 
    export let colorsLegend
    export let screenHeight
    export let screenWidth
    export let xValue
    import { t } from '$lib/i18n/translate.js';
    </script>
  
    <g class='legend' transform={`translate(${0.45*screenWidth}, ${0*screenHeight})`}>
        <text
            x={0}
            y={-15}
            class="legendlabel"
            font-size = '2.2vh'
        >
            {t('legendTitle')}
        </text>
        {#each [t('scenarioHigh'),t('scenarioLow'),t('scenarioCurrent') ] as d,i}
        <rect
            class={'legend' + 'rect'}
            transform = {`translate (${0}, ${i*0.034*screenHeight})`}
            key={xValue(d)}
            width={0.06*screenWidth}
            height = {0.03*screenHeight}
            fill={colorsLegend[i]}
        />
        <text
            x={0.03*screenWidth}
            y={(i*0.034*screenHeight) + (0.015*screenHeight)}
            class="legendtext"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="white"
            font-size="2vh"
        >
            {d}
        </text>
        {/each}
    </g>
  
    <style>
    </style>
    
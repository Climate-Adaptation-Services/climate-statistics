<script>
    export let colorsLegend
    export let innerWidth
    export let innerHeight
    import { t } from '$lib/i18n/translate.js';

    $: rectWidth = Math.max(60, innerWidth * 0.1);
    $: rectHeight = Math.max(22, innerHeight * 0.05);
    $: rowStride = rectHeight + 4;
    $: legendX = Math.max(0, innerWidth - rectWidth);
</script>

<g class='legend' transform={`translate(${legendX}, 0)`}>
    <text
        x={0}
        y={-6}
        class="legendlabel"
    >
        {t('legendTitle')}
    </text>
    {#each [t('scenarioHigh'),t('scenarioLow'),t('scenarioCurrent') ] as d,i}
        <rect
            class='legendrect'
            transform={`translate(0, ${i * rowStride})`}
            width={rectWidth}
            height={rectHeight}
            fill={colorsLegend[i]}
        />
        <text
            x={rectWidth / 2}
            y={(i * rowStride) + rectHeight / 2}
            class="legendtext"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="white"
        >
            {d}
        </text>
    {/each}
</g>

<style>
    .legendlabel {
        font-size: var(--fs-sm);
    }
</style>

<script>
	import { t } from "$lib/i18n/translate";
	import { w, h, datalaag, theme, indicatorOptionsArea, themeOptions, area_id, lang } from "$lib/stores.js";
	import { areas } from '$lib/noncomponents/areas.js';
	import Chart from "$lib/components/Chart.svelte"
 	import Sidepanel from "$lib/components/Sidepanel.svelte"
	import Explanation from "$lib/components/Explanation.svelte"

	import Zeespiegelstijging from "$lib/components/Zeespiegelstijging.svelte";
	import { setArea } from '$lib/noncomponents/setArea.js'
	import {setLanguage} from '$lib/noncomponents/setLanguage.js'
	
	export let data;

	$: {
		setLanguage(data);
		setArea(data.area_id);
		$indicatorOptionsArea = areas[data.area_id].indicatorOptions;
		const filteredOptions = $indicatorOptionsArea.filter(option => option.theme === $theme);
        $themeOptions = filteredOptions;
        $datalaag = $themeOptions[0]
	}

	$: selectedArea = $area_id || data.area_id;
	$: climateData = data.areaData[selectedArea]?.climateData;
	$: seaLevelData = data.areaData[selectedArea]?.seaLevelData;
	$: llhiData = data.areaData[selectedArea]?.llhiData;

	let chartTitle
	$:  $theme === 'slr' ? (chartTitle = $t('seaLevelRise')):
		(chartTitle = $t($datalaag.indicator));

	$: areaName = (areas && selectedArea && areas[selectedArea] && areas[selectedArea].localizedNames[$lang])
		? areas[selectedArea].localizedNames[$lang]
		: selectedArea;
	$: showAreaName = areas?.[selectedArea]?.switchableTo?.length > 0;

	// Stel het lang-attribuut op <html> in zodat de browser de UI-taal kent
	// (voorkomt verwarring bij auto-translate / accessibility).
	$: if (typeof document !== 'undefined' && $lang) {
		document.documentElement.lang = $lang;
	}

</script>

<div class='App'>
	<div class='sidepanel'>
		<Sidepanel/>
	</div>
	<div class='main_panel'>
		<div class='chart-container'>
			<header class='chart-header'>
				<h1 class='chart-title'>
					{chartTitle}{#if showAreaName} <span class='chart-title-sep'>—</span> <span class='chart-title-area'>{areaName}</span>{/if}
				</h1>
			</header>
			{#if climateData}
				<div class='chart' bind:clientWidth={$w} bind:clientHeight={$h}>
					{#if $h > 0 && $theme === 'slr'}
							<Zeespiegelstijging dataProjection={seaLevelData} dataLLHI={llhiData} />
					{:else}
							<Chart dataClimate={climateData}/>
					{/if}
				</div>
			{/if}
		</div>
		{#if $theme !== 'slr'}
			<div class='explanation-container'>
				<Explanation/>
			</div>
		{/if}
	</div>
</div>

<style>
	.App{
		width:100%;
		height:100%;
		background: whitesmoke;
		display:flex;
		flex-direction: row;
		overflow: hidden;
	}

	.chart-container{
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
		min-width: 0;
	}

	.chart{
		flex: 1;
		min-height: 0;
		min-width: 0;
	}

	.sidepanel{
		display:flex;
		flex-direction:column;
		padding: var(--space-lg) var(--space-md);
		flex: 0 0 30%;
		min-width: 280px;
		max-width: 360px;
		overflow-y: auto;
	}

	.main_panel{
		display:flex;
		flex-direction:column;
		border-left:1px solid var(--c-border);
		flex: 1 1 auto;
		min-width: 0;
	}

	.chart-header{
		padding: var(--space-md) var(--space-lg) var(--space-sm);
		text-align: center;
	}
	.chart-title{
		margin: 0 auto;
		max-width: 60ch;
		font-size: clamp(1.05rem, 2.5vw + 0.6rem, 1.75rem);
		font-weight: 600;
		line-height: var(--lh-tight);
		color: var(--c-primary-dark, #184145);
	}
	.chart-title-sep{
		color: var(--c-muted, #666);
		font-weight: 400;
		margin: 0 0.25em;
	}
	.chart-title-area{
		color: var(--c-primary, #216666);
		font-weight: 600;
	}

	.explanation-container{
		display:flex;
		flex: 0 0 auto;
		flex-direction:column;
		height: auto;
		max-height: min(20vh, 160px);
		padding: var(--space-sm) var(--space-md);
		overflow-y: auto;
	}

	/* --bp-md: 768px
	   Op mobiel willen we GEEN interne scroll in de (voorheen) sidepanel of in
	   de uitleg-balk; alles stapelt onder elkaar op natuurlijke hoogte. De
	   embedding pagina (of iframe) regelt het verticale scrollen. */
	@media (max-width: 768px) {
		.App {
			flex-direction: column;
			height: auto;
			min-height: 100%;
			overflow: visible;
		}
		.sidepanel {
			width: 100%;
			min-width: 0;
			max-width: none;
			flex: 0 0 auto;
			overflow: visible;
			padding: var(--space-md) var(--space-md) var(--space-sm);
		}
		.main_panel {
			width: 100%;
			border-left: none;
			border-top: 1px solid var(--c-border);
			flex: 0 0 auto;
		}
		.chart-container {
			flex: 0 0 auto;
		}
		/* Chart heeft zonder flex-parent geen automatische hoogte; geef hem een
		   vaste verhouding zodat hij niet naar 0 krimpt. */
		.chart {
			flex: 0 0 auto;
			aspect-ratio: 4 / 3;
			min-height: 280px;
		}
		.explanation-container {
			flex: 0 0 auto;
			height: auto;
			overflow: visible;
		}
	}
	/* --bp-sm: 480px — kleine telefoons: nog compactere chart-header padding. */
	@media (max-width: 480px) {
		.chart-header {
			padding: var(--space-sm) var(--space-md) var(--space-xs);
		}
	}
</style>

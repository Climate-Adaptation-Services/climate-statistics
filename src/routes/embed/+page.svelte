<script>
	import { t } from "$lib/i18n/translate";
	import { w, h, area_id, lang } from "$lib/stores.js";
	import { areas } from '$lib/noncomponents/areas.js';
	import Zeespiegelstijging from "$lib/components/Zeespiegelstijging.svelte";
	import { setArea } from '$lib/noncomponents/setArea.js'
	import {setLanguage} from '$lib/noncomponents/setLanguage.js'

	export let data;

	$: {
		setLanguage(data);
		setArea(data.area_id);
	}

	$: selectedArea = data.area_id;
	$: seaLevelData = data.areaData[selectedArea]?.seaLevelData;
	$: llhiData = data.areaData[selectedArea]?.llhiData;
	$: areaName = (areas && selectedArea && areas[selectedArea] && areas[selectedArea].localizedNames[$lang])
		? areas[selectedArea].localizedNames[$lang]
		: selectedArea;

	// Stel html lang in zodat embed-iframes ook de juiste taal aankondigen.
	$: if (typeof document !== 'undefined' && $lang) {
		document.documentElement.lang = $lang;
	}
</script>

<main class='embed-container'>
	{#if seaLevelData}
		<div class='chart' bind:clientWidth={$w} bind:clientHeight={$h}>
			{#if $h > 0}
				<Zeespiegelstijging dataProjection={seaLevelData} dataLLHI={llhiData} areaName={areaName} />
			{/if}
		</div>
	{/if}
</main>

<style>
	.embed-container {
		width: 100%;
		height: 100vh;
		background: white;
		padding: var(--space-md);
	}

	.chart {
		width: 100%;
		height: 100%;
	}

	/* Op smalle iframes (mobiel/tablet) zoveel mogelijk ruimte aan de chart
	   geven: tot 768px maar een minimale padding, en op zeer smal helemaal niets. */
	@media (max-width: 768px) {
		.embed-container {
			padding: var(--space-xs);
		}
	}
	@media (max-width: 480px) {
		.embed-container {
			padding: 0;
		}
	}
</style>
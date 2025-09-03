<script>
	import { t } from "$lib/i18n/translate";
	import { w, h, area_id } from "$lib/stores.js";
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

</script>

<div class='embed-container'>
	{#if seaLevelData}
		<div class='chart' bind:clientWidth={$w} bind:clientHeight={$h}>
			{#if $h > 0}
				<Zeespiegelstijging dataProjection={seaLevelData} dataLLHI={llhiData} />
			{/if}
		</div>
	{/if}
</div>

<style>
	.embed-container {
		width: 100%;
		height: 100vh;
		background: white;
		padding: 20px;
		box-sizing: border-box;
	}

	.chart {
		width: 100%;
		height: 100%;
	}
</style>
<script>
	import { t } from "$lib/i18n/translate";
	import { w, h, datalaag, theme, indicatorOptionsArea, themeOptions, area_id } from "$lib/stores.js";
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
	$:  $theme === 'slr' ? (chartTitle = t('seaLevelRise')):
		(chartTitle = t($datalaag.indicator));

</script>

<div class='App'>
	<div class='sidepanel'>
		<Sidepanel/>
	</div>
	<div class='main_panel'>
		<div class='chart-container'>
			<p class='chart-title'>{chartTitle + ' '+t("on")+' '+ ((areas && selectedArea && areas[selectedArea] && areas[selectedArea].name) ? areas[selectedArea].name : selectedArea)}</p>
			<p class='chart-subtitle'>{' '}</p>
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
		<div class='explanation-container'>
			<Explanation/>
		</div>
	</div>
</div>

<style>
	.App{
		width:100%;
		height:100%;
		background: whitesmoke;
		display:flex;
	}

	.chart-container{
		height:100%;
	}

	.chart{
		height:80%;
	}

	.sidepanel{
		display:flex;
		flex:1;
		flex-direction:column;
		padding-left:2vw;
		/* padding-right:1vw; */
		padding-top:10vh;
		width:25%;
		max-width: 25%;
	}

	.main_panel{
		flex:2;
		display:flex;
		flex-direction:column;
		border-left:1px #ccc solid;
		width: 75%
	}

	.chart-title{
		flex:1;
		display: flex;
		align-items: center;
		align-self:center;
		font-size:4vh;
		padding-left:30px;
		padding-right:30px;
		text-align: center;
	}

	.explanation-container{
		display:flex;
		flex:1.5;
		flex-direction:column;
		padding:10px;
		top:90%;
	}
</style>

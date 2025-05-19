<script>
  import { theme, datalaag, area_id } from "$lib/stores.js";
  import { t } from '$lib/i18n/translate.js';
  import { areas} from "$lib/noncomponents/areas";
  import { lang } from '$lib/stores';

  let Tekst = '';

  // Helper for template interpolation
  function interpolate(template, vars) {
    return template?.replace(/{(\w+)}/g, (_, k) => vars[k] ?? '');
  }

	$: if($theme === 'slr' ){
			Tekst = interpolate(areas[$area_id]?.explanation?.[$lang]?.sealevelrise)
	}

	else if($datalaag.season==='annual') {
		Tekst = interpolate(areas[$area_id]?.explanation?.[$lang]?.annual, {variable: t($datalaag.indicator).split(' ').slice(0,2).join(' ').toLowerCase()})
	}

	else {
		
		Tekst = interpolate(areas[$area_id]?.explanation?.[$lang]?.seasonal, {variable: t($datalaag.indicator).split(' ').slice(0,2).join(' ').toLowerCase(), 
	season: t($datalaag.season)})
		// Tekst = t('explanationSeason', {
		// 	variable: t($datalaag.indicator).split(' ').slice(0,2).join(' ').toLowerCase(), 
		// 	season: t($datalaag.season)
		// })
	}
	

</script>

<section>
  <div>
    <p class='explanation'>{@html Tekst}</p>
  </div>

</section>

<style>

.explanation{
		display: block;
		margin:1vh;
		margin-top:0px;
		font-size:1.9vh;
		text-align: left;
	}

ul.myUL {
text-align: left;
}

a:link {    /* unvisited link */
color: #ffffff;
text-decoration: none;
border-bottom: 1px solid;
}
a:visited {    /* visited link */
	color: white;
}
a:hover {    /* mouse over link */
	color: #ffffff;
	border-bottom: none;
}
a:active {    /* active link */
	color: #ffffff;
}
 
</style>

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

	$: fontSize = $area_id === 'sm' ? '1.5vh' : '1.9vh';

	$: if($theme === 'slr' ){
			Tekst = interpolate(areas[$area_id]?.explanation?.[$lang]?.sealevelrise)
	}

	else if($datalaag.season==='annual') {
		Tekst = interpolate(areas[$area_id]?.explanation?.[$lang]?.annual, {variable: t($datalaag.indicator).split(' ').slice(0,2).join(' ').toLowerCase()})
	}

	else {
    // Get the season period string (e.g., Dec-Apr or May-Nov) from areas
    let seasonPeriod = areas[$area_id]?.seasonperiod?.[$lang]?.[$datalaag.season] || '';
    Tekst = interpolate(
        areas[$area_id]?.explanation?.[$lang]?.seasonal,
        {
            variable: t($datalaag.indicator).split(' ').slice(0,2).join(' ').toLowerCase(),
            season: t($datalaag.season),
            seasonperiod: seasonPeriod
        }
    );
	}
	

</script>

<section>
  <div>
    <p class='explanation' style="font-size: {fontSize}">{@html Tekst}</p>
  </div>

</section>

<style>

.explanation{
		display: block;
		margin:1vh;
		margin-top:0px;
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

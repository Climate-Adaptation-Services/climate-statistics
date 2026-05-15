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

	$: {
		const areaConf = areas[$area_id]?.explanation;
		let baseTekst = '';

		if (areaConf) {
			// Per-eiland fragmenten: link-tekst en optionele "ontwikkeld door"-zin
			// worden per taal opgegeven; KNMI-URL zit al verwerkt in scenarioOriginExtra.
			const linkText = areaConf.scenariosLinkText?.[$lang] || '';
			const scenariosLink = areaConf.scenariosUrl && linkText
				? `<a href="${areaConf.scenariosUrl}" target="_blank">${linkText}</a>`
				: linkText;
			const scenarioOriginExtra = areaConf.scenarioOriginExtra?.[$lang] || '';
			const referencePeriod = areaConf.referencePeriod || '';

			let template = '';
			let extraVars = {};

			if ($theme === 'slr') {
				template = $t('explanationSeaLevelRiseTemplate');
			} else if ($datalaag) {
				// Voor de meeste indicators is variable de eerste twee woorden van de label.
				// Voor hotDays gebruiken we een afzonderlijke vorm ('number of hot days' /
				// 'het aantal hete dagen') zodat de zin natuurlijk leest na de definitie-zin.
				const variable = $datalaag.indicator === 'hotDays'
					? $t('hotDaysVariable')
					: $t($datalaag.indicator).split(' ').slice(0,2).join(' ').toLowerCase();
				extraVars.variable = variable;

				if ($datalaag.season === 'annual') {
					template = $t('explanationAnnualTemplate');
				} else {
					const seasonPeriod = areas[$area_id]?.seasonperiod?.[$lang]?.[$datalaag.season] || '';
					template = $t('explanationSeasonalTemplate');
					extraVars.season = $t($datalaag.season);
					// Lege parens vermijden als seasonperiod niet ingevuld is voor dit eiland.
					extraVars.seasonperiodSuffix = seasonPeriod ? ` (${seasonPeriod})` : '';
				}
			}

			baseTekst = interpolate(template, {
				scenariosLink,
				scenarioOriginExtra,
				referencePeriod,
				...extraVars
			});

			if ($theme === 'slr' && areaConf.hasLLHIParagraph) {
				baseTekst += $t('explanationLLHIExtra');
			}
		}

		// Voor hotDays: definitie vooraan zodat de lezer eerst weet wat een 'hot day' is.
		// Drempel verschilt per eiland (zie areas.js). EN gebruikt punt, andere talen komma.
		if ($datalaag?.indicator === 'hotDays') {
			const threshold = areas[$area_id]?.hotDaysThreshold;
			if (threshold !== undefined) {
				const formatted = $lang === 'en' ? String(threshold) : String(threshold).replace('.', ',');
				const definition = interpolate($t('hotDaysDefinition'), { threshold: formatted });
				baseTekst = definition + ' ' + (baseTekst || '');
			}
		}

		Tekst = baseTekst || '';
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
		margin: 0 0 var(--space-sm) 0;
		text-align: left;
		font-size: var(--fs-xs);
		line-height: var(--lh-normal);
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

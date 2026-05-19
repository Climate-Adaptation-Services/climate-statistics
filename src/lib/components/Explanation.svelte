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
			const newTabHint = $t('opensInNewTab') || '';
			// rel="noopener noreferrer" voorkomt window.opener-misbruik en referrer-leakage.
			// De visually-hidden span maakt voor screen-readers duidelijk dat het link in een
			// nieuw tabblad opent (WCAG SC 3.2.5 — change of context op verzoek aankondigen).
			const scenariosLink = areaConf.scenariosUrl && linkText
				? `<a href="${areaConf.scenariosUrl}" target="_blank" rel="noopener noreferrer">${linkText}<span class="visually-hidden"> ${newTabHint}</span></a>`
				: linkText;
			const scenarioOriginExtra = areaConf.scenarioOriginExtra?.[$lang] || '';
			const currentClimateExtra = areaConf.currentClimateExtra?.[$lang] || '';
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
				currentClimateExtra,
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

@media (max-width: 480px) {
	.explanation {
		font-size: var(--fs-sm);
	}
}
</style>

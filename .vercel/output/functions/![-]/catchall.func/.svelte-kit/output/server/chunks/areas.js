import { w as writable, d as derived } from "./index.js";
const w = writable(0);
const h = writable(0);
const datalaag = writable({ indicator: "temperatureAvg", column: "Gemiddelde temperatuur", theme: "heat", season: "annual" });
const theme = writable("heat");
const area_id = writable(null);
const areaSelection = writable(null);
const lang = writable(null);
const hoveredYear = writable(null);
const indicatorOptionsArea = writable([]);
const themeOptions = writable([]);
const nederlands = {
  "legendTitle": "Legenda",
  "scenarioCurrent": "Huidig",
  "scenarioHigh": "Hoog",
  "scenarioLow": "Laag",
  "scenarioReference": "Referentie",
  "chooseTheme": "Kies een thema:",
  "chooseIndicator": "Kies een onderwerp:",
  "chooseSeason": "Kies een periode:",
  "chooseLocation": "Kies een locatie:",
  "explanationAnnualTemplate": "De grafiek toont {variable} voor het huidige klimaat (1991–2020{currentClimateExtra}) en voor het toekomstige klimaat rond 2050 en 2100, gebaseerd op de {scenariosLink}.{scenarioOriginExtra} De scenario’s ‘laag’ en ‘hoog’ tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen en de gevoeligheid van het klimaatsysteem.",
  "explanationSeasonalTemplate": "De grafiek toont {variable} tijdens het {season} seizoen{seasonperiodSuffix} voor het huidige klimaat (1991–2020{currentClimateExtra}) en voor het toekomstige klimaat rond 2050 en 2100, gebaseerd op de {scenariosLink}.{scenarioOriginExtra} De scenario’s ‘laag’ en ‘hoog’ tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen en de gevoeligheid van het klimaatsysteem.",
  "explanationSeaLevelRiseTemplate": "De grafiek toont de zeespiegelstijging ten opzichte van de periode {referencePeriod}, gebaseerd op de {scenariosLink}.{scenarioOriginExtra} De projecties tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen (SSP1-2.6 en SSP5-8.5) en de gevoeligheid van het klimaatsysteem (het donkere deel).",
  "explanationLLHIExtra": " De gestreepte lijn toont de hoogst mogelijke zeespiegelstijging. Huidige modellen achten deze uitkomst onwaarschijnlijk, maar omdat niet alle klimaatprocessen volledig worden begrepen kan deze niet worden uitgesloten; om voorbereiding op extreme gevallen te ondersteunen, is dit scenario in de grafiek opgenomen.",
  "temperatureAvg": "Gemiddelde temperatuur",
  "temperatureAvgDry": "Gemiddelde temperatuur droog seizoen",
  "temperatureAvgWet": "Gemiddelde temperatuur nat seizoen",
  "temperatureAvgTransition": "Gemiddelde temperatuur transitie seizoen",
  "precipitationAvg": "Gemiddelde neerslag",
  "precipitationAvgDry": "Gemiddelde neerslag droog seizoen",
  "precipitationAvgWet": "Gemiddelde neerslag nat seizoen",
  "precipitationAvgTransition": "Gemiddelde neerslag transitie seizoen",
  "windAvg": "Gemiddelde windsnelheid",
  "windAvgDry": "Gemiddelde windsnelheid droog seizoen",
  "windAvgWet": "Gemiddelde windsnelheid nat seizoen",
  "windAvgTransition": "Gemiddelde windsnelheid transitie seizoen",
  "hotDays": "Hete dagen",
  "hotDaysDefinition": "Een ‘hete dag’ is gedefinieerd als een dag met een gemiddelde temperatuur boven {threshold} °C.",
  "hotDaysVariable": "het aantal hete dagen",
  "dayUnit": " dagen",
  "seasonAnnual": "Jaarlijks",
  "seasonDry": "Droog",
  "seasonWet": "Nat",
  "seasonTransition": "Transitie",
  "dry": "droge",
  "wet": "natte",
  "transition": "transitie",
  "on": "op",
  "slrScenarioHighest": "Scenario voor hoogst mogelijke zeespiegelstijging",
  "slrScenarioHighestShort": "Hoogst mogelijk scenario",
  "slrHover1": "Beweeg over de grafiek om",
  "slrHover2": "meer details te zien",
  "median": "Mediaan",
  "range": "Bandbreedte",
  "withLow": "Met lage",
  "withHigh": "Met hoge",
  "climateChange": "klimaatverandering",
  "riseInCm": "Stijging in cm",
  "seaLevelRise": "Zeespiegelstijging",
  "intermediateResults": "Tussenresultaten",
  "skipToMain": "Ga naar de hoofdinhoud",
  "opensInNewTab": "(opent in een nieuw tabblad)",
  "chartTitleClimate": "Klimaatprojectie voor {indicator} in {area}",
  "chartDescClimate": "Staafdiagram met huidig klimaat (1991–2020), en projecties voor 2050 en 2100 met scenario’s laag en hoog.",
  "chartTitleSeaLevel": "Zeespiegelstijging voor {area}",
  "chartDescSeaLevel": "Lijndiagram met geprojecteerde zeespiegelstijging tussen 1995 en 2100 voor scenario’s met lage en hoge klimaatverandering, inclusief bandbreedte en een gestreepte lijn voor het hoogst mogelijke scenario.",
  "chartDataSummary": "Gegevens samengevat per scenario",
  "chartYearSliderLabel": "Selecteer jaartal met pijltjes-toetsen om waarden te lezen"
};
const english = {
  "legendTitle": "Legend",
  "scenarioCurrent": "Current",
  "scenarioHigh": "High",
  "scenarioLow": "Low",
  "scenarioReference": "Reference",
  "explanationAnnualTemplate": "The bars show the {variable} in the current climate (1991–2020{currentClimateExtra}) and for the future climate around 2050 and 2100, based on the {scenariosLink}.{scenarioOriginExtra} The ‘low’ and ‘high’ scenarios show the range within which climate change is likely to develop, depending on greenhouse gas emissions and the sensitivity of the climate system.",
  "explanationSeasonalTemplate": "The bars show the {variable} during the {season} season{seasonperiodSuffix} in the current climate (1991–2020{currentClimateExtra}) and for the future climate around 2050 and 2100, based on the {scenariosLink}.{scenarioOriginExtra} The ‘low’ and ‘high’ scenarios show the range within which climate change is likely to develop, depending on greenhouse gas emissions and the sensitivity of the climate system.",
  "explanationSeaLevelRiseTemplate": "The graph shows sea level rise relative to the period {referencePeriod}, based on the {scenariosLink}.{scenarioOriginExtra} The projections show the range within which climate change is likely to develop, depending on the amount of greenhouse gases emitted (SSP1-2.6 and SSP5-8.5) and the sensitivity of the climate system (the shaded range).",
  "explanationLLHIExtra": " The dashed line shows the highest possible sea level rise. Current models consider this outcome unlikely, but because not all climate processes are fully understood it cannot be ruled out; to support preparedness for extreme cases, this scenario is included in the graph.",
  "chooseTheme": "Choose a theme:",
  "chooseIndicator": "Choose an indicator:",
  "chooseSeason": "Choose a period:",
  "chooseLocation": "Choose a location:",
  "temperatureAvg": "Average temperature",
  "temperatureAvgDry": "Average temperature dry season",
  "temperatureAvgWet": "Average temperature wet season",
  "temperatureAvgTransition": "Average temperature transition season",
  "precipitationAvg": "Average precipitation",
  "precipitationAvgDry": "Average precipitation dry season",
  "precipitationAvgWet": "Average precipitation wet season",
  "precipitationAvgTransition": "Average precipitation transition season",
  "windAvg": "Average wind speed",
  "windAvgDry": "Average wind speed dry season",
  "windAvgWet": "Average wind speed wet season",
  "windAvgTransition": "Average wind speed transition season",
  "hotDays": "Hot days",
  "hotDaysDefinition": "A ‘hot day’ is defined as a day with an average temperature above {threshold} °C.",
  "hotDaysVariable": "number of hot days",
  "dayUnit": " days",
  "seasonAnnual": "Annual",
  "seasonDry": "Dry",
  "seasonWet": "Wet",
  "seasonTransition": "Transition",
  "dry": "dry",
  "wet": "wet",
  "transition": "transition",
  "on": "on",
  "slrScenarioHighest": "Scenario for highest possible sea level rise",
  "slrScenarioHighestShort": "Highest possible scenario",
  "slrHover1": "Hover the chart to",
  "slrHover2": "see more detail",
  "median": "Median",
  "range": "Range",
  "withLow": "With low",
  "withHigh": "With high",
  "climateChange": "climate change",
  "riseInCm": "Rise in cm",
  "seaLevelRise": "Sea level rise",
  "intermediateResults": "Intermediate results",
  "skipToMain": "Skip to main content",
  "opensInNewTab": "(opens in a new tab)",
  "chartTitleClimate": "Climate projection for {indicator} in {area}",
  "chartDescClimate": "Bar chart showing the current climate (1991–2020) and projections for 2050 and 2100 under low and high scenarios.",
  "chartTitleSeaLevel": "Sea level rise for {area}",
  "chartDescSeaLevel": "Line chart showing projected sea level rise between 1995 and 2100 under low and high climate change scenarios, including the range and a dashed line for the highest possible scenario.",
  "chartDataSummary": "Data summary by scenario",
  "chartYearSliderLabel": "Select year with arrow keys to read values"
};
const papiamentu = {
  "legendTitle": "Leyenda",
  "scenarioCurrent": "Aktual",
  "scenarioHigh": "Haltu",
  "scenarioLow": "Bou",
  "scenarioReference": "Referensia",
  "chooseTheme": "Skohe un tema:",
  "chooseIndicator": "Skohe un indikadó:",
  "chooseSeason": "Skohe un periodo:",
  "chooseLocation": "Skohe un lugá:",
  "explanationAnnualTemplate": "Bara ta mustra {variable} den e klima aktual (1991–2020{currentClimateExtra}) i pa klima den futuro banda di 2050 i 2100, basá riba {scenariosLink}.{scenarioOriginExtra} E senarionan ‘abou’ i ‘haltu’ ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e emishon di gas di efekto invernadero i e sensibilidat di e sistema di klima.",
  "explanationSeasonalTemplate": "Bara ta mustra {variable} durante e temporada {season}{seasonperiodSuffix} den e klima aktual (1991–2020{currentClimateExtra}) i pa klima den futuro banda di 2050 i 2100, basá riba {scenariosLink}.{scenarioOriginExtra} E senarionan ‘abou’ i ‘haltu’ ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e emishon di gas di efekto invernadero i e sensibilidat di e sistema di klima.",
  "explanationSeaLevelRiseTemplate": "E gráfiko ta mustra e subida di nivel di laman relashoná ku e periodo {referencePeriod}, basá riba {scenariosLink}.{scenarioOriginExtra} E proyekshonnan ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e kantidat di gas di efekto invernadero ku ta emití (SSP1-2.6 i SSP5-8.5) i e sensibilidat di e sistema di klima (e parti skur).",
  "explanationLLHIExtra": " E liña di punto ta mustra e subida mas haltu posibel di nivel di laman. Modèlonan aktual ta konsiderá e resultado akí improbabel, ma pasobra no tur prosesonan di klima ta totalmente komprendí, no por wòrdu eksluí; pa apoyá preparashon pa kasonan ekstremo, e senario akí ta wòrdu inkluí den e gráfiko.",
  "temperatureAvg": "Temperatura promedio",
  "temperatureAvgDry": "Temperatura promedio di temporada seku",
  "temperatureAvgWet": "Temperatura promedio di temporada ku awa",
  "temperatureAvgTransition": "Temperatura promedio di temporada di transishon",
  "precipitationAvg": "Yobida promedio",
  "precipitationAvgDry": "Yobida promedio den temporada seku",
  "precipitationAvgWet": "Yobida promedio den temporada di yobida",
  "precipitationAvgTransition": "Yobida promedio den temporada di transishon",
  "windAvg": "Velosidat promedio di bientu",
  "windAvgDry": "Velosidat promedio di bientu den temporada seku",
  "windAvgWet": "Velosidat promedio di bientu den temporada di yobida",
  "windAvgTransition": "Velosidat promedio di bientu den temporada di transishon",
  "hotDays": "Dianan kalor",
  "hotDaysDefinition": "Un ‘dia kalor’ ta definí komo un dia ku un temperatura promedio riba {threshold} °C.",
  "hotDaysVariable": "kantidat di dianan kalor",
  "dayUnit": " dia",
  "seasonAnnual": "Anual",
  "seasonDry": "Seku",
  "seasonWet": "Yobida",
  "seasonTransition": "Transishon",
  "dry": "seku",
  "wet": "ku awa",
  "transition": "di transishon",
  "on": "na",
  "slrScenarioHighest": "Senario pa subida mas haltu posibel di nivel di laman",
  "slrScenarioHighestShort": "Senario mas haltu posibel",
  "slrHover1": "Pasa e kursor riba e gráfiko",
  "slrHover2": "pa mira mas detaye",
  "median": "Mediana",
  "range": "Rango",
  "withLow": "Ku abou",
  "withHigh": "Ku haltu",
  "climateChange": "kambio di klima",
  "riseInCm": "Subida den cm",
  "seaLevelRise": "Subida di nivel di laman",
  "skipToMain": "Bai na kontenido prinsipal",
  "opensInNewTab": "(ta habri den un tab nobo)",
  "chartTitleClimate": "Proyekshon di klima pa {indicator} na {area}",
  "chartDescClimate": "Gráfiko di bara ku ta mustra klima aktual (1991–2020) i proyekshonnan pa 2050 i 2100 bou di senario abou i haltu.",
  "chartTitleSeaLevel": "Subida di nivel di laman pa {area}",
  "chartDescSeaLevel": "Gráfiko di liña ku ta mustra subida proyektá di nivel di laman entre 1995 i 2100 bou di senarionan di kambio di klima abou i haltu, inkluso e rango i un liña di punto pa e senario mas haltu posibel.",
  "chartDataSummary": "Resumen di datos pa senario",
  "chartYearSliderLabel": "Selektá aña ku tekla di flecha pa lesa balornan"
};
const papiamentoAruba = {
  "scenarioCurrent": "Actual",
  "scenarioHigh": "Halto",
  "scenarioLow": "Abou",
  "scenarioReference": "Referencia",
  "chooseTheme": "Skoge un tema:",
  "chooseIndicator": "Skoge un indicador:",
  "chooseSeason": "Skoge un periodo:",
  "chooseLocation": "Skoge un lugá:",
  "temperatureAvg": "Temperatura promedio",
  "temperatureAvgDry": "Temperatura promedio di temporada seco",
  "temperatureAvgWet": "Temperatura promedio di temporada di yobida",
  "temperatureAvgTransition": "Temperatura promedio di temporada di transicion",
  "precipitationAvg": "Yobida promedio",
  "precipitationAvgDry": "Yobida promedio den temporada seco",
  "precipitationAvgWet": "Yobida promedio den temporada di yobida",
  "precipitationAvgTransition": "Yobida promedio den temporada di transicion",
  "windAvg": "Velocidad promedio di biento",
  "windAvgDry": "Velocidad promedio di biento den temporada seco",
  "windAvgWet": "Velocidad promedio di biento den temporada di yobida",
  "windAvgTransition": "Velocidad promedio di biento den temporada di transicion",
  "hotDays": "Dianan di calor",
  "hotDaysDefinition": "Un ‘dia di calor’ ta defini como un dia cu un temperatura promedio riba {threshold} °C.",
  "hotDaysVariable": "cantidad di dianan di calor",
  "seasonAnnual": "Anual",
  "seasonDry": "Seco",
  "seasonWet": "Yobida",
  "seasonTransition": "Transicion",
  "dry": "seco",
  "wet": "cu awa",
  "transition": "di transicion",
  "slrScenarioHighest": "Scenario pa subida mas halto posibel di nivel di lama",
  "slrScenarioHighestShort": "Scenario mas halto posibel",
  "slrHover1": "Pasa e cursor riba e grafico",
  "slrHover2": "pa mira mas detaye",
  "withLow": "Cu un abou",
  "withHigh": "Cu un halto",
  "climateChange": "cambio climatico",
  "riseInCm": "Subida den cm",
  "seaLevelRise": "Subida di nivel di lama",
  "explanationAnnualTemplate": "Bara ta mustra {variable} den e clima actual (1991–2020{currentClimateExtra}) i pa clima den futuro banda di aña 2050 i 2100, basá riba {scenariosLink}.{scenarioOriginExtra} E scenarionan ‘abou’ i ‘halto’ ta mustra e rango den cua probablemente cambio climatico ta desaroya, dependiendo di e emision di gas di efecto invernadero i e sensibilidat di e sistema climatico.",
  "explanationSeasonalTemplate": "Bara ta mustra {variable} durante e temporada {season}{seasonperiodSuffix} den e clima actual (1991–2020{currentClimateExtra}) i pa clima den futuro banda di aña 2050 i 2100, basá riba {scenariosLink}.{scenarioOriginExtra} E scenarionan ‘abou’ i ‘halto’ ta mustra e rango den cua probablemente cambio climatico ta desaroya, dependiendo di e emision di gas di efecto invernadero i e sensibilidat di e sistema climatico.",
  "explanationSeaLevelRiseTemplate": "E grafico ta mustra e subida di nivel di lama relaciona cu e periodo {referencePeriod}, basá riba {scenariosLink}.{scenarioOriginExtra} E proyeccionnan ta mustra e rango den cua probablemente cambio climatico ta desaroya, dependiendo di e cantidad di gas di efecto invernadero cu ta emiti (SSP1-2.6 i SSP5-8.5) i e sensibilidat di e sistema climatico (e parti scur).",
  "explanationLLHIExtra": " E liña di punto ta mustra e subida mas halto posibel di nivel di lama. Modelonan actual ta considera e resultado aki improbable, pero pasobra no tur procesonan climatico ta totalmente comprendi, no por wordo excluí; pa apoyá preparacion pa casonan extremo, e scenario aki ta wordo incluí den e grafico.",
  "skipToMain": "Bai na contenido principal",
  "opensInNewTab": "(ta habri den un tab nobo)",
  "chartTitleClimate": "Proyeccion climatica pa {indicator} na {area}",
  "chartDescClimate": "Grafico di bara cu ta mustra clima actual (1991–2020) i proyeccionnan pa 2050 i 2100 bao di scenario abou i halto.",
  "chartTitleSeaLevel": "Subida di nivel di lama pa {area}",
  "chartDescSeaLevel": "Grafico di liña cu ta mustra subida proyectá di nivel di lama entre 1995 i 2100 bao di scenarionan di cambio climatico abou i halto, incluso e rango i un liña di punto pa e scenario mas halto posibel.",
  "chartDataSummary": "Resumen di datos pa scenario",
  "chartYearSliderLabel": "Selecta aña cu tecla di flecha pa lesa balornan"
};
const papiamentuCuracao = {
  "scenarioLow": "Abou"
};
const french = {
  "legendTitle": "Légende",
  "scenarioCurrent": "Actuel",
  "scenarioHigh": "Haut",
  "scenarioLow": "Bas",
  "scenarioReference": "Référence",
  "explanationAnnualTemplate": "Les barres montrent la {variable} dans le climat actuel (1991–2020{currentClimateExtra}) et pour le climat futur vers 2050 et 2100, sur la base des {scenariosLink}.{scenarioOriginExtra} Les scénarios « bas » et « haut » montrent la fourchette dans laquelle le changement climatique est susceptible d'évoluer, selon les émissions de gaz à effet de serre et la sensibilité du système climatique.",
  "explanationSeasonalTemplate": "Les barres montrent la {variable} pendant la saison {season}{seasonperiodSuffix} dans le climat actuel (1991–2020{currentClimateExtra}) et pour le climat futur vers 2050 et 2100, sur la base des {scenariosLink}.{scenarioOriginExtra} Les scénarios « bas » et « haut » montrent la fourchette dans laquelle le changement climatique est susceptible d'évoluer, selon les émissions de gaz à effet de serre et la sensibilité du système climatique.",
  "explanationSeaLevelRiseTemplate": "Le graphique montre l'élévation du niveau de la mer par rapport à la période {referencePeriod}, sur la base des {scenariosLink}.{scenarioOriginExtra} Les projections montrent la fourchette dans laquelle le changement climatique est susceptible d'évoluer, selon la quantité de gaz à effet de serre émis (SSP1-2.6 et SSP5-8.5) et la sensibilité du système climatique (la zone ombrée).",
  "explanationLLHIExtra": " La ligne en pointillés montre l'élévation maximale possible du niveau de la mer ; les modèles actuels considèrent ce résultat improbable mais ne peuvent l'exclure, et il est inclus pour soutenir la préparation aux cas extrêmes.",
  "chooseTheme": "Choisissez un thème :",
  "chooseIndicator": "Choisissez un indicateur :",
  "chooseSeason": "Choisissez une période :",
  "chooseLocation": "Choisissez un lieu :",
  "temperatureAvg": "Température moyenne",
  "temperatureAvgDry": "Température moyenne en saison sèche",
  "temperatureAvgWet": "Température moyenne en saison humide",
  "temperatureAvgTransition": "Température moyenne en saison de transition",
  "precipitationAvg": "Précipitations moyennes",
  "precipitationAvgDry": "Précipitations moyennes en saison sèche",
  "precipitationAvgWet": "Précipitations moyennes en saison humide",
  "precipitationAvgTransition": "Précipitations moyennes en saison de transition",
  "windAvg": "Vitesse moyenne du vent",
  "windAvgDry": "Vitesse moyenne du vent en saison sèche",
  "windAvgWet": "Vitesse moyenne du vent en saison humide",
  "windAvgTransition": "Vitesse moyenne du vent en saison de transition",
  "hotDays": "Jours chauds",
  "hotDaysDefinition": "Un ‘jour chaud’ est défini comme un jour dont la température moyenne dépasse {threshold} °C.",
  "hotDaysVariable": "nombre de jours chauds",
  "dayUnit": " jours",
  "seasonAnnual": "Annuel",
  "seasonDry": "Sèche",
  "seasonWet": "Humide",
  "seasonTransition": "Transition",
  "dry": "sec",
  "wet": "humide",
  "transition": "de transition",
  "on": "activé",
  "slrScenarioHighest": "Scénario de l'élévation maximale possible du niveau de la mer",
  "slrScenarioHighestShort": "Scénario maximal possible",
  "slrHover1": "Survolez le graphique pour",
  "slrHover2": "voir plus de détails",
  "median": "Médiane",
  "range": "Plage",
  "withLow": "Avec un bas",
  "withHigh": "Avec un haut",
  "climateChange": "changement climatique",
  "riseInCm": "Hausse en cm",
  "seaLevelRise": "Élévation du niveau de la mer",
  "intermediateResults": "Résultats intermédiaires",
  "skipToMain": "Aller au contenu principal",
  "opensInNewTab": "(ouvre dans un nouvel onglet)",
  "chartTitleClimate": "Projection climatique pour {indicator} à {area}",
  "chartDescClimate": "Diagramme à barres montrant le climat actuel (1991–2020) et les projections pour 2050 et 2100 selon les scénarios bas et haut.",
  "chartTitleSeaLevel": "Élévation du niveau de la mer pour {area}",
  "chartDescSeaLevel": "Graphique linéaire de l'élévation projetée du niveau de la mer entre 1995 et 2100 selon les scénarios bas et haut de changement climatique, incluant la fourchette et une ligne en pointillés pour le scénario maximal possible.",
  "chartDataSummary": "Résumé des données par scénario",
  "chartYearSliderLabel": "Sélectionnez l'année avec les touches fléchées pour lire les valeurs"
};
const spanish = {
  "legendTitle": "Leyenda",
  "scenarioCurrent": "Actual",
  "scenarioHigh": "Alto",
  "scenarioLow": "Bajo",
  "scenarioReference": "Referencia",
  "explanationAnnualTemplate": "Las barras muestran la {variable} en el clima actual (1991–2020{currentClimateExtra}) y en el clima futuro hacia 2050 y 2100, sobre la base de los {scenariosLink}.{scenarioOriginExtra} Los escenarios «bajo» y «alto» muestran el rango dentro del cual probablemente se desarrollará el cambio climático, dependiendo de las emisiones de gases de efecto invernadero y de la sensibilidad del sistema climático.",
  "explanationSeasonalTemplate": "Las barras muestran la {variable} durante la temporada {season}{seasonperiodSuffix} en el clima actual (1991–2020{currentClimateExtra}) y en el clima futuro hacia 2050 y 2100, sobre la base de los {scenariosLink}.{scenarioOriginExtra} Los escenarios «bajo» y «alto» muestran el rango dentro del cual probablemente se desarrollará el cambio climático, dependiendo de las emisiones de gases de efecto invernadero y de la sensibilidad del sistema climático.",
  "explanationSeaLevelRiseTemplate": "El gráfico muestra el aumento del nivel del mar en relación con el período {referencePeriod}, sobre la base de los {scenariosLink}.{scenarioOriginExtra} Las proyecciones muestran el rango dentro del cual probablemente se desarrollará el cambio climático, dependiendo de las emisiones de gases de efecto invernadero (SSP1-2.6 y SSP5-8.5) y de la sensibilidad del sistema climático (la zona sombreada).",
  "explanationLLHIExtra": " La línea discontinua muestra el aumento máximo posible del nivel del mar; los modelos actuales lo consideran improbable pero no pueden descartarlo, y se incluye para apoyar la preparación ante casos extremos.",
  "chooseTheme": "Elige un tema:",
  "chooseIndicator": "Elige un indicador:",
  "chooseSeason": "Elige un período:",
  "chooseLocation": "Elige un lugar:",
  "temperatureAvg": "Temperatura media",
  "temperatureAvgDry": "Temperatura media en la temporada seca",
  "temperatureAvgWet": "Temperatura media en la temporada lluviosa",
  "temperatureAvgTransition": "Temperatura media en la temporada de transición",
  "precipitationAvg": "Precipitación media",
  "precipitationAvgDry": "Precipitación media en la temporada seca",
  "precipitationAvgWet": "Precipitación media en la temporada lluviosa",
  "precipitationAvgTransition": "Precipitación media en la temporada de transición",
  "windAvg": "Velocidad media del viento",
  "windAvgDry": "Velocidad media del viento en la temporada seca",
  "windAvgWet": "Velocidad media del viento en la temporada lluviosa",
  "windAvgTransition": "Velocidad media del viento en la temporada de transición",
  "hotDays": "Días calurosos",
  "hotDaysDefinition": "Un ‘día caluroso’ se define como un día con una temperatura media superior a {threshold} °C.",
  "hotDaysVariable": "número de días calurosos",
  "dayUnit": " días",
  "seasonAnnual": "Anual",
  "seasonDry": "Seca",
  "seasonWet": "Lluviosa",
  "seasonTransition": "Transición",
  "dry": "seca",
  "wet": "lluviosa",
  "transition": "de transición",
  "on": "activado",
  "slrScenarioHighest": "Escenario del aumento máximo posible del nivel del mar",
  "slrScenarioHighestShort": "Escenario máximo posible",
  "slrHover1": "Coloca el cursor sobre el gráfico para",
  "slrHover2": "ver más detalles",
  "median": "Mediana",
  "range": "Rango",
  "withLow": "Con un bajo",
  "withHigh": "Con un alto",
  "climateChange": "cambio climático",
  "riseInCm": "Aumento en cm",
  "seaLevelRise": "Aumento del nivel del mar",
  "intermediateResults": "Resultados intermedios",
  "skipToMain": "Ir al contenido principal",
  "opensInNewTab": "(se abre en una pestaña nueva)",
  "chartTitleClimate": "Proyección climática para {indicator} en {area}",
  "chartDescClimate": "Gráfico de barras con el clima actual (1991–2020) y las proyecciones para 2050 y 2100 según escenarios bajo y alto.",
  "chartTitleSeaLevel": "Aumento del nivel del mar para {area}",
  "chartDescSeaLevel": "Gráfico lineal del aumento proyectado del nivel del mar entre 1995 y 2100 bajo escenarios de cambio climático bajo y alto, incluido el rango y una línea discontinua para el escenario máximo posible.",
  "chartDataSummary": "Resumen de datos por escenario",
  "chartYearSliderLabel": "Selecciona el año con las teclas de flecha para leer los valores"
};
const paAreaOverrides = {
  ar: papiamentoAruba,
  // Aruba: Papiamento (etymologisch, Spaans-georiënteerd)
  cu: papiamentuCuracao
  // Curaçao: eigen Papiamentu-variant
};
const t = derived([lang, area_id], ([$lang, $area_id]) => {
  let dict;
  if ($lang === "pa" && paAreaOverrides[$area_id]) {
    dict = { ...papiamentu, ...paAreaOverrides[$area_id] };
  } else {
    dict = $lang === "en" ? english : $lang === "pa" ? papiamentu : $lang === "nl" ? nederlands : $lang === "fr" ? french : $lang === "es" ? spanish : english;
  }
  return (key, replacements = {}) => {
    const translation = dict[key];
    return Object.entries(replacements).reduce(
      (str, [placeholder, value]) => str?.replace(`{${placeholder}}`, value),
      translation
    );
  };
});
const indicatorOptions = {
  "bq": [
    {
      indicator: "temperatureAvg",
      column: "Gemiddelde temperatuur",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "temperatureAvgDry",
      column: "Gemiddelde temperatuur droog seizoen",
      theme: "heat",
      season: "dry"
    },
    {
      indicator: "temperatureAvgWet",
      column: "Gemiddelde temperatuur nat seizoen",
      theme: "heat",
      season: "wet"
    },
    {
      indicator: "precipitationAvg",
      column: "Gemiddelde neerslag",
      theme: "drought",
      season: "annual"
    },
    {
      indicator: "precipitationAvgDry",
      column: "Gemiddelde neerslag droog seizoen",
      theme: "drought",
      season: "dry"
    },
    {
      indicator: "precipitationAvgWet",
      column: "Gemiddelde neerslag nat seizoen",
      theme: "drought",
      season: "wet"
    },
    {
      indicator: "windAvg",
      column: "Gemiddelde windsnelheid",
      theme: "wind",
      season: "annual"
    },
    {
      indicator: "windAvgDry",
      column: "Gemiddelde windsnelheid droog seizoen",
      theme: "wind",
      season: "dry"
    },
    {
      indicator: "windAvgWet",
      column: "Gemiddelde windsnelheid nat seizoen",
      theme: "wind",
      season: "wet"
    }
  ],
  "sa": [
    {
      indicator: "temperatureAvg",
      column: "Gemiddelde temperatuur",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "temperatureAvgDry",
      column: "Gemiddelde temperatuur droog seizoen",
      theme: "heat",
      season: "dry"
    },
    {
      indicator: "temperatureAvgWet",
      column: "Gemiddelde temperatuur nat seizoen",
      theme: "heat",
      season: "wet"
    },
    {
      indicator: "precipitationAvg",
      column: "Gemiddelde neerslag",
      theme: "drought",
      season: "annual"
    },
    {
      indicator: "precipitationAvgDry",
      column: "Gemiddelde neerslag droog seizoen",
      theme: "drought",
      season: "dry"
    },
    {
      indicator: "precipitationAvgWet",
      column: "Gemiddelde neerslag nat seizoen",
      theme: "drought",
      season: "wet"
    },
    {
      indicator: "windAvg",
      column: "Gemiddelde windsnelheid",
      theme: "wind",
      season: "annual"
    },
    {
      indicator: "windAvgDry",
      column: "Gemiddelde windsnelheid droog seizoen",
      theme: "wind",
      season: "dry"
    },
    {
      indicator: "windAvgWet",
      column: "Gemiddelde windsnelheid nat seizoen",
      theme: "wind",
      season: "wet"
    }
  ],
  "se": [
    {
      indicator: "temperatureAvg",
      column: "Gemiddelde temperatuur",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "temperatureAvgDry",
      column: "Gemiddelde temperatuur droog seizoen",
      theme: "heat",
      season: "dry"
    },
    {
      indicator: "temperatureAvgWet",
      column: "Gemiddelde temperatuur nat seizoen",
      theme: "heat",
      season: "wet"
    },
    {
      indicator: "precipitationAvg",
      column: "Gemiddelde neerslag",
      theme: "drought",
      season: "annual"
    },
    {
      indicator: "precipitationAvgDry",
      column: "Gemiddelde neerslag droog seizoen",
      theme: "drought",
      season: "dry"
    },
    {
      indicator: "precipitationAvgWet",
      column: "Gemiddelde neerslag nat seizoen",
      theme: "drought",
      season: "wet"
    },
    {
      indicator: "windAvg",
      column: "Gemiddelde windsnelheid",
      theme: "wind",
      season: "annual"
    },
    {
      indicator: "windAvgDry",
      column: "Gemiddelde windsnelheid droog seizoen",
      theme: "wind",
      season: "dry"
    },
    {
      indicator: "windAvgWet",
      column: "Gemiddelde windsnelheid nat seizoen",
      theme: "wind",
      season: "wet"
    }
  ],
  "sm": [
    {
      indicator: "temperatureAvg",
      column: "Gemiddelde temperatuur",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "temperatureAvgDry",
      column: "Gemiddelde temperatuur droog seizoen",
      theme: "heat",
      season: "dry"
    },
    {
      indicator: "temperatureAvgWet",
      column: "Gemiddelde temperatuur nat seizoen",
      theme: "heat",
      season: "wet"
    },
    {
      indicator: "hotDays",
      column: "Hete dagen per jaar",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "precipitationAvg",
      column: "Gemiddelde neerslag",
      theme: "drought",
      season: "annual"
    },
    {
      indicator: "precipitationAvgDry",
      column: "Gemiddelde neerslag droog seizoen",
      theme: "drought",
      season: "dry"
    },
    {
      indicator: "precipitationAvgWet",
      column: "Gemiddelde neerslag nat seizoen",
      theme: "drought",
      season: "wet"
    },
    {
      indicator: "windAvg",
      column: "Gemiddelde windsnelheid",
      theme: "wind",
      season: "annual"
    },
    {
      indicator: "windAvgDry",
      column: "Gemiddelde windsnelheid droog seizoen",
      theme: "wind",
      season: "dry"
    },
    {
      indicator: "windAvgWet",
      column: "Gemiddelde windsnelheid nat seizoen",
      theme: "wind",
      season: "wet"
    }
  ],
  "cu": [
    {
      indicator: "temperatureAvg",
      column: "Gemiddelde temperatuur",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "temperatureAvgDry",
      column: "Gemiddelde temperatuur droog seizoen",
      theme: "heat",
      season: "dry"
    },
    {
      indicator: "temperatureAvgTransition",
      column: "Gemiddelde temperatuur transitie seizoen",
      theme: "heat",
      season: "transition"
    },
    {
      indicator: "temperatureAvgWet",
      column: "Gemiddelde temperatuur nat seizoen",
      theme: "heat",
      season: "wet"
    },
    {
      indicator: "hotDays",
      column: "Hete dagen per jaar",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "precipitationAvg",
      column: "Gemiddelde neerslag",
      theme: "drought",
      season: "annual"
    },
    {
      indicator: "precipitationAvgDry",
      column: "Gemiddelde neerslag droog seizoen",
      theme: "drought",
      season: "dry"
    },
    {
      indicator: "precipitationAvgTransition",
      column: "Gemiddelde neerslag transitie seizoen",
      theme: "drought",
      season: "transition"
    },
    {
      indicator: "precipitationAvgWet",
      column: "Gemiddelde neerslag nat seizoen",
      theme: "drought",
      season: "wet"
    },
    {
      indicator: "windAvg",
      column: "Gemiddelde windsnelheid",
      theme: "wind",
      season: "annual"
    },
    {
      indicator: "windAvgDry",
      column: "Gemiddelde windsnelheid droog seizoen",
      theme: "wind",
      season: "dry"
    },
    {
      indicator: "windAvgTransition",
      column: "Gemiddelde windsnelheid transitie seizoen",
      theme: "wind",
      season: "transition"
    },
    {
      indicator: "windAvgWet",
      column: "Gemiddelde windsnelheid nat seizoen",
      theme: "wind",
      season: "wet"
    }
  ],
  "ar": [
    {
      indicator: "temperatureAvg",
      column: "Gemiddelde temperatuur",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "temperatureAvgDry",
      column: "Gemiddelde temperatuur droog seizoen",
      theme: "heat",
      season: "dry"
    },
    {
      indicator: "temperatureAvgTransition",
      column: "Gemiddelde temperatuur transitie seizoen",
      theme: "heat",
      season: "transition"
    },
    {
      indicator: "temperatureAvgWet",
      column: "Gemiddelde temperatuur nat seizoen",
      theme: "heat",
      season: "wet"
    },
    {
      indicator: "hotDays",
      column: "Hete dagen per jaar",
      theme: "heat",
      season: "annual"
    },
    {
      indicator: "precipitationAvg",
      column: "Gemiddelde neerslag",
      theme: "drought",
      season: "annual"
    },
    {
      indicator: "precipitationAvgDry",
      column: "Gemiddelde neerslag droog seizoen",
      theme: "drought",
      season: "dry"
    },
    {
      indicator: "precipitationAvgTransition",
      column: "Gemiddelde neerslag transitie seizoen",
      theme: "drought",
      season: "transition"
    },
    {
      indicator: "precipitationAvgWet",
      column: "Gemiddelde neerslag nat seizoen",
      theme: "drought",
      season: "wet"
    },
    {
      indicator: "windAvg",
      column: "Gemiddelde windsnelheid",
      theme: "wind",
      season: "annual"
    },
    {
      indicator: "windAvgDry",
      column: "Gemiddelde windsnelheid droog seizoen",
      theme: "wind",
      season: "dry"
    },
    {
      indicator: "windAvgTransition",
      column: "Gemiddelde windsnelheid transitie seizoen",
      theme: "wind",
      season: "transition"
    },
    {
      indicator: "windAvgWet",
      column: "Gemiddelde windsnelheid nat seizoen",
      theme: "wind",
      season: "wet"
    }
  ]
};
const KNMI23_CLIMATE_SCENARIOS_URL = "https://cdn.knmi.nl/system/ckeditor/attachment_files/data/000/000/358/original/KNMI23_climate_scenarios_user_report.pdf";
const IPDC_CURACAO_URL = "https://ipdc-climate-action.org/wp-content/uploads/2025/12/2025_12_08_Curacao_EN_v23-2.pdf";
const IPDC_ARUBA_URL = "https://ipdc-climate-action.org/wp-content/uploads/2025/12/2025_12_08_Aruba_EN_v23-2.pdf";
const IPDC_SINT_MAARTEN_URL = "https://ipdc-climate-action.org/wp-content/uploads/2025/12/2025_12_08_Sint_Maarten_EN_v24-4.pdf";
const areas = {
  bq: {
    area_id: "bq",
    name: "Bonaire",
    localizedNames: {
      en: "Bonaire",
      nl: "Bonaire",
      pa: "Boneiru"
    },
    logo: "https://raw.githubusercontent.com/sophievanderhorst/data/main/bonairenew.png",
    indicatorOptions: indicatorOptions["bq"],
    switchableTo: [],
    dataUrls: {
      climate: "https://raw.githubusercontent.com/sophievanderhorst/data/main/bonaire_klimaatdata.csv",
      seaLevel: "https://gist.githubusercontent.com/stichtingcas/cdcf6d53bdfeac4494ad81a4b2878aab/raw/6aeabf231a8ddf4d7835436a3a695ac9091dff0f/bonaire-zeespiegelstijging.csv",
      llhi: "https://gist.githubusercontent.com/stichtingcas/3687d450f1f31da3886d39bf19d46808/raw/d2c1a95aec66014486fe612fca0fd931ecb91de9/llhi-bonaire.csv"
    },
    titles: {
      en: {
        heat: "It is getting hotter",
        drought: "It is getting drier",
        wind: "There will be more wind",
        slr: "The sea levels are rising"
      },
      nl: {
        heat: "Het wordt warmer",
        drought: "Het wordt droger",
        wind: "Er zal meer wind komen",
        slr: "De zeespiegel stijgt"
      },
      pa: {
        heat: "Ta birando mas kalor",
        drought: "Ta birando mas seku",
        wind: "Lo tin mas bientu",
        slr: "Nivel di laman ta subiendo"
      }
    },
    explanation: {
      scenariosUrl: KNMI23_CLIMATE_SCENARIOS_URL,
      scenariosLinkText: {
        en: "KNMI 2023 climate scenarios",
        nl: "KNMI’23-klimaatscenario’s",
        pa: "senarionan di klima di KNMI 2023"
      },
      scenarioOriginExtra: { en: "", nl: "", pa: "" },
      referencePeriod: "1995–2014",
      hasLLHIParagraph: false
    }
  },
  sa: {
    area_id: "sa",
    name: "Saba",
    localizedNames: {
      en: "Saba",
      nl: "Saba",
      pa: "Saba"
    },
    logo: "https://raw.githubusercontent.com/sophievanderhorst/data/main/saba_eus_gezelligbijelkaar.png",
    // TODO: vervang door Saba-eigen logo zodra beschikbaar
    indicatorOptions: indicatorOptions["sa"],
    switchableTo: [],
    dataUrls: {
      climate: "https://raw.githubusercontent.com/sophievanderhorst/data/main/sabast_klimaatdata.csv",
      // TODO: vervang door Saba-eigen climate data zodra beschikbaar
      seaLevel: "https://gist.githubusercontent.com/stichtingcas/86d27026230225096cc431697d0b0d94/raw/2d0a7a404447ce130f2d231cd3f7da1df38a65c0/saba-zeespiegelstijging.csv",
      llhi: "https://gist.githubusercontent.com/stichtingcas/01a920f71325b35fc193d48f19dd065e/raw/baef6c01aa777844fad66c596eebee5ae37eb88f/llhi-saba.csv"
    },
    titles: {
      en: {
        heat: "It is getting hotter",
        drought: "It is getting drier",
        wind: "There will be more wind",
        slr: "The sea levels are rising"
      },
      nl: {
        heat: "Het wordt warmer",
        drought: "Het wordt droger",
        wind: "Er zal meer wind komen",
        slr: "De zeespiegel stijgt"
      },
      pa: {
        heat: "Ta birando mas kalor",
        drought: "Ta birando mas seku",
        wind: "Lo tin mas bientu",
        slr: "Nivel di laman ta subiendo"
      }
    },
    explanation: {
      scenariosUrl: KNMI23_CLIMATE_SCENARIOS_URL,
      scenariosLinkText: {
        en: "KNMI 2023 climate scenarios",
        nl: "KNMI’23-klimaatscenario’s",
        pa: "senarionan di klima di KNMI 2023"
      },
      scenarioOriginExtra: { en: "", nl: "", pa: "" },
      referencePeriod: "1995–2014",
      hasLLHIParagraph: false
    }
  },
  se: {
    area_id: "se",
    name: "Sint Eustatius",
    localizedNames: {
      en: "Sint Eustatius",
      nl: "Sint Eustatius",
      pa: "Statia"
    },
    logo: "https://raw.githubusercontent.com/sophievanderhorst/data/main/saba_eus_gezelligbijelkaar.png",
    // TODO: vervang door Sint Eustatius-eigen logo zodra beschikbaar
    indicatorOptions: indicatorOptions["se"],
    switchableTo: [],
    dataUrls: {
      climate: "https://raw.githubusercontent.com/sophievanderhorst/data/main/sabast_klimaatdata.csv",
      // TODO: vervang door Sint Eustatius-eigen climate data zodra beschikbaar
      seaLevel: "https://gist.githubusercontent.com/stichtingcas/86d27026230225096cc431697d0b0d94/raw/2d0a7a404447ce130f2d231cd3f7da1df38a65c0/saba-zeespiegelstijging.csv",
      // TODO: vervang door Sint Eustatius-eigen seaLevel zodra beschikbaar
      llhi: "https://gist.githubusercontent.com/stichtingcas/01a920f71325b35fc193d48f19dd065e/raw/baef6c01aa777844fad66c596eebee5ae37eb88f/llhi-saba.csv"
      // TODO: vervang door Sint Eustatius-eigen llhi zodra beschikbaar
    },
    titles: {
      en: {
        heat: "It is getting hotter",
        drought: "It is getting drier",
        wind: "There will be more wind",
        slr: "The sea levels are rising"
      },
      nl: {
        heat: "Het wordt warmer",
        drought: "Het wordt droger",
        wind: "Er zal meer wind komen",
        slr: "De zeespiegel stijgt"
      },
      pa: {
        heat: "Ta birando mas kalor",
        drought: "Ta birando mas seku",
        wind: "Lo tin mas bientu",
        slr: "Nivel di laman ta subiendo"
      }
    },
    explanation: {
      scenariosUrl: KNMI23_CLIMATE_SCENARIOS_URL,
      scenariosLinkText: {
        en: "KNMI 2023 climate scenarios",
        nl: "KNMI’23-klimaatscenario’s",
        pa: "senarionan di klima di KNMI 2023"
      },
      scenarioOriginExtra: { en: "", nl: "", pa: "" },
      referencePeriod: "1995–2014",
      hasLLHIParagraph: false
    }
  },
  sm: {
    area_id: "sm",
    hotDaysThreshold: 29.5,
    name: "St. Martin",
    localizedNames: {
      en: "St. Martin",
      fr: "St. Martin",
      es: "St. Martín"
    },
    indicatorOptions: indicatorOptions["sm"],
    switchableTo: [],
    dataUrls: {
      climate: "https://caribclimatescenarios.fsn1.your-objectstorage.com/Sint_Maarten.csv",
      seaLevel: "https://caribclimatescenarios.fsn1.your-objectstorage.com/Data_StMaarten_SeaLevel_2100_ref_period_1995_2014.csv",
      llhi: "https://caribclimatescenarios.fsn1.your-objectstorage.com/all_projection_data_Stmaarten_sealevel_llhi.csv"
    },
    titles: {
      en: {
        heat: "It is getting hotter",
        drought: "It is getting drier",
        wind: "There will be similar wind",
        slr: "The sea levels are rising"
      },
      fr: {
        heat: "Il fait de plus en plus chaud",
        drought: "Le climat devient plus sec",
        wind: "Les vents resteront similaires",
        slr: "Les niveaux de la mer augmentent"
      },
      es: {
        heat: "Está haciendo más calor",
        drought: "Está siendo más seco",
        wind: "Habrá vientos similares",
        slr: "El nivel del mar está subiendo"
      }
    },
    explanation: {
      scenariosUrl: IPDC_SINT_MAARTEN_URL,
      scenariosLinkText: {
        en: "IPDC 2025 climate scenarios for Sint Maarten",
        fr: "scénarios climatiques IPDC 2025 pour Saint-Martin",
        es: "escenarios climáticos IPDC 2025 para Sint Maarten"
      },
      scenarioOriginExtra: {
        en: ' The scenarios were developed by the <a href="https://www.meteosxm.com/" target="_blank">Meteorological Department St. Maarten (MDS)</a> together with <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">KNMI</a>.',
        fr: ' Les scénarios ont été développés par le <a href="https://www.meteosxm.com/" target="_blank">Service météorologique de Saint-Martin (MDS)</a> en collaboration avec <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">le KNMI</a>.',
        es: ' Los escenarios fueron desarrollados por el <a href="https://www.meteosxm.com/" target="_blank">Servicio Meteorológico de Sint Maarten (MDS)</a> junto con <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">el KNMI</a>.'
      },
      currentClimateExtra: {
        en: ", Princess Juliana airport, MDS",
        fr: ", aéroport Princess Juliana, MDS",
        es: ", aeropuerto Princess Juliana, MDS"
      },
      referencePeriod: "1995–2014",
      hasLLHIParagraph: true
    },
    seasonperiod: {
      en: {
        dry: "Dec-May",
        wet: "Jun-Nov"
      },
      fr: {
        dry: "Déc.-Mai",
        wet: "Juin-Nov."
      },
      es: {
        dry: "Dic-May",
        wet: "Jun-Nov"
      }
    }
  },
  cu: {
    area_id: "cu",
    hotDaysThreshold: 29.8,
    name: "Curaçao",
    localizedNames: {
      en: "Curaçao",
      nl: "Curaçao",
      pa: "Kòrsou"
    },
    logo: "",
    indicatorOptions: indicatorOptions["cu"],
    switchableTo: [],
    dataUrls: {
      climate: "https://caribclimatescenarios.fsn1.your-objectstorage.com/Curacao.csv",
      seaLevel: "https://caribclimatescenarios.fsn1.your-objectstorage.com/Data_Curacao_SeaLevel_2100_ref_period_1995_2014.csv",
      llhi: "https://caribclimatescenarios.fsn1.your-objectstorage.com/all_projection_data_Curacao_sealevel_llhi.csv"
    },
    titles: {
      en: {
        heat: "It is getting hotter",
        drought: "It is getting drier",
        wind: "There will be more wind",
        slr: "The sea levels are rising"
      },
      nl: {
        heat: "Het wordt warmer",
        drought: "Het wordt droger",
        wind: "Er zal meer wind komen",
        slr: "De zeespiegel stijgt"
      },
      pa: {
        heat: "Ta birando mas kalor",
        drought: "Ta birando mas seku",
        wind: "Lo tin mas bientu",
        slr: "Nivel di laman ta subi"
      }
    },
    explanation: {
      scenariosUrl: IPDC_CURACAO_URL,
      scenariosLinkText: {
        en: "IPDC 2025 climate scenarios for Curaçao",
        nl: "IPDC-klimaatscenario’s 2025 voor Curaçao",
        pa: "senarionan di klima IPDC 2025 pa Kòrsou"
      },
      scenarioOriginExtra: {
        en: ' The scenarios were developed by the Meteorological Department Curaçao (MDC) together with <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">KNMI</a>.',
        nl: ' De scenario’s zijn ontwikkeld door de Meteorologische Dienst Curaçao (MDC) samen met <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">KNMI</a>.',
        pa: ' E senarionan a wòrdu desaroyá pa Departamentu Meteorológiko di Kòrsou (MDC) huntu ku <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">KNMI</a>.'
      },
      referencePeriod: "1995–2014",
      hasLLHIParagraph: false
    }
  },
  ar: {
    area_id: "ar",
    hotDaysThreshold: 30.3,
    name: "Aruba",
    localizedNames: {
      en: "Aruba",
      nl: "Aruba",
      pa: "Aruba"
    },
    logo: "",
    indicatorOptions: indicatorOptions["ar"],
    switchableTo: [],
    dataUrls: {
      climate: "https://caribclimatescenarios.fsn1.your-objectstorage.com/Aruba.csv",
      seaLevel: "https://caribclimatescenarios.fsn1.your-objectstorage.com/Data_Curacao_SeaLevel_2100_ref_period_1995_2014.csv",
      // TODO: vervang door Aruba-eigen seaLevel zodra beschikbaar
      llhi: "https://caribclimatescenarios.fsn1.your-objectstorage.com/all_projection_data_Curacao_sealevel_llhi.csv"
      // TODO: vervang door Aruba-eigen llhi zodra beschikbaar
    },
    titles: {
      en: {
        heat: "It is getting hotter",
        drought: "It is getting drier",
        wind: "There will be more wind",
        slr: "The sea levels are rising"
      },
      nl: {
        heat: "Het wordt warmer",
        drought: "Het wordt droger",
        wind: "Er zal meer wind komen",
        slr: "De zeespiegel stijgt"
      },
      pa: {
        heat: "Ta bira mas cayente",
        drought: "Ta bira mas seco",
        wind: "Lo tin mas biento",
        slr: "Nivel di lama ta subi"
      }
    },
    explanation: {
      scenariosUrl: IPDC_ARUBA_URL,
      scenariosLinkText: {
        en: "IPDC 2025 climate scenarios for Aruba",
        nl: "IPDC-klimaatscenario’s 2025 voor Aruba",
        pa: "scenarionan di clima IPDC 2025 pa Aruba"
      },
      scenarioOriginExtra: {
        en: ' The scenarios were developed by the Departamento Meteorlogico Aruba (DMA) together with <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">KNMI</a>.',
        nl: ' De scenario’s zijn ontwikkeld door de Departamento Meteorlogico Aruba (DMA) samen met <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">KNMI</a>.',
        pa: ' E scenarionan a wordo desaroya pa Departamento Meteorlogico Aruba (DMA) hunto cu <a href="' + KNMI23_CLIMATE_SCENARIOS_URL + '" target="_blank">KNMI</a>.'
      },
      referencePeriod: "1995–2014",
      hasLLHIParagraph: true
    },
    seasonperiod: {
      en: {
        dry: "Feb-May",
        transition: "Jun-Aug",
        wet: "Sep-Jan"
      },
      nl: {
        dry: "Feb-Mei",
        transition: "Jun-Aug",
        wet: "Sep-Jan"
      },
      pa: {
        dry: "Feb-May",
        transition: "Jun-Aug",
        wet: "Sep-Yan"
      }
    }
  }
};
export {
  t as a,
  area_id as b,
  areas as c,
  datalaag as d,
  themeOptions as e,
  areaSelection as f,
  hoveredYear as g,
  h,
  indicatorOptionsArea as i,
  lang as l,
  theme as t,
  w
};

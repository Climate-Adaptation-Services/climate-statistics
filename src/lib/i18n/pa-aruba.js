// Aruban Papiamento overrides voor Aruba. Wordt samengevoegd over de standaard
// Papiamentu-dictionary (Bonaire/Curaçao) wanneer area_id === 'ar' en lang === 'pa'.
// Vul aan met sleutels die in Aruba's spelling moeten verschillen van de BES-eilanden.
//
// Belangrijkste verschillen Papiamento (Aruba) vs Papiamentu (BES):
//   k → c / qu        kambio → cambio, klima → clima
//   sh → c            preparashon → preparacion
//   ks → x            ekstremo → extremo
//   minder diacritica modèlonan → modelonan
//   senario → scenario, proyekshon → proyeccion
// Vocabulaire gebaseerd op aruba.climateimpactatlas.com:
//   'cambio climatico', 'lama' (zee), 'hunto cu', 'abou'/'halto', 'desaroya',
//   'proyeccion', 'splicacion', 'cantidad', 'inundacion', 'tocante', 'yobida'.
// Conversie van Papiamentu (pa.js) volgt regels k→c/qu, sh→c, ks→x, ku→cu,
// 'shon' → 'cion', minder diacritica, en Spaans-georiënteerde uitgangen.
export const papiamentoAruba = {
    'scenarioCurrent': 'Actual',
    'scenarioHigh': 'Halto',
    'scenarioLow': 'Abou',
    'scenarioReference': 'Referencia',
    'chooseTheme': 'Skoge un tema:',
    'chooseIndicator': 'Skoge un indicador:',
    'chooseSeason': 'Skoge un periodo:',
    'chooseLocation': 'Skoge un lugá:',
    'temperatureAvg': 'Temperatura promedio',
    'temperatureAvgDry': 'Temperatura promedio di temporada seco',
    'temperatureAvgWet': 'Temperatura promedio di temporada di yobida',
    'temperatureAvgTransition': 'Temperatura promedio di temporada di transicion',
    'precipitationAvg': 'Yobida promedio',
    'precipitationAvgDry': 'Yobida promedio den temporada seco',
    'precipitationAvgWet': 'Yobida promedio den temporada di yobida',
    'precipitationAvgTransition': 'Yobida promedio den temporada di transicion',
    'windAvg': 'Velocidad promedio di biento',
    'windAvgDry': 'Velocidad promedio di biento den temporada seco',
    'windAvgWet': 'Velocidad promedio di biento den temporada di yobida',
    'windAvgTransition': 'Velocidad promedio di biento den temporada di transicion',
    'hotDays': 'Dianan di calor',
    'hotDaysDefinition': 'Un ‘dia di calor’ ta defini como un dia cu un temperatura promedio riba {threshold} °C.',
    'hotDaysVariable': 'cantidad di dianan di calor',
    'seasonAnnual': 'Anual',
    'seasonDry': 'Temporada seco',
    'seasonWet': 'Temporada di yobida',
    'seasonTransition': 'Temporada di transicion',
    'dry': 'seco',
    'wet': 'cu awa',
    'transition': 'di transicion',
    'slrScenarioHighest': 'Scenario pa subida mas halto posibel di nivel di lama',
    'slrScenarioHighestShort': 'Scenario mas halto posibel',
    'slrHover1': 'Pasa e cursor riba e grafico',
    'slrHover2': 'pa mira mas detaye',
    'slrTap1': 'Toca e grafico',
    'slrTap2': 'pa mira mas detaye',
    'withLow': 'Cu un abou',
    'withHigh': 'Cu un halto',
    'climateChange': 'cambio climatico',
    'riseInCm': 'Subida den cm',
    'seaLevelRise': 'Subida di nivel di lama',
    'explanationAnnualTemplate': 'Bara ta mustra {variable} den e clima actual (1991–2020{currentClimateExtra}) y pa clima den futuro banda di aña 2050 y 2100. Esaki ta basa riba {scenariosLink}.{scenarioOriginExtra} E scenarionan ‘abou’ y ‘halto’ ta mustra e rango den cua probablemente cambio climatico ta desaroya, dependiendo di e emision di gas di efecto invernadero y e sensibilidad di e sistema climatico.',
    'explanationSeasonalTemplate': 'Bara ta mustra {variable} durante e temporada {season}{seasonperiodSuffix} den e clima actual (1991–2020{currentClimateExtra}) y pa clima den futuro banda di aña 2050 y 2100. Esaki ta basa riba {scenariosLink}.{scenarioOriginExtra} E scenarionan ‘abou’ y ‘halto’ ta mustra e rango den cua probablemente cambio climatico ta desaroya, dependiendo di e emision di gas di efecto invernadero y e sensibilidad di e sistema climatico.',
    'explanationSeaLevelRiseTemplate': 'E grafico ta mustra e subida di nivel di lama relaciona cu e periodo {referencePeriod}, basa riba {scenariosLink}.{scenarioOriginExtra} E proyeccionnan ta mustra e rango den cua probablemente cambio climatico ta desaroya, dependiendo di e cantidad di gas di efecto invernadero cu ta emiti (SSP1-2.6 i SSP5-8.5) y e sensibilidad di e sistema climatico (e parti scur).',
    'explanationLLHIExtra': ' E liña di punto ta mustra e subida mas halto posibel di nivel di lama. Modelonan actual ta considera e resultado aki improbable. Sin embargo, pasobra no tur procesonan climatico ta totalmente comprendi, no por wordo excluí. Pa apoya preparacion pa casonan extremo, e scenario aki ta wordo inclui den e grafico.',
    'skipToMain': 'Bai na contenido principal',
    'opensInNewTab': '(ta habri den un tab nobo)',
    'chartTitleClimate': 'Proyeccion climatica pa {indicator} na {area}',
    'chartDescClimate': 'Grafico di bara cu ta mustra clima actual (1991–2020) i proyeccionnan pa 2050 i 2100 bao di scenario abou i halto.',
    'chartTitleSeaLevel': 'Subida di nivel di lama pa {area}',
    'chartDescSeaLevel': 'Grafico di liña cu ta mustra subida proyectá di nivel di lama entre 1995 i 2100 bao di scenarionan di cambio climatico abou i halto, incluso e rango i un liña di punto pa e scenario mas halto posibel.',
    'chartDataSummary': 'Resumen di datos pa scenario',
    'chartYearSliderLabel': 'Selecta aña cu tecla di flecha pa lesa balornan',
};
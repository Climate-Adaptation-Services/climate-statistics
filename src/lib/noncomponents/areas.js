import { indicatorOptions } from './indicatorOptions';

// Centralized constant for KNMI23 climate scenarios user report PDF
const KNMI23_CLIMATE_SCENARIOS_URL = "https://cdn.knmi.nl/system/ckeditor/attachment_files/data/000/000/358/original/KNMI23_climate_scenarios_user_report.pdf";

// IPDC 2025 island-specific climate scenario reports (published Dec 16, 2025)
const IPDC_CURACAO_URL = "https://ipdc-climate-action.org/wp-content/uploads/2025/12/2025_12_08_Curacao_EN_v23-2.pdf";
const IPDC_ARUBA_URL = "https://ipdc-climate-action.org/wp-content/uploads/2025/12/2025_12_08_Aruba_EN_v23-2.pdf";
const IPDC_SINT_MAARTEN_URL = "https://ipdc-climate-action.org/wp-content/uploads/2025/12/2025_12_08_Sint_Maarten_EN_v24-4.pdf";

export const areas = {
  bq: {
    area_id: 'bq',
    name: 'Bonaire',
    localizedNames: {
      en: 'Bonaire',
      nl: 'Bonaire',
      pa: 'Boneiru'
    },
    logo: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/bonairenew.png',
    indicatorOptions: indicatorOptions['bq'],
    switchableTo: ['se'],
    dataUrls: {
      climate: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/bonaire_klimaatdata.csv',
      seaLevel: 'https://gist.githubusercontent.com/stichtingcas/cdcf6d53bdfeac4494ad81a4b2878aab/raw/6aeabf231a8ddf4d7835436a3a695ac9091dff0f/bonaire-zeespiegelstijging.csv',
      llhi: 'https://gist.githubusercontent.com/stichtingcas/3687d450f1f31da3886d39bf19d46808/raw/d2c1a95aec66014486fe612fca0fd931ecb91de9/llhi-bonaire.csv'
    },
    titles: {
      en: {
        heat: 'It is getting hotter',
        drought: 'It is getting drier',
        wind: 'There will be more wind',
        slr: 'The sea levels are rising'
      },
      nl: {
        heat: 'Het wordt warmer',
        drought: 'Het wordt droger',
        wind: 'Er zal meer wind komen',
        slr: 'De zeespiegel stijgt'
      },
      pa: {
        heat: 'Ta birando mas kalor',
        drought: 'Ta birando mas seku',
        wind: 'Lo tin mas bientu',
        slr: 'Nivel di laman ta subiendo'
      }
    },
    explanation: {
      en: {
        annual: 'The bars show the {variable} in the current climate (1991-2020) and for the future climate around 2050 and 2100  <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">(KNMI 2023 scenario’s)</a>. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ en ‘high’ scenarios reflect the two most widely differing scenarios.',
        seasonal: 'The bars show the {variable} during the {season} season in the current climate (1991-2020) and for the future climate around 2050 and 2100 <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">(KNMI 2023 scenario’s)</a>. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ en ‘high’ scenarios reflect the two most widely differing scenarios.',
        sealevelrise: 'The graph shows sea level rise relative to the period 1995 to 2014 <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">(KNMI 2023 scenario’s)</a>. The projections show the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases still being emitted (the two colours) and the sensitivity of the climate system (the shaded range).'
      },
      nl: {
        annual: 'De grafiek toont {variable} voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.',
        seasonal: 'De grafiek toont de {variable} tijdens het {season} seizoen voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.',
        sealevelrise: 'De grafiek toont de zeespiegelstijging ten opzichte van de periode 1995 tot 2014 volgens de <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI 2023 scenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten (de twee kleuren) en de gevoeligheid van het klimaatsysteem (het donkere deel).'
      },
      pa: {
        annual: 'Bara ta mustra {variable} den e klima aktual (1991-2020) i pa klima den futuro banda di 2050 i 2100  <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(senarionan di KNMI 2023)</a>. E senarionan ta representá e rango den kua probablemente kambio di klima ta desaroyá. E rango akí ta dependé di tantu e kantidat di gas ku ta emití komo e sensibilidat di e sistema di klima. E senarionan ‘bou’ i ‘haltu’ ta reflehá e dos senarionan mas diferente.',
        seasonal: 'Bara ta mustra {variable} den e klima aktual (1991-2020) i pa klima den futuro banda di 2050 i 2100  <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(senarionan di KNMI 2023)</a>. E senarionan ta representá e rango den kua probablemente kambio di klima ta desaroyá. E rango akí ta dependé di tantu e kantidat di gas ku ta emití komo e sensibilidat di e sistema di klima. E senarionan ‘bou’ i ‘haltu’ ta reflehá e dos senarionan mas diferente.',
        sealevelrise: 'Bara ta mustra {variable} den e klima aktual (1991-2020) i pa klima den futuro banda di 2050 i 2100  <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(senarionan di KNMI 2023)</a>. E senarionan ta representá e rango den kua probablemente kambio di klima ta desaroyá. E rango akí ta dependé di tantu e kantidat di gas ku ta emití komo e sensibilidat di e sistema di klima. E senarionan ‘bou’ i ‘haltu’ ta reflehá e dos senarionan mas diferente.',
      }
    }
  },
  se: {
    area_id: 'se',
    name: 'Saba & St.Eustatius',
    localizedNames: {
      en: 'Saba & St.Eustatius',
      nl: 'Saba & St.Eustatius',
      pa: 'Saba & Statia'
    },
    logo: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/saba_eus_gezelligbijelkaar.png',
    indicatorOptions: indicatorOptions['se'],
    switchableTo: ['bq'],
    dataUrls: {
      climate: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/sabast_klimaatdata.csv',
      seaLevel: 'https://gist.githubusercontent.com/stichtingcas/86d27026230225096cc431697d0b0d94/raw/2d0a7a404447ce130f2d231cd3f7da1df38a65c0/saba-zeespiegelstijging.csv',
      llhi: 'https://gist.githubusercontent.com/stichtingcas/01a920f71325b35fc193d48f19dd065e/raw/baef6c01aa777844fad66c596eebee5ae37eb88f/llhi-saba.csv'
    },
    titles: {
      en: {
        heat: 'It is getting hotter',
        drought: 'It is getting drier',
        wind: 'There will be more wind',
        slr: 'The sea levels are rising'
      },
      nl: {
        heat: 'Het wordt warmer',
        drought: 'Het wordt droger',
        wind: 'Er zal meer wind komen',
        slr: 'De zeespiegel stijgt'
      },
      pa: {
        heat: 'Ta birando mas kalor',
        drought: 'Ta birando mas seku',
        wind: 'Lo tin mas bientu',
        slr: 'Nivel di laman ta subiendo'
      }
    },
    explanation: {
      en: {
        annual: 'The bars show the {variable} in the current climate (1991-2020) and for the future climate around 2050 and 2100  <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">(KNMI 2023 scenario’s)</a>. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ en ‘high’ scenarios reflect the two most widely differing scenarios.',
        seasonal: 'The bars show the {variable} during the {season} season in the current climate (1991-2020) and for the future climate around 2050 and 2100 <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">(KNMI 2023 scenario’s)</a>. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ en ‘high’ scenarios reflect the two most widely differing scenarios.',
        sealevelrise: 'The graph shows sea level rise relative to the period 1995 to 2014 <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">(KNMI 2023 scenario’s)</a>. The projections show the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases still being emitted (the two colours) and the sensitivity of the climate system (the shaded range).'
      },
      nl: {
        annual: 'De grafiek toont {variable} voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.',
        seasonal: 'De grafiek toont de {variable} tijdens het {season} seizoen voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.',
        sealevelrise: 'De grafiek toont de zeespiegelstijging ten opzichte van de periode 1995 tot 2014 volgens de <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI 2023 scenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten (de twee kleuren) en de gevoeligheid van het klimaatsysteem (het donkere deel).'
      },
      pa: {
        annual:'Bara ta mustra {variable} den e klima aktual (1991-2020) i pa klima den futuro banda di 2050 i 2100  <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(senarionan di KNMI 2023)</a>. E senarionan ta representá e rango den kua probablemente kambio di klima ta desaroyá. E rango akí ta dependé di tantu e kantidat di gas ku ta emití komo e sensibilidat di e sistema di klima. E senarionan ‘bou’ i ‘haltu’ ta reflehá e dos senarionan mas diferente.',
        seasonal: 'Bara ta mustra {variable} promedio durante e temporada {season} den e klima aktual (1991-2020) i pa klima den futuro banda di 2050 i 2100 <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(senarionan di KNMI 2023)</a>. E senarionan ta representá e rango den kua probablemente kambio di klima ta desaroyá. E rango akí ta dependé di tantu e kantidat di gas ku ta emití komo e sensibilidat di e sistema di klima. E senarionan ‘bou’ i ‘haltu’ ta reflehá e dos senarionan mas diferente.',
        sealevelrise:'E gráfiko ta mustra subida di nivel di laman relashoná ku e periodo 1995 te 2014 <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(senarionan di KNMI 2023)</a>. E proyekshonnan ta mustra e rango den kua kambio di klima probablemente ta desaroyá. E rango akí ta dependé di tantu e kantidat di gas ku ketu bai ta emití (e dos kolónan) komo sensibilidat di e sistema di klima (e rango ku sombra).'
      }
    }
  },
  sm: {
    area_id: 'sm',
    hotDaysThreshold: 29.5,
    name: 'St. Martin',
    localizedNames: {
      en: 'St. Martin',
      fr: 'St. Martin',
      es: 'St. Martín'
    },
    indicatorOptions: indicatorOptions['sm'],
    switchableTo: [],
    dataUrls: {
      climate: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/Sint_Maarten.csv',
      seaLevel: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/Data_StMaarten_SeaLevel_2100_ref_period_1995_2014.csv',
      llhi: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/all_projection_data_Stmaarten_sealevel_llhi.csv'
    },
    titles: {
      en: {
        heat: 'It is getting hotter',
        drought: 'It is getting drier',
        wind: 'There will be similar wind',
        slr: 'The sea levels are rising'
      },
      fr: {
        heat: 'Il fait de plus en plus chaud',
        drought: 'Le climat devient plus sec',
        wind: 'Les vents resteront similaires',
        slr: 'Les niveaux de la mer augmentent'
      },
      es: {
        heat: 'Está haciendo más calor',
        drought: 'Está siendo más seco',
        wind: 'Habrá vientos similares',
        slr: 'El nivel del mar está subiendo'
      }
    },
    explanation: {
      en: {
        annual: 'The bars show the {variable} in the current climate (1991–2020) and for the future climate around 2050 and 2100, based on the <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">IPDC 2025 climate scenarios for Sint Maarten</a>. The scenarios were developed by the <a href="https://www.meteosxm.com/" target="_blank">Meteorological Department St. Maarten (MDS)</a> together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The ‘low’ and ‘high’ scenarios show the range within which climate change is likely to develop, depending on greenhouse gas emissions and the sensitivity of the climate system.',
        seasonal: 'The bars show the {variable} during the {season} season ({seasonperiod}) in the current climate (1991–2020) and for the future climate around 2050 and 2100, based on the <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">IPDC 2025 climate scenarios for Sint Maarten</a>. The scenarios were developed by the <a href="https://www.meteosxm.com/" target="_blank">Meteorological Department St. Maarten (MDS)</a> together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The ‘low’ and ‘high’ scenarios show the range within which climate change is likely to develop, depending on greenhouse gas emissions and the sensitivity of the climate system.',
        sealevelrise: 'The graph shows sea level rise relative to the period 1995–2014, based on the <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">IPDC 2025 climate scenarios for Sint Maarten</a>. The scenarios were developed by the <a href="https://www.meteosxm.com/" target="_blank">Meteorological Department St. Maarten (MDS)</a> together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The projections show the range within which climate change is likely to develop, depending on the amount of greenhouse gases emitted (the two colours) and the sensitivity of the climate system (the shaded range). The dashed line shows the highest possible sea level rise. Current models consider this outcome unlikely, but because not all climate processes are fully understood it cannot be ruled out; to support preparedness for extreme cases, this scenario is included in the graph.',
      },
      fr: {
        annual: 'Les barres montrent la {variable} dans le climat actuel (1991–2020) et pour le climat futur vers 2050 et 2100, sur la base des <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">scénarios climatiques IPDC 2025 pour Saint-Martin</a>. Les scénarios ont été développés par le <a href="https://www.meteosxm.com/" target="_blank">Service météorologique de Saint-Martin (MDS)</a> en collaboration avec <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">le KNMI</a>. Les scénarios « bas » et « haut » montrent la fourchette dans laquelle le changement climatique est susceptible d\'évoluer, selon les émissions de gaz à effet de serre et la sensibilité du système climatique.',
        seasonal: 'Les barres montrent la {variable} pendant la saison {season} ({seasonperiod}) dans le climat actuel (1991–2020) et pour le climat futur vers 2050 et 2100, sur la base des <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">scénarios climatiques IPDC 2025 pour Saint-Martin</a>. Les scénarios ont été développés par le <a href="https://www.meteosxm.com/" target="_blank">Service météorologique de Saint-Martin (MDS)</a> en collaboration avec <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">le KNMI</a>. Les scénarios « bas » et « haut » montrent la fourchette dans laquelle le changement climatique est susceptible d\'évoluer, selon les émissions de gaz à effet de serre et la sensibilité du système climatique.',
        sealevelrise: 'Le graphique montre l\'élévation du niveau de la mer par rapport à la période 1995–2014, sur la base des <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">scénarios climatiques IPDC 2025 pour Saint-Martin</a>. Les scénarios ont été développés par le <a href="https://www.meteosxm.com/" target="_blank">Service météorologique de Saint-Martin (MDS)</a> en collaboration avec <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">le KNMI</a>. Les projections montrent la fourchette dans laquelle le changement climatique est susceptible d\'évoluer, selon la quantité de gaz à effet de serre émis (les deux couleurs) et la sensibilité du système climatique (la zone ombrée). La ligne en pointillés montre l\'élévation maximale possible du niveau de la mer ; les modèles actuels considèrent ce résultat improbable mais ne peuvent l\'exclure, et il est inclus pour soutenir la préparation aux cas extrêmes.',
      },
      es: {
        annual: 'Las barras muestran la {variable} en el clima actual (1991–2020) y en el clima futuro hacia 2050 y 2100, sobre la base de los <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">escenarios climáticos IPDC 2025 para Sint Maarten</a>. Los escenarios fueron desarrollados por el <a href="https://www.meteosxm.com/" target="_blank">Servicio Meteorológico de Sint Maarten (MDS)</a> junto con <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">el KNMI</a>. Los escenarios «bajo» y «alto» muestran el rango dentro del cual probablemente se desarrollará el cambio climático, dependiendo de las emisiones de gases de efecto invernadero y de la sensibilidad del sistema climático.',
        seasonal: 'Las barras muestran la {variable} durante la temporada {season} ({seasonperiod}) en el clima actual (1991–2020) y en el clima futuro hacia 2050 y 2100, sobre la base de los <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">escenarios climáticos IPDC 2025 para Sint Maarten</a>. Los escenarios fueron desarrollados por el <a href="https://www.meteosxm.com/" target="_blank">Servicio Meteorológico de Sint Maarten (MDS)</a> junto con <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">el KNMI</a>. Los escenarios «bajo» y «alto» muestran el rango dentro del cual probablemente se desarrollará el cambio climático, dependiendo de las emisiones de gases de efecto invernadero y de la sensibilidad del sistema climático.',
        sealevelrise: 'El gráfico muestra el aumento del nivel del mar en relación con el período 1995–2014, sobre la base de los <a href="'+IPDC_SINT_MAARTEN_URL+'" target="_blank">escenarios climáticos IPDC 2025 para Sint Maarten</a>. Los escenarios fueron desarrollados por el <a href="https://www.meteosxm.com/" target="_blank">Servicio Meteorológico de Sint Maarten (MDS)</a> junto con <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">el KNMI</a>. Las proyecciones muestran el rango dentro del cual probablemente se desarrollará el cambio climático, dependiendo de las emisiones de gases de efecto invernadero (los dos colores) y de la sensibilidad del sistema climático (la zona sombreada). La línea discontinua muestra el aumento máximo posible del nivel del mar; los modelos actuales lo consideran improbable pero no pueden descartarlo, y se incluye para apoyar la preparación ante casos extremos.',
      }
    },
    seasonperiod: {
      en: {
        dry: 'Dec-Apr',
        wet: 'May-Nov'
      },
      fr: {
        dry: 'Déc.-Avr.',
        wet: 'Mai-Nov.'
      },
      es: {
        dry: 'Dic-Abr',
        wet: 'May-Nov'
      }
    }
  },
  cu: {
    area_id: 'cu',
    hotDaysThreshold: 29.8,
    name: 'Curaçao',
    localizedNames: {
      en: 'Curaçao',
      nl: 'Curaçao',
      pa: 'Kòrsou'
    },
    logo: '',
    indicatorOptions: indicatorOptions['cu'],
    switchableTo: [],
    dataUrls: {
      climate: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/Curacao.csv',
      seaLevel: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/Data_Curacao_SeaLevel_2100_ref_period_1995_2014.csv',
      llhi: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/all_projection_data_Curacao_sealevel_llhi.csv'
    },
    titles: {
      en: {
        heat: 'It is getting hotter',
        drought: 'It is getting drier',
        wind: 'There will be more wind',
        slr: 'The sea levels are rising'
      },
      nl: {
        heat: 'Het wordt warmer',
        drought: 'Het wordt droger',
        wind: 'Er zal meer wind komen',
        slr: 'De zeespiegel stijgt'
      },
      pa: {
        heat: 'Ta birando mas kalor',
        drought: 'Ta birando mas seku',
        wind: 'Lo tin mas bientu',
        slr: 'Nivel di laman ta subiendo'
      }
    },
    explanation: {
      en: {
        annual: 'The bars show the {variable} in the current climate (1991–2020) and for the future climate around 2050 and 2100, based on the <a href="'+IPDC_CURACAO_URL+'" target="_blank">IPDC 2025 climate scenarios for Curaçao</a>. The scenarios were developed by the Meteorological Department Curaçao (MDC) together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The ‘low’ and ‘high’ scenarios show the range within which climate change is likely to develop, depending on greenhouse gas emissions and the sensitivity of the climate system.',
        seasonal: 'The bars show the {variable} during the {season} season in the current climate (1991–2020) and for the future climate around 2050 and 2100, based on the <a href="'+IPDC_CURACAO_URL+'" target="_blank">IPDC 2025 climate scenarios for Curaçao</a>. The scenarios were developed by the Meteorological Department Curaçao (MDC) together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The ‘low’ and ‘high’ scenarios show the range within which climate change is likely to develop, depending on greenhouse gas emissions and the sensitivity of the climate system.',
        sealevelrise: 'The graph shows sea level rise relative to the period 1995–2014, based on the <a href="'+IPDC_CURACAO_URL+'" target="_blank">IPDC 2025 climate scenarios for Curaçao</a>. The scenarios were developed by the Meteorological Department Curaçao (MDC) together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The projections show the range within which climate change is likely to develop, depending on the amount of greenhouse gases emitted (the two colours) and the sensitivity of the climate system (the shaded range).'
      },
      nl: {
        annual: 'De grafiek toont {variable} voor het huidige klimaat (1991–2020) en voor het toekomstige klimaat rond 2050 en 2100, gebaseerd op de <a href="'+IPDC_CURACAO_URL+'" target="_blank">IPDC-klimaatscenario’s 2025 voor Curaçao</a>. De scenario’s zijn ontwikkeld door de Meteorologische Dienst Curaçao (MDC) samen met <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. De scenario’s ‘laag’ en ‘hoog’ tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen en de gevoeligheid van het klimaatsysteem.',
        seasonal: 'De grafiek toont {variable} tijdens het {season} seizoen voor het huidige klimaat (1991–2020) en voor het toekomstige klimaat rond 2050 en 2100, gebaseerd op de <a href="'+IPDC_CURACAO_URL+'" target="_blank">IPDC-klimaatscenario’s 2025 voor Curaçao</a>. De scenario’s zijn ontwikkeld door de Meteorologische Dienst Curaçao (MDC) samen met <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. De scenario’s ‘laag’ en ‘hoog’ tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen en de gevoeligheid van het klimaatsysteem.',
        sealevelrise: 'De grafiek toont de zeespiegelstijging ten opzichte van de periode 1995–2014, gebaseerd op de <a href="'+IPDC_CURACAO_URL+'" target="_blank">IPDC-klimaatscenario’s 2025 voor Curaçao</a>. De scenario’s zijn ontwikkeld door de Meteorologische Dienst Curaçao (MDC) samen met <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. De projecties tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen (de twee kleuren) en de gevoeligheid van het klimaatsysteem (het donkere deel).'
      },
      pa: {
        annual: 'Bara ta mustra {variable} den e klima aktual (1991–2020) i pa klima den futuro banda di 2050 i 2100, basá riba e <a href="'+IPDC_CURACAO_URL+'" target="_blank">senarionan di klima IPDC 2025 pa Kòrsou</a>. E senarionan a wòrdu desaroyá pa Departamentu Meteorológiko di Kòrsou (MDC) huntu ku <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. E senarionan ‘bou’ i ‘haltu’ ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e emishon di gas di efekto invernadero i e sensibilidat di e sistema di klima.',
        seasonal: 'Bara ta mustra {variable} durante e temporada {season} den e klima aktual (1991–2020) i pa klima den futuro banda di 2050 i 2100, basá riba e <a href="'+IPDC_CURACAO_URL+'" target="_blank">senarionan di klima IPDC 2025 pa Kòrsou</a>. E senarionan a wòrdu desaroyá pa Departamentu Meteorológiko di Kòrsou (MDC) huntu ku <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. E senarionan ‘bou’ i ‘haltu’ ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e emishon di gas di efekto invernadero i e sensibilidat di e sistema di klima.',
        sealevelrise: 'E gráfiko ta mustra e subida di nivel di laman relashoná ku e periodo 1995–2014, basá riba e <a href="'+IPDC_CURACAO_URL+'" target="_blank">senarionan di klima IPDC 2025 pa Kòrsou</a>. E senarionan a wòrdu desaroyá pa Departamentu Meteorológiko di Kòrsou (MDC) huntu ku <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. E proyekshonnan ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e kantidat di gas di efekto invernadero ku ta emití (e dos kolónan) i e sensibilidat di e sistema di klima (e parti skur).'
      }
    }
  },
  ar: {
    area_id: 'ar',
    hotDaysThreshold: 30.3,
    name: 'Aruba',
    localizedNames: {
      en: 'Aruba',
      nl: 'Aruba',
      pa: 'Aruba'
    },
    logo: '',
    indicatorOptions: indicatorOptions['ar'],
    switchableTo: [],
    dataUrls: {
      climate: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/Aruba.csv',
      seaLevel: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/Data_Curacao_SeaLevel_2100_ref_period_1995_2014.csv', // TODO: vervang door Aruba-eigen seaLevel zodra beschikbaar
      llhi: 'https://caribclimatescenarios.fsn1.your-objectstorage.com/all_projection_data_Curacao_sealevel_llhi.csv' // TODO: vervang door Aruba-eigen llhi zodra beschikbaar
    },
    titles: {
      en: {
        heat: 'It is getting hotter',
        drought: 'It is getting drier',
        wind: 'There will be more wind',
        slr: 'The sea levels are rising'
      },
      nl: {
        heat: 'Het wordt warmer',
        drought: 'Het wordt droger',
        wind: 'Er zal meer wind komen',
        slr: 'De zeespiegel stijgt'
      },
      pa: {
        heat: 'Ta birando mas kalor',
        drought: 'Ta birando mas seku',
        wind: 'Lo tin mas bientu',
        slr: 'Nivel di laman ta subiendo'
      }
    },
    explanation: {
      en: {
        annual: 'The bars show the {variable} in the current climate (1991–2020) and for the future climate around 2050 and 2100, based on the <a href="'+IPDC_ARUBA_URL+'" target="_blank">IPDC 2025 climate scenarios for Aruba</a>. The scenarios were developed by the Departamento Meteorlogico Aruba (DMA) together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The ‘low’ and ‘high’ scenarios show the range within which climate change is likely to develop, depending on greenhouse gas emissions and the sensitivity of the climate system.',
        seasonal: 'The bars show the {variable} during the {season} season in the current climate (1991–2020) and for the future climate around 2050 and 2100, based on the <a href="'+IPDC_ARUBA_URL+'" target="_blank">IPDC 2025 climate scenarios for Aruba</a>. The scenarios were developed by the Departamento Meteorlogico Aruba (DMA) together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The ‘low’ and ‘high’ scenarios show the range within which climate change is likely to develop, depending on greenhouse gas emissions and the sensitivity of the climate system.',
        sealevelrise: 'The graph shows sea level rise relative to the period 1995–2014, based on the <a href="'+IPDC_ARUBA_URL+'" target="_blank">IPDC 2025 climate scenarios for Aruba</a>. The scenarios were developed by the Departamento Meteorlogico Aruba (DMA) together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. The projections show the range within which climate change is likely to develop, depending on the amount of greenhouse gases emitted (the two colours) and the sensitivity of the climate system (the shaded range).'
      },
      nl: {
        annual: 'De grafiek toont {variable} voor het huidige klimaat (1991–2020) en voor het toekomstige klimaat rond 2050 en 2100, gebaseerd op de <a href="'+IPDC_ARUBA_URL+'" target="_blank">IPDC-klimaatscenario’s 2025 voor Aruba</a>. De scenario’s zijn ontwikkeld door de Departamento Meteorlogico Aruba (DMA) samen met <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. De scenario’s ‘laag’ en ‘hoog’ tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen en de gevoeligheid van het klimaatsysteem.',
        seasonal: 'De grafiek toont {variable} tijdens het {season} seizoen voor het huidige klimaat (1991–2020) en voor het toekomstige klimaat rond 2050 en 2100, gebaseerd op de <a href="'+IPDC_ARUBA_URL+'" target="_blank">IPDC-klimaatscenario’s 2025 voor Aruba</a>. De scenario’s zijn ontwikkeld door de Departamento Meteorlogico Aruba (DMA) samen met <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. De scenario’s ‘laag’ en ‘hoog’ tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen en de gevoeligheid van het klimaatsysteem.',
        sealevelrise: 'De grafiek toont de zeespiegelstijging ten opzichte van de periode 1995–2014, gebaseerd op de <a href="'+IPDC_ARUBA_URL+'" target="_blank">IPDC-klimaatscenario’s 2025 voor Aruba</a>. De scenario’s zijn ontwikkeld door de Departamento Meteorlogico Aruba (DMA) samen met <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. De projecties tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen, afhankelijk van de uitstoot van broeikasgassen (de twee kleuren) en de gevoeligheid van het klimaatsysteem (het donkere deel).'
      },
      pa: {
        annual: 'Bara ta mustra {variable} den e klima aktual (1991–2020) i pa klima den futuro banda di 2050 i 2100, basá riba e <a href="'+IPDC_ARUBA_URL+'" target="_blank">senarionan di klima IPDC 2025 pa Aruba</a>. E senarionan a wòrdu desaroyá pa Departamento Meteorlogico Aruba (DMA) huntu ku <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. E senarionan ‘bou’ i ‘haltu’ ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e emishon di gas di efekto invernadero i e sensibilidat di e sistema di klima.',
        seasonal: 'Bara ta mustra {variable} durante e temporada {season} den e klima aktual (1991–2020) i pa klima den futuro banda di 2050 i 2100, basá riba e <a href="'+IPDC_ARUBA_URL+'" target="_blank">senarionan di klima IPDC 2025 pa Aruba</a>. E senarionan a wòrdu desaroyá pa Departamento Meteorlogico Aruba (DMA) huntu ku <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. E senarionan ‘bou’ i ‘haltu’ ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e emishon di gas di efekto invernadero i e sensibilidat di e sistema di klima.',
        sealevelrise: 'E gráfiko ta mustra e subida di nivel di laman relashoná ku e periodo 1995–2014, basá riba e <a href="'+IPDC_ARUBA_URL+'" target="_blank">senarionan di klima IPDC 2025 pa Aruba</a>. E senarionan a wòrdu desaroyá pa Departamento Meteorlogico Aruba (DMA) huntu ku <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>. E proyekshonnan ta mustra e rango den kua probablemente kambio di klima ta desaroyá, dependiendo di e kantidat di gas di efekto invernadero ku ta emití (e dos kolónan) i e sensibilidat di e sistema di klima (e parti skur).'
      }
    }
  }
};

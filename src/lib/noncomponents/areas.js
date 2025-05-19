import { indicatorOptions } from './indicatorOptions';

export const areas = {
  bq: {
    area_id: 'bq',
    name: 'Bonaire',
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
      }
    },
    explanation: {
      en: {
        annual: 'The bars show the {variable} in the current climate (1991-2020) and for the future climate around 2050 and 2100  <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenario’s)</a>. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ en ‘high’ scenarios reflect the two most widely differing scenarios.',
        seasonal: 'The bars show the {variable} during the {season} season in the current climate (1991-2020) and for the future climate around 2050 and 2100 <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenario’s)</a>. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ en ‘high’ scenarios reflect the two most widely differing scenarios.',
        sealevelrise: 'The graph shows sea level rise relative to the period 1995 to 2014 <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenario’s)</a>. The projections show the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases still being emitted (the two colours) and the sensitivity of the climate system (the shaded range).'
      },
      nl: {
        annual: 'De grafiek toont {variable} voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.',
        seasonal: 'De grafiek toont de {variable} tijdens het {season} seizoen voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.',
        sealevelrise: 'De grafiek toont de {variable} tijdens het {season} seizoen voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.'
      }
    }
  },
  se: {
    area_id: 'se',
    name: 'Saba & St.Eustatius',
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
      }
    },
    explanation: {
      en: {
        annual: 'The bars show the {variable} in the current climate (1991-2020) and for the future climate around 2050 and 2100  <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenario’s)</a>. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ en ‘high’ scenarios reflect the two most widely differing scenarios.',
        seasonal: 'The bars show the {variable} during the {season} season in the current climate (1991-2020) and for the future climate around 2050 and 2100 <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenario’s)</a>. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ en ‘high’ scenarios reflect the two most widely differing scenarios.',
        sealevelrise: 'The graph shows sea level rise relative to the period 1995 to 2014 <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenario’s)</a>. The projections show the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases still being emitted (the two colours) and the sensitivity of the climate system (the shaded range).'
      },
      nl: {
        annual: 'De grafiek toont {variable} voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.',
        seasonal: 'De grafiek toont de {variable} tijdens het {season} seizoen voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.',
        sealevelrise: 'De grafiek toont de {variable} tijdens het {season} seizoen voor het huidige klimaat (1991-2020) en voor het toekomstige klimaat rond 2050 en 2100, volgens <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">de KNMI’23-klimaatscenario’s</a>. De klimaatscenario’s tonen de bandbreedte waarbinnen klimaatverandering zich waarschijnlijk zal ontwikkelen. Deze bandbreedte is afhankelijk van de hoeveelheid broeikasgassen die wordt uitgestoten en de gevoeligheid van het klimaatsysteem. De scenario’s ‘laag’ en ‘hoog’ zijn de twee scenario’s die het verst uit elkaar liggen.'
      }
    }
  },
  sm: {
    area_id: 'sm',
    name: 'St. Martin',
    indicatorOptions: indicatorOptions['sm'],
    switchableTo: [],
    dataUrls: {
      climate: 'https://stmaartenclimatestatistics.s3.eu-north-1.amazonaws.com/future_stats.csv',
      seaLevel: 'https://gist.githubusercontent.com/stichtingcas/86d27026230225096cc431697d0b0d94/raw/2d0a7a404447ce130f2d231cd3f7da1df38a65c0/saba-zeespiegelstijging.csv', // Please check if this is correct
      llhi: 'https://gist.githubusercontent.com/stichtingcas/01a920f71325b35fc193d48f19dd065e/raw/baef6c01aa777844fad66c596eebee5ae37eb88f/llhi-saba.csv' // Please check if this is correct
    },
    titles: {
      en: {
        heat: 'It is getting hotter',
        drought: 'It is getting drier',
        wind: 'There will be similair wind',
        slr: 'The sea levels are rising'
      },
    },
    explanation: {
      en: {
        annual: 'The bars show the {variable} in the current climate (1991-2020, <a href=" https://www.meteosxm.com/" target="_blank">MDS</a>) and for the future climate around 2050 and 2100  <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenarios)</a>. The bars show average values, changes in extremes are not included. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ and ‘high’ scenarios reflect the two most widely differing scenarios.',
        seasonal: 'The bars show the {variable} during the {season} in the current climate (1991-2020, <a href=" https://www.meteosxm.com/" target="_blank">MDS</a>) and for the future climate around 2050 and 2100  <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenarios)</a>. The bars show average values, changes in extremes are not included. The scenarios represent the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases being emitted and the sensitivity of the climate system. The ‘low’ and ‘high’ scenarios reflect the two most widely differing scenarios.',
        sealevelrise: 'The graph shows sea level rise relative to the period 1995 to 2014 <a href="https://cdn.knmi.nl/system/data_center_publications/files/000/071/901/original/KNMI23_klimaatscenarios_gebruikersrapport_23-03.pdf" target="_blank">(KNMI 2023 scenario’s)</a>. The projections show the range within which climate change is likely to develop. This range depends on both the amount of greenhouse gases still being emitted (the two colours) and the sensitivity of the climate system (the shaded range).'
      },
    }
  }
};

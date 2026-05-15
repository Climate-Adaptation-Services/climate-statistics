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
    switchableTo: [],
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
      scenariosUrl: KNMI23_CLIMATE_SCENARIOS_URL,
      scenariosLinkText: {
        en: 'KNMI 2023 climate scenarios',
        nl: 'KNMI’23-klimaatscenario’s',
        pa: 'senarionan di klima di KNMI 2023'
      },
      scenarioOriginExtra: { en: '', nl: '', pa: '' },
      referencePeriod: '1995–2014',
      hasLLHIParagraph: false
    }
  },
  sa: {
    area_id: 'sa',
    name: 'Saba',
    localizedNames: {
      en: 'Saba',
      nl: 'Saba',
      pa: 'Saba'
    },
    logo: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/saba_eus_gezelligbijelkaar.png', // TODO: vervang door Saba-eigen logo zodra beschikbaar
    indicatorOptions: indicatorOptions['sa'],
    switchableTo: [],
    dataUrls: {
      climate: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/sabast_klimaatdata.csv', // TODO: vervang door Saba-eigen climate data zodra beschikbaar
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
      scenariosUrl: KNMI23_CLIMATE_SCENARIOS_URL,
      scenariosLinkText: {
        en: 'KNMI 2023 climate scenarios',
        nl: 'KNMI’23-klimaatscenario’s',
        pa: 'senarionan di klima di KNMI 2023'
      },
      scenarioOriginExtra: { en: '', nl: '', pa: '' },
      referencePeriod: '1995–2014',
      hasLLHIParagraph: false
    }
  },
  se: {
    area_id: 'se',
    name: 'Sint Eustatius',
    localizedNames: {
      en: 'Sint Eustatius',
      nl: 'Sint Eustatius',
      pa: 'Statia'
    },
    logo: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/saba_eus_gezelligbijelkaar.png', // TODO: vervang door Sint Eustatius-eigen logo zodra beschikbaar
    indicatorOptions: indicatorOptions['se'],
    switchableTo: [],
    dataUrls: {
      climate: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/sabast_klimaatdata.csv', // TODO: vervang door Sint Eustatius-eigen climate data zodra beschikbaar
      seaLevel: 'https://gist.githubusercontent.com/stichtingcas/86d27026230225096cc431697d0b0d94/raw/2d0a7a404447ce130f2d231cd3f7da1df38a65c0/saba-zeespiegelstijging.csv', // TODO: vervang door Sint Eustatius-eigen seaLevel zodra beschikbaar
      llhi: 'https://gist.githubusercontent.com/stichtingcas/01a920f71325b35fc193d48f19dd065e/raw/baef6c01aa777844fad66c596eebee5ae37eb88f/llhi-saba.csv' // TODO: vervang door Sint Eustatius-eigen llhi zodra beschikbaar
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
      scenariosUrl: KNMI23_CLIMATE_SCENARIOS_URL,
      scenariosLinkText: {
        en: 'KNMI 2023 climate scenarios',
        nl: 'KNMI’23-klimaatscenario’s',
        pa: 'senarionan di klima di KNMI 2023'
      },
      scenarioOriginExtra: { en: '', nl: '', pa: '' },
      referencePeriod: '1995–2014',
      hasLLHIParagraph: false
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
      scenariosUrl: IPDC_SINT_MAARTEN_URL,
      scenariosLinkText: {
        en: 'IPDC 2025 climate scenarios for Sint Maarten',
        fr: 'scénarios climatiques IPDC 2025 pour Saint-Martin',
        es: 'escenarios climáticos IPDC 2025 para Sint Maarten'
      },
      scenarioOriginExtra: {
        en: ' The scenarios were developed by the <a href="https://www.meteosxm.com/" target="_blank">Meteorological Department St. Maarten (MDS)</a> together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>.',
        fr: ' Les scénarios ont été développés par le <a href="https://www.meteosxm.com/" target="_blank">Service météorologique de Saint-Martin (MDS)</a> en collaboration avec <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">le KNMI</a>.',
        es: ' Los escenarios fueron desarrollados por el <a href="https://www.meteosxm.com/" target="_blank">Servicio Meteorológico de Sint Maarten (MDS)</a> junto con <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">el KNMI</a>.'
      },
      referencePeriod: '1995–2014',
      hasLLHIParagraph: true
    },
    seasonperiod: {
      en: {
        dry: 'Dec-May',
        wet: 'Jun-Nov'
      },
      fr: {
        dry: 'Déc.-Mai',
        wet: 'Juin-Nov.'
      },
      es: {
        dry: 'Dic-May',
        wet: 'Jun-Nov'
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
        slr: 'Nivel di laman ta subi'
      }
    },
    explanation: {
      scenariosUrl: IPDC_CURACAO_URL,
      scenariosLinkText: {
        en: 'IPDC 2025 climate scenarios for Curaçao',
        nl: 'IPDC-klimaatscenario’s 2025 voor Curaçao',
        pa: 'senarionan di klima IPDC 2025 pa Kòrsou'
      },
      scenarioOriginExtra: {
        en: ' The scenarios were developed by the Meteorological Department Curaçao (MDC) together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>.',
        nl: ' De scenario’s zijn ontwikkeld door de Meteorologische Dienst Curaçao (MDC) samen met <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>.',
        pa: ' E senarionan a wòrdu desaroyá pa Departamentu Meteorológiko di Kòrsou (MDC) huntu ku <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>.'
      },
      referencePeriod: '1995–2014',
      hasLLHIParagraph: false
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
        heat: 'Ta bira mas cayente',
        drought: 'Ta bira mas seco',
        wind: 'Lo tin mas biento',
        slr: 'Nivel di lama ta subi'
      }
    },
    explanation: {
      scenariosUrl: IPDC_ARUBA_URL,
      scenariosLinkText: {
        en: 'IPDC 2025 climate scenarios for Aruba',
        nl: 'IPDC-klimaatscenario’s 2025 voor Aruba',
        pa: 'scenarionan di clima IPDC 2025 pa Aruba'
      },
      scenarioOriginExtra: {
        en: ' The scenarios were developed by the Departamento Meteorlogico Aruba (DMA) together with <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>.',
        nl: ' De scenario’s zijn ontwikkeld door de Departamento Meteorlogico Aruba (DMA) samen met <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>.',
        pa: ' E scenarionan a wordo desaroya pa Departamento Meteorlogico Aruba (DMA) hunto cu <a href="'+KNMI23_CLIMATE_SCENARIOS_URL+'" target="_blank">KNMI</a>.'
      },
      referencePeriod: '1995–2014',
      hasLLHIParagraph: true
    },
    seasonperiod: {
      en: {
        dry: 'Feb-May',
        transition: 'Jun-Aug',
        wet: 'Sep-Jan'
      },
      nl: {
        dry: 'Feb-Mei',
        transition: 'Jun-Aug',
        wet: 'Sep-Jan'
      },
      pa: {
        dry: 'Feb-May',
        transition: 'Jun-Aug',
        wet: 'Sep-Yan'
      }
    }
  }
};

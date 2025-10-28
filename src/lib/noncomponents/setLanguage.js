import { lang } from "$lib/stores"

export function setLanguage(data){
    if(data.lang === 'nl'){
        lang.set('nl')
    }else if(data.lang === 'pa'){
        lang.set('pa')
    }else if(data.lang === 'fr'){
        lang.set('fr')
    }else if(data.lang === 'es'){
        lang.set('es')
    }else{
        lang.set('en')
    }
}
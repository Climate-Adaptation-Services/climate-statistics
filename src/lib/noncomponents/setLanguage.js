import { lang } from "$lib/stores"

export function setLanguage(data){
    if(data.lang === 'nl'){
        lang.set('nl')
    }else if(data.lang === 'pa'){
        lang.set('pa')
    }else{
        lang.set('en')
    }
}
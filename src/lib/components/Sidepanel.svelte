<script>
    import { datalaag, theme, area_id, areaSelection, themeOptions, lang } from "$lib/stores.js";
    import { t } from '$lib/i18n/translate.js';
    import { areas } from '$lib/noncomponents/areas.js';
    import { goto } from '$app/navigation';

    function handleClickTheme(event) {
        $theme = event.target.id 
        let selectedTheme = document.getElementsByClassName($theme)
        let prevTheme = document.querySelector('.active')
        let prevCaption= document.querySelector('.activecaption')
        if(prevTheme) {
            prevTheme.classList.remove('active');
            prevCaption.classList.remove('activecaption');
        }
        selectedTheme[0].classList.add('active');
        selectedTheme[1].classList.add('activecaption');
    }
    
    function handleClickArea(event) {
        $area_id = event.target.id;
        // Update the URL query param to ?area_id=newAreaId, preserving other params
        const params = new URLSearchParams(window.location.search);
        params.set('area_id', $area_id);
        goto(`${window.location.pathname}?${params.toString()}`);
    }

    let indicatorSentence = t('chooseIndicator');
    $: if($theme === 'slr'){
        indicatorSentence = ''}
    else{indicatorSentence = t('chooseIndicator')}

    let selectedIndex=0;
    $: if ($theme) {
        selectedIndex = 0;
    }

    // Compute a sorted list of area ids: current + switchableTo, alphabetically by name
    $: visibleAreas = $area_id && areas[$area_id]
        ? [$area_id, ...areas[$area_id].switchableTo].filter((v, i, arr) => arr.indexOf(v) === i).sort((a, b) => areas[a].name.localeCompare(areas[b].name))
        : [];

    console.log("Current theme:", $theme);
    console.log("themeOptions:", $themeOptions);
</script>

<section>
    <h2>{t('chooseTheme')}</h2>
    <div class="theme-row">
        <div class="item">
            <img class = 'themelogo heat active' id = 'heat' src="https://raw.githubusercontent.com/sophievanderhorst/data/main/hitte_carib.png" on:click={handleClickTheme}>
            <p class="caption heat activecaption">{areas[$area_id]?.titles?.[$lang]?.heat || ''}</p>
        </div>
        <div class="item">
            <img class = 'themelogo drought' id = 'drought' src="https://raw.githubusercontent.com/sophievanderhorst/data/main/droogte_carib.png" on:click={handleClickTheme}> 
            <p class="caption drought">{areas[$area_id]?.titles?.[$lang]?.drought || ''}</p>
        </div>
        <div class="item">
            <img class = 'themelogo wind' id = 'wind' src="https://raw.githubusercontent.com/sophievanderhorst/data/main/wind_carib.png" on:click={handleClickTheme}> 
            <p class="caption wind">{areas[$area_id]?.titles?.[$lang]?.wind || ''}</p>
        </div>
        <div class="item">
            <img class = 'themelogo slr' id = 'slr' src="https://raw.githubusercontent.com/sophievanderhorst/data/main/zst_carib.png" on:click={handleClickTheme}> 
            <p class="caption slr">{areas[$area_id]?.titles?.[$lang]?.slr || ''}</p>
        </div>
    </div>
    
    <h2>{indicatorSentence}</h2>
    {#each $themeOptions as option, i}
    <label class="keuzes">
      <input
        type="radio"
        name="laag"
        value={option.indicator}
        on:click={() => {
          selectedIndex = i;
          $datalaag = option;
        }}
        checked={i === selectedIndex}
      />
      {t(option.indicator)}
        <!-- {#if (option.season === 'dry' || option.season === 'wet') && areas[$area_id]?.seasonperiod?.[$lang]?.[option.season]}
          {' (' + areas[$area_id].seasonperiod[$lang][option.season] + ')'}
        {/if} -->
    </label>
  {/each}
    
    {#if $areaSelection}
        <h2 class='kieslocatie'>{t('chooseLocation')}</h2>
        <div class="country-row">
            {#each visibleAreas as areaId (areaId)}
                {#if areas[areaId]}
                    <div class="country-item">
                        <img class={'countrylogo ' + areaId + ($area_id === areaId ? ' activecountry' : '')} id={areaId} src={areas[areaId].logo} alt={areas[areaId].name} on:click={handleClickArea}>
                        <figcaption class={'countrycaption ' + areaId + ($area_id === areaId ? ' activecaption' : '')}>{areas[areaId].name}</figcaption>
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</section>

<style>
    .keuzes{
        margin-top:1vh;
        font-size: 2vh;
    }
    .theme-row {
        display: flex;
        flex-direction: row;
        gap: 1.5vw;
        margin-bottom: 2vh;
        width: 100%;
    }
    .caption{
        font-size:1.5vh;
        display: block;
    }
    div.item {
        vertical-align: top;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 20%;
        margin:0vw;
        margin-bottom: 3vh;
    }
    .kieslocatie{
        position: static;
        margin-top: 6vh;
        margin-bottom: 2vh;
        font-size: 2.3vh;
        text-align: left;
        width: 100%;
    }
    .themelogo{
        width:90%;
    }
    .country-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 2vw;
        margin-bottom: 2vh;
        width: 100%;
        max-width: 100%;
        margin-left: 0;
        margin-right: 0;
    }
    .country-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1 1 0;
        min-width: 0;
        max-width: none;
    }
    .countrylogo {
        width: 100%;
        height: auto;
        max-height: 14vh;
        min-height: 7vh;
        margin: 0 auto;
        object-fit: contain;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    }
    .countrylogo:not(.activecountry) {
        opacity: 0.3;
    }
    .countrycaption {
        font-size: 2.1vh;
        text-align: center;
        margin-top: 0.7vh;
        color: #222;
        background: none;
        font-weight: 400;
        letter-spacing: 0.01em;
        line-height: 1.2;
        max-width: 100%;
        overflow: visible;
        text-overflow: initial;
        white-space: normal;
        padding: 0 0.5vw;
        word-break: break-word;
    }
    .countrycaption.activecaption {
        font-weight: bold;
        color: #017676;
    }
    .themelogo:not(.active) {
        opacity: 0.3;
    }
    .caption:not(.activecaption) {
        opacity: 0;
    }
    h2{
	font-size: 2.3vh;
}
    /* Responsive: shrink icons and text on smaller screens, but keep row layout */
    @media (max-width: 800px) {
        .theme-row {
            gap: 0.8vw;
            align-items: flex-end;
        }
        div.item {
            width: 8vw;
            min-height: 70px;
            flex: 0 0 auto;
        }
        .themelogo {
            width: 6vw;
            max-width: 36px;
            min-width: 18px;
        }
        .caption {
            font-size: 1.1vh;
        }
    }
    @media (max-width: 500px) {
        .theme-row {
            gap: 0.5vw;
            align-items: flex-end;
        }
        div.item {
            width: 12vw;
            min-height: 50px;
            flex: 0 0 auto;
        }
        .themelogo {
            width: 8vw;
            max-width: 24px;
            min-width: 12px;
        }
        .caption {
            font-size: 0.9vh;
        }
    }
</style>
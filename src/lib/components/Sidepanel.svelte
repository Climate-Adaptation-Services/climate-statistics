<script>
    import { datalaag, theme, area_id, areaSelection, themeOptions, lang } from "$lib/stores.js";
    import { t } from '$lib/i18n/translate.js';
    import { areas } from '$lib/noncomponents/areas.js';
    import { goto } from '$app/navigation';
    import Explanation from './Explanation.svelte';

    const themeIds = ['heat', 'drought', 'wind', 'slr'];
    const themeIcons = {
        heat: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/hitte_carib.png',
        drought: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/droogte_carib.png',
        wind: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/wind_carib.png',
        slr: 'https://raw.githubusercontent.com/sophievanderhorst/data/main/zst_carib.png'
    };

    function handleClickTheme(event) {
        $theme = event.currentTarget.id;
    }

    let hoveredTheme = null;
    $: displayedTheme = hoveredTheme ?? $theme;
    $: activeThemeLabel = areas[$area_id]?.titles?.[$lang]?.[displayedTheme] || '';

    function handleClickArea(event) {
        $area_id = event.currentTarget.id;
        // Update the URL query param to ?area_id=newAreaId, preserving other params
        const params = new URLSearchParams(window.location.search);
        params.set('area_id', $area_id);
        goto(`${window.location.pathname}?${params.toString()}`);
    }

    const seasonLabelKey = {
        annual: 'seasonAnnual',
        dry: 'seasonDry',
        wet: 'seasonWet',
        transition: 'seasonTransition'
    };

    // Een 'indicator-groep' bundelt opties van dezelfde maatstaf over de seizoenen heen,
    // bv. temperatureAvg/Dry/Wet/Transition. hotDays staat los van de seasonal varianten.
    function getIndicatorGroup(option) {
        if (option.indicator === 'hotDays') return 'hotDays';
        return option.indicator.replace(/Dry$|Wet$|Transition$/, '');
    }

    $: indicatorGroups = [...new Set($themeOptions.map(getIndicatorGroup))];
    $: selectedGroup = $datalaag ? getIndicatorGroup($datalaag) : indicatorGroups[0];
    $: groupOptions = $themeOptions.filter(o => getIndicatorGroup(o) === selectedGroup);

    function selectGroup(group) {
        const opts = $themeOptions.filter(o => getIndicatorGroup(o) === group);
        $datalaag = opts.find(o => o.season === 'annual') ?? opts[0];
    }

    function selectSeasonOption(option) {
        $datalaag = option;
    }

    // Compute a sorted list of area ids: current + switchableTo, alphabetically by name
    $: visibleAreas = $area_id && areas[$area_id]
        ? [$area_id, ...areas[$area_id].switchableTo].filter((v, i, arr) => arr.indexOf(v) === i).sort((a, b) => areas[a].name.localeCompare(areas[b].name))
        : [];
</script>

<section>
    <div class="panel-section">
        <h2>{$t('chooseTheme')}</h2>
        <div class="theme-row">
            {#each themeIds as themeId}
                <button
                    class="theme-btn"
                    class:active={$theme === themeId}
                    class:hovered={hoveredTheme === themeId}
                    id={themeId}
                    type="button"
                    aria-label={areas[$area_id]?.titles?.[$lang]?.[themeId] || themeId}
                    aria-pressed={$theme === themeId}
                    on:click={handleClickTheme}
                    on:mouseenter={() => hoveredTheme = themeId}
                    on:mouseleave={() => hoveredTheme = null}
                    on:focus={() => hoveredTheme = themeId}
                    on:blur={() => hoveredTheme = null}
                >
                    <img class="themelogo" src={themeIcons[themeId]} alt="">
                </button>
            {/each}
        </div>
        <p class="active-theme-label">{activeThemeLabel}</p>
    </div>

    {#if $theme === 'slr'}
    <div class="panel-section panel-section--explanation">
        <Explanation/>
    </div>
    {:else}
        {#if indicatorGroups.length > 0}
        <div class="panel-section">
            <h2>{$t('chooseIndicator')}</h2>
            <div class="pill-group pill-group--stacked" role="radiogroup" aria-label={$t('chooseIndicator')}>
                {#each indicatorGroups as group}
                <button
                    type="button"
                    class="pill"
                    class:active={selectedGroup === group}
                    role="radio"
                    aria-checked={selectedGroup === group}
                    on:click={() => selectGroup(group)}
                >
                    {$t(group)}
                </button>
                {/each}
            </div>
        </div>
        {/if}

        {#if groupOptions.length > 1}
        <div class="panel-section">
            <h2>{$t('chooseSeason')}</h2>
            <div class="pill-group" role="radiogroup" aria-label={$t('chooseSeason')}>
                {#each groupOptions as option}
                <button
                    type="button"
                    class="pill"
                    class:active={$datalaag?.indicator === option.indicator}
                    role="radio"
                    aria-checked={$datalaag?.indicator === option.indicator}
                    on:click={() => selectSeasonOption(option)}
                >
                    {$t(seasonLabelKey[option.season] ?? option.indicator)}
                </button>
                {/each}
            </div>
        </div>
        {/if}
    {/if}

    {#if $areaSelection}
        <div class="panel-section">
        <h2>{$t('chooseLocation')}</h2>
        <div class="country-row">
            {#each visibleAreas as areaId (areaId)}
                {#if areas[areaId]}
                    <div class="country-item">
                        <button class="country-btn" id={areaId} type="button" aria-label={areas[areaId].localizedNames[$lang]} aria-pressed={$area_id === areaId} on:click={handleClickArea}>
                            <img class={'countrylogo ' + areaId + ($area_id === areaId ? ' activecountry' : '')} src={areas[areaId].logo} alt="">
                        </button>
                        <p class={'countrycaption ' + areaId + ($area_id === areaId ? ' activecaption' : '')}>{areas[areaId].localizedNames[$lang]}</p>
                    </div>
                {/if}
            {/each}
        </div>
        </div>
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }
    .panel-section {
        padding: var(--space-md) 0;
    }
    .panel-section + .panel-section {
        border-top: 1px solid var(--c-border);
    }
    .panel-section:first-of-type {
        padding-top: 0;
    }
    /* SLR heeft geen indicator/season-keuze; duw de uitleg naar onderen toe
       zodat hij visueel aansluit op de plek waar in andere thema's de
       location-picker zit. */
    .panel-section--explanation {
        margin-top: auto;
    }
    h2 {
        font-size: var(--fs-sm);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--c-primary, #216666);
        line-height: var(--lh-tight);
        margin: 0 0 var(--space-sm);
    }
    .pill-group {
        display: flex;
        flex-wrap: nowrap;
        gap: var(--space-xs);
    }
    .pill-group:not(.pill-group--stacked) .pill {
        flex: 1 1 auto;
        text-align: center;
        padding-left: var(--space-sm);
        padding-right: var(--space-sm);
    }
    .pill-group--stacked {
        flex-direction: column;
        align-items: flex-start;
    }
    .pill {
        all: unset;
        box-sizing: border-box;
        cursor: pointer;
        padding: 10px 16px;
        font-size: var(--fs-sm);
        line-height: 1.4;
        color: var(--c-primary-dark, #184145);
        background-color: var(--c-bg-soft, #f2f2f2);
        border: 1px solid transparent;
        border-radius: 999px;
        transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.05s ease;
        white-space: nowrap;
        user-select: none;
    }
    .pill:hover:not(.active) {
        background-color: var(--c-tint, #dcf2f4);
        color: var(--c-primary, #216666);
    }
    .pill:active {
        transform: scale(0.97);
    }
    .pill.active {
        background-color: var(--c-primary, #216666);
        color: #fff;
        font-weight: 600;
    }
    .pill:focus-visible {
        outline: 2px solid var(--c-primary-light, #11a6b5);
        outline-offset: 2px;
    }
    .theme-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-sm);
        width: 100%;
        /* Voorkomt dat iconen onnodig opzwellen als de sidepanel breed wordt
           (vooral op mobiel, waar de sidepanel volledige paginabreedte krijgt). */
        max-width: 360px;
        margin: 0 auto;
    }
    /* Op mobiel: compactere pills met natuurlijke breedte (tag-stijl).
       Wrappen naar nieuwe regel ipv uitrekken tot volle breedte, zodat het
       menu lichter oogt op een telefoon. De SLR-uitleg verbergen we hier,
       want die wordt op mobiel apart ONDER de chart getoond (zie +page.svelte). */
    @media (max-width: 768px) {
        .panel-section--explanation {
            display: none;
        }
        .pill {
            padding: 8px 14px;
        }
        .pill-group:not(.pill-group--stacked) {
            flex-wrap: wrap;
            gap: var(--space-sm);
        }
        .pill-group:not(.pill-group--stacked) .pill {
            flex: 0 0 auto;
        }
    }
    .theme-btn {
        all: unset;
        position: relative;
        cursor: pointer;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-bottom: 6px;
        transition: transform 0.15s ease;
    }
    .theme-btn.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 25%;
        right: 25%;
        height: 3px;
        background-color: var(--c-primary, #216666);
        border-radius: 2px;
    }
    .theme-btn.hovered:not(.active) {
        transform: scale(1.08);
    }
    .theme-btn:focus-visible {
        outline: 2px solid var(--c-primary-light, #11a6b5);
        outline-offset: 4px;
    }
    .themelogo {
        width: 90%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: contain;
        opacity: 0.35;
        transition: opacity 0.2s ease;
    }
    .theme-btn.active .themelogo {
        opacity: 1;
    }
    .theme-btn.hovered .themelogo {
        opacity: 0.85;
    }
    .theme-btn.active.hovered .themelogo {
        opacity: 1;
    }
    .active-theme-label {
        margin: var(--space-sm) 0 0;
        font-size: var(--fs-md);
        font-weight: 500;
        color: var(--c-primary, #216666);
        text-align: center;
        line-height: var(--lh-tight);
        /* Op breed scherm afkappen om layout stabiel te houden; op smal scherm
           liever wrappen dan een ellipsis tonen bij langere vertalingen (nl/es). */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    @media (max-width: 480px) {
        .active-theme-label {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
        }
        .panel-section {
            padding: var(--space-sm) 0;
        }
    }
    .country-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
        gap: var(--space-md);
        margin-bottom: var(--space-md);
        width: 100%;
        /* Cap zodat eilanden-iconen niet enorm worden als er weinig opties zijn
           en de sidepanel-breedte vrij groeit (mobiel, brede embed). */
        max-width: 360px;
        margin-left: auto;
        margin-right: auto;
    }
    .country-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* Individuele logo niet onnodig opzwellen bij weinig eilanden
           (anders rekt 1fr de track uit tot >150px). */
        max-width: 100px;
        margin-left: auto;
        margin-right: auto;
    }
    .country-btn {
        all: unset;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 44px;
        border-radius: 4px;
    }
    .country-btn:focus-visible {
        outline: 2px solid var(--c-accent);
        outline-offset: 2px;
    }
    .countrylogo {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: contain;
        transition: opacity 0.2s;
    }
    .countrylogo:not(.activecountry) {
        opacity: 0.3;
    }
    .countrycaption {
        font-size: var(--fs-sm);
        text-align: center;
        margin-top: var(--space-xs);
        color: #222;
        font-weight: 400;
        line-height: var(--lh-tight);
        max-width: 100%;
        word-break: break-word;
        padding: 0 var(--space-xs);
    }
    .countrycaption.activecaption {
        font-weight: bold;
        color: var(--c-primary, #216666);
    }
</style>

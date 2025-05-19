import { area_id, areaSelection } from "$lib/stores";
import { areas } from './areas';

export function setArea(id) {
    const config = areas[id] || areas['bq']; // fallback to Bonaire
    area_id.set(config.area_id);
    areaSelection.set(!!config.switchableTo.length);
}
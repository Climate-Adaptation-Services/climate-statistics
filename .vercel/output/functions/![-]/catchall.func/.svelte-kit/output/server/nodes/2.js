import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.CoJHr-nT.js","_app/immutable/chunks/GVrhSaqt.js","_app/immutable/chunks/CqhO7F-B.js","_app/immutable/chunks/DY3gy5mP.js","_app/immutable/chunks/3mjvpElm.js","_app/immutable/chunks/BJBPJR4a.js","_app/immutable/chunks/BZQSpWYH.js","_app/immutable/chunks/_aPIMBo3.js","_app/immutable/chunks/DmQ3o2_S.js"];
export const stylesheets = ["_app/immutable/assets/setLanguage.Cm2VLhlq.css","_app/immutable/assets/2.BAFJdg5u.css"];
export const fonts = [];

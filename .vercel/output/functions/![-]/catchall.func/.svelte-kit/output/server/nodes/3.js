import * as server from '../entries/pages/embed/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/embed/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/embed/+page.server.js";
export const imports = ["_app/immutable/nodes/3.A5OwGtFt.js","_app/immutable/chunks/GVrhSaqt.js","_app/immutable/chunks/CqhO7F-B.js","_app/immutable/chunks/DY3gy5mP.js","_app/immutable/chunks/BJBPJR4a.js","_app/immutable/chunks/BZQSpWYH.js","_app/immutable/chunks/_aPIMBo3.js","_app/immutable/chunks/3mjvpElm.js"];
export const stylesheets = ["_app/immutable/assets/setLanguage.Cm2VLhlq.css","_app/immutable/assets/3.B9Mw6T5g.css"];
export const fonts = [];

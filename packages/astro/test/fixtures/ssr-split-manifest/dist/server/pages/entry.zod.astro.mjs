import { c as createComponent, r as renderTemplate, d as renderHead, u as unescapeHTML } from '../chunks/astro/server_BGUClXuu.mjs';
import 'kleur/colors';
import 'clsx';
import { a as manifest$1, m as manifest$2 } from '../chunks/_@astrojs-manifest_DYZ-iYBT.mjs';
/* empty css                               */
import { renderers } from '../renderers.mjs';
import { s as serverEntrypointModule, c as createExports } from '../chunks/@my-ssr_C4X5So70.mjs';
import { onRequest } from '../_noop-middleware.mjs';

const $$Zod = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html data-astro-cid-6gvdco5k> <head><title>Testing</title>${renderHead()}</head> <body data-astro-cid-6gvdco5k> <h1 data-astro-cid-6gvdco5k>Testing</h1> <div id="assets" data-astro-cid-6gvdco5k>${unescapeHTML(JSON.stringify([...manifest$1.assets]))}</div> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/zod.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/zod.astro";
const $$url = "/zod";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Zod,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

const pageModule = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    page,
    renderers
}, Symbol.toStringTag, { value: 'Module' }));

const serverIslandMap = new Map();

const _manifest = Object.assign(manifest$2, {
    pageModule,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = undefined;
const _exports = createExports(_manifest);
const manifest = _exports['manifest'];
const createApp = _exports['createApp'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { createApp, manifest, pageModule };

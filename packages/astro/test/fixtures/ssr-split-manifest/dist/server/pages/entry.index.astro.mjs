import { c as createComponent, r as renderTemplate, d as renderHead, u as unescapeHTML } from '../chunks/astro/server_BGUClXuu.mjs';
import 'kleur/colors';
import 'clsx';
import { a as manifest$1, m as manifest$2 } from '../chunks/_@astrojs-manifest_DYZ-iYBT.mjs';
/* empty css                                 */
import { renderers } from '../renderers.mjs';
import { s as serverEntrypointModule, c as createExports } from '../chunks/@my-ssr_C4X5So70.mjs';
import { onRequest } from '../_noop-middleware.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html data-astro-cid-j7pv25f6> <head><title>Testing</title>${renderHead()}</head> <body data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Testing index</h1> <div id="assets" data-astro-cid-j7pv25f6>${unescapeHTML(JSON.stringify([...manifest$1.assets]))}</div> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
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

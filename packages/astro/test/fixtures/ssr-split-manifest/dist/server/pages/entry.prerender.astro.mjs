import { c as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_BGUClXuu.mjs';
import 'kleur/colors';
import 'clsx';
import { renderers } from '../renderers.mjs';
import { m as manifest$1 } from '../chunks/_@astrojs-manifest_DYZ-iYBT.mjs';
import { s as serverEntrypointModule, c as createExports } from '../chunks/@my-ssr_C4X5So70.mjs';
import { onRequest } from '../_noop-middleware.mjs';

const prerender = true;
const $$Prerender = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Pre render me</title>${renderHead()}</head> <body></body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/prerender.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/prerender.astro";
const $$url = "/prerender";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Prerender,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

const pageModule = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    page,
    renderers
}, Symbol.toStringTag, { value: 'Module' }));

const serverIslandMap = new Map();

const _manifest = Object.assign(manifest$1, {
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

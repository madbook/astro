import { c as createComponent, r as renderTemplate } from '../chunks/astro/server_BGUClXuu.mjs';
import 'kleur/colors';
import 'clsx';
import { renderers } from '../renderers.mjs';
import { m as manifest$1 } from '../chunks/_@astrojs-manifest_DYZ-iYBT.mjs';
import { s as serverEntrypointModule, c as createExports } from '../chunks/@my-ssr_C4X5So70.mjs';
import { onRequest } from '../_noop-middleware.mjs';

async function getStaticPaths() {
  return [
    {
      params: { page: 1 }
    },
    {
      params: { page: 2 }
    },
    {
      params: { page: 3 }
    }
  ];
}
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> </html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/[...post].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/[...post].astro";
const $$url = "/[...post]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    getStaticPaths,
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

import { c as createComponent, r as renderTemplate, d as renderHead, u as unescapeHTML } from '../chunks/astro/server_BGUClXuu.mjs';
import 'kleur/colors';
import 'clsx';
import { m as manifest } from '../chunks/_astro_ssr-manifest_mBA7KJAo.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html data-astro-cid-j7pv25f6> <head><title>Testing</title>${renderHead()}</head> <body data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Testing</h1> <div id="assets" data-astro-cid-j7pv25f6>${unescapeHTML(JSON.stringify([...manifest.assets]))}</div> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-manifest/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-manifest/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

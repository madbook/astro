import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CGS-6B1P.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> ${maybeRenderHead()}<body><h1>Expected http status of index page is 200</h1></body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-i18n-manual-routing/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-i18n-manual-routing/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

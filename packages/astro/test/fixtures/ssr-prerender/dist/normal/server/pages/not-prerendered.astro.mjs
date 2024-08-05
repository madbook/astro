import { c as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$NotPrerendered = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Not prerendered</title>${renderHead()}</head> <body> <h1 id="greeting">Hello world!</h1> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-prerender/src/pages/not-prerendered.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-prerender/src/pages/not-prerendered.astro";
const $$url = "/not-prerendered";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$NotPrerendered,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

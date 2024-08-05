import { c as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Clone = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>testing</h1> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/clone.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/clone.astro";
const $$url = "/clone";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Clone,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

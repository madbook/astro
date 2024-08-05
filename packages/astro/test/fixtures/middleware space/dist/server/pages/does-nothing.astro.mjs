import { c as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$DoesNothing = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <p>Not interested</p> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/does-nothing.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/does-nothing.astro";
const $$url = "/does-nothing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$DoesNothing,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

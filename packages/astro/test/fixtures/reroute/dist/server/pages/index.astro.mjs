import { c as createAstro, a as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_CKXxaXiN.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const auth = Astro2.locals.auth;
  return renderTemplate`<html> <head><title>Index</title>${renderHead()}</head> <body> <h1>Index</h1> ${auth ? renderTemplate`<p>Called auth</p>` : ""} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/reroute/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/reroute/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

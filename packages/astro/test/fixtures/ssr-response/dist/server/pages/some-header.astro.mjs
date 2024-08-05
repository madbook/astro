import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$SomeHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SomeHeader;
  Astro2.response.headers.set("One-Two", "three");
  Astro2.response.headers.set("Four-Five", "six");
  Astro2.response.headers.set("Cache-Control", `max-age=0, s-maxage=86400`);
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>Testing</h1> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-response/src/pages/some-header.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-response/src/pages/some-header.astro";
const $$url = "/some-header";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$SomeHeader,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

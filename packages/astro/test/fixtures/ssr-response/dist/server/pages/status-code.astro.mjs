import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$StatusCode = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StatusCode;
  Astro2.response.status = 404;
  Astro2.response.statusText = "Oops";
  Astro2.response.headers.set("One-Two", "three");
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>Testing</h1> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-response/src/pages/status-code.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-response/src/pages/status-code.astro";
const $$url = "/status-code";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$StatusCode,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const address = Astro2.clientAddress;
  return renderTemplate`<html> <head><title>Astro.clientAddress</title>${renderHead()}</head> <body> <h1>Astro.clientAddress</h1> <div id="address">${address}</div> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/client-address-node/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/client-address-node/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

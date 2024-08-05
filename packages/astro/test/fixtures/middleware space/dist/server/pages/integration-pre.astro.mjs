import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$IntegrationPre = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$IntegrationPre;
  const data = Astro2.locals;
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <p>${data?.name}</p> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/integration-pre.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/integration-pre.astro";
const $$url = "/integration-pre";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$IntegrationPre,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

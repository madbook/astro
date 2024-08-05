import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_CfXSy8X9.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body></body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-manual-with-default-middleware/src/pages/about.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-manual-with-default-middleware/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

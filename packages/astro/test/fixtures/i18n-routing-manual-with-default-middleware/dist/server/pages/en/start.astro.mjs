import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../../chunks/astro/server_CfXSy8X9.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getRelativeLocaleUrl } from '../../chunks/i18n_DoZwix1M.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Start = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Start;
  const customUrl = getRelativeLocaleUrl("en", "/blog/title");
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Hello <p>${customUrl}</p> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-manual-with-default-middleware/src/pages/en/start.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-manual-with-default-middleware/src/pages/en/start.astro";
const $$url = "/en/start";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Start,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../../chunks/astro/server_D9VqKTtf.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Start = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Start;
  const currentLocale = Astro2.currentLocale;
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Espanol
Current Locale: ${currentLocale ? currentLocale : "none"} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-prefix-other-locales/src/pages/spanish/start.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-prefix-other-locales/src/pages/spanish/start.astro";
const $$url = "/new-site/spanish/start";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Start,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

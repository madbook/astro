import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_ClcBF270.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$PreferredLocale = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PreferredLocale;
  const locale = Astro2.preferredLocale;
  const localeList = Astro2.preferredLocaleList;
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Locale: ${locale ? locale : "none"}
Locale list: ${localeList.length > 0 ? localeList.join(", ") : "empty"} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing/src/pages/preferred-locale.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing/src/pages/preferred-locale.astro";
const $$url = "/preferred-locale";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$PreferredLocale,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

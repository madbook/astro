import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../../chunks/astro/server_ClcBF270.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return [
    { params: { lang: void 0 } },
    { params: { lang: "es" } }
  ];
}
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const currentLocale = Astro2.currentLocale;
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Current Locale: ${currentLocale ? currentLocale : "none"} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing/src/pages/blog/[...lang]/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing/src/pages/blog/[...lang]/index.astro";
const $$url = "/blog/[...lang]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

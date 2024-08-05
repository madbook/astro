import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../../chunks/astro/server_ClcBF270.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
function getStaticPaths() {
  return [
    { params: { id: "lorem" } }
  ];
}
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const currentLocale = Astro2.currentLocale;
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Current Locale: ${currentLocale ? currentLocale : "none"} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing/src/pages/dynamic/[id].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing/src/pages/dynamic/[id].astro";
const $$url = "/dynamic/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

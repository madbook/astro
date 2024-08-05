import { c as createAstro, a as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_D-3XxFAG.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Hello
</body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-subdomain/src/pages/en/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-subdomain/src/pages/en/index.astro";
const $$url = "/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

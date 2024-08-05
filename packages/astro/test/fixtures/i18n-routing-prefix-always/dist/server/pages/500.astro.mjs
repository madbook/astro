import { c as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_D9VqKTtf.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$500 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Error</title>${renderHead()}</head> <body>Unexpected error.</body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-prefix-always/src/pages/500.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-prefix-always/src/pages/500.astro";
const $$url = "/new-site/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$500,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

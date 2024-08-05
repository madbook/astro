import { c as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_D9VqKTtf.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Not Found</title>${renderHead()}</head> <body>Can't find the page you're looking for.</body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-prefix-always/src/pages/404.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-prefix-always/src/pages/404.astro";
const $$url = "/new-site/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$404,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

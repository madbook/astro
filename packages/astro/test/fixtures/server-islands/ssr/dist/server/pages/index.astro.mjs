import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent } from '../chunks/astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import $$Island from '../chunks/Island_BiXlBQHf.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>Testing</h1> ${renderComponent($$result, "Island", $$Island, { "server:defer": true, "server:component-directive": "defer", "server:component-path": "/Users/matt/src/astro/packages/astro/test/fixtures/server-islands/ssr/src/components/Island.astro", "server:component-export": "default" })} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/server-islands/ssr/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/server-islands/ssr/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

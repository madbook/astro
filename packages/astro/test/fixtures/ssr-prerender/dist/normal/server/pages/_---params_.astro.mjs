import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div> <p>Rest route. Should not give 404</p> </div>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-prerender/src/pages/[...params].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-prerender/src/pages/[...params].astro";
const $$url = "/[...params]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

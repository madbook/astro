import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent } from '../chunks/astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import { $ as $$Aside } from '../chunks/aside_Cen3MCuZ.mjs';
import { $ as $$Page } from '../chunks/page_BJ1gFdvb.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>minimum html</title>${renderHead()}</head> <body data-astro-cid-j7pv25f6> ${renderComponent($$result, "Aside", $$Aside, { "data-astro-cid-j7pv25f6": true })} <main data-astro-cid-j7pv25f6></main> ${renderComponent($$result, "Page", $$Page, { "data-astro-cid-j7pv25f6": true })} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/minification-html/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/minification-html/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

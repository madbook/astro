import { createComponent, renderTemplate, renderHead, renderComponent } from '../chunks/1722887120136/astro/server.mjs';
import 'kleur/colors';
import 'html-escaper';
import { getEntryBySlug } from '../content/entry.mjs';
export { renderers } from '../renderers.mjs';
import 'clsx';
import 'cssesc';

const $$Docs = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntryBySlug("docs", "one");
  const { Content } = await entry.render();
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>It's content time!</title>${renderHead()}</head> <body> <main> ${renderComponent($$result, "Content", Content, {})} </main> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/pages/docs.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/pages/docs.astro";
const $$url = "/docs/docs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Docs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

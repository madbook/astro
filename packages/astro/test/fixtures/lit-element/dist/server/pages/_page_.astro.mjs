import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent, b as createAstro } from '../chunks/astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import { M as MyElement } from '../chunks/my-element_j6_jYFAN.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return [
    {
      params: { page: 1 }
    },
    {
      params: { page: 2 }
    },
    {
      params: { page: 3 }
    }
  ];
}
const $$page = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { page } = Astro2.params;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Posts Page ${page}</title>${renderHead()}</head> <body> <h1>Welcome to page ${page}</h1> ${renderComponent($$result, "MyElement", MyElement, {})} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/lit-element/src/pages/[page].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/lit-element/src/pages/[page].astro";
const $$url = "/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$page,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

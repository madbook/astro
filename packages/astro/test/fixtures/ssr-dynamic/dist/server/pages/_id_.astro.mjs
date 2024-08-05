import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const val = Number(Astro2.params.id);
  return renderTemplate`<html data-astro-cid-p5zaeqd4> <head><title>Test app</title>${renderHead()}</head> <body data-astro-cid-p5zaeqd4> <h1 data-astro-cid-p5zaeqd4>Item ${val}</h1> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-dynamic/src/pages/[id].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-dynamic/src/pages/[id].astro";
const $$url = "/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createAstro, a as createComponent, r as renderTemplate, d as renderHead } from '../../chunks/astro/server_CKXxaXiN.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$Title = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Title;
  const { slug } = Astro2.params;
  console.log("is it here???", Astro2.params);
  return renderTemplate`<html> <head><title>Title</title>${renderHead()}</head> <body> <h1>Title</h1> <p>${slug}</p> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-server/src/pages/[slug]/title.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-server/src/pages/[slug]/title.astro";
const $$url = "/[slug]/title";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Title,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../../chunks/astro/server_B9zshp2I.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$category = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const { category } = Astro2.params;
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>Testing</h1> <h2 class="category">${category}</h2> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-params/src/pages/\u6771\u897F/[category].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-params/src/pages/東西/[category].astro";
const $$url = "/users/houston/東西/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$category,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../../chunks/astro/server_CsAfi0iD.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Blog start
</body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-manual/src/pages/en/blog/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-manual/src/pages/en/blog/index.astro";
const $$url = "/en/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

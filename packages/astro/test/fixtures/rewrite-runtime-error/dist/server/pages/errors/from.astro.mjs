import { c as createAstro, a as createComponent } from '../../chunks/astro/server_fkNzYi9O.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$From = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$From;
  return Astro2.rewrite("/errors/to");
}, "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-runtime-error/src/pages/errors/from.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-runtime-error/src/pages/errors/from.astro";
const $$url = "/errors/from";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$From,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

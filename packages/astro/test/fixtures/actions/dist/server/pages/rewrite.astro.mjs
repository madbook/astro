import { c as createComponent, b as createAstro } from '../chunks/astro/server_BmWOtwPc.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Rewrite = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Rewrite;
  return Astro2.rewrite("/subscribe");
}, "/Users/matt/src/astro/packages/astro/test/fixtures/actions/src/pages/rewrite.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/actions/src/pages/rewrite.astro";
const $$url = "/rewrite";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Rewrite,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

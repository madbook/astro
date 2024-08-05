import { c as createComponent, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$From = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$From;
  Astro2.cookies.set("another", "set-in-from");
  Astro2.cookies.set("set-in-from", "yes");
  return Astro2.rewrite("/rewrite-target");
}, "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/from.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/from.astro";
const $$url = "/from";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$From,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

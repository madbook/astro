import { c as createComponent, r as renderTemplate } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Broken500 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/broken-500.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/broken-500.astro";
const $$url = "/broken-500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Broken500,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

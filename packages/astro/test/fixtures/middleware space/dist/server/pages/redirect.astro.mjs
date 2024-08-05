import { c as createComponent, r as renderTemplate } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Redirect = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/redirect.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/redirect.astro";
const $$url = "/redirect";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Redirect,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent } from '../chunks/astro/server_JKQeSUJ7.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$CausesError = createComponent(($$result, $$props, $$slots) => {
  throw new Error(`oops`);
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/pages/causes-error.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/pages/causes-error.astro";
const $$url = "/causes-error/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$CausesError,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

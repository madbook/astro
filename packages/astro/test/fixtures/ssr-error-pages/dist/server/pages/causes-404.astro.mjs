import { c as createComponent } from '../chunks/astro/server_JKQeSUJ7.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Causes404 = createComponent(($$result, $$props, $$slots) => {
  return new Response(null, {
    status: 404,
    statusText: "Not found"
  });
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/pages/causes-404.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/pages/causes-404.astro";
const $$url = "/causes-404/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Causes404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

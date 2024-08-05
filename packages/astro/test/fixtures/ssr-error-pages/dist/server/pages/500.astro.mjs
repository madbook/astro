import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_JKQeSUJ7.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$500 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1>This is an error page</h1>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/pages/500.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/pages/500.astro";
const $$url = "/500/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$500,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_JKQeSUJ7.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1>Something went horribly wrong!</h1>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/pages/404.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/pages/404.astro";
const $$url = "/404/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

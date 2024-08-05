import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Test = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1>Index</h1>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-dynamic/.astro/test.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-dynamic/.astro/test.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Test,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

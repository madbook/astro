import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro } from '../chunks/astro/server_CGS-6B1P.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  const { foo } = Astro2.locals;
  return renderTemplate`${maybeRenderHead()}<h1 id="foo">${foo}</h1>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-locals/src/pages/500.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-locals/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$500,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

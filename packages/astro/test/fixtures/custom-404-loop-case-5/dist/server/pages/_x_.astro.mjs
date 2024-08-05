import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_fkNzYi9O.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("http://example.com");
const $$x = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$x;
  Astro2.response.status = 404;
  return renderTemplate`${maybeRenderHead()}<p>four oh four route</p>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/custom-404-loop-case-5/src/pages/[x].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/custom-404-loop-case-5/src/pages/[x].astro";
const $$url = "/[x]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$x,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

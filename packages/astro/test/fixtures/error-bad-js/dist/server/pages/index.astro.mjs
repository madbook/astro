import { c as createComponent, r as renderTemplate, a as addAttribute, d as renderHead, b as createAstro } from '../chunks/astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

var foo = bar;

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head> <body> <h1>Astro</h1> <p>${foo}</p> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/error-bad-js/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/error-bad-js/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent, r as renderTemplate, a as addAttribute, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$RewriteTarget = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RewriteTarget;
  Astro2.cookies.set("my_cookie", "value");
  Astro2.cookies.set("another", "set-in-target");
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Page 2</title>${renderHead()}</head> <body> <h1>Page 2</h1> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/rewrite-target.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/rewrite-target.astro";
const $$url = "/rewrite-target";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$RewriteTarget,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

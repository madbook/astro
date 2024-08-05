import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, d as renderHead, e as renderComponent, b as createAstro } from '../chunks/astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

function other() {
	return somethingNotExists();
}

const $$Other = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div> ${other()} </div>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/error-bad-js/src/components/Other.astro", void 0);

const $$Astro = createAstro();
const $$InStream = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$InStream;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head> <body> <h1>Astro</h1> ${renderComponent($$result, "Other", $$Other, {})} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/error-bad-js/src/pages/in-stream.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/error-bad-js/src/pages/in-stream.astro";
const $$url = "/in-stream";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$InStream,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

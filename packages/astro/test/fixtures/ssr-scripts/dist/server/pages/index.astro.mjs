import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent, b as createAstro } from '../chunks/astro/server_BydQx7MM.mjs';
import 'kleur/colors';
import { jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

function Hello() {
  return jsx("div", {
    children: "Hello world"
  });
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><title>Astro</title>${renderHead()}</head> <body> ${renderComponent($$result, "Hello", Hello, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-scripts/src/components/Hello.jsx", "client:component-export": "default" })} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-scripts/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-scripts/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

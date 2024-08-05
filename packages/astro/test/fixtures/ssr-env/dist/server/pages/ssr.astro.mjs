import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent } from '../chunks/astro/server_BydQx7MM.mjs';
import 'kleur/colors';
import { jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

function Env() {
  const ssr = true;
  return jsx("div", {
    id: "ssr",
    children: "" + ssr
  });
}

const $$Ssr = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Test</title>${renderHead()}</head> <body> ${renderComponent($$result, "Env", Env, {})} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-env/src/pages/ssr.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-env/src/pages/ssr.astro";
const $$url = "/ssr";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Ssr,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

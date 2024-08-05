import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent } from '../chunks/astro/server_BydQx7MM.mjs';
import 'kleur/colors';
import { jsx } from 'preact/jsx-runtime';
export { renderers } from '../renderers.mjs';

function SomeComponent() {
  return jsx("div", {
    children: "Testing"
  });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> ${renderComponent($$result, "SomeComponent", SomeComponent, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/matt/src/astro/packages/astro/test/fixtures/before-hydration/src/components/SomeComponent", "client:component-export": "default" })} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/before-hydration/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/before-hydration/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

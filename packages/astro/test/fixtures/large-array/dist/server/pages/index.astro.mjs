import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent } from '../chunks/astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import { ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal } from 'solid-js';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var _tmpl$ = ["<div", ' class="counter"><button>-</button><pre>', "</pre><button>+</button></div>"], _tmpl$2 = ["<div", ' class="counter-message">', "</div>"];
function Counter({
  children,
  largeProp
}) {
  const [count, setCount] = createSignal(0);
  return [ssr(_tmpl$, ssrHydrationKey(), escape(count())), ssr(_tmpl$2, ssrHydrationKey(), escape(children))];
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const largeArray = [];
  for (let i = 0; i < 600; i++) {
    largeArray.push({ a: "abc", b: "abc", c: "abc", d: "abc", e: "abc", foo: "bar" });
  }
  return renderTemplate`<html data-astro-cid-j7pv25f6> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="/favicon.ico">${renderHead()}</head> <body data-astro-cid-j7pv25f6> <main data-astro-cid-j7pv25f6> ${renderComponent($$result, "Counter", Counter, { "client:visible": true, "largeProp": largeArray, "client:component-hydration": "visible", "client:component-path": "/Users/matt/src/astro/packages/astro/test/fixtures/large-array/src/components/Counter.jsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` <h1 data-astro-cid-j7pv25f6>Hello, Solid!</h1> ` })} </main> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/large-array/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/large-array/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

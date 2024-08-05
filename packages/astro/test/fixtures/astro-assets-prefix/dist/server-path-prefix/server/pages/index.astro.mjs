import { c as createComponent, d as renderTemplate, g as renderHead, f as addAttribute, e as renderComponent } from '../chunks/astro/server_Dl9amrz7.mjs';
import 'kleur/colors';
import { $ as $$Image } from '../chunks/_astro_assets_BoGE1mxH.mjs';
import { p as p1Image } from '../chunks/penguin1_Bif6jDMR.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function Counter() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      "Count: ",
      count
    ] }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCount(count + 1), children: "Increment" })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-j7pv25f6> <head><title>Assets Prefix</title>${renderHead()}</head> <body data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>I am red</h1> <img id="image-asset"${addAttribute(p1Image.src, "src")}${addAttribute(p1Image.width, "width")}${addAttribute(p1Image.height, "height")} alt="penguin" data-astro-cid-j7pv25f6> ${renderComponent($$result, "Image", $$Image, { "src": p1Image, "alt": "penguin", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result, "Counter", Counter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/components/Counter.jsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} <p id="assets-prefix-env" data-astro-cid-j7pv25f6>${"/starting-slash" }</p>  </body> </html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/pages/index.astro", void 0);
const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/pages/index.astro";
const $$url = "/custom-base";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

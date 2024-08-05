import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent } from '../chunks/astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import { M as MyElement } from '../chunks/my-element_j6_jYFAN.mjs';
export { renderers } from '../renderers.mjs';

const $$Slots = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>LitElement | Slot</title>${renderHead()}</head> <body> ${renderComponent($$result, "MyElement", MyElement, { "id": "root" }, { "default": ($$result2) => renderTemplate` <div class="default">my-element default 1</div> <div class="default">my-element default 2</div>     `, "named": ($$result2) => renderTemplate`<h1>my-element named 1</h1><h2>my-element named 2</h2><ul id="list"> <li>Custom elements</li> <li>Shadow DOM</li> <li>HTML templates</li> </ul>${renderComponent($$result2, "my-element", "my-element", { "id": "slotted", "slot": "named" }, { "default": () => renderTemplate` <h3 class="default">slotted my-element default</h3> <div slot="named">slotted my-element named 1</div> <div slot="named">slotted my-element named 2</div> ${renderComponent($$result2, "MyElement", MyElement, { "id": "slotted-slotted", "slot": "named" }, { "default": ($$result3) => renderTemplate` <h4 class="default">slotted slotted my-element default 1</h4> <h5 class="default">slotted slotted my-element default 2</h5>   `, "named": ($$result3) => renderTemplate`<div>slotted slotted my-element named 1</div><div>slotted slotted my-element named 2</div>` })} ` })}` })} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/lit-element/src/pages/slots.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/lit-element/src/pages/slots.astro";
const $$url = "/slots";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Slots,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

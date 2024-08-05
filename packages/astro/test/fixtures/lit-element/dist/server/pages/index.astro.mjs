import { c as createComponent, r as renderTemplate, d as renderHead, e as renderComponent } from '../chunks/astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import { M as MyElement } from '../chunks/my-element_j6_jYFAN.mjs';
import '@lit/reactive-element';
import 'lit-html';
import { LitElement, html } from 'lit-element/lit-element.js';
import 'lit-html/is-server.js';
import { property, customElement } from 'lit/decorators.js';
export { renderers } from '../renderers.mjs';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let NonDeferredCounter = class extends LitElement {
  constructor() {
    super(...arguments);
    this.count = 0;
  }
  increment() {
    this.count++;
  }
  render() {
    return html`
			<div>
				<p>Count: ${this.count}</p>

				<button type="button" @click=${this.increment}>Increment</button>
			</div>
		`;
  }
};
__decorateClass([
  property({ type: Number, reflect: true })
], NonDeferredCounter.prototype, "count", 2);
NonDeferredCounter = __decorateClass([
  customElement("non-deferred-counter")
], NonDeferredCounter);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>LitElements</title>${renderHead()}</head> <body> ${renderComponent($$result, "MyElement", MyElement, { "id": "default", "foo": "bar", "str-attr": "initialized", "bool": false, "obj": { data: 1 }, "reflectedStrProp": "initialized reflected" })} ${renderComponent($$result, "NonDeferredCounter", NonDeferredCounter, { "id": "non-deferred", "count": 10, "foo": "bar" })} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/lit-element/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/lit-element/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

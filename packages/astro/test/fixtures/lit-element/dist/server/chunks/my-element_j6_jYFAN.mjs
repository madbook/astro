import '@lit/reactive-element';
import 'lit-html';
import { LitElement, html } from 'lit-element/lit-element.js';
import 'lit-html/is-server.js';
import { property, customElement } from 'lit/decorators.js';

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
let MyElement = class extends LitElement {
  constructor() {
    super();
    this.bool = 0;
    this.bool = true;
    this.str = "not initialized";
    this.obj = { data: null };
    this.foo = "not initialized";
    this.reflectedBool = true;
    this.reflectedStr = "default reflected string";
  }
  render() {
    return html`
      <div>Testing...</div>
      <div id="bool">${this.bool ? "A" : "B"}</div>
      <div id="str">${this.str}</div>
      <div id="data">data: ${this.obj.data}</div>

			<!-- Slots -->
			<div id="default"><slot /></div>
			<div id="named"><slot name="named" /></div>
    `;
  }
};
MyElement.properties = {
  str: { type: String, attribute: "str-attr" },
  obj: { type: Object },
  reflectedBool: { type: Boolean, reflect: true },
  reflectedStr: { type: String, reflect: true, attribute: "reflected-str" },
  reflectedStrProp: { type: String, reflect: true, attribute: "reflected-str-prop" }
};
__decorateClass([
  property({ type: Boolean })
], MyElement.prototype, "bool", 2);
MyElement = __decorateClass([
  customElement("my-element")
], MyElement);

export { MyElement as M };

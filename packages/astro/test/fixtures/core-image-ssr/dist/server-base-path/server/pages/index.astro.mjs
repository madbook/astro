import { c as createComponent, r as renderTemplate, a as renderHead, b as renderComponent } from '../chunks/astro/server_C3yanuqD.mjs';
import 'kleur/colors';
import { $ as $$Image } from '../chunks/_astro_assets_DyxEsJRW.mjs';
export { renderers } from '../renderers.mjs';

const myImage = new Proxy({"src":"/blog/_astro/penguin1.wSAOfMN3.jpg","width":207,"height":243,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/matt/src/astro/packages/astro/test/fixtures/core-image-ssr/src/assets/penguin1.jpg";
							}
							
							return target[name];
						}
					});

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head>${renderHead()}</head> <body> <div id="local"> ${renderComponent($$result, "Image", $$Image, { "src": myImage, "alt": "a penguin" })} </div> <div id="remote"> ${renderComponent($$result, "Image", $$Image, { "src": "https://avatars.githubusercontent.com/u/622227?s=64", "alt": "fred", "width": "48", "height": "48" })} </div> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/core-image-ssr/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/core-image-ssr/src/pages/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

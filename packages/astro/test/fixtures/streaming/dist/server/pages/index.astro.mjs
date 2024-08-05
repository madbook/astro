import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, u as unescapeHTML, F as Fragment, m as maybeRenderHead, f as renderHead } from '../chunks/astro/server_BiHUW3TY.mjs';
import 'kleur/colors';
import 'clsx';
import { w as wait } from '../chunks/wait_DSw-mFRq.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$AsyncEach = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AsyncEach;
  const { iterable } = Astro2.props;
  return renderTemplate`${async function* () {
    for await (const value of iterable) {
      let html = await Astro2.slots.render("default", [value]);
      yield renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(html)}` })}`;
      yield "\n";
    }
  }()}`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/components/AsyncEach.astro", void 0);

const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  await wait(10);
  return renderTemplate`${maybeRenderHead()}<header> <h1>My Site</h1> </header>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/components/Header.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  async function* list() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (const num of nums) {
      await wait(15);
      yield num;
    }
  }
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>Title</h1> <section> ${renderComponent($$result, "Header", $$Header, {})} </section> <div id="promise">${Promise.resolve(12)}</div> <ul> ${renderComponent($$result, "AsyncEach", $$AsyncEach, { "iterable": list() }, { "default": ($$result2) => renderTemplate`${(num) => renderTemplate`<li>Number: ${num}</li>`}` })} </ul> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

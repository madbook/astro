import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderSlot, b as createAstro, f as renderHead, d as renderComponent } from '../chunks/astro/server_BiHUW3TY.mjs';
import 'kleur/colors';
import 'clsx';
import { w as wait } from '../chunks/wait_DSw-mFRq.mjs';
export { renderers } from '../renderers.mjs';

const $$BareComponent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/components/BareComponent.astro", void 0);

const $$Astro = createAstro();
const $$Wait = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Wait;
  const { ms } = Astro2.props;
  await wait(ms);
  return renderTemplate`${renderSlot($$result, $$slots["default"], renderTemplate``)}`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/components/Wait.astro", void 0);

const $$Slot = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>Testing</h1> ${renderComponent($$result, "BareComponent", $$BareComponent, {}, { "default": ($$result2) => renderTemplate` <h1>Section title</h1> ${renderComponent($$result2, "Wait", $$Wait, { "ms": 50 }, { "default": ($$result3) => renderTemplate` <p>Section content</p> ` })} <h2>Next section</h2> ${renderComponent($$result2, "Wait", $$Wait, { "ms": 100 }, { "default": ($$result3) => renderTemplate` <p>Section content</p> ` })} <p>Paragraph 3</p> ` })} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/pages/slot.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/pages/slot.astro";
const $$url = "/slot";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Slot,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

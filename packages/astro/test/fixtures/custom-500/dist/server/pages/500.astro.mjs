import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  const { error } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><title>Server error - Custom 500</title>${renderHead()}</head> <body> <h1>Server error</h1> <p>${error}</p> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/custom-500/src/pages/500.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/custom-500/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$500,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

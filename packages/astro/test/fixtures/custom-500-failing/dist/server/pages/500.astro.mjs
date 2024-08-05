import { c as createComponent, b as createAstro } from '../chunks/astro/server_CGS-6B1P.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  Astro2.props;
  throw "custom 500 fail";
}, "/Users/matt/src/astro/packages/astro/test/fixtures/custom-500-failing/src/pages/500.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/custom-500-failing/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$500,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

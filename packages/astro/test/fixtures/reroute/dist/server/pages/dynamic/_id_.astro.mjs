import { c as createAstro, a as createComponent } from '../../chunks/astro/server_CKXxaXiN.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
function getStaticPaths() {
  return [
    { params: { id: "hello" } }
  ];
}
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  return Astro2.rewrite("/");
}, "/Users/matt/src/astro/packages/astro/test/fixtures/reroute/src/pages/dynamic/[id].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/reroute/src/pages/dynamic/[id].astro";
const $$url = "/dynamic/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

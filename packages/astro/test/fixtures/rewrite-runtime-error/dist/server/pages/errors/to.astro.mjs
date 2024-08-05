import { a as createComponent } from '../../chunks/astro/server_fkNzYi9O.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$To = createComponent(($$result, $$props, $$slots) => {
  throw new Error("Custom error");
}, "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-runtime-error/src/pages/errors/to.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-runtime-error/src/pages/errors/to.astro";
const $$url = "/errors/to";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$To,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

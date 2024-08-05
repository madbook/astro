import { c as createComponent } from '../chunks/astro/server_CGS-6B1P.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$GoToErrorPage = createComponent(($$result, $$props, $$slots) => {
  throw new Error();
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-locals/src/pages/go-to-error-page.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-locals/src/pages/go-to-error-page.astro";
const $$url = "/go-to-error-page";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$GoToErrorPage,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

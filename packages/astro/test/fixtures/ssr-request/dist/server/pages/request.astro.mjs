import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_OmPQvS0L.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Request = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Request;
  const origin = Astro2.url.origin;
  const requestPathname = new URL(Astro2.request.url).pathname;
  const pathname = Astro2.url.pathname;
  return renderTemplate`<html data-astro-cid-p7hsejmp> <head><title>Testing</title>${renderHead()}</head> <body data-astro-cid-p7hsejmp> <p id="origin" data-astro-cid-p7hsejmp>${origin}</p> <p id="pathname" data-astro-cid-p7hsejmp>${pathname}</p> <p id="request-pathname" data-astro-cid-p7hsejmp>${requestPathname}</p> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-request/src/pages/request.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-request/src/pages/request.astro";
const $$url = "/subpath/request";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Request,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

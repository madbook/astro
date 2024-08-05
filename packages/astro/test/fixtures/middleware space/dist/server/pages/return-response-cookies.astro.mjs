import { c as createComponent, r as renderTemplate, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ReturnResponseCookies = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReturnResponseCookies;
  Astro2.cookies.set("astro", "cookie", {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    maxAge: 1704085200
  });
  return renderTemplate``;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/return-response-cookies.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/middleware space/src/pages/return-response-cookies.astro";
const $$url = "/return-response-cookies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ReturnResponseCookies,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

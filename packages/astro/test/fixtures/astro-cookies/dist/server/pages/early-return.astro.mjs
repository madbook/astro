import { c as createComponent, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$EarlyReturn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EarlyReturn;
  const mode = Astro2.cookies.get("prefs").json().mode;
  Astro2.cookies.set("prefs", {
    mode: mode === "light" ? "dark" : "light"
  });
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/prefs"
    }
  });
}, "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/early-return.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/early-return.astro";
const $$url = "/early-return";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$EarlyReturn,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

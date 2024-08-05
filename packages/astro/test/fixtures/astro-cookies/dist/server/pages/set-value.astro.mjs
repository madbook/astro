import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$SetValue = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SetValue;
  if (Astro2.request.method === "POST") {
    Astro2.cookies.set("admin", "true", {
      expires: /* @__PURE__ */ new Date()
    });
  }
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>Testing</h1> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/set-value.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/set-value.astro";
const $$url = "/set-value";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$SetValue,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

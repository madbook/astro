import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_05liQ-hW.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$GetJson = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GetJson;
  const cookie = Astro2.cookies.get("prefs");
  const prefs = cookie.json();
  return renderTemplate`<html> <head><title>Testing</title>${renderHead()}</head> <body> <h1>Testing</h1> <h2>Preferences</h2> <dl> <dt>Dark/light mode</dt> <dd>${prefs.mode}</dd> </dl> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/get-json.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/astro-cookies/src/pages/get-json.astro";
const $$url = "/get-json";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$GetJson,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

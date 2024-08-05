import { c as createAstro, a as createComponent, r as renderTemplate, d as renderHead } from '../chunks/astro/server_D-3XxFAG.mjs';
import 'kleur/colors';
import 'clsx';
import { t as toRoutingStrategy, g as getLocaleAbsoluteUrl } from '../chunks/utils_CNBsuyKX.mjs';
export { renderers } from '../renderers.mjs';

var define_ASTRO_INTERNAL_I18N_CONFIG_default = { base: "/", format: "directory", site: "https://example.com", trailingSlash: "never", i18n: { defaultLocale: "en", locales: ["en", "pt", "it"], domains: { pt: "https://example.pt", it: "http://it.example.com" }, routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false } }, isBuild: true };
const { trailingSlash, format, site, i18n, isBuild } = (
  // @ts-expect-error
  define_ASTRO_INTERNAL_I18N_CONFIG_default
);
const { defaultLocale, locales, domains, fallback, routing } = i18n;
const base = "/";
let strategy = toRoutingStrategy(routing, domains);
const getAbsoluteLocaleUrl = (locale, path, options) => getLocaleAbsoluteUrl({
  locale,
  path,
  base,
  trailingSlash,
  format,
  site,
  defaultLocale,
  locales,
  strategy,
  domains,
  isBuild,
  ...options
});
if (i18n?.routing === "manual") ;
if (i18n?.routing === "manual") ;
if (i18n?.routing === "manual") ;
if (i18n?.routing === "manual") ;
if (i18n?.routing === "manual") ;

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let absoluteLocaleUrl_pt = getAbsoluteLocaleUrl("pt", "about");
  let absoluteLocaleUrl_it = getAbsoluteLocaleUrl("it");
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Virtual module doesn't break
		
		Absolute URL pt: ${absoluteLocaleUrl_pt}
Absolute URL it: ${absoluteLocaleUrl_it} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-subdomain/src/pages/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-subdomain/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

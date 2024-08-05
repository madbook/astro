import { c as createComponent, r as renderTemplate, d as renderHead, b as createAstro } from '../chunks/astro/server_ClcBF270.mjs';
import 'kleur/colors';
import 'clsx';
import { t as toRoutingStrategy, g as getLocaleRelativeUrl, a as getLocaleAbsoluteUrl, b as getPathByLocale$1, c as getLocaleByPath$1 } from '../chunks/utils_DfpPSHlF.mjs';
export { renderers } from '../renderers.mjs';

var define_ASTRO_INTERNAL_I18N_CONFIG_default = { base: "/", format: "directory", trailingSlash: "ignore", i18n: { defaultLocale: "en", locales: ["en", "pt", "it", { path: "spanish", codes: ["es", "es-SP"] }], routing: { prefixDefaultLocale: false, redirectToDefaultLocale: true } }, isBuild: true };
const { trailingSlash, format, site, i18n, isBuild } = (
  // @ts-expect-error
  define_ASTRO_INTERNAL_I18N_CONFIG_default
);
const { defaultLocale, locales, domains, fallback, routing } = i18n;
const base = "/";
let strategy = toRoutingStrategy(routing, domains);
const getRelativeLocaleUrl = (locale, path, options) => getLocaleRelativeUrl({
  locale,
  path,
  base,
  trailingSlash,
  format,
  defaultLocale,
  locales,
  strategy,
  domains,
  ...options
});
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
const getPathByLocale = (locale) => getPathByLocale$1(locale, locales);
const getLocaleByPath = (path) => getLocaleByPath$1(path, locales);
if (i18n?.routing === "manual") ;
if (i18n?.routing === "manual") ;
if (i18n?.routing === "manual") ;
if (i18n?.routing === "manual") ;
if (i18n?.routing === "manual") ;

const $$Astro = createAstro();
const $$VirtualModule = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VirtualModule;
  let about = getRelativeLocaleUrl("pt", "about");
  let spanish = getRelativeLocaleUrl("es", "about");
  let spainPath = getPathByLocale("es-SP");
  let localeByPath = getLocaleByPath("spanish");
  let italianAbout = getAbsoluteLocaleUrl("it", "about");
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body>
Virtual module doesn't break
    
        About: ${about}
About spanish: ${spanish}
Spain path: ${spainPath}
Preferred path: ${localeByPath}
About it: ${italianAbout} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing/src/pages/virtual-module.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing/src/pages/virtual-module.astro";
const $$url = "/virtual-module";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$VirtualModule,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

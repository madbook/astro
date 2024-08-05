import { c as createAstro, a as createComponent, r as renderTemplate, d as renderHead } from '../../../chunks/astro/server_D-3XxFAG.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
function getStaticPaths() {
  return [
    { params: { id: "1" }, props: { content: "Hola mundo" } },
    { params: { id: "2" }, props: { content: "Eat Something" } },
    { params: { id: "3" }, props: { content: "How are you?" } }
  ];
}
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { content } = Astro2.props;
  return renderTemplate`<html> <head><title>Astro</title>${renderHead()}</head> <body> ${content} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-subdomain/src/pages/pt/blog/[id].astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/i18n-routing-subdomain/src/pages/pt/blog/[id].astro";
const $$url = "/pt/blog/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

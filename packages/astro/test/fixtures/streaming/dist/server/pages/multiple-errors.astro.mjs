import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BiHUW3TY.mjs';
import 'kleur/colors';
import { jsxs } from 'react/jsx-runtime';
export { renderers } from '../renderers.mjs';

function ReactComp({ foo }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    "React Comp",
    foo.bar.baz.length
  ] });
}

const $$MultipleErrors = createComponent(($$result, $$props, $$slots) => {
  const foo = { bar: null };
  return renderTemplate`${renderComponent($$result, "ReactComp", ReactComp, { "foo": foo })} ${foo.bar.baz.length > 0 && renderTemplate`${maybeRenderHead()}<div></div>`}`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/pages/multiple-errors.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/streaming/src/pages/multiple-errors.astro";
const $$url = "/multiple-errors";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$MultipleErrors,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro } from '../chunks/astro/server_BmWOtwPc.mjs';
import 'kleur/colors';
import 'clsx';
import { a as actions } from '../chunks/_astro_actions_D5GzeLVO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$UserOrThrow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UserOrThrow;
  const res = Astro2.getActionResult(actions.getUserOrThrow);
  if (res?.error) {
    Astro2.response.status = res.error.status;
  }
  return renderTemplate`${maybeRenderHead()}<p id="error-message">${res?.error?.message}</p> <p id="error-code">${res?.error?.code}</p>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/actions/src/pages/user-or-throw.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/actions/src/pages/user-or-throw.astro";
const $$url = "/user-or-throw";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$UserOrThrow,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

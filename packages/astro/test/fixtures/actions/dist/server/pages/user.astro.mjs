import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro } from '../chunks/astro/server_BmWOtwPc.mjs';
import 'kleur/colors';
import 'clsx';
import { a as actions } from '../chunks/_astro_actions_D5GzeLVO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$User = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$User;
  const res = Astro2.getActionResult(actions.getUser);
  return renderTemplate`${maybeRenderHead()}<h1 id="user">${res?.data?.name}</h1>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/actions/src/pages/user.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/actions/src/pages/user.astro";
const $$url = "/user";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$User,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

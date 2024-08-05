import { a as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CKXxaXiN.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<form method="post" action="/post/post-body-used"> <input type="text" name="email" value="example@example.com"> <input type="submit"> </form>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-server/src/pages/post/index.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-server/src/pages/post/index.astro";
const $$url = "/post";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

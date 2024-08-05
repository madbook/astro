import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from './astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import 'clsx';

const $$Aside = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div>2</div>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/minification-html/src/pages/aside.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/minification-html/src/pages/aside.astro";
const $$url = "/aside";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Aside,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Aside as $, _page as _ };

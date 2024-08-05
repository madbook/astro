import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from './astro/server_CYaHsjam.mjs';
import 'kleur/colors';
import 'clsx';

const $$Page = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div>3</div>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/minification-html/src/pages/page.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/minification-html/src/pages/page.astro";
const $$url = "/page";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Page,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Page as $, _page as _ };

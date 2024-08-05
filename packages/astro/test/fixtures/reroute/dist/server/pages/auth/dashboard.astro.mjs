import { a as createComponent, r as renderTemplate, d as renderHead } from '../../chunks/astro/server_CKXxaXiN.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head><title>Dashboard</title>${renderHead()}</head> <body> <h1>Dashboard</h1> </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/reroute/src/pages/auth/dashboard.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/reroute/src/pages/auth/dashboard.astro";
const $$url = "/auth/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Dashboard,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

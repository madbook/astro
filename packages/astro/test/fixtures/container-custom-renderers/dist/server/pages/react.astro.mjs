import { e as experimental_AstroContainer } from '../chunks/index_fyfNXrAl.mjs';
import { a as renderer } from '../chunks/_@astro-renderers_Dwu3UzaR.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_Dwu3UzaR.mjs';
import { C as Component } from '../chunks/button_DuwhinvO.mjs';

const GET = async (ctx) => {
  const container = await experimental_AstroContainer.create();
  container.addServerRenderer({ renderer });
  return await container.renderToResponse(Component);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

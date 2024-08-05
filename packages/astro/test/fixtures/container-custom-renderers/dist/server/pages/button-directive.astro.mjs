import { e as experimental_AstroContainer } from '../chunks/index_fyfNXrAl.mjs';
import { a as renderer } from '../chunks/_@astro-renderers_Dwu3UzaR.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_Dwu3UzaR.mjs';
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent } from '../chunks/astro/server_C9trdzCE.mjs';
import 'kleur/colors';
import { C as Component } from '../chunks/button_DuwhinvO.mjs';

const $$ButtonDirective = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div> <p>Button not rendered</p> ${renderComponent($$result, "Button", Component, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/matt/src/astro/packages/astro/test/fixtures/container-custom-renderers/src/components/button.jsx", "client:component-export": "default" })} </div>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/container-custom-renderers/src/components/buttonDirective.astro", void 0);

const GET = async (ctx) => {
  const container = await experimental_AstroContainer.create();
  container.addServerRenderer({ renderer });
  container.addClientRenderer({ name: "@astrojs/react", entrypoint: "@astrojs/react/client.js" });
  return await container.renderToResponse($$ButtonDirective);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

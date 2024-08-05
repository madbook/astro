import { e as experimental_AstroContainer } from '../chunks/index_fyfNXrAl.mjs';
import { b as renderer } from '../chunks/_@astro-renderers_Dwu3UzaR.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_Dwu3UzaR.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({ id: "arrow-fn-component" }, _attrs))}>I am a vue button</button>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Component = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

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

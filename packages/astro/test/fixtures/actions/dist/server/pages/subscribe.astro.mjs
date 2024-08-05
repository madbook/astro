import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro } from '../chunks/astro/server_BmWOtwPc.mjs';
import 'kleur/colors';
import 'clsx';
import { a as actions } from '../chunks/_astro_actions_D5GzeLVO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Subscribe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Subscribe;
  const res = await Astro2.callAction(actions.subscribeFromServer.orThrow, {
    channel: "bholmesdev"
  });
  return renderTemplate`${maybeRenderHead()}<p data-url>${res.url}</p> <p data-channel>${res.channel}</p>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/actions/src/pages/subscribe.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/actions/src/pages/subscribe.astro";
const $$url = "/subscribe";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Subscribe,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

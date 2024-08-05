import { c as createAstro, a as createComponent } from '../../chunks/astro/server_CKXxaXiN.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$PostBodyUsed = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostBodyUsed;
  let data;
  if (Astro2.request.method === "POST") {
    try {
      data = await Astro2.request.text();
    } catch (e) {
      console.log(e);
    }
  }
  return Astro2.rewrite("/post/post-b");
}, "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-server/src/pages/post/post-body-used.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-server/src/pages/post/post-body-used.astro";
const $$url = "/post/post-body-used";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$PostBodyUsed,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

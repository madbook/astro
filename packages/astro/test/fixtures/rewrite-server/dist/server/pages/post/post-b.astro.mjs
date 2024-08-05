import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CKXxaXiN.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$PostB = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostB;
  let email = "";
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      email = data.get("email");
    } catch (e) {
      console.log(e);
    }
  }
  return renderTemplate`${maybeRenderHead()}<h1>Post B</h1> <h2>${email}</h2>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-server/src/pages/post/post-b.astro", void 0);

const $$file = "/Users/matt/src/astro/packages/astro/test/fixtures/rewrite-server/src/pages/post/post-b.astro";
const $$url = "/post/post-b";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$PostB,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

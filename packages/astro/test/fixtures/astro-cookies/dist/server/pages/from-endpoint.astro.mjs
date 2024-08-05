export { renderers } from '../renderers.mjs';

async function GET(context) {
  return context.rewrite("/to-endpoint");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

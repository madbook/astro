export { renderers } from '../renderers.mjs';

async function GET(context) {
  context.cookies.set("test", "value");
  return Response.json({ hi: "world" });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

export { renderers } from '../renderers.mjs';

const GET = async ({ params, request }) => {
  const url = new URL(request.url);
  const src = url.searchParams.get("src");
  return new Response("An image: " + JSON.stringify(src));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

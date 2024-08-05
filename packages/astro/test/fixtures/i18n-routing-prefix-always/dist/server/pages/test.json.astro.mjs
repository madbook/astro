export { renderers } from '../renderers.mjs';

const GET = () => {
	return new Response(JSON.stringify({ lorem: 'ipsum' }), {
		headers: {
			'content-type': 'application/json',
		},
	});
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

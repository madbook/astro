export { renderers } from '../renderers.mjs';

async function GET({ locals }) {
	let out = { ...locals };

	return new Response(JSON.stringify(out), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

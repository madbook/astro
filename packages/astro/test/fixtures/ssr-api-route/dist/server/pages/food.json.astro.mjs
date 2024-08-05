export { renderers } from '../renderers.mjs';

function GET() {
	return new Response(
		JSON.stringify([
			{ name: 'lettuce' },
			{ name: 'broccoli' },
			{ name: 'pizza' }
		])
	)
}

async function POST({ params, request }) {
	const body = await request.text();
	return new Response(body === `some data` ? `ok` : `not ok`, {
		status: 200,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

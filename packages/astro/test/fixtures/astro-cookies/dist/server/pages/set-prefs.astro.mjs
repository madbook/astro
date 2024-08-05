export { renderers } from '../renderers.mjs';

function POST({ cookies }) {
	const mode = cookies.get('prefs').json().mode;

	cookies.set('prefs', {
		mode: mode === 'light' ? 'dark' : 'light'
	});

	return new Response(null, {
		status: 302,
		headers: {
			'Location': '/prefs'
		}
	});
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

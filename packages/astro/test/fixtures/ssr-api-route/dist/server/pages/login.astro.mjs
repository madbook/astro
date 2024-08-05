export { renderers } from '../renderers.mjs';

/** @type {import('astro').APIRoute} */
function POST({ cookies }) {
	cookies.set('foo', 'foo', {
		httpOnly: true
	});
	cookies.set('bar', 'bar', {
		httpOnly: true
	});
  return new Response('', {
    status: 201,
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

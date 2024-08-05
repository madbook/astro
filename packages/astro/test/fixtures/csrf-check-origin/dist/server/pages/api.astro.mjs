export { renderers } from '../renderers.mjs';

const GET = () => {
  return Response.json({
    something: "true"
  });
};
const POST = () => {
  return Response.json({
    something: "true"
  });
};
const PUT = () => {
  return Response.json({
    something: "true"
  });
};
const DELETE = () => {
  return Response.json({
    something: "true"
  });
};
const PATCH = () => {
  return Response.json({
    something: "true"
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	GET,
	PATCH,
	POST,
	PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

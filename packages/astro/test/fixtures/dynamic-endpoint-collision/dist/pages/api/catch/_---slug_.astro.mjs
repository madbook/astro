export { renderers } from '../../../renderers.mjs';

const slugs = ["one", void 0];
const GET = ({ params }) => {
  return Response.json({
    slug: params.slug || "index"
  });
};
function getStaticPaths() {
  return slugs.map((u) => ({ params: { slug: u } }));
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET,
	getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

export { renderers } from '../../renderers.mjs';

/**
 * @param {import('astro').APIContext} api
 */
function GET(ctx) {
	return Response.json({
		cookiesExist: !!ctx.cookies,
		requestExist: !!ctx.request,
		redirectExist: !!ctx.redirect,
		propsExist: !!ctx.props,
		params: ctx.params,
		site: ctx.site?.toString(),
		generator: ctx.generator,
		url: ctx.url.toString(),
		clientAddress: ctx.clientAddress,
	});
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

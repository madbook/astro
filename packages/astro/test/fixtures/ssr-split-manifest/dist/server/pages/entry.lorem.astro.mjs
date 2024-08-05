import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_BGUClXuu.mjs';
import 'kleur/colors';
import 'clsx';
import { renderers } from '../renderers.mjs';
import { m as manifest$1 } from '../chunks/_@astrojs-manifest_DYZ-iYBT.mjs';
import { s as serverEntrypointModule, c as createExports } from '../chunks/@my-ssr_C4X5So70.mjs';
import { onRequest } from '../_noop-middleware.mjs';

const html = "<h1 id=\"title\">Title</h1>";

				const frontmatter = {};
				const file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-split-manifest/src/pages/lorem.md";
				const url = "/lorem";
				function rawContent() {
					return "# Title";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"title","text":"Title"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

const pageModule = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	page,
	renderers
}, Symbol.toStringTag, { value: 'Module' }));

const serverIslandMap = new Map();

const _manifest = Object.assign(manifest$1, {
    pageModule,
    serverIslandMap,
    renderers,
    middleware: onRequest
});
const _args = undefined;
const _exports = createExports(_manifest);
const manifest = _exports['manifest'];
const createApp = _exports['createApp'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { createApp, manifest, pageModule };

import { c as createComponent, r as renderTemplate, d as renderHead, e as renderSlot, f as renderComponent, u as unescapeHTML } from '../chunks/astro/server_YydPReIj.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Base = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> <head>${renderHead()}</head>Testing
<article> ${renderSlot($$result, $$slots["default"])} </article> </html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-markdown/src/layouts/Base.astro", void 0);

const html = "<h1 id=\"hello-world\">Hello world</h1>\n<p>This is some test</p>\n<h2 id=\"subheading\">Subheading</h2>";

				const frontmatter = {"layout":"../layouts/Base.astro"};
				const file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-markdown/src/pages/post.md";
				const url = "/post";
				function rawContent() {
					return "\n# Hello world\n\nThis is some test\n\n## Subheading\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"hello-world","text":"Hello world"},{"depth":2,"slug":"subheading","text":"Subheading"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${renderComponent(result, 'Layout', $$Base, {
								file,
								url,
								content,
								frontmatter: content,
								headings: getHeadings(),
								rawContent,
								compiledContent,
								'server:root': true,
							}, {
								'default': () => renderTemplate`${unescapeHTML(html)}`
							})}`;
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

export { page };

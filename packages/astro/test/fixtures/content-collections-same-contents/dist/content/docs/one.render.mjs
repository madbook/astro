import { createComponent, renderTemplate, maybeRenderHead, unescapeHTML } from '../../chunks/1722887120136/astro/server.mjs';
import 'kleur/colors';
import 'clsx';
import 'html-escaper';
import 'cssesc';

const html = "<h1 id=\"title\">Title</h1>\n<p>stuff</p>";

				const frontmatter = {"title":"One"};
				const file = "/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/content/docs/one.md";
				const url = undefined;
				function rawContent() {
					return "\n# Title\n\nstuff\n\n";
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

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

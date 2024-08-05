import { c as createComponent, d as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_Dl9amrz7.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Hello world</p>";

				const frontmatter = {"title":"My Post","cover":"../../assets/penguin1.jpg"};
				const file = "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/content/blog/my-post.md";
				const url = undefined;
				function rawContent() {
					return "\nHello world\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

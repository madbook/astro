import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_JKQeSUJ7.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"index\">Index</h2>\n<p>Home page</p>";

				const frontmatter = {"title":"Astro"};
				const file = "/Users/matt/src/astro/packages/astro/test/fixtures/ssr-error-pages/src/content/pages/index.md";
				const url = "";
				function rawContent() {
					return "\n## Index\n\nHome page";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"index","text":"Index"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, B as renderHead, g as renderComponent, h as renderSlot, u as unescapeHTML } from './astro/server_tEnqyPsh.mjs';
import 'kleur/colors';
import { $ as $$Button } from './index_heVKKndf.mjs';
/* empty css                            */
/* empty css                                                              */

const $$Astro = createAstro("https://test.dev/");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Button", $$Button, {}, { "default": ($$result2) => renderTemplate`Button used in layout` })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/matt/src/astro/packages/astro/test/fixtures/css-inline-stylesheets/src/layouts/Layout.astro", void 0);

const html = "<p><strong>Source:</strong> <a href=\"https://en.wikipedia.org/wiki/Space_Shuttle_Endeavour\">Wikipedia</a></p>\n<p>Space Shuttle Endeavour (Orbiter Vehicle Designation: OV-105) is a retired orbiter from NASA’s Space Shuttle program and the fifth and final operational Shuttle built. It embarked on its first mission, STS-49, in May 1992 and its 25th and final mission, STS-134, in May 2011. STS-134 was expected to be the final mission of the Space Shuttle program, but with the authorization of STS-135, Atlantis became the last shuttle to fly.</p>\n<p>The United States Congress approved the construction of Endeavour in 1987 to replace the Space Shuttle Challenger, which was destroyed in 1986.</p>\n<p>NASA chose, on cost grounds, to build much of Endeavour from spare parts rather than refitting the Space Shuttle Enterprise, and used structural spares built during the construction of Discovery and Atlantis in its assembly.</p>";

				const frontmatter = {"title":"Endeavour","description":"Learn about the Endeavour NASA space shuttle.","publishedDate":"Sun Jul 11 2021 00:00:00 GMT-0400 (Eastern Daylight Time)","layout":"../../layouts/Layout.astro","tags":["space","90s"]};
				const file = "/Users/matt/src/astro/packages/astro/test/fixtures/css-inline-stylesheets/src/content/en/endeavour.md";
				const url = undefined;
				function rawContent() {
					return "\n**Source:** [Wikipedia](https://en.wikipedia.org/wiki/Space_Shuttle_Endeavour)\n\nSpace Shuttle Endeavour (Orbiter Vehicle Designation: OV-105) is a retired orbiter from NASA's Space Shuttle program and the fifth and final operational Shuttle built. It embarked on its first mission, STS-49, in May 1992 and its 25th and final mission, STS-134, in May 2011. STS-134 was expected to be the final mission of the Space Shuttle program, but with the authorization of STS-135, Atlantis became the last shuttle to fly.\n\nThe United States Congress approved the construction of Endeavour in 1987 to replace the Space Shuttle Challenger, which was destroyed in 1986.\n\nNASA chose, on cost grounds, to build much of Endeavour from spare parts rather than refitting the Space Shuttle Enterprise, and used structural spares built during the construction of Discovery and Atlantis in its assembly.";
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

					return renderTemplate`${renderComponent(result, 'Layout', $$Layout, {
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

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

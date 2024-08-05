import { c as createComponent, s as spreadAttributes, d as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../chunks/astro/server_Dl9amrz7.mjs';
import { a as getImage } from '../chunks/_astro_assets_BoGE1mxH.mjs';
import { p as p1Image } from '../chunks/penguin1_DE-Ip7gt.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const Astro__QRnku = new Proxy({"src":"http://localhost:4321/_astro/ペンギン.wSAOfMN3.jpg","width":207,"height":243,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/assets/ペンギン.jpg";
							}
							
							return target[name];
						}
					});

const images = async function(html) {
					const imageSources = {};
					{
											const regex = new RegExp('__ASTRO_IMAGE_="([^"]*' + "\\.\\./assets/penguin1\\.jpg" + '[^"]*)"', 'g');
											let match;
											let occurrenceCounter = 0;
											while ((match = regex.exec(html)) !== null) {
													const matchKey = "../assets/penguin1.jpg" + '_' + occurrenceCounter;
													const imageProps = JSON.parse(match[1].replace(/&#x22;/g, '"'));
													const { src, ...props } = imageProps;
													
													imageSources[matchKey] = await getImage({src: p1Image, ...props});
													occurrenceCounter++;
											}
									}
{
											const regex = new RegExp('__ASTRO_IMAGE_="([^"]*' + "\\.\\./assets/ペンギン\\.jpg" + '[^"]*)"', 'g');
											let match;
											let occurrenceCounter = 0;
											while ((match = regex.exec(html)) !== null) {
													const matchKey = "../assets/ペンギン.jpg" + '_' + occurrenceCounter;
													const imageProps = JSON.parse(match[1].replace(/&#x22;/g, '"'));
													const { src, ...props } = imageProps;
													
													imageSources[matchKey] = await getImage({src: Astro__QRnku, ...props});
													occurrenceCounter++;
											}
									}
					return imageSources;
			};

			async function updateImageReferences(html) {
				return images(html).then((imageSources) => {
						return html.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm, (full, imagePath) => {
								const decodedImagePath = JSON.parse(imagePath.replace(/&#x22;/g, '"'));
		
								// Use the 'index' property for each image occurrence
								const srcKey = decodedImagePath.src + '_' + decodedImagePath.index;
		
								if (imageSources[srcKey].srcSet && imageSources[srcKey].srcSet.values.length > 0) {
										imageSources[srcKey].attributes.srcset = imageSources[srcKey].srcSet.attribute;
								}
		
								const { index, ...attributesWithoutIndex } = imageSources[srcKey].attributes;
		
								return spreadAttributes({
										src: imageSources[srcKey].src,
										...attributesWithoutIndex,
								});
						});
				});
		}
		

		// NOTE: This causes a top-level await to appear in the user's code, which can break very easily due to a Rollup
	  // bug and certain adapters not supporting it correctly. See: https://github.com/rollup/rollup/issues/4708
	  // Tread carefully!
			const html = await updateImageReferences("<h1 id=\"assets-prefix\">Assets Prefix</h1>\n<p>Relative image has assetsPrefix</p>\n<p><img __ASTRO_IMAGE_=\"{&#x22;src&#x22;:&#x22;../assets/penguin1.jpg&#x22;,&#x22;alt&#x22;:&#x22;Relative image&#x22;,&#x22;index&#x22;:0}\"></p>\n<p><img __ASTRO_IMAGE_=\"{&#x22;src&#x22;:&#x22;../assets/ペンギン.jpg&#x22;,&#x22;alt&#x22;:&#x22;non-UTF-8 file name image&#x22;,&#x22;index&#x22;:0}\"></p>");
	

				const frontmatter = {};
				const file = "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/pages/markdown.md";
				const url = "/custom-base/markdown";
				function rawContent() {
					return "# Assets Prefix\n\nRelative image has assetsPrefix\n\n![Relative image](../assets/penguin1.jpg)\n\n![non-UTF-8 file name image](../assets/ペンギン.jpg)\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"assets-prefix","text":"Assets Prefix"}];
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

export { page };

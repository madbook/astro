const id = "my-post.md";
						const collection = "blog";
						const slug = "my-post";
						const body = "\nHello world\n";
						const data = {title:"My Post",cover:
						new Proxy({"src":"/starting-slash/_astro/ペンギン.wSAOfMN3.jpg","width":207,"height":243,"format":"jpg","fsPath":"/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/assets/penguin1.jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/assets/penguin1.jpg";
							}
							
							return target[name];
						}
					})
					};
						const _internal = {
							type: 'content',
							filePath: "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/content/blog/my-post.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };

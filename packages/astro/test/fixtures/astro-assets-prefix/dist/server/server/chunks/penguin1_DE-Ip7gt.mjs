const p1Image = new Proxy({"src":"http://localhost:4321/_astro/ペンギン.wSAOfMN3.jpg","width":207,"height":243,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/matt/src/astro/packages/astro/test/fixtures/astro-assets-prefix/src/assets/penguin1.jpg";
							}
							
							return target[name];
						}
					});

export { p1Image as p };

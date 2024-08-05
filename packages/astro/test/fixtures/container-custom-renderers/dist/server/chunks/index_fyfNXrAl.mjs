import path, { posix } from 'node:path';
import 'esbuild';
import { i as idle_prebuilt_default, l as load_prebuilt_default, m as media_prebuilt_default, o as only_prebuilt_default, v as visible_prebuilt_default } from './astro_B4Kj1VsR.mjs';
import 'github-slugger';
import { bundledThemes } from 'shiki';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';
import { q as prependForwardSlash, s as removeTrailingForwardSlash, t as appendForwardSlash, u as removeLeadingForwardSlash } from './astro/assets-service_5T573VqA.mjs';
import { l as levels, g as getEventPrefix, P as Pipeline, c as createStylesheetElementSet, a as createModuleScriptElement, f as findRouteToRewrite, L as Logger, R as RenderContext, b as getPattern } from './rewrite_x9XC5KKb.mjs';
import debugPackage from 'debug';
import { createRequire } from 'module';
import 'kleur/colors';

function getDefaultClientDirectives() {
  return /* @__PURE__ */ new Map([
    ["idle", idle_prebuilt_default],
    ["load", load_prebuilt_default],
    ["media", media_prebuilt_default],
    ["only", only_prebuilt_default],
    ["visible", visible_prebuilt_default]
  ]);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var prism = {exports: {}};

(function (module) {
	/* **********************************************
	     Begin prism-core.js
	********************************************** */

	/// <reference lib="WebWorker"/>

	var _self = (typeof window !== 'undefined')
		? window   // if in browser
		: (
			(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
				? self // if in worker
				: {}   // if in node js
		);

	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 *
	 * @license MIT <https://opensource.org/licenses/MIT>
	 * @author Lea Verou <https://lea.verou.me>
	 * @namespace
	 * @public
	 */
	var Prism = (function (_self) {

		// Private helper vars
		var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
		var uniqueId = 0;

		// The grammar object for plaintext
		var plainTextGrammar = {};


		var _ = {
			/**
			 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
			 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
			 * additional languages or plugins yourself.
			 *
			 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
			 *
			 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
			 * empty Prism object into the global scope before loading the Prism script like this:
			 *
			 * ```js
			 * window.Prism = window.Prism || {};
			 * Prism.manual = true;
			 * // add a new <script> to load Prism's script
			 * ```
			 *
			 * @default false
			 * @type {boolean}
			 * @memberof Prism
			 * @public
			 */
			manual: _self.Prism && _self.Prism.manual,
			/**
			 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
			 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
			 * own worker, you don't want it to do this.
			 *
			 * By setting this value to `true`, Prism will not add its own listeners to the worker.
			 *
			 * You obviously have to change this value before Prism executes. To do this, you can add an
			 * empty Prism object into the global scope before loading the Prism script like this:
			 *
			 * ```js
			 * window.Prism = window.Prism || {};
			 * Prism.disableWorkerMessageHandler = true;
			 * // Load Prism's script
			 * ```
			 *
			 * @default false
			 * @type {boolean}
			 * @memberof Prism
			 * @public
			 */
			disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

			/**
			 * A namespace for utility methods.
			 *
			 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
			 * change or disappear at any time.
			 *
			 * @namespace
			 * @memberof Prism
			 */
			util: {
				encode: function encode(tokens) {
					if (tokens instanceof Token) {
						return new Token(tokens.type, encode(tokens.content), tokens.alias);
					} else if (Array.isArray(tokens)) {
						return tokens.map(encode);
					} else {
						return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
					}
				},

				/**
				 * Returns the name of the type of the given value.
				 *
				 * @param {any} o
				 * @returns {string}
				 * @example
				 * type(null)      === 'Null'
				 * type(undefined) === 'Undefined'
				 * type(123)       === 'Number'
				 * type('foo')     === 'String'
				 * type(true)      === 'Boolean'
				 * type([1, 2])    === 'Array'
				 * type({})        === 'Object'
				 * type(String)    === 'Function'
				 * type(/abc+/)    === 'RegExp'
				 */
				type: function (o) {
					return Object.prototype.toString.call(o).slice(8, -1);
				},

				/**
				 * Returns a unique number for the given object. Later calls will still return the same number.
				 *
				 * @param {Object} obj
				 * @returns {number}
				 */
				objId: function (obj) {
					if (!obj['__id']) {
						Object.defineProperty(obj, '__id', { value: ++uniqueId });
					}
					return obj['__id'];
				},

				/**
				 * Creates a deep clone of the given object.
				 *
				 * The main intended use of this function is to clone language definitions.
				 *
				 * @param {T} o
				 * @param {Record<number, any>} [visited]
				 * @returns {T}
				 * @template T
				 */
				clone: function deepClone(o, visited) {
					visited = visited || {};

					var clone; var id;
					switch (_.util.type(o)) {
						case 'Object':
							id = _.util.objId(o);
							if (visited[id]) {
								return visited[id];
							}
							clone = /** @type {Record<string, any>} */ ({});
							visited[id] = clone;

							for (var key in o) {
								if (o.hasOwnProperty(key)) {
									clone[key] = deepClone(o[key], visited);
								}
							}

							return /** @type {any} */ (clone);

						case 'Array':
							id = _.util.objId(o);
							if (visited[id]) {
								return visited[id];
							}
							clone = [];
							visited[id] = clone;

							(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
								clone[i] = deepClone(v, visited);
							});

							return /** @type {any} */ (clone);

						default:
							return o;
					}
				},

				/**
				 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
				 *
				 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
				 *
				 * @param {Element} element
				 * @returns {string}
				 */
				getLanguage: function (element) {
					while (element) {
						var m = lang.exec(element.className);
						if (m) {
							return m[1].toLowerCase();
						}
						element = element.parentElement;
					}
					return 'none';
				},

				/**
				 * Sets the Prism `language-xxxx` class of the given element.
				 *
				 * @param {Element} element
				 * @param {string} language
				 * @returns {void}
				 */
				setLanguage: function (element, language) {
					// remove all `language-xxxx` classes
					// (this might leave behind a leading space)
					element.className = element.className.replace(RegExp(lang, 'gi'), '');

					// add the new `language-xxxx` class
					// (using `classList` will automatically clean up spaces for us)
					element.classList.add('language-' + language);
				},

				/**
				 * Returns the script element that is currently executing.
				 *
				 * This does __not__ work for line script element.
				 *
				 * @returns {HTMLScriptElement | null}
				 */
				currentScript: function () {
					if (typeof document === 'undefined') {
						return null;
					}
					if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
						return /** @type {any} */ (document.currentScript);
					}

					// IE11 workaround
					// we'll get the src of the current script by parsing IE11's error stack trace
					// this will not work for inline scripts

					try {
						throw new Error();
					} catch (err) {
						// Get file src url from stack. Specifically works with the format of stack traces in IE.
						// A stack will look like this:
						//
						// Error
						//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
						//    at Global code (http://localhost/components/prism-core.js:606:1)

						var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
						if (src) {
							var scripts = document.getElementsByTagName('script');
							for (var i in scripts) {
								if (scripts[i].src == src) {
									return scripts[i];
								}
							}
						}
						return null;
					}
				},

				/**
				 * Returns whether a given class is active for `element`.
				 *
				 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
				 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
				 * given class is just the given class with a `no-` prefix.
				 *
				 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
				 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
				 * ancestors have the given class or the negated version of it, then the default activation will be returned.
				 *
				 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
				 * version of it, the class is considered active.
				 *
				 * @param {Element} element
				 * @param {string} className
				 * @param {boolean} [defaultActivation=false]
				 * @returns {boolean}
				 */
				isActive: function (element, className, defaultActivation) {
					var no = 'no-' + className;

					while (element) {
						var classList = element.classList;
						if (classList.contains(className)) {
							return true;
						}
						if (classList.contains(no)) {
							return false;
						}
						element = element.parentElement;
					}
					return !!defaultActivation;
				}
			},

			/**
			 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
			 *
			 * @namespace
			 * @memberof Prism
			 * @public
			 */
			languages: {
				/**
				 * The grammar for plain, unformatted text.
				 */
				plain: plainTextGrammar,
				plaintext: plainTextGrammar,
				text: plainTextGrammar,
				txt: plainTextGrammar,

				/**
				 * Creates a deep copy of the language with the given id and appends the given tokens.
				 *
				 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
				 * will be overwritten at its original position.
				 *
				 * ## Best practices
				 *
				 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
				 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
				 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
				 *
				 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
				 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
				 *
				 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
				 * @param {Grammar} redef The new tokens to append.
				 * @returns {Grammar} The new language created.
				 * @public
				 * @example
				 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
				 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
				 *     // at its original position
				 *     'comment': { ... },
				 *     // CSS doesn't have a 'color' token, so this token will be appended
				 *     'color': /\b(?:red|green|blue)\b/
				 * });
				 */
				extend: function (id, redef) {
					var lang = _.util.clone(_.languages[id]);

					for (var key in redef) {
						lang[key] = redef[key];
					}

					return lang;
				},

				/**
				 * Inserts tokens _before_ another token in a language definition or any other grammar.
				 *
				 * ## Usage
				 *
				 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
				 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
				 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
				 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
				 * this:
				 *
				 * ```js
				 * Prism.languages.markup.style = {
				 *     // token
				 * };
				 * ```
				 *
				 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
				 * before existing tokens. For the CSS example above, you would use it like this:
				 *
				 * ```js
				 * Prism.languages.insertBefore('markup', 'cdata', {
				 *     'style': {
				 *         // token
				 *     }
				 * });
				 * ```
				 *
				 * ## Special cases
				 *
				 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
				 * will be ignored.
				 *
				 * This behavior can be used to insert tokens after `before`:
				 *
				 * ```js
				 * Prism.languages.insertBefore('markup', 'comment', {
				 *     'comment': Prism.languages.markup.comment,
				 *     // tokens after 'comment'
				 * });
				 * ```
				 *
				 * ## Limitations
				 *
				 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
				 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
				 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
				 * deleting properties which is necessary to insert at arbitrary positions.
				 *
				 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
				 * Instead, it will create a new object and replace all references to the target object with the new one. This
				 * can be done without temporarily deleting properties, so the iteration order is well-defined.
				 *
				 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
				 * you hold the target object in a variable, then the value of the variable will not change.
				 *
				 * ```js
				 * var oldMarkup = Prism.languages.markup;
				 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
				 *
				 * assert(oldMarkup !== Prism.languages.markup);
				 * assert(newMarkup === Prism.languages.markup);
				 * ```
				 *
				 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
				 * object to be modified.
				 * @param {string} before The key to insert before.
				 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
				 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
				 * object to be modified.
				 *
				 * Defaults to `Prism.languages`.
				 * @returns {Grammar} The new grammar object.
				 * @public
				 */
				insertBefore: function (inside, before, insert, root) {
					root = root || /** @type {any} */ (_.languages);
					var grammar = root[inside];
					/** @type {Grammar} */
					var ret = {};

					for (var token in grammar) {
						if (grammar.hasOwnProperty(token)) {

							if (token == before) {
								for (var newToken in insert) {
									if (insert.hasOwnProperty(newToken)) {
										ret[newToken] = insert[newToken];
									}
								}
							}

							// Do not insert token which also occur in insert. See #1525
							if (!insert.hasOwnProperty(token)) {
								ret[token] = grammar[token];
							}
						}
					}

					var old = root[inside];
					root[inside] = ret;

					// Update references in other language definitions
					_.languages.DFS(_.languages, function (key, value) {
						if (value === old && key != inside) {
							this[key] = ret;
						}
					});

					return ret;
				},

				// Traverse a language definition with Depth First Search
				DFS: function DFS(o, callback, type, visited) {
					visited = visited || {};

					var objId = _.util.objId;

					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							callback.call(o, i, o[i], type || i);

							var property = o[i];
							var propertyType = _.util.type(property);

							if (propertyType === 'Object' && !visited[objId(property)]) {
								visited[objId(property)] = true;
								DFS(property, callback, null, visited);
							} else if (propertyType === 'Array' && !visited[objId(property)]) {
								visited[objId(property)] = true;
								DFS(property, callback, i, visited);
							}
						}
					}
				}
			},

			plugins: {},

			/**
			 * This is the most high-level function in Prism’s API.
			 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
			 * each one of them.
			 *
			 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
			 *
			 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
			 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
			 * @memberof Prism
			 * @public
			 */
			highlightAll: function (async, callback) {
				_.highlightAllUnder(document, async, callback);
			},

			/**
			 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
			 * {@link Prism.highlightElement} on each one of them.
			 *
			 * The following hooks will be run:
			 * 1. `before-highlightall`
			 * 2. `before-all-elements-highlight`
			 * 3. All hooks of {@link Prism.highlightElement} for each element.
			 *
			 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
			 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
			 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
			 * @memberof Prism
			 * @public
			 */
			highlightAllUnder: function (container, async, callback) {
				var env = {
					callback: callback,
					container: container,
					selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
				};

				_.hooks.run('before-highlightall', env);

				env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

				_.hooks.run('before-all-elements-highlight', env);

				for (var i = 0, element; (element = env.elements[i++]);) {
					_.highlightElement(element, async === true, env.callback);
				}
			},

			/**
			 * Highlights the code inside a single element.
			 *
			 * The following hooks will be run:
			 * 1. `before-sanity-check`
			 * 2. `before-highlight`
			 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
			 * 4. `before-insert`
			 * 5. `after-highlight`
			 * 6. `complete`
			 *
			 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
			 * the element's language.
			 *
			 * @param {Element} element The element containing the code.
			 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
			 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
			 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
			 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
			 *
			 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
			 * asynchronous highlighting to work. You can build your own bundle on the
			 * [Download page](https://prismjs.com/download.html).
			 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
			 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
			 * @memberof Prism
			 * @public
			 */
			highlightElement: function (element, async, callback) {
				// Find language
				var language = _.util.getLanguage(element);
				var grammar = _.languages[language];

				// Set language on the element, if not present
				_.util.setLanguage(element, language);

				// Set language on the parent, for styling
				var parent = element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === 'pre') {
					_.util.setLanguage(parent, language);
				}

				var code = element.textContent;

				var env = {
					element: element,
					language: language,
					grammar: grammar,
					code: code
				};

				function insertHighlightedCode(highlightedCode) {
					env.highlightedCode = highlightedCode;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
					callback && callback.call(env.element);
				}

				_.hooks.run('before-sanity-check', env);

				// plugins may change/add the parent/element
				parent = env.element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
					parent.setAttribute('tabindex', '0');
				}

				if (!env.code) {
					_.hooks.run('complete', env);
					callback && callback.call(env.element);
					return;
				}

				_.hooks.run('before-highlight', env);

				if (!env.grammar) {
					insertHighlightedCode(_.util.encode(env.code));
					return;
				}

				if (async && _self.Worker) {
					var worker = new Worker(_.filename);

					worker.onmessage = function (evt) {
						insertHighlightedCode(evt.data);
					};

					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else {
					insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
				}
			},

			/**
			 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
			 * and the language definitions to use, and returns a string with the HTML produced.
			 *
			 * The following hooks will be run:
			 * 1. `before-tokenize`
			 * 2. `after-tokenize`
			 * 3. `wrap`: On each {@link Token}.
			 *
			 * @param {string} text A string with the code to be highlighted.
			 * @param {Grammar} grammar An object containing the tokens to use.
			 *
			 * Usually a language definition like `Prism.languages.markup`.
			 * @param {string} language The name of the language definition passed to `grammar`.
			 * @returns {string} The highlighted HTML.
			 * @memberof Prism
			 * @public
			 * @example
			 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
			 */
			highlight: function (text, grammar, language) {
				var env = {
					code: text,
					grammar: grammar,
					language: language
				};
				_.hooks.run('before-tokenize', env);
				if (!env.grammar) {
					throw new Error('The language "' + env.language + '" has no grammar.');
				}
				env.tokens = _.tokenize(env.code, env.grammar);
				_.hooks.run('after-tokenize', env);
				return Token.stringify(_.util.encode(env.tokens), env.language);
			},

			/**
			 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
			 * and the language definitions to use, and returns an array with the tokenized code.
			 *
			 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
			 *
			 * This method could be useful in other contexts as well, as a very crude parser.
			 *
			 * @param {string} text A string with the code to be highlighted.
			 * @param {Grammar} grammar An object containing the tokens to use.
			 *
			 * Usually a language definition like `Prism.languages.markup`.
			 * @returns {TokenStream} An array of strings and tokens, a token stream.
			 * @memberof Prism
			 * @public
			 * @example
			 * let code = `var foo = 0;`;
			 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
			 * tokens.forEach(token => {
			 *     if (token instanceof Prism.Token && token.type === 'number') {
			 *         console.log(`Found numeric literal: ${token.content}`);
			 *     }
			 * });
			 */
			tokenize: function (text, grammar) {
				var rest = grammar.rest;
				if (rest) {
					for (var token in rest) {
						grammar[token] = rest[token];
					}

					delete grammar.rest;
				}

				var tokenList = new LinkedList();
				addAfter(tokenList, tokenList.head, text);

				matchGrammar(text, tokenList, grammar, tokenList.head, 0);

				return toArray(tokenList);
			},

			/**
			 * @namespace
			 * @memberof Prism
			 * @public
			 */
			hooks: {
				all: {},

				/**
				 * Adds the given callback to the list of callbacks for the given hook.
				 *
				 * The callback will be invoked when the hook it is registered for is run.
				 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
				 *
				 * One callback function can be registered to multiple hooks and the same hook multiple times.
				 *
				 * @param {string} name The name of the hook.
				 * @param {HookCallback} callback The callback function which is given environment variables.
				 * @public
				 */
				add: function (name, callback) {
					var hooks = _.hooks.all;

					hooks[name] = hooks[name] || [];

					hooks[name].push(callback);
				},

				/**
				 * Runs a hook invoking all registered callbacks with the given environment variables.
				 *
				 * Callbacks will be invoked synchronously and in the order in which they were registered.
				 *
				 * @param {string} name The name of the hook.
				 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
				 * @public
				 */
				run: function (name, env) {
					var callbacks = _.hooks.all[name];

					if (!callbacks || !callbacks.length) {
						return;
					}

					for (var i = 0, callback; (callback = callbacks[i++]);) {
						callback(env);
					}
				}
			},

			Token: Token
		};
		_self.Prism = _;


		// Typescript note:
		// The following can be used to import the Token type in JSDoc:
		//
		//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

		/**
		 * Creates a new token.
		 *
		 * @param {string} type See {@link Token#type type}
		 * @param {string | TokenStream} content See {@link Token#content content}
		 * @param {string|string[]} [alias] The alias(es) of the token.
		 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
		 * @class
		 * @global
		 * @public
		 */
		function Token(type, content, alias, matchedStr) {
			/**
			 * The type of the token.
			 *
			 * This is usually the key of a pattern in a {@link Grammar}.
			 *
			 * @type {string}
			 * @see GrammarToken
			 * @public
			 */
			this.type = type;
			/**
			 * The strings or tokens contained by this token.
			 *
			 * This will be a token stream if the pattern matched also defined an `inside` grammar.
			 *
			 * @type {string | TokenStream}
			 * @public
			 */
			this.content = content;
			/**
			 * The alias(es) of the token.
			 *
			 * @type {string|string[]}
			 * @see GrammarToken
			 * @public
			 */
			this.alias = alias;
			// Copy of the full string this token was created from
			this.length = (matchedStr || '').length | 0;
		}

		/**
		 * A token stream is an array of strings and {@link Token Token} objects.
		 *
		 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
		 * them.
		 *
		 * 1. No adjacent strings.
		 * 2. No empty strings.
		 *
		 *    The only exception here is the token stream that only contains the empty string and nothing else.
		 *
		 * @typedef {Array<string | Token>} TokenStream
		 * @global
		 * @public
		 */

		/**
		 * Converts the given token or token stream to an HTML representation.
		 *
		 * The following hooks will be run:
		 * 1. `wrap`: On each {@link Token}.
		 *
		 * @param {string | Token | TokenStream} o The token or token stream to be converted.
		 * @param {string} language The name of current language.
		 * @returns {string} The HTML representation of the token or token stream.
		 * @memberof Token
		 * @static
		 */
		Token.stringify = function stringify(o, language) {
			if (typeof o == 'string') {
				return o;
			}
			if (Array.isArray(o)) {
				var s = '';
				o.forEach(function (e) {
					s += stringify(e, language);
				});
				return s;
			}

			var env = {
				type: o.type,
				content: stringify(o.content, language),
				tag: 'span',
				classes: ['token', o.type],
				attributes: {},
				language: language
			};

			var aliases = o.alias;
			if (aliases) {
				if (Array.isArray(aliases)) {
					Array.prototype.push.apply(env.classes, aliases);
				} else {
					env.classes.push(aliases);
				}
			}

			_.hooks.run('wrap', env);

			var attributes = '';
			for (var name in env.attributes) {
				attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
			}

			return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
		};

		/**
		 * @param {RegExp} pattern
		 * @param {number} pos
		 * @param {string} text
		 * @param {boolean} lookbehind
		 * @returns {RegExpExecArray | null}
		 */
		function matchPattern(pattern, pos, text, lookbehind) {
			pattern.lastIndex = pos;
			var match = pattern.exec(text);
			if (match && lookbehind && match[1]) {
				// change the match to remove the text matched by the Prism lookbehind group
				var lookbehindLength = match[1].length;
				match.index += lookbehindLength;
				match[0] = match[0].slice(lookbehindLength);
			}
			return match;
		}

		/**
		 * @param {string} text
		 * @param {LinkedList<string | Token>} tokenList
		 * @param {any} grammar
		 * @param {LinkedListNode<string | Token>} startNode
		 * @param {number} startPos
		 * @param {RematchOptions} [rematch]
		 * @returns {void}
		 * @private
		 *
		 * @typedef RematchOptions
		 * @property {string} cause
		 * @property {number} reach
		 */
		function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
			for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				var patterns = grammar[token];
				patterns = Array.isArray(patterns) ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					if (rematch && rematch.cause == token + ',' + j) {
						return;
					}

					var patternObj = patterns[j];
					var inside = patternObj.inside;
					var lookbehind = !!patternObj.lookbehind;
					var greedy = !!patternObj.greedy;
					var alias = patternObj.alias;

					if (greedy && !patternObj.pattern.global) {
						// Without the global flag, lastIndex won't work
						var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
						patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
					}

					/** @type {RegExp} */
					var pattern = patternObj.pattern || patternObj;

					for ( // iterate the token list and keep track of the current token/string position
						var currentNode = startNode.next, pos = startPos;
						currentNode !== tokenList.tail;
						pos += currentNode.value.length, currentNode = currentNode.next
					) {

						if (rematch && pos >= rematch.reach) {
							break;
						}

						var str = currentNode.value;

						if (tokenList.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							return;
						}

						if (str instanceof Token) {
							continue;
						}

						var removeCount = 1; // this is the to parameter of removeBetween
						var match;

						if (greedy) {
							match = matchPattern(pattern, pos, text, lookbehind);
							if (!match || match.index >= text.length) {
								break;
							}

							var from = match.index;
							var to = match.index + match[0].length;
							var p = pos;

							// find the node that contains the match
							p += currentNode.value.length;
							while (from >= p) {
								currentNode = currentNode.next;
								p += currentNode.value.length;
							}
							// adjust pos (and p)
							p -= currentNode.value.length;
							pos = p;

							// the current node is a Token, then the match starts inside another Token, which is invalid
							if (currentNode.value instanceof Token) {
								continue;
							}

							// find the last node which is affected by this match
							for (
								var k = currentNode;
								k !== tokenList.tail && (p < to || typeof k.value === 'string');
								k = k.next
							) {
								removeCount++;
								p += k.value.length;
							}
							removeCount--;

							// replace with the new match
							str = text.slice(pos, p);
							match.index -= pos;
						} else {
							match = matchPattern(pattern, 0, str, lookbehind);
							if (!match) {
								continue;
							}
						}

						// eslint-disable-next-line no-redeclare
						var from = match.index;
						var matchStr = match[0];
						var before = str.slice(0, from);
						var after = str.slice(from + matchStr.length);

						var reach = pos + str.length;
						if (rematch && reach > rematch.reach) {
							rematch.reach = reach;
						}

						var removeFrom = currentNode.prev;

						if (before) {
							removeFrom = addAfter(tokenList, removeFrom, before);
							pos += before.length;
						}

						removeRange(tokenList, removeFrom, removeCount);

						var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
						currentNode = addAfter(tokenList, removeFrom, wrapped);

						if (after) {
							addAfter(tokenList, currentNode, after);
						}

						if (removeCount > 1) {
							// at least one Token object was removed, so we have to do some rematching
							// this can only happen if the current pattern is greedy

							/** @type {RematchOptions} */
							var nestedRematch = {
								cause: token + ',' + j,
								reach: reach
							};
							matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

							// the reach might have been extended because of the rematching
							if (rematch && nestedRematch.reach > rematch.reach) {
								rematch.reach = nestedRematch.reach;
							}
						}
					}
				}
			}
		}

		/**
		 * @typedef LinkedListNode
		 * @property {T} value
		 * @property {LinkedListNode<T> | null} prev The previous node.
		 * @property {LinkedListNode<T> | null} next The next node.
		 * @template T
		 * @private
		 */

		/**
		 * @template T
		 * @private
		 */
		function LinkedList() {
			/** @type {LinkedListNode<T>} */
			var head = { value: null, prev: null, next: null };
			/** @type {LinkedListNode<T>} */
			var tail = { value: null, prev: head, next: null };
			head.next = tail;

			/** @type {LinkedListNode<T>} */
			this.head = head;
			/** @type {LinkedListNode<T>} */
			this.tail = tail;
			this.length = 0;
		}

		/**
		 * Adds a new node with the given value to the list.
		 *
		 * @param {LinkedList<T>} list
		 * @param {LinkedListNode<T>} node
		 * @param {T} value
		 * @returns {LinkedListNode<T>} The added node.
		 * @template T
		 */
		function addAfter(list, node, value) {
			// assumes that node != list.tail && values.length >= 0
			var next = node.next;

			var newNode = { value: value, prev: node, next: next };
			node.next = newNode;
			next.prev = newNode;
			list.length++;

			return newNode;
		}
		/**
		 * Removes `count` nodes after the given node. The given node will not be removed.
		 *
		 * @param {LinkedList<T>} list
		 * @param {LinkedListNode<T>} node
		 * @param {number} count
		 * @template T
		 */
		function removeRange(list, node, count) {
			var next = node.next;
			for (var i = 0; i < count && next !== list.tail; i++) {
				next = next.next;
			}
			node.next = next;
			next.prev = node;
			list.length -= i;
		}
		/**
		 * @param {LinkedList<T>} list
		 * @returns {T[]}
		 * @template T
		 */
		function toArray(list) {
			var array = [];
			var node = list.head.next;
			while (node !== list.tail) {
				array.push(node.value);
				node = node.next;
			}
			return array;
		}


		if (!_self.document) {
			if (!_self.addEventListener) {
				// in Node.js
				return _;
			}

			if (!_.disableWorkerMessageHandler) {
				// In worker
				_self.addEventListener('message', function (evt) {
					var message = JSON.parse(evt.data);
					var lang = message.language;
					var code = message.code;
					var immediateClose = message.immediateClose;

					_self.postMessage(_.highlight(code, _.languages[lang], lang));
					if (immediateClose) {
						_self.close();
					}
				}, false);
			}

			return _;
		}

		// Get current script and highlight
		var script = _.util.currentScript();

		if (script) {
			_.filename = script.src;

			if (script.hasAttribute('data-manual')) {
				_.manual = true;
			}
		}

		function highlightAutomaticallyCallback() {
			if (!_.manual) {
				_.highlightAll();
			}
		}

		if (!_.manual) {
			// If the document state is "loading", then we'll use DOMContentLoaded.
			// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
			// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
			// might take longer one animation frame to execute which can create a race condition where only some plugins have
			// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
			// See https://github.com/PrismJS/prism/issues/2102
			var readyState = document.readyState;
			if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
				document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
			} else {
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(highlightAutomaticallyCallback);
				} else {
					window.setTimeout(highlightAutomaticallyCallback, 16);
				}
			}
		}

		return _;

	}(_self));

	if (module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof commonjsGlobal !== 'undefined') {
		commonjsGlobal.Prism = Prism;
	}

	// some additional documentation/types

	/**
	 * The expansion of a simple `RegExp` literal to support additional properties.
	 *
	 * @typedef GrammarToken
	 * @property {RegExp} pattern The regular expression of the token.
	 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
	 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
	 * @property {boolean} [greedy=false] Whether the token is greedy.
	 * @property {string|string[]} [alias] An optional alias or list of aliases.
	 * @property {Grammar} [inside] The nested grammar of this token.
	 *
	 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
	 *
	 * This can be used to make nested and even recursive language definitions.
	 *
	 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
	 * each another.
	 * @global
	 * @public
	 */

	/**
	 * @typedef Grammar
	 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
	 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
	 * @global
	 * @public
	 */

	/**
	 * A function which will invoked after an element was successfully highlighted.
	 *
	 * @callback HighlightCallback
	 * @param {Element} element The element successfully highlighted.
	 * @returns {void}
	 * @global
	 * @public
	 */

	/**
	 * @callback HookCallback
	 * @param {Object<string, any>} env The environment variables of the hook.
	 * @returns {void}
	 * @global
	 * @public
	 */


	/* **********************************************
	     Begin prism-markup.js
	********************************************** */

	Prism.languages.markup = {
		'comment': {
			pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
			greedy: true
		},
		'prolog': {
			pattern: /<\?[\s\S]+?\?>/,
			greedy: true
		},
		'doctype': {
			// https://www.w3.org/TR/xml/#NT-doctypedecl
			pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
			greedy: true,
			inside: {
				'internal-subset': {
					pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
					lookbehind: true,
					greedy: true,
					inside: null // see below
				},
				'string': {
					pattern: /"[^"]*"|'[^']*'/,
					greedy: true
				},
				'punctuation': /^<!|>$|[[\]]/,
				'doctype-tag': /^DOCTYPE/i,
				'name': /[^\s<>'"]+/
			}
		},
		'cdata': {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			greedy: true
		},
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
			greedy: true,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'special-attr': [],
				'attr-value': {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
					inside: {
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							{
								pattern: /^(\s*)["']|["']$/,
								lookbehind: true
							}
						]
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': [
			{
				pattern: /&[\da-z]{1,8};/i,
				alias: 'named-entity'
			},
			/&#x?[\da-f]{1,8};/i
		]
	};

	Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
		Prism.languages.markup['entity'];
	Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function (env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
		/**
		 * Adds an inlined language to markup.
		 *
		 * An example of an inlined language is CSS with `<style>` tags.
		 *
		 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
		 * case insensitive.
		 * @param {string} lang The language key.
		 * @example
		 * addInlined('style', 'css');
		 */
		value: function addInlined(tagName, lang) {
			var includedCdataInside = {};
			includedCdataInside['language-' + lang] = {
				pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
				lookbehind: true,
				inside: Prism.languages[lang]
			};
			includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

			var inside = {
				'included-cdata': {
					pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
					inside: includedCdataInside
				}
			};
			inside['language-' + lang] = {
				pattern: /[\s\S]+/,
				inside: Prism.languages[lang]
			};

			var def = {};
			def[tagName] = {
				pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
				lookbehind: true,
				greedy: true,
				inside: inside
			};

			Prism.languages.insertBefore('markup', 'cdata', def);
		}
	});
	Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
		/**
		 * Adds an pattern to highlight languages embedded in HTML attributes.
		 *
		 * An example of an inlined language is CSS with `style` attributes.
		 *
		 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
		 * case insensitive.
		 * @param {string} lang The language key.
		 * @example
		 * addAttribute('style', 'css');
		 */
		value: function (attrName, lang) {
			Prism.languages.markup.tag.inside['special-attr'].push({
				pattern: RegExp(
					/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
					'i'
				),
				lookbehind: true,
				inside: {
					'attr-name': /^[^\s=]+/,
					'attr-value': {
						pattern: /=[\s\S]+/,
						inside: {
							'value': {
								pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
								lookbehind: true,
								alias: [lang, 'language-' + lang],
								inside: Prism.languages[lang]
							},
							'punctuation': [
								{
									pattern: /^=/,
									alias: 'attr-equals'
								},
								/"|'/
							]
						}
					}
				}
			});
		}
	});

	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;

	Prism.languages.xml = Prism.languages.extend('markup', {});
	Prism.languages.ssml = Prism.languages.xml;
	Prism.languages.atom = Prism.languages.xml;
	Prism.languages.rss = Prism.languages.xml;


	/* **********************************************
	     Begin prism-css.js
	********************************************** */

	(function (Prism) {

		var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

		Prism.languages.css = {
			'comment': /\/\*[\s\S]*?\*\//,
			'atrule': {
				pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
				inside: {
					'rule': /^@[\w-]+/,
					'selector-function-argument': {
						pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
						lookbehind: true,
						alias: 'selector'
					},
					'keyword': {
						pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
						lookbehind: true
					}
					// See rest below
				}
			},
			'url': {
				// https://drafts.csswg.org/css-values-3/#urls
				pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
				greedy: true,
				inside: {
					'function': /^url/i,
					'punctuation': /^\(|\)$/,
					'string': {
						pattern: RegExp('^' + string.source + '$'),
						alias: 'url'
					}
				}
			},
			'selector': {
				pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
				lookbehind: true
			},
			'string': {
				pattern: string,
				greedy: true
			},
			'property': {
				pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
				lookbehind: true
			},
			'important': /!important\b/i,
			'function': {
				pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
				lookbehind: true
			},
			'punctuation': /[(){};:,]/
		};

		Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

		var markup = Prism.languages.markup;
		if (markup) {
			markup.tag.addInlined('style', 'css');
			markup.tag.addAttribute('style', 'css');
		}

	}(Prism));


	/* **********************************************
	     Begin prism-clike.js
	********************************************** */

	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
				lookbehind: true,
				greedy: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}
		],
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: {
				'punctuation': /[.\\]/
			}
		},
		'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		'boolean': /\b(?:false|true)\b/,
		'function': /\b\w+(?=\()/,
		'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		'punctuation': /[{}[\];(),.:]/
	};


	/* **********************************************
	     Begin prism-javascript.js
	********************************************** */

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'class-name': [
			Prism.languages.clike['class-name'],
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
				lookbehind: true
			}
		],
		'keyword': [
			{
				pattern: /((?:^|\})\s*)catch\b/,
				lookbehind: true
			},
			{
				pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
				lookbehind: true
			},
		],
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
		'number': {
			pattern: RegExp(
				/(^|[^\w$])/.source +
				'(?:' +
				(
					// constant
					/NaN|Infinity/.source +
					'|' +
					// binary integer
					/0[bB][01]+(?:_[01]+)*n?/.source +
					'|' +
					// octal integer
					/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
					'|' +
					// hexadecimal integer
					/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
					'|' +
					// decimal bigint
					/\d+(?:_\d+)*n/.source +
					'|' +
					// decimal number (integer or float) but no bigint
					/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
				) +
				')' +
				/(?![\w$])/.source
			),
			lookbehind: true
		},
		'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
	});

	Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: RegExp(
				// lookbehind
				// eslint-disable-next-line regexp/no-dupe-characters-character-class
				/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
				// Regex pattern:
				// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
				// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
				// with the only syntax, so we have to define 2 different regex patterns.
				/\//.source +
				'(?:' +
				/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
				'|' +
				// `v` flag syntax. This supports 3 levels of nested character classes.
				/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
				')' +
				// lookahead
				/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'regex-source': {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: true,
					alias: 'language-regex',
					inside: Prism.languages.regex
				},
				'regex-delimiter': /^\/|\/$/,
				'regex-flags': /^[a-z]+$/,
			}
		},
		// This must be declared before keyword because we use "function" inside the look-forward
		'function-variable': {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: 'function'
		},
		'parameter': [
			{
				pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			}
		],
		'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'hashbang': {
			pattern: /^#!.*/,
			greedy: true,
			alias: 'comment'
		},
		'template-string': {
			pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: true,
			inside: {
				'template-punctuation': {
					pattern: /^`|`$/,
					alias: 'string'
				},
				'interpolation': {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: true,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		},
		'string-property': {
			pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
			lookbehind: true,
			greedy: true,
			alias: 'property'
		}
	});

	Prism.languages.insertBefore('javascript', 'operator', {
		'literal-property': {
			pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
			lookbehind: true,
			alias: 'property'
		},
	});

	if (Prism.languages.markup) {
		Prism.languages.markup.tag.addInlined('script', 'javascript');

		// add attribute support for all DOM events.
		// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
		Prism.languages.markup.tag.addAttribute(
			/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
			'javascript'
		);
	}

	Prism.languages.js = Prism.languages.javascript;


	/* **********************************************
	     Begin prism-file-highlight.js
	********************************************** */

	(function () {

		if (typeof Prism === 'undefined' || typeof document === 'undefined') {
			return;
		}

		// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
		}

		var LOADING_MESSAGE = 'Loading…';
		var FAILURE_MESSAGE = function (status, message) {
			return '✖ Error ' + status + ' while fetching file: ' + message;
		};
		var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

		var EXTENSIONS = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		var STATUS_ATTR = 'data-src-status';
		var STATUS_LOADING = 'loading';
		var STATUS_LOADED = 'loaded';
		var STATUS_FAILED = 'failed';

		var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
			+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

		/**
		 * Loads the given file.
		 *
		 * @param {string} src The URL or path of the source file to load.
		 * @param {(result: string) => void} success
		 * @param {(reason: string) => void} error
		 */
		function loadFile(src, success, error) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status < 400 && xhr.responseText) {
						success(xhr.responseText);
					} else {
						if (xhr.status >= 400) {
							error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
						} else {
							error(FAILURE_EMPTY_MESSAGE);
						}
					}
				}
			};
			xhr.send(null);
		}

		/**
		 * Parses the given range.
		 *
		 * This returns a range with inclusive ends.
		 *
		 * @param {string | null | undefined} range
		 * @returns {[number, number | undefined] | undefined}
		 */
		function parseRange(range) {
			var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
			if (m) {
				var start = Number(m[1]);
				var comma = m[2];
				var end = m[3];

				if (!comma) {
					return [start, start];
				}
				if (!end) {
					return [start, undefined];
				}
				return [start, Number(end)];
			}
			return undefined;
		}

		Prism.hooks.add('before-highlightall', function (env) {
			env.selector += ', ' + SELECTOR;
		});

		Prism.hooks.add('before-sanity-check', function (env) {
			var pre = /** @type {HTMLPreElement} */ (env.element);
			if (pre.matches(SELECTOR)) {
				env.code = ''; // fast-path the whole thing and go to complete

				pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

				// add code element with loading message
				var code = pre.appendChild(document.createElement('CODE'));
				code.textContent = LOADING_MESSAGE;

				var src = pre.getAttribute('data-src');

				var language = env.language;
				if (language === 'none') {
					// the language might be 'none' because there is no language set;
					// in this case, we want to use the extension as the language
					var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
					language = EXTENSIONS[extension] || extension;
				}

				// set language classes
				Prism.util.setLanguage(code, language);
				Prism.util.setLanguage(pre, language);

				// preload the language
				var autoloader = Prism.plugins.autoloader;
				if (autoloader) {
					autoloader.loadLanguages(language);
				}

				// load file
				loadFile(
					src,
					function (text) {
						// mark as loaded
						pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

						// handle data-range
						var range = parseRange(pre.getAttribute('data-range'));
						if (range) {
							var lines = text.split(/\r\n?|\n/g);

							// the range is one-based and inclusive on both ends
							var start = range[0];
							var end = range[1] == null ? lines.length : range[1];

							if (start < 0) { start += lines.length; }
							start = Math.max(0, Math.min(start - 1, lines.length));
							if (end < 0) { end += lines.length; }
							end = Math.max(0, Math.min(end, lines.length));

							text = lines.slice(start, end).join('\n');

							// add data-start for line numbers
							if (!pre.hasAttribute('data-start')) {
								pre.setAttribute('data-start', String(start + 1));
							}
						}

						// highlight code
						code.textContent = text;
						Prism.highlightElement(code);
					},
					function (error) {
						// mark as failed
						pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

						code.textContent = error;
					}
				);
			}
		});

		Prism.plugins.fileHighlight = {
			/**
			 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
			 *
			 * Note: Elements which are already loaded or currently loading will not be touched by this method.
			 *
			 * @param {ParentNode} [container=document]
			 */
			highlight: function highlight(container) {
				var elements = (container || document).querySelectorAll(SELECTOR);

				for (var i = 0, element; (element = elements[i++]);) {
					Prism.highlightElement(element);
				}
			}
		};

		var logged = false;
		/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
		Prism.fileHighlight = function () {
			if (!logged) {
				console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
				logged = true;
			}
			Prism.plugins.fileHighlight.highlight.apply(this, arguments);
		};

	}()); 
} (prism));

var components = {exports: {}};

(function (module) {
	var components = {"core":{"meta":{"path":"components/prism-core.js","option":"mandatory"},"core":"Core"},"themes":{"meta":{"path":"themes/{id}.css","link":"index.html?theme={id}","exclusive":true},"prism":{"title":"Default","option":"default"},"prism-dark":"Dark","prism-funky":"Funky","prism-okaidia":{"title":"Okaidia","owner":"ocodia"},"prism-twilight":{"title":"Twilight","owner":"remybach"},"prism-coy":{"title":"Coy","owner":"tshedor"},"prism-solarizedlight":{"title":"Solarized Light","owner":"hectormatos2011 "},"prism-tomorrow":{"title":"Tomorrow Night","owner":"Rosey"}},"languages":{"meta":{"path":"components/prism-{id}","noCSS":true,"examplesPath":"examples/prism-{id}","addCheckAll":true},"markup":{"title":"Markup","alias":["html","xml","svg","mathml","ssml","atom","rss"],"aliasTitles":{"html":"HTML","xml":"XML","svg":"SVG","mathml":"MathML","ssml":"SSML","atom":"Atom","rss":"RSS"},"option":"default"},"css":{"title":"CSS","option":"default","modify":"markup"},"clike":{"title":"C-like","option":"default"},"javascript":{"title":"JavaScript","require":"clike","modify":"markup","optional":"regex","alias":"js","option":"default"},"abap":{"title":"ABAP","owner":"dellagustin"},"abnf":{"title":"ABNF","owner":"RunDevelopment"},"actionscript":{"title":"ActionScript","require":"javascript","modify":"markup","owner":"Golmote"},"ada":{"title":"Ada","owner":"Lucretia"},"agda":{"title":"Agda","owner":"xy-ren"},"al":{"title":"AL","owner":"RunDevelopment"},"antlr4":{"title":"ANTLR4","alias":"g4","owner":"RunDevelopment"},"apacheconf":{"title":"Apache Configuration","owner":"GuiTeK"},"apex":{"title":"Apex","require":["clike","sql"],"owner":"RunDevelopment"},"apl":{"title":"APL","owner":"ngn"},"applescript":{"title":"AppleScript","owner":"Golmote"},"aql":{"title":"AQL","owner":"RunDevelopment"},"arduino":{"title":"Arduino","require":"cpp","alias":"ino","owner":"dkern"},"arff":{"title":"ARFF","owner":"Golmote"},"armasm":{"title":"ARM Assembly","alias":"arm-asm","owner":"RunDevelopment"},"arturo":{"title":"Arturo","alias":"art","optional":["bash","css","javascript","markup","markdown","sql"],"owner":"drkameleon"},"asciidoc":{"alias":"adoc","title":"AsciiDoc","owner":"Golmote"},"aspnet":{"title":"ASP.NET (C#)","require":["markup","csharp"],"owner":"nauzilus"},"asm6502":{"title":"6502 Assembly","owner":"kzurawel"},"asmatmel":{"title":"Atmel AVR Assembly","owner":"cerkit"},"autohotkey":{"title":"AutoHotkey","owner":"aviaryan"},"autoit":{"title":"AutoIt","owner":"Golmote"},"avisynth":{"title":"AviSynth","alias":"avs","owner":"Zinfidel"},"avro-idl":{"title":"Avro IDL","alias":"avdl","owner":"RunDevelopment"},"awk":{"title":"AWK","alias":"gawk","aliasTitles":{"gawk":"GAWK"},"owner":"RunDevelopment"},"bash":{"title":"Bash","alias":["sh","shell"],"aliasTitles":{"sh":"Shell","shell":"Shell"},"owner":"zeitgeist87"},"basic":{"title":"BASIC","owner":"Golmote"},"batch":{"title":"Batch","owner":"Golmote"},"bbcode":{"title":"BBcode","alias":"shortcode","aliasTitles":{"shortcode":"Shortcode"},"owner":"RunDevelopment"},"bbj":{"title":"BBj","owner":"hyyan"},"bicep":{"title":"Bicep","owner":"johnnyreilly"},"birb":{"title":"Birb","require":"clike","owner":"Calamity210"},"bison":{"title":"Bison","require":"c","owner":"Golmote"},"bnf":{"title":"BNF","alias":"rbnf","aliasTitles":{"rbnf":"RBNF"},"owner":"RunDevelopment"},"bqn":{"title":"BQN","owner":"yewscion"},"brainfuck":{"title":"Brainfuck","owner":"Golmote"},"brightscript":{"title":"BrightScript","owner":"RunDevelopment"},"bro":{"title":"Bro","owner":"wayward710"},"bsl":{"title":"BSL (1C:Enterprise)","alias":"oscript","aliasTitles":{"oscript":"OneScript"},"owner":"Diversus23"},"c":{"title":"C","require":"clike","owner":"zeitgeist87"},"csharp":{"title":"C#","require":"clike","alias":["cs","dotnet"],"owner":"mvalipour"},"cpp":{"title":"C++","require":"c","owner":"zeitgeist87"},"cfscript":{"title":"CFScript","require":"clike","alias":"cfc","owner":"mjclemente"},"chaiscript":{"title":"ChaiScript","require":["clike","cpp"],"owner":"RunDevelopment"},"cil":{"title":"CIL","owner":"sbrl"},"cilkc":{"title":"Cilk/C","require":"c","alias":"cilk-c","owner":"OpenCilk"},"cilkcpp":{"title":"Cilk/C++","require":"cpp","alias":["cilk-cpp","cilk"],"owner":"OpenCilk"},"clojure":{"title":"Clojure","owner":"troglotit"},"cmake":{"title":"CMake","owner":"mjrogozinski"},"cobol":{"title":"COBOL","owner":"RunDevelopment"},"coffeescript":{"title":"CoffeeScript","require":"javascript","alias":"coffee","owner":"R-osey"},"concurnas":{"title":"Concurnas","alias":"conc","owner":"jasontatton"},"csp":{"title":"Content-Security-Policy","owner":"ScottHelme"},"cooklang":{"title":"Cooklang","owner":"ahue"},"coq":{"title":"Coq","owner":"RunDevelopment"},"crystal":{"title":"Crystal","require":"ruby","owner":"MakeNowJust"},"css-extras":{"title":"CSS Extras","require":"css","modify":"css","owner":"milesj"},"csv":{"title":"CSV","owner":"RunDevelopment"},"cue":{"title":"CUE","owner":"RunDevelopment"},"cypher":{"title":"Cypher","owner":"RunDevelopment"},"d":{"title":"D","require":"clike","owner":"Golmote"},"dart":{"title":"Dart","require":"clike","owner":"Golmote"},"dataweave":{"title":"DataWeave","owner":"machaval"},"dax":{"title":"DAX","owner":"peterbud"},"dhall":{"title":"Dhall","owner":"RunDevelopment"},"diff":{"title":"Diff","owner":"uranusjr"},"django":{"title":"Django/Jinja2","require":"markup-templating","alias":"jinja2","owner":"romanvm"},"dns-zone-file":{"title":"DNS zone file","owner":"RunDevelopment","alias":"dns-zone"},"docker":{"title":"Docker","alias":"dockerfile","owner":"JustinBeckwith"},"dot":{"title":"DOT (Graphviz)","alias":"gv","optional":"markup","owner":"RunDevelopment"},"ebnf":{"title":"EBNF","owner":"RunDevelopment"},"editorconfig":{"title":"EditorConfig","owner":"osipxd"},"eiffel":{"title":"Eiffel","owner":"Conaclos"},"ejs":{"title":"EJS","require":["javascript","markup-templating"],"owner":"RunDevelopment","alias":"eta","aliasTitles":{"eta":"Eta"}},"elixir":{"title":"Elixir","owner":"Golmote"},"elm":{"title":"Elm","owner":"zwilias"},"etlua":{"title":"Embedded Lua templating","require":["lua","markup-templating"],"owner":"RunDevelopment"},"erb":{"title":"ERB","require":["ruby","markup-templating"],"owner":"Golmote"},"erlang":{"title":"Erlang","owner":"Golmote"},"excel-formula":{"title":"Excel Formula","alias":["xlsx","xls"],"owner":"RunDevelopment"},"fsharp":{"title":"F#","require":"clike","owner":"simonreynolds7"},"factor":{"title":"Factor","owner":"catb0t"},"false":{"title":"False","owner":"edukisto"},"firestore-security-rules":{"title":"Firestore security rules","require":"clike","owner":"RunDevelopment"},"flow":{"title":"Flow","require":"javascript","owner":"Golmote"},"fortran":{"title":"Fortran","owner":"Golmote"},"ftl":{"title":"FreeMarker Template Language","require":"markup-templating","owner":"RunDevelopment"},"gml":{"title":"GameMaker Language","alias":"gamemakerlanguage","require":"clike","owner":"LiarOnce"},"gap":{"title":"GAP (CAS)","owner":"RunDevelopment"},"gcode":{"title":"G-code","owner":"RunDevelopment"},"gdscript":{"title":"GDScript","owner":"RunDevelopment"},"gedcom":{"title":"GEDCOM","owner":"Golmote"},"gettext":{"title":"gettext","alias":"po","owner":"RunDevelopment"},"gherkin":{"title":"Gherkin","owner":"hason"},"git":{"title":"Git","owner":"lgiraudel"},"glsl":{"title":"GLSL","require":"c","owner":"Golmote"},"gn":{"title":"GN","alias":"gni","owner":"RunDevelopment"},"linker-script":{"title":"GNU Linker Script","alias":"ld","owner":"RunDevelopment"},"go":{"title":"Go","require":"clike","owner":"arnehormann"},"go-module":{"title":"Go module","alias":"go-mod","owner":"RunDevelopment"},"gradle":{"title":"Gradle","require":"clike","owner":"zeabdelkhalek-badido18"},"graphql":{"title":"GraphQL","optional":"markdown","owner":"Golmote"},"groovy":{"title":"Groovy","require":"clike","owner":"robfletcher"},"haml":{"title":"Haml","require":"ruby","optional":["css","css-extras","coffeescript","erb","javascript","less","markdown","scss","textile"],"owner":"Golmote"},"handlebars":{"title":"Handlebars","require":"markup-templating","alias":["hbs","mustache"],"aliasTitles":{"mustache":"Mustache"},"owner":"Golmote"},"haskell":{"title":"Haskell","alias":"hs","owner":"bholst"},"haxe":{"title":"Haxe","require":"clike","optional":"regex","owner":"Golmote"},"hcl":{"title":"HCL","owner":"outsideris"},"hlsl":{"title":"HLSL","require":"c","owner":"RunDevelopment"},"hoon":{"title":"Hoon","owner":"matildepark"},"http":{"title":"HTTP","optional":["csp","css","hpkp","hsts","javascript","json","markup","uri"],"owner":"danielgtaylor"},"hpkp":{"title":"HTTP Public-Key-Pins","owner":"ScottHelme"},"hsts":{"title":"HTTP Strict-Transport-Security","owner":"ScottHelme"},"ichigojam":{"title":"IchigoJam","owner":"BlueCocoa"},"icon":{"title":"Icon","owner":"Golmote"},"icu-message-format":{"title":"ICU Message Format","owner":"RunDevelopment"},"idris":{"title":"Idris","alias":"idr","owner":"KeenS","require":"haskell"},"ignore":{"title":".ignore","owner":"osipxd","alias":["gitignore","hgignore","npmignore"],"aliasTitles":{"gitignore":".gitignore","hgignore":".hgignore","npmignore":".npmignore"}},"inform7":{"title":"Inform 7","owner":"Golmote"},"ini":{"title":"Ini","owner":"aviaryan"},"io":{"title":"Io","owner":"AlesTsurko"},"j":{"title":"J","owner":"Golmote"},"java":{"title":"Java","require":"clike","owner":"sherblot"},"javadoc":{"title":"JavaDoc","require":["markup","java","javadoclike"],"modify":"java","optional":"scala","owner":"RunDevelopment"},"javadoclike":{"title":"JavaDoc-like","modify":["java","javascript","php"],"owner":"RunDevelopment"},"javastacktrace":{"title":"Java stack trace","owner":"RunDevelopment"},"jexl":{"title":"Jexl","owner":"czosel"},"jolie":{"title":"Jolie","require":"clike","owner":"thesave"},"jq":{"title":"JQ","owner":"RunDevelopment"},"jsdoc":{"title":"JSDoc","require":["javascript","javadoclike","typescript"],"modify":"javascript","optional":["actionscript","coffeescript"],"owner":"RunDevelopment"},"js-extras":{"title":"JS Extras","require":"javascript","modify":"javascript","optional":["actionscript","coffeescript","flow","n4js","typescript"],"owner":"RunDevelopment"},"json":{"title":"JSON","alias":"webmanifest","aliasTitles":{"webmanifest":"Web App Manifest"},"owner":"CupOfTea696"},"json5":{"title":"JSON5","require":"json","owner":"RunDevelopment"},"jsonp":{"title":"JSONP","require":"json","owner":"RunDevelopment"},"jsstacktrace":{"title":"JS stack trace","owner":"sbrl"},"js-templates":{"title":"JS Templates","require":"javascript","modify":"javascript","optional":["css","css-extras","graphql","markdown","markup","sql"],"owner":"RunDevelopment"},"julia":{"title":"Julia","owner":"cdagnino"},"keepalived":{"title":"Keepalived Configure","owner":"dev-itsheng"},"keyman":{"title":"Keyman","owner":"mcdurdin"},"kotlin":{"title":"Kotlin","alias":["kt","kts"],"aliasTitles":{"kts":"Kotlin Script"},"require":"clike","owner":"Golmote"},"kumir":{"title":"KuMir (КуМир)","alias":"kum","owner":"edukisto"},"kusto":{"title":"Kusto","owner":"RunDevelopment"},"latex":{"title":"LaTeX","alias":["tex","context"],"aliasTitles":{"tex":"TeX","context":"ConTeXt"},"owner":"japborst"},"latte":{"title":"Latte","require":["clike","markup-templating","php"],"owner":"nette"},"less":{"title":"Less","require":"css","optional":"css-extras","owner":"Golmote"},"lilypond":{"title":"LilyPond","require":"scheme","alias":"ly","owner":"RunDevelopment"},"liquid":{"title":"Liquid","require":"markup-templating","owner":"cinhtau"},"lisp":{"title":"Lisp","alias":["emacs","elisp","emacs-lisp"],"owner":"JuanCaicedo"},"livescript":{"title":"LiveScript","owner":"Golmote"},"llvm":{"title":"LLVM IR","owner":"porglezomp"},"log":{"title":"Log file","optional":"javastacktrace","owner":"RunDevelopment"},"lolcode":{"title":"LOLCODE","owner":"Golmote"},"lua":{"title":"Lua","owner":"Golmote"},"magma":{"title":"Magma (CAS)","owner":"RunDevelopment"},"makefile":{"title":"Makefile","owner":"Golmote"},"markdown":{"title":"Markdown","require":"markup","optional":"yaml","alias":"md","owner":"Golmote"},"markup-templating":{"title":"Markup templating","require":"markup","owner":"Golmote"},"mata":{"title":"Mata","owner":"RunDevelopment"},"matlab":{"title":"MATLAB","owner":"Golmote"},"maxscript":{"title":"MAXScript","owner":"RunDevelopment"},"mel":{"title":"MEL","owner":"Golmote"},"mermaid":{"title":"Mermaid","owner":"RunDevelopment"},"metafont":{"title":"METAFONT","owner":"LaeriExNihilo"},"mizar":{"title":"Mizar","owner":"Golmote"},"mongodb":{"title":"MongoDB","owner":"airs0urce","require":"javascript"},"monkey":{"title":"Monkey","owner":"Golmote"},"moonscript":{"title":"MoonScript","alias":"moon","owner":"RunDevelopment"},"n1ql":{"title":"N1QL","owner":"TMWilds"},"n4js":{"title":"N4JS","require":"javascript","optional":"jsdoc","alias":"n4jsd","owner":"bsmith-n4"},"nand2tetris-hdl":{"title":"Nand To Tetris HDL","owner":"stephanmax"},"naniscript":{"title":"Naninovel Script","owner":"Elringus","alias":"nani"},"nasm":{"title":"NASM","owner":"rbmj"},"neon":{"title":"NEON","owner":"nette"},"nevod":{"title":"Nevod","owner":"nezaboodka"},"nginx":{"title":"nginx","owner":"volado"},"nim":{"title":"Nim","owner":"Golmote"},"nix":{"title":"Nix","owner":"Golmote"},"nsis":{"title":"NSIS","owner":"idleberg"},"objectivec":{"title":"Objective-C","require":"c","alias":"objc","owner":"uranusjr"},"ocaml":{"title":"OCaml","owner":"Golmote"},"odin":{"title":"Odin","owner":"edukisto"},"opencl":{"title":"OpenCL","require":"c","modify":["c","cpp"],"owner":"Milania1"},"openqasm":{"title":"OpenQasm","alias":"qasm","owner":"RunDevelopment"},"oz":{"title":"Oz","owner":"Golmote"},"parigp":{"title":"PARI/GP","owner":"Golmote"},"parser":{"title":"Parser","require":"markup","owner":"Golmote"},"pascal":{"title":"Pascal","alias":"objectpascal","aliasTitles":{"objectpascal":"Object Pascal"},"owner":"Golmote"},"pascaligo":{"title":"Pascaligo","owner":"DefinitelyNotAGoat"},"psl":{"title":"PATROL Scripting Language","owner":"bertysentry"},"pcaxis":{"title":"PC-Axis","alias":"px","owner":"RunDevelopment"},"peoplecode":{"title":"PeopleCode","alias":"pcode","owner":"RunDevelopment"},"perl":{"title":"Perl","owner":"Golmote"},"php":{"title":"PHP","require":"markup-templating","owner":"milesj"},"phpdoc":{"title":"PHPDoc","require":["php","javadoclike"],"modify":"php","owner":"RunDevelopment"},"php-extras":{"title":"PHP Extras","require":"php","modify":"php","owner":"milesj"},"plant-uml":{"title":"PlantUML","alias":"plantuml","owner":"RunDevelopment"},"plsql":{"title":"PL/SQL","require":"sql","owner":"Golmote"},"powerquery":{"title":"PowerQuery","alias":["pq","mscript"],"owner":"peterbud"},"powershell":{"title":"PowerShell","owner":"nauzilus"},"processing":{"title":"Processing","require":"clike","owner":"Golmote"},"prolog":{"title":"Prolog","owner":"Golmote"},"promql":{"title":"PromQL","owner":"arendjr"},"properties":{"title":".properties","owner":"Golmote"},"protobuf":{"title":"Protocol Buffers","require":"clike","owner":"just-boris"},"pug":{"title":"Pug","require":["markup","javascript"],"optional":["coffeescript","ejs","handlebars","less","livescript","markdown","scss","stylus","twig"],"owner":"Golmote"},"puppet":{"title":"Puppet","owner":"Golmote"},"pure":{"title":"Pure","optional":["c","cpp","fortran"],"owner":"Golmote"},"purebasic":{"title":"PureBasic","require":"clike","alias":"pbfasm","owner":"HeX0R101"},"purescript":{"title":"PureScript","require":"haskell","alias":"purs","owner":"sriharshachilakapati"},"python":{"title":"Python","alias":"py","owner":"multipetros"},"qsharp":{"title":"Q#","require":"clike","alias":"qs","owner":"fedonman"},"q":{"title":"Q (kdb+ database)","owner":"Golmote"},"qml":{"title":"QML","require":"javascript","owner":"RunDevelopment"},"qore":{"title":"Qore","require":"clike","owner":"temnroegg"},"r":{"title":"R","owner":"Golmote"},"racket":{"title":"Racket","require":"scheme","alias":"rkt","owner":"RunDevelopment"},"cshtml":{"title":"Razor C#","alias":"razor","require":["markup","csharp"],"optional":["css","css-extras","javascript","js-extras"],"owner":"RunDevelopment"},"jsx":{"title":"React JSX","require":["markup","javascript"],"optional":["jsdoc","js-extras","js-templates"],"owner":"vkbansal"},"tsx":{"title":"React TSX","require":["jsx","typescript"]},"reason":{"title":"Reason","require":"clike","owner":"Golmote"},"regex":{"title":"Regex","owner":"RunDevelopment"},"rego":{"title":"Rego","owner":"JordanSh"},"renpy":{"title":"Ren'py","alias":"rpy","owner":"HyuchiaDiego"},"rescript":{"title":"ReScript","alias":"res","owner":"vmarcosp"},"rest":{"title":"reST (reStructuredText)","owner":"Golmote"},"rip":{"title":"Rip","owner":"ravinggenius"},"roboconf":{"title":"Roboconf","owner":"Golmote"},"robotframework":{"title":"Robot Framework","alias":"robot","owner":"RunDevelopment"},"ruby":{"title":"Ruby","require":"clike","alias":"rb","owner":"samflores"},"rust":{"title":"Rust","owner":"Golmote"},"sas":{"title":"SAS","optional":["groovy","lua","sql"],"owner":"Golmote"},"sass":{"title":"Sass (Sass)","require":"css","optional":"css-extras","owner":"Golmote"},"scss":{"title":"Sass (SCSS)","require":"css","optional":"css-extras","owner":"MoOx"},"scala":{"title":"Scala","require":"java","owner":"jozic"},"scheme":{"title":"Scheme","owner":"bacchus123"},"shell-session":{"title":"Shell session","require":"bash","alias":["sh-session","shellsession"],"owner":"RunDevelopment"},"smali":{"title":"Smali","owner":"RunDevelopment"},"smalltalk":{"title":"Smalltalk","owner":"Golmote"},"smarty":{"title":"Smarty","require":"markup-templating","optional":"php","owner":"Golmote"},"sml":{"title":"SML","alias":"smlnj","aliasTitles":{"smlnj":"SML/NJ"},"owner":"RunDevelopment"},"solidity":{"title":"Solidity (Ethereum)","alias":"sol","require":"clike","owner":"glachaud"},"solution-file":{"title":"Solution file","alias":"sln","owner":"RunDevelopment"},"soy":{"title":"Soy (Closure Template)","require":"markup-templating","owner":"Golmote"},"sparql":{"title":"SPARQL","require":"turtle","owner":"Triply-Dev","alias":"rq"},"splunk-spl":{"title":"Splunk SPL","owner":"RunDevelopment"},"sqf":{"title":"SQF: Status Quo Function (Arma 3)","require":"clike","owner":"RunDevelopment"},"sql":{"title":"SQL","owner":"multipetros"},"squirrel":{"title":"Squirrel","require":"clike","owner":"RunDevelopment"},"stan":{"title":"Stan","owner":"RunDevelopment"},"stata":{"title":"Stata Ado","require":["mata","java","python"],"owner":"RunDevelopment"},"iecst":{"title":"Structured Text (IEC 61131-3)","owner":"serhioromano"},"stylus":{"title":"Stylus","owner":"vkbansal"},"supercollider":{"title":"SuperCollider","alias":"sclang","owner":"RunDevelopment"},"swift":{"title":"Swift","owner":"chrischares"},"systemd":{"title":"Systemd configuration file","owner":"RunDevelopment"},"t4-templating":{"title":"T4 templating","owner":"RunDevelopment"},"t4-cs":{"title":"T4 Text Templates (C#)","require":["t4-templating","csharp"],"alias":"t4","owner":"RunDevelopment"},"t4-vb":{"title":"T4 Text Templates (VB)","require":["t4-templating","vbnet"],"owner":"RunDevelopment"},"tap":{"title":"TAP","owner":"isaacs","require":"yaml"},"tcl":{"title":"Tcl","owner":"PeterChaplin"},"tt2":{"title":"Template Toolkit 2","require":["clike","markup-templating"],"owner":"gflohr"},"textile":{"title":"Textile","require":"markup","optional":"css","owner":"Golmote"},"toml":{"title":"TOML","owner":"RunDevelopment"},"tremor":{"title":"Tremor","alias":["trickle","troy"],"owner":"darach","aliasTitles":{"trickle":"trickle","troy":"troy"}},"turtle":{"title":"Turtle","alias":"trig","aliasTitles":{"trig":"TriG"},"owner":"jakubklimek"},"twig":{"title":"Twig","require":"markup-templating","owner":"brandonkelly"},"typescript":{"title":"TypeScript","require":"javascript","optional":"js-templates","alias":"ts","owner":"vkbansal"},"typoscript":{"title":"TypoScript","alias":"tsconfig","aliasTitles":{"tsconfig":"TSConfig"},"owner":"dkern"},"unrealscript":{"title":"UnrealScript","alias":["uscript","uc"],"owner":"RunDevelopment"},"uorazor":{"title":"UO Razor Script","owner":"jaseowns"},"uri":{"title":"URI","alias":"url","aliasTitles":{"url":"URL"},"owner":"RunDevelopment"},"v":{"title":"V","require":"clike","owner":"taggon"},"vala":{"title":"Vala","require":"clike","optional":"regex","owner":"TemplarVolk"},"vbnet":{"title":"VB.Net","require":"basic","owner":"Bigsby"},"velocity":{"title":"Velocity","require":"markup","owner":"Golmote"},"verilog":{"title":"Verilog","owner":"a-rey"},"vhdl":{"title":"VHDL","owner":"a-rey"},"vim":{"title":"vim","owner":"westonganger"},"visual-basic":{"title":"Visual Basic","alias":["vb","vba"],"aliasTitles":{"vba":"VBA"},"owner":"Golmote"},"warpscript":{"title":"WarpScript","owner":"RunDevelopment"},"wasm":{"title":"WebAssembly","owner":"Golmote"},"web-idl":{"title":"Web IDL","alias":"webidl","owner":"RunDevelopment"},"wgsl":{"title":"WGSL","owner":"Dr4gonthree"},"wiki":{"title":"Wiki markup","require":"markup","owner":"Golmote"},"wolfram":{"title":"Wolfram language","alias":["mathematica","nb","wl"],"aliasTitles":{"mathematica":"Mathematica","nb":"Mathematica Notebook"},"owner":"msollami"},"wren":{"title":"Wren","owner":"clsource"},"xeora":{"title":"Xeora","require":"markup","alias":"xeoracube","aliasTitles":{"xeoracube":"XeoraCube"},"owner":"freakmaxi"},"xml-doc":{"title":"XML doc (.net)","require":"markup","modify":["csharp","fsharp","vbnet"],"owner":"RunDevelopment"},"xojo":{"title":"Xojo (REALbasic)","owner":"Golmote"},"xquery":{"title":"XQuery","require":"markup","owner":"Golmote"},"yaml":{"title":"YAML","alias":"yml","owner":"hason"},"yang":{"title":"YANG","owner":"RunDevelopment"},"zig":{"title":"Zig","owner":"RunDevelopment"}},"plugins":{"meta":{"path":"plugins/{id}/prism-{id}","link":"plugins/{id}/"},"line-highlight":{"title":"Line Highlight","description":"Highlights specific lines and/or line ranges."},"line-numbers":{"title":"Line Numbers","description":"Line number at the beginning of code lines.","owner":"kuba-kubula"},"show-invisibles":{"title":"Show Invisibles","description":"Show hidden characters such as tabs and line breaks.","optional":["autolinker","data-uri-highlight"]},"autolinker":{"title":"Autolinker","description":"Converts URLs and emails in code to clickable links. Parses Markdown links in comments."},"wpd":{"title":"WebPlatform Docs","description":"Makes tokens link to <a href=\"https://webplatform.github.io/docs/\">WebPlatform.org documentation</a>. The links open in a new tab."},"custom-class":{"title":"Custom Class","description":"This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.","owner":"dvkndn","noCSS":true},"file-highlight":{"title":"File Highlight","description":"Fetch external files and highlight them with Prism. Used on the Prism website itself.","noCSS":true},"show-language":{"title":"Show Language","description":"Display the highlighted language in code blocks (inline code does not show the label).","owner":"nauzilus","noCSS":true,"require":"toolbar"},"jsonp-highlight":{"title":"JSONP Highlight","description":"Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).","noCSS":true,"owner":"nauzilus"},"highlight-keywords":{"title":"Highlight Keywords","description":"Adds special CSS classes for each keyword for fine-grained highlighting.","owner":"vkbansal","noCSS":true},"remove-initial-line-feed":{"title":"Remove initial line feed","description":"Removes the initial line feed in code blocks.","owner":"Golmote","noCSS":true},"inline-color":{"title":"Inline color","description":"Adds a small inline preview for colors in style sheets.","require":"css-extras","owner":"RunDevelopment"},"previewers":{"title":"Previewers","description":"Previewers for angles, colors, gradients, easing and time.","require":"css-extras","owner":"Golmote"},"autoloader":{"title":"Autoloader","description":"Automatically loads the needed languages to highlight the code blocks.","owner":"Golmote","noCSS":true},"keep-markup":{"title":"Keep Markup","description":"Prevents custom markup from being dropped out during highlighting.","owner":"Golmote","optional":"normalize-whitespace","noCSS":true},"command-line":{"title":"Command Line","description":"Display a command line with a prompt and, optionally, the output/response from the commands.","owner":"chriswells0"},"unescaped-markup":{"title":"Unescaped Markup","description":"Write markup without having to escape anything."},"normalize-whitespace":{"title":"Normalize Whitespace","description":"Supports multiple operations to normalize whitespace in code blocks.","owner":"zeitgeist87","optional":"unescaped-markup","noCSS":true},"data-uri-highlight":{"title":"Data-URI Highlight","description":"Highlights data-URI contents.","owner":"Golmote","noCSS":true},"toolbar":{"title":"Toolbar","description":"Attach a toolbar for plugins to easily register buttons on the top of a code block.","owner":"mAAdhaTTah"},"copy-to-clipboard":{"title":"Copy to Clipboard Button","description":"Add a button that copies the code block to the clipboard when clicked.","owner":"mAAdhaTTah","require":"toolbar","noCSS":true},"download-button":{"title":"Download Button","description":"A button in the toolbar of a code block adding a convenient way to download a code file.","owner":"Golmote","require":"toolbar","noCSS":true},"match-braces":{"title":"Match braces","description":"Highlights matching braces.","owner":"RunDevelopment"},"diff-highlight":{"title":"Diff Highlight","description":"Highlights the code inside diff blocks.","owner":"RunDevelopment","require":"diff"},"filter-highlight-all":{"title":"Filter highlightAll","description":"Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.","owner":"RunDevelopment","noCSS":true},"treeview":{"title":"Treeview","description":"A language with special styles to highlight file system tree structures.","owner":"Golmote"}}};
	if (module.exports) { module.exports = components; } 
} (components));

var dependencies = {exports: {}};

(function (module) {

	/**
	 * @typedef {Object<string, ComponentCategory>} Components
	 * @typedef {Object<string, ComponentEntry | string>} ComponentCategory
	 *
	 * @typedef ComponentEntry
	 * @property {string} [title] The title of the component.
	 * @property {string} [owner] The GitHub user name of the owner.
	 * @property {boolean} [noCSS=false] Whether the component doesn't have style sheets which should also be loaded.
	 * @property {string | string[]} [alias] An optional list of aliases for the id of the component.
	 * @property {Object<string, string>} [aliasTitles] An optional map from an alias to its title.
	 *
	 * Aliases which are not in this map will the get title of the component.
	 * @property {string | string[]} [optional]
	 * @property {string | string[]} [require]
	 * @property {string | string[]} [modify]
	 */

	var getLoader = (function () {

		/**
		 * A function which does absolutely nothing.
		 *
		 * @type {any}
		 */
		var noop = function () { };

		/**
		 * Invokes the given callback for all elements of the given value.
		 *
		 * If the given value is an array, the callback will be invokes for all elements. If the given value is `null` or
		 * `undefined`, the callback will not be invoked. In all other cases, the callback will be invoked with the given
		 * value as parameter.
		 *
		 * @param {null | undefined | T | T[]} value
		 * @param {(value: T, index: number) => void} callbackFn
		 * @returns {void}
		 * @template T
		 */
		function forEach(value, callbackFn) {
			if (Array.isArray(value)) {
				value.forEach(callbackFn);
			} else if (value != null) {
				callbackFn(value, 0);
			}
		}

		/**
		 * Returns a new set for the given string array.
		 *
		 * @param {string[]} array
		 * @returns {StringSet}
		 *
		 * @typedef {Object<string, true>} StringSet
		 */
		function toSet(array) {
			/** @type {StringSet} */
			var set = {};
			for (var i = 0, l = array.length; i < l; i++) {
				set[array[i]] = true;
			}
			return set;
		}

		/**
		 * Creates a map of every components id to its entry.
		 *
		 * @param {Components} components
		 * @returns {EntryMap}
		 *
		 * @typedef {{ readonly [id: string]: Readonly<ComponentEntry> | undefined }} EntryMap
		 */
		function createEntryMap(components) {
			/** @type {Object<string, Readonly<ComponentEntry>>} */
			var map = {};

			for (var categoryName in components) {
				var category = components[categoryName];
				for (var id in category) {
					if (id != 'meta') {
						/** @type {ComponentEntry | string} */
						var entry = category[id];
						map[id] = typeof entry == 'string' ? { title: entry } : entry;
					}
				}
			}

			return map;
		}

		/**
		 * Creates a full dependencies map which includes all types of dependencies and their transitive dependencies.
		 *
		 * @param {EntryMap} entryMap
		 * @returns {DependencyResolver}
		 *
		 * @typedef {(id: string) => StringSet} DependencyResolver
		 */
		function createDependencyResolver(entryMap) {
			/** @type {Object<string, StringSet>} */
			var map = {};
			var _stackArray = [];

			/**
			 * Adds the dependencies of the given component to the dependency map.
			 *
			 * @param {string} id
			 * @param {string[]} stack
			 */
			function addToMap(id, stack) {
				if (id in map) {
					return;
				}

				stack.push(id);

				// check for circular dependencies
				var firstIndex = stack.indexOf(id);
				if (firstIndex < stack.length - 1) {
					throw new Error('Circular dependency: ' + stack.slice(firstIndex).join(' -> '));
				}

				/** @type {StringSet} */
				var dependencies = {};

				var entry = entryMap[id];
				if (entry) {
					/**
					 * This will add the direct dependency and all of its transitive dependencies to the set of
					 * dependencies of `entry`.
					 *
					 * @param {string} depId
					 * @returns {void}
					 */
					function handleDirectDependency(depId) {
						if (!(depId in entryMap)) {
							throw new Error(id + ' depends on an unknown component ' + depId);
						}
						if (depId in dependencies) {
							// if the given dependency is already in the set of deps, then so are its transitive deps
							return;
						}

						addToMap(depId, stack);
						dependencies[depId] = true;
						for (var transitiveDepId in map[depId]) {
							dependencies[transitiveDepId] = true;
						}
					}

					forEach(entry.require, handleDirectDependency);
					forEach(entry.optional, handleDirectDependency);
					forEach(entry.modify, handleDirectDependency);
				}

				map[id] = dependencies;

				stack.pop();
			}

			return function (id) {
				var deps = map[id];
				if (!deps) {
					addToMap(id, _stackArray);
					deps = map[id];
				}
				return deps;
			};
		}

		/**
		 * Returns a function which resolves the aliases of its given id of alias.
		 *
		 * @param {EntryMap} entryMap
		 * @returns {(idOrAlias: string) => string}
		 */
		function createAliasResolver(entryMap) {
			/** @type {Object<string, string> | undefined} */
			var map;

			return function (idOrAlias) {
				if (idOrAlias in entryMap) {
					return idOrAlias;
				} else {
					// only create the alias map if necessary
					if (!map) {
						map = {};

						for (var id in entryMap) {
							var entry = entryMap[id];
							forEach(entry && entry.alias, function (alias) {
								if (alias in map) {
									throw new Error(alias + ' cannot be alias for both ' + id + ' and ' + map[alias]);
								}
								if (alias in entryMap) {
									throw new Error(alias + ' cannot be alias of ' + id + ' because it is a component.');
								}
								map[alias] = id;
							});
						}
					}
					return map[idOrAlias] || idOrAlias;
				}
			};
		}

		/**
		 * @typedef LoadChainer
		 * @property {(before: T, after: () => T) => T} series
		 * @property {(values: T[]) => T} parallel
		 * @template T
		 */

		/**
		 * Creates an implicit DAG from the given components and dependencies and call the given `loadComponent` for each
		 * component in topological order.
		 *
		 * @param {DependencyResolver} dependencyResolver
		 * @param {StringSet} ids
		 * @param {(id: string) => T} loadComponent
		 * @param {LoadChainer<T>} [chainer]
		 * @returns {T}
		 * @template T
		 */
		function loadComponentsInOrder(dependencyResolver, ids, loadComponent, chainer) {
			var series = chainer ? chainer.series : undefined;
			var parallel = chainer ? chainer.parallel : noop;

			/** @type {Object<string, T>} */
			var cache = {};

			/**
			 * A set of ids of nodes which are not depended upon by any other node in the graph.
			 *
			 * @type {StringSet}
			 */
			var ends = {};

			/**
			 * Loads the given component and its dependencies or returns the cached value.
			 *
			 * @param {string} id
			 * @returns {T}
			 */
			function handleId(id) {
				if (id in cache) {
					return cache[id];
				}

				// assume that it's an end
				// if it isn't, it will be removed later
				ends[id] = true;

				// all dependencies of the component in the given ids
				var dependsOn = [];
				for (var depId in dependencyResolver(id)) {
					if (depId in ids) {
						dependsOn.push(depId);
					}
				}

				/**
				 * The value to be returned.
				 *
				 * @type {T}
				 */
				var value;

				if (dependsOn.length === 0) {
					value = loadComponent(id);
				} else {
					var depsValue = parallel(dependsOn.map(function (depId) {
						var value = handleId(depId);
						// none of the dependencies can be ends
						delete ends[depId];
						return value;
					}));
					if (series) {
						// the chainer will be responsibly for calling the function calling loadComponent
						value = series(depsValue, function () { return loadComponent(id); });
					} else {
						// we don't have a chainer, so we call loadComponent ourselves
						loadComponent(id);
					}
				}

				// cache and return
				return cache[id] = value;
			}

			for (var id in ids) {
				handleId(id);
			}

			/** @type {T[]} */
			var endValues = [];
			for (var endId in ends) {
				endValues.push(cache[endId]);
			}
			return parallel(endValues);
		}

		/**
		 * Returns whether the given object has any keys.
		 *
		 * @param {object} obj
		 */
		function hasKeys(obj) {
			for (var key in obj) {
				return true;
			}
			return false;
		}

		/**
		 * Returns an object which provides methods to get the ids of the components which have to be loaded (`getIds`) and
		 * a way to efficiently load them in synchronously and asynchronous contexts (`load`).
		 *
		 * The set of ids to be loaded is a superset of `load`. If some of these ids are in `loaded`, the corresponding
		 * components will have to reloaded.
		 *
		 * The ids in `load` and `loaded` may be in any order and can contain duplicates.
		 *
		 * @param {Components} components
		 * @param {string[]} load
		 * @param {string[]} [loaded=[]] A list of already loaded components.
		 *
		 * If a component is in this list, then all of its requirements will also be assumed to be in the list.
		 * @returns {Loader}
		 *
		 * @typedef Loader
		 * @property {() => string[]} getIds A function to get all ids of the components to load.
		 *
		 * The returned ids will be duplicate-free, alias-free and in load order.
		 * @property {LoadFunction} load A functional interface to load components.
		 *
		 * @typedef {<T> (loadComponent: (id: string) => T, chainer?: LoadChainer<T>) => T} LoadFunction
		 * A functional interface to load components.
		 *
		 * The `loadComponent` function will be called for every component in the order in which they have to be loaded.
		 *
		 * The `chainer` is useful for asynchronous loading and its `series` and `parallel` functions can be thought of as
		 * `Promise#then` and `Promise.all`.
		 *
		 * @example
		 * load(id => { loadComponent(id); }); // returns undefined
		 *
		 * await load(
		 *     id => loadComponentAsync(id), // returns a Promise for each id
		 *     {
		 *         series: async (before, after) => {
		 *             await before;
		 *             await after();
		 *         },
		 *         parallel: async (values) => {
		 *             await Promise.all(values);
		 *         }
		 *     }
		 * );
		 */
		function getLoader(components, load, loaded) {
			var entryMap = createEntryMap(components);
			var resolveAlias = createAliasResolver(entryMap);

			load = load.map(resolveAlias);
			loaded = (loaded || []).map(resolveAlias);

			var loadSet = toSet(load);
			var loadedSet = toSet(loaded);

			// add requirements

			load.forEach(addRequirements);
			function addRequirements(id) {
				var entry = entryMap[id];
				forEach(entry && entry.require, function (reqId) {
					if (!(reqId in loadedSet)) {
						loadSet[reqId] = true;
						addRequirements(reqId);
					}
				});
			}

			// add components to reload

			// A component x in `loaded` has to be reloaded if
			//  1) a component in `load` modifies x.
			//  2) x depends on a component in `load`.
			// The above two condition have to be applied until nothing changes anymore.

			var dependencyResolver = createDependencyResolver(entryMap);

			/** @type {StringSet} */
			var loadAdditions = loadSet;
			/** @type {StringSet} */
			var newIds;
			while (hasKeys(loadAdditions)) {
				newIds = {};

				// condition 1)
				for (var loadId in loadAdditions) {
					var entry = entryMap[loadId];
					forEach(entry && entry.modify, function (modId) {
						if (modId in loadedSet) {
							newIds[modId] = true;
						}
					});
				}

				// condition 2)
				for (var loadedId in loadedSet) {
					if (!(loadedId in loadSet)) {
						for (var depId in dependencyResolver(loadedId)) {
							if (depId in loadSet) {
								newIds[loadedId] = true;
								break;
							}
						}
					}
				}

				loadAdditions = newIds;
				for (var newId in loadAdditions) {
					loadSet[newId] = true;
				}
			}

			/** @type {Loader} */
			var loader = {
				getIds: function () {
					var ids = [];
					loader.load(function (id) {
						ids.push(id);
					});
					return ids;
				},
				load: function (loadComponent, chainer) {
					return loadComponentsInOrder(dependencyResolver, loadSet, loadComponent, chainer);
				}
			};

			return loader;
		}

		return getLoader;

	}());

	{
		module.exports = getLoader;
	} 
} (dependencies));

const ASTRO_COLOR_REPLACEMENTS = {
  "--astro-code-foreground": "--astro-code-color-text",
  "--astro-code-background": "--astro-code-color-background"
};
new RegExp(
  `${Object.keys(ASTRO_COLOR_REPLACEMENTS).join("|")}`,
  "g"
);

const markdownConfigDefaults = {
  syntaxHighlight: "shiki",
  shikiConfig: {
    langs: [],
    theme: "github-dark",
    themes: {},
    wrap: false,
    transformers: []
  },
  remarkPlugins: [],
  rehypePlugins: [],
  remarkRehype: {},
  gfm: true,
  smartypants: true
};
Boolean(process.env.ASTRO_PERFORMANCE_BENCHMARK);

const StringSchema = z.object({
  type: z.literal("string"),
  optional: z.boolean().optional(),
  default: z.string().optional(),
  max: z.number().optional(),
  min: z.number().min(0).optional(),
  length: z.number().optional(),
  url: z.boolean().optional(),
  includes: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional()
});
const NumberSchema = z.object({
  type: z.literal("number"),
  optional: z.boolean().optional(),
  default: z.number().optional(),
  gt: z.number().optional(),
  min: z.number().optional(),
  lt: z.number().optional(),
  max: z.number().optional(),
  int: z.boolean().optional()
});
const BooleanSchema = z.object({
  type: z.literal("boolean"),
  optional: z.boolean().optional(),
  default: z.boolean().optional()
});
const EnumSchema = z.object({
  type: z.literal("enum"),
  values: z.array(
    // We use "'" for codegen so it can't be passed here
    z.string().refine((v) => !v.includes("'"), {
      message: `The "'" character can't be used as an enum value`
    })
  ),
  optional: z.boolean().optional(),
  default: z.string().optional()
});
const EnvFieldType = z.union([
  StringSchema,
  NumberSchema,
  BooleanSchema,
  EnumSchema.superRefine((schema, ctx) => {
    if (schema.default) {
      if (!schema.values.includes(schema.default)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `The default value "${schema.default}" must be one of the specified values: ${schema.values.join(", ")}.`
        });
      }
    }
  })
]);
const PublicClientEnvFieldMetadata = z.object({
  context: z.literal("client"),
  access: z.literal("public")
});
const PublicServerEnvFieldMetadata = z.object({
  context: z.literal("server"),
  access: z.literal("public")
});
const SecretServerEnvFieldMetadata = z.object({
  context: z.literal("server"),
  access: z.literal("secret")
});
const EnvFieldMetadata = z.union([
  PublicClientEnvFieldMetadata,
  PublicServerEnvFieldMetadata,
  SecretServerEnvFieldMetadata
]);
const EnvSchemaKey = z.string().min(1).refine(([firstChar]) => isNaN(Number.parseInt(firstChar)), {
  message: "A valid variable name cannot start with a number."
}).refine((str) => /^[A-Z0-9_]+$/.test(str), {
  message: "A valid variable name can only contain uppercase letters, numbers and underscores."
});
const EnvSchema = z.record(EnvSchemaKey, z.intersection(EnvFieldMetadata, EnvFieldType));

const ASTRO_CONFIG_DEFAULTS = {
  root: ".",
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",
  cacheDir: "./node_modules/.astro",
  base: "/",
  trailingSlash: "ignore",
  build: {
    format: "directory",
    client: "./dist/client/",
    server: "./dist/server/",
    assets: "_astro",
    serverEntry: "entry.mjs",
    redirects: true,
    inlineStylesheets: "auto"
  },
  image: {
    service: { entrypoint: "astro/assets/services/sharp", config: {} }
  },
  devToolbar: {
    enabled: true
  },
  compressHTML: true,
  server: {
    host: false,
    port: 4321,
    open: false
  },
  integrations: [],
  markdown: markdownConfigDefaults,
  vite: {},
  legacy: {},
  redirects: {},
  security: {},
  experimental: {
    actions: false,
    directRenderScript: false,
    contentCollectionCache: false,
    clientPrerender: false,
    globalRoutePriority: false,
    serverIslands: false,
    env: {
      validateSecrets: false
    }
  }
};
const AstroConfigSchema = z.object({
  root: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.root).transform((val) => new URL(val)),
  srcDir: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.srcDir).transform((val) => new URL(val)),
  publicDir: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.publicDir).transform((val) => new URL(val)),
  outDir: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.outDir).transform((val) => new URL(val)),
  cacheDir: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.cacheDir).transform((val) => new URL(val)),
  site: z.string().url().optional(),
  compressHTML: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.compressHTML),
  base: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.base),
  trailingSlash: z.union([z.literal("always"), z.literal("never"), z.literal("ignore")]).optional().default(ASTRO_CONFIG_DEFAULTS.trailingSlash),
  output: z.union([z.literal("static"), z.literal("server"), z.literal("hybrid")]).optional().default("static"),
  scopedStyleStrategy: z.union([z.literal("where"), z.literal("class"), z.literal("attribute")]).optional().default("attribute"),
  adapter: z.object({ name: z.string(), hooks: z.object({}).passthrough().default({}) }).optional(),
  integrations: z.preprocess(
    // preprocess
    (val) => Array.isArray(val) ? val.flat(Infinity).filter(Boolean) : val,
    // validate
    z.array(z.object({ name: z.string(), hooks: z.object({}).passthrough().default({}) })).default(ASTRO_CONFIG_DEFAULTS.integrations)
  ),
  build: z.object({
    format: z.union([z.literal("file"), z.literal("directory"), z.literal("preserve")]).optional().default(ASTRO_CONFIG_DEFAULTS.build.format),
    client: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.client).transform((val) => new URL(val)),
    server: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.server).transform((val) => new URL(val)),
    assets: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.assets),
    assetsPrefix: z.string().optional().or(z.object({ fallback: z.string() }).and(z.record(z.string())).optional()).refine(
      (value) => {
        if (value && typeof value !== "string") {
          if (!value.fallback) {
            return false;
          }
        }
        return true;
      },
      {
        message: "The `fallback` is mandatory when defining the option as an object."
      }
    ),
    serverEntry: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.serverEntry),
    redirects: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.build.redirects),
    inlineStylesheets: z.enum(["always", "auto", "never"]).optional().default(ASTRO_CONFIG_DEFAULTS.build.inlineStylesheets)
  }).default({}),
  server: z.preprocess(
    // preprocess
    // NOTE: Uses the "error" command here because this is overwritten by the
    // individualized schema parser with the correct command.
    (val) => typeof val === "function" ? val({ command: "error" }) : val,
    // validate
    z.object({
      open: z.union([z.string(), z.boolean()]).optional().default(ASTRO_CONFIG_DEFAULTS.server.open),
      host: z.union([z.string(), z.boolean()]).optional().default(ASTRO_CONFIG_DEFAULTS.server.host),
      port: z.number().optional().default(ASTRO_CONFIG_DEFAULTS.server.port),
      headers: z.custom().optional()
    }).default({})
  ),
  redirects: z.record(
    z.string(),
    z.union([
      z.string(),
      z.object({
        status: z.union([
          z.literal(300),
          z.literal(301),
          z.literal(302),
          z.literal(303),
          z.literal(304),
          z.literal(307),
          z.literal(308)
        ]),
        destination: z.string()
      })
    ])
  ).default(ASTRO_CONFIG_DEFAULTS.redirects),
  prefetch: z.union([
    z.boolean(),
    z.object({
      prefetchAll: z.boolean().optional(),
      defaultStrategy: z.enum(["tap", "hover", "viewport", "load"]).optional()
    })
  ]).optional(),
  image: z.object({
    endpoint: z.string().optional(),
    service: z.object({
      entrypoint: z.union([
        z.literal("astro/assets/services/sharp"),
        z.literal("astro/assets/services/squoosh"),
        z.string()
      ]).default(ASTRO_CONFIG_DEFAULTS.image.service.entrypoint),
      config: z.record(z.any()).default({})
    }).default(ASTRO_CONFIG_DEFAULTS.image.service),
    domains: z.array(z.string()).default([]),
    remotePatterns: z.array(
      z.object({
        protocol: z.string().optional(),
        hostname: z.string().refine(
          (val) => !val.includes("*") || val.startsWith("*.") || val.startsWith("**."),
          {
            message: "wildcards can only be placed at the beginning of the hostname"
          }
        ).optional(),
        port: z.string().optional(),
        pathname: z.string().refine((val) => !val.includes("*") || val.endsWith("/*") || val.endsWith("/**"), {
          message: "wildcards can only be placed at the end of a pathname"
        }).optional()
      })
    ).default([])
  }).default(ASTRO_CONFIG_DEFAULTS.image),
  devToolbar: z.object({
    enabled: z.boolean().default(ASTRO_CONFIG_DEFAULTS.devToolbar.enabled)
  }).default(ASTRO_CONFIG_DEFAULTS.devToolbar),
  markdown: z.object({
    syntaxHighlight: z.union([z.literal("shiki"), z.literal("prism"), z.literal(false)]).default(ASTRO_CONFIG_DEFAULTS.markdown.syntaxHighlight),
    shikiConfig: z.object({
      langs: z.custom().array().transform((langs) => {
        for (const lang of langs) {
          if (typeof lang === "object") {
            if (lang.id) {
              lang.name = lang.id;
            }
            if (lang.grammar) {
              Object.assign(lang, lang.grammar);
            }
          }
        }
        return langs;
      }).default([]),
      theme: z.enum(Object.keys(bundledThemes)).or(z.custom()).default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.theme),
      themes: z.record(
        z.enum(Object.keys(bundledThemes)).or(z.custom())
      ).default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.themes),
      defaultColor: z.union([z.literal("light"), z.literal("dark"), z.string(), z.literal(false)]).optional(),
      wrap: z.boolean().or(z.null()).default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.wrap),
      transformers: z.custom().array().transform((transformers) => {
        for (const transformer of transformers) {
          if (transformer.token && !("span" in transformer)) {
            transformer.span = transformer.token;
          }
        }
        return transformers;
      }).default(ASTRO_CONFIG_DEFAULTS.markdown.shikiConfig.transformers)
    }).default({}),
    remarkPlugins: z.union([
      z.string(),
      z.tuple([z.string(), z.any()]),
      z.custom((data) => typeof data === "function"),
      z.tuple([z.custom((data) => typeof data === "function"), z.any()])
    ]).array().default(ASTRO_CONFIG_DEFAULTS.markdown.remarkPlugins),
    rehypePlugins: z.union([
      z.string(),
      z.tuple([z.string(), z.any()]),
      z.custom((data) => typeof data === "function"),
      z.tuple([z.custom((data) => typeof data === "function"), z.any()])
    ]).array().default(ASTRO_CONFIG_DEFAULTS.markdown.rehypePlugins),
    remarkRehype: z.custom((data) => data instanceof Object && !Array.isArray(data)).default(ASTRO_CONFIG_DEFAULTS.markdown.remarkRehype),
    gfm: z.boolean().default(ASTRO_CONFIG_DEFAULTS.markdown.gfm),
    smartypants: z.boolean().default(ASTRO_CONFIG_DEFAULTS.markdown.smartypants)
  }).default({}),
  vite: z.custom((data) => data instanceof Object && !Array.isArray(data)).default(ASTRO_CONFIG_DEFAULTS.vite),
  i18n: z.optional(
    z.object({
      defaultLocale: z.string(),
      locales: z.array(
        z.union([
          z.string(),
          z.object({
            path: z.string(),
            codes: z.string().array().nonempty()
          })
        ])
      ),
      domains: z.record(
        z.string(),
        z.string().url(
          "The domain value must be a valid URL, and it has to start with 'https' or 'http'."
        )
      ).optional(),
      fallback: z.record(z.string(), z.string()).optional(),
      routing: z.literal("manual").or(
        z.object({
          prefixDefaultLocale: z.boolean().optional().default(false),
          redirectToDefaultLocale: z.boolean().optional().default(true)
        }).refine(
          ({ prefixDefaultLocale, redirectToDefaultLocale }) => {
            return !(prefixDefaultLocale === false && redirectToDefaultLocale === false);
          },
          {
            message: "The option `i18n.redirectToDefaultLocale` is only useful when the `i18n.prefixDefaultLocale` is set to `true`. Remove the option `i18n.redirectToDefaultLocale`, or change its value to `true`."
          }
        )
      ).optional().default({})
    }).optional().superRefine((i18n, ctx) => {
      if (i18n) {
        const { defaultLocale, locales: _locales, fallback, domains } = i18n;
        const locales = _locales.map((locale) => {
          if (typeof locale === "string") {
            return locale;
          } else {
            return locale.path;
          }
        });
        if (!locales.includes(defaultLocale)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `The default locale \`${defaultLocale}\` is not present in the \`i18n.locales\` array.`
          });
        }
        if (fallback) {
          for (const [fallbackFrom, fallbackTo] of Object.entries(fallback)) {
            if (!locales.includes(fallbackFrom)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `The locale \`${fallbackFrom}\` key in the \`i18n.fallback\` record doesn't exist in the \`i18n.locales\` array.`
              });
            }
            if (fallbackFrom === defaultLocale) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `You can't use the default locale as a key. The default locale can only be used as value.`
              });
            }
            if (!locales.includes(fallbackTo)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `The locale \`${fallbackTo}\` value in the \`i18n.fallback\` record doesn't exist in the \`i18n.locales\` array.`
              });
            }
          }
        }
        if (domains) {
          const entries = Object.entries(domains);
          const hasDomains = domains ? Object.keys(domains).length > 0 : false;
          if (entries.length > 0 && !hasDomains) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `When specifying some domains, the property \`i18n.routingStrategy\` must be set to \`"domains"\`.`
            });
          }
          for (const [domainKey, domainValue] of entries) {
            if (!locales.includes(domainKey)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `The locale \`${domainKey}\` key in the \`i18n.domains\` record doesn't exist in the \`i18n.locales\` array.`
              });
            }
            if (!domainValue.startsWith("https") && !domainValue.startsWith("http")) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "The domain value must be a valid URL, and it has to start with 'https' or 'http'.",
                path: ["domains"]
              });
            } else {
              try {
                const domainUrl = new URL(domainValue);
                if (domainUrl.pathname !== "/") {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `The URL \`${domainValue}\` must contain only the origin. A subsequent pathname isn't allowed here. Remove \`${domainUrl.pathname}\`.`,
                    path: ["domains"]
                  });
                }
              } catch {
              }
            }
          }
        }
      }
    })
  ),
  security: z.object({
    checkOrigin: z.boolean().default(false)
  }).optional().default(ASTRO_CONFIG_DEFAULTS.security),
  experimental: z.object({
    actions: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.actions),
    directRenderScript: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.directRenderScript),
    contentCollectionCache: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.contentCollectionCache),
    clientPrerender: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.clientPrerender),
    globalRoutePriority: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.globalRoutePriority),
    env: z.object({
      schema: EnvSchema.optional(),
      validateSecrets: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.env.validateSecrets)
    }).strict().optional(),
    serverIslands: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.experimental.serverIslands)
  }).strict(
    `Invalid or outdated experimental feature.
Check for incorrect spelling or outdated Astro version.
See https://docs.astro.build/en/reference/configuration-reference/#experimental-flags for a list of all current experiments.`
  ).default({}),
  legacy: z.object({}).default({})
});
function createRelativeSchema(cmd, fileProtocolRoot) {
  const AstroConfigRelativeSchema = AstroConfigSchema.extend({
    root: z.string().default(ASTRO_CONFIG_DEFAULTS.root).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    srcDir: z.string().default(ASTRO_CONFIG_DEFAULTS.srcDir).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    compressHTML: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.compressHTML),
    publicDir: z.string().default(ASTRO_CONFIG_DEFAULTS.publicDir).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    outDir: z.string().default(ASTRO_CONFIG_DEFAULTS.outDir).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    cacheDir: z.string().default(ASTRO_CONFIG_DEFAULTS.cacheDir).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
    build: z.object({
      format: z.union([z.literal("file"), z.literal("directory"), z.literal("preserve")]).optional().default(ASTRO_CONFIG_DEFAULTS.build.format),
      client: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.client).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
      server: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.server).transform((val) => resolveDirAsUrl(val, fileProtocolRoot)),
      assets: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.assets),
      assetsPrefix: z.string().optional().or(z.object({ fallback: z.string() }).and(z.record(z.string())).optional()).refine(
        (value) => {
          if (value && typeof value !== "string") {
            if (!value.fallback) {
              return false;
            }
          }
          return true;
        },
        {
          message: "The `fallback` is mandatory when defining the option as an object."
        }
      ),
      serverEntry: z.string().optional().default(ASTRO_CONFIG_DEFAULTS.build.serverEntry),
      redirects: z.boolean().optional().default(ASTRO_CONFIG_DEFAULTS.build.redirects),
      inlineStylesheets: z.enum(["always", "auto", "never"]).optional().default(ASTRO_CONFIG_DEFAULTS.build.inlineStylesheets)
    }).optional().default({}),
    server: z.preprocess(
      // preprocess
      (val) => {
        if (typeof val === "function") {
          return val({ command: "preview" });
        } else {
          return val;
        }
      },
      // validate
      z.object({
        open: z.union([z.string(), z.boolean()]).optional().default(ASTRO_CONFIG_DEFAULTS.server.open),
        host: z.union([z.string(), z.boolean()]).optional().default(ASTRO_CONFIG_DEFAULTS.server.host),
        port: z.number().optional().default(ASTRO_CONFIG_DEFAULTS.server.port),
        headers: z.custom().optional(),
        streaming: z.boolean().optional().default(true)
      }).optional().default({})
    )
  }).transform((config) => {
    if (!config.build.server.toString().startsWith(config.outDir.toString()) && config.build.server.toString().endsWith("dist/server/")) {
      config.build.server = new URL("./dist/server/", config.outDir);
    }
    if (!config.build.client.toString().startsWith(config.outDir.toString()) && config.build.client.toString().endsWith("dist/client/")) {
      config.build.client = new URL("./dist/client/", config.outDir);
    }
    if (config.trailingSlash === "never") {
      config.base = prependForwardSlash(removeTrailingForwardSlash(config.base));
    } else if (config.trailingSlash === "always") {
      config.base = prependForwardSlash(appendForwardSlash(config.base));
    } else {
      config.base = prependForwardSlash(config.base);
    }
    return config;
  }).refine((obj) => !obj.outDir.toString().startsWith(obj.publicDir.toString()), {
    message: "The value of `outDir` must not point to a path within the folder set as `publicDir`, this will cause an infinite loop"
  }).superRefine((configuration, ctx) => {
    const { site, i18n, output } = configuration;
    const hasDomains = i18n?.domains ? Object.keys(i18n.domains).length > 0 : false;
    if (hasDomains) {
      if (!site) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "The option `site` isn't set. When using the 'domains' strategy for `i18n`, `site` is required to create absolute URLs for locales that aren't mapped to a domain."
        });
      }
      if (output !== "server") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Domain support is only available when `output` is `"server"`.'
        });
      }
    }
  });
  return AstroConfigRelativeSchema;
}
function resolveDirAsUrl(dir, root) {
  let resolvedDir = path.resolve(root, dir);
  if (!resolvedDir.endsWith(path.sep)) {
    resolvedDir += path.sep;
  }
  return pathToFileURL(resolvedDir);
}

async function validateConfig(userConfig, root, cmd) {
  const AstroConfigRelativeSchema = createRelativeSchema(cmd, root);
  return await AstroConfigRelativeSchema.parseAsync(userConfig);
}

const nodeLogDestination = {
  write(event) {
    let dest = process.stderr;
    if (levels[event.level] < levels["error"]) {
      dest = process.stdout;
    }
    let trailingLine = event.newLine ? "\n" : "";
    if (event.label === "SKIP_FORMAT") {
      dest.write(event.message + trailingLine);
    } else {
      dest.write(getEventPrefix(event) + " " + event.message + trailingLine);
    }
    return true;
  }
};
const debuggers = {};
function debug(type, ...messages) {
  const namespace = `astro:${type}`;
  debuggers[namespace] = debuggers[namespace] || debugPackage(namespace);
  return debuggers[namespace](...messages);
}
globalThis._astroGlobalDebug = debug;

createRequire(import.meta.url);
function countOccurrences(needle, haystack) {
  let count = 0;
  for (const hay of haystack) {
    if (hay === needle) count += 1;
  }
  return count;
}
const ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
const ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
  const result = [];
  part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
    if (!str) return;
    const dynamic = i % 2 === 1;
    const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
    if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) {
      throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
    }
    result.push({
      content,
      dynamic,
      spread: dynamic && ROUTE_SPREAD.test(content)
    });
  });
  return result;
}
function validateSegment(segment, file = "") {
  if (!file) file = segment;
  if (/\]\[/.test(segment)) {
    throw new Error(`Invalid route ${file} \u2014 parameters must be separated`);
  }
  if (countOccurrences("[", segment) !== countOccurrences("]", segment)) {
    throw new Error(`Invalid route ${file} \u2014 brackets are unbalanced`);
  }
  if ((/.+\[\.\.\.[^\]]+\]/.test(segment) || /\[\.\.\.[^\]]+\].+/.test(segment)) && file.endsWith(".astro")) {
    throw new Error(`Invalid route ${file} \u2014 rest parameter must be a standalone segment`);
  }
}

class ContainerPipeline extends Pipeline {
  /**
   * Internal cache to store components instances by `RouteData`.
   * @private
   */
  #componentsInterner = /* @__PURE__ */ new WeakMap();
  static create({
    logger,
    manifest,
    renderers,
    resolve,
    serverLike,
    streaming
  }) {
    return new ContainerPipeline(
      logger,
      manifest,
      "development",
      renderers,
      resolve,
      serverLike,
      streaming
    );
  }
  componentMetadata(_routeData) {
  }
  headElements(routeData) {
    const routeInfo = this.manifest.routes.find((route) => route.routeData === routeData);
    const links = /* @__PURE__ */ new Set();
    const scripts = /* @__PURE__ */ new Set();
    const styles = createStylesheetElementSet(routeInfo?.styles ?? []);
    for (const script of routeInfo?.scripts ?? []) {
      if ("stage" in script) {
        if (script.stage === "head-inline") {
          scripts.add({
            props: {},
            children: script.children
          });
        }
      } else {
        scripts.add(createModuleScriptElement(script));
      }
    }
    return { links, styles, scripts };
  }
  async tryRewrite(payload, request) {
    const [foundRoute, finalUrl] = findRouteToRewrite({
      payload,
      request,
      routes: this.manifest?.routes.map((r) => r.routeData),
      trailingSlash: this.manifest.trailingSlash,
      buildFormat: this.manifest.buildFormat,
      base: this.manifest.base
    });
    const componentInstance = await this.getComponentByRoute(foundRoute);
    return [foundRoute, componentInstance, finalUrl];
  }
  insertRoute(route, componentInstance) {
    this.#componentsInterner.set(route, {
      page() {
        return Promise.resolve(componentInstance);
      },
      renderers: this.manifest.renderers,
      onRequest: this.manifest.middleware
    });
  }
  // At the moment it's not used by the container via any public API
  // @ts-expect-error It needs to be implemented.
  async getComponentByRoute(_routeData) {
  }
}

function createManifest(manifest, renderers, middleware) {
  const defaultMiddleware = (_, next) => {
    return next();
  };
  return {
    hrefRoot: import.meta.url,
    trailingSlash: manifest?.trailingSlash ?? ASTRO_CONFIG_DEFAULTS.trailingSlash,
    buildFormat: manifest?.buildFormat ?? ASTRO_CONFIG_DEFAULTS.build.format,
    compressHTML: manifest?.compressHTML ?? ASTRO_CONFIG_DEFAULTS.compressHTML,
    assets: manifest?.assets ?? /* @__PURE__ */ new Set(),
    assetsPrefix: manifest?.assetsPrefix ?? void 0,
    entryModules: manifest?.entryModules ?? {},
    routes: manifest?.routes ?? [],
    adapterName: "",
    clientDirectives: manifest?.clientDirectives ?? getDefaultClientDirectives(),
    renderers: renderers ?? manifest?.renderers ?? [],
    base: manifest?.base ?? ASTRO_CONFIG_DEFAULTS.base,
    componentMetadata: manifest?.componentMetadata ?? /* @__PURE__ */ new Map(),
    inlinedScripts: manifest?.inlinedScripts ?? /* @__PURE__ */ new Map(),
    i18n: manifest?.i18n,
    checkOrigin: false,
    middleware: manifest?.middleware ?? middleware ?? defaultMiddleware,
    experimentalEnvGetSecretEnabled: false
  };
}
class experimental_AstroContainer {
  #pipeline;
  /**
   * Internally used to check if the container was created with a manifest.
   * @private
   */
  #withManifest = false;
  /**
   * Internal function responsible for importing a renderer
   * @private
   */
  #getRenderer;
  constructor({
    streaming = false,
    manifest,
    renderers,
    resolve,
    astroConfig
  }) {
    this.#pipeline = ContainerPipeline.create({
      logger: new Logger({
        level: "info",
        dest: nodeLogDestination
      }),
      manifest: createManifest(manifest, renderers),
      streaming,
      serverLike: true,
      renderers: renderers ?? manifest?.renderers ?? [],
      resolve: async (specifier) => {
        if (this.#withManifest) {
          return this.#containerResolve(specifier, astroConfig);
        } else if (resolve) {
          return resolve(specifier);
        }
        return specifier;
      }
    });
  }
  async #containerResolve(specifier, astroConfig) {
    const found = this.#pipeline.manifest.entryModules[specifier];
    if (found) {
      return new URL(found, astroConfig?.build.client).toString();
    }
    return found;
  }
  /**
   * Creates a new instance of a container.
   *
   * @param {AstroContainerOptions=} containerOptions
   */
  static async create(containerOptions = {}) {
    const { streaming = false, manifest, renderers = [], resolve } = containerOptions;
    const astroConfig = await validateConfig(ASTRO_CONFIG_DEFAULTS, process.cwd(), "container");
    return new experimental_AstroContainer({
      streaming,
      manifest,
      renderers,
      astroConfig,
      resolve
    });
  }
  /**
   * Use this function to manually add a **server** renderer to the container.
   *
   * This function is preferred when you require to use the container with a renderer in environments such as on-demand pages.
   *
   * ## Example
   *
   * ```js
   * import reactRenderer from "@astrojs/react/server.js";
   * import vueRenderer from "@astrojs/vue/server.js";
   * import customRenderer from "../renderer/customRenderer.js";
   * import { experimental_AstroContainer as AstroContainer } from "astro/container"
   *
   * const container = await AstroContainer.create();
   * container.addServerRenderer(reactRenderer);
   * container.addServerRenderer(vueRenderer);
   * container.addServerRenderer("customRenderer", customRenderer);
   * ```
   *
   * @param options {object}
   * @param options.name The name of the renderer. The name **isn't** arbitrary, and it should match the name of the package.
   * @param options.renderer The server renderer exported by integration.
   */
  addServerRenderer(options) {
    const { renderer, name } = options;
    if (!renderer.check || !renderer.renderToStaticMarkup) {
      throw new Error(
        "The renderer you passed isn't valid. A renderer is usually an object that exposes the `check` and `renderToStaticMarkup` functions.\nUsually, the renderer is exported by a /server.js entrypoint e.g. `import renderer from '@astrojs/react/server.js'`"
      );
    }
    if (isNamedRenderer(renderer)) {
      this.#pipeline.manifest.renderers.push({
        name: renderer.name,
        ssr: renderer
      });
    } else {
      this.#pipeline.manifest.renderers.push({
        name,
        ssr: renderer
      });
    }
  }
  /**
   * Use this function to manually add a **client** renderer to the container.
   *
   * When rendering components that use the `client:*` directives, you need to use this function.
   *
   * ## Example
   *
   * ```js
   * import reactRenderer from "@astrojs/react/server.js";
   * import { experimental_AstroContainer as AstroContainer } from "astro/container"
   *
   * const container = await AstroContainer.create();
   * container.addServerRenderer(reactRenderer);
   * container.addClientRenderer({
   * 	name: "@astrojs/react",
   * 	entrypoint: "@astrojs/react/client.js"
   * });
   * ```
   *
   * @param options {object}
   * @param options.name The name of the renderer. The name **isn't** arbitrary, and it should match the name of the package.
   * @param options.entrypoint The entrypoint of the client renderer.
   */
  addClientRenderer(options) {
    const { entrypoint, name } = options;
    const rendererIndex = this.#pipeline.manifest.renderers.findIndex((r) => r.name === name);
    if (rendererIndex === -1) {
      throw new Error(
        "You tried to add the " + name + " client renderer, but its server renderer wasn't added. You must add the server renderer first. Use the `addServerRenderer` function."
      );
    }
    const renderer = this.#pipeline.manifest.renderers[rendererIndex];
    renderer.clientEntrypoint = entrypoint;
    this.#pipeline.manifest.renderers[rendererIndex] = renderer;
  }
  // NOTE: we keep this private via TS instead via `#` so it's still available on the surface, so we can play with it.
  // @ematipico: I plan to use it for a possible integration that could help people
  static async createFromManifest(manifest) {
    const astroConfig = await validateConfig(ASTRO_CONFIG_DEFAULTS, process.cwd(), "container");
    const container = new experimental_AstroContainer({
      manifest,
      astroConfig
    });
    container.#withManifest = true;
    return container;
  }
  #insertRoute({
    path,
    componentInstance,
    params = {},
    type = "page"
  }) {
    const pathUrl = new URL(path, "https://example.com");
    const routeData = this.#createRoute(pathUrl, params, type);
    this.#pipeline.manifest.routes.push({
      routeData,
      file: "",
      links: [],
      styles: [],
      scripts: []
    });
    this.#pipeline.insertRoute(routeData, componentInstance);
    return routeData;
  }
  /**
   * @description
   * It renders a component and returns the result as a string.
   *
   * ## Example
   *
   * ```js
   * import Card from "../src/components/Card.astro";
   *
   * const container = await AstroContainer.create();
   * const result = await container.renderToString(Card);
   *
   * console.log(result); // it's a string
   * ```
   *
   *
   * @param {AstroComponentFactory} component The instance of the component.
   * @param {ContainerRenderOptions=} options Possible options to pass when rendering the component.
   */
  async renderToString(component, options = {}) {
    const response = await this.renderToResponse(component, options);
    return await response.text();
  }
  /**
   * @description
   * It renders a component and returns the `Response` as result of the rendering phase.
   *
   * ## Example
   *
   * ```js
   * import Card from "../src/components/Card.astro";
   *
   * const container = await AstroContainer.create();
   * const response = await container.renderToResponse(Card);
   *
   * console.log(response.status); // it's a number
   * ```
   *
   *
   * @param {AstroComponentFactory} component The instance of the component.
   * @param {ContainerRenderOptions=} options Possible options to pass when rendering the component.
   */
  async renderToResponse(component, options = {}) {
    const { routeType = "page", slots } = options;
    const request = options?.request ?? new Request("https://example.com/");
    const url = new URL(request.url);
    const componentInstance = routeType === "endpoint" ? component : this.#wrapComponent(component, options.params);
    const routeData = this.#insertRoute({
      path: request.url,
      componentInstance,
      params: options.params,
      type: routeType
    });
    const renderContext = RenderContext.create({
      pipeline: this.#pipeline,
      routeData,
      status: 200,
      middleware: this.#pipeline.middleware,
      request,
      pathname: url.pathname,
      locals: options?.locals ?? {}
    });
    if (options.params) {
      renderContext.params = options.params;
    }
    if (options.props) {
      renderContext.props = options.props;
    }
    return renderContext.render(componentInstance, slots);
  }
  #createRoute(url, params, type) {
    const segments = removeLeadingForwardSlash(url.pathname).split(posix.sep).filter(Boolean).map((s) => {
      validateSegment(s);
      return getParts(s, url.pathname);
    });
    return {
      route: url.pathname,
      component: "",
      generate(_data) {
        return "";
      },
      params: Object.keys(params),
      pattern: getPattern(
        segments,
        ASTRO_CONFIG_DEFAULTS.base,
        ASTRO_CONFIG_DEFAULTS.trailingSlash
      ),
      prerender: false,
      segments,
      type,
      fallbackRoutes: [],
      isIndex: false
    };
  }
  /**
   * If the provided component isn't a default export, the function wraps it in an object `{default: Component }` to mimic the default export.
   * @param componentFactory
   * @param params
   * @private
   */
  #wrapComponent(componentFactory, params) {
    if (params) {
      return {
        default: componentFactory,
        getStaticPaths() {
          return [{ params }];
        }
      };
    }
    return { default: componentFactory };
  }
}
function isNamedRenderer(renderer) {
  return !!renderer?.name;
}

export { experimental_AstroContainer as e };

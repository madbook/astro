import { r as renderers } from './chunks/_@astro-renderers_Dwu3UzaR.mjs';
import { manifest as manifest$1 } from './manifest_DemoZmPl.mjs';
import { l as levels, g as getEventPrefix, d as defineMiddleware, P as Pipeline, c as createStylesheetElementSet, a as createModuleScriptElement, f as findRouteToRewrite, L as Logger, i as injectDefaultRoutes, A as AstroIntegrationLogger, s as sequence, e as createDefaultRoutes, h as createAssetLink, n as normalizeTheLocale, R as RenderContext, j as getSetCookiesFromResponse } from './chunks/rewrite_x9XC5KKb.mjs';
import { e as clientLocalsSymbol, f as clientAddressSymbol, R as REROUTABLE_STATUS_CODES, g as REROUTE_DIRECTIVE_HEADER, h as responseSentSymbol } from './chunks/astro/server_C9trdzCE.mjs';
import 'cookie';
import { s as removeTrailingForwardSlash, q as prependForwardSlash, v as joinPaths, t as appendForwardSlash, A as AstroError, L as LocalsNotAnObject } from './chunks/astro/assets-service_5T573VqA.mjs';
import './chunks/astro-designed-error-pages_l6yx0i_Y.mjs';
import fs from 'fs';
import { onRequest } from './_noop-middleware.mjs';

const consoleLogDestination = {
  write(event) {
    let dest = console.error;
    if (levels[event.level] < levels["error"]) {
      dest = console.log;
    }
    if (event.label === "SKIP_FORMAT") {
      dest(event.message);
    } else {
      dest(getEventPrefix(event) + " " + event.message);
    }
    return true;
  }
};

const RedirectComponentInstance = {
  default() {
    return new Response(null, {
      status: 301
    });
  }
};
const RedirectSinglePageBuiltModule = {
  page: () => Promise.resolve(RedirectComponentInstance),
  onRequest: (_, next) => next(),
  renderers: []
};

function matchRoute(pathname, manifest) {
  const decodedPathname = decodeURI(pathname);
  return manifest.routes.find((route) => {
    return route.pattern.test(decodedPathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(decodedPathname));
  });
}

const FORM_CONTENT_TYPES = [
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
];
function createOriginCheckMiddleware() {
  return defineMiddleware((context, next) => {
    const { request, url } = context;
    const contentType = request.headers.get("content-type");
    if (contentType) {
      if (FORM_CONTENT_TYPES.includes(contentType.toLowerCase())) {
        const forbidden = (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
        if (forbidden) {
          return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
            status: 403
          });
        }
      }
    }
    return next();
  });
}

class AppPipeline extends Pipeline {
  #manifestData;
  static create(manifestData, {
    logger,
    manifest,
    mode,
    renderers,
    resolve,
    serverLike,
    streaming,
    defaultRoutes
  }) {
    const pipeline = new AppPipeline(
      logger,
      manifest,
      mode,
      renderers,
      resolve,
      serverLike,
      streaming,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      false,
      defaultRoutes
    );
    pipeline.#manifestData = manifestData;
    return pipeline;
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
  componentMetadata() {
  }
  async getComponentByRoute(routeData) {
    const module = await this.getModuleForRoute(routeData);
    return module.page();
  }
  async tryRewrite(payload, request, _sourceRoute) {
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
  async getModuleForRoute(route) {
    for (const defaultRoute of this.defaultRoutes) {
      if (route.component === defaultRoute.component) {
        return {
          page: () => Promise.resolve(defaultRoute.instance),
          renderers: []
        };
      }
    }
    if (route.type === "redirect") {
      return RedirectSinglePageBuiltModule;
    } else {
      if (this.manifest.pageMap) {
        const importComponentInstance = this.manifest.pageMap.get(route.component);
        if (!importComponentInstance) {
          throw new Error(
            `Unexpectedly unable to find a component instance for route ${route.route}`
          );
        }
        return await importComponentInstance();
      } else if (this.manifest.pageModule) {
        return this.manifest.pageModule;
      }
      throw new Error(
        "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue."
      );
    }
  }
}

class App {
  #manifest;
  #manifestData;
  #logger = new Logger({
    dest: consoleLogDestination,
    level: "info"
  });
  #baseWithoutTrailingSlash;
  #pipeline;
  #adapterLogger;
  #renderOptionsDeprecationWarningShown = false;
  constructor(manifest, streaming = true) {
    this.#manifest = manifest;
    this.#manifestData = injectDefaultRoutes(manifest, {
      routes: manifest.routes.map((route) => route.routeData)
    });
    this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#manifest.base);
    this.#pipeline = this.#createPipeline(this.#manifestData, streaming);
    this.#adapterLogger = new AstroIntegrationLogger(
      this.#logger.options,
      this.#manifest.adapterName
    );
  }
  getAdapterLogger() {
    return this.#adapterLogger;
  }
  /**
   * Creates a pipeline by reading the stored manifest
   *
   * @param manifestData
   * @param streaming
   * @private
   */
  #createPipeline(manifestData, streaming = false) {
    if (this.#manifest.checkOrigin) {
      this.#manifest.middleware = sequence(
        createOriginCheckMiddleware(),
        this.#manifest.middleware
      );
    }
    return AppPipeline.create(manifestData, {
      logger: this.#logger,
      manifest: this.#manifest,
      mode: "production",
      renderers: this.#manifest.renderers,
      defaultRoutes: createDefaultRoutes(this.#manifest),
      resolve: async (specifier) => {
        if (!(specifier in this.#manifest.entryModules)) {
          throw new Error(`Unable to resolve [${specifier}]`);
        }
        const bundlePath = this.#manifest.entryModules[specifier];
        switch (true) {
          case bundlePath.startsWith("data:"):
          case bundlePath.length === 0: {
            return bundlePath;
          }
          default: {
            return createAssetLink(bundlePath, this.#manifest.base, this.#manifest.assetsPrefix);
          }
        }
      },
      serverLike: true,
      streaming
    });
  }
  set setManifestData(newManifestData) {
    this.#manifestData = newManifestData;
  }
  removeBase(pathname) {
    if (pathname.startsWith(this.#manifest.base)) {
      return pathname.slice(this.#baseWithoutTrailingSlash.length + 1);
    }
    return pathname;
  }
  #getPathnameFromRequest(request) {
    const url = new URL(request.url);
    const pathname = prependForwardSlash(this.removeBase(url.pathname));
    return pathname;
  }
  match(request) {
    const url = new URL(request.url);
    if (this.#manifest.assets.has(url.pathname)) return void 0;
    let pathname = this.#computePathnameFromDomain(request);
    if (!pathname) {
      pathname = prependForwardSlash(this.removeBase(url.pathname));
    }
    let routeData = matchRoute(pathname, this.#manifestData);
    if (!routeData || routeData.prerender) return void 0;
    return routeData;
  }
  #computePathnameFromDomain(request) {
    let pathname = void 0;
    const url = new URL(request.url);
    if (this.#manifest.i18n && (this.#manifest.i18n.strategy === "domains-prefix-always" || this.#manifest.i18n.strategy === "domains-prefix-other-locales" || this.#manifest.i18n.strategy === "domains-prefix-always-no-redirect")) {
      let host = request.headers.get("X-Forwarded-Host");
      let protocol = request.headers.get("X-Forwarded-Proto");
      if (protocol) {
        protocol = protocol + ":";
      } else {
        protocol = url.protocol;
      }
      if (!host) {
        host = request.headers.get("Host");
      }
      if (host && protocol) {
        host = host.split(":")[0];
        try {
          let locale;
          const hostAsUrl = new URL(`${protocol}//${host}`);
          for (const [domainKey, localeValue] of Object.entries(
            this.#manifest.i18n.domainLookupTable
          )) {
            const domainKeyAsUrl = new URL(domainKey);
            if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
              locale = localeValue;
              break;
            }
          }
          if (locale) {
            pathname = prependForwardSlash(
              joinPaths(normalizeTheLocale(locale), this.removeBase(url.pathname))
            );
            if (url.pathname.endsWith("/")) {
              pathname = appendForwardSlash(pathname);
            }
          }
        } catch (e) {
          this.#logger.error(
            "router",
            `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`
          );
          this.#logger.error("router", `Error: ${e}`);
        }
      }
    }
    return pathname;
  }
  async render(request, routeDataOrOptions, maybeLocals) {
    let routeData;
    let locals;
    let clientAddress;
    let addCookieHeader;
    if (routeDataOrOptions && ("addCookieHeader" in routeDataOrOptions || "clientAddress" in routeDataOrOptions || "locals" in routeDataOrOptions || "routeData" in routeDataOrOptions)) {
      if ("addCookieHeader" in routeDataOrOptions) {
        addCookieHeader = routeDataOrOptions.addCookieHeader;
      }
      if ("clientAddress" in routeDataOrOptions) {
        clientAddress = routeDataOrOptions.clientAddress;
      }
      if ("routeData" in routeDataOrOptions) {
        routeData = routeDataOrOptions.routeData;
      }
      if ("locals" in routeDataOrOptions) {
        locals = routeDataOrOptions.locals;
      }
    } else {
      routeData = routeDataOrOptions;
      locals = maybeLocals;
      if (routeDataOrOptions || locals) {
        this.#logRenderOptionsDeprecationWarning();
      }
    }
    if (routeData) {
      this.#logger.debug(
        "router",
        "The adapter " + this.#manifest.adapterName + " provided a custom RouteData for ",
        request.url
      );
      this.#logger.debug("router", "RouteData:\n" + routeData);
    }
    if (locals) {
      if (typeof locals !== "object") {
        const error = new AstroError(LocalsNotAnObject);
        this.#logger.error(null, error.stack);
        return this.#renderError(request, { status: 500, error });
      }
      Reflect.set(request, clientLocalsSymbol, locals);
    }
    if (clientAddress) {
      Reflect.set(request, clientAddressSymbol, clientAddress);
    }
    if (!routeData) {
      routeData = this.match(request);
      this.#logger.debug("router", "Astro matched the following route for " + request.url);
      this.#logger.debug("router", "RouteData:\n" + routeData);
    }
    if (!routeData) {
      this.#logger.debug("router", "Astro hasn't found routes that match " + request.url);
      this.#logger.debug("router", "Here's the available routes:\n", this.#manifestData);
      return this.#renderError(request, { locals, status: 404 });
    }
    const pathname = this.#getPathnameFromRequest(request);
    const defaultStatus = this.#getDefaultStatusCode(routeData, pathname);
    let response;
    try {
      const mod = await this.#pipeline.getModuleForRoute(routeData);
      const renderContext = RenderContext.create({
        pipeline: this.#pipeline,
        locals,
        pathname,
        request,
        routeData,
        status: defaultStatus
      });
      response = await renderContext.render(await mod.page());
    } catch (err) {
      this.#logger.error(null, err.stack || err.message || String(err));
      return this.#renderError(request, { locals, status: 500, error: err });
    }
    if (REROUTABLE_STATUS_CODES.includes(response.status) && response.headers.get(REROUTE_DIRECTIVE_HEADER) !== "no") {
      return this.#renderError(request, {
        locals,
        response,
        status: response.status,
        // We don't have an error to report here. Passing null means we pass nothing intentionally
        // while undefined means there's no error
        error: response.status === 500 ? null : void 0
      });
    }
    if (response.headers.has(REROUTE_DIRECTIVE_HEADER)) {
      response.headers.delete(REROUTE_DIRECTIVE_HEADER);
    }
    if (addCookieHeader) {
      for (const setCookieHeaderValue of App.getSetCookieFromResponse(response)) {
        response.headers.append("set-cookie", setCookieHeaderValue);
      }
    }
    Reflect.set(response, responseSentSymbol, true);
    return response;
  }
  #logRenderOptionsDeprecationWarning() {
    if (this.#renderOptionsDeprecationWarningShown) return;
    this.#logger.warn(
      "deprecated",
      `The adapter ${this.#manifest.adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`
    );
    this.#renderOptionsDeprecationWarningShown = true;
  }
  setCookieHeaders(response) {
    return getSetCookiesFromResponse(response);
  }
  /**
   * Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
   * For example,
   * ```ts
   * for (const cookie_ of App.getSetCookieFromResponse(response)) {
   *     const cookie: string = cookie_
   * }
   * ```
   * @param response The response to read cookies from.
   * @returns An iterator that yields key-value pairs as equal-sign-separated strings.
   */
  static getSetCookieFromResponse = getSetCookiesFromResponse;
  /**
   * If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
   * This also handles pre-rendered /404 or /500 routes
   */
  async #renderError(request, {
    locals,
    status,
    response: originalResponse,
    skipMiddleware = false,
    error
  }) {
    const errorRoutePath = `/${status}${this.#manifest.trailingSlash === "always" ? "/" : ""}`;
    const errorRouteData = matchRoute(errorRoutePath, this.#manifestData);
    const url = new URL(request.url);
    if (errorRouteData) {
      if (errorRouteData.prerender) {
        const maybeDotHtml = errorRouteData.route.endsWith(`/${status}`) ? ".html" : "";
        const statusURL = new URL(
          `${this.#baseWithoutTrailingSlash}/${status}${maybeDotHtml}`,
          url
        );
        const response2 = await fetch(statusURL.toString());
        const override = { status };
        return this.#mergeResponses(response2, originalResponse, override);
      }
      const mod = await this.#pipeline.getModuleForRoute(errorRouteData);
      try {
        const renderContext = RenderContext.create({
          locals,
          pipeline: this.#pipeline,
          middleware: skipMiddleware ? (_, next) => next() : void 0,
          pathname: this.#getPathnameFromRequest(request),
          request,
          routeData: errorRouteData,
          status,
          props: { error }
        });
        const response2 = await renderContext.render(await mod.page());
        return this.#mergeResponses(response2, originalResponse);
      } catch {
        if (skipMiddleware === false) {
          return this.#renderError(request, {
            locals,
            status,
            response: originalResponse,
            skipMiddleware: true
          });
        }
      }
    }
    const response = this.#mergeResponses(new Response(null, { status }), originalResponse);
    Reflect.set(response, responseSentSymbol, true);
    return response;
  }
  #mergeResponses(newResponse, originalResponse, override) {
    if (!originalResponse) {
      if (override !== void 0) {
        return new Response(newResponse.body, {
          status: override.status,
          statusText: newResponse.statusText,
          headers: newResponse.headers
        });
      }
      return newResponse;
    }
    const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
    try {
      originalResponse.headers.delete("Content-type");
    } catch {
    }
    return new Response(newResponse.body, {
      status,
      statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
      // If you're looking at here for possible bugs, it means that it's not a bug.
      // With the middleware, users can meddle with headers, and we should pass to the 404/500.
      // If users see something weird, it's because they are setting some headers they should not.
      //
      // Although, we don't want it to replace the content-type, because the error page must return `text/html`
      headers: new Headers([
        ...Array.from(newResponse.headers),
        ...Array.from(originalResponse.headers)
      ])
    });
  }
  #getDefaultStatusCode(routeData, pathname) {
    if (!routeData.pattern.exec(pathname)) {
      for (const fallbackRoute of routeData.fallbackRoutes) {
        if (fallbackRoute.pattern.test(pathname)) {
          return 302;
        }
      }
    }
    const route = removeTrailingForwardSlash(routeData.route);
    if (route.endsWith("/404")) return 404;
    if (route.endsWith("/500")) return 500;
    return 200;
  }
}

class MyApp extends App {
												#manifest = null;
												constructor(manifest, streaming) {
													super(manifest, streaming);
													this.#manifest = manifest;
												}

												async render(request, { routeData, clientAddress, locals, addCookieHeader } = {}) {
													const url = new URL(request.url);
													if(this.#manifest.assets.has(url.pathname)) {
														const filePath = new URL('../client/' + this.removeBase(url.pathname), import.meta.url);
														const data = await fs.promises.readFile(filePath);
														return new Response(data);
													}

													request[Symbol.for('astro.clientAddress')] = clientAddress ?? '0.0.0.0';
													return super.render(request, { routeData, locals, addCookieHeader });
												}
											}

											function createExports(manifest) {
												return {
													manifest,
													createApp: (streaming) => new MyApp(manifest, streaming)
												};
											}

const serverEntrypointModule = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  createExports
}, Symbol.toStringTag, { value: 'Module' }));

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/button-directive.astro.mjs');
const _page2 = () => import('./pages/react.astro.mjs');
const _page3 = () => import('./pages/vue.astro.mjs');

const pageMap = new Map([
    ["../../../dist/assets/endpoint/generic.js", _page0],
    ["src/pages/button-directive.ts", _page1],
    ["src/pages/react.ts", _page2],
    ["src/pages/vue.ts", _page3]
]);
const serverIslandMap = new Map();

const _manifest = Object.assign(manifest$1, {
    pageMap,
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

export { createApp, manifest, pageMap };

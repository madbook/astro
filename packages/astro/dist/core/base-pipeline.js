import { setGetEnv } from "../env/runtime.js";
import { createI18nMiddleware } from "../i18n/middleware.js";
import { AstroError } from "./errors/errors.js";
import { AstroErrorData } from "./errors/index.js";
import { RouteCache } from "./render/route-cache.js";
import { createDefaultRoutes } from "./routing/default.js";
class Pipeline {
  constructor(logger, manifest, mode, renderers, resolve, serverLike, streaming, adapterName = manifest.adapterName, clientDirectives = manifest.clientDirectives, inlinedScripts = manifest.inlinedScripts, compressHTML = manifest.compressHTML, i18n = manifest.i18n, middleware = manifest.middleware, routeCache = new RouteCache(logger, mode), site = manifest.site ? new URL(manifest.site) : void 0, callSetGetEnv = true, defaultRoutes = createDefaultRoutes(manifest)) {
    this.logger = logger;
    this.manifest = manifest;
    this.mode = mode;
    this.renderers = renderers;
    this.resolve = resolve;
    this.serverLike = serverLike;
    this.streaming = streaming;
    this.adapterName = adapterName;
    this.clientDirectives = clientDirectives;
    this.inlinedScripts = inlinedScripts;
    this.compressHTML = compressHTML;
    this.i18n = i18n;
    this.middleware = middleware;
    this.routeCache = routeCache;
    this.site = site;
    this.callSetGetEnv = callSetGetEnv;
    this.defaultRoutes = defaultRoutes;
    this.internalMiddleware = [];
    if (i18n?.strategy !== "manual") {
      this.internalMiddleware.push(
        createI18nMiddleware(i18n, manifest.base, manifest.trailingSlash, manifest.buildFormat)
      );
    }
    if (callSetGetEnv && manifest.experimentalEnvGetSecretEnabled) {
      setGetEnv(() => {
        throw new AstroError(AstroErrorData.EnvUnsupportedGetSecret);
      }, true);
    }
  }
  internalMiddleware;
}
export {
  Pipeline
};

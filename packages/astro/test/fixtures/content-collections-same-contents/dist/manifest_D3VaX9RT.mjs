import 'cookie';
import 'kleur/colors';
import 'devalue';
import 'html-escaper';
import 'clsx';
import './chunks/1722887120136/astro/server.mjs';
import { compile } from 'path-to-regexp';
import 'cssesc';

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/","adapterName":"","routes":[{"file":"file:///Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/dist/docs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/docs","isIndex":false,"type":"page","pattern":"^\\/docs\\/?$","segments":[[{"content":"docs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/docs.astro","pathname":"/docs","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/docs","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/pages/docs.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/content/docs/one.md?astroPropagatedAssets":"astro/packages/astro/test/fixtures/content-collections-same-contents.mjs","/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/content/docs/one.md?astroContentCollectionEntry":"astro/packages/astro/test/fixtures/content-collections-same-contents2.mjs","/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/content/docs/two.md?astroPropagatedAssets":"astro/packages/astro/test/fixtures/content-collections-same-contents3.mjs","/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/content/docs/two.md?astroContentCollectionEntry":"astro/packages/astro/test/fixtures/content-collections-same-contents4.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/docs@_@astro":"pages/docs.astro.mjs","\u0000@astro-renderers":"renderers.mjs","/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/content/docs/one.md":"content/docs/one.render.mjs","/Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/src/content/docs/two.md":"content/docs/two.render.mjs","\u0000@astrojs-manifest":"manifest_D3VaX9RT.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/docs/file:///Users/matt/src/astro/packages/astro/test/fixtures/content-collections-same-contents/dist/docs/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"experimentalEnvGetSecretEnabled":false});

export { manifest };

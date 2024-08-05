import { createRequire } from "module";
import nodeFs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bold } from "kleur/colors";
import { toRoutingStrategy } from "../../../i18n/utils.js";
import { getPrerenderDefault } from "../../../prerender/utils.js";
import { SUPPORTED_MARKDOWN_FILE_EXTENSIONS } from "../../constants.js";
import { MissingIndexForInternationalization } from "../../errors/errors-data.js";
import { AstroError } from "../../errors/index.js";
import { removeLeadingForwardSlash, slash } from "../../path.js";
import { resolvePages } from "../../util.js";
import { routeComparator } from "../priority.js";
import { getRouteGenerator } from "./generator.js";
import { getPattern } from "./pattern.js";
const require2 = createRequire(import.meta.url);
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
function isSemanticallyEqualSegment(segmentA, segmentB) {
  if (segmentA.length !== segmentB.length) {
    return false;
  }
  for (const [index, partA] of segmentA.entries()) {
    const partB = segmentB[index];
    if (partA.dynamic !== partB.dynamic || partA.spread !== partB.spread) {
      return false;
    }
    if (!partA.dynamic && partA.content !== partB.content) {
      return false;
    }
  }
  return true;
}
function createFileBasedRoutes({ settings, cwd, fsMod }, logger) {
  const components = [];
  const routes = [];
  const validPageExtensions = /* @__PURE__ */ new Set([
    ".astro",
    ...SUPPORTED_MARKDOWN_FILE_EXTENSIONS,
    ...settings.pageExtensions
  ]);
  const validEndpointExtensions = /* @__PURE__ */ new Set([".js", ".ts"]);
  const localFs = fsMod ?? nodeFs;
  const prerender = getPrerenderDefault(settings.config);
  function walk(fs, dir, parentSegments, parentParams) {
    let items = [];
    const files = fs.readdirSync(dir);
    for (const basename of files) {
      const resolved = path.join(dir, basename);
      const file = slash(path.relative(cwd || fileURLToPath(settings.config.root), resolved));
      const isDir = fs.statSync(resolved).isDirectory();
      const ext = path.extname(basename);
      const name = ext ? basename.slice(0, -ext.length) : basename;
      if (name[0] === "_") {
        continue;
      }
      if (basename[0] === "." && basename !== ".well-known") {
        continue;
      }
      if (!isDir && !validPageExtensions.has(ext) && !validEndpointExtensions.has(ext)) {
        logger.warn(
          null,
          `Unsupported file type ${bold(
            resolved
          )} found. Prefix filename with an underscore (\`_\`) to ignore.`
        );
        continue;
      }
      const segment = isDir ? basename : name;
      validateSegment(segment, file);
      const parts = getParts(segment, file);
      const isIndex = isDir ? false : basename.startsWith("index.");
      const routeSuffix = basename.slice(basename.indexOf("."), -ext.length);
      const isPage = validPageExtensions.has(ext);
      items.push({
        basename,
        ext,
        parts,
        file: file.replace(/\\/g, "/"),
        isDir,
        isIndex,
        isPage,
        routeSuffix
      });
    }
    for (const item of items) {
      const segments = parentSegments.slice();
      if (item.isIndex) {
        if (item.routeSuffix) {
          if (segments.length > 0) {
            const lastSegment = segments[segments.length - 1].slice();
            const lastPart = lastSegment[lastSegment.length - 1];
            if (lastPart.dynamic) {
              lastSegment.push({
                dynamic: false,
                spread: false,
                content: item.routeSuffix
              });
            } else {
              lastSegment[lastSegment.length - 1] = {
                dynamic: false,
                spread: false,
                content: `${lastPart.content}${item.routeSuffix}`
              };
            }
            segments[segments.length - 1] = lastSegment;
          } else {
            segments.push(item.parts);
          }
        }
      } else {
        segments.push(item.parts);
      }
      const params = parentParams.slice();
      params.push(...item.parts.filter((p) => p.dynamic).map((p) => p.content));
      if (item.isDir) {
        walk(fsMod ?? fs, path.join(dir, item.basename), segments, params);
      } else {
        components.push(item.file);
        const component = item.file;
        const { trailingSlash } = settings.config;
        const pattern = getPattern(segments, settings.config.base, trailingSlash);
        const generate = getRouteGenerator(segments, trailingSlash);
        const pathname = segments.every((segment) => segment.length === 1 && !segment[0].dynamic) ? `/${segments.map((segment) => segment[0].content).join("/")}` : null;
        const route = joinSegments(segments);
        routes.push({
          route,
          isIndex: item.isIndex,
          type: item.isPage ? "page" : "endpoint",
          pattern,
          segments,
          params,
          component,
          generate,
          pathname: pathname || void 0,
          prerender,
          fallbackRoutes: []
        });
      }
    }
  }
  const { config } = settings;
  const pages = resolvePages(config);
  if (localFs.existsSync(pages)) {
    walk(localFs, fileURLToPath(pages), [], []);
  } else if (settings.injectedRoutes.length === 0) {
    const pagesDirRootRelative = pages.href.slice(settings.config.root.href.length);
    logger.warn(null, `Missing pages directory: ${pagesDirRootRelative}`);
  }
  return routes;
}
function createInjectedRoutes({ settings, cwd }) {
  const { config } = settings;
  const prerender = getPrerenderDefault(config);
  const routes = {
    normal: [],
    legacy: []
  };
  const priority = computeRoutePriority(config);
  for (const injectedRoute of settings.injectedRoutes) {
    const { pattern: name, entrypoint, prerender: prerenderInjected } = injectedRoute;
    let resolved;
    try {
      resolved = require2.resolve(entrypoint, { paths: [cwd || fileURLToPath(config.root)] });
    } catch (e) {
      resolved = fileURLToPath(new URL(entrypoint, config.root));
    }
    const component = slash(path.relative(cwd || fileURLToPath(config.root), resolved));
    const segments = removeLeadingForwardSlash(name).split(path.posix.sep).filter(Boolean).map((s) => {
      validateSegment(s);
      return getParts(s, component);
    });
    const type = resolved.endsWith(".astro") ? "page" : "endpoint";
    const isPage = type === "page";
    const trailingSlash = isPage ? config.trailingSlash : "never";
    const pattern = getPattern(segments, settings.config.base, trailingSlash);
    const generate = getRouteGenerator(segments, trailingSlash);
    const pathname = segments.every((segment) => segment.length === 1 && !segment[0].dynamic) ? `/${segments.map((segment) => segment[0].content).join("/")}` : null;
    const params = segments.flat().filter((p) => p.dynamic).map((p) => p.content);
    const route = joinSegments(segments);
    routes[priority].push({
      type,
      // For backwards compatibility, an injected route is never considered an index route.
      isIndex: false,
      route,
      pattern,
      segments,
      params,
      component,
      generate,
      pathname: pathname || void 0,
      prerender: prerenderInjected ?? prerender,
      fallbackRoutes: []
    });
  }
  return routes;
}
function createRedirectRoutes({ settings }, routeMap, logger) {
  const { config } = settings;
  const trailingSlash = config.trailingSlash;
  const routes = {
    normal: [],
    legacy: []
  };
  const priority = computeRoutePriority(settings.config);
  for (const [from, to] of Object.entries(settings.config.redirects)) {
    const segments = removeLeadingForwardSlash(from).split(path.posix.sep).filter(Boolean).map((s) => {
      validateSegment(s);
      return getParts(s, from);
    });
    const pattern = getPattern(segments, settings.config.base, trailingSlash);
    const generate = getRouteGenerator(segments, trailingSlash);
    const pathname = segments.every((segment) => segment.length === 1 && !segment[0].dynamic) ? `/${segments.map((segment) => segment[0].content).join("/")}` : null;
    const params = segments.flat().filter((p) => p.dynamic).map((p) => p.content);
    const route = joinSegments(segments);
    let destination;
    if (typeof to === "string") {
      destination = to;
    } else {
      destination = to.destination;
    }
    if (/^https?:\/\//.test(destination)) {
      logger.warn(
        "redirects",
        `Redirecting to an external URL is not officially supported: ${from} -> ${destination}`
      );
    }
    routes[priority].push({
      type: "redirect",
      // For backwards compatibility, a redirect is never considered an index route.
      isIndex: false,
      route,
      pattern,
      segments,
      params,
      component: from,
      generate,
      pathname: pathname || void 0,
      prerender: false,
      redirect: to,
      redirectRoute: routeMap.get(destination),
      fallbackRoutes: []
    });
  }
  return routes;
}
function isStaticSegment(segment) {
  return segment.every((part) => !part.dynamic && !part.spread);
}
function detectRouteCollision(a, b, _config, logger) {
  if (a.type === "fallback" || b.type === "fallback") {
    return;
  }
  if (a.route === b.route && a.segments.every(isStaticSegment) && b.segments.every(isStaticSegment)) {
    logger.warn(
      "router",
      `The route "${a.route}" is defined in both "${a.component}" and "${b.component}". A static route cannot be defined more than once.`
    );
    logger.warn(
      "router",
      "A collision will result in an hard error in following versions of Astro."
    );
    return;
  }
  if (a.prerender || b.prerender) {
    return;
  }
  if (a.segments.length !== b.segments.length) {
    return;
  }
  const segmentCount = a.segments.length;
  for (let index = 0; index < segmentCount; index++) {
    const segmentA = a.segments[index];
    const segmentB = b.segments[index];
    if (!isSemanticallyEqualSegment(segmentA, segmentB)) {
      return;
    }
  }
  logger.warn(
    "router",
    `The route "${a.route}" is defined in both "${a.component}" and "${b.component}" using SSR mode. A dynamic SSR route cannot be defined more than once.`
  );
  logger.warn("router", "A collision will result in an hard error in following versions of Astro.");
}
function createRouteManifest(params, logger) {
  const { settings } = params;
  const { config } = settings;
  const routeMap = /* @__PURE__ */ new Map();
  const fileBasedRoutes = createFileBasedRoutes(params, logger);
  for (const route of fileBasedRoutes) {
    routeMap.set(route.route, route);
  }
  const injectedRoutes = createInjectedRoutes(params);
  for (const [, routes2] of Object.entries(injectedRoutes)) {
    for (const route of routes2) {
      routeMap.set(route.route, route);
    }
  }
  const redirectRoutes = createRedirectRoutes(params, routeMap, logger);
  const routes = [
    ...injectedRoutes["legacy"].sort(routeComparator),
    ...[...fileBasedRoutes, ...injectedRoutes["normal"], ...redirectRoutes["normal"]].sort(
      routeComparator
    ),
    ...redirectRoutes["legacy"].sort(routeComparator)
  ];
  if (config.experimental.globalRoutePriority) {
    for (const [index, higherRoute] of routes.entries()) {
      for (const lowerRoute of routes.slice(index + 1)) {
        detectRouteCollision(higherRoute, lowerRoute, config, logger);
      }
    }
  }
  const i18n = settings.config.i18n;
  if (i18n) {
    const strategy = toRoutingStrategy(i18n.routing, i18n.domains);
    if (strategy === "pathname-prefix-always") {
      let index = routes.find((route) => route.route === "/");
      if (!index) {
        let relativePath = path.relative(
          fileURLToPath(settings.config.root),
          fileURLToPath(new URL("pages", settings.config.srcDir))
        );
        throw new AstroError({
          ...MissingIndexForInternationalization,
          message: MissingIndexForInternationalization.message(i18n.defaultLocale),
          hint: MissingIndexForInternationalization.hint(relativePath)
        });
      }
    }
    const routesByLocale = /* @__PURE__ */ new Map();
    const setRoutes = new Set(routes.filter((route) => route.type === "page"));
    const filteredLocales = i18n.locales.filter((loc) => {
      if (typeof loc === "string") {
        return loc !== i18n.defaultLocale;
      }
      return loc.path !== i18n.defaultLocale;
    }).map((locale) => {
      if (typeof locale === "string") {
        return locale;
      }
      return locale.path;
    });
    for (const locale of filteredLocales) {
      for (const route of setRoutes) {
        if (!route.route.includes(`/${locale}`)) {
          continue;
        }
        const currentRoutes = routesByLocale.get(locale);
        if (currentRoutes) {
          currentRoutes.push(route);
          routesByLocale.set(locale, currentRoutes);
        } else {
          routesByLocale.set(locale, [route]);
        }
        setRoutes.delete(route);
      }
    }
    for (const route of setRoutes) {
      const currentRoutes = routesByLocale.get(i18n.defaultLocale);
      if (currentRoutes) {
        currentRoutes.push(route);
        routesByLocale.set(i18n.defaultLocale, currentRoutes);
      } else {
        routesByLocale.set(i18n.defaultLocale, [route]);
      }
      setRoutes.delete(route);
    }
    if (strategy === "pathname-prefix-always") {
      const defaultLocaleRoutes = routesByLocale.get(i18n.defaultLocale);
      if (defaultLocaleRoutes) {
        const indexDefaultRoute = defaultLocaleRoutes.find(({ route }) => route === "/") ?? defaultLocaleRoutes.find(({ route }) => route === `/${i18n.defaultLocale}`);
        if (indexDefaultRoute) {
          const pathname = "/";
          const route = "/";
          const segments = removeLeadingForwardSlash(route).split(path.posix.sep).filter(Boolean).map((s) => {
            validateSegment(s);
            return getParts(s, route);
          });
          routes.push({
            ...indexDefaultRoute,
            pathname,
            route,
            segments,
            pattern: getPattern(segments, config.base, config.trailingSlash),
            type: "fallback"
          });
        }
      }
    }
    if (i18n.fallback) {
      let fallback = Object.entries(i18n.fallback);
      if (fallback.length > 0) {
        for (const [fallbackFromLocale, fallbackToLocale] of fallback) {
          let fallbackToRoutes;
          if (fallbackToLocale === i18n.defaultLocale) {
            fallbackToRoutes = routesByLocale.get(i18n.defaultLocale);
          } else {
            fallbackToRoutes = routesByLocale.get(fallbackToLocale);
          }
          const fallbackFromRoutes = routesByLocale.get(fallbackFromLocale);
          if (!fallbackToRoutes) {
            continue;
          }
          for (const fallbackToRoute of fallbackToRoutes) {
            const hasRoute = fallbackFromRoutes && // we check if the fallback from locale (the origin) has already this route
            fallbackFromRoutes.some((route) => {
              if (fallbackToLocale === i18n.defaultLocale) {
                return route.route.replace(`/${fallbackFromLocale}`, "") === fallbackToRoute.route;
              } else {
                return route.route.replace(`/${fallbackToLocale}`, `/${fallbackFromLocale}`) === fallbackToRoute.route;
              }
            });
            if (!hasRoute) {
              let pathname;
              let route;
              if (fallbackToLocale === i18n.defaultLocale && strategy === "pathname-prefix-other-locales") {
                if (fallbackToRoute.pathname) {
                  pathname = `/${fallbackFromLocale}${fallbackToRoute.pathname}`;
                }
                route = `/${fallbackFromLocale}${fallbackToRoute.route}`;
              } else {
                pathname = fallbackToRoute.pathname?.replace(`/${fallbackToLocale}/`, `/${fallbackFromLocale}/`).replace(`/${fallbackToLocale}`, `/${fallbackFromLocale}`);
                route = fallbackToRoute.route.replace(`/${fallbackToLocale}`, `/${fallbackFromLocale}`).replace(`/${fallbackToLocale}/`, `/${fallbackFromLocale}/`);
              }
              const segments = removeLeadingForwardSlash(route).split(path.posix.sep).filter(Boolean).map((s) => {
                validateSegment(s);
                return getParts(s, route);
              });
              const generate = getRouteGenerator(segments, config.trailingSlash);
              const index = routes.findIndex((r) => r === fallbackToRoute);
              if (index >= 0) {
                const fallbackRoute = {
                  ...fallbackToRoute,
                  pathname,
                  route,
                  segments,
                  generate,
                  pattern: getPattern(segments, config.base, config.trailingSlash),
                  type: "fallback",
                  fallbackRoutes: []
                };
                const routeData = routes[index];
                routeData.fallbackRoutes.push(fallbackRoute);
              }
            }
          }
        }
      }
    }
  }
  return {
    routes
  };
}
function computeRoutePriority(config) {
  if (config.experimental.globalRoutePriority) {
    return "normal";
  }
  return "legacy";
}
function joinSegments(segments) {
  const arr = segments.map((segment) => {
    return segment.map((rp) => rp.dynamic ? `[${rp.content}]` : rp.content).join("");
  });
  return `/${arr.join("/")}`.toLowerCase();
}
export {
  createRouteManifest,
  getParts,
  validateSegment
};

import { existsSync, readFileSync } from "node:fs";
import { basename } from "node:path";
import { pathToFileURL } from "node:url";
import { removeDir, writeJson } from "@astrojs/internal-helpers/fs";
import { AstroError } from "astro/errors";
import glob from "fast-glob";
import {
  getAstroImageConfig,
  getDefaultImageConfig
} from "../image/shared.js";
import { copyDependenciesToFunction } from "../lib/nft.js";
import { escapeRegex, getRedirects } from "../lib/redirects.js";
import {
  getSpeedInsightsViteConfig
} from "../lib/speed-insights.js";
import {
  getInjectableWebAnalyticsContent
} from "../lib/web-analytics.js";
import { generateEdgeMiddleware } from "./middleware.js";
const PACKAGE_NAME = "@astrojs/vercel/serverless";
const ASTRO_PATH_HEADER = "x-astro-path";
const ASTRO_PATH_PARAM = "x_astro_path";
const ASTRO_LOCALS_HEADER = "x-astro-locals";
const ASTRO_MIDDLEWARE_SECRET_HEADER = "x-astro-middleware-secret";
const VERCEL_EDGE_MIDDLEWARE_FILE = "vercel-edge-middleware";
const NODE_PATH = "_render";
const MIDDLEWARE_PATH = "_middleware";
const ISR_PATH = `/_isr?${ASTRO_PATH_PARAM}=$0`;
const SUPPORTED_NODE_VERSIONS = {
  18: { status: "retiring", removal: "Early 2025", warnDate: /* @__PURE__ */ new Date("October 1 2024") },
  20: { status: "default" }
};
function getAdapter({
  edgeMiddleware,
  functionPerRoute,
  middlewareSecret,
  skewProtection
}) {
  return {
    name: PACKAGE_NAME,
    serverEntrypoint: `${PACKAGE_NAME}/entrypoint`,
    exports: ["default"],
    args: { middlewareSecret, skewProtection },
    adapterFeatures: {
      edgeMiddleware,
      functionPerRoute
    },
    supportedAstroFeatures: {
      hybridOutput: "stable",
      staticOutput: "stable",
      serverOutput: "stable",
      assets: {
        supportKind: "stable",
        isSharpCompatible: true,
        isSquooshCompatible: true
      },
      i18nDomains: "experimental",
      envGetSecret: "experimental"
    }
  };
}
function vercelServerless({
  webAnalytics,
  speedInsights,
  includeFiles: _includeFiles = [],
  excludeFiles: _excludeFiles = [],
  imageService,
  imagesConfig,
  devImageService = "sharp",
  functionPerRoute = false,
  edgeMiddleware = false,
  maxDuration,
  isr = false,
  skewProtection = false
} = {}) {
  if (maxDuration) {
    if (typeof maxDuration !== "number") {
      throw new TypeError(`maxDuration must be a number`, { cause: maxDuration });
    }
    if (maxDuration <= 0) {
      throw new TypeError(`maxDuration must be a positive number`, { cause: maxDuration });
    }
  }
  let _config;
  let _buildTempFolder;
  let _serverEntry;
  let _entryPoints;
  let _middlewareEntryPoint;
  const extraFilesToInclude = [];
  const middlewareSecret = crypto.randomUUID();
  return {
    name: PACKAGE_NAME,
    hooks: {
      "astro:config:setup": async ({ command, config, updateConfig, injectScript, logger }) => {
        if (maxDuration && maxDuration > 900) {
          logger.warn(
            `maxDuration is set to ${maxDuration} seconds, which is longer than the maximum allowed duration of 900 seconds.`
          );
          logger.warn(
            `Please make sure that your plan allows for this duration. See https://vercel.com/docs/functions/serverless-functions/runtimes#maxduration for more information.`
          );
        }
        if (webAnalytics?.enabled) {
          injectScript(
            "head-inline",
            await getInjectableWebAnalyticsContent({
              mode: command === "dev" ? "development" : "production"
            })
          );
        }
        if (command === "build" && speedInsights?.enabled) {
          injectScript("page", 'import "@astrojs/vercel/speed-insights"');
        }
        const vercelConfigPath = new URL("vercel.json", config.root);
        if (existsSync(vercelConfigPath)) {
          try {
            const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf-8"));
            if (vercelConfig.trailingSlash === true && config.trailingSlash === "always") {
              logger.warn(
                `
	Your "vercel.json" \`trailingSlash\` configuration (set to \`true\`) will conflict with your Astro \`trailinglSlash\` configuration (set to \`"always"\`).
	This would cause infinite redirects under certain conditions and throw an \`ERR_TOO_MANY_REDIRECTS\` error.
	To prevent this, your Astro configuration is updated to \`"ignore"\` during builds.
`
              );
              updateConfig({
                trailingSlash: "ignore"
              });
            }
          } catch (_err) {
            logger.warn(`Your "vercel.json" config is not a valid json file.`);
          }
        }
        updateConfig({
          outDir: new URL("./.vercel/output/", config.root),
          build: {
            client: new URL("./.vercel/output/static/", config.root),
            server: new URL("./.vercel/output/_functions/", config.root),
            redirects: false
          },
          vite: {
            ...getSpeedInsightsViteConfig(speedInsights?.enabled),
            ssr: {
              external: [
                "@vercel/nft",
                ...await shouldExternalizeAstroEnvSetup() ? ["astro/env/setup"] : []
              ]
            }
          },
          ...getAstroImageConfig(
            imageService,
            imagesConfig,
            command,
            devImageService,
            config.image
          )
        });
      },
      "astro:config:done": ({ setAdapter, config, logger }) => {
        if (functionPerRoute === true) {
          logger.warn(
            `
	Vercel's hosting plans might have limits to the number of functions you can create.
	Make sure to check your plan carefully to avoid incurring additional costs.
	You can set functionPerRoute: false to prevent surpassing the limit.
`
          );
        }
        setAdapter(
          getAdapter({ functionPerRoute, edgeMiddleware, middlewareSecret, skewProtection })
        );
        _config = config;
        _buildTempFolder = config.build.server;
        _serverEntry = config.build.serverEntry;
        if (config.output === "static") {
          throw new AstroError(
            '`output: "server"` or `output: "hybrid"` is required to use the serverless adapter.'
          );
        }
      },
      "astro:build:ssr": async ({ entryPoints, middlewareEntryPoint }) => {
        _entryPoints = new Map(
          Array.from(entryPoints).filter(([routeData]) => !routeData.prerender)
        );
        _middlewareEntryPoint = middlewareEntryPoint;
      },
      "astro:build:done": async ({ routes, logger }) => {
        if (_config.vite.assetsInclude) {
          const mergeGlobbedIncludes = (globPattern) => {
            if (typeof globPattern === "string") {
              const entries = glob.sync(globPattern).map((p) => pathToFileURL(p));
              extraFilesToInclude.push(...entries);
            } else if (Array.isArray(globPattern)) {
              for (const pattern of globPattern) {
                mergeGlobbedIncludes(pattern);
              }
            }
          };
          mergeGlobbedIncludes(_config.vite.assetsInclude);
        }
        const routeDefinitions = [];
        const includeFiles = _includeFiles.map((file) => new URL(file, _config.root)).concat(extraFilesToInclude);
        const excludeFiles = _excludeFiles.map((file) => new URL(file, _config.root));
        const builder = new VercelBuilder(_config, excludeFiles, includeFiles, logger, maxDuration);
        if (_entryPoints.size) {
          const getRouteFuncName = (route) => route.component.replace("src/pages/", "");
          const getFallbackFuncName = (entryFile) => basename(entryFile.toString()).replace("entry.", "").replace(/\.mjs$/, "");
          for (const [route, entryFile] of _entryPoints) {
            const func = route.component.startsWith("src/pages/") ? getRouteFuncName(route) : getFallbackFuncName(entryFile);
            await builder.buildServerlessFolder(entryFile, func);
            routeDefinitions.push({
              src: route.pattern.source,
              dest: func
            });
          }
        } else {
          const entryFile = new URL(_serverEntry, _buildTempFolder);
          if (isr) {
            const isrConfig = typeof isr === "object" ? isr : {};
            await builder.buildServerlessFolder(entryFile, NODE_PATH);
            if (isrConfig.exclude?.length) {
              const dest = _middlewareEntryPoint ? MIDDLEWARE_PATH : NODE_PATH;
              for (const route of isrConfig.exclude) {
                routeDefinitions.push({ src: escapeRegex(route), dest });
              }
            }
            await builder.buildISRFolder(entryFile, "_isr", isrConfig);
            for (const route of routes) {
              const src = route.pattern.source;
              const dest = src.startsWith("^\\/_image") ? NODE_PATH : ISR_PATH;
              if (!route.prerender) routeDefinitions.push({ src, dest });
            }
          } else {
            await builder.buildServerlessFolder(entryFile, NODE_PATH);
            const dest = _middlewareEntryPoint ? MIDDLEWARE_PATH : NODE_PATH;
            for (const route of routes) {
              if (!route.prerender) routeDefinitions.push({ src: route.pattern.source, dest });
            }
          }
        }
        if (_middlewareEntryPoint) {
          await builder.buildMiddlewareFolder(
            _middlewareEntryPoint,
            MIDDLEWARE_PATH,
            middlewareSecret
          );
        }
        const fourOhFourRoute = routes.find((route) => route.pathname === "/404");
        await writeJson(new URL(`./config.json`, _config.outDir), {
          version: 3,
          routes: [
            ...getRedirects(routes, _config),
            {
              src: `^/${_config.build.assets}/(.*)$`,
              headers: { "cache-control": "public, max-age=31536000, immutable" },
              continue: true
            },
            { handle: "filesystem" },
            ...routeDefinitions,
            ...fourOhFourRoute ? [
              {
                src: "/.*",
                dest: fourOhFourRoute.prerender ? "/404.html" : _middlewareEntryPoint ? MIDDLEWARE_PATH : NODE_PATH,
                status: 404
              }
            ] : []
          ],
          ...imageService || imagesConfig ? {
            images: imagesConfig ? {
              ...imagesConfig,
              domains: [...imagesConfig.domains, ..._config.image.domains],
              remotePatterns: [
                ...imagesConfig.remotePatterns ?? [],
                ..._config.image.remotePatterns
              ]
            } : getDefaultImageConfig(_config.image)
          } : {}
        });
        await removeDir(_buildTempFolder);
      }
    }
  };
}
async function shouldExternalizeAstroEnvSetup() {
  try {
    await import("astro/env/setup");
    return false;
  } catch {
    return true;
  }
}
class VercelBuilder {
  constructor(config, excludeFiles, includeFiles, logger, maxDuration, runtime = getRuntime(process, logger)) {
    this.config = config;
    this.excludeFiles = excludeFiles;
    this.includeFiles = includeFiles;
    this.logger = logger;
    this.maxDuration = maxDuration;
    this.runtime = runtime;
  }
  NTF_CACHE = {};
  async buildServerlessFolder(entry, functionName) {
    const { config, includeFiles, excludeFiles, logger, NTF_CACHE, runtime, maxDuration } = this;
    const functionFolder = new URL(`./functions/${functionName}.func/`, config.outDir);
    const packageJson = new URL(`./functions/${functionName}.func/package.json`, config.outDir);
    const vcConfig = new URL(`./functions/${functionName}.func/.vc-config.json`, config.outDir);
    const { handler } = await copyDependenciesToFunction(
      {
        entry,
        outDir: functionFolder,
        includeFiles,
        excludeFiles,
        logger
      },
      NTF_CACHE
    );
    await writeJson(packageJson, { type: "module" });
    await writeJson(vcConfig, {
      runtime,
      handler: handler.replaceAll("\\", "/"),
      launcherType: "Nodejs",
      maxDuration,
      supportsResponseStreaming: true
    });
  }
  async buildISRFolder(entry, functionName, isr) {
    await this.buildServerlessFolder(entry, functionName);
    const prerenderConfig = new URL(
      `./functions/${functionName}.prerender-config.json`,
      this.config.outDir
    );
    await writeJson(prerenderConfig, {
      expiration: isr.expiration ?? false,
      bypassToken: isr.bypassToken,
      allowQuery: [ASTRO_PATH_PARAM],
      passQuery: true
    });
  }
  async buildMiddlewareFolder(entry, functionName, middlewareSecret) {
    const functionFolder = new URL(`./functions/${functionName}.func/`, this.config.outDir);
    await generateEdgeMiddleware(
      entry,
      this.config.root,
      new URL(VERCEL_EDGE_MIDDLEWARE_FILE, this.config.srcDir),
      new URL("./middleware.mjs", functionFolder),
      middlewareSecret,
      this.logger
    );
    await writeJson(new URL(`./.vc-config.json`, functionFolder), {
      runtime: "edge",
      entrypoint: "middleware.mjs"
    });
  }
}
function getRuntime(process2, logger) {
  const version = process2.version.slice(1);
  const major = version.split(".")[0];
  const support = SUPPORTED_NODE_VERSIONS[major];
  if (support === void 0) {
    logger.warn(
      `
	The local Node.js version (${major}) is not supported by Vercel Serverless Functions.
	Your project will use Node.js 18 as the runtime instead.
	Consider switching your local version to 18.
`
    );
    return "nodejs18.x";
  }
  if (support.status === "default") {
    return `nodejs${major}.x`;
  }
  if (support.status === "retiring") {
    if (support.warnDate && /* @__PURE__ */ new Date() >= support.warnDate) {
      logger.warn(
        `Your project is being built for Node.js ${major} as the runtime, which is retiring by ${support.removal}.`
      );
    }
    return `nodejs${major}.x`;
  }
  if (support.status === "beta") {
    logger.warn(
      `Your project is being built for Node.js ${major} as the runtime, which is currently in beta for Vercel Serverless Functions.`
    );
    return `nodejs${major}.x`;
  }
  if (support.status === "deprecated") {
    const removeDate = new Intl.DateTimeFormat(void 0, { dateStyle: "long" }).format(
      support.removal
    );
    logger.warn(
      `
	Your project is being built for Node.js ${major} as the runtime.
	This version is deprecated by Vercel Serverless Functions, and scheduled to be disabled on ${removeDate}.
	Consider upgrading your local version to 18.
`
    );
    return `nodejs${major}.x`;
  }
  return "nodejs18.x";
}
export {
  ASTRO_LOCALS_HEADER,
  ASTRO_MIDDLEWARE_SECRET_HEADER,
  ASTRO_PATH_HEADER,
  ASTRO_PATH_PARAM,
  NODE_PATH,
  VERCEL_EDGE_MIDDLEWARE_FILE,
  vercelServerless as default
};

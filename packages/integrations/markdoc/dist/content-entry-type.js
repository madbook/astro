import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import Markdoc from "@markdoc/markdoc";
import { emitESMImage } from "astro/assets/utils";
import matter from "gray-matter";
import { htmlTokenTransform } from "./html/transform/html-token-transform.js";
import { setupConfig } from "./runtime.js";
import { getMarkdocTokenizer } from "./tokenizer.js";
import { MarkdocError, isComponentConfig, isValidUrl, prependForwardSlash } from "./utils.js";
async function getContentEntryType({
  markdocConfigResult,
  astroConfig,
  options
}) {
  return {
    extensions: [".mdoc"],
    getEntryInfo,
    handlePropagation: true,
    async getRenderModule({ contents, fileUrl, viteId }) {
      const entry = getEntryInfo({ contents, fileUrl });
      const tokenizer = getMarkdocTokenizer(options);
      let tokens = tokenizer.tokenize(entry.body);
      if (options?.allowHTML) {
        tokens = htmlTokenTransform(tokenizer, tokens);
      }
      const ast = Markdoc.parse(tokens);
      const userMarkdocConfig = markdocConfigResult?.config ?? {};
      const markdocConfigUrl = markdocConfigResult?.fileUrl;
      const pluginContext = this;
      const markdocConfig = await setupConfig(userMarkdocConfig, options);
      const filePath = fileURLToPath(fileUrl);
      raiseValidationErrors({
        ast,
        /* Raised generics issue with Markdoc core https://github.com/markdoc/markdoc/discussions/400 */
        markdocConfig,
        entry,
        viteId,
        astroConfig,
        filePath
      });
      await resolvePartials({
        ast,
        markdocConfig,
        fileUrl,
        allowHTML: options?.allowHTML,
        tokenizer,
        pluginContext,
        root: astroConfig.root,
        raisePartialValidationErrors: (partialAst, partialPath) => {
          raiseValidationErrors({
            ast: partialAst,
            markdocConfig,
            entry,
            viteId,
            astroConfig,
            filePath: partialPath
          });
        }
      });
      const usedTags = getUsedTags(ast);
      let componentConfigByTagMap = {};
      for (const tag of usedTags) {
        const render = userMarkdocConfig.tags?.[tag]?.render;
        if (isComponentConfig(render)) {
          componentConfigByTagMap[tag] = render;
        }
      }
      let componentConfigByNodeMap = {};
      for (const [nodeType, schema] of Object.entries(userMarkdocConfig.nodes ?? {})) {
        const render = schema?.render;
        if (isComponentConfig(render)) {
          componentConfigByNodeMap[nodeType] = render;
        }
      }
      await emitOptimizedImages(ast.children, {
        astroConfig,
        pluginContext,
        filePath
      });
      const res = `import { Renderer } from '@astrojs/markdoc/components';
import { createGetHeadings, createContentComponent } from '@astrojs/markdoc/runtime';
${markdocConfigUrl ? `import markdocConfig from ${JSON.stringify(fileURLToPath(markdocConfigUrl))};` : "const markdocConfig = {};"}

import { assetsConfig } from '@astrojs/markdoc/runtime-assets-config';
markdocConfig.nodes = { ...assetsConfig.nodes, ...markdocConfig.nodes };

${getStringifiedImports(componentConfigByTagMap, "Tag", astroConfig.root)}
${getStringifiedImports(componentConfigByNodeMap, "Node", astroConfig.root)}

const tagComponentMap = ${getStringifiedMap(componentConfigByTagMap, "Tag")};
const nodeComponentMap = ${getStringifiedMap(componentConfigByNodeMap, "Node")};

const options = ${JSON.stringify(options)};

const stringifiedAst = ${JSON.stringify(
        /* Double stringify to encode *as* stringified JSON */
        JSON.stringify(ast)
      )};

export const getHeadings = createGetHeadings(stringifiedAst, markdocConfig, options);
export const Content = createContentComponent(
	Renderer,
	stringifiedAst,
	markdocConfig,
  options,
	tagComponentMap,
	nodeComponentMap,
)`;
      return { code: res };
    },
    contentModuleTypes: await fs.promises.readFile(
      new URL("../template/content-module-types.d.ts", import.meta.url),
      "utf-8"
    )
  };
}
async function resolvePartials({
  ast,
  fileUrl,
  root,
  tokenizer,
  allowHTML,
  markdocConfig,
  pluginContext,
  raisePartialValidationErrors
}) {
  const relativePartialPath = path.relative(fileURLToPath(root), fileURLToPath(fileUrl));
  for (const node of ast.walk()) {
    if (node.type === "tag" && node.tag === "partial") {
      const { file } = node.attributes;
      if (!file) {
        throw new MarkdocError({
          // Should be caught by Markdoc validation step.
          message: `(Uncaught error) Partial tag requires a 'file' attribute`
        });
      }
      if (markdocConfig.partials?.[file]) continue;
      let partialPath;
      let partialContents;
      try {
        const resolved = await pluginContext.resolve(file, fileURLToPath(fileUrl));
        let partialId = resolved?.id;
        if (!partialId) {
          const attemptResolveAsRelative = await pluginContext.resolve(
            "./" + file,
            fileURLToPath(fileUrl)
          );
          if (!attemptResolveAsRelative?.id) throw new Error();
          partialId = attemptResolveAsRelative.id;
        }
        partialPath = fileURLToPath(new URL(prependForwardSlash(partialId), "file://"));
        partialContents = await fs.promises.readFile(partialPath, "utf-8");
      } catch {
        throw new MarkdocError({
          message: [
            `**${String(relativePartialPath)}** contains invalid content:`,
            `Could not read partial file \`${file}\`. Does the file exist?`
          ].join("\n")
        });
      }
      if (pluginContext.meta.watchMode) pluginContext.addWatchFile(partialPath);
      let partialTokens = tokenizer.tokenize(partialContents);
      if (allowHTML) {
        partialTokens = htmlTokenTransform(tokenizer, partialTokens);
      }
      const partialAst = Markdoc.parse(partialTokens);
      raisePartialValidationErrors(partialAst, partialPath);
      await resolvePartials({
        ast: partialAst,
        root,
        fileUrl: pathToFileURL(partialPath),
        tokenizer,
        allowHTML,
        markdocConfig,
        pluginContext,
        raisePartialValidationErrors
      });
      Object.assign(node, partialAst);
    }
  }
}
function raiseValidationErrors({
  ast,
  markdocConfig,
  entry,
  viteId,
  astroConfig,
  filePath
}) {
  const validationErrors = Markdoc.validate(ast, markdocConfig).filter((e) => {
    return (e.error.level === "error" || e.error.level === "critical") && // Ignore `variable-undefined` errors.
    // Variables can be configured at runtime,
    // so we cannot validate them at build time.
    e.error.id !== "variable-undefined" && // Ignore missing partial errors.
    // We will resolve these in `resolvePartials`.
    !(e.error.id === "attribute-value-invalid" && e.error.message.match(/^Partial .+ not found/));
  });
  if (validationErrors.length) {
    const frontmatterBlockOffset = entry.rawData.split("\n").length + 2;
    const rootRelativePath = path.relative(fileURLToPath(astroConfig.root), filePath);
    throw new MarkdocError({
      message: [
        `**${String(rootRelativePath)}** contains invalid content:`,
        ...validationErrors.map((e) => `- ${e.error.message}`)
      ].join("\n"),
      location: {
        // Error overlay does not support multi-line or ranges.
        // Just point to the first line.
        line: frontmatterBlockOffset + validationErrors[0].lines[0],
        file: viteId
      }
    });
  }
}
function getUsedTags(markdocAst) {
  const tags = /* @__PURE__ */ new Set();
  const validationErrors = Markdoc.validate(markdocAst);
  for (const { error } of validationErrors) {
    if (error.id === "tag-undefined") {
      const [, tagName] = error.message.match(/Undefined tag: '(.*)'/) ?? [];
      tags.add(tagName);
    }
  }
  return tags;
}
function getEntryInfo({ fileUrl, contents }) {
  const parsed = parseFrontmatter(contents, fileURLToPath(fileUrl));
  return {
    data: parsed.data,
    body: parsed.content,
    slug: parsed.data.slug,
    rawData: parsed.matter
  };
}
async function emitOptimizedImages(nodeChildren, ctx) {
  for (const node of nodeChildren) {
    let isComponent = node.type === "tag" && node.tag === "image";
    if ((node.type === "image" || isComponent) && typeof node.attributes.src === "string") {
      let attributeName = isComponent ? "src" : "__optimizedSrc";
      if (shouldOptimizeImage(node.attributes.src)) {
        const resolved = await ctx.pluginContext.resolve(node.attributes.src, ctx.filePath);
        if (resolved?.id && fs.existsSync(new URL(prependForwardSlash(resolved.id), "file://"))) {
          const src = await emitESMImage(
            resolved.id,
            ctx.pluginContext.meta.watchMode,
            ctx.pluginContext.emitFile
          );
          const fsPath = resolved.id;
          if (src) {
            if (ctx.astroConfig.output === "static") {
              if (globalThis.astroAsset.referencedImages)
                globalThis.astroAsset.referencedImages.add(fsPath);
            }
            node.attributes[attributeName] = { ...src, fsPath };
          }
        } else {
          throw new MarkdocError({
            message: `Could not resolve image ${JSON.stringify(
              node.attributes.src
            )} from ${JSON.stringify(ctx.filePath)}. Does the file exist?`
          });
        }
      } else if (isComponent) {
        node.attributes[attributeName] = node.attributes.src;
      }
    }
    await emitOptimizedImages(node.children, ctx);
  }
}
function shouldOptimizeImage(src) {
  return !isValidUrl(src) && !src.startsWith("/");
}
function getStringifiedImports(componentConfigMap, componentNamePrefix, root) {
  let stringifiedComponentImports = "";
  for (const [key, config] of Object.entries(componentConfigMap)) {
    const importName = config.namedExport ? `{ ${config.namedExport} as ${componentNamePrefix + toImportName(key)} }` : componentNamePrefix + toImportName(key);
    const resolvedPath = config.type === "local" ? fileURLToPath(new URL(config.path, root)) : config.path;
    stringifiedComponentImports += `import ${importName} from ${JSON.stringify(resolvedPath)};
`;
  }
  return stringifiedComponentImports;
}
function toImportName(unsafeName) {
  return unsafeName.replace("-", "_");
}
function getStringifiedMap(componentConfigMap, componentNamePrefix) {
  let stringifiedComponentMap = "{";
  for (const key in componentConfigMap) {
    stringifiedComponentMap += `${JSON.stringify(key)}: ${componentNamePrefix + toImportName(key)},
`;
  }
  stringifiedComponentMap += "}";
  return stringifiedComponentMap;
}
function parseFrontmatter(fileContents, filePath) {
  try {
    matter.clearCache();
    return matter(fileContents);
  } catch (e) {
    if (e.name === "YAMLException") {
      const err = e;
      err.id = filePath;
      err.loc = { file: e.id, line: e.mark.line + 1, column: e.mark.column };
      err.message = e.reason;
      throw err;
    } else {
      throw e;
    }
  }
}
export {
  getContentEntryType
};

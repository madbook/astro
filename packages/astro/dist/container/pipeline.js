import { Pipeline } from "../core/base-pipeline.js";
import {
  createModuleScriptElement,
  createStylesheetElementSet
} from "../core/render/ssr-element.js";
import { findRouteToRewrite } from "../core/routing/rewrite.js";
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
export {
  ContainerPipeline
};

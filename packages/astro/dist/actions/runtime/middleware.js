import { yellow } from "kleur/colors";
import {
  ActionQueryStringInvalidError,
  ActionsUsedWithForGetError
} from "../../core/errors/errors-data.js";
import { AstroError } from "../../core/errors/errors.js";
import { defineMiddleware } from "../../core/middleware/index.js";
import { formContentTypes, hasContentType } from "./utils.js";
import { getAction } from "./virtual/get-action.js";
import {
  serializeActionResult
} from "./virtual/shared.js";
const onRequest = defineMiddleware(async (context, next) => {
  const locals = context.locals;
  const { request } = context;
  if (locals._actionsInternal) return next();
  if (import.meta.env.DEV && request.method === "POST" && request.body === null) {
    console.warn(
      yellow("[astro:actions]"),
      'POST requests should not be sent to prerendered pages. If you\'re using Actions, disable prerendering with `export const prerender = "false".'
    );
    return next();
  }
  const actionName = context.url.searchParams.get("_astroAction");
  if (context.request.method === "POST" && actionName) {
    return handlePost({ context, next, actionName });
  }
  if (context.request.method === "GET" && actionName) {
    throw new AstroError({
      ...ActionsUsedWithForGetError,
      message: ActionsUsedWithForGetError.message(actionName)
    });
  }
  if (context.request.method === "POST") {
    return handlePostLegacy({ context, next });
  }
  return next();
});
async function handlePost({
  context,
  next,
  actionName
}) {
  const { request } = context;
  const baseAction = await getAction(actionName);
  if (!baseAction) {
    throw new AstroError({
      ...ActionQueryStringInvalidError,
      message: ActionQueryStringInvalidError.message(actionName)
    });
  }
  const contentType = request.headers.get("content-type");
  let formData;
  if (contentType && hasContentType(contentType, formContentTypes)) {
    formData = await request.clone().formData();
  }
  const action = baseAction.bind(context);
  const actionResult = await action(formData);
  return handleResult({ context, next, actionName, actionResult });
}
async function handleResult({
  context,
  next,
  actionName,
  actionResult
}) {
  const locals = context.locals;
  locals._actionsInternal = {
    actionName,
    actionResult: serializeActionResult(actionResult)
  };
  const response = await next();
  if (actionResult.error) {
    return new Response(response.body, {
      status: actionResult.error.status,
      statusText: actionResult.error.type,
      headers: response.headers
    });
  }
  return response;
}
async function handlePostLegacy({ context, next }) {
  const { request } = context;
  if (context.url.pathname.startsWith("/_actions")) return next();
  const contentType = request.headers.get("content-type");
  let formData;
  if (contentType && hasContentType(contentType, formContentTypes)) {
    formData = await request.clone().formData();
  }
  if (!formData) return next();
  const actionName = formData.get("_astroAction");
  if (!actionName) return next();
  const baseAction = await getAction(actionName);
  if (!baseAction) {
    throw new AstroError({
      ...ActionQueryStringInvalidError,
      message: ActionQueryStringInvalidError.message(actionName)
    });
  }
  const action = baseAction.bind(context);
  const actionResult = await action(formData);
  return handleResult({ context, next, actionName, actionResult });
}
export {
  onRequest
};

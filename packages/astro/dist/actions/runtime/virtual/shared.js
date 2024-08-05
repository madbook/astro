import { parse as devalueParse, stringify as devalueStringify } from "devalue";
const ACTION_ERROR_CODES = [
  "BAD_REQUEST",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "TIMEOUT",
  "CONFLICT",
  "PRECONDITION_FAILED",
  "PAYLOAD_TOO_LARGE",
  "UNSUPPORTED_MEDIA_TYPE",
  "UNPROCESSABLE_CONTENT",
  "TOO_MANY_REQUESTS",
  "CLIENT_CLOSED_REQUEST",
  "INTERNAL_SERVER_ERROR"
];
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
const statusToCodeMap = Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);
class ActionError extends Error {
  type = "AstroActionError";
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(params) {
    super(params.message);
    this.code = params.code;
    this.status = ActionError.codeToStatus(params.code);
    if (params.stack) {
      this.stack = params.stack;
    }
  }
  static codeToStatus(code) {
    return codeToStatusMap[code];
  }
  static statusToCode(status) {
    return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
  }
  static fromJson(body) {
    if (isInputError(body)) {
      return new ActionInputError(body.issues);
    }
    if (isActionError(body)) {
      return new ActionError(body);
    }
    return new ActionError({
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
function isActionError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
class ActionInputError extends ActionError {
  type = "AstroActionInputError";
  // We don't expose all ZodError properties.
  // Not all properties will serialize from server to client,
  // and we don't want to import the full ZodError object into the client.
  issues;
  fields;
  constructor(issues) {
    super({
      message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
      code: "BAD_REQUEST"
    });
    this.issues = issues;
    this.fields = {};
    for (const issue of issues) {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        this.fields[key] ??= [];
        this.fields[key]?.push(issue.message);
      }
    }
  }
}
async function callSafely(handler) {
  try {
    const data = await handler();
    return { data, error: void 0 };
  } catch (e) {
    if (e instanceof ActionError) {
      return { data: void 0, error: e };
    }
    return {
      data: void 0,
      error: new ActionError({
        message: e instanceof Error ? e.message : "Unknown error",
        code: "INTERNAL_SERVER_ERROR"
      })
    };
  }
}
function getActionQueryString(name) {
  const searchParams = new URLSearchParams({ _astroAction: name });
  return `?${searchParams.toString()}`;
}
function getActionProps(action) {
  const params = new URLSearchParams(action.toString());
  const actionName = params.get("_astroAction");
  if (!actionName) {
    throw new Error("Invalid actions function was passed to getActionProps()");
  }
  return {
    type: "hidden",
    name: "_astroAction",
    value: actionName
  };
}
function serializeActionResult(res) {
  if (res.error) {
    return {
      type: "error",
      status: res.error.status,
      contentType: "application/json",
      body: JSON.stringify({
        ...res.error,
        message: res.error.message,
        stack: import.meta.env.PROD ? void 0 : res.error.stack
      })
    };
  }
  if (res.data === void 0) {
    return {
      type: "empty",
      status: 204
    };
  }
  return {
    type: "data",
    status: 200,
    contentType: "application/json+devalue",
    body: devalueStringify(res.data, {
      // Add support for URL objects
      URL: (value) => value instanceof URL && value.href
    })
  };
}
function deserializeActionResult(res) {
  if (res.type === "error") {
    return { error: ActionError.fromJson(JSON.parse(res.body)), data: void 0 };
  }
  if (res.type === "empty") {
    return { data: void 0, error: void 0 };
  }
  return {
    data: devalueParse(res.body, {
      URL: (href) => new URL(href)
    }),
    error: void 0
  };
}
export {
  ACTION_ERROR_CODES,
  ActionError,
  ActionInputError,
  callSafely,
  deserializeActionResult,
  getActionProps,
  getActionQueryString,
  isActionError,
  isInputError,
  serializeActionResult
};

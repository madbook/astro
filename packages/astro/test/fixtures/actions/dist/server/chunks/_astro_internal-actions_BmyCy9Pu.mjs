import './_astro_actions_D5GzeLVO.mjs';
import { z } from 'zod';
import { A as AstroError, $ as ActionCalledFromServerError } from './astro/assets-service_6aOxa5YE.mjs';
import { c as callSafely, A as ActionError, a as ActionInputError } from './shared_C5IXs-66.mjs';

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function") {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!(inputSchema instanceof z.ZodObject)) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(formDataToObject(unparsedInput, inputSchema));
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function getJsonServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (unparsedInput instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(unparsedInput);
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z.ZodOptional || validator instanceof z.ZodNullable) {
      validator = validator._def.innerType;
    }
    if (validator instanceof z.ZodBoolean) {
      obj[key] = formData.has(key);
    } else if (validator instanceof z.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z.ZodOptional ? void 0 : null;
  }
  return validator instanceof z.ZodNumber ? Number(value) : value;
}

const server = {
  subscribe: defineAction({
    input: z.object({ channel: z.string() }),
    handler: async ({ channel }) => {
      return {
        channel,
        subscribeButtonState: "smashed"
      };
    }
  }),
  subscribeFromServer: defineAction({
    input: z.object({ channel: z.string() }),
    handler: async ({ channel }, { url }) => {
      return {
        // Returned to ensure path rewrites are respected
        url: url.pathname,
        channel,
        subscribeButtonState: "smashed"
      };
    }
  }),
  comment: defineAction({
    accept: "form",
    input: z.object({ channel: z.string(), comment: z.string() }),
    handler: async ({ channel, comment }) => {
      return {
        channel,
        comment
      };
    }
  }),
  commentPlainFormData: defineAction({
    accept: "form",
    handler: async (formData) => {
      return {
        success: true,
        isFormData: formData instanceof FormData
      };
    }
  }),
  getUser: defineAction({
    accept: "form",
    handler: async (_, { locals }) => {
      return locals.user;
    }
  }),
  getUserOrThrow: defineAction({
    accept: "form",
    handler: async (_, { locals }) => {
      if (locals.user?.name !== "admin") {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in"
        });
      }
      return locals.user;
    }
  }),
  fireAndForget: defineAction({
    handler: async () => {
      return;
    }
  }),
  zero: defineAction({
    handler: async () => {
      return 0;
    }
  }),
  false: defineAction({
    handler: async () => {
      return false;
    }
  }),
  complexValues: defineAction({
    handler: async () => {
      return {
        date: /* @__PURE__ */ new Date(),
        set: /* @__PURE__ */ new Set(),
        url: new URL("https://example.com")
      };
    }
  })
};

export { server };

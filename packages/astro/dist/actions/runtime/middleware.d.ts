import { type SerializedActionResult } from './virtual/shared.js';
export type Locals = {
    _actionsInternal: {
        actionResult: SerializedActionResult;
        actionName: string;
    };
};
export declare const onRequest: import("../../@types/astro.js").MiddlewareHandler;

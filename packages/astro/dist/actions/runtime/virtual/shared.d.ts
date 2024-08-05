import type { z } from 'zod';
import type { ErrorInferenceObject, MaybePromise } from '../utils.js';
export declare const ACTION_ERROR_CODES: readonly ["BAD_REQUEST", "UNAUTHORIZED", "FORBIDDEN", "NOT_FOUND", "TIMEOUT", "CONFLICT", "PRECONDITION_FAILED", "PAYLOAD_TOO_LARGE", "UNSUPPORTED_MEDIA_TYPE", "UNPROCESSABLE_CONTENT", "TOO_MANY_REQUESTS", "CLIENT_CLOSED_REQUEST", "INTERNAL_SERVER_ERROR"];
export type ActionErrorCode = (typeof ACTION_ERROR_CODES)[number];
export declare class ActionError<T extends ErrorInferenceObject = ErrorInferenceObject> extends Error {
    type: string;
    code: ActionErrorCode;
    status: number;
    constructor(params: {
        message?: string;
        code: ActionErrorCode;
        stack?: string;
    });
    static codeToStatus(code: ActionErrorCode): number;
    static statusToCode(status: number): ActionErrorCode;
    static fromJson(body: any): ActionError<ErrorInferenceObject>;
}
export declare function isActionError(error?: unknown): error is ActionError;
export declare function isInputError<T extends ErrorInferenceObject>(error?: ActionError<T>): error is ActionInputError<T>;
export declare function isInputError(error?: unknown): error is ActionInputError<ErrorInferenceObject>;
export type SafeResult<TInput extends ErrorInferenceObject, TOutput> = {
    data: TOutput;
    error: undefined;
} | {
    data: undefined;
    error: ActionError<TInput>;
};
export declare class ActionInputError<T extends ErrorInferenceObject> extends ActionError {
    type: string;
    issues: z.ZodIssue[];
    fields: z.ZodError<T>['formErrors']['fieldErrors'];
    constructor(issues: z.ZodIssue[]);
}
export declare function callSafely<TOutput>(handler: () => MaybePromise<TOutput>): Promise<SafeResult<z.ZodType, TOutput>>;
export declare function getActionQueryString(name: string): string;
/**
 * @deprecated You can now pass action functions
 * directly to the `action` attribute on a form.
 *
 * Example: `<form action={actions.like} />`
 */
export declare function getActionProps<T extends (args: FormData) => MaybePromise<unknown>>(action: T): {
    readonly type: "hidden";
    readonly name: "_astroAction";
    readonly value: string;
};
export type SerializedActionResult = {
    type: 'data';
    contentType: 'application/json+devalue';
    status: 200;
    body: string;
} | {
    type: 'error';
    contentType: 'application/json';
    status: number;
    body: string;
} | {
    type: 'empty';
    status: 204;
};
export declare function serializeActionResult(res: SafeResult<any, any>): SerializedActionResult;
export declare function deserializeActionResult(res: SerializedActionResult): SafeResult<any, any>;

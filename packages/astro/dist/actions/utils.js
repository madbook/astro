import {} from "./runtime/utils.js";
import { deserializeActionResult, getActionQueryString } from "./runtime/virtual/shared.js";
function hasActionsInternal(locals) {
  return "_actionsInternal" in locals;
}
function createGetActionResult(locals) {
  return (actionFn) => {
    if (!hasActionsInternal(locals) || actionFn.toString() !== getActionQueryString(locals._actionsInternal.actionName)) {
      return void 0;
    }
    return deserializeActionResult(locals._actionsInternal.actionResult);
  };
}
function createCallAction(context) {
  return (baseAction, input) => {
    const action = baseAction.bind(context);
    return action(input);
  };
}
export {
  createCallAction,
  createGetActionResult,
  hasActionsInternal
};

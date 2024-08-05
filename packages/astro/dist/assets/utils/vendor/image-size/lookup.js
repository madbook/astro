import { typeHandlers } from "./types/index.js";
import { detector } from "./detector.js";
const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}
const disableTypes = (types) => {
  globalOptions.disabledTypes = types;
};
export {
  disableTypes,
  lookup
};

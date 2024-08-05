import { jsx } from 'react/jsx-runtime';
import 'react';

const Component = () => {
  return /* @__PURE__ */ jsx("button", { id: "arrow-fn-component", children: "I am a react button" });
};

export { Component as C };

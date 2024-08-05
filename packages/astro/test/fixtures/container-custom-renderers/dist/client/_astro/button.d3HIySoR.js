import{r as i}from"./index.DhYZZe0J.js";var u={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=i,l=Symbol.for("react.element"),m=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,x=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function _(t,r,p){var e,o={},s=null,f=null;p!==void 0&&(s=""+p),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(f=r.ref);for(e in r)c.call(r,e)&&!d.hasOwnProperty(e)&&(o[e]=r[e]);if(t&&t.defaultProps)for(e in r=t.defaultProps,r)o[e]===void 0&&(o[e]=r[e]);return{$$typeof:l,type:t,key:s,ref:f,props:o,_owner:x.current}}n.Fragment=m;n.jsx=_;n.jsxs=_;u.exports=n;var y=u.exports;const E=()=>y.jsx("button",{id:"arrow-fn-component",children:"I am a react button"});export{E as default};

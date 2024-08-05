import{r as m}from"./index.DhYZZe0J.js";var _={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=m,u=Symbol.for("react.element"),x=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,d=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function f(o,r,p){var e,t={},s=null,i=null;p!==void 0&&(s=""+p),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(i=r.ref);for(e in r)c.call(r,e)&&!v.hasOwnProperty(e)&&(t[e]=r[e]);if(o&&o.defaultProps)for(e in r=o.defaultProps,r)t[e]===void 0&&(t[e]=r[e]);return{$$typeof:u,type:o,key:s,ref:i,props:t,_owner:d.current}}n.Fragment=x;n.jsx=f;n.jsxs=f;_.exports=n;var l=_.exports;const E=()=>l.jsx("div",{children:"Bar"}),O=()=>l.jsx("div",{children:"Baz"});export{E as BarComponent,O as BazComponent};

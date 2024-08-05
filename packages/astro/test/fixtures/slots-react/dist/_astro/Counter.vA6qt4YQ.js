import{r as a}from"./index.DhYZZe0J.js";var d={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _=a,m=Symbol.for("react.element"),j=Symbol.for("react.fragment"),h=Object.prototype.hasOwnProperty,v=_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function p(n,e,l){var r,o={},s=null,c=null;l!==void 0&&(s=""+l),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(c=e.ref);for(r in e)h.call(e,r)&&!y.hasOwnProperty(r)&&(o[r]=e[r]);if(n&&n.defaultProps)for(r in e=n.defaultProps,e)o[r]===void 0&&(o[r]=e[r]);return{$$typeof:m,type:n,key:s,ref:c,props:o,_owner:v.current}}i.Fragment=j;i.jsx=p;i.jsxs=p;d.exports=i;var t=d.exports;function k({named:n,dashCase:e,children:l,count:r,case:o}){const[s,c]=a.useState(r),f=()=>c(u=>u+1),x=()=>c(u=>u-1);return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"counter",children:[t.jsx("button",{onClick:x,children:"-"}),t.jsx("pre",{children:s}),t.jsx("button",{onClick:f,children:"+"})]}),t.jsxs("div",{id:o,className:"counter-message",children:[l||t.jsx("h1",{children:"Fallback"}),n,e]})]})}export{k as default};

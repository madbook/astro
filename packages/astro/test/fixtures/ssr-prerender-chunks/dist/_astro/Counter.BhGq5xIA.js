import{r as u}from"./index.DhYZZe0J.js";var p={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=u,_=Symbol.for("react.element"),x=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,a=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,j={key:!0,ref:!0,__self:!0,__source:!0};function d(n,e,s){var r,t={},c=null,l=null;s!==void 0&&(c=""+s),e.key!==void 0&&(c=""+e.key),e.ref!==void 0&&(l=e.ref);for(r in e)m.call(e,r)&&!j.hasOwnProperty(r)&&(t[r]=e[r]);if(n&&n.defaultProps)for(r in e=n.defaultProps,e)t[r]===void 0&&(t[r]=e[r]);return{$$typeof:_,type:n,key:c,ref:l,props:t,_owner:a.current}}i.Fragment=x;i.jsx=d;i.jsxs=d;p.exports=i;var o=p.exports;const y=()=>{const[n,e]=u.useState(0),s=()=>{e(t=>t+1)},r=()=>{e(t=>t-1)};return o.jsxs("div",{children:[o.jsx("h2",{children:"Counter"}),o.jsxs("div",{children:[o.jsx("button",{onClick:r,children:"-"}),o.jsx("span",{children:n}),o.jsx("button",{onClick:s,children:"+"})]})]})};export{y as default};

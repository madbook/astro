import{r as f}from"./index.DhYZZe0J.js";var l={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c=f,d=Symbol.for("react.element"),x=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,a=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function _(t,e,i){var r,o={},s=null,p=null;i!==void 0&&(s=""+i),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(p=e.ref);for(r in e)m.call(e,r)&&!y.hasOwnProperty(r)&&(o[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)o[r]===void 0&&(o[r]=e[r]);return{$$typeof:d,type:t,key:s,ref:p,props:o,_owner:a.current}}n.Fragment=x;n.jsx=_;n.jsxs=_;l.exports=n;var u=l.exports;function j(){const[t,e]=f.useState(0);return u.jsxs("div",{children:[u.jsxs("div",{children:["Count: ",t]}),u.jsx("button",{type:"button",onClick:()=>e(t+1),children:"Increment"})]})}export{j as default};

import{d as o,r as u,c as e,a as r}from"./runtime-core.esm-bundler.B4B6P2T8.js";const p=o({props:{start:{type:String,required:!0},stepSize:{type:String,default:"1"}},setup(a){const t=u(parseInt(a.start)),n=u(parseInt(a.stepSize)),s=()=>t.value=t.value+n.value,l=()=>t.value=t.value-n.value;return()=>e("div",{class:"counter"},[e("h1",null,[e("slot",null,null)]),e("button",{onClick:l},[r("-")]),e("pre",null,[t.value]),e("button",{onClick:s},[r("+")])])}});export{p as default};

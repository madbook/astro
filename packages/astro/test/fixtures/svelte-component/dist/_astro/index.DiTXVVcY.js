function g(){}function j(e){return e()}function E(){return Object.create(null)}function y(e){e.forEach(j)}function C(e){return typeof e=="function"}function te(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function I(e){return Object.keys(e).length===0}let $=!1;function T(){$=!0}function M(){$=!1}function P(e,t,n,r){for(;e<t;){const f=e+(t-e>>1);n(f)<=r?e=f+1:t=f}return e}function q(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const i=[];for(let l=0;l<t.length;l++){const s=t[l];s.claim_order!==void 0&&i.push(s)}t=i}const n=new Int32Array(t.length+1),r=new Int32Array(t.length);n[0]=-1;let f=0;for(let i=0;i<t.length;i++){const l=t[i].claim_order,s=(f>0&&t[n[f]].claim_order<=l?f+1:P(1,f,p=>t[n[p]].claim_order,l))-1;r[i]=n[s]+1;const o=s+1;n[o]=i,f=Math.max(o,f)}const u=[],c=[];let a=t.length-1;for(let i=n[f]+1;i!=0;i=r[i-1]){for(u.push(t[i-1]);a>=i;a--)c.push(t[a]);a--}for(;a>=0;a--)c.push(t[a]);u.reverse(),c.sort((i,l)=>i.claim_order-l.claim_order);for(let i=0,l=0;i<c.length;i++){for(;l<u.length&&c[i].claim_order>=u[l].claim_order;)l++;const s=l<u.length?u[l]:null;e.insertBefore(c[i],s)}}function D(e,t){if($){for(q(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function ne(e,t,n){$&&!n?D(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function H(e){e.parentNode&&e.parentNode.removeChild(e)}function L(e){return document.createElement(e)}function R(e){return document.createTextNode(e)}function ie(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function U(e){return Array.from(e.childNodes)}function V(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function O(e,t,n,r,f=!1){V(e);const u=(()=>{for(let c=e.claim_info.last_index;c<e.length;c++){const a=e[c];if(t(a)){const i=n(a);return i===void 0?e.splice(c,1):e[c]=i,f||(e.claim_info.last_index=c),a}}for(let c=e.claim_info.last_index-1;c>=0;c--){const a=e[c];if(t(a)){const i=n(a);return i===void 0?e.splice(c,1):e[c]=i,f?i===void 0&&e.claim_info.last_index--:e.claim_info.last_index=c,a}}return r()})();return u.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,u}function W(e,t,n,r){return O(e,f=>f.nodeName===t,f=>{const u=[];for(let c=0;c<f.attributes.length;c++){const a=f.attributes[c];n[a.name]||u.push(a.name)}u.forEach(c=>f.removeAttribute(c))},()=>r(t))}function le(e,t,n){return W(e,t,n,L)}function re(e,t){return O(e,n=>n.nodeType===3,n=>{const r=""+t;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>R(t),!0)}function ce(e,t){t=""+t,e.data!==t&&(e.data=t)}let k;function m(e){k=e}const _=[],S=[];let h=[];const A=[],z=Promise.resolve();let x=!1;function F(){x||(x=!0,z.then(B))}function w(e){h.push(e)}const b=new Set;let d=0;function B(){if(d!==0)return;const e=k;do{try{for(;d<_.length;){const t=_[d];d++,m(t),G(t.$$)}}catch(t){throw _.length=0,d=0,t}for(m(null),_.length=0,d=0;S.length;)S.pop()();for(let t=0;t<h.length;t+=1){const n=h[t];b.has(n)||(b.add(n),n())}h.length=0}while(_.length);for(;A.length;)A.pop()();x=!1,b.clear(),m(e)}function G(e){if(e.fragment!==null){e.update(),y(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(w)}}function J(e){const t=[],n=[];h.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),h=t}const K=new Set;function Q(e,t){e&&e.i&&(K.delete(e),e.i(t))}function X(e,t,n){const{fragment:r,after_update:f}=e.$$;r&&r.m(t,n),w(()=>{const u=e.$$.on_mount.map(j).filter(C);e.$$.on_destroy?e.$$.on_destroy.push(...u):y(u),e.$$.on_mount=[]}),f.forEach(w)}function Y(e,t){const n=e.$$;n.fragment!==null&&(J(n.after_update),y(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Z(e,t){e.$$.dirty[0]===-1&&(_.push(e),F(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function fe(e,t,n,r,f,u,c=null,a=[-1]){const i=k;m(e);const l=e.$$={fragment:null,ctx:[],props:u,update:g,not_equal:f,bound:E(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(i?i.$$.context:[])),callbacks:E(),dirty:a,skip_bound:!1,root:t.target||i.$$.root};c&&c(l.root);let s=!1;if(l.ctx=n?n(e,t.props||{},(o,p,...v)=>{const N=v.length?v[0]:p;return l.ctx&&f(l.ctx[o],l.ctx[o]=N)&&(!l.skip_bound&&l.bound[o]&&l.bound[o](N),s&&Z(e,o)),p}):[],l.update(),s=!0,y(l.before_update),l.fragment=r?r(l.ctx):!1,t.target){if(t.hydrate){T();const o=U(t.target);l.fragment&&l.fragment.l(o),o.forEach(H)}else l.fragment&&l.fragment.c();t.intro&&Q(e.$$.fragment),X(e,t.target,t.anchor),M(),B()}m(i)}class ae{$$=void 0;$$set=void 0;$destroy(){Y(this,1),this.$destroy=g}$on(t,n){if(!C(n))return g;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const f=r.indexOf(n);f!==-1&&r.splice(f,1)}}$set(t){this.$$set&&!I(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ee="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ee);export{ae as S,U as a,re as b,le as c,H as d,L as e,ie as f,ne as g,D as h,fe as i,ce as j,g as n,te as s,R as t};

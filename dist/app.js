!function(t){var e={};function a(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/",a(a.s=12)}([function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var a=function(t,e){var a=t[1]||"",r=t[3];if(!r)return a;if(e&&"function"==typeof btoa){var i=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),n=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[a].concat(n).concat([i]).join("\n")}var s;return[a].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+a+"}":a}).join("")},e.i=function(t,a){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var n=this[i][0];"number"==typeof n&&(r[n]=!0)}for(i=0;i<t.length;i++){var s=t[i];"number"==typeof s[0]&&r[s[0]]||(a&&!s[2]?s[2]=a:a&&(s[2]="("+s[2]+") and ("+a+")"),e.push(s))}},e}},function(t,e,a){var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i=a(18),n={},s=r&&(document.head||document.getElementsByTagName("head")[0]),o=null,d=0,u=!1,c=function(){},l=null,p="data-vue-ssr-id",v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(t){for(var e=0;e<t.length;e++){var a=t[e],r=n[a.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](a.parts[i]);for(;i<a.parts.length;i++)r.parts.push(h(a.parts[i]));r.parts.length>a.parts.length&&(r.parts.length=a.parts.length)}else{var s=[];for(i=0;i<a.parts.length;i++)s.push(h(a.parts[i]));n[a.id]={id:a.id,refs:1,parts:s}}}}function f(){var t=document.createElement("style");return t.type="text/css",s.appendChild(t),t}function h(t){var e,a,r=document.querySelector("style["+p+'~="'+t.id+'"]');if(r){if(u)return c;r.parentNode.removeChild(r)}if(v){var i=d++;r=o||(o=f()),e=y.bind(null,r,i,!1),a=y.bind(null,r,i,!0)}else r=f(),e=function(t,e){var a=e.css,r=e.media,i=e.sourceMap;r&&t.setAttribute("media",r);l.ssrId&&t.setAttribute(p,e.id);i&&(a+="\n/*# sourceURL="+i.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");if(t.styleSheet)t.styleSheet.cssText=a;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(a))}}.bind(null,r),a=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else a()}}t.exports=function(t,e,a,r){u=a,l=r||{};var s=i(t,e);return m(s),function(e){for(var a=[],r=0;r<s.length;r++){var o=s[r];(d=n[o.id]).refs--,a.push(d)}e?m(s=i(t,e)):s=[];for(r=0;r<a.length;r++){var d;if(0===(d=a[r]).refs){for(var u=0;u<d.parts.length;u++)d.parts[u]();delete n[d.id]}}}};var _,g=(_=[],function(t,e){return _[t]=e,_.filter(Boolean).join("\n")});function y(t,e,a,r){var i=a?"":r.css;if(t.styleSheet)t.styleSheet.cssText=g(e,i);else{var n=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(n,s[e]):t.appendChild(n)}}},function(t,e){t.exports=function(t,e,a,r,i,n){var s,o=t=t||{},d=typeof t.default;"object"!==d&&"function"!==d||(s=t,o=t.default);var u,c="function"==typeof o?o.options:o;if(e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),a&&(c.functional=!0),i&&(c._scopeId=i),n?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},c._ssrRegister=u):r&&(u=r),u){var l=c.functional,p=l?c.render:c.beforeCreate;l?(c._injectStyles=u,c.render=function(t,e){return u.call(e),p(t,e)}):c.beforeCreate=p?[].concat(p,u):[u]}return{esModule:s,exports:o,options:c}}},function(t,e,a){"use strict";var r=a(8),i=a(33);var n=function(t){a(31)},s=a(2)(r.a,i.a,!1,n,"data-v-0501196a",null);e.a=s.exports},function(t,e,a){"use strict";var r=a(19),i=a(23);e.a={components:{NavBar:r.a,Toaster:i.a}}},function(t,e,a){"use strict";e.a={methods:{login(t){this.sfetch(t).then(t=>this.$root.$refs.toast("Sign In Successful. Welcome !")).catch(t=>this.$root.$refs.toast(t))},logout(){this.$root.token=""}}}},function(t,e,a){"use strict";e.a={mounted(){this.$root.$refs.toast=function(t){toaster.innerHTML=t,toaster.hidden=!1,setTimeout(()=>toaster.hidden=!0,5e3)}}}},function(t,e,a){"use strict";var r=a(3);e.a={components:{Graph:r.a}}},function(t,e,a){"use strict";e.a={props:["id"],data:()=>({user:{},img:"https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"}),mounted(){this.id?(console.log("id : ",this.id),this.sfetch(`/api/user/${this.id}/proj`).then(t=>t.json()).then(t=>this.graph(this.transform(t)))):this.sfetch("/api/user/proj").then(t=>t.json()).then(t=>this.graph(this.transform(t)))},methods:{transform(t){var e=[],a=[],r={},i={};return t.forEach(t=>{e.push({id:t._id,label:t.firstName,group:1,level:1}),a.push({source:t._id,target:t.department,relation:"work",strenght:1}),t.domain.constructor==String&&(t.domain=t.domain.split(/\n/)),t.domain.forEach(e=>{r[e]=!0,a.push({source:t._id,target:e,relation:"competency",strenght:1})}),i[t.department]=!0,a.push({source:t._id,target:t.department,relation:"work",strenght:1})}),Object.keys(r).forEach(t=>e.push({id:t,label:t,group:3,level:3})),Object.keys(i).forEach(t=>e.push({id:t,label:t,group:2,level:2})),{nodes:e,links:a}},graph({nodes:t,links:e}){var a=window.innerWidth,r=window.innerHeight,i=d3.select("#graph").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 "+a+" "+1.5*r).classed("svg-content-responsive",!0),n=d3.scaleOrdinal(["#1D3557","#66c2a5","#d11345","#fc8d62","#8da0cb","#e78ac3","#ffd92f","#e5c494"]),s=[18,32,48],o=d3.forceLink().id(t=>t.id).strength(t=>t.strenght),d=d3.forceSimulation().force("link",o).force("forceX",d3.forceX().strength(.1).x(.5*a)).force("forceY",d3.forceY().strength(.1).y(.5*r)).force("center",d3.forceCenter().x(.5*a).y(.5*r)).force("charge",d3.forceManyBody().strength(-1e4)),u=d3.drag().on("start",t=>{t.fx=t.x,t.fy=t.y}).on("drag",function(t){d.alphaTarget(.7).restart(),t.fx=d3.event.x,t.fy=d3.event.y}).on("end",function(t){d3.event.active||d.alphaTarget(0),t.fx=null,t.fy=null}),c=i.append("g").attr("class","links").selectAll("line").data(e).enter().append("line").attr("gravity",.05).attr("stroke-width",1).attr("stroke","rgba(50, 50, 50, 0.2)"),l=i.selectAll(".node").data(t).enter().append("g").attr("class","node").call(u);l.append("image").attr("xlink:href",function(t){return["https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png","http://www.iconninja.com/files/766/572/903/home-house-building-icon.svg","https://theplantium.com/wp-content/uploads/2016/10/Knowledge-1.png"][t.level-1]}).attr("x",-60).attr("y",-60).attr("width",100).attr("height",100).on("mouseover",function(t,e){d3.select(this).transition().attr("x",function(t){return-90}).attr("y",function(t){return-90}).attr("height",150).attr("width",150).attr("cursor",function(t){if("1"==t.level)return"pointer"});var a=h(t);c.attr("stroke",function(e){return m(t,e)}),c.attr("stroke-width",function(e){return function(t,e){return _(t,e)?5:1}(t,e)}),l.attr("fill",function(t){return v(t,a)}),p.attr("fill",function(t){return f(t,a)}),p.attr("font-size",function(e){return t.id==e.id?"3em":s[e.level-1]})}).on("mouseout",function(t){d3.select(this).transition().attr("x",function(t){return-60}).attr("y",function(t){return-60}).attr("height",100).attr("width",100),c.attr("stroke-width",1).attr("stroke","rgba(50, 50, 50, 0.2)"),p.attr("font-size",function(t){return s[t.level-1]})}).on("click",this.showpopup);const p=i.append("g").selectAll("text").data(t).enter().append("text").text(t=>t.label).attr("font-size",function(t){return[18,32,48][t.level-1]}).attr("dx",-50).attr("dy",75).attr("font-weight",function(t){return["lighter",200,500][t.level-1]}).attr("uid",function(t){return t.id});function v(t,e){return n(t.level)}function m(t,e){return _(t,e)?"#1D3557":"#E5E5E5"}function f(t,e){return Array.isArray(e)&&e.indexOf(t.id)>-1?"#1D3557":"black"}function h(t){return e.reduce(function(e,a){return a.target.id===t.id?e.push(a.source.id):a.source.id===t.id&&e.push(a.target.id),e},[t.id])}function _(t,e){return e.target.id===t.id||e.source.id===t.id}d.nodes(t).on("tick",()=>{c.attr("x1",function(t){return t.source.x}).attr("y1",function(t){return t.source.y}).attr("x2",function(t){return t.target.x}).attr("y2",function(t){return t.target.y}),l.attr("cx",t=>t.x).attr("cy",t=>t.y),l.attr("transform",function(t){return"translate("+t.x+","+t.y+")"}),p.attr("x",t=>t.x).attr("y",t=>t.y),t[0].x=a/2,t[0].y=r/2}),d.force("link").links(e)},showpopup(t){1==t.level&&this.sfetch("/api/user/"+t.id).then(t=>t.json()).then(t=>{this.user=t,userDialog.style.display="block"})},closeUserDialog(){userDialog.style.display="none"}}}},function(t,e,a){"use strict";e.a={props:["id"],data:()=>({editmode:!1,activity:{}}),computed:{edit:function(){return!this.id||this.editmode},create:function(){return!this.id},update:function(){return this.activity.u_id&&this.$root.token.startsWith(this.activity.u_id)},search:function(){return this.activity.u_id&&!this.$root.token.startsWith(this.activity.u_id)}},created(){this.load(this.$route.params.id)},watch:{"$route.params.id":function(t){this.load(t)}},methods:{md:t=>marked(t,{sanitize:!0}),post(t){this.sfetch(t.target).then(t=>t.json()).then(t=>{this.$root.$refs.toast("Activity created. Let's go!"),this.$router.push({name:"Activity",params:{id:t.insertedIds[0]}})}).catch(this.$root.$refs.toast)},adapt(t){var e=t.target;setTimeout(function(){e.style.cssText="height:auto; padding:0",e.style.cssText="height:"+(+e.scrollHeight+20)+"px"},0)},load(t){this.activity={},t&&this.sfetch(`/api/activity/${t}`).then(t=>t.json()).then(t=>{if(!t)throw new Error("no such template");this.activity=t}).catch(this.$root.$refs.toast)}}}},function(t,e,a){"use strict";var r=a(3);e.a={components:{Graph:r.a},props:["id"],data:()=>({editmode:!1,suggests:[],user:{}}),computed:{edit:function(){return!this.id||this.editmode},create:function(){return!this.id},update:function(){return this.id&&this.$root.token.startsWith(this.id)},search:function(){return this.id&&!this.$root.token.startsWith(this.id)}},created(){this.load(this.id)},methods:{adapt(t){var e=t.target;setTimeout(function(){e.style.cssText="height:auto; padding:0",e.style.cssText="height:"+(+e.scrollHeight+20)+"px"},0)},md:t=>t?marked(t,{sanitize:!0}):"",autocomplete(t){console.log(t);var e=t.target,a=e.value.substr(0,e.selectionStart).split("\n").length,r=e.value.split("\n")[a-1];this.sfetch("/api/user",{[e.name]:r}).then(t=>t.json()).then(t=>{this.suggests=[...new Set([].concat(...t.map(t=>t[e.name])))].filter(t=>t.match(r)&&r!=t)}).catch(console.error)},load(t){this.user={},t&&this.sfetch(`/api/user/${t}`).then(t=>t.json()).then(t=>this.user=t).catch(t=>this.$root.$refs.toast)},post(t){this.sfetch(t.target).then(t=>t.json()).then(t=>{this.create?(this.$root.$refs.toast(`Profil Created ! You are now connected as ${t._id}`),this.$router.push({name:"User",params:{id:t._id}})):(this.$root.$refs.toast("Profil Updated"),this.load(this.id),this.editmode=!1)}).catch(this.$root.$refs.toast)},activityDelete(t){this.sfetch(t.target).then(t=>t.json()).then(t=>{this.$root.$refs.toast("Activity Deleted"),this.load(this.id)}).catch(this.$root.$refs.toast)},graph({nodes:t,links:e}){var a=window.innerWidth,r=window.innerHeight;d3.select("#graph").attr("width",a).attr("height",r);console.log(t,e)}},watch:{id:function(t){this.load(t)}}}},function(t,e,a){"use strict";e.a={data:()=>({users:[],activities:[]}),methods:{search(t){this.sfetch(t.target).then(t=>t.json()).then(([t,e])=>[this.users,this.activities]=[t||[],e||[]]).catch(this.$root.$refs.toast)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(13),i=a.n(r),n=a(14),s=a.n(n),o=a(15),d=a(28),u=a(35),c=a(39),l=a(43),p=a(3);i.a.use(s.a),i.a.mixin({methods:{sfetch(t,e=""){var a={headers:{authorization:localStorage.token},method:((t.attributes||{}).method||{}).value||"GET",query:e};return t instanceof HTMLFormElement?(a.method.match(/^POST$/i)?a.body=new FormData(t):a.query="?"+new URLSearchParams(new FormData(t)),a.path=new URL(t.action).pathname):(a.path=t,a.query="?"+Object.keys(a.query).map(t=>encodeURIComponent(t)+"="+encodeURIComponent(a.query[t])).join("&")),fetch(a.path+a.query,a).then(t=>{if(!t.ok)throw Error(t.statusText);return t.headers.has("authorization")&&(this.$root.token=t.headers.get("authorization")),t})}}}),new i.a({el:"#app",render:t=>t(o.a),data:function(){return{get token(){return localStorage.getItem("token")||""},set token(t){localStorage.setItem("token",t)},get me(){return(localStorage.getItem("token")||"").split(" ")[0]}}},router:new s.a({mode:"history",routes:[{path:"/",name:"Home",component:d.a},{path:"/search",name:"Search",component:l.a},{path:"/activity/:id?",name:"Activity",component:u.a,props:!0},{path:"/user/:id?",name:"User",component:c.a,props:!0},{path:"/graph/:id?",name:"Graph",component:p.a,props:!0}]})})},function(t,e){t.exports=Vue},function(t,e){t.exports=VueRouter},function(t,e,a){"use strict";var r=a(4),i=a(27);var n=function(t){a(16)},s=a(2)(r.a,i.a,!1,n,null,null);e.a=s.exports},function(t,e,a){var r=a(17);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(1)("b659b924",r,!0,{})},function(t,e,a){(t.exports=a(0)(!1)).push([t.i,"body{background:#ededed}main{background:hsla(0,0%,100%,.85);border:1px solid #ccc;border-radius:.4em;padding:1em 2em 2em;margin:2em auto}button{cursor:pointer}@media only screen and (min-width:500px){.grid-m-a label{line-height:2.5;text-align:right}.grid-m-a p,.grid-m-a ul{line-height:2.5;margin:0}.grid-m-a{display:grid;grid-gap:.5em 1em;grid-template-columns:auto 1fr}.grid-m-a label>em{display:block;clear:both;line-height:0;font-size:smaller}}.fab{position:fixed;bottom:.5em;right:.5em}.fab button{border-radius:10em;font-size:xx-large;display:block;margin:.5em;width:2em}.tags{margin:0;padding:0}.tags li{display:inline-block;background:#d7dfff;border-radius:1em;padding:0 .5em;line-height:1.5em;margin-right:.5em}",""])},function(t,e){t.exports=function(t,e){for(var a=[],r={},i=0;i<e.length;i++){var n=e[i],s=n[0],o={id:t+":"+i,css:n[1],media:n[2],sourceMap:n[3]};r[s]?r[s].parts.push(o):a.push(r[s]={id:s,parts:[o]})}return a}},function(t,e,a){"use strict";var r=a(5),i=a(22);var n=function(t){a(20)},s=a(2)(r.a,i.a,!1,n,"data-v-5c24d844",null);e.a=s.exports},function(t,e,a){var r=a(21);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(1)("cef67b66",r,!0,{})},function(t,e,a){(t.exports=a(0)(!1)).push([t.i,"nav[data-v-5c24d844]{position:sticky;top:0;z-index:99;background:#fff;display:flex;justify-content:space-around;max-width:760px;align-items:center;box-shadow:0 -.1em .3em #000;padding:.5em 0;background:#1d3557;margin:auto}.logo[data-v-5c24d844]{font-size:0}.logo svg[data-v-5c24d844]{vertical-align:text-top}@media only screen and (min-width:760px){.logo[data-v-5c24d844]{font-size:2em;font-family:serif}}nav a[data-v-5c24d844],nav a[data-v-5c24d844]:hover{color:#fff;margin:0 .5em;text-align:center;text-transform:capitalize;line-height:1em}nav form[data-v-5c24d844]{display:inline-flex}nav form input[placeholder][data-v-5c24d844]{width:6em}[data-v-5c24d844]::-webkit-input-placeholder{text-align:right}input[data-v-5c24d844]:-moz-placeholder{text-align:right}",""])},function(t,e,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",[a("a",{staticClass:"logo",attrs:{href:"//reru.ac.th"}},[a("svg",{attrs:{width:"32px",height:"32px",viewBox:"0 0 256 256",xmlns:"http://www.w3.org/2000/svg"}},[a("defs",[a("radialGradient",{attrs:{id:"svg_4",spreadMethod:"pad"}},[a("stop",{attrs:{"stop-color":"#ffff80",offset:"0"}}),a("stop",{attrs:{"stop-color":"#00007f",offset:"1"}})],1)],1),t._v(" "),a("g",[a("ellipse",{attrs:{fill:"#007f3f","stroke-width":"5",cx:"128",cy:"128.000001",id:"svg_1",rx:"96",ry:"120",stroke:"#bfbf00"}}),t._v(" "),a("ellipse",{attrs:{fill:"url(#svg_4)","stroke-width":"4",cx:"128",cy:"128",id:"svg_2",rx:"75",ry:"100",stroke:"#bfbf00"}}),t._v(" "),a("ellipse",{attrs:{fill:"#007f00","stroke-width":"4",cx:"128",cy:"128",id:"svg_5",rx:"32",ry:"32",stroke:"#bfbf00"}}),t._v(" "),a("path",{attrs:{fill:"#ffffff","stroke-width":"0","stroke-opacity":"null","fill-opacity":"null",d:"m90.000002,191.863804l37.999954,-17.188427l38.000044,17.188427l-14.514659,27.811576l-46.970636,0l-14.514703,-27.811576z",id:"svg_8",stroke:"#bfbf00"}}),t._v(" "),a("path",{attrs:{fill:"#ffffff","stroke-width":"0","stroke-opacity":"null","fill-opacity":"null",d:"m97,88.520624l31.000001,-55l31.000001,55l-62.000002,0z",id:"svg_9",stroke:"#bfbf00"}})])]),t._v("RERU\n\t")]),t._v(" "),a("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" "),a("router-link",{attrs:{to:"/search"}},[t._v("Knowledge Management")]),t._v(" "),this.$root.token?a("router-link",{attrs:{to:"/activity"}},[t._v("Activity Form")]):t._e(),t._v(" "),this.$root.token?[a("router-link",{attrs:{to:{name:"User",params:{id:this.$root.me}}}},[t._v(t._s(this.$root.me))]),t._v(" "),a("button",{attrs:{title:"Sign Out"},on:{click:t.logout}},[t._v("⟵⃞")])]:a("form",{attrs:{method:"POST",action:"/api/token"},on:{submit:function(e){e.preventDefault(),t.login(e.target)}}},[a("input",{attrs:{placeholder:"👤",name:"_id",autocomplete:"username"}}),t._v(" "),a("input",{attrs:{placeholder:"🔑",name:"password",type:"password",autocomplete:"current-password"}}),t._v(" "),a("button",{attrs:{title:"Sign In"}},[t._v("⟶⃞")])]),t._v(" "),this.$root.token?t._e():a("router-link",{attrs:{to:"/user"}},[t._v("Sign Up")])],2)},staticRenderFns:[]};e.a=r},function(t,e,a){"use strict";var r=a(6),i=a(26);var n=function(t){a(24)},s=a(2)(r.a,i.a,!1,n,"data-v-b44f57e0",null);e.a=s.exports},function(t,e,a){var r=a(25);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(1)("4e623d12",r,!0,{})},function(t,e,a){(t.exports=a(0)(!1)).push([t.i,"#toaster[data-v-b44f57e0]{position:fixed;left:1em;bottom:1em;background:#333;border:1px solid #000;color:#fff;border-radius:.2em;padding:1em;box-shadow:.15em .15em .2em #000}",""])},function(t,e,a){"use strict";var r={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"toaster",hidden:""}})},staticRenderFns:[]};e.a=r},function(t,e,a){"use strict";var r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("NavBar"),this._v(" "),e("main",[e("router-view")],1),this._v(" "),e("Toaster")],1)},staticRenderFns:[]};e.a=r},function(t,e,a){"use strict";var r=a(7),i=a(34);var n=function(t){a(29)},s=a(2)(r.a,i.a,!1,n,"data-v-d1b68250",null);e.a=s.exports},function(t,e,a){var r=a(30);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(1)("f4bc2e86",r,!0,{})},function(t,e,a){(t.exports=a(0)(!1)).push([t.i,"h1[data-v-d1b68250]{font-size:200%}h1[data-v-d1b68250],h2[data-v-d1b68250]{text-align:center;font-family:Kanit,serif}h2[data-v-d1b68250]{font-size:150%}.head[data-v-d1b68250]{height:25%}.grp[data-v-d1b68250]{height:75%}",""])},function(t,e,a){var r=a(32);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(1)("5248e4da",r,!0,{})},function(t,e,a){(t.exports=a(0)(!1)).push([t.i,'#userDialog[data-v-0501196a]{position:fixed;float:center}#button-close[data-v-0501196a]{position:absolute;top:55px;right:0;background-color:#546a88}.router a[data-v-0501196a]{position:absolute;bottom:50px;right:50px;color:#e7eaec}.img-container[data-v-0501196a]{position:relative;margin:auto;width:200px;height:120px;margin-bottom:150px}.img-container img[data-v-0501196a]{width:100%;height:auto}dl[data-v-0501196a]{position:absolute;width:100%;overflow:hidden;padding:0;margin:0;line-height:2.5}dt[data-v-0501196a]{text-indent:25px;font-weight:700}dd[data-v-0501196a],dt[data-v-0501196a]{float:left;width:50%;padding:0;margin:0;color:#e7eaec}dd[data-v-0501196a]:after{content:"\\A";white-space:pre}.sidebar[data-v-0501196a]{height:100%;width:30%;position:relative;z-index:1;top:0;left:0;background-color:#1d3557;padding-top:100px}.sidenbar a[data-v-0501196a]:hover{color:#f1f1f1}#graph[data-v-0501196a]{position:relative;width:100%;vertical-align:center;overflow:auto}g.links[data-v-0501196a]{position:relative;width:100%;height:50%}',""])},function(t,e,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("User",{attrs:{id:"sirin"}}),t._v(" "),a("svg",{attrs:{id:"graph"}}),t._v(" "),a("div",{staticClass:"sidebar",staticStyle:{display:"none"},attrs:{id:"userDialog"}},[a("button",{attrs:{id:"button-close"},on:{click:t.closeUserDialog}},[t._v("x")]),a("br"),t._v(" "),t._m(0),t._v(" "),a("dl",[a("dt",[t._v("First name : ")]),t._v(" "),a("dd",[t._v(t._s(t.user.firstName))]),t._v(" "),a("dt",[t._v("Last name : ")]),t._v(" "),a("dd",[t._v(t._s(t.user.lastName))]),t._v(" "),a("dt",[t._v("Function : ")]),t._v(" "),a("dd",[t._v(t._s(t.user.fonction))]),t._v(" "),a("dt",[t._v("Department : ")]),t._v(" "),a("dd",[t._v(t._s(t.user.department))]),t._v(" "),a("dt",[t._v("Expert domain : ")]),t._v(" "),a("dd",[t._v(t._s(t.user.domain))]),t._v(" "),a("dt",[t._v("Knowledge : ")]),t._v(" "),a("dd",[t._v(t._s(t.user.knowlege))]),t._v(" "),a("dt",[t._v("Publications : ")]),t._v(" "),a("dd",[t._v(t._s(t.user.publications))]),t._v(" "),a("dt",[t._v("Contact : ")]),t._v(" "),a("dd",[t._v(t._s(t.user.email))])]),t._v(" "),a("div",{staticClass:"router"},[a("router-link",{attrs:{to:"/user/"+t.user._id}},[t._v(" More information")])],1)])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img-container"},[e("img",{attrs:{src:"https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"}})])}]};e.a=r},function(t,e,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"head"},[a("h1",[t._v("ระบบจัดการความรู้ มหาวิทยาลัยราชภัฏร้อยเอ็ด")]),t._v(" "),a("h2",[t._v("RERU Knowlege Management System")]),t._v(" "),a("svg",{staticStyle:{"enable-background":"new 0 0 24 24"},attrs:{version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"24px",height:"24px",viewBox:"0 0 24 24","xml:space":"preserve"}},[a("g",{staticStyle:{opacity:"0.75"},attrs:{id:"Icons"}},[a("g",{attrs:{id:"arched-arrow-rtl"}},[a("path",{staticStyle:{"fill-rule":"evenodd","clip-rule":"evenodd"},attrs:{id:"arrow_8_",d:"M13.401,8.542c-2.814-0.027-4.549,0.978-5.513,1.823\n\t\t\tl-1.48-2.329l-2.391,6.901l6.782,0.009l-1.474-2.319c0.668-0.584,1.945-1.504,3.675-1.791c4.172-0.69,6.925,1.949,6.925,1.949\n\t\t\tS18.288,8.588,13.401,8.542z"}})])]),t._v(" "),a("g",{staticStyle:{display:"none"},attrs:{id:"Guides"}})]),t._v(" ใส่ keyword สำหรับค้นหา และกด Enter\n    "),a("form",{attrs:{method:"GET",action:"/api/search"},on:{submit:function(e){return e.preventDefault(),t.search(e)}}},[t._m(0)])]),t._v(" "),a("div",{staticClass:"grp"},[a("Graph",{attrs:{id:""}})],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("fieldset",[e("input",{attrs:{type:"search",name:"keyword",placeholder:"Enter your keywords ..."}})])}]};e.a=r},function(t,e,a){"use strict";var r=a(9),i=a(38);var n=function(t){a(36)},s=a(2)(r.a,i.a,!1,n,"data-v-76bfd31d",null);e.a=s.exports},function(t,e,a){var r=a(37);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(1)("3430fca8",r,!0,{})},function(t,e,a){(t.exports=a(0)(!1)).push([t.i,"",""])},function(t,e,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{attrs:{method:"POST",action:"/api/activity"},on:{submit:function(e){return e.preventDefault(),t.post(e)}}},[t.create?a("h1",[t._v("Create a new Activity")]):t._e(),t._v(" "),t.update?a("h1",[t._v("Update my Activity")]):t._e(),t._v(" "),t.search?a("h1",[t._v("Activity detail")]):t._e(),t._v(" "),this.activity?a("div",{staticClass:"grid-m-a"},[t.id?a("input",{attrs:{type:"hidden",name:"_id"},domProps:{value:t.activity._id}}):t._e(),t._v(" "),t.create?t._e():a("label",[t._v("Owner")]),t._v(" "),t.create?t._e():a("p",[a("router-link",{attrs:{to:{name:"User",params:{id:t.activity.u_id}}}},[t._v(t._s(t.activity.u_id))])],1),t._v(" "),a("label",[t._v("Type")]),t._v(" "),t.edit?a("input",{attrs:{name:"type"},domProps:{value:t.activity.type}}):a("p",[t._v(t._s(t.activity.type))]),t._v(" "),a("label",[t._v("Name")]),t._v(" "),t.edit?a("input",{attrs:{name:"name"},domProps:{value:t.activity.name}}):a("p",[t._v(t._s(t.activity.name))]),t._v(" "),a("label",[t._v("Description")]),t._v(" "),t.edit?a("textarea",{attrs:{name:"description",rows:"15"},domProps:{value:t.activity.description}}):a("div",{domProps:{innerHTML:t._s(t.md(t.activity.description))}}),t._v(" "),a("label",[t._v("Conclusion")]),t._v(" "),t.edit?a("textarea",{attrs:{name:"conclusion",rows:"15"},domProps:{value:t.activity.conclusion}}):a("div",{domProps:{innerHTML:t._s(t.md(t.activity.description))}}),t._v(" "),a("label",[t._v("Tags")]),t._v(" "),t.edit?a("input",{attrs:{name:"tags"},domProps:{value:t.activity.tags}}):a("p",[t._v(t._s(t.activity.tags))]),t._v(" "),a("label",[t._v("Started")]),t._v(" "),t.edit?a("input",{attrs:{type:"date",name:"from",max:(new Date).toJSON().split("T")[0]},domProps:{value:t.activity.from}}):a("p",[t._v(t._s(t.activity.from))]),t._v(" "),a("label",[t._v("Ended")]),t._v(" "),t.edit?a("input",{attrs:{type:"date",name:"to",min:t.activity.from,max:(new Date).toJSON().split("T")[0]},domProps:{value:t.activity.to}}):a("p",[t._v(t._s(t.activity.to))]),t._v(" "),a("br"),a("hr")]):t._e(),t._v(" "),a("div",{staticClass:"fab"},[t.create?a("button",[t._v("+")]):t._e(),t._v(" "),t.update&&t.edit?a("button",{attrs:{title:"Update"}},[t._v("✓")]):t._e(),t._v(" "),t.update&&t.edit?a("button",{attrs:{title:"Cancel"},on:{click:function(e){e.preventDefault(),t.editmode=!1}}},[t._v("✕")]):t._e(),t._v(" "),t.update&&!t.edit?a("button",{attrs:{title:"Edit"},on:{click:function(e){e.preventDefault(),t.editmode=!0}}},[t._v("✎")]):t._e()])])},staticRenderFns:[]};e.a=r},function(t,e,a){"use strict";var r=a(10),i=a(42);var n=function(t){a(40)},s=a(2)(r.a,i.a,!1,n,"data-v-c88d3f32",null);e.a=s.exports},function(t,e,a){var r=a(41);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(1)("29094cb2",r,!0,{})},function(t,e,a){(t.exports=a(0)(!1)).push([t.i,"",""])},function(t,e,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("form",{attrs:{method:"POST",action:"/api/users"},on:{submit:function(e){return e.preventDefault(),t.post(e)}}},[t.create?a("h1",[t._v("Create a new account")]):t._e(),t._v(" "),t.update?a("h1",[t._v("My Account")]):t._e(),t._v(" "),t.search?a("h1",[t._v("Account detail")]):t._e(),t._v(" "),a("div",{staticClass:"grid-m-a"},[a("label",[t._v("First Name")]),t._v(" "),t.edit?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.firstName,expression:"user.firstName"}],attrs:{name:"firstName",autocomplete:"given-name"},domProps:{value:t.user.firstName},on:{input:function(e){e.target.composing||t.$set(t.user,"firstName",e.target.value)}}}):a("p",[t._v(t._s(t.user.firstName))]),t._v(" "),a("label",[t._v("Last Name")]),t._v(" "),t.edit?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.lastName,expression:"user.lastName"}],attrs:{name:"lastName",autocomplete:"family-name"},domProps:{value:t.user.lastName},on:{input:function(e){e.target.composing||t.$set(t.user,"lastName",e.target.value)}}}):a("p",[t._v(t._s(t.user.lastName))]),t._v(" "),a("label",[t._v("Email")]),t._v(" "),t.edit?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],attrs:{name:"email",autocomplete:"email"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}}):a("p",[t._v(t._s(t.user.email))]),t._v(" "),a("label",[t._v("Department")]),t._v(" "),t.edit?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.department,expression:"user.department"}],attrs:{name:"department",autocomplete:"organization"},domProps:{value:t.user.department},on:{input:function(e){e.target.composing||t.$set(t.user,"department",e.target.value)}}}):a("p",[t._v(t._s(t.user.department))]),t._v(" "),a("label",[t._v("Working Since")]),t._v(" "),t.edit?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.startwork,expression:"user.startwork"}],attrs:{name:"startwork",type:"date",max:(new Date).toISOString().split("T")[0]},domProps:{value:t.user.startwork},on:{input:function(e){e.target.composing||t.$set(t.user,"startwork",e.target.value)}}}):a("p",[t._v(t._s(t.user.startwork))]),t._v(" "),a("label",[t._v("Function")]),t._v(" "),t.edit?a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.function,expression:"user.function"}],attrs:{name:"function",placeholder:"ex. Professor",autocomplete:"organization-title",list:"suggests_function"},domProps:{value:t.user.function},on:{input:function(e){e.target.composing||t.$set(t.user,"function",e.target.value)}}}),t._v(" "),t.suggests?a("datalist",{attrs:{id:"suggests_function"}},t._l(t.suggests,function(e){return a("option",{key:e},[t._v(t._s(e))])})):t._e()]):a("p",[t._v(t._s(t.user.function))]),t._v(" "),a("label",[t._v("Telephone")]),t._v(" "),t.edit?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.phone,expression:"user.phone"}],attrs:{name:"phone",type:"tel",autocomplete:"tel-national"},domProps:{value:t.user.phone},on:{input:function(e){e.target.composing||t.$set(t.user,"phone",e.target.value)}}}):a("p",[t._v(t._s(t.user.phone))]),t._v(" "),a("label",[t._v("Address")]),t._v(" "),t.edit?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.address,expression:"user.address"}],attrs:{name:"address",autocomplete:"street-address"},domProps:{value:t.user.address},on:{input:function(e){e.target.composing||t.$set(t.user,"address",e.target.value)}}}):a("p",[t._v(t._s(t.user.address))]),t._v(" "),a("label",[t._v("Major Expertises"),t.edit?a("em",[t._v(" (one by line)")]):t._e()]),t._v(" "),t.edit?a("div",[a("textarea",{directives:[{name:"model",rawName:"v-model",value:(t.user.domain||[]).join("\n"),expression:"(user.domain||[]).join('\\n')"}],attrs:{name:"domain",placeholder:"ex. Real Time Embed Quantic Operating Systems",rows:"10"},domProps:{value:(t.user.domain||[]).join("\n")},on:{keyup:t.autocomplete,keydown:t.adapt,input:function(e){e.target.composing||t.$set(t.user.domain||[],"join('\n')",e.target.value)}}}),t._v(" "),a("ul",{staticClass:"tags"},t._l(t.suggests,function(e){return a("li",{key:e},[t._v(t._s(e))])}))]):a("ul",{staticClass:"tags"},t._l(t.user.domain,function(e){return a("li",{key:e},[t._v(t._s(e))])})),t._v(" "),a("label",[t._v("Other Knowledge"),t.edit?a("em",[t._v(" (one by line)")]):t._e()]),t._v(" "),t.edit?a("div",[a("textarea",{directives:[{name:"model",rawName:"v-model",value:(t.user.knowledge||[]).join("\n"),expression:"(user.knowledge||[]).join('\\n')"}],attrs:{name:"knowledge",placeholder:"ex. Baseball Player",rows:"10"},domProps:{value:(t.user.knowledge||[]).join("\n")},on:{keyup:t.autocomplete,keydown:t.adapt,input:function(e){e.target.composing||t.$set(t.user.knowledge||[],"join('\n')",e.target.value)}}}),t._v(" "),a("ul",{staticClass:"tags"},t._l(t.suggests,function(e){return a("li",{key:e},[t._v(t._s(e))])}))]):a("ul",{staticClass:"tags"},t._l(t.user.knowledge,function(e){return a("li",{key:e},[t._v(t._s(e))])})),t._v(" "),a("label",[t._v("Publications"),t.edit?a("em",[t._v(" (one by line)")]):t._e()]),t._v(" "),t.edit?a("textarea",{directives:[{name:"model",rawName:"v-model",value:(t.user.publications||[]).join("\n"),expression:"(user.publications||[]).join('\\n')"}],attrs:{name:"publications",placeholder:"ex. Mezghani, Manel and On-At, Sirinya My Title, vol. 21 (n° 4). pp. 67-81. ISSN 1633-1311",rows:"10"},domProps:{value:(t.user.publications||[]).join("\n")},on:{keydown:t.adapt,input:function(e){e.target.composing||t.$set(t.user.publications||[],"join('\n')",e.target.value)}}}):a("ul",t._l(t.user.publications,function(e){return a("li",{key:e},[t._v(t._s(e))])})),t._v(" "),a("label",[t._v("Description")]),t._v(" "),t.edit?a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.user.description,expression:"user.description"}],attrs:{name:"description",placeholder:"ex. Nobody suspect that I'm a robot",rows:"15"},domProps:{value:t.user.description},on:{keydown:t.adapt,input:function(e){e.target.composing||t.$set(t.user,"description",e.target.value)}}}):a("p",{domProps:{innerHTML:t._s(t.md(t.user.description))}}),t._v(" "),a("br"),a("hr"),t._v(" "),t.create?a("label",[t._v("Login")]):t._e(),t._v(" "),"checkbox"==(t.create?"text":"hidden")?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user._id,expression:"user._id"}],attrs:{name:"_id",autocomplete:"username",required:"",type:"checkbox"},domProps:{checked:Array.isArray(t.user._id)?t._i(t.user._id,null)>-1:t.user._id},on:{change:function(e){var a=t.user._id,r=e.target,i=!!r.checked;if(Array.isArray(a)){var n=t._i(a,null);r.checked?n<0&&t.$set(t.user,"_id",a.concat([null])):n>-1&&t.$set(t.user,"_id",a.slice(0,n).concat(a.slice(n+1)))}else t.$set(t.user,"_id",i)}}}):"radio"==(t.create?"text":"hidden")?a("input",{directives:[{name:"model",rawName:"v-model",value:t.user._id,expression:"user._id"}],attrs:{name:"_id",autocomplete:"username",required:"",type:"radio"},domProps:{checked:t._q(t.user._id,null)},on:{change:function(e){t.$set(t.user,"_id",null)}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.user._id,expression:"user._id"}],attrs:{name:"_id",autocomplete:"username",required:"",type:t.create?"text":"hidden"},domProps:{value:t.user._id},on:{input:function(e){e.target.composing||t.$set(t.user,"_id",e.target.value)}}}),t._v(" "),t.edit?a("label",[t._v("Password")]):t._e(),t._v(" "),t.edit?a("input",{attrs:{name:"password",type:"password",placeholder:"unchanged",autocomplete:"current-password"},domProps:{value:""}}):t._e()]),t._v(" "),t.create?t._e():[a("h4",[t._v("Activities")]),t._v(" "),t.user.activities&&t.user.activities.length?a("ul",t._l(t.user.activities,function(e){return a("li",{key:e._id},[a("router-link",{attrs:{to:{name:"Activity",params:{id:e._id}}}},[t._v(t._s(e.name))]),t._v(" "),a("form",{staticStyle:{display:"inline"},attrs:{method:"DELETE",action:"/api/activity/"+e._id},on:{submit:function(e){return e.preventDefault(),t.activityDelete(e)}}},[a("button",{staticStyle:{padding:"0",width:"2em"},attrs:{title:"delete"}},[t._v("❌")])])],1)})):a("p",[t._v("This user does not have any activities")])],t._v(" "),a("div",{staticClass:"fab"},[t.create?a("button",{attrs:{title:"Create"}},[t._v("+")]):t._e(),t._v(" "),t.update&&t.edit?a("button",{attrs:{title:"Update"}},[t._v("✓")]):t._e(),t._v(" "),t.update&&t.edit?a("button",{attrs:{title:"Cancel"},on:{click:function(e){e.preventDefault(),t.editmode=!1}}},[t._v("✕")]):t._e(),t._v(" "),t.update&&!t.edit?a("button",{attrs:{title:"Edit"},on:{click:function(e){e.preventDefault(),t.editmode=!0}}},[t._v("✎")]):t._e()])],2),t._v(" "),t.create?t._e():a("Graph",{attrs:{id:this.id}})],1)},staticRenderFns:[]};e.a=r},function(t,e,a){"use strict";var r=a(11),i=a(46);var n=function(t){a(44)},s=a(2)(r.a,i.a,!1,n,"data-v-2f5b62ea",null);e.a=s.exports},function(t,e,a){var r=a(45);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(1)("05c13e1c",r,!0,{})},function(t,e,a){(t.exports=a(0)(!1)).push([t.i,".flex-space-between[data-v-2f5b62ea]{padding:0;display:flex;list-style:none;justify-content:space-between}",""])},function(t,e,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{attrs:{method:"GET",action:"/api/search"},on:{submit:function(e){return e.preventDefault(),t.search(e)}}},[a("h1",[t._v("Knowledge Management Search")]),t._v(" "),t._m(0),t._v(" "),t.users.length?a("h1",[t._v("Users")]):t._e(),t._v(" "),a("ul",t._l(t.users,function(e){return a("li",[a("router-link",{attrs:{to:{name:"User",params:{id:e._id}}}},[t._v(t._s(e.firstName)+" "+t._s(e.lastName)+" - "+t._s(e.function)+" "+t._s(e.department))]),t._v("\n\t\t\t"+t._s(t.user)+"\n\t\t")],1)})),t._v(" "),t.activities.length?a("h1",[t._v("Activities")]):t._e(),t._v(" "),a("ul",t._l(t.activities,function(e){return a("li",[a("router-link",{attrs:{to:{name:"Activity",params:{id:e._id}}}},[t._v(t._s(e.type)+" - "+t._s(e.name))]),t._v(" by "),a("router-link",{attrs:{to:{name:"User",params:{id:e.u_id}}}},[t._v(t._s(e.u_id))])],1)}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("fieldset",[a("input",{attrs:{type:"search",name:"keyword",placeholder:"Enter your keywords ..."}}),t._v(" "),a("ul",{staticClass:"flex-space-between"},[a("li",[a("label",[a("input",{attrs:{type:"radio",name:"type",value:"user"}}),t._v(" User")])]),t._v(" "),a("li",[a("label",[a("input",{attrs:{type:"radio",name:"type",value:"activity"}}),t._v(" Activity")])]),t._v(" "),a("li",[a("label",[a("input",{attrs:{type:"radio",name:"type",checked:""}}),t._v(" Any")])]),t._v(" "),a("button",[t._v("Search")])])])}]};e.a=r}]);
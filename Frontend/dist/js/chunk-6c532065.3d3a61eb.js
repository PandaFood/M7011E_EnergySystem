(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c532065"],{"14a1":function(t,e,r){},1511:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home"},[r("Header"),r("UserPage")],1)},o=[],i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("UserSettings",{attrs:{user:t.user}}),r("HouseSettings",{attrs:{house:t.house,user:t.user}}),t.isAdmin?r("span",[r("h1",[t._v(" Ban user from selling to market ")]),r("div",{attrs:{id:"slider-div"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.banTime,expression:"banTime"}],attrs:{type:"range",name:"seconds",min:"10",max:"100"},domProps:{value:t.banTime},on:{__r:function(e){t.banTime=e.target.value}}}),r("h2",[t._v(" "+t._s(t.banTime)+" seconds ")])]),r("input",{staticClass:"button",attrs:{type:"button",value:"Ban User"},on:{click:t.banUser}})]):t._e()],1)},a=[],s=(r("b0c0"),r("bc3a")),u=r.n(s),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"user-settings"}},[r("div",{attrs:{id:"settings-div"}},[r("form",{attrs:{enctype:"multipart/form-data"},on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[r("label",[t._v("Upload Picture")]),r("br"),r("input",{ref:"file",attrs:{type:"file"},on:{change:t.onSelect}}),r("button",[t._v("Submit")]),r("h5",[t._v(t._s(t.message))])]),r("h2",[t._v("User settings")]),r("span",[t._v(" Name: "+t._s(t.user.name)+" "),r("br")]),r("span",[t._v(" Email: "+t._s(t.user.email)+" "),r("br")]),r("span",[t._v(" Adress: "+t._s(t.user.adress)+" "),r("br")]),r("span",[t._v(" City: "+t._s(t.user.city)+" "),r("br")]),r("span",[t._v(" C/O: "+t._s(null!=t.user.co?t.user.co:"N/A")+" "),r("br")])]),t.isUser?r("div",{attrs:{id:"button-div"}},[r("input",{staticClass:"button",attrs:{type:"button",value:"Delete Account"},on:{click:function(e){return t.clicked(t.event)}}})]):t._e()])},l=[];r("caad"),r("96cf"),r("d3b7"),r("e6cf");function h(t,e,r,n,o,i,a){try{var s=t[i](a),u=s.value}catch(c){return void r(c)}s.done?e(u):Promise.resolve(u).then(n,o)}function f(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){h(i,n,o,a,s,"next",t)}function s(t){h(i,n,o,a,s,"throw",t)}a(void 0)}))}}var d={name:"UserSettings",components:{},props:["user"],data:function(){return{userId:localStorage.getItem("userID"),file:null,message:""}},methods:{clicked:function(t){var e=this;confirm("Are you sure?")?u.a.delete("/auth/user/"+this.user.id,{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(){e.$router.push("/")})):t.preventDefault()},onSelect:function(){var t=["image/jpeg","image/jpg","image/png"],e=this.$refs.file.files[0];this.file=e,console.log(e),t.includes(e.type)||(this.message="Filetype is wrong!!"),e.size>5e5&&(this.message="Too large, max size allowed is 500kb")},onSubmit:function(){var t=f(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=new FormData,e.append("file",this.file),console.log(e),t.prev=3,t.next=6,u.a.post("/auth/user/avatar",e,{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}});case 6:this.message="Uploaded",t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](3),console.log(t.t0),this.message=t.t0.response.data.error;case 13:case"end":return t.stop()}}),t,this,[[3,9]])})));function e(){return t.apply(this,arguments)}return e}()},computed:{isUser:function(){return this.userId!=this.user.id}}},p=d,v=(r("2f3d"),r("2877")),m=Object(v["a"])(p,c,l,!1,null,"656c85ba",null),g=m.exports,y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"house-settings"}},[r("div",{attrs:{id:"info"}},[r("h2",[t._v("House settings")]),r("span",[t._v(" Consumption: "+t._s(t.house.consumption)+" kWh "),r("br")]),r("span",[t._v(" Battery Percentage: "+t._s(100*t.house.batteryPercentage.toFixed(2))+"% "),r("br")])]),t.notOneself?r("div",{attrs:{id:"button-div"}},[r("input",{staticClass:"button",attrs:{type:"button",value:"Open Dashboard"},on:{click:t.openTab}})]):t._e()])},b=[],w={name:"HouseSettings",components:{},props:["house","user"],methods:{openTab:function(){window.location.href="/dashboard/"+this.house.id}},data:function(){return{userId:localStorage.getItem("userID")}},computed:{notOneself:function(){var t="ADMIN"==localStorage.getItem("role"),e=this.userId==this.user.id;return t&&!e}}},_=w,x=(r("2597"),Object(v["a"])(_,y,b,!1,null,"5e5914ec",null)),I=x.exports,L={name:"UserPage",data:function(){return{userId:this.$route.params.id,user:{id:null,name:null,adress:null,city:null,co:null,country:null,email:null},house:{id:null,consumption:0,batteryPercentage:0},banTime:10,interval:{}}},components:{UserSettings:g,HouseSettings:I},mounted:function(){var t=this;u.a.get("/auth/user/"+this.userId,{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){var r=e.data[0];t.user.id=r.id,t.user.name=r.name,t.user.adress=r.adress,t.user.city=r.city,t.user.co=r.co,t.user.country=r.country,t.user.email=r.email,t.user.houseId=r.houseId})).catch((function(t){this.flash(t,"error")})),this.interval=setInterval((function(){u.a.get("/api/house/"+t.user.houseId,{params:{storageId:t.user.houseId},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){var r=e.data[0];t.house.id=r.id,t.house.consumption=r.consumption,t.house.batteryPercentage=r.batteryPercentage})).catch((function(t){this.flash(t,"error")}))}),1e3)},methods:{banUser:function(){var t=this,e={banTime:this.banTime,houseId:this.house.id};u.a.post("/api/banUser",{data:e},{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(){t.flash("User banned for "+t.banTime+" seconds","success")})).catch((function(e){t.flash(e.response.data,"error")}))}},computed:{isAdmin:function(){return"ADMIN"==localStorage.getItem("role")}},destroyed:function(){clearInterval(this.interval)}},E=L,S=(r("ceb1"),Object(v["a"])(E,i,a,!1,null,"36ace104",null)),j=S.exports,k={name:"User",components:{UserPage:j}},O=k,P=Object(v["a"])(O,n,o,!1,null,null,null);e["default"]=P.exports},2597:function(t,e,r){"use strict";var n=r("c01e"),o=r.n(n);o.a},"2f3d":function(t,e,r){"use strict";var n=r("14a1"),o=r.n(n);o.a},"5d9f":function(t,e,r){},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function u(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new k(n||[]);return i._invoke=L(t,r,a),i}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=u;var l="suspendedStart",h="suspendedYield",f="executing",d="completed",p={};function v(){}function m(){}function g(){}var y={};y[i]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(O([])));w&&w!==r&&n.call(w,i)&&(y=w);var _=g.prototype=v.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function I(t){function e(r,o,i,a){var s=c(t[r],t,o);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"===typeof l&&n.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,i,a)}),(function(t){e("throw",t,i,a)})):Promise.resolve(l).then((function(t){u.value=t,i(u)}),(function(t){return e("throw",t,i,a)}))}a(s.arg)}var r;function o(t,n){function o(){return new Promise((function(r,o){e(t,n,r,o)}))}return r=r?r.then(o,o):o()}this._invoke=o}function L(t,e,r){var n=l;return function(o,i){if(n===f)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return P()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var s=E(a,r);if(s){if(s===p)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var u=c(t,e,r);if("normal"===u.type){if(n=r.done?d:h,u.arg===p)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=d,r.method="throw",r.arg=u.arg)}}}function E(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var o=c(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,p;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function O(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:P}}function P(){return{value:e,done:!0}}return m.prototype=_.constructor=g,g.constructor=m,g[s]=m.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},x(I.prototype),I.prototype[a]=function(){return this},t.AsyncIterator=I,t.async=function(e,r,n,o){var i=new I(u(e,r,n,o));return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(_),_[s]="Generator",_[i]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:O(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},b0c0:function(t,e,r){var n=r("83ab"),o=r("9bf2").f,i=Function.prototype,a=i.toString,s=/^\s*function ([^ (]*)/,u="name";!n||u in i||o(i,u,{configurable:!0,get:function(){try{return a.call(this).match(s)[1]}catch(t){return""}}})},c01e:function(t,e,r){},caad:function(t,e,r){"use strict";var n=r("23e7"),o=r("4d64").includes,i=r("44d2");n({target:"Array",proto:!0},{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i("includes")},ceb1:function(t,e,r){"use strict";var n=r("5d9f"),o=r.n(n);o.a}}]);
//# sourceMappingURL=chunk-6c532065.3d3a61eb.js.map
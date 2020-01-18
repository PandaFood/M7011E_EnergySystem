(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79fa5a92"],{"159b":function(t,e,n){var r=n("da84"),a=n("fdbc"),o=n("17c2"),i=n("9112");for(var s in a){var u=r[s],c=u&&u.prototype;if(c&&c.forEach!==o)try{i(c,"forEach",o)}catch(d){c.forEach=o}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,a=n("b301");t.exports=a("forEach")?function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach},4154:function(t,e,n){},"4e82":function(t,e,n){"use strict";var r=n("23e7"),a=n("1c0b"),o=n("7b0b"),i=n("d039"),s=n("b301"),u=[],c=u.sort,d=i((function(){u.sort(void 0)})),l=i((function(){u.sort(null)})),h=s("sort"),f=d||!l||h;r({target:"Array",proto:!0,forced:f},{sort:function(t){return void 0===t?c.call(o(this)):c.call(o(this),a(t))}})},"5a95":function(t,e,n){},"65f0":function(t,e,n){var r=n("861d"),a=n("e8b5"),o=n("b622"),i=o("species");t.exports=function(t,e){var n;return a(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[i],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"6edc":function(t,e,n){},7277:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("Header"),n("Dashboard")],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"dashboard"}},[n("WindModal",{attrs:{houseId:t.houseId}}),n("BatteryModal",{attrs:{houseId:t.houseId}}),n("CurrentState",{attrs:{houseId:t.houseId}}),t.isUser?n("div",{attrs:{id:"button-div"}},[n("button",{staticClass:"button",on:{click:t.openWindModal}},[t._v("Add Wind Turbine")]),n("button",{staticClass:"button",on:{click:t.openBatteryModal}},[t._v("Add Battery")])]):t._e(),n("div",{attrs:{id:"table-div"}},[n("TurbineTable",{attrs:{houseId:t.houseId}}),n("BatteryTable",{attrs:{houseId:t.houseId}})],1)],1)},i=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"current-state"}},[n("div",[n("b",[t._v(" Current Production: ")]),t._v(" "),n("span",[t._v(t._s(t.currentProduction.toFixed(2))+" kWh ")]),n("br"),n("b",[t._v(" Current Consumption: ")]),t._v(" "),n("span",[t._v(t._s(t.currentConsumption.toFixed(2))+" kWh ")]),n("br"),n("b",[t._v(" Net Production: ")]),t._v(" "),n("span",[t._v(t._s((t.currentProduction-t.currentConsumption).toFixed(2))+" kWh ")]),n("br"),n("b",[t._v(" Current Price: ")]),t._v(" "),n("span",[t._v(t._s(t.currentPrice.toFixed(2))+" sek/kWh ")]),n("br")])])},u=[],c=(n("159b"),n("bc3a")),d=n.n(c),l={name:"CurrentState",data:function(){return{currentProduction:0,currentConsumption:0,currentPrice:0}},props:["houseId"],mounted:function(){this.$nextTick((function(){var t=this;setInterval((function(){d.a.get("/api/allLatestProducerEvent",{params:{houseId:t.houseId},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){var n=0;e.data.forEach((function(t){n+=t.energyProduced})),t.currentProduction=n})).catch((function(e){t.flash(e,"error")})),d.a.get("/api/house/"+t.houseId,{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){if(!(e.data.length>0))throw"ERROR: Could not fetch house, wrong ID";t.currentConsumption=e.data[0].consumption})).catch((function(e){t.flash(e,"error")})),d.a.get("/api/currentPrice",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t.currentPrice=e.data.price})).catch((function(e){t.flash(e,"error")}))}),1e3)}))}},h=l,f=(n("b6c0"),n("2877")),b=Object(f["a"])(h,s,u,!1,null,"7d3f1c61",null),p=b.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"turbine-table"}},[n("h2",[t._v("Wind Turbines ")]),n("table",[t._m(0),t._l(t.turbines,(function(t){return n("tbody",{key:t.id},[n("TurbineRow",{attrs:{turbine:t}})],1)}))],2)])},m=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",{attrs:{id:"table-header"}},[n("th",[t._v(" Id ")]),n("th",[t._v(" Wind Speed (m/s)")]),n("th",[t._v(" Current Production (kWh)")]),n("th",[t._v(" Status ")])])}],_=(n("4e82"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",{class:{"blackout-row":"down"==t.turbine.status},on:{click:t.openTab}},[n("td",[t._v(t._s(t.turbine.producerId.split("-")[0])+"...")]),n("td",[t._v(t._s(t.turbine.windSpeed.toFixed(2)))]),n("td",[t._v(t._s(t.turbine.energyProduced.toFixed(2)))]),n("td",[t._v(t._s(t.turbine.status))])])}),y=[],g={name:"TurbineRow",props:["turbine"],methods:{openTab:function(){window.open("/wind?id="+this.turbine.producerId,"_blank")}}},w=g,I=(n("a53f"),Object(f["a"])(w,_,y,!1,null,"e6cbb56e",null)),C=I.exports,x={name:"TurbineTable",components:{TurbineRow:C},props:["houseId"],data:function(){return{turbines:[]}},mounted:function(){this.$nextTick((function(){var t=this;setInterval((function(){d.a.get("/api/allLatestProducerEvent",{params:{houseId:t.houseId},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t.turbines=e.data,t.turbines.sort((function(t,e){return(""+t.producerId).localeCompare(e.producerId)}))})).catch((function(e){t.flash(e,"error")}))}),1e3)}))}},S=x,T=(n("91b1"),Object(f["a"])(S,v,m,!1,null,null,null)),L=T.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"battery-table"}},[n("h2",[t._v("Batteries")]),n("table",[t._m(0),t._l(t.batteries,(function(t){return n("tbody",{key:t.id},[n("BatteryRow",{attrs:{battery:t}})],1)}))],2)])},P=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",{attrs:{id:"table-header"}},[n("th",[t._v(" Id ")]),n("th",[t._v(" Current Capacity (kWh)")]),n("th",[t._v(" Max Capacity (kWh)")]),n("th",[t._v(" Fill Percentage (%) ")])])}],E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",{on:{click:t.openTab}},[n("td",[t._v(t._s(t.battery.id.split("-")[0])+"...")]),n("td",[t._v(t._s(t.battery.currentCapacity.toFixed(2)))]),n("td",[t._v(t._s(t.battery.maxCapacity.toFixed(2)))]),n("td",[t._v(t._s(100*(t.battery.currentCapacity/t.battery.maxCapacity).toFixed(2)))])])},M=[],B={name:"BatteryRow",props:["battery"],methods:{openTab:function(){window.open("/battery?id="+this.battery.id,"_blank")}}},$=B,A=Object(f["a"])($,E,M,!1,null,"77f56e59",null),W=A.exports,j={name:"BatteryTable",components:{BatteryRow:W},props:["houseId"],data:function(){return{batteries:[]}},mounted:function(){this.$nextTick((function(){var t=this;setInterval((function(){d.a.get("/api/storage",{params:{houseId:t.houseId},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return t.batteries=e.data})).catch((function(e){t.flash(e,"error")}))}),1e3)}))}},R=j,O=(n("ba69"),Object(f["a"])(R,k,P,!1,null,null,null)),F=O.exports,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{staticClass:"wind-modal",attrs:{name:"wind-modal"}},[n("h3",[t._v("Create new Wind Turbine")]),n("div",{attrs:{id:"form-div"}},[t._v(" Please enter coordinates between "),n("b",[t._v("0")]),t._v(" and "),n("b",[t._v("200")]),t._v(" for the new wind turbine: "),n("form",[n("div",{staticClass:"input"},[n("b",[t._v("Latitude:")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.lat,expression:"lat",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.lat},on:{input:function(e){e.target.composing||(t.lat=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),n("br")]),n("div",{staticClass:"input"},[n("b",[t._v("Longitude:")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.lon,expression:"lon",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.lon},on:{input:function(e){e.target.composing||(t.lon=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),n("br")]),n("input",{staticClass:"button",attrs:{type:"button",value:"Create"},on:{click:t.submit}})])])])},D=[],N={name:"WindModal",props:["houseId"],methods:{submit:function(){var t=this;if(this.lat>200||this.lat<0||this.lon>200||this.lon<0)this.flash("Coordinate out of bounds","warning");else if("string"==typeof this.lat||"string"==typeof this.lon)this.flash("Coordinate is not a number","warning");else{var e={houseId:this.houseId,coords:[this.lat,this.lon],type:"Wind Turbine"};d.a.post("/api/producer",{data:e},{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t.flash(e.data,"success")})).catch((function(e){t.flash(e.response.data,"error")}))}}},data:function(){return{lat:0,lon:0}}},V=N,G=(n("a242"),Object(f["a"])(V,z,D,!1,null,"7718a7d6",null)),U=G.exports,H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{staticClass:"battery-modal",attrs:{name:"battery-modal"}},[n("h3",[t._v("Create new Battery")]),n("div",{attrs:{id:"form-div"}},[t._v(" Please enter Maximum Capacity betweeon "),n("b",[t._v("0")]),t._v(" and "),n("b",[t._v("200")]),t._v(" for the new battery: "),n("form",[n("div",{staticClass:"input"},[n("b",[t._v("Maximum Capacity:")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.capacity,expression:"capacity",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:t.capacity},on:{input:function(e){e.target.composing||(t.capacity=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),n("br")]),n("input",{staticClass:"button",attrs:{type:"button",value:"Create"},on:{click:t.submit}})])])])},J=[],q={name:"BatteryModal",props:["houseId"],methods:{submit:function(){var t=this;if(this.capacity>200||this.capacity<0)this.flash("Size out of bounds","warning");else if("string"==typeof this.capacity)this.flash("Size is not a number","warning");else{var e={houseId:this.houseId,maxCapacity:this.capacity,currentCapacity:0};d.a.post("/api/storage",{data:e},{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t.flash(e.data,"success")})).catch((function(e){t.flash(e.response.data,"error")}))}}},data:function(){return{capacity:0}}},K=q,Q=(n("ab83"),Object(f["a"])(K,H,J,!1,null,"6f501362",null)),X=Q.exports,Y={name:"Dashboard",components:{CurrentState:p,TurbineTable:L,BatteryTable:F,WindModal:U,BatteryModal:X},data:function(){return{houseId:this.$route.params.houseId}},methods:{openWindModal:function(){this.$modal.show("wind-modal")},openBatteryModal:function(){this.$modal.show("battery-modal")}},mounted:function(){this.houseId=this.$route.params.houseId},computed:{isUser:function(){return"USER"==localStorage.getItem("role")}}},Z=Y,tt=(n("8434"),Object(f["a"])(Z,o,i,!1,null,null,null)),et=tt.exports,nt={name:"home",components:{Dashboard:et}},rt=nt,at=Object(f["a"])(rt,r,a,!1,null,null,null);e["default"]=at.exports},"73cd":function(t,e,n){},8434:function(t,e,n){"use strict";var r=n("73cd"),a=n.n(r);a.a},"91b1":function(t,e,n){"use strict";var r=n("4154"),a=n.n(r);a.a},9605:function(t,e,n){},a242:function(t,e,n){"use strict";var r=n("6edc"),a=n.n(r);a.a},a53f:function(t,e,n){"use strict";var r=n("9605"),a=n.n(r);a.a},ab83:function(t,e,n){"use strict";var r=n("b02c"),a=n.n(r);a.a},ae45:function(t,e,n){},b02c:function(t,e,n){},b301:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!n||!r((function(){n.call(null,e||function(){throw 1},1)}))}},b6c0:function(t,e,n){"use strict";var r=n("ae45"),a=n.n(r);a.a},b727:function(t,e,n){var r=n("f8c2"),a=n("44ad"),o=n("7b0b"),i=n("50c4"),s=n("65f0"),u=[].push,c=function(t){var e=1==t,n=2==t,c=3==t,d=4==t,l=6==t,h=5==t||l;return function(f,b,p,v){for(var m,_,y=o(f),g=a(y),w=r(b,p,3),I=i(g.length),C=0,x=v||s,S=e?x(f,I):n?x(f,0):void 0;I>C;C++)if((h||C in g)&&(m=g[C],_=w(m,C,y),t))if(e)S[C]=_;else if(_)switch(t){case 3:return!0;case 5:return m;case 6:return C;case 2:u.call(S,m)}else if(d)return!1;return l?-1:c||d?d:S}};t.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6)}},ba69:function(t,e,n){"use strict";var r=n("5a95"),a=n.n(r);a.a},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-79fa5a92.15efd6eb.js.map
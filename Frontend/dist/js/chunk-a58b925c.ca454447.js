(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a58b925c"],{1148:function(e,t,n){"use strict";var r=n("a691"),o=n("1d80");e.exports="".repeat||function(e){var t=String(o(this)),n="",s=r(e);if(s<0||s==1/0)throw RangeError("Wrong number of repetitions");for(;s>0;(s>>>=1)&&(t+=t))1&s&&(n+=t);return n}},1511:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("Header"),n("UserPage")],1)},o=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("UserSettings",{attrs:{user:e.user}}),n("HouseSettings",{attrs:{house:e.house}}),n("HouseControl",{attrs:{house:e.house}}),e.isAdmin?n("span",[n("h1",[e._v(" Ban user from selling to market ")]),n("div",{attrs:{id:"slider-div"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.banTime,expression:"banTime"}],attrs:{type:"range",name:"seconds",min:"10",max:"100"},domProps:{value:e.banTime},on:{__r:function(t){e.banTime=t.target.value}}}),n("h2",[e._v(" "+e._s(e.banTime)+" seconds ")])]),n("input",{staticClass:"button",attrs:{type:"button",value:"Ban User"},on:{click:e.banUser}})]):e._e()],1)},a=[],i=(n("b0c0"),n("bc3a")),u=n.n(i),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("h2",[e._v("User settings")]),n("span",[e._v(" Name: "+e._s(e.user.name)+" "),n("br")]),n("span",[e._v(" Email: "+e._s(e.user.email)+" "),n("br")]),n("span",[e._v(" Adress: "+e._s(e.user.adress)+" "),n("br")]),n("span",[e._v(" City: "+e._s(e.user.city)+" "),n("br")]),n("span",[e._v(" C/O: "+e._s(null!=e.user.co?e.user.co:"N/A")+" "),n("br")])]),n("div",[n("input",{staticClass:"button",attrs:{type:"button",value:"Delete Account"},on:{click:function(t){return e.clicked(e.event)}}})])])},l=[],h={name:"UserSettings",components:{},props:["user"],data:function(){return{userId:localStorage.getItem("userID")}},methods:{clicked:function(e){confirm("Are you sure?")?u.a.delete("/auth/user/"+this.userId,{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(){localStorage.clear(),window.location.href="/"})):e.preventDefault()}}},d=h,m=(n("fb17"),n("2877")),p=Object(m["a"])(d,c,l,!1,null,"1bfb2058",null),f=p.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"house-settings"}},[n("h2",[e._v("House settings")]),n("div",{attrs:{id:"info"}},[n("span",[e._v(" Consumption: "+e._s(e.house.consumption)+" kWh "),n("br")]),n("span",[e._v(" Battery Percentage: "+e._s(100*e.house.batteryPercentage.toFixed(2))+"% "),n("br")])]),e.isAdmin?n("div",[n("input",{staticClass:"button",attrs:{type:"button",value:"Open Dashboard"},on:{click:e.openTab}})]):e._e()])},b=[],g={name:"HouseSettings",components:{},props:["house"],methods:{openTab:function(){window.open("http://localhost/dashboard/"+this.house.id,"_blank")}},computed:{isAdmin:function(){return"ADMIN"==localStorage.getItem("role")}}},_=g,w=(n("2091"),Object(m["a"])(_,v,b,!1,null,"fe7f7262",null)),y=w.exports,I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"house-control"}},[n("h1",[e._v(" House Control ")]),n("p",[e._v(" Set how much of generated power should go to the battery: ")]),n("div",{attrs:{id:"slider-div"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newPercentage,expression:"newPercentage"}],attrs:{type:"range",name:"percent",min:"0",max:"100"},domProps:{value:e.newPercentage},on:{__r:function(t){e.newPercentage=t.target.value}}}),n("h2",[e._v(" "+e._s(this.newPercentage)+" % ")])]),n("p",[e._v(" Set how much power the house consumes: ")]),n("div",{staticClass:"input"},[n("b",[e._v("Consumption:")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.consumption,expression:"consumption",modifiers:{number:!0}}],attrs:{type:"number"},domProps:{value:e.consumption},on:{input:function(t){t.target.composing||(e.consumption=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}}),n("br")]),n("button",{staticClass:"button",on:{click:e.updatePercentage}},[e._v("Update")])])},P=[],x=(n("b680"),{name:"HouseControl",props:["house"],data:function(){return{newPercentage:100*this.house.batteryPercentage,consumption:this.house.consumption}},methods:{updatePercentage:function(){var e=this;if("string"==typeof this.consumption)this.flash("Input consumption is not number","warning");else if(this.consumption<0)this.flash("Input consumption can not be negative","warning");else{var t={batteryPercentage:(this.newPercentage/100).toFixed(2),consumption:this.consumption};u.a.post("http://localhost/api/house/"+this.house.id,{},{data:t,headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(t){e.flash(t.data,"success")})).catch((function(t){e.flash(t.response.data,"error")}))}}}}),S=x,A=(n("33dd"),Object(m["a"])(S,I,P,!1,null,"80254398",null)),U=A.exports,C={name:"UserPage",data:function(){return{userId:this.$route.params.id,user:{id:null,name:null,adress:null,city:null,co:null,country:null,email:null},house:{id:null,consumption:0,batteryPercentage:0},banTime:10}},components:{UserSettings:f,HouseSettings:y,HouseControl:U},mounted:function(){var e=this;u.a.get("/auth/user/"+this.userId,{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(t){var n=t.data[0];e.user.id=n.id,e.user.name=n.name,e.user.adress=n.adress,e.user.city=n.city,e.user.co=n.co,e.user.country=n.country,e.user.email=n.email,e.user.houseId=n.houseId})).catch((function(e){this.flash(e,"error")})),setInterval((function(){u.a.get("/api/house/"+e.user.houseId,{params:{storageId:e.user.houseId},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(t){var n=t.data[0];e.house.id=n.id,e.house.consumption=n.consumption,e.house.batteryPercentage=n.batteryPercentage})).catch((function(e){this.flash(e,"error")}))}),1e3)},methods:{banUser:function(){var e=this,t={banTime:this.banTime,houseId:this.house.id};u.a.post("http://localhost/api/banUser",{},{data:t,headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(){e.flash("User banned for "+e.banTime+" seconds","success")})).catch((function(t){e.flash(t.response.data,"error")}))}},computed:{isAdmin:function(){return"ADMIN"==localStorage.getItem("role")}}},k=C,T=(n("3894"),Object(m["a"])(k,s,a,!1,null,"f6cc490c",null)),N=T.exports,j={name:"User",components:{UserPage:N}},E=j,F=Object(m["a"])(E,r,o,!1,null,null,null);t["default"]=F.exports},2091:function(e,t,n){"use strict";var r=n("a16c"),o=n.n(r);o.a},2148:function(e,t,n){},"33dd":function(e,t,n){"use strict";var r=n("2148"),o=n.n(r);o.a},3894:function(e,t,n){"use strict";var r=n("f569"),o=n.n(r);o.a},"408a":function(e,t,n){var r=n("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=r(e))throw TypeError("Incorrect invocation");return+e}},4736:function(e,t,n){},a16c:function(e,t,n){},b0c0:function(e,t,n){var r=n("83ab"),o=n("9bf2").f,s=Function.prototype,a=s.toString,i=/^\s*function ([^ (]*)/,u="name";!r||u in s||o(s,u,{configurable:!0,get:function(){try{return a.call(this).match(i)[1]}catch(e){return""}}})},b680:function(e,t,n){"use strict";var r=n("23e7"),o=n("a691"),s=n("408a"),a=n("1148"),i=n("d039"),u=1..toFixed,c=Math.floor,l=function(e,t,n){return 0===t?n:t%2===1?l(e,t-1,n*e):l(e*e,t/2,n)},h=function(e){var t=0,n=e;while(n>=4096)t+=12,n/=4096;while(n>=2)t+=1,n/=2;return t},d=u&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!i((function(){u.call({})}));r({target:"Number",proto:!0,forced:d},{toFixed:function(e){var t,n,r,i,u=s(this),d=o(e),m=[0,0,0,0,0,0],p="",f="0",v=function(e,t){var n=-1,r=t;while(++n<6)r+=e*m[n],m[n]=r%1e7,r=c(r/1e7)},b=function(e){var t=6,n=0;while(--t>=0)n+=m[t],m[t]=c(n/e),n=n%e*1e7},g=function(){var e=6,t="";while(--e>=0)if(""!==t||0===e||0!==m[e]){var n=String(m[e]);t=""===t?n:t+a.call("0",7-n.length)+n}return t};if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(u!=u)return"NaN";if(u<=-1e21||u>=1e21)return String(u);if(u<0&&(p="-",u=-u),u>1e-21)if(t=h(u*l(2,69,1))-69,n=t<0?u*l(2,-t,1):u/l(2,t,1),n*=4503599627370496,t=52-t,t>0){v(0,n),r=d;while(r>=7)v(1e7,0),r-=7;v(l(10,r,1),0),r=t-1;while(r>=23)b(1<<23),r-=23;b(1<<r),v(1,1),b(2),f=g()}else v(0,n),v(1<<-t,0),f=g()+a.call("0",d);return d>0?(i=f.length,f=p+(i<=d?"0."+a.call("0",d-i)+f:f.slice(0,i-d)+"."+f.slice(i-d))):f=p+f,f}})},f569:function(e,t,n){},fb17:function(e,t,n){"use strict";var r=n("4736"),o=n.n(r);o.a}}]);
//# sourceMappingURL=chunk-a58b925c.ca454447.js.map
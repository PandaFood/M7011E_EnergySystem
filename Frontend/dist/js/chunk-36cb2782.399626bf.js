(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36cb2782"],{"50dd":function(t,e,a){"use strict";var r=a("9fbc"),n=a.n(r);n.a},"522e":function(t,e,a){"use strict";var r=a("e790"),n=a.n(r);n.a},"9fbc":function(t,e,a){},e790:function(t,e,a){},f3f2:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("Header"),a("WindTab")],1)},n=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("CurrentWind",{attrs:{windData:t.windData}}),a("Graph",{ref:"graph",attrs:{turbineId:t.turbineId}})],1)},d=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"chartdiv",staticClass:"chart"})},o=[],c=(a("cb29"),a("d81d"),a("4e82"),a("b0c0"),a("b680"),a("71c9")),u=a("c497"),h=a("5a54"),l=a("bc3a"),p=a.n(l);c["c"](h["a"]);var f={name:"Graph",data:function(){return{graphData:[]}},params:["turbineId"],methods:{initSeries:function(t,e,a){var r=this.chart.yAxes.push(new u["d"]),n=this.chart.series.push(new u["c"]);n.dataFields.valueY=t.toLowerCase(),n.dataFields.dateX="date",n.strokeWidth=3,n.fillOpacity=0,n.stroke=e,n.fill=e,n.name=t,n.unit=a,n.yAxis=r,n.tooltipText="{name}: [bold]{valueY} {unit}[/]",r.renderer.line.strokeOpacity=1,r.renderer.line.strokeWidth=2,r.renderer.line.stroke=n.stroke,r.renderer.labels.template.fill=n.stroke,r.renderer.grid.template.disabled=!0},addData:function(t,e,a){this.chart.addData({date:a,speed:t.toFixed(2),power:e.toFixed(2)})}},mounted:function(){var t=this,e=c["b"](this.$refs.chartdiv,u["e"]);e.paddingRight=20,this.chart=e,c["c"](h["a"]),this.dateAxis=this.chart.xAxes.push(new u["a"]),this.dateAxis.renderer.grid.template.location=0,this.dateAxis.renderer.minGridDistance=100,this.dateAxis.groupData=!0,this.chart.scrollbarX=new c["a"],this.chart.scrollbarX.paddingLeft=20,this.chart.scrollbarX.paddingRight=20,this.initSeries("Power","#EE0000","kWh"),this.initSeries("Speed","#0000EE","m/s"),this.chart.cursor=new u["f"],this.chart.cursor.behavior="zoomX",this.chart.cursor.lineX.disabled=!0,this.chart.legend=new u["b"],this.chart.legend.labels.template.text="[bold {color}]{name} ({unit})[/]",this.dateAxis.keepSelection=!0,p.a.get("/api/producerEvent",{params:{producerId:this.$attrs.turbineId},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){function a(t){return{speed:t.windSpeed.toFixed(2),power:t.energyProduced.toFixed(2),date:Date.parse(t.timestamp)}}var r=e.data.map(a);r.sort((function(t,e){return t.date-e.date})),r.length>50&&(t.dateAxis.start=.8),t.chart.addData(r)})).catch((function(e){t.flash(e,"error")}))},beforeDestroy:function(){this.chart&&this.chart.dispose()}},b=f,w=(a("522e"),a("2877")),v=Object(w["a"])(b,s,o,!1,null,"0f7851b8",null),m=v.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"current-wind"}},[a("div",[a("b",[t._v(" Wind Speed: ")]),t._v(" "),a("span",[t._v(t._s(t.windData.windSpeed.toFixed(2))+" m/s ")]),a("br"),a("b",[t._v(" Generated Power: ")]),t._v(" "),a("span",[t._v(t._s(t.windData.power.toFixed(2))+" kWh ")]),a("br"),a("b",[t._v(" Status: ")]),t._v(" "),a("span",[t._v(t._s(t.windData.status)+" ")]),a("br")])])},x=[],D={name:"CurrentWind",props:["windData"]},_=D,S=(a("50dd"),Object(w["a"])(_,g,x,!1,null,"6e2d76c8",null)),k=S.exports,I={name:"WindTab",components:{CurrentWind:k,Graph:m},data:function(){return{windData:{windSpeed:0,power:0,status:""},turbineId:this.$route.query.id,interval:{}}},mounted:function(){this.$nextTick((function(){var t=this;this.interval=setInterval((function(){p.a.get("/api/latestProducerEvent",{params:{producerId:t.turbineId},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){t.windData.windSpeed=e.data[0].windSpeed,t.windData.power=e.data[0].energyProduced,t.windData.status=e.data[0].status,t.$refs.graph&&t.$refs.graph.addData(e.data[0].windSpeed,e.data[0].energyProduced,Date.parse(e.data[0].timestamp))})).catch((function(e){t.flash(e,"error")}))}),1e3)}))},destroyed:function(){clearInterval(this.interval)}},A=I,W=Object(w["a"])(A,i,d,!1,null,null,null),y=W.exports,E={name:"home",components:{WindTab:y}},$=E,F=Object(w["a"])($,r,n,!1,null,null,null);e["default"]=F.exports}}]);
//# sourceMappingURL=chunk-36cb2782.399626bf.js.map
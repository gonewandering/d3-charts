"use strict";var _SocChartsConfig={path:"/static/modules/socialight-charts/app/"};angular.module("socCharts",["ngAnimate","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("socCharts").controller("MainCtrl",["$scope",function(a){a.options={label:"label",stack:[{key:"v1",label:"Impressions",color:"rgba(0,0,255, .5)"},{key:"v2",label:"Comments",color:"rgba(0,255,0, .5)"},{key:"v3",label:"Likes",color:"rgba(255,0,0, .5)"}],height:400,legend:!0,axis:{x:{show:!0},y:{show:!1,label:"Traffic"}},sort:"desc"},a.donutOptions={label:"label",stack:{key:"v1",label:"Impressions",colors:["#666666","#CCCCCC"]},height:400,sort:"desc"},a.loading=!1,a.data=[{label:"1AM",v1:4,v2:3,v3:1,color:"#FF0000"},{label:"4PM",v1:2,v2:6,v3:7},{label:"6PM",v1:3,v2:4,v3:2,color:"#00FF00"},{label:"12PM",v1:8,v2:8,v3:1},{label:"8PM",v1:4,v2:8,v3:1},{label:"9AM",v1:9,v2:6,v3:1}],a.update=function(){a.loading=a.loading?!1:!0}}]),angular.module("socCharts").directive("barchart",function(){return{templateUrl:_SocChartsConfig.path+"views/charts/bar.html",restrict:"A",scope:{barchart:"=",options:"=",loading:"="},link:function(a,b){a.$watch("barchart",function(){a.create()},!0),a.$watch("options",function(){a.update()},!0),a.options=angular.extend({label:"label",stack:[{key:"v1",label:"Impressions",color:"#006699"},{key:"v2",label:"Comments",color:"#996600"},{key:"v3",label:"Likes",color:"#FF0099"}],height:400,legend:!0,chartLabel:!1,axis:{x:{show:!0},y:{show:!1,label:"Traffic"}},sort:"desc"},a.options),$(window).on("resize",function(){a.update()}),a.create=function(){if(!a.barchart)return!1;b.height(a.options.height);var c=d3.selectAll(b),d={top:20,right:0,bottom:20,left:0};a.options.axis.y.show&&(d.left+=a.options.axis.y.width||100);var e=a.options.width||b.width();e=e-d.left-d.right;var f=a.options.height-d.top-d.bottom,g=d3.scale.ordinal().rangeRoundBands([0,f],.1),h=d3.scale.linear().rangeRound([e,0]),i=d3.svg.axis().scale(g).orient("left"),j=d3.svg.axis().scale(h).orient("bottom").tickFormat(d3.format(".2s"));c.selectAll(".chart").selectAll("svg").remove();var k=c.selectAll(".chart").append("svg").attr("width",e+d.left+d.right).attr("height",f+d.top+d.bottom).append("g").attr("transform","translate("+d.left+","+d.top+")"),l=angular.copy(a.barchart);if(l.forEach(function(b,c){var d=0;l[c]={label:"function"==typeof a.options.axis.y.label?a.options.axis.y.label(b):b[a.options.axis.y.label]},a.options.stack?a.options.stack.forEach(function(a){if(l[c].values=l[c].values||[],"function"==typeof a.key){var e={label:a.label,color:a.color};e.y0=d,e.y1=d+=a.key(b),l[c].values.push(e)}else if(b[a.key]){var e={label:a.label,color:a.color};e.y0=d,e.y1=d+=b[a.key],l[c].values.push(e)}}):l[c].values=[{label:"test",color:l.color||"black",y0:0,y1:b.value}],l[c].total=l[c].values[l[c].values.length-1].y1}),a.options.sort&&l.sort(function(b,c){return"desc"==a.options.sort?c.total-b.total:b.total-c.total}),g.domain(l.map(function(a){return a.label})),h.domain([d3.max(l,function(a){return a.total}),0]),a.options.axis.x.show&&k.append("g").attr("class","x axis").attr("transform","translate(0,"+f+")").call(j),a.options.axis.y.show){var m=k.append("g").attr("class","y axis").call(i).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end");a.options.axis.y.showLabel&&m.text(a.options.axis.y.label("Label"))}var n=k.selectAll(".state").data(l).enter().append("g").attr("class","g").attr("transform",function(a){return"translate(0,"+g(a.label)+")"});if(n.selectAll("rect").data(function(a){return a.values}).enter().append("rect").attr("height",g.rangeBand()).attr("x",function(a){return h(a.y0)}).attr("width",function(a){return h(a.y1)-h(a.y0)}).style("fill",function(a){return a.color}),a.options.legend){var o=k.selectAll(".legend").data(a.options.stack).enter().append("g").attr("class","legend").attr("transform",function(a,b){return"translate(-20,"+20*b+")"});o.append("rect").attr("x",e-18).attr("width",18).attr("height",18).style("fill",function(a){return a.color}),o.append("text").attr("x",e-24).attr("y",9).attr("dy",".35em").style("text-anchor","end").text(function(a){return a.label})}},a.update=function(){a.create()},a.create()}}}),angular.module("socCharts").directive("linechart",function(){return{templateUrl:_SocChartsConfig.path+"views/charts/line.html",restrict:"A",scope:{linechart:"=",options:"=",loading:"="},link:function(a,b){a.$watch("linechart",function(){a.data=a.linechart,a.create()},!0),a.$watch("options",function(){a.update()},!0),a.data=a.linechart,a.options=angular.extend({label:"label",stack:[{key:"v1",label:"Impressions",color:"#006699"},{key:"v2",label:"Comments",color:"#996600"},{key:"v3",label:"Likes",color:"#FF0099"}],height:400,legend:!0,width:void 0,axis:{x:{show:!0,label:"label"},y:{show:!1,label:"Traffic"}},sort:"desc",date:function(){},mouseover:function(){},mouseout:function(){},click:function(){}},a.options),$(window).on("resize",function(){a.update()}),b.height(a.options.height),a.create=function(){var c=this,d="v0",e={top:20,right:0,bottom:30,left:0};a.options.axis.y.show&&(e.left+=0);var f=a.options.width||b.width();b.width(f),f=f-e.left-e.right;var g=a.options.height-e.top-e.bottom;if(a.options.timeseries)var h=d3.time.scale().range([0,f]);else var h=d3.scale.ordinal().rangePoints([0,f]);var i=d3.scale.linear().rangeRound([g,0]),j=d3.svg.axis().scale(h).orient(["bottom"]),k=d3.svg.axis().scale(i).orient("right").tickFormat(d3.format(".2s")),l=d3.svg.line().interpolate("cardinal").x(function(b){return h("function"==typeof a.options.axis.x.label?a.options.axis.x.label(b):b[a.options.axis.x.label])}).y(function(a){return i("function"==typeof d?d(a):a[d])}),m=d3.selectAll(b);m.selectAll(".chart").selectAll("svg").remove();var n=m.selectAll(".chart").append("svg").attr("width",f+e.left+e.right).attr("height",g+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")"),o=[];if(o=angular.copy(a.data),a.options.sort&&"function"==typeof a.options.sort?o=o.sort(a.options.sort):a.options.sort&&o.sort(function(b,c){return"desc"==a.options.sort?c.total-b.total:b.total-c.total}),h.domain(a.options.timeseries?d3.extent(o,function(b){return"function"==typeof a.options.axis.x.label?a.options.axis.x.label(b):b[a.options.axis.x.label]}):o.map(function(b){return"function"==typeof a.options.axis.x.label?a.options.axis.x.label(b):b[a.options.axis.x.label]})),i.domain([0,d3.max(o,function(b){return d3.max(a.options.stack,function(a){return"function"==typeof a.key?a.key(b):b[a.key]})})]),a.options.axis.x.show&&n.append("g").attr("class","x axis").attr("transform","translate(0,"+g+")").call(j),a.options.axis.y.show&&n.append("g").attr("class","y axis").call(k).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text(a.options.axis.y.label),a.options.stack.forEach(function(b){d=b.key,n.append("path").attr("class","line").attr("d",l(o)).style("fill","none").style("stroke",b.color).style("stroke-width",5),b.markers&&b.markers.show&&n.selectAll(".marker-"+b.label).data(o).enter().append("circle").attr("class","marker marker-"+b.label).attr("cx",function(b){return b?h("function"==typeof a.options.axis.x.label?a.options.axis.x.label(b):b[a.options.axis.x.label]):void 0}).attr("r",function(a){return a?7:void 0}).attr("cy",function(a){return a?i("function"==typeof b.key?b.key(a):a[b.key]):void 0}).style("stroke","white").style("fill",b.markers.color||"#999").style("stroke-width",3).on("mouseover",c.options.mouseover||function(){}).on("mouseout",c.options.mouseout||function(){}).on("click",c.options.click||function(){})}),a.options.legend){var p=n.selectAll(".legend").data(a.options.stack).enter().append("g").attr("class","legend").attr("transform",function(a,b){return"translate(-20,"+20*b+")"});p.append("rect").attr("x",f-18).attr("width",18).attr("height",18).style("fill",function(a){return a.color}),p.append("text").attr("x",f-24).attr("y",9).attr("dy",".35em").style("text-anchor","end").text(function(a){return a.label})}},a.update=function(){a.create()},a.create()}}}),angular.module("socCharts").directive("columnchart",function(){return{templateUrl:_SocChartsConfig.path+"views/charts/bar.html",restrict:"A",scope:{columnchart:"=",options:"=",loading:"="},link:function(a,b){a.$watch("columnchart",function(){a.create()},!0),a.$watch("options",function(){a.update()},!0),a.data=a.columnchart,a.options=angular.extend({label:"label",stack:[{key:"v1",label:"Impressions",color:"#006699"},{key:"v2",label:"Comments",color:"#996600"},{key:"v3",label:"Likes",color:"#FF0099"}],height:400,legend:!0,axis:{x:{show:!0},y:{show:!1,label:"Traffic"}},sort:"desc"},a.options),$(window).on("resize",function(){a.update()}),a.create=function(){var c=d3.selectAll(b),d={top:20,right:0,bottom:30,left:0};a.options.axis.y.show&&(d.left+=40);var e=a.options.width||b.width();e=e-d.left-d.right;var f=a.options.height-d.top-d.bottom,g=d3.scale.ordinal().rangeRoundBands([0,e],.1),h=d3.scale.linear().rangeRound([f,0]),i=d3.svg.axis().scale(g).orient("bottom"),j=d3.svg.axis().scale(h).orient("left").tickFormat(d3.format(".2s"));c.selectAll(".chart").selectAll("svg").remove();var k=c.selectAll(".chart").append("svg").attr("width",e+d.left+d.right).attr("height",f+d.top+d.bottom).append("g").attr("transform","translate("+d.left+","+d.top+")"),l=[];a.columnchart.forEach(function(b,c){var d=0;l[c]={label:b.label},a.options.stack?a.options.stack.forEach(function(a){if(l[c].values=l[c].values||[],b[a.key]){var e={label:a.label,color:a.color};e.y0=d,e.y1=d+=+b[a.key],l[c].values.push(e)}}):l[c].values=[{label:l.label,color:l.color||"black",y0:0,y1:b.value}],l[c].total=l[c].values[l[c].values.length-1].y1}),a.options.sort&&l.sort(function(b,c){return"desc"==a.options.sort?c.total-b.total:b.total-c.total}),g.domain(l.map(function(a){return a.label})),h.domain([0,d3.max(l,function(a){return a.total})]),a.options.axis.x.show&&k.append("g").attr("class","x axis").attr("transform","translate(0,"+f+")").call(i),a.options.axis.y.show&&k.append("g").attr("class","y axis").call(j).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text(a.options.axis.y.label);var m=k.selectAll(".state").data(l).enter().append("g").attr("class","g").attr("transform",function(a){return"translate("+g(a.label)+",0)"});if(m.selectAll("rect").data(function(a){return a.values}).enter().append("rect").attr("width",g.rangeBand()).attr("y",function(a){return h(a.y1)}).attr("height",function(a){return h(a.y0)-h(a.y1)}).style("fill",function(a){return a.color}),a.options.legend){var n=k.selectAll(".legend").data(a.options.stack).enter().append("g").attr("class","legend").attr("transform",function(a,b){return"translate(-20,"+20*b+")"});n.append("rect").attr("x",e-18).attr("width",18).attr("height",18).style("fill",function(a){return a.color}),n.append("text").attr("x",e-24).attr("y",9).attr("dy",".35em").style("text-anchor","end").text(function(a){return a.label})}},a.update=function(){a.create()},a.create()}}}),angular.module("socCharts").directive("donutchart",function(){return{templateUrl:_SocChartsConfig.path+"views/charts/donut.html",restrict:"A",scope:{donutchart:"=",options:"=",loading:"="},link:function(a,b){console.log("THIS FAR"),a.data=a.donutchart,a.$watch("donutchart",function(){a.create()},!0),a.$watch("options",function(){a.update()},!0),$(window).on("resize",function(){a.update()}),a.options=angular.extend({stack:{key:"v1",label:"Impressions",colors:["#0000FF","#006699"]},legend:!0,width:void 0,arcs:{main:{inner:.9,outer:1},text:{inner:.6,outer:1}},label:!0,mouseover:function(){},mouseout:function(){},click:function(){}},a.options);var c=d3.scale.linear().range(a.options.stack.colors);return console.log(d3.extent(a.data,function(b){return b[a.options.stack.key]})),c.domain(d3.extent(a.data,function(b){return b[a.options.stack.key]})),a.create=function(){if(!a.data||0==a.data.length)return!1;a.width=a.options.width?a.options.width:b.width(),a.radius=a.options.height&&a.width>a.options.height?a.options.height/2:a.width/2,a.arc=d3.svg.arc().innerRadius(a.radius*a.options.arcs.main.inner).outerRadius(a.radius*a.options.arcs.main.outer),a.textArc=d3.svg.arc().innerRadius(a.radius*a.options.arcs.text.inner).outerRadius(a.radius*a.options.arcs.text.outer),a.pie=d3.layout.pie().value(function(b){return b[a.options.stack.key]}).sort(null);var d=d3.selectAll(b).selectAll(".chart");return d.selectAll("svg").remove(),a.vis=d.append("svg").data(a.data).attr("class","donut-chart").attr("width",a.options.width).attr("height",a.options.height||2*a.radius).append("svg:g").attr("transform","translate("+a.radius+","+a.radius+")"),a.options.label&&a.vis.append("svg:text").attr("class","chart-label").attr("text-anchor","middle").attr("transform","translate(0,"+Math.round(a.radius/10)+")").style("font-size",Math.round(a.radius/2.5)+"px").text(d3.sum(a.data,function(b){return b[a.options.stack.key]})),a.options.label&&a.vis.append("svg:text").attr("class","chart-sub-label").attr("text-anchor","middle").attr("transform","translate(0,"+.3*a.options.radius+")").style("font-size",Math.round(.15*a.options.radius)).text(a.options.stack.label),a.data.length&&(a.arcs=a.vis.selectAll("g.slice").data(a.pie(a.data)).enter().append("svg:g").attr("class","slice"),a.arcs.append("svg:path").attr("class",function(a){return a.data.label}).attr("fill",function(b){return b.data.color||c(b.data[a.options.stack.key])}).style("opacity",.7).attr("d",a.textArc).each(function(b){a._current=b}),a.arcs.append("svg:path").attr("class",function(a){return a.data.label}).attr("fill",function(b){return b.data.color||c(b.data[a.options.stack.key])}).style("opacity","1").attr("d",a.arc).each(function(b){a._current=b}).on("click",a.options.click||function(a){console.log(a)})),a.arcs.append("svg:text").attr("class","hover-show").attr("text-anchor","middle").attr("transform",function(b){var c=a.textArc.centroid(b);return"translate("+c+")"}).style("font-size",Math.round(a.radius/6.5)+"px").style("font-weight","bold").style("fill","white").text(function(b){return b.data[a.options.stack.key]}),a.arcs.append("svg:text").attr("class","small-text hover-show").attr("text-anchor","middle").attr("transform",function(b){var c=a.textArc.centroid(b);return c[1]=c[1]+.16*a.radius,"translate("+c+")"}).style("font-size",Math.round(a.radius/10)+"px").style("fill","white").text(function(a){return a.data.label}),this},a.update=function(){a.create()},a.create()}}});
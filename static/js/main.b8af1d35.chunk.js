(this.webpackJsonpffff=this.webpackJsonpffff||[]).push([[0],{1696:function(t,e){},1698:function(t,e){},1766:function(t,e,n){"use strict";n.r(e);var a=n(2),o=n.n(a),i=n(34),r=n.n(i),s=(n(341),n(114)),u=n(115),c=n(119),l=n(118),p=(n(342),n(343),n(344),n(1771)),h=(n(7),n(243),n(250),n(254),n(161),n(258),n(320)),f=n.n(h),d=n(199),m=n(1772),x=n(1770),v=(n(1708),n(1709),Object(m.a)(x.a),["100038","110003","110027","340001","481012","519915","110022","161035","003095","006218","006228","481012","006796","163407"]),g=function(t){Object(c.a)(n,t);var e=Object(l.a)(n);function n(t){var a;return Object(s.a)(this,n),(a=e.call(this,t)).state={option:{},style:{height:300*v.length+100+"px",width:"100%"}},a}return Object(u.a)(n,[{key:"fund_nav_url",value:function(t){return"https://raw.githubusercontent.com/imgaara/invest/master/fund/navs/"+t+".csv"}},{key:"fund_nav_stats_url",value:function(t){return"https://raw.githubusercontent.com/imgaara/invest/master/fund/anav_stats/"+t+".csv"}},{key:"build_fetch_list",value:function(){var t=this;return v.flatMap((function(e){return[fetch(t.fund_nav_url(e)),fetch(t.fund_nav_stats_url(e))]}))}},{key:"handle_response",value:function(t){for(var e=[],n=[],a=[],o=[],i=[],r=0;r<t.length;r+=2){console.log("handle response for idx: "+r);var s=r/2,u=Object(d.a)(t[r]).data.sort((function(t,e){return t[3]<e[3]?-1:1})),c=Object(d.a)(t[r+1]).data.sort((function(t,e){return t[0]<e[0]?-1:1})),l=u[0][2],p={};p.target=u.map((function(t){return[t[3],parseFloat(t[6])]})).filter((function(t){return!isNaN(t[1])})),p["50pct"]=c.map((function(t){return[t[0],parseFloat(t[1])]})),p["20pct"]=c.map((function(t){return[t[0],parseFloat(t[2])]})),p["80pct"]=c.map((function(t){return[t[0],parseFloat(t[3])]})),e.push({text:l+" - "+v[s],top:300*s+5+"px",left:"center"}),i.push({show:!0,top:300*s+30+"px",height:"200px",triggerEvent:!0}),n.push({type:"time",splitLine:{show:!0},gridIndex:s}),a.push({type:"value",splitLine:{show:!0},gridIndex:s,min:function(t){return.97*t.min}}),o.push({name:"target",type:"line",showSymbol:!1,hoverAnimation:!1,data:p.target,xAxisIndex:s,yAxisIndex:s}),o.push({name:"50pct",type:"line",showSymbol:!1,hoverAnimation:!1,data:p["50pct"],xAxisIndex:s,yAxisIndex:s}),o.push({name:"20pct",type:"line",showSymbol:!1,hoverAnimation:!1,data:p["20pct"],xAxisIndex:s,yAxisIndex:s}),o.push({name:"80pct",type:"line",showSymbol:!1,hoverAnimation:!1,data:p["80pct"],xAxisIndex:s,yAxisIndex:s})}return{title:e,tooltip:{trigger:"axis",axisPointer:{animation:!1}},grid:i,xAxis:n,yAxis:a,series:o}}},{key:"componentDidMount",value:function(){var t=this;Promise.all(this.build_fetch_list()).then((function(t){return Promise.all(t.map((function(t){return t.text()})))})).then((function(e){console.log(e),t.setState({isLoaded:!0,option:t.handle_response(e)})}),(function(e){t.setState({isLoaded:!0,error:e}),console.log(e)}))}},{key:"render",value:function(){return o.a.createElement(p.a.Grid,{className:"line_a"},o.a.createElement(f.a,{option:this.state.option,theme:"ThemeStyle",style:this.state.style}))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},336:function(t,e,n){t.exports=n(1766)},341:function(t,e,n){},342:function(t,e,n){t.exports=n.p+"static/media/logo.5d5d9eef.svg"},343:function(t,e,n){}},[[336,1,2]]]);
//# sourceMappingURL=main.b8af1d35.chunk.js.map
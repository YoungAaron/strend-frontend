webpackJsonp([1],{"1zmF":function(t,e){},"7Is9":function(t,e){},KjZB:function(t,e){},M3CJ:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),i={name:"SHead",data:function(){return{activeIndex:"1"}},methods:{handleSelect:function(t,e){console.log(t,e)}}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-row",{staticClass:"row-bg",attrs:{type:"flex"}},[e("el-col",{attrs:{span:1}},[e("div",{staticClass:"grid-content bg-purple"},[e("router-link",{attrs:{to:"/stock"}},[this._v("趋势")])],1)]),this._v(" "),e("el-col",{attrs:{span:1}},[e("div",{staticClass:"grid-content bg-purple"},[e("router-link",{attrs:{to:"/trader"}},[this._v("消息")])],1)]),this._v(" "),e("el-col",{attrs:{span:1}},[e("div",{staticClass:"grid-content bg-purple"},[e("router-link",{attrs:{to:"/cbond"}},[this._v("债券")])],1)]),this._v(" "),e("el-col",{attrs:{span:1}},[e("div",{staticClass:"grid-content bg-purple"},[e("router-link",{attrs:{to:"/forum"}},[this._v("讨论")])],1)])],1)},staticRenderFns:[]};var o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-row",[e("el-col",{attrs:{span:1}},[e("small",[this._v("STREND")])]),this._v(" "),e("el-col",{attrs:{span:2}},[e("small",[this._v("个人财经小站")])]),this._v(" "),e("el-col",{attrs:{span:4}},[e("small",[this._v("数据来源: tushare sina")])]),this._v(" "),e("el-col",{attrs:{span:3,offset:14}},[e("small",[this._v("找到我 QQ: 623522656")])])],1)},staticRenderFns:[]},r={name:"App",components:{"s-head":a("VU/8")(i,l,!1,function(t){a("fv6s")},null,null).exports,"s-foot":a("VU/8")(null,o,!1,null,null,null).exports}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("el-container",[e("el-header",{staticStyle:{height:"40px"}},[e("s-head")],1),this._v(" "),e("el-main",[e("router-view")],1),this._v(" "),e("el-footer",{staticStyle:{height:"40px"}},[e("s-foot")],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(r,s,!1,function(t){a("KjZB")},null,null).exports,d=a("/ocq"),u={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n    cbond\n")])},staticRenderFns:[]},p=a("VU/8")(null,u,!1,null,null,null).exports,h={data:function(){return{cachedata:{start:"20200101",end:"20200301"},apiList:{1:"/api/index/?select_opt=看市场&limit=100",2:"/api/index/?select_opt=中证一级行业&limit=100",3:"/api/index/?select_opt=市值对比&limit=100",4:"/api/index/?select_opt=4",5:"/api/index/?select_opt=5"},indexData:{indexCode:[{ts_code:"399006.SZ",name:"创业板指"},{ts_code:"000001.SH",name:"上证综指"},{ts_code:"399001.SZ",name:"深证成指"}],dateStart:"20200101",dateEnd:""},eOption:{title:{text:""},legend:{show:!0,x:"center",y:"bottom",padding:[5,0,0,0],itemGap:5},tooltip:{},xAxis:{data:[]},yAxis:{type:"value",name:"阶段涨跌百分比（%）",nameLocation:"center",nameGap:60,min:function(t){return(t.min-.1).toFixed(1)},max:function(t){return(t.max+.1).toFixed(1)},interval:.05},series:[]}}},created:function(){var t=this;this.axios.get("/api/index/?select_opt=看市场&limit=100").then(function(e){t.indexData.indexCode=e.data.results,console.log(e.data)}).catch(function(t){console.log(t)})},computed:{indexApi:function(){var t=this.indexData.dateStart;return this.indexData.indexCode.map(function(e){return"/api/kdata/index/"+e.ts_code+"/"+t})}},watch:{indexData:{handler:function(){this.getKdata()},deep:!0},eOption:{handler:function(){this.drawEchart()},deep:!0}},methods:{handleSelect:function(t,e){this.updateIndexData(this.apiList[t])},dateSubmit:function(){this.indexData.dateStart=this.cachedata.start,this.indexData.dateEnd=this.cachedata.end},updateIndexData:function(t){var e=this;this.indexData.indexCode=[],this.axios.get(t).then(function(t){console.log(t.data.results),e.indexData.indexCode=e.indexData.indexCode.concat(t.data.results)}).catch(function(t){console.log(t)})},getKdata:function(){var t=this;console.log(this.indexApi),this.eOption.series=[];var e=function(e){t.axios.get(t.indexApi[e]).then(function(a){var n=t.indexData.indexCode[e].name,i=a.data.close,l=i[0];i=i.map(function(t){return t/l}),t.eOption.series.push({name:n,type:"line",data:i}),t.eOption.xAxis.data=a.data.date}).catch(function(t){return console.log(t)})};for(var a in this.indexApi)e(a)},drawEchart:function(){a("XLwt").init(document.getElementById("echart")).setOption(this.eOption)}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[a("el-col",{attrs:{span:3}},[a("h3",[t._v("选择视角")]),t._v(" "),a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"1",mode:"vertical","active-text-color":"#409EFF"},on:{select:t.handleSelect}},[a("el-menu-item",{attrs:{index:"1"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("看市场")])]),t._v(" "),a("el-menu-item",{attrs:{index:"2"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("看行业")])]),t._v(" "),a("el-menu-item",{attrs:{index:"3"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("看市值")])]),t._v(" "),a("el-menu-item",{attrs:{index:"4"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("看概念")])]),t._v(" "),a("el-menu-item",{attrs:{index:"5"}},[a("span",{attrs:{slot:"title"},slot:"title"},[t._v("自定义")])])],1)],1),t._v(" "),a("el-col",{attrs:{span:17}},[a("div",{staticStyle:{width:"100%",height:"800px"},attrs:{id:"echart"}})]),t._v(" "),a("el-col",{attrs:{span:4}},[a("h3",[t._v("参数设置")]),t._v(" "),a("el-form",{attrs:{inline:!0,model:t.cachedata}},[a("el-form-item",{attrs:{label:"开始时间"}},[a("el-input",{attrs:{placeholder:"cachedata.start"},model:{value:t.cachedata.start,callback:function(e){t.$set(t.cachedata,"start",e)},expression:"cachedata.start"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"结束时间"}},[a("el-input",{attrs:{placeholder:"cachedata.end"},model:{value:t.cachedata.end,callback:function(e){t.$set(t.cachedata,"end",e)},expression:"cachedata.end"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.dateSubmit}},[t._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]};var v=a("VU/8")(h,m,!1,function(t){a("7Is9")},"data-v-2eeb80ca",null).exports,f={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n    forum\n")])},staticRenderFns:[]},_=a("VU/8")(null,f,!1,null,null,null).exports,x={created:function(){var t=this;this.axios.get("/api/repurchase").then(function(e){t.repurchase=e.data.results,t.next_page=e.data.next.replace("http://148.70.239.118:8088","")}).catch(function(t){console.log(t)})},data:function(){return{auto_load:!0,loading:!1,next_page:"",repurchase:[]}},computed:{noMore:function(){return!this.next_page}},methods:{load:function(){var t=this;this.loading=!0,this.axios.get(this.next_page).then(function(e){t.repurchase=t.repurchase.concat(e.data.results),t.next_page=e.data.next.replace("http://148.70.239.118:8088",""),console.log(2)}).catch(function(t){console.log(t)}),this.loading=!1}}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[a("el-col",{attrs:{span:3}},[a("h3",[t._v("消息类型")]),t._v(" "),a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"1",mode:"vertical","active-text-color":"#409EFF"}},[a("el-menu-item",{attrs:{index:"1"}},[a("router-link",{attrs:{to:{name:"overweight"}}},[t._v("增持减持")])],1),t._v(" "),a("el-menu-item",{attrs:{index:"2"}},[a("router-link",{attrs:{to:{name:"buyback"}}},[t._v("公司回购")])],1),t._v(" "),a("el-menu-item",{attrs:{index:"3"}},[a("router-link",{attrs:{to:{name:"employee"}}},[t._v("员工持股")])],1),t._v(" "),a("el-menu-item",{attrs:{index:"4"}},[a("router-link",{attrs:{to:{name:"finance"}}},[t._v("业绩变动")])],1),t._v(" "),a("el-menu-item",{attrs:{index:"5"}},[a("router-link",{attrs:{to:{name:"fund"}}},[t._v("基金分析")])],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:21}},[a("router-view")],1)],1)},staticRenderFns:[]};var g=a("VU/8")(x,b,!1,function(t){a("M3CJ")},"data-v-f28b0656",null).exports,w={data:function(){return{tableData:[],date:""}},created:function(){var t=this,e=new Date;e=e.toJSON().substr(0,10).replace(/[-T]/g,""),this.axios.get("/api/repurchase/?limit=1000&ann_date="+e).then(function(e){t.tableData=e.data.results}).catch(function(t){console.log(t)})},watch:{date:{handler:function(){var t=this,e=this.date.toJSON().substr(0,10).replace(/[-T]/g,"");this.axios.get("/api/repurchase/?limit=1000&ann_date="+e).then(function(e){var a=e.data.results;for(var n in a)a[n].amount=a[n].amount/1e8;t.tableData=a}).catch(function(t){console.log(t)})}}}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-col",{attrs:{span:2,offset:1}},[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"}},[t._v("请选择日期")])],1),t._v(" "),a("el-col",{attrs:{span:5,offset:1}},[a("el-date-picker",{attrs:{type:"date",width:"100%",placeholder:"选择日期"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:22,offset:1}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"ts_code",label:"公司代码","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ann_date",label:"公告日期","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"exp_date",label:"过期日期",sortable:"","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"proc",label:"进度","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"vol",label:"回购数量","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"回购金额（亿）","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"high_limit",label:"最高价","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"low_limit",label:"最低价","min-width":"100"}})],1)],1)],1)],1)},staticRenderFns:[]};var k=a("VU/8")(w,y,!1,function(t){a("W7Y+")},"data-v-4ec5dcf7",null).exports,S={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-row",[e("div",[this._v("员工持股")])])},staticRenderFns:[]},D=a("VU/8")(null,S,!1,null,null,null).exports,E={data:function(){return{industrys:["全国地产","百货","啤酒","旅游服务","种植业","医疗保健","仓储物流","多元金融","染料涂料","工程机械","半导体","摩托车","火力发电","公路","煤炭开采","轻工机械","建筑工程","软件服务","房产服务","电气设备","互联网","电器连锁","汽车配件","化纤","小金属","装修装饰","机械基件","机场","IT设备","矿物制品","港口","服饰","铜","机床制造","医药商业","其他建材","钢加工","家居用品","商贸代理","区域地产","元器件","红黄酒","石油开采","白酒","纺织","乳制品","路桥","其他商业","公共交通","焦炭加工","船舶","化学制药","石油贸易","渔业","超市连锁","商品城","酒店餐饮","陶瓷","特种钢","林业","环境保护","汽车整车","日用化工","塑料","专用机械","饲料","电器仪表","化工机械","黄金","化工原料","园区开发","水泥","新型电力","保险","运输设备","航空","食品","广告包装","综合类","证券","通信设备","旅游景点","玻璃","水务","中成药","批发业","铝","农用机械","空运","生物制药","电信运营","文教休闲","橡胶","普钢","汽车服务","水力发电","银行","造纸","铅锌","家用电器","石油加工","农业综合","水运","影视音像","铁路","纺织机械","供气供热","软饮料","农药化肥","出版业"],companys:[],cachedata:{start:"20200101",end:"20200301"},eOption:{title:{text:""},legend:{show:!0,x:"center",y:"bottom",padding:[5,0,0,0],itemGap:5},tooltip:{},xAxis:{data:[]},yAxis:{type:"value",name:"阶段涨跌百分比（%）",nameLocation:"center",nameGap:60,min:function(t){return(t.min-.1).toFixed(1)},max:function(t){return(t.max+.1).toFixed(1)},interval:.05},series:[]}}},watch:{companys:{handler:function(){this.getKdata()},deep:!0},eOption:{handler:function(){this.drawEchart()},deep:!0}},methods:{handleSelect:function(t){var e=this;console.log(t),this.axios.get("/api/stock/?limit=1000&industry="+t).then(function(t){console.log(t.data.results),e.companys=t.data.results}).catch(function(t){console.log(t)})},getKdata:function(){var t=this;console.log(this.indexApi),this.eOption.series=[];var e=function(e){t.axios.get(t.indexApi[e]).then(function(a){var n=t.indexData.indexCode[e].name,i=a.data.close,l=i[0];i=i.map(function(t){return t/l}),t.eOption.series.push({name:n,type:"line",data:i}),t.eOption.xAxis.data=a.data.date}).catch(function(t){return console.log(t)})};for(var a in this.indexApi)e(a)},drawEchart:function(){a("XLwt").init(document.getElementById("echart")).setOption(this.eOption)}}},F={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[a("el-col",{attrs:{span:3}},[a("h3",[t._v("选择行业")]),t._v(" "),a("ul",t._l(t.industrys,function(e){return a("li",{key:e.id,on:{click:function(a){return t.handleSelect(e)}}},[t._v("\n            "+t._s(e)+"\n          ")])}),0)]),t._v(" "),a("el-col",{attrs:{span:17}},[a("div",{staticStyle:{width:"100%",height:"800px"},attrs:{id:"echart"}})])],1)},staticRenderFns:[]};var C=a("VU/8")(E,F,!1,function(t){a("gzCY")},"data-v-4d2d201a",null).exports,O={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-row",[e("div",[this._v("基金分析")])])},staticRenderFns:[]},A=a("VU/8")(null,O,!1,null,null,null).exports,$={data:function(){return{tableData:[],date:""}},created:function(){var t=this,e=new Date;e=e.toJSON().substr(0,10).replace(/[-T]/g,""),this.axios.get("/api/holdertrade/?limit=1000&ann_date="+e).then(function(e){console.log(e.data.results),t.tableData=e.data.results}).catch(function(t){console.log(t)})},watch:{date:{handler:function(){var t=this,e=this.date.toJSON().substr(0,10).replace(/[-T]/g,"");this.axios.get("/api/holdertrade/?limit=1000&ann_date="+e).then(function(e){var a=e.data.results;for(var n in a)"IN"==a[n].in_de?a[n].in_de="增持":a[n].in_de="减持",a[n].change_money=a[n].change_vol*a[n].avg_price/1e8,a[n].change_money=a[n].change_money.toFixed(4);t.tableData=e.data.results}).catch(function(t){console.log(t)})}}}},R={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-col",{attrs:{span:2,offset:1}},[a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"}},[t._v("请选择日期")])],1),t._v(" "),a("el-col",{attrs:{span:5,offset:1}},[a("el-date-picker",{attrs:{type:"date",width:"100%",placeholder:"选择日期"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:22,offset:1}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"ts_code",label:"公司代码","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"holder_name",label:"公司名称","min-width":"300"}}),t._v(" "),a("el-table-column",{attrs:{prop:"in_de",label:"增/减持",sortable:"","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"change_vol",label:"计划数量","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"avg_price",label:"平均价格","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"change_money",label:"计划金额（亿）","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"begin_date",label:"开始日期","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"close_date",label:"结束日期","min-width":"100"}})],1)],1)],1)],1)},staticRenderFns:[]};var U=a("VU/8")($,R,!1,function(t){a("dph4")},"data-v-02aede6b",null).exports;n.default.use(d.a);var V=new d.a({routes:[{path:"/cbond",name:"cbond",component:p},{path:"/stock",name:"stock",component:v},{path:"/forum",name:"forum",component:_},{path:"/trader",name:"trader",component:g,children:[{path:"overweight",name:"overweight",component:U},{path:"buyback",name:"buyback",component:k},{path:"employee",name:"employee",component:D},{path:"finance",name:"finance",component:C},{path:"fund",name:"fund",component:A}]}]}),I=a("zL8q"),L=a.n(I),N=(a("1zmF"),a("mtWM")),J=a.n(N),T=a("Rf8U"),K=a.n(T),z=a("XLwt"),M=a.n(z);n.default.config.productionTip=!1,n.default.use(L.a),n.default.use(K.a,J.a),n.default.prototype.$echarts=M.a,new n.default({el:"#app",router:V,components:{App:c},template:"<App/>"})},"W7Y+":function(t,e){},dph4:function(t,e){},fv6s:function(t,e){},gzCY:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.4331b3ed3dfef94daea5.js.map
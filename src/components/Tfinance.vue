<template>
    <el-row>
        <el-col :span="3">
            <h3>选择行业</h3>
            <ul>
              <li v-for='ids in industrys' :key='ids.id' @click="handleSelect(ids)">
                {{ ids }}
              </li>
            </ul>
        </el-col>
        <el-col :span="17">
            <div id='echart' style="width:100%;height:800px;"></div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data: function() {
        return {
            // 行业列表
            industrys: [
                '全国地产',
                '百货',
                '啤酒',
                '旅游服务',
                '种植业',
                '医疗保健',
                '仓储物流',
                '多元金融',
                '染料涂料',
                '工程机械',
                '半导体',
                '摩托车',
                '火力发电',
                '公路',
                '煤炭开采',
                '轻工机械',
                '建筑工程',
                '软件服务',
                '房产服务',
                '电气设备',
                '互联网',
                '电器连锁',
                '汽车配件',
                '化纤',
                '小金属',
                '装修装饰',
                '机械基件',
                '机场',
                'IT设备',
                '矿物制品',
                '港口',
                '服饰',
                '铜',
                '机床制造',
                '医药商业',
                '其他建材',
                '钢加工',
                '家居用品',
                '商贸代理',
                '区域地产',
                '元器件',
                '红黄酒',
                '石油开采',
                '白酒',
                '纺织',
                '乳制品',
                '路桥',
                '其他商业',
                '公共交通',
                '焦炭加工',
                '船舶',
                '化学制药',
                '石油贸易',
                '渔业',
                '超市连锁',
                '商品城',
                '酒店餐饮',
                '陶瓷',
                '特种钢',
                '林业',
                '环境保护',
                '汽车整车',
                '日用化工',
                '塑料',
                '专用机械',
                '饲料',
                '电器仪表',
                '化工机械',
                '黄金',
                '化工原料',
                '园区开发',
                '水泥',
                '新型电力',
                '保险',
                '运输设备',
                '航空',
                '食品',
                '广告包装',
                '综合类',
                '证券',
                '通信设备',
                '旅游景点',
                '玻璃',
                '水务',
                '中成药',
                '批发业',
                '铝',
                '农用机械',
                '空运',
                '生物制药',
                '电信运营',
                '文教休闲',
                '橡胶',
                '普钢',
                '汽车服务',
                '水力发电',
                '银行',
                '造纸',
                '铅锌',
                '家用电器',
                '石油加工',
                '农业综合',
                '水运',
                '影视音像',
                '铁路',
                '纺织机械',
                '供气供热',
                '软饮料',
                '农药化肥',
                '出版业',
            ],
            // 业内公司
            companys: [],
            // 临时数据
            cachedata: {
                'start':'20200101',
                'end':'20200301',
            },
            // eChart数据源
            eOption: {
                title: {text: ''},
                legend: {
                    show: true,
                    x:'center',
                    y:'bottom',
                    padding: [5,0,0,0],
                    itemGap: 5
                },
                tooltip: {},
                xAxis: {
                    data: []
                },
                yAxis: {
                    type: 'value',
                    name: '阶段涨跌百分比（%）',
                    nameLocation: 'center',
                    nameGap: 60,
                    min: function (value) {return (value.min - 1).toFixed(0)},
                    max: function (value) {return (value.max + 1).toFixed(0)},
                    interval: 1
                },
                series: []
            },
        }
    },
    watch: {
        companys: {
            handler: function() {this.getIncome()},
            deep: true
        },
        eOption: {
            handler: function() {this.drawEchart()},
            deep: true
        }
    },
    methods: {
        handleSelect(key) {
            this.axios
                .get('/api/stock/?limit=1000&industry='+key)
                .then((response) => {
                    console.log(response.data.results);
                    this.companys = response.data.results;
                })
                .catch((error) => {console.log(error);});
        },
        getIncome: function() {
            // 获得财务数据
            this.eOption.series=[];
            for (let a in this.companys) {
                this.axios
                    .get('/api/income/?limit=40&ts_code='+this.companys[a].ts_code)
                    .then(response => {
                        //console.log(response);
                        let income = response.data.results;
                        let tscode = response.data.results[0].ts_code;
                        let dates = income.map(k => k.end_date);
                        income = income.sort(function(a, b){return b.end_date - a.end_date});
                        income = income.map(k => k.total_revenue);
                        let base = income[0];
                        income = income.map(k => k/base);
                        this.eOption.series.push({'name': tscode, 'type':'line', 'data': income});
                        this.eOption.xAxis.data = dates;
                    })
                    .catch(error => console.log(error))
            }
        },
        drawEchart () {
            // 图像展示
            var echarts = require('echarts');
            var myChart = echarts.init(document.getElementById('echart'));
            myChart.setOption(this.eOption);
        },
    }
}
</script>

<style scoped>
  .el-row {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: left;
    line-height: 40px;
    padding: 0px;
    margin-bottom: 0px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
  }
</style>
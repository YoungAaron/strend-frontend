<template>
    <el-row>
        <el-col :span="3">
            <h3>选择行业</h3>
            <ul>
              <li 
                style="list-style-type:none;"
                v-for='ids in industrys' 
                :key='ids.id' 
                @click="handleSelect(ids)">
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
                '全国地产', '百货', '啤酒', '旅游服务', '种植业',
                '医疗保健', '仓储物流', '多元金融', '染料涂料', '工程机械',
                '半导体', '摩托车', '火力发电', '公路', '煤炭开采',
                '轻工机械', '建筑工程', '软件服务', '房产服务', '电气设备',
                '互联网', '电器连锁', '汽车配件', '化纤', '小金属',
                '装修装饰', '机械基件', '机场', 'IT设备', '矿物制品',
                '港口', '服饰', '铜', '机床制造', '医药商业',
                '其他建材', '钢加工', '家居用品', '商贸代理', '区域地产',
                '元器件', '红黄酒', '石油开采', '白酒', '纺织',
                '乳制品', '路桥', '其他商业', '公共交通', '焦炭加工',
                '船舶', '化学制药', '石油贸易', '渔业', '超市连锁',
                '商品城', '酒店餐饮', '陶瓷', '特种钢', '林业',
                '环境保护', '汽车整车', '日用化工', '塑料', '专用机械',
                '饲料', '电器仪表', '化工机械', '黄金', '化工原料',
                '园区开发', '水泥', '新型电力', '保险', '运输设备',
                '航空', '食品', '广告包装', '综合类', '证券',
                '通信设备', '旅游景点', '玻璃', '水务', '中成药',
                '批发业', '铝', '农用机械', '空运', '生物制药',
                '电信运营', '文教休闲', '橡胶', '普钢', '汽车服务',
                '水力发电', '银行', '造纸', '铅锌', '家用电器',
                '石油加工', '农业综合', '水运', '影视音像', '铁路',
                '纺织机械', '供气供热', '软饮料', '农药化肥', '出版业'
            ],
            // 业内公司
            companys: [],
            // 报表时间
            cachedata: {
                'one':'0331',
                'two':'0630',
                'thd':'0930',
                'for':'1231'
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
                    name: '季报营收涨跌比例（%）',
                    nameLocation: 'center',
                    nameGap: 60,
                    min: -2,
                    max: 5,
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
            handler: function() {
                // console.log(this.companys.length, this.eOption.series.length);
                if (this.companys.length == this.eOption.series.length) {
                    this.drawEchart()
                }
            },
            deep: true
        }
    },
    methods: {
        handleSelect(key) {
            this.axios
                .get('/api/stock/?limit=1000&industry='+key)
                .then((response) => {
                    // console.log(response.data.results);
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
                        // console.log(response.data.results);
                        let tscode = this.companys[a].ts_code;
                        let income = response.data.results;
                        let dates = ['20101231', '20111231', '20121231', '20131231', '20141231', '20151231', '20161231', '20171231', '20181231'];
                        let tdata = [];
                        for (let d in dates) {
                            let tcom = income.find(com => com.end_date===dates[d]);
                            if (tcom) {
                                tdata.push(tcom.total_revenue)
                            } else {
                                tdata.push(0)
                            } 
                        };
                        let base = tdata[0];
                        tdata = tdata.map(k => k/base);
                        this.eOption.series.push({'name': tscode, 'type':'line', 'data': tdata});
                        this.eOption.xAxis.data = dates;
                    })
                    .catch(error => console.log(error))
            }
        },
        drawEchart () {
            // 图像展示
            let echarts = require('echarts');
            let myChart = echarts.init(document.getElementById('echart'));
            myChart.setOption(this.eOption, true);
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
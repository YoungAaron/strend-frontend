<template>
    <div>
        <div id='echart' style="width:600px;height:400px;"></div>
        <p v-if="eOption">{{eOption}}</p>
        <p v-if="indexData">{{indexData}}</p>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            // 预设数据
            indexData: {
                indexCode: [
                    {"ts_code": "399006.SZ", "name": "创业板指"},
                    {"ts_code": "000001.SH", "name": "上证综指"},
                    {"ts_code": "399001.SZ", "name": "深证成指"}],
                dateStart: '20200102'
            },
            // eChart数据源
            eOption: {
                title: {text: '行情对比'},
                tooltip: {},
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: []
            },
        }
    },
    created: function() {
        // 获取指数列表
        this.axios
          .get('/api/index/?fun_one=1')
          .then((response) => {this.indexData.indexCode = response.data.results; console.log(response.data.results)})
          .catch((error) => {console.log(error);});
    },
    computed: {
        indexApi: function(){
            // 拼接网易财经API 
            // return this.indexCode.map(idx => '/126/data/hs/klinederc/day/times/1'+idx['ts_code'].substr(0,6).toLowerCase()+'.json')
            return this.indexData.indexCode.map(idx => '/126/data/hs/kline/day/times/1399001.json')
        },
    },
    watch: {
        indexData: {
            handler: function() {this.getKdata()},
            deep: true
        },
        eOption: {
            handler: function() { this.drawEchart()},
            deep: true
        }
    },
    methods: {
        getKdata: function() {
            console.log('getKdata')
            // 处理网易财经数据
            for (let a in this.indexApi) {
                this.axios
                    .get(this.indexApi[a])
                    .then(response => {
                        let idx = response.data.times.indexOf(this.indexData.dateStart);
                        let times = response.data.times.slice(idx,);
                        let closes = response.data.closes.slice(idx,);
                        this.eOption.series.push({name:'', type:'line', data:closes});
                        this.eOption.xAxis.data = times;
                    })
                    .catch(error => console.log(error))
            }
        },
        drawEchart () {
            console.log('drawEchart')
            // 图像展示
            var echarts = require('echarts');
            var myChart = echarts.init(document.getElementById('echart'));
            myChart.setOption(this.eOption);
        },
    }
}
</script>
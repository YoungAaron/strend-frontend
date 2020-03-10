<template>
    <div>
        <div id='echart' style="width:1000px;height:700px;"></div>
        <p v-if="false">{{eOption}}</p>
        <p v-if="false">{{indexData}}</p>
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
                dateStart: '20180101'
            },
            // 行业指数列表
            indexList: '',
            // eChart数据源
            eOption: {
                title: {text: '阶段指数行情对比'},
                legend: {
                    show: true,
                },
                tooltip: {},
                xAxis: {
                    data: []
                },
                yAxis: {
                    min: 0,
                    max: 2.0,
                    interval: 0.05
                },
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
            // 拼接API
            let start = this.indexData.dateStart
            return this.indexData.indexCode.map(idx => '/api/kdata/index/'+idx.ts_code+'/'+start)
            //return this.indexData.indexCode.map(idx => '/126/data/hs/kline/day/times/1399001.json')
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
                        let name = this.indexData.indexCode[a].name;
                        let kdata = response.data.close;
                        let base = kdata[0];
                        kdata = kdata.map(k => k/base)
                        this.eOption.series.push({'name': name, 'type':'line', 'data': kdata});
                        this.eOption.xAxis.data = response.data.date;
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
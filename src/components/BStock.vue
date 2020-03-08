<template>
    <div>
        <div id='echart' style="width:600px;height:400px;"></div>
        <p>{{indexUrl}}</p>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            indexList: [
              {"ts_code": "399006.SZ", "name": "创业板指"},
              {"ts_code": "000001.SH", "name": "上证综指"},
              {"ts_code": "399001.SZ", "name": "深证成指"}],
            dateStart: '20200101'
        }
    },
    created: function() {
        this.axios
          .get('/api/index/?fun_one=1')
          .then((response) => {this.indexList = response.data.results})
          .catch((error) => {console.log(error);});
    },
    mounted: function() {
        this.drawEchart();
    },
    computed: {
        indexUrl: function(){
            // 拼接网易财经API
            return this.indexList.map(idx => '/126/data/hs/klinederc/day/times/1'+idx['ts_code'].substr(0,6).toLowerCase()+'.json')
        },
        kdata: function(){
            // 处理网易财经数据
            return this.indexUrl.map(uri => {
                console.log(uri);
                this.axios
                  .get(uri)
                  .then(response => {
                    var idx = response.times.indexOf(this.dateStart);
                    return {'times': response.times.slice(idx,), 'closes':response.closes.slice(idx,)}})
                  .catch(error => console.log(error))
            })
        }
    },
    methods: {
        drawEchart () {
            var echarts = require('echarts');
            var myChart = echarts.init(document.getElementById('echart'));
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
}
</script>
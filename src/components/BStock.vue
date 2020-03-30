<template>
    <el-row>
        <el-col :span="3">
            <h3>选择视角</h3>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              mode="vertical" 
              @select="handleSelect"
              active-text-color="#409EFF">
              <el-menu-item index="1">
                <span slot="title">看市场</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">看行业</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span slot="title">看市值</span>
              </el-menu-item>
              <el-menu-item index="4">
                <span slot="title">看概念</span>
              </el-menu-item>
              <el-menu-item index="5">
                <span slot="title">自定义</span>
              </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="17">
            <div id='echart' style="width:100%;height:800px;"></div>
        </el-col>
        <el-col :span="4">
            <h3>参数设置</h3>
            <el-form :inline="true" :model="cachedata">
                <el-form-item label="开始时间">
                    <el-input v-model="cachedata.start" placeholder="cachedata.start"></el-input>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-input v-model="cachedata.end" placeholder="cachedata.end"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dateSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data: function() {
        return {
            // 临时数据
            cachedata: {
                'start':'20200101',
                'end':'20200301',
            },
            // API列表
            apiList: {
                '1':'/api/index/?select_opt=看市场&limit=100',
                '2':'/api/index/?select_opt=中证一级行业&limit=100',
                '3':'/api/index/?select_opt=市值对比&limit=100',
                '4':'/api/index/?select_opt=4',
                '5':'/api/index/?select_opt=5',
            },
            // 预设数据
            indexData: {
                indexCode: [
                    {"ts_code": "399006.SZ", "name": "创业板指"},
                    {"ts_code": "000001.SH", "name": "上证综指"},
                    {"ts_code": "399001.SZ", "name": "深证成指"}],
                dateStart: '20200101',
                dateEnd: ''
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
                    min: function (value) {return (value.min - 0.1).toFixed(1)},
                    max: function (value) {return (value.max + 0.1).toFixed(1)},
                    interval: 0.05
                },
                series: []
            },
        }
    },
    created: function() {
        // 获取指数列表
        this.axios
          .get('/api/index/?select_opt=看市场&limit=100')
          .then((response) => {this.indexData.indexCode = response.data.results; console.log(response.data)})
          .catch((error) => {console.log(error);});
    },
    computed: {
        indexApi: function(){
            // 拼接API
            let start = this.indexData.dateStart;
            return this.indexData.indexCode.map(idx => '/api/kdata/index/'+idx.ts_code+'/'+start);
            //return this.indexData.indexCode.map(idx => '/126/data/hs/kline/day/times/1399001.json')
        },
    },
    watch: {
        indexData: {
            handler: function() {this.getKdata()},
            deep: true
        },
        eOption: {
            handler: function() { 
                if (this.indexApi.length == this.eOption.series.length) {this.drawEchart()}},
            deep: true
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            this.updateIndexData(this.apiList[key]);
        },
        dateSubmit() {
            this.indexData.dateStart = this.cachedata.start;
            this.indexData.dateEnd = this.cachedata.end;
        },
        updateIndexData(api) {
            // 获取指数列表
            this.indexData.indexCode = []
            this.axios
                .get(api)
                .then((response) => {
                    console.log(response.data.results);
                    this.indexData.indexCode = this.indexData.indexCode.concat(response.data.results);
                })
                .catch((error) => {console.log(error);});
        },
        getKdata: function() {
            // 处理网易财经数据
            console.log(this.indexApi);
            this.eOption.series=[];
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
            // 图像展示
            var echarts = require('echarts');
            var myChart = echarts.init(document.getElementById('echart'));
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
<template>
    <div>
    <el-row>
        <el-col :span="2" :offset="1">
            <el-button type="primary" style='width:100%'>请选择日期</el-button>
        </el-col>
        <el-col :span="5" :offset="1">
            <el-date-picker
                v-model="date"
                type="date"
                width='100%'
                placeholder="选择日期">
            </el-date-picker>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="22" :offset="1">
            <el-table
              :data="tableData"
              style="width: 100%"
              border>
              <el-table-column
                prop="ts_code"
                label="公司代码"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="holder_name"
                label="公司名称"
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="in_de"
                label="增/减持"
                sortable
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="change_vol"
                label="计划数量"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="avg_price"
                label="平均价格"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="change_money"
                label="计划金额（亿）"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="begin_date"
                label="开始日期"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="close_date"
                label="结束日期"
                min-width="100">
              </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            date : ''
        }
    },
    created () {
        let date = new Date();
        date = date.toJSON().substr(0, 10).replace(/[-T]/g, '');
        this.axios
            .get('/api/holdertrade/?limit=1000&ann_date='+date)
            .then(response => {
                console.log(response.data.results);
                this.tableData = response.data.results;})
            .catch((error) => {console.log(error);});
    },
    watch: {
        date: {
            handler: function() {
                let date = this.date.toJSON().substr(0, 10).replace(/[-T]/g, '');
                this.axios
                    .get('/api/holdertrade/?limit=1000&ann_date='+date)
                    .then(response => {
                        let results = response.data.results;
                        for (let line in results) {
                            if (results[line].in_de == 'IN') {
                                results[line].in_de = '增持'
                            } else {
                                results[line].in_de = '减持'
                            };
                            results[line].change_money = results[line].change_vol * results[line].avg_price / 100000000;
                            results[line].change_money = results[line].change_money.toFixed(4)
                        } 
                        this.tableData = response.data.results;})
                    .catch((error) => {console.log(error);});
            },
        },
    },
}
</script>

<style scoped>
  .el-row {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: left;
    line-height: 30px;
    padding: 0px;
    margin-bottom: 0px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    line-height: 30px;
  }
</style>
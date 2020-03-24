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
              style="width:100%"
              border>
              <el-table-column
                prop="ts_code"
                label="公司代码"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="ann_date"
                label="公告日期"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="exp_date"
                label="过期日期"
                sortable
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="proc"
                label="进度"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="vol"
                label="回购数量"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="回购金额（亿）"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="high_limit"
                label="最高价"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="low_limit"
                label="最低价"
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
            .get('/api/repurchase/?limit=1000&ann_date='+date)
            .then(response => {
                this.tableData = response.data.results;})
            .catch((error) => {console.log(error);});
    },
    watch: {
        date: {
            handler: function() {
                let date = this.date.toJSON().substr(0, 10).replace(/[-T]/g, '');
                this.axios
                    .get('/api/repurchase/?limit=1000&ann_date='+date)
                    .then(response => {
                        let results = response.data.results;
                        for (let line in results) { results[line].amount = results[line].amount / 100000000};
                        this.tableData = results;})
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
<template>
    <el-row>
        <el-col :span="20" :offset="2">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="ts_code"
                label="公司代码"
                width="100">
              </el-table-column>
              <el-table-column
                prop="holder_name"
                label="公司名称"
                width="500">
              </el-table-column>
              <el-table-column
                prop="in_de"
                label="增/减持"
                width="180">
              </el-table-column>
              <el-table-column
                prop="change_vol"
                label="计划数量"
                width="180">
              </el-table-column>
              <el-table-column
                prop="avg_price"
                label="平均价格"
                width="180">
              </el-table-column>
              <el-table-column
                prop="begin_date"
                label="开始日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="close_date"
                label="结束日期"
                width="180">
              </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
        }
    },
    created () {
        let date = new Date();
        date = date.toJSON().substr(0, 10).replace(/[-T]/g, '');
        this.axios
            .get('/api/holdertrade/?limit=1000&ann_date='+date)
            .then(response => {
                console.log(response.data.results);
                this.tableData = response.data.results;
            })
            .catch((error) => {console.log(error);});
    },
}
</script>
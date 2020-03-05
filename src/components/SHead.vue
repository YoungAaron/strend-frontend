<template>
    <el-row type="flex" class="row-bg">
        <el-col :span="2">
            <div class="grid-content bg-purple"><router-link to="/stock">11111111</router-link></div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple"><router-link to="/cbond">22222222</router-link></div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple"><router-link to="/trader">33333333</router-link></div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple"><router-link to="/forum">44444444</router-link></div>
        </el-col>
    </el-row>
</template>


<script>
export default {
    name: 'SHead',
    data: function() {
        return {
            activeIndex: '1',
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
}
</script>


<style>
  .el-row {
    margin-bottom: 0px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: rgb(81, 120, 170);
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 0px 0;
    background-color: rgb(81, 120, 170);
  }
  a {
    text-decoration: none;
    color:rgb(255, 255, 255);
  }
  .router-link-active {
    text-decoration: none;
  }
</style>
<template>
  <div id="app">
    <el-container>
      <el-header>
        <s-head></s-head>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <s-foot></s-foot>
      </el-footer>
    </el-container>
  </div>
</template> 

<script>
import SHead from './components/SHead.vue'
import SFoot from './components/SFoot.vue'

export default {
  name: 'App',
  components: {
    's-head': SHead,
    's-foot': SFoot
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: rgb(81, 120, 170);
    color: rgb(209, 201, 201);
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: rgb(22, 2, 2);
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

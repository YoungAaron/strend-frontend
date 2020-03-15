<template>
  <div id="app">
    <el-container>
      <el-header style="height:40px">
        <s-head></s-head>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer style="height:40px">
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
  .el-header {
    background-color: rgb(116, 156, 209);
    color: rgb(116, 156, 209);
    text-align: center;
    line-height: 40px;
  }
  
  .el-footer {
    background-color: rgb(116, 156, 209);
    color: rgb(17, 1, 1);
    text-align: center;
    line-height: 40px;
  }
  
  .el-aside {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: left;
    line-height: 60px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

  html, body, #app, .el-container {
    /* 充满全屏 */
    padding: 0px;
    margin: 0px;
    height: 100%;
  }
</style>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

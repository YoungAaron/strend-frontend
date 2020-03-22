<template>
    <el-row>
        <el-col :span="3">
            <h3>消息类型</h3>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              mode="vertical" 
              active-text-color="#409EFF">
              <el-menu-item index="1">
                <router-link :to="{name: 'overweight'}">增持减持</router-link>
              </el-menu-item>
              <el-menu-item index="2">
                <router-link :to="{name: 'buyback'}">公司回购</router-link>
              </el-menu-item>
              <el-menu-item index="3">
                <router-link :to="{name: 'employee'}">员工持股</router-link>
              </el-menu-item>
              <el-menu-item index="4">
                <router-link :to="{name: 'finance'}">业绩变动</router-link>
              </el-menu-item>
              <el-menu-item index="5">
                <router-link :to="{name: 'fund'}">基金分析</router-link>
              </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="21">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script>
export default {
  created(){
    this.axios
      .get('/api/repurchase')
      .then((response) => {
        this.repurchase = response.data.results; 
        this.next_page = response.data.next.replace('http://148.70.239.118:8088','');
      })
      .catch((error) => {console.log(error);});
  },
  data () {
    return {
      auto_load: true,
      loading: false,
      next_page: '',
      repurchase: []
    }
  },
  computed: {
    noMore () {
      return !this.next_page
    },
  },
  methods: {
    load () {
      this.loading = true;
      this.axios
        .get(this.next_page)
        .then((response) => {
          this.repurchase = this.repurchase.concat(response.data.results); 
          this.next_page = response.data.next.replace('http://148.70.239.118:8088','');
          console.log(2);
        })
        .catch((error) => {console.log(error);});
      this.loading = false;
    }
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
  h3 {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
  }
  a{
    color: black;
  }
</style>
<template>
    <el-row>
        <el-col :span="3">
            <h3>消息类型</h3>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              mode="vertical" 
              @select="handleSelect"
              active-text-color="#409EFF">
              <el-menu-item index="1">
                <span slot="title">增持减持</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">公司回购</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span slot="title">员工持股</span>
              </el-menu-item>
              <el-menu-item index="4">
                <span slot="title">业绩增减</span>
              </el-menu-item>
              <el-menu-item index="5">
                <span slot="title">自定义</span>
              </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="20">
            <div id='echart'></div>
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
</style>
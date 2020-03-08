<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="auto_load">
      <li v-for="r in repurchase" class="list-item">
        报告日期：{{r.ann_date}} | 公司名称：{{r.ts_code}} | 回购数量：{{r.vol}} | 回购总额：{{r.amount}}
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
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


<style>
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 100%;
  }
</style>
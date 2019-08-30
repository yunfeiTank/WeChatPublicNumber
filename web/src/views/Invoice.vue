<template>
  <div class="invoice">
    <!-- ---标题--- -->
    <Header title="发票记录" class="app_view_head"></Header>
    <!-- ---容器--- -->
    <div class="app_view_box">
      <ul
        class="newsList"
        v-infinite-scroll="loadMore"
        infinite-scroll-distance="10"
        :infinite-scroll-immediate-check="true"
        infinite-scroll-disabled="isMoreLoading"
      >
        <li v-for="(item,index) in list" :key="index">
          <Cell :title="item.invoiceType" style="background:#fafafa;">{{item.date}}</Cell>
          <Cell :title="'￥'+item.Amount"></Cell>
          <Cell title="查看详情" is-link></Cell>
        </li>
        <div class="loading-box tc" v-if="isLoading">
          <Spinner type="snake" class="loading-more"></Spinner>
        </div>
        <div class="no-more" v-if="noMore">没有更多了~</div>
      </ul>
    </div>
  </div>
</template>
<script>
import { InfiniteScroll, Cell, Spinner, Header } from "mint-ui";
import Vue from "vue";
Vue.use(InfiniteScroll);
export default {
  name: "invoice",
  components: { Cell, Spinner, Header },
  data() {
    return {
      list: [],
      i: 0,
      Time: null,
      isMoreLoading: false, // 加载更多中
      isLoading: false,
      noMore: false
    };
  },
  created() {
    let mDate = new Date();
    let y = mDate.getFullYear(); //获取完整的年份(4位,1970-????)
    for (let i = 1; i <= 10; i++) {
      this.list.push({
        date:
          y +
          "-" +
          Math.floor(Math.random(0, 12) * 10) +
          "-" +
          Math.floor(Math.random(0, 3) * 10),
        Amount: Math.floor(Math.random(0, 9) * 100000),
        invoiceType: "发票：" + i
      });
    }
  },
  methods: {
    loadMore() {
      this.isLoading = true;
      this.noMore = false;
      if (this.list.length > 100) {
        this.isLoading = false;
        this.noMore = true;
        return;
      }
      if (this.Time) {
        clearTimeout(this.Time);
      }
      this.Time = setTimeout(() => {
        let mDate = new Date();
        let y = mDate.getFullYear(); //获取完整的年份(4位,1970-????)
        for (let i = 1; i <= 10; i++) {
          this.list.push({
            date:
              y +
              "-" +
              Math.floor(Math.random(0, 12) * 10) +
              "-" +
              Math.floor(Math.random(0, 3) * 10),
            Amount: Math.floor(Math.random(0, 9) * 100000),
            invoiceType: "发票：" + Number(this.list.length + i)
          });
        }
        this.isLoading = false;
      }, 3000);
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.invoice {
  background: #f1f1f1;
  .newsList {
    padding: 40px 0.2rem 0.5rem;
    li {
      margin: 0.15rem auto;
      font-size: 0.16rem;
      border-radius: 10px;
      background: #fff;
      .mint-cell {
        background: none;
      }
    }
    /* ---加载中--- */
    .loading-box {
      margin: 0.12rem 0;
      text-align: center;
      font-size: 0.2rem;
      .mint-spinner-snake {
        display: inline-block;
      }
    }
    /* ---没有更多--- */
    .no-more {
      font-size: 0.16rem;
      text-align: center;
    }
  }
}
</style>
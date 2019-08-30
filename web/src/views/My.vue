<template>
  <div class="my">
    <!-- ---标题--- -->
    <Header class="app_view_head" title="我的信息"></Header>
    <!-- ---容器--- -->
    <div class="app_view_box">
      <div class="head"></div>
      <div class="content">
        <Cell title="头像">
          <img :src="data.headimgurl" alt srcset />
        </Cell>
        <Cell title="昵称" :value="data.nickname || '--'"></Cell>
        <Cell title="性别" :value=" data.sex ? (data.sex == 0 ? '男' :'女') : '--' "></Cell>
        <Cell title="地址" :value="data.province || '--'" style="border: none;"></Cell>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, Header } from "mint-ui";
export default {
  name: "my",
  components: { Cell, Header },
  data() {
    return {
      data: {
        country: "",
        headimgurl: "",
        nickname: "",
        province: "",
        sex: ""
      }
    };
  },
  created() {
    let ujson = localStorage.getItem("user");
    let user = ujson ? JSON.parse(ujson) : "";
    if (user) {
      this.data = user;
    }
  }
};
</script>
<style lang="less">
.my {
  height: 100%;
  position: relative;
  background: #f1f1f1;
  /* ---标题--- */
  .app_view_head {
    background: #fff;
    color: #000;
  }
  .head {
    margin-top: 40px;
    height: 1.4rem;
    background: #4286f5;
  }
  .content {
    position: absolute;
    margin-left: -40%;
    padding: 0 10px;
    top: 1.1rem;
    left: 50%;
    width: 80%;
    background: #fff;
    border-radius: 10px;
    /* ---头像--- */
    img {
      width: 50px;
      height: 50px;
      background: #000;
      border-radius: 50%;
    }
  }
}
</style>
<template>
  <div class="view_404">
    <img src="../assets/imges/404.jpg" alt />
    <Button type="primary" @click="routerLink">返回首页</Button>
  </div>
</template>
<script>
import { Button } from "mint-ui";
export default {
  name: "com404",
  components: { Button },
  methods: {
      routerLink(){
          this.$router.push({name:'home'})
      }
  },
};
</script>
<style lang="less">
.view_404 {
  text-align: center;
  button {
      margin-top: 0.15rem;
  }
  img {
    padding-top: 0.8rem;
    width: 100%;
    height: auto;
  }
}
</style>
<template>
  <!-- 弹出层 -->
  <Popup class="my_popup" :closeOnClickModal="false" v-model="popupVisible" position="bottom">
    <!-- 功能 -->
    <ul class="container">
      <li>
        <span>
          <i class="icon-saomiao"></i>
        </span>
        扫码采集
      </li>
      <li @click="linkto('imgspot')">
        <span>
          <i class="icon-tuxiang"></i>
        </span>
        图像识别
      </li>
      <li>
        <span>
          <i class="icon-shougong"></i>
        </span>
        手工采集
      </li>
      <li>
        <span>
          <i class="icon-weixinkabao"></i>
        </span>
        微信卡包
      </li>
    </ul>
    <!-- 关闭 -->
    <div class="colse" @click="close">
      <i class="icon-quxiao"></i>
    </div>
  </Popup>
</template>
<script>
import { Popup } from "mint-ui";
export default {
  components: { Popup },
  props: ["popupVisible"],
  methods: {
    close() {
      this.$emit("close");
    },
    linkto(val) {
      this.$router.push({ name: val });
      this.$emit("close1");
    }
  }
};
</script>
<style lang="less">
/* ---弹出功能界面--- */
.my_popup {
  width: 80%;
  text-align: center;
  background: none;
  .container {
    height: 0.8rem;
    background: #fff;
    border-radius: 0.1rem;
    /* ---工具栏--- */
    li {
      width: 25%;
      span {
        margin: 0.1rem auto 0.05rem;
        display: block;
        color: #fff;
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 50%;
        background: #539efa;
      }
      i {
        font-size: 0.2rem;
        line-height: 0.4rem;
      }
      float: left;
      font-size: 0.1rem;
    }
  }
  /* 关闭按钮 */
  .colse {
    margin: 0.1rem auto 0.2rem;
    width: 40px;
    height: 40px;
    line-height: 40px;
    i {
      color: #fff;
      float: left;
      font-size: 0.3rem;
    }
  }
}
</style>
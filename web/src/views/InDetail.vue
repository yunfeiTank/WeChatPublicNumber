<template>
  <div class="in_detail">
    <!-- ---标题--- -->
    <Header title="详情" class="app_view_head"></Header>
    <!-- ---容器--- -->
    <div class="app_view_box">
      <div class="head">
        <img :src="src" alt />
      </div>
      <div class="title">
        <Cell title="票据类型" value="增值税普通发票"></Cell>
      </div>
      <div>
        <Cell title="开票日期" value="20190122"></Cell>
        <Cell title="发票代码" value="012001800104"></Cell>
        <Cell title="发票号码" value="04989751"></Cell>
        <Cell title="校检码" value="435467657567"></Cell>
        <Cell title="合计金额" value="6796.22"></Cell>
        <Cell title="合计税额" value="20388"></Cell>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, Header } from "mint-ui";
import ModelType from "@/plugins/modelType";
const wx = require("weixin-js-sdk");
export default {
  name: "in_detail",
  components: { Cell, Header },
  data() {
    return {
      src: ""
    };
  },
  mounted() {
    /**
     * 兼容iOS与安卓 图片回显
     *  */
    if (ModelType == 1) {
      wx.getLocalImgData({
        localId: this.$route.query.src, // 图片的localID
        success: res => {
          this.src = res.localData; // localData是图片的base64数据，可以用img标签显示
        }
      });
    } else {
      this.src = this.$route.query.src;
    }
  }
};
</script>
<style lang="less">
.in_detail {
  background: #f1f1f1;
  //发票照片
  .head {
    img {
      width: 100%;
      height: auto;
    }
  }
  // 票据类型
  .title {
    margin: 0.2rem 0;
  }
}
</style>
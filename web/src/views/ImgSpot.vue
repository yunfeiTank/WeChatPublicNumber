<template>
  <div class="img_spot">
    <!-- ---标题--- -->
    <Header title="图像识别" class="app_view_head"></Header>
    <!-- ---容器--- -->
    <div class="app_view_box">
      <div class="query_form">
        <Field label="发票代码" placeholder="请输入发票代码" v-model="form.invoiceCode"></Field>
        <Field label="发票号码" placeholder="请输入发票号码" v-model="form.invoiceNumber"></Field>
      </div>
      <ul>
        <li>
          <Button type="primary">查验</Button>
        </li>
        <li>
          <Button type="default">扫码查验</Button>
        </li>
        <li>
          <Button @click="JsSdkPZ" type="default">图像识别</Button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const wx = require("weixin-js-sdk");
import Jssdk from "@/plugins/jssdk";
import axios from "axios";
import { Header, Button, Field } from "mint-ui";
export default {
  name: "ImgSpot",
  components: { Header, Button, Field },
  data() {
    return {
      form: {
        invoiceCode: "",
        invoiceNumber: "",
        date: ""
      }
    };
  },
  methods: {
    /* ---拍摄--- */
    JsSdkPZ() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          this.$router.push({
            name: "indetail",
            query: { src: localIds[0] }
          });
        }
      });
    }
  },
  mounted() {
    /* ---初始化认证--- */
    Jssdk(wx, axios);
  }
};
</script>
<style lang="less">
.img_spot {
  li {
    height: 0.5rem;
    text-align: center;
    button {
      width: 80%;
    }
  }
  /* ---表单查询--- */
  .query_form {
    margin: 0.3rem 0.4rem 0;
    padding-top: 40px;
  }
}
</style>
<template>
  <div class="home_piece">
    <!-- ---容器--- -->
    <div class="view_box">
      <div class="head">
        <img src="../assets/logo.png" alt srcset />
      </div>
      <h3>欢迎光临！</h3>
      <div>
        <Button :disabled="flag2" type="primary" @click="auth">微信登录</Button>
      </div>
      <div>
        <Button :disabled="flag3" type="primary" @click="getUser">获取用户信息</Button>
      </div>
      <div>
        <Button :disabled="flag1" type="primary" @click="getTokens">生成token</Button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
import { Button, Toast } from "mint-ui";
export default {
  name: "homepiece",
  data() {
    return {
      flag1: false,
      flag2: false,
      flag3: false
    };
  },
  components: { Button },
  methods: {
    /* ---获取access_token用于生成sdk--- */
    getTokens() {
      this.flag1 = true;
      axios
        .get("/getTokens")
        .then(res => {
          this.flag1 = false;
          Toast("token已生成");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.flag1 = false;
        });
    },
    /* ---微信授权--- */
    auth() {
      window.location.href = "/wxAuthorize";
    },
    /* ---获取用户信息--- */
    getUser() {
      this.flag3 = true;
      const qs = Qs.parse(window.location.search.substr(1));
      axios
        .get("/getUser", {
          params: {
            openid: qs.openid
          }
        })
        .then(res => {
          this.flag3 = false;
          console.log(res);
          Toast("用户信息已获取");
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(err);
          this.flag3 = false;
        });
    }
  }
};
</script>
<style lang="less">
.home_piece {
  height: 100vh; //与屏幕一样高度
  overflow-y: auto;
  .head {
    padding-top: 10px;
    padding-bottom: 20px;
    height: 0.6rem;
    text-align: center;
    background: #4286f5;
    img {
      width: auto;
      height: 0.6rem;
    }
  }
  h3 {
    margin-top: 0.5rem;
    font-size: 0.16rem;
    text-align: center;
  }
  .view_box {
    div {
      line-height: 40px;
    }
  }
}
</style>
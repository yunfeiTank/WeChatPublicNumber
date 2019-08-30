<template>
  <div class="hello_view">
      <h3>
          
      </h3>
    <Button @click="ok">同意</Button>
  </div>
</template>
<script>
import { Button } from "mint-ui";
import axios from "axios";
import Qs from "qs";
import { Button, Toast } from "mint-ui";
export default {
  name: "helloview",
  components: { Button },
  data() {
    return {};
  },
  methods: {
    ok() {},
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
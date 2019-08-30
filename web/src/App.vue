<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      data: "hello word"
    };
  },
  created() {
    (function(doc, win) {
      var docEl = doc.documentElement,
        resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 320) + "px";
        };

      // Abort if browser does not support addEventListener
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
    })(document, window);
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  /* --- 公共样式 --- */
  //标题
  .app_view_head {
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    //标题加粗
    .mint-header-title{
      font-weight: 700;
    }
  }
  //容器
  .app_view_box {
    position: relative;
    height: 100vh; //与屏幕一样高度
    overflow-y: auto;
  }
}
/* ---默认样式--- */
a {
  color: #000;
  text-decoration: none;
}
a:focus {
  color: #000;
}
li {
  list-style: none;
}
.mint-indicator-wrapper {
  font-size: 0.1rem;
}
</style>

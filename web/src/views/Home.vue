<template>
  <div class="home">
    <router-view></router-view>
    <Tabbar v-model="selected">
      <TabItem id="HomePiece">
        <i class="icon-shouye"></i>
        首页
      </TabItem>
      <TabItem id="mainmenu">
        <div @click="features">
          <i class="icon-shangchuan"></i>
          票据采集
        </div>
      </TabItem>
      <TabItem id="invoice">
        <i class="icon-fapiao"></i>
        发票
      </TabItem>
      <TabItem id="my">
        <i class="icon-wode"></i>
        我的
      </TabItem>
    </Tabbar>
    <NavPopup :popupVisible="popupVisible" @close="closepopup" @close1="closepopup1"></NavPopup>
  </div>
</template>

<script>
// @ is an alias to /src
import NavPopup from "@/components/NavPopup.vue";
import { Tabbar, TabItem } from "mint-ui";
export default {
  name: "home",
  components: { Tabbar, TabItem, NavPopup },
  data() {
    return {
      selected: "HomePiece",
      popupVisible: false,
      navarr: ["HomePiece", "invoice", "my"]
    };
  },
  watch: {
    selected: function(val) {
      if (val != "mainmenu") {
        if (this.selected != this.$route.name) {
          this.$router.push({ name: val });
          this.selected = val;
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.navarr.find(e => e == to.name)) {
        vm.selected = to.name;
      } else {
        vm.selected = "mainmenu";
      }
    });
  },
  methods: {
    /* ---票据采集--- */
    features() {
      this.popupVisible = true;
    },
    /* ---关闭功能层--- */
    closepopup() {
      this.selected = this.$route.name;
      this.popupVisible = false;
    },
    closepopup1() {
      this.selected = 'mainmenu';
      this.popupVisible = false;
    }
  }
};
</script>
<style lang="less">
.home {
  height: 100%;
  .mint-tab-item-label {
    position: relative;
    font-size: 0.1rem;
    i {
      display: block;
      margin-bottom: 6px;
      font-size: 0.22rem;
    }
  }
  /* ---导航选中状态--- */
  .mint-tabbar {
    .mint-tab-item.is-selected {
      background: none;
    }
  }
}
</style>

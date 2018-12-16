<template>
  <div class="top">
    <div class="LOGO">
      <img v-if="logo.logo" :src="$logo+logo.logo" alt="">
      <span>{{logo.tabl}}</span>
    </div>
    <!-- <div class="logo_ours">
      <img src="./../../assets/logo.png" alt="">
      <span>{{logo.tabl}}</span>
    </div> -->
    <!-- <div class="menu">
      <router-link
        v-for="(item,index) in ROUTESETTING"
        :key="index"
        :to="item[0][2]"
        active-class="CHECK"
        class="Menus"
      >{{item[0][0]}}</router-link>
    </div> -->
    <div v-if="shows != ''" class="NIckname">
      {{shows.item_name | minNick}}
      <i @click="toRoute" class="el-icon-circle-close icons"></i>
    </div>
    <i @click="toHome" title="主页" class="el-icon-menu"></i>
    <i @click="setting" title="设置" class="el-icon-setting"></i>
    <div>
      <span>{{USERMSG}}</span>
      <div class="Group">
        <div @click="mycenter" class="ours">个人中心</div>
        <div @click="OUTLOGIN" class="outLogin">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogo } from './../../utils/baseUrl.js'
import { mapState, mapGetters, mapMutations,mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  watch: {
    $route(to, from, next) {
      if (to.path != "/page/shows") {
        
        this.OUTSHOW();
      }
    }
  },
  methods: {
    ...mapActions(["Floading"]),
    ...mapMutations(["OUTLOGIN", "OUTSHOW","getLogo","SHOWMEUN"]),
    mycenter() {
      this.$router.push("/page/centers");
    },
    toRoute() {
      this.OUTSHOW();
      this.$router.push("/page/welcome");
    },
    //去设置
    setting() {
      this.$router.push("/page/setting")
      this.SHOWMEUN(true)
    },
    //去首页
    toHome() {
      this.$router.push("/page/manage")
      this.SHOWMEUN(false)
    }
  },
  computed: {
    ...mapGetters(["USERMSG", "ROUTESETTING"]),
    ...mapState(["shows","logo"])
  },
  mounted() {
    if (localStorage.getItem("setIn")) {
      this.Floading(JSON.parse(localStorage.getItem("setIn")));
    }
  },
  filters: {
    minNick(val) {
      if (true) {
        if (val.length > 4) {
          return val.slice(0, 4) + "...";
        } else {
          return val;
        }
      }
    }
  }
};
</script>

<style lang='less' scoped >
.top {
  height: 8vh;
  width: 100%;
  background: #3f3f3fb7;
  position: relative;
  .el-icon-setting{
    font-size: 20px;
    position: absolute;
    height: 100%;
    width: 180px;
    right:0;
    color:white;
    line-height: 8vh;
    cursor: pointer;
  }
  .el-icon-menu{
    font-size: 20px;
    position: absolute;
    height: 100%;
    width: 180px;
    right:40px;
    color:white;
    line-height: 8vh;
    cursor: pointer;
  }
  .logo_ours{
    position: absolute;
    height: 100%;
    width: 180px;
    left:0;
    span{
      text-align:left;
      padding-left:20px;
    }
    img{
      height:30px;
      width:30px;
      position: absolute;
      left:10px;
      top:50%;
      margin-top: -15px;
    }
  }
  .menu {
    position: absolute;
    height: 6vh;
    width: 600px;
    left: 200px;
    top: 2vh;
    .Menus {
      width: 80px;
      height: 5vh;
      margin-top: 1vh;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      float: left;
      margin-left: 5px;
      color: white;
      text-decoration: none;
      background-color: #424040;
      line-height: 6vh;
      transition:all .2s linear;
      &:hover {
        background-color: white !important;
        color: black !important;
        transform: scale(1.05);
      }
    }
  }
  .NIckname {
    position: absolute;
    left: 249px;
    height: 100%;
    background-color: #5e5b5b;
    color: white;

    .icons {
      position: absolute;
      top: 2px;
      right: 2px;
      color: white;
    }
  }
  & > div {
    width: 100px;
    position: absolute;
    line-height: 45px;
    right: 45px;
    text-align: center;
    cursor: pointer;
    span {
      display: inline-block;
      height: 8vh;
      width: 100px;
      line-height: 8vh;
      color: white;
    }
    &:hover .Group {
      display: block;
    }
    .Group {
      position: absolute;
      width: 100px;
      top: 8vh;
      height: 60px;
      line-height: 30px;
      z-index: 999;
      display: none;
      transition: all 0.3s linear;
      .ours {
        width: 100px;
        height: 30px;
        line-height: 30px;
        background-color: #3f3f3fb7;
        color: white;
        font-size: 12px;
        &:hover {
          cursor: pointer;
          background-color: #40a0ffa1;
        }
      }
      .outLogin {
        width: 100px;
        height: 30px;
        line-height: 30px;
        background-color: #3f3f3fb7;
        color: white;
        font-size: 12px;
        &:hover {
          cursor: pointer;
          background-color: #40a0ffa1;
        }
      }
    }
  }
}
.CHECK {
  background-color: white !important;
  color: black !important;
  transform: scale(1.05);
}




.LOGO {
  position: absolute;
    height: 45px;
    width: 249px;
    color: white;
    line-height: 45px;
    left:0;
    img{
      width:30px;
      height:30px;
      margin: 7.5px 0 0 30px;
    }
    span {
      position: absolute;

    }
    .MENU {
      font-size: 25px;
      color: white;
      left: 209px;
      top: 10px;
      position: absolute;
      cursor: pointer;
      transition: all 0.3s linear;
    }
  }
</style>

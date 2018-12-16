<template>
  <div class="setting">
    <!-- <el-tabs v-model="activeName">
      <el-tab-pane label="设置" name="first"></el-tab-pane>
    </el-tabs> -->
    <div class="mt">
      <span class="pad">名称:</span>
      <el-input class="names" v-model="name" placeholder="请输入内容"></el-input>
    </div>
    <div class="mt">
      <span class="pad">Logo:</span>
      <span class="fileinput-button">
        <span>上传</span>
        <input @change="upImg($event)" type="file">
      </span>
      <img v-if="src" :src="$logo+src" alt>
    </div>
    <div class="btn">
      <el-button @click="upcomponey" type="primary">确认</el-button>
    </div>
  </div>
</template>

<script>
import { uploadlogo, setLogo } from "./../../../utils/baseUrl.js";
import { mapState,mapMutations } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      name: "",
      src: "",
      msg: ""
    };
  },
  mounted () {
    
    if(JSON.stringify(this.logo) != '{}') {
      let obj = JSON.parse(JSON.stringify(this.logo))
      this.src = obj.logo;
      this.name = obj.tabl;
    }
  },
  methods: {
      ...mapMutations(['getLogos']),
    //上传图片
    upImg(event) {
      let img = event.target.files[0];
      let formdata = new FormData();
      formdata.append("image", img);
      uploadlogo(formdata).then(res => {
        if (res.status === 200) {
          // console.log(res);
          this.src = res.data.data;
        }
      });
    },
    //设置logo 名称信息
    upcomponey() {
      // console.log(this.logo.id);
      if (this.src && this.name) {
        let obj = {
          logo: this.src,
          tabl: this.name
        };
        setLogo({ data: JSON.stringify(obj), id: this.logo.id }).then(res => {
          if(res.status === 200) {
              this.$DIY('设置成功');
              obj.id = this.logo.id;
              this.getLogos(obj)
          }
        });
      } else {
        this.$DIY("请确认信息");
      }
    }
  },
  computed: {
    ...mapState(["logo"])
  }
};
</script>

<style lang='less' scoped >
.setting {
  .names {
    width: 240px;
  }
  .mt {
    margin-top: 20px;
    position: relative;
    img {
      display: inline-block;
      position: absolute;
      top: 0;
      margin-left: 10px;
      height: 100px;
      width: 100px;
    }
  }
  .btn {
    margin: 100px 0 0 120px;
  }
}
.upload {
  input {
    display: none;
  }
}
.pad {
  width: 100px;
  text-align: right;
  display: inline-block;
  padding-right: 10px;
}
</style>

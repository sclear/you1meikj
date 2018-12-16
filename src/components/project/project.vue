<template>
  <div class="project">
    <el-tabs v-model="activeName">
      <el-tab-pane label="项目管理" name="first"></el-tab-pane>
      <el-input size="small" class="serCh" v-model="serch" placeholder="名称"></el-input>
      <el-button @click="getInfo" size="small" type="primary">查询</el-button>
      <el-button @click="addRoleName" size="small" type="primary">+添加</el-button>
    </el-tabs>
    <!-- table -->
    <el-table ref="singleTable" :data="list" highlight-current-row style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center">
        <template slot-scope="scope">{{scope.$index+(nowSize - 1) * pagesize + 1}}</template>
      </el-table-column>
      <el-table-column prop="item_name" label="名称" max-width="70" align="center"></el-table-column>

      <!-- <el-table-column prop="url" label="地址" max-width="70" align="center"></el-table-column> -->
      <el-table-column prop="url" label="地址" max-width="70" align="center">
        <template slot-scope="scope">
          <span title="点击进入" class="cus" @click="INs(scope.row)">{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" max-width="180" label="操作">
        <template slot-scope="scope">
          <i @click="changMsg(scope.$index)" class="el-icon-edit-outline" title="修改"></i>
          <i @click="delMsg(scope.$index)" class="el-icon-close" title="删除"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- model -->
    <j-model @CLOSE="CLOSE" v-if="model" :Ttxt='Ttxt'>
      <div class="slotDIV" slot="modelBody">
        <div class="completion-input-box">
          <span class="input-box-name">名称:</span>
          <input v-model="tabModel.item_name" type="text">
        </div>
        <div class="completion-input-box">
          <span class="input-box-name">地址:</span>
          <input v-model="tabModel.url" type="text">
        </div>

        <el-button size="small" @click="addModel()" class="ml" type="primary">确认</el-button>
        <!-- <div class="completions">
          <div>图片:</div>
          <input @change="upLoadImg($event)" style="margin-left:10px;" type="file">
          <div>
            <img src="./../../assets/logo.png" alt>
          </div>
        </div>-->
      </div>
    </j-model>
    <!-- 分页 -->
    <el-pagination
      @current-change="changeSize"
      class="paginSIze"
      background
      :page-size="pagesize"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import {
  upload,
  getItem,
  addItem,
  upItem,
  delItem,
  goPHP
} from "./../../utils/baseUrl.js";
import mixin from "./../../utils/mixin.js"; //公用方法 数据
import jModel from "./../common/model";
import { mapMutations } from 'vuex'
export default {
  mixins: [mixin],
  data() {
    return {
      serch: "",
      Ttxt:''
    };
  },
  components: {
    jModel
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    ...mapMutations(['SHOWS']),
    //loading
    getInfo() {
      let obj = {
        page: this.nowSize,
        page_size: this.pagesize,
        content: this.serch
      };
      getItem(obj).then(res => {
        this.list = res.data.data.res;
        this.total = res.data.data.long;
      });
    },
    //open修改按钮
    changMsg(res) {
      this.CLOSE();
      this.disable = false;
      this.add = false;
      this.tabModel = JSON.parse(JSON.stringify(this.list[res]));
      this.Ttxt = '编辑项目'
    },
    //open 查看 仅仅查看
    seeMsg(res) {
      this.CLOSE();
      this.disable = true;
      this.tabModel = JSON.parse(JSON.stringify(this.list[res]));
    },
    //删除信息
    delMsg(res) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delItem({ id: this.list[res].id }).then(res => {
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.getInfo();
            }
          });
        })
        .catch(err => {});
    },
    //upload
    upLoadImg(res) {
      let formdata = new FormData();
      formdata.append("image", res.target.files[0]);
      upload(formdata).then(res => {
        if (res.status === 200) {
          this.$set(this.tabModel, "img", res.data.data);
        }
      });
      // upload
    },
    //Model 添加 修改内容
    addModel() {
      //添加
      if (this.add) {
        this.tabModel.item_img = "";
        if (
          this.tabModel.item_name &&
          this.tabModel.url &&
          this.tabModel.item_name != "" &&
          this.url != ""
        ) {
          addItem({ data: JSON.stringify(this.tabModel) }).then(res => {
            if (res.status === 200) {
              this.$DIY(res.data.msg);
              this.getInfo();
              this.CLOSE();
            }
          });
        }
      }
      //修改
      else {
        if (this.tabModel.item_name != "" && this.tabModel.url != "") {
          upItem({
            id: this.tabModel.id,
            data: JSON.stringify(this.tabModel)
          }).then(res => {
            if (res.status === 200) {
              this.CLOSE();
              this.getInfo();
              this.$DIY(res.data.msg);
            }
          });
        }
      }
    },
    //功能跳转
    INs(res) {
      this.SHOWS(res)
      setTimeout(()=>{
        this.$router.push('/page/shows')
      },50)
    }
  }
};
</script>

<style lang='less' scoped >
.project {
  position: relative;
}
.serCh {
  width: 200px;
}
.paginSIze {
  margin-top: 40px;
  position: absolute;
  left: 0;
}
.slotDIV {
  & > div {
    margin-top: 5px;
  }
}
.completion-input-box {
  width: 100%;
  height: 32px;
  overflow: hidden;
  span {
    display: inline-block;
    width: 100px;
    text-align: right;
    font-size: 16px;
    padding-right: 5px;
  }
  input {
    width: 240px;
    height: 32px;
    border: 1px solid #e4e7ed;
    outline: none;
    border-radius: 3px;
    box-sizing: border-box;
    padding-left: 5px;
  }
}

.completions {
  width: 100%;
  overflow: hidden;
  padding-left: 10px;
  div {
    float: left;
    img {
      max-width: 240px;
      max-height: 240px;
      // margin-left: 100px;
    }
  }
  div:first-child {
    width: 100px;
    text-align: right;
  }
  div:last-child {
    font-size: 0;
    margin-left: 10px;
  }
}
i {
  cursor: pointer;
  margin-left: 3px;
  font-size: 16px;
}
.ml {
  margin: 20px 0 0 120px;
}
.cus {
  cursor: pointer;
  &:hover{
    color:#409eff;
  }
}
</style>

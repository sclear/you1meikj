<template>
  <div class="role">
    <el-tabs v-model="activeName">
      <el-tab-pane label="权限管理" name="first"></el-tab-pane>
      <el-input size="small" class="serCh" v-model="serch" placeholder="名称"></el-input>
      <el-button @click="getInfo" size="small" type="primary">查询</el-button>
      <el-button @click="addRoleName" size="small" type="primary">+添加</el-button>
    </el-tabs>
    <!-- table -->
    <el-table ref="singleTable" :data="list" highlight-current-row style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center">
        <template slot-scope="scope">
          {{scope.$index+(nowSize - 1) * pagesize + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="power_name" label="名称" max-width="70" align="center"></el-table-column>
      <el-table-column align="center" max-width="180" label="操作">
        <template slot-scope="scope">
          <i @click="changMsg(scope.$index)" class="el-icon-edit-outline" title="修改"></i>
          <i v-if="!(list[scope.$index].id === 1)" @click="delRole(scope.$index)" class="el-icon-close" title="删除"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- mode -->
    <j-model @CLOSE="CLOSE" v-if="model" :Ttxt='Ttxt'>
      <div class="slotDIV" slot="modelBody">
        <div class="completion-input-box">
          <span class="input-box-name">名称:</span>
          <input v-model="tabModel.power_name" type="text">
          <el-button size="small" @click="addModel()" class="ml" type="primary">确认</el-button>
        </div>
        <div v-if="!add" class="completion">
          <div class="input-box-name">权限菜单:</div>
          <div>
            <el-tree
              :data="tabModel.treeList"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-expanded-keys="[]"
              :props="defaultProps"
              :default-checked-keys="tableId1"
            ></el-tree>
          </div>
          <div>
            <el-button size="small" @click="getIN()" class="ml" type="primary">确认</el-button>
          </div>
        </div>
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
import { mapState, mapMutations, mapActions } from "vuex";
import {
  getMenu,
  getAllrole,
  addPower,
  upPower,
  delPower,
  getPower,
  setPower
} from "./../../utils/baseUrl.js";
import jModel from "./../common/model";
export default {
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      tableId1: [1, 2, 3],
      list: [],
      treeList: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      check: [],
      activeName: "first",
      serch: "",
      model: false,
      tabModel: {},
      pagesize: 10,
      total: 0,
      nowSize: 1,
      NOTparent: [],
      Ttxt:'',

      // 按钮控制
      add: false //展示 tree
    };
  },
  components: {
    jModel
  },
  computed: {},
  methods: {
    getInfo() {
      // getMenu().then(res => {
      //   this.treeList = res.data.data;
      // });
      let obj = {
        page: this.nowSize,
        page_sizes: this.pagesize,
        power: this.serch
      };
      getAllrole(obj).then(res => {
        this.total = res.data.data.long;
        this.list = res.data.data.res;
      });
    },
    CLOSE() {
      this.model = !this.model;
    },
    //get check tree
    getIN() {
      //筛选选中树菜单
      this.check = [];
      let obj = this.$refs.tree.getCheckedNodes();
      // console.log(obj);
      for (let i = 0; i < obj.length; i++) {
        if (!obj[i].children) {
          this.check.push(obj[i].pid);
          this.check.push(obj[i].id);
        }
      }
      let newarr = Array.from(new Set(this.check));
      newarr.splice(0, 1);
      this.check = newarr;

      let checkARR = [];
      for (let j = 0; j < this.check.length; j++) {
        checkARR.push([this.check[j]]);
      }
      // console.log(checkARR);
      let checkObj = {
        id: this.tabModel.id,
        data: JSON.stringify(checkARR)
      };
      setPower(checkObj).then(res => {
        if(res.status === 200){
          this.CLOSE();
          this.getInfo();
          this.$DIY(res.data.msg)
        }
      });
    },
    //open change msg
    changMsg(num) {
      this.add = false;
      this.CLOSE();
      this.Ttxt = '修改权限信息',
      this.tabModel = JSON.parse(JSON.stringify(this.list[num]));
      getMenu().then(res => {
        //数据丢进model
        for (let k = 0; k < res.data.data.length; k++) {
          if (res.data.data[k].children) {
            this.NOTparent.push(res.data.data[k].id);
          }
        }
        let obj = res.data.data;
        this.$set(this.tabModel, "treeList", obj);

        //获取选中ID  并删除拥有子集的父层级ID
        this.tableId1 = [];
        getPower({ id: this.tabModel.id }).then(req => {
          for (let i = 0; i < req.data.data.length; i++) {
            this.tableId1.push(req.data.data[i].menu_id);
          }
          for (let s = 0; s < this.NOTparent.length; s++) {
            if (this.tableId1.indexOf(this.NOTparent[s]) != -1) {
              this.tableId1.splice(this.tableId1.indexOf(this.NOTparent[s]), 1);
              s--;
            }
          }
          this.$refs.tree.setCheckedKeys(this.tableId1);
        });
      });
    },
    //page-size
    changeSize(res) {
      this.pagesize = res;
      this.getInfo();
    },
    //open add model
    addRoleName() {
      this.CLOSE();
      this.add = true;
      this.tabModel = {};
      this.Ttxt = '添加权限'
    },
    //
    addModel() {
      if (this.add) {
        if (
          this.tabModel.power_name == undefined ||
          this.tabModel.power_name === ""
        ) {
          this.$DIY("名称不能为空");
          return;
        } else {
          addPower({ power: this.tabModel.power_name }).then(res => {
            if (res.status === 200) {
              this.CLOSE();
              this.$DIY("添加成功");
              this.getInfo();
            }
          });
        }
      } else {
        let obj = {
          id: this.tabModel.id,
          power_name: this.tabModel.power_name
        };
        if (
          this.tabModel.power_name == undefined ||
          this.tabModel.power_name === ""
        ) {
          this.$DIY("名称不能为空");
          return;
        }
        upPower(obj).then(res => {
          if (res.status === 200) {
            this.$DIY("修改成功");
            this.CLOSE();
            this.getInfo();
          }
        });
      }
    },
    //del role
    delRole(res) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delPower({ id: this.list[res].id }).then(res => {
          if (res.status === 200) {
            if (res.data.msg === "删除成功") {
              this.$DIY("删除成功");
              this.getInfo();
            } else {
              this.$DIY("现有用户拥有该权限");
            }
          }
        });
      })
      .catch(res=>{})

      // delPower({ id: this.list[res].id }).then(res => {
      //   if (res.status === 200) {
      //     if (res.data.msg === "删除成功") {
      //       this.$DIY("删除成功");
      //       this.getInfo();
      //     } else {
      //       this.$DIY("现有用户拥有该权限");
      //     }
      //   }
      // });
    }
  }
};
</script>

<style lang='less' scoped >
.paginSIze {
  margin-top: 40px;
  position: absolute;
  left: 0;
}
.role {
  position: relative;
}
.serCh {
  width: 200px;
}
.slotDIV {
  & > div {
    margin-top: 5px;
    margin-bottom: 50px;
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
.completion {
  width: 100%;
  height: 32px;
  margin-top: 200px;
  & > div {
    float: left;
  }
  & > div:first-child {
    width: 110px;
    text-align: right;
    font-size: 16px;
    padding-right: 5px;
  }
  & > div:last-child {
    margin-left: 115px;
  }
}
i {
  margin: 0 10px;
  cursor: pointer;
}
</style>

<template>
  <div class="cases">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
    </el-tabs>
    <el-input size="small" class="serCh" v-model="serch" placeholder="账号"></el-input>
    <el-button @click="getInfo" size="small" type="primary">查询</el-button>
    <el-button @click="addMsg" size="small" type="primary">+添加</el-button>
    <!-- table -->
    <el-table ref="singleTable" :data="list" highlight-current-row style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center">
        <template slot-scope="scope">
          {{scope.$index+(nowSize - 1) * pagesize + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="user" label="账号" max-width="70" align="center"></el-table-column>
      <el-table-column prop="name" label="昵称" max-width="180" align="center"></el-table-column>
      <!-- <el-table-column prop="power_id" label="权限" max-width="180" align="center">
        <template slot-scope="scope">
          {{scope.row.power_id}}
        </template>
      </el-table-column>-->
      <el-table-column align="center" max-width="180" label="操作">
        <template slot-scope="scope">
          <i v-if="!(list[scope.$index].id===1)" @click="UPMSG(scope.$index)" class="el-icon-refresh" title="重置密码"></i>
          <i v-if="!(list[scope.$index].id===1)" @click="changeMSG(scope.$index)" class="el-icon-edit" title="修改"></i>
          <i v-if="!(list[scope.$index].id===1)" @click="delMsg(scope.$index)" class="el-icon-close" title="删除"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="paginSIze" background :page-size="pagesize" :total="total"></el-pagination>
    <!-- model -->
    <j-model @CLOSE="CLOSE" v-if="model" :Ttxt='Ttxt'>
      <div class="slotDIV" slot="modelBody">
        <div class="completion-input-box">
          <span class="input-box-name">用户名:</span>
          <input :disabled="!add" v-model="tabModel.user" type="text">
        </div>
        <div v-if="add" class="completion-input-box">
          <span class="input-box-name">密码:</span>
          <input :disabled="!add" v-model="tabModel.pwd" type="text">
        </div>

        <!-- <div v-if="add" class="completion-input-box">
          <span class="input-box-name">密码:</span>
          <input v-model="tabModel.pwd" type="text">
        </div>-->
        <!-- <div v-if="!add" class="completion-input-box">
          <span class="input-box-name">密码:</span>
          <el-button @click="UPMSG(1)" size="small" type="primary">重置密码</el-button>
        </div>-->
        <div class="completion-input-box">
          <span class="input-box-name">昵称:</span>
          <input :disabled="!add" v-model="tabModel.name" type="text">
        </div>

        <div v-if="!add" class="completion-input-box">
          <span class="input-box-name">权限名:</span>
          <el-select class="w240" size="small" v-model="tabModel.power_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.power_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-button @click="addModel()" class="ml" type="primary">确认</el-button>
      </div>
    </j-model>
  </div>
</template>

<script>
import {
  getVague,
  addUser,
  delUser,
  Reset,
  UserPowerAll,
  setUserPower
} from "./../../utils/baseUrl.js";
import { toTime } from "./../../utils/tool.js";
import jnput from "./../common/tol/jinput";
import jModel from "./../common/model";
export default {
  name: "home",
  data() {
    return {
      activeName: "first",
      serch: "",
      list: [],
      pagesize: 10,
      total: 0,
      nowSize: 1,
      model: false,
      tabModel: {},
      datas: [],
      add: true,
      options: [],
      value: "",
      Ttxt:''
    };
  },
  mounted() {
    this.getInfo();
    UserPowerAll().then(res => {
      this.options = res.data.data;
      console.log(this.options);
    });
  },
  methods: {
    //loading
    getInfo() {
      let obj = {
        page: this.nowSize,
        page_sizes: this.pagesize,
        content: this.serch
      };
      getVague(obj).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.list = res.data.data.res;
          this.total = res.data.data.long;
        }
      });
    },
    //close model
    CLOSE() {
      this.model = !this.model;
    },
    //展开添加model
    addMsg() {
      this.CLOSE();
      this.tabModel = {};
      this.add = true;
      this.Ttxt = '添加用户'
    },
    //添加用户
    addModel() {
      if (this.add) {
        addUser({ data: JSON.stringify(this.tabModel) }).then(res => {
          if (res.status === 200) {
            this.getInfo();
            this.CLOSE();
            this.$DIY(res.data.msg)
          }
        });
      } else{
        setUserPower({
          id:this.tabModel.id,
          powerId:this.tabModel.power_id
        }).then(res=>{
          if(res.status === 200){
            this.$DIY(res.data.msg)
            this.getInfo();
            this.CLOSE();          }
        })
      }
    },
    delMsg(res) {
      if(this.list[res].id === 1){
        return
      }
      delUser({ id: this.list[res].id }).then(res => {
        if (res.status === 200) {
          this.getInfo();
          this.$DIY("删除成功");
        }
      });
    },
    //重置用户密码
    UPMSG(res) {
      if (res) {
        Reset({ id: this.tabModel.id }).then(res => {
          if (res.status === 200) {
            this.$DIY(res.data.msg);
          }
        });
        return;
      }
      Reset({ id: this.list[res].id }).then(res => {
        if (res.status === 200) {
          this.$DIY(res.data.msg);
        }
      });
    },
    changeMSG(res) {
      this.CLOSE();
      this.add = false;
      this.tabModel = JSON.parse(JSON.stringify(this.list[res]));
      this.Ttxt = '编辑用户信息'
    }
  },
  components: {
    jModel,
    jnput
  },
  computed: {
    quanxian(val) {
      // if(this.datas){
      //    console.log(this.datas)
      //   for(let i = 0;i < this.datas.length;i++){
      //     if(val === this.datas[i].id){
      //       return this.datas[i].name
      //     }
      //   }
      // }
    }
  }
};
</script>

<style lang='less' scoped >
.w200 {
  width: 200px;
}
.cases {
  position: relative;
}
.serCh {
  width: 230px;
}
i {
  font-size: 18px;
  cursor: pointer;
}
.paginSIze {
  position: absolute;
  // left:5px;
  bottom: 20px;
}

// model
.j_gourp {
  margin-top: 15px;
  .w200 {
    width: 300px;
  }
  .j_Title {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 15px;
  }
}
.j_long {
  position: relative;
  margin-top: 15px;
  .j_Title {
    display: inline-block;
    width: 100px;
    position: absolute;
    text-align: right;
    padding-right: 15px;
    top: 0;
  }
  textarea {
    resize: none;
    margin-left: 118px;
    outline: none;
    height: 80px;
    width: 300px;
    overflow: auto;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 4px;
  }
}
.ml {
  margin: 50px 0 50px 220px;
}
.img_gourp {
  position: relative;
  .j_Title {
    display: inline-block;
    width: 100px;
    position: absolute;
    text-align: right;
    padding-right: 15px;
    top: 0;
  }
  img {
    margin-left: 130px;
    max-width: 300px;
    max-height: 500px;
  }
}

//model content
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
.w240 {
  width: 240px;
  margin-bottom: 5px;
}
</style>

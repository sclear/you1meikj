<template>
  <div class="home">
    <el-tabs v-model="activeName">
      <el-tab-pane label="客户管理" name="first"></el-tab-pane>
    </el-tabs>
    <el-select @change="choseSelect" size="small" v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-input size="small" class="serCh" v-model="serch" placeholder="姓名/电话"></el-input>
    <el-button @click="getInfo" size="small" type="primary">查询</el-button>
    <!-- table -->
    <el-table ref="singleTable" :data="list" highlight-current-row style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center">
        <template slot-scope="scope">
          {{scope.$index+(nowSize - 1) * pagesize + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" max-width="70" align="center"></el-table-column>
      <el-table-column
        prop="telephone"
        label="电话"
        max-width="180"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="Email" label="邮箱" max-width="180" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="Time" label="时间" max-width="180" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.Time | timeTotimp}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="详情"
        max-width="180"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column align="center" max-width="180" label="操作">
        <template slot-scope="scope">
          <i v-if="value === 0" @click="sureMsg(scope.$index)" class="el-icon-check"></i>
          <i @click="wMsg(scope.$index)" class="el-icon-edit"></i>
          <i @click="delMsg(scope.$index)" class="el-icon-close"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changeSize"
      class="paginSIze"
      background
      :page-size="pagesize"
      :total="total"
    ></el-pagination>
    <!-- model -->
    <j-model @CLOSE="CLOSE" v-if="model" Ttxt='处理客户信息'>
      <div class="slotDIV" slot="modelBody">
        <div class="completion-input-box">
          <span class="input-box-name">姓名:</span>
          <input v-model="tabModel.name" type="text">
        </div>
        <div class="completion-input-box">
          <span class="input-box-name">电话:</span>
          <input v-model="tabModel.telephone" type="text">
        </div>
        <div class="completion-input-box">
          <span class="input-box-name">邮箱:</span>
          <input v-model="tabModel.Email" type="text">
        </div>
        <div class="completion-input-box">
          <span class="input-box-name">时间:</span>
          <input v-model="tabModel.Time" type="text">
        </div>

        <div class="completionTextarea">
          <div>详情:</div>
          <div>
            <textarea disabled v-model="tabModel.content" type="text"></textarea>
          </div>
        </div>
        <el-button v-if="value === 0" @click="ModelBtn(tabModel.id)" class="ml" type="primary">已处理</el-button>
      </div>
    </j-model>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAT, upCustomer, delCustomer } from "./../../utils/baseUrl.js";
import { toTime } from "./../../utils/tool.js";
import jModel from "./../common/model";
export default {
  name: "home",
  mounted() {
    this.getInfo();
  },
  data() {
    return {
      activeName: "first",
      options: [
        {
          value: 0,
          label: "未处理"
        },
        {
          value: 1,
          label: "已处理"
        }
      ],
      value: 0,
      serch: "",
      list: [
        // {
        //     date: "2018-10-10",
        //     name: "李四",
        //     tel: "123014521589",
        //     email: "21345646@qq.com",
        //     detail: "上海市普陀区",
        //     kz: 0
        // },
        // {
        //     date: "2018-10-10",
        //     name: "李四",
        //     tel: "123014521589",
        //     email: "21345646@qq.com",
        //     detail: "上海市普陀区",
        //     kz: 0
        // }
      ],
      pagesize: 10,
      total: 0,
      nowSize: 1, //当前页码
      model: false, //model状态
      upRead: true,
      tabModel: {} //展示数据
    };
  },
  methods: {
    //加载信息
    getInfo() {
      let obj = {
        page: this.nowSize,
        page_sizes: this.pagesize,
        type: this.value
      };
      if (this.serch) {
        obj.vague = this.serch;
      }
      getAT(obj).then(res => {
     
        this.list = res.data.data.res;
        this.total = res.data.data.long;
      });
    },
    //model 开关
    CLOSE() {
      this.model = !this.model;
    },
    //设置为已处理
    sureMsg(res) {
      upCustomer({ id: this.list[res].id }).then(res => {
        if (res.status === 200) {
          this.$DIY("处理成功");
          this.getInfo();
        }
      });
    },
    //修改信息
    wMsg(res) {
      this.CLOSE();
      this.tabModel = JSON.parse(JSON.stringify(this.list[res]));
      this.tabModel.Time = toTime(this.tabModel.Time, "y-m-d");
     
    },
    //删除客户信息
    delMsg(res) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delCustomer({ id: this.list[res].id }).then(res => {
          if (res.status === 200) {
            this.getInfo();
            this.$DIY("删除成功");
          }
        });
      })
    .catch(res=>{})
    },
    //model => 已处理
    ModelBtn(res) {
      upCustomer({ id: res }).then(res => {
        if (res.status === 200) {
          this.CLOSE();
          this.$DIY("处理成功");
          this.getInfo();
        }
      });
    },
    //分页
    changeSize(res) {
      this.nowSize = res;
      this.getInfo();
    },
    //下拉搜索
    choseSelect() {
      
      this.getInfo();
    }
  },
  components: {
    jModel
  },
  computed: {
    ...mapGetters(["ROUTESETTING"])
  },
  filters: {
    timeTotimp(val) {
      return toTime(val, "y-m-d");
    }
  }
};
</script>

<style lang='less' scoped >
.home {
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
  margin-top: 40px;
  position: absolute;
  left: 0;
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
.ml {
  margin: 50px 0 50px 220px;
}

// model content
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
    border: 1px solid white;
    border: none;
    outline: none;
    border-radius: 3px;
    box-sizing: border-box;
    padding-left: 5px;
  }
}

.completionTextarea {
  width: 100%;
  overflow: hidden;
  padding-left: 10px;
  div {
    float: left;
    textarea {
      width: 240px;
      max-height: 100px;
      resize: none;
      border: none;
      outline: none;
      padding: 5px 0 0 5px;
      background: white;
    }
  }
  div:first-child {
    width: 100px;
    text-align: right;
  }
  div:last-child {
    margin-left: 10px;
  }
}
</style>

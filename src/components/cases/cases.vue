<template>
  <div class="cases">
    <el-tabs v-model="activeName">
      <el-tab-pane label="案例" name="first"></el-tab-pane>
    </el-tabs>
    <el-select @change="choseSelect" clearable size="small" v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-input size="small" class="serCh" v-model="serch" placeholder="名称"></el-input>
    <el-button @click="getInfo" size="small" type="primary">查询</el-button>
    <el-button @click="getInfo(1)" size="small" type="primary">主页案例</el-button>
    <el-button @click="addMsg" size="small" type="primary">+添加</el-button>
    <!-- table -->
    <el-table ref="singleTable" :data="list" highlight-current-row style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center">
        <template slot-scope="scope">
          {{scope.$index+(nowSize - 1) * pagesize + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="item_name" label="名称" max-width="70" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" max-width="180" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1">APP</span>
          <span v-if="scope.row.type === 2">网站</span>
          <span v-if="scope.row.type === 3">后台</span>
        </template>
      </el-table-column>
      <el-table-column prop="hour" label="时间" max-width="180" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.hour | toTimes}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="show" label="主页显示" max-width="180" align="center">
        <template slot-scope="scope">
          <el-button
            @click="show(scope.$index,0)"
            v-if="scope.row.show === 1"
            size="mini"
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-button
            @click="show(scope.$index,1)"
            v-if="scope.row.show === 0"
            size="mini"
            icon="el-icon-close"
            circle
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" max-width="180" label="操作">
        <template slot-scope="scope">
          <i @click="seeMsg(scope.$index)" class="el-icon-view" title="查看"></i>
          <i @click="changMsg(scope.$index)" class="el-icon-edit" title="编辑"></i>
          <i @click="delMsg(scope.$index)" class="el-icon-close" title="删除"></i>
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
    <j-model @CLOSE="CLOSE" v-if="model" :Ttxt='Ttxt'>
      <div class="slotDIV" slot="modelBody">
        <div class="completion-input-box">
          <span class="input-box-name">名称:</span>
          <input :disabled="disable" v-model="tabModel.item_name" type="text">
        </div>

        <div class="completion-input-box">
          <span class="input-box-name">类型:</span>
          <el-select
            :disabled="disable"
            class="w240"
            clearable
            size="small"
            v-model="tabModel.type"
            placeholder="选择类型"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="completion-input-box">
          <span class="input-box-name">时间:</span>
          <el-date-picker
            :disabled="disable"
            size="small"
            class="w240"
            v-model="tabModel.hour"
            type="date"
            value-format="timestamp"
            placeholder="选择日期"
          ></el-date-picker>
        </div>

        <div class="completions">
          <div>图片:</div>
          <input
            v-if="!disable"
            @change="upLoadImg($event,0)"
            style="margin-left:10px;"
            type="file"
          >
          <div>
            <img v-if="tabModel.img" :src="$url+tabModel.img" alt>
          </div>
        </div>

        <div class="completions">
          <div>详情:</div>
          <input
            v-if="!disable"
            @change="upLoadImg($event,1)"
            style="margin-left:10px;"
            type="file"
          >
          <div>
            <img v-if="tabModel.imgurl" :src="$url+tabModel.imgurl" alt>
          </div>
        </div>

        <div class="completion-input-box">
          <span class="input-box-name">简介:</span>
          <input :disabled="disable" v-model="tabModel.text" type="text">
        </div>

        <el-button v-if="!disable" @click="addModel()" class="ml" type="primary">确认</el-button>
      </div>
    </j-model>
  </div>
</template>

<script>
import {
  getCA,
  delCase,
  addCase,
  upload,
  upCase,
  upShow,
  getCase
} from "./../../utils/baseUrl.js";
import { toTime } from "./../../utils/tool.js";
import jnput from "./../common/tol/jinput";
import jModel from "./../common/model";
export default {
  name: "home",
  data() {
    return {
      activeName: "first",
      options: [
        {
          value: 1,
          label: "APP"
        },
        {
          value: 2,
          label: "网站"
        },
        {
          value: 3,
          label: "后台"
        }
      ],
      value: "",
      serch: "",
      list: [
        // {
        //     item_name: "好学app",
        //     type: 0,
        //     hour: "2018-2-3"
        // },
        // {
        //     item_name: "好学app",
        //     type: 0,
        //     hour: "2018-2-3"
        // },
        // {
        //     item_name: "好学app",
        //     type: 0,
        //     hour: "2018-2-3"
        // },
        // {
        //     item_name: "好学app",
        //     type: 0,
        //     hour: "2018-2-3"
        // },
        // {
        //     item_name: "好学app",
        //     type: 0,
        //     hour: "2018-2-3"
        // },
        // {
        //     item_name: "好学app",
        //     type: 0,
        //     hour: "2018-2-3"
        // },
        // {
        //     item_name: "好学app",
        //     type: 0,
        //     hour: "2018-2-3"
        // },
        // {
        //     item_name: "好学app",
        //     type: 0,
        //     hour: "2018-2-3"
        // }
      ],
      pagesize: 10,
      total: 0,
      nowSize: 1,
      model: false,
      tabModel: {},
      ss: "123",
      tear: "",
      disable: false,
      add: true, //分辨添加 或者 修改操作
      Ttxt:''
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo(res) {
      if (res === 1) {
        getCase().then(res => {
          
          if (res.data.code === 500) {
            this.list = [];
            this.total = 0;
            return;
          }
          this.list = res.data.data;
          this.total = res.data.data.length;
        });
        return;
      }

      let obj = {
        vague: this.serch,
        type: this.value,
        page_sizes: this.pagesize,
        page: this.nowSize
      };
      getCA(obj).then(res => {
        
        if (res.status === 200) {
          this.list = res.data.data.res;
          this.total = res.data.data.long;
        }
      });
    },
    upLoadImg(res, num) {
      let formdata = new FormData();
      formdata.append("image", res.target.files[0]);
      upload(formdata).then(res => {
        if (res.status === 200) {
          if (num === 0) {
            this.$set(this.tabModel, "img", res.data.data);
          } else {
            this.$set(this.tabModel, "imgurl", res.data.data);
          }
        }
      });
      // upload
    },
    //close model
    CLOSE() {
      this.model = !this.model;
    },
    wMsg() {
      this.model = !this.model;
    },
    //下拉搜索
    choseSelect() {
      this.getInfo();
    },
    addMsg() {
      this.CLOSE();
      this.tabModel = {};
      this.disable = false;
      this.add = true;
      this.Ttxt = '添加案例'
    },
    //修改 and 添加案例
    addModel() {
      if (!this.add) {
        let obj = JSON.parse(JSON.stringify(this.tabModel));
        obj.hour = String(obj.hour / 1000);
        upCase({
          data: JSON.stringify(obj),
          id: obj.id
        }).then(res => {
          if (res.status === 200) {
            this.getInfo();
            this.CLOSE();
            this.$DIY("修改成功");
          }
        });
        return;
      }
      let obj = JSON.parse(JSON.stringify(this.tabModel));
      obj.hour = String(obj.hour / 1000);
      addCase({ data: JSON.stringify(obj) }).then(res => {
        if (res.status === 200) {
          this.getInfo();
          this.CLOSE();
          this.$DIY("修改成功");
        }
      });
    },
    //查看MSG
    seeMsg(res) {
      this.CLOSE();
      this.tabModel = JSON.parse(JSON.stringify(this.list[res]));
      this.$set(this.tabModel, "hour", this.tabModel.hour * 1000);
      this.disable = true;
      this.Ttxt = '查看案例'
    },
    changMsg(res) {
      this.add = false;
      this.CLOSE();
      this.tabModel = JSON.parse(JSON.stringify(this.list[res]));
      this.$set(this.tabModel, "hour", this.tabModel.hour * 1000);
      this.disable = false;
      this.Ttxt = '编辑案例'
    },
    //删除信息
    delMsg(res) {
      this.$confirm("此操作将永久删除该案例, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        delCase({ id: this.list[res].id }).then(res => {
          if (res.status === 200) {
            this.$DIY("删除成功");
            this.getInfo();
          }
        })
      })
      .catch(res=>{
      })
    },
    //展示到主页的案例
    show(res, num) {
      upShow({
        id: this.list[res].id,
        show: num
      }).then(res => {
        this.$DIY(res.data.msg);
        this.getInfo();
      });
    },
    //分页
    changeSize(res) {
      this.nowSize = res;
      this.getInfo();
    }
  },
  components: {
    jModel,
    jnput
  },
  filters: {
    toTimes(val) {
      if (true) {
        return toTime(val, "y-m-d");
      }
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

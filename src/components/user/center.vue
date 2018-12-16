<template>
  <div class="center">
    <el-tabs v-model="activeName">
      <el-tab-pane label="个人中心" name="first"></el-tab-pane>
    </el-tabs>
    <div class="mt">
        <span>账号:</span>
        <el-input class="w200" v-model="list.user" ></el-input>
    </div>
    <div class="mt">
        <span>昵称:</span>
        <el-input class="w200" v-model="list.name" ></el-input>
    </div>
    <div class="mt">
        <span>修改密码:</span>
        <el-input class="w200" v-model="list.pass" type="password" ></el-input>
    </div>
     <el-button @click="changes" class="btn" type="primary">保存</el-button>
  </div>
</template>

<script>
import { upUser } from './../../utils/baseUrl.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
        activeName: "first",
        list:{}
    };
  },
  mounted() {
      this.list = JSON.parse(JSON.stringify(this.SETUSER))
  },
  methods: {
    changes() {
        if(  !this.list.pass ||
             this.list.pass === '' ||
             !this.list.name ||
             this.list.name === '' ||
             !this.list.user ||
             this.list.user === ''
            ){
                this.$DIY('请确认信息');
                return
            }
        let obj = {
            id:this.list.id,
            pwd:this.list.pass,
            user:this.list.user,
            name:this.list.name
        }
        upUser(obj)
        .then(res=>{
            if(res.status === 200){
                this.$DIY(res.data.msg)
                this.list.pass = ''
            }
        })
    }  
  },
  computed: {
      ...mapGetters(['SETUSER'])
  }
};
</script>

<style lang='less' scoped >
.w200{
    width:240px;
}
.mt{
    margin-top: 20px;
    span{
        display: inline-block;
        height:100%;
        line-height: 100%;
        width:100px;
        text-align: right;
        padding-right: 10px;
    }
}
.btn{
    margin:50px 0 0 180px;
}
</style>

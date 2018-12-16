<template>
  <div class="manage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="管理" name="first"></el-tab-pane>
    </el-tabs>
    <div class="manages">
        <div @click="showTo(item)" v-for="(item,index) in list" :key="index" class="details">
            {{item.item_name | fiveTxt}}
        </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getItemAdmin } from './../../utils/baseUrl.js'
export default {
  data() {
    return {
        activeName: "first",
        list:[]
    };
  },
  mounted() {
      console.log('888555')
      getItemAdmin()
      .then(res=>{
          if(res.status === 200){
              this.list = res.data.data;
          }
      })
  },
  methods: {
      ...mapMutations(['SHOWS']),
    showTo(res){
        this.SHOWS(res)
      setTimeout(()=>{
        this.$router.push('/page/shows')
      },50)
    }  
  },
  components: {},
  filters: {
      fiveTxt(val) {
          if(true){
              if(val.length > 5) return val.slice(0,5)+'...'
              return val
          }
      }
  }
};
</script>
<style lang='less' scoped >
.manage{
    .manages{
        height:calc(~"100% - 54px");
        overflow: auto;
        width:100%;
        .details{
            height:100px;
            width:100px;
            background:rgba(51, 50, 50, 0.493);
            border-radius: 6px;
            line-height: 100px;
            text-align:center;
            color:rgb(238, 229, 229);
            position: relative;
            cursor: pointer;
            float: left;
            margin:10px;
            &::before{
                content: '点击进入';
                display: block;
                height:100%;
                width:100%;
                position: absolute;
                left:0;
                top:0;
                opacity: 0;
                transition: all .3s linear;
                background: rgb(160, 152, 152);
                border-radius: 6px;
                color:white;
            }
            &:hover::before{
                opacity: 1;
            }
        }
    }
}
</style>

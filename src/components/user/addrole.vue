<template>
  <div class="addrole">
    <el-input
      size="small"
      class="serCh"
      v-model="serch"
      placeholder="账号"
    ></el-input>
    <el-button
      @click="addMsg"
      size="small"
      type="primary"
    >+添加</el-button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
        serch:'',
         tags: [
          { name: '标签一' },
          { name: '标签二'},
          { name: '标签三'},
          { name: '标签四'},
          { name: '标签五'}
        ]
    }
  },
  methods: {
    addMsg() {},
    close(res){
    }
  },
  components: {

  }
}
</script>

<style lang='less' scoped >
.serCh{
    width:200px;
}
</style>

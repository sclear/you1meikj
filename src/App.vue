<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html,body{
  height:100%;
}
#app {
  height:100%;
}
.el-table td, .el-table th{
  padding:5px 0;
}
/* .el-scrollbar__wrap {
    overflow-x: hidden;
  } */
</style>

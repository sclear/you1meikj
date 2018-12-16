<template>
  <div class="shows">
      <iframe class="ifame" :src="shows.url" frameborder="0"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  components: {

  },
  computed: {
    ...mapState(['shows'])
  },
  methods:{}
}
</script>

<style lang='less' scoped >
.shows{
    position: relative;
    .ifame{
        width:100%;
        height:100%;
    }
}
</style>

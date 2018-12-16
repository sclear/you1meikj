<template>
    <div class="page">
        <j-top></j-top>
        <!-- <j-bar class="bar"></j-bar> -->
        <div class="routerView">
            <j-bar class="bar"></j-bar>
            <router-view class="routers" :class="shows.url?'showsVisible':''" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import jBar from "./bar";
import jTop from "./top";
export default {
    name: "page",
    data() {
        return {};
    },
    components: {
        jBar,
        jTop
    },
    computed: {
        ...mapState(['shows'])
    }
};
</script>

<style lang='less' scoped >
// .page {
//     height: 100%;
//     .bar {
//         float: left;
//     }
//     .routerView {
//         height: 100%;
//         overflow: hidden;
//     }
// }
// .routers {
//     height:92vh;
//     padding: 15px 15px 15px 15px;
//     box-sizing: border-box;
// }
.showsVisible{
    padding:0 !important;
}
.page{
    height:100%;
    .routerView{
        height:92vh;
    }
}
.routerView{
    .bar{
        float: left;
    }
    .routers{
        overflow: hidden;
        height:92vh;
        padding: 15px 15px 15px 15px;
        box-sizing: border-box;
    }
}
</style>

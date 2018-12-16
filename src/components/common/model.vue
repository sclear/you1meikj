<template>
    <div class="model">
        <div class="content">
            <div class="content_head">
                <i @click="close" title="关闭" class="el-icon-d-arrow-right"></i>
                <span>{{Ttxt}}</span>
            </div>
            <div class="pd20">
                <slot name="modelBody"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props:{
        Ttxt:String
    },
    methods: {
        close() {
            this.$emit('CLOSE')
        }
    }
};
</script>

<style lang='less' scoped >
@keyframes modelVisible {
    0% {
        background-color: rgba(0, 0, 0, 0);
    }
    100% {
        background-color: rgba(0, 0, 0, 0.39);
    }
}
@keyframes bodyVisible {
    0% {
        // width: 0%;
        right:-60%;
    }
    100% {
        // width: 60%;
        right:0;
    }
}
.model {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 88;
    animation: modelVisible .3s linear forwards;
    .content {
        height: 100%;
        width:60%;
        position: absolute;
        right: -60%;
        top: 0;
        background: white;
        animation: bodyVisible .3s linear forwards;
        .content_head {
            width: 100%;
            height: 5%;
            line-height: 35px;
            border-bottom: 1px solid rgba(121, 115, 115, 0.363);
            padding-left: 15px;
        }
        i {
            cursor: pointer;
        }
        span {
            margin-left: 10px;
        }
    }
}
.pd20{
    height:95%;
    padding:20px;
    overflow: auto;
    padding-bottom: 100px !important;
}
i{
    cursor: pointer;
}
</style>

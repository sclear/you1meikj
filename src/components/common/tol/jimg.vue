<template>
    <div class="completions">
        <div>{{text}}:</div>
        <div>
            <img src="./../../../assets/login/bg.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ds:false
        };
    },
    props: ["text", "value"]
};
</script>

<style lang='less' scoped >
.completions{
    width:100%;
    overflow: hidden;
    div{
        float: left;
        img{
            max-width: 240px;
            max-height: 240px;
        }
    }
    div:first-child{
        width:100px;
        text-align: right;
    }
    div:last-child{
        font-size: 0;
        margin-left: 10px;
    }
}
</style>

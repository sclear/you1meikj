<template>
    <div class="completion-input-box">
        <span class="input-box-name">{{text}}:</span>
        <input :disabled='ds' type="text" ref="input" :value="value" @input="$emit('input', $event.target.value)">
    </div>
</template>

<script>
export default {
    data() {
        return {
            ds:false
        };
    },
    props: ["text", "value"],
    components: {}
};
</script>

<style lang='less' scoped >
.completion-input-box{
    width:100%;
    height:32px;
    overflow: hidden;
    span{
        display: inline-block;
        width:100px;
        text-align: right;
        font-size: 16px;
        padding-right: 5px;
    }
    input{
        width:240px;
        height:32px;
        border:1px solid #e4e7ed;
        outline: none;
        border-radius: 3px;
        box-sizing: border-box;
        padding-left: 5px;
    }
}
</style>

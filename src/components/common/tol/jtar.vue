<template>
    <div class="completionTextarea">
        <div>{{text}}:</div>
        <div>
            <textarea type="text" ref="input" :value="value" @input="$emit('input', $event.target.value)"></textarea>
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
.completionTextarea{
    width:100%;
    overflow: hidden;
    div{
        float: left;
        textarea{
            width: 240px;
            height:100px;
            resize: none;
        }
    }
    div:first-child{
        width:100px;
        text-align: right;
    }
    div:last-child{
        margin-left: 10px;
    }
}
</style>

//注册全局组件

import jInput from "./jinput.vue"
import jImg from "./jimg.vue"
import jTar from "./jtar.vue"
const jit = {
    install: function(Vue){
        Vue.component("jImg", jImg);
        Vue.component("jTar", jTar);
        Vue.component("jInput", jInput);
    }
}
export default jit

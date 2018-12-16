export default {
    state: {
        cont: 2
    },
    //mutation修改数据
    mutations: {
        icons(state, res) {
            console.log(res)
            state.cont++
        }
    },
    actions: {
        ASYNC(content, obj) {
            content.commit('icons', obj)
        }
    }
}

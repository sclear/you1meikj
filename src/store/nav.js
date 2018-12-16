export default {
    state: {
        conts: 2
    },
    mutations: {
        iconss(state, res) {
            console.log(res)
            state.conts++
        }
    },
    actions: {
        ASYNCs(content, obj) {
            content.commit('icons', obj)
        }
    }
}

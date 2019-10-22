const state = {
    count: 100
}

const actions = {
    
}

const mutations = {
    changeCount(state, payload){
        state.count = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
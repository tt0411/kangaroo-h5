import { createTheme, fetchUserTheme, fetchOpenTheme } from '../../api/theme'

const state = {
    userTheme: [],
    openTheme: []
}

const actions = {
    async createTheme({dispatch}, params) {
       const rsp = await createTheme(params); 
       if(rsp.code === 200) {
       }
       return rsp;
    },
    async fetchUserTheme({commit}) {
       const rsp = await fetchUserTheme()
       if(rsp.code === 200) {
           commit('changeUserTheme', rsp.data)
       }
       return rsp;
    },
    async fetchOpenTheme({commit}) {
        const rsp = await fetchOpenTheme();
        console.log(rsp)
        if(rsp.code === 200) {
            commit('changeOpenTheme', rsp.data)
        }
        return rsp;
    }
}

const mutations = {
    changeUserTheme(state, payload){
        state.userTheme = payload
    },
    changeOpenTheme(state, payload){
        state.openTheme = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
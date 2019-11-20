import { createTheme, fetchUserTheme, fetchOpenTheme, updateTheme, getThemeById, getThemeList } from '../../api/theme'

const state = {
    userTheme: [],
    openTheme: []
}

const actions = {
    async createTheme({dispatch}, params) {
       const rsp = await createTheme(params); 
       if(rsp.code === 200) {
           dispatch('fetchOpenTheme');
           dispatch('fetchUserTheme');
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
        if(rsp.code === 200) {
            commit('changeOpenTheme', rsp.data)
        }
        return rsp;
    },
    async updateTheme(_, params) {
        return  await updateTheme(params)
    },
    async getThemeById(_, id) {
        return  await getThemeById(id)
    },
    async getThemeList(_) {
        return await getThemeList()
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
import { login, register, resetPwd } from '../../api/global'
import { logout, getInfo, updateAvater, updateGender, updateNickname, updatePwd } from '../../api/user'

const state = {
    userInfo: {
        id: '',
        phone: '',
        password: '',
        nickName: '',
        age: '',
        gender: '',
        imgUrl: '',
        status: '',
        flag: '',
        active: '',
        type: '',
        update_time: '',
        create_time: '' 
    }
}

const actions = {
    async login( _ , params) {
        return await login(params); 
    },
    async register( _ , params) {
        return await register(params);
    },
    async logout({commit}) {
        const rsp = await logout();
        if(rsp.code === 200){
            commit('changeInfo', {})
        }
       return rsp;  
    },
    async resetPwd( _ , params) {
        return await resetPwd(params);
    },
    async getInfo({commit}) {
        const rsp = await getInfo();
        console.log(rsp)
        if(rsp.code === 200){
            commit('changeInfo', rsp.data)
        }
        return rsp;
    },
    async updateAvater( {dispatch} , params) {
        const rsp = await updateAvater(params);
        if(rsp.code === 200){
            dispatch('getInfo')
        }
        return rsp;
    },
    async updateNickname( {dispatch} , params) {
        const rsp = await updateNickname(params)
        if(rsp.code === 200){
            dispatch('getInfo')
        }
        return rsp;
    },
    async updateGender( {dispatch} , params) {
        const rsp = await updateGender(params)
        if(rsp.code === 200) {
            dispatch('getInfo')
        }
        return rsp;
    },
    async updatePwd(_, params) {
        return await updatePwd(params)
    },
}

const mutations = {
    changeInfo(state, payload){
        state.userInfo = payload
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
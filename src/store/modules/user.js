import { login, register, resetPwd } from '../../api/global'
import { logout, getInfo } from '../../api/user'

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
        if(rsp.code === "200"){
            commit('changeInfo', rsp.data)
        }
        return rsp;
    }
}

const mutations = {
    changeInfo(state, payload){
        state.userInfo = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
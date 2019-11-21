import { createContent } from '../../api/content'

const state = {
    sendData: {
        context: '',
        theme: '',
        tid: null,
        is_comment: false,
        isOpen: false,
    },
}

const actions = {
   async createContent(_, params) {
       return await createContent(params)
   }
}

const mutations = {
    changeSendData(state, payload) {
        state.sendData = payload
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
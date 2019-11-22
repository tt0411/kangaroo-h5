import { createContent, getOpencontentByTid, getMycontentByTid, getAllOpenContent, getMyMarkContent, getMySaveContent } from '../../api/content'

const state = {
    sendData: {
        context: '',
        theme: '',
        tid: null,
        is_comment: false,
        isOpen: false,
    },
    contentList: []
}

const actions = {
   async createContent(_, params) {
       return await createContent(params)
   },
   async getOpencontentByTid({commit}, tid) {
       const rsp =await getOpencontentByTid(tid)
       if(rsp.code === 200) {
         commit('changeContentList', rsp.list)
       }
       return rsp;
   },
   async getMycontentByTid({commit}, tid) {
       const rsp =await getMycontentByTid(tid)
       if(rsp.code === 200) {
        commit('changeContentList', rsp.list)
    }
    return rsp;
   },
   async getAllOpenContent(_, limitCount) {
       return await getAllOpenContent(limitCount)
   },
   async getMyMarkContent(_) {
       return await getMyMarkContent()
   },
   async getMySaveContent(_) {
       return await getMySaveContent()
   }
}

const mutations = {
    changeSendData(state, payload) {
        state.sendData = payload
    },
    changeContentList(state, payload) {
        state.contentList = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
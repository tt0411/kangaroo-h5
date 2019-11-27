import { createContent, getOpencontentByTid, getMycontentByTid, getAllOpenContent, getMyMarkContent, getMySaveContent, getContentById, getCommentById, getMarkById,getSaveById, addComment, isMarkContent,isSaveContent } from '../../api/content'

const state = {
    sendData: {
        context: '',
        theme: '',
        tid: null,
        is_comment: false,
        isOpen: false,
    },
    contentList: [],
    content_id: null,
    is_comment: true,
    saveList: [],
    markList: [],
    commentList: [],
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
   },
   async getContentById(_, id) {
       return await getContentById(id)
   },
   async getCommentById({commit}, id) {
       let rsp = await getCommentById(id) 
       if(rsp.code === 200) {
           commit('changeCommentList', rsp.list)
       }
       return rsp;
   },
   async getMarkById({commit}, id) {
       let rsp = await getMarkById(id)
       if(rsp.code === 200) {
           commit('changeMarkList', rsp.list)
       }
       return rsp
   },
   async getSaveById({commit}, id) {
       let rsp = await getSaveById(id)
       if(rsp.code === 200) {
           commit('changeSaveList', rsp.list)
       }
       return rsp;
   },
   async addComment(_, params) {
      return await addComment(params)
   },
   async isMarkContent(_, params) {
       return await isMarkContent(params)
   },
   async isSaveContent(_, params) {
       return await isSaveContent(params)
   }
}

const mutations = {
    changeSendData(state, payload) {
        state.sendData = payload
    },
    changeContentList(state, payload) {
        state.contentList = payload
    },
    changeContentId(state, payload) {
        state.content_id = payload
    },
    changeIsComment(state, payload) {
        state.is_comment = payload == 0 ? true : false
    },
    changeCommentList(state, payload) {
        state.commentList = payload
    },
    changeMarkList(state, payload) {
        state.markList = payload
    },
    changeSaveList(state, payload) {
        state.saveList = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
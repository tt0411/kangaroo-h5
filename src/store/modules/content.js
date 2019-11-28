import { createContent, getOpencontentByTid, getMycontentByTid, getAllOpenContent, getMyMarkContent, getMySaveContent, getContentById, getCommentById, getMarkById,getSaveById, addComment, isMarkContent,isSaveContent, markSign, saveSign, getcontentCountByUid, getSaveByUid, getMarkByUid, isDelContent } from '../../api/content'

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
    saveCount: 0,
    markCount: 0,
    commentCount: 0,
    isMark: false,
    isSave: false,
    authorId: null,
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
           commit('changeCommentList', rsp)
       }
       return rsp;
   },
   async getMarkById({commit}, id) {
       let rsp = await getMarkById(id)
       if(rsp.code === 200) {
           commit('changeMarkList', rsp)
       }
       return rsp
   },
   async getSaveById({commit}, id) {
       let rsp = await getSaveById(id)
       if(rsp.code === 200) {
           commit('changeSaveList', rsp)
       }
       return rsp;
   },
   async addComment({dispatch,state}, params) {
    await dispatch('getCommentById',state.content_id) 
      return await addComment(params)
   },
   async isMarkContent({dispatch,state}, params) {
       await dispatch('getMarkById',state.content_id) 
       return await isMarkContent(params)
        
   },
   async isSaveContent({dispatch,state}, params) {
      await dispatch('getSaveById', state.content_id)
       return await isSaveContent(params)
   },
   async markSign({commit}, cid) {
       let rsp = await markSign(cid)
       if(rsp.code === 200) {
            commit('isMark', rsp.sign)
       }
       return rsp;
   },
   async saveSign({commit}, cid) {
       let rsp = await saveSign(cid)
       if(rsp.code === 200) {
           commit('isSave', rsp.sign)
       }
       return rsp;
   },
   async getcontentCountByUid(_) {
       return await getcontentCountByUid()
   },
   async getSaveByUid(_) {
       return await getSaveByUid()
   },
   async getMarkByUid(_) {
       return await getMarkByUid()
   },
   async isDelContent(_, params) {
       return await isDelContent(params)
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
        state.commentList = payload.list
        state.commentCount = payload.count
    },
    changeMarkList(state, payload) {
        state.markList = payload.list
        state.markCount = payload.count
    },
    changeSaveList(state, payload) {
        state.saveList = payload.list
        state.saveCount = payload.count
    },
    isMark(state, payload) {
        state.isMark = payload
    },
    isSave(state, payload) {
        state.isSave = payload
    },
    changeAuthorId(state, payload) {
        state.authorId = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
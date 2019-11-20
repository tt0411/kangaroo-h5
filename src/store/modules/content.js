import { createContent } from '../../api/content'

const state = {
    
}

const actions = {
   async createContent(_, params) {
       return await createContent(params)
   }
}

const mutations = {
    
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
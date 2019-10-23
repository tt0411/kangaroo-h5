import Vue from 'vue'
import Vuex from 'vuex'
import count from './modules/count'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    count,
    global
  }
})

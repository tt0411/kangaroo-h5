import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import theme from './modules/theme'
import content from './modules/content'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    theme,
    content
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flag: true
  },
  mutations: {
    setToken: (state, val) => {
      Object.assign(state, { flag: val })
    }
  },
  actions: {
    setToken({ commit }, val) {
      commit('setToken', val)
    }
  }
})

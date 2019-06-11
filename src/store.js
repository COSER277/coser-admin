import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {
  IS_ADMIN_WRAP,
} from './mutation-type'

export default new Vuex.Store({
  state: {
    IS_ADMIN_WRAP: false,
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  getters: {
    isAdminWrap(state) {
      return state.IS_ADMIN_WRAP
    },
  },

  mutations: {
    [IS_ADMIN_WRAP](state, data) {
      state.IS_ADMIN_WRAP = data
    },
    //
    changLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization)
    },
    Logout() {
      localStorage.removeItem('Authorization')
    }
  },
  actions: {
    changLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization)
    }
  }
})

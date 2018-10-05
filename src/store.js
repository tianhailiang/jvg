import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/api'
import login from './api/login'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login: login,
    api: api
  }
})
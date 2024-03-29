
const modulea = {
  token: ''
}
export default {
  state: { 
    token: ''
  },
  mutations: { 
    set_token (state, token) {
      state.token = token
      sessionStorage.token = token
    },
    del_token (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    }
  },
  action: {
    settoken ({ commit }, token) {
      commit(type.set_token, token)
    }
  }
}

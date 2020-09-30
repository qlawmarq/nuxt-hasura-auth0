export const state = () => ({
  isAuthenticated: false,
  user: {},
  token: '',
  idToken: ''
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = !!payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  setIdToken(state, payload) {
    state.idToken = payload
  }
}

export const getters = {
  isUserLoggedIn: (state) => {
    return state.isAuthenticated
  },
  user: (state) => {
    return state.user
  },
  tokens: (state) => {
    return {
      token: state.token,
      idToken: state.idToken
    }
  },
  userRole: (state) => {
    if (state.user.user_roles) {
      return state.user.user_roles.id
    } else {
      return null
    }
  }
}

export const actions = {
  setUserInfo({ commit }, payload) {
    if (payload.user !== undefined) {
      commit('setUser', payload.user)
    }
    if (payload.isAuthenticated !== undefined) {
      commit('setIsAuthenticated', payload.isAuthenticated)
    }
    if (payload.token !== undefined) {
      commit('setToken', payload.token)
    }
    if (payload.idToken !== undefined) {
      commit('setIdToken', payload.idToken)
    }
  }
}

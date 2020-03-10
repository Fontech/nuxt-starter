const ACCESS_TOKEN_COOKIE_NAME = 'token'

export default {
  state: {
    accessToken: null
  },
  getters: {
    isGuest ({ accessToken }) {
      return !accessToken
    }
  },
  mutations: {
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    }
  },
  actions: {
    getAccessTokenFromCookie () {
      return this.$cookies.get(ACCESS_TOKEN_COOKIE_NAME)
    },
    removeAccessToken ({ commit }) {
      commit('setAccessToken', null)

      this.$cookies.remove(ACCESS_TOKEN_COOKIE_NAME)
    },
    setAccessTokenFromResponse ({ commit }, { accessToken }) {
      if (!accessToken) {
        return
      }

      commit('setAccessToken', accessToken)

      this.$cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    }
  }
}

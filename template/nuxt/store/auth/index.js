const ACCESS_TOKEN_COOKIE_NAME = 'token'

const runTransition = async () => {
  if (process.server) {
    return
  }

  try {
    await window.$nuxt.$modal.close()
  } catch {
    // maybe there is no modal opened
  }

  window.$nuxt.$loading.start()
  document.location.reload()
}

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
    },
    async login ({ dispatch }, { email, password, provider, accessToken }) {
      const response = await this.$resources.auth.login({ email, password, provider, accessToken })

      await dispatch('setAccessTokenFromResponse', response)
      await runTransition()
    },
    async logout ({ dispatch }) {
      await this.$resources.auth.logout()
      await dispatch('removeAccessToken')
      await runTransition()
    },
  }
}

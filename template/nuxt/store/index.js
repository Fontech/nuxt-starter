export default {
  actions: {
    async nuxtServerInit ({ commit, dispatch }, { req }) {
      const accessToken = await dispatch('auth/getAccessTokenFromCookie')

      if (!accessToken) {
        return
      }

      commit('auth/setAccessToken', accessToken)
    }
  }
}

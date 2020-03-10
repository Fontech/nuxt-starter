import transformLoginResponse from '~/libs/transformers/auth/login/response'

export default {
  async login ({ email, password }) {
    const response = await this.$api('AUTH_LOGIN', { email, password })

    return transformLoginResponse(response)
  },
  async logout () {
    try {
      await this.$api('AUTH_LOGOUT')
    } catch (error) {
      // let logout always success
    }
  }
}

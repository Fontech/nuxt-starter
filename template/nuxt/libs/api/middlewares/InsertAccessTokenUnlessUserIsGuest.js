import Base from './Base'

export default class InsertAccessTokenUnlessUserIsGuest extends Base {
  handle (config, next) {
    const { store } = this.context

    if (!store.getters['auth/isGuest']) {
      config.data.api_token = store.state.auth.accessToken
    }

    return next(config)
  }
}

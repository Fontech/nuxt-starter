import Base from './Base'

export default class SetDefaultContentTypeToApplicationJson extends Base {
  handle (config, next) {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }

    return next(config)
  }
}

import AxiosConfigBuilder from './AxiosConfigBuilder'
import MockedAxiosConfigBuilder from './MockedAxiosConfigBuilder'

export default class AxiosConfigBuilderFactory {
  constructor (app) {
    this.app = app
  }

  create () {
    if (this.app.context.env.USE_MOCK_API) {
      return new MockedAxiosConfigBuilder()
    }

    return new AxiosConfigBuilder()
  }
}

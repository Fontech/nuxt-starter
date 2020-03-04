import AxiosConfigBuilder from './AxiosConfigBuilder'

export default class MockedAxiosConfigBuilder extends AxiosConfigBuilder {
  buildPath (path) {
    return path
  }
}

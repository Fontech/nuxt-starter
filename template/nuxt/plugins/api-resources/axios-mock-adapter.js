import AxiosMockAdapter from 'axios-mock-adapter'
import apiDefinitions from '~/definitions/api'

class AxiosMockAdapterProxy {
  constructor (axiosMockAdapter) {
    this.axiosMockAdapter = axiosMockAdapter
  }
  mock (definitions) {
    const { method, path, response } = definitions
    const onWhichMethod = `on${method.replace(/^(.)/, match => match.toUpperCase())}`
    this.mockAdapter[onWhichMethod](path).reply(200, response)
  }
}

export default ({ $axios, app }) => {
  if (!app.context.env.USE_MOCK_API) {
    return
  }
  const axiosMockAdapter = new AxiosMockAdapter($axios)
  const axiosMockAdapterProxy = new AxiosMockAdapterProxy(axiosMockAdapter)
  for (const action in apiDefinitions) {
    axiosMockAdapterProxy.mock(apiDefinitions[action])
  }
}

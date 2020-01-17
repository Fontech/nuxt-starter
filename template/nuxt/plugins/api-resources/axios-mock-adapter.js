import MockAdapter from 'axios-mock-adapter'
import apiDefinitions from '~/definitions/api'

class ActionAdapter {
  constructor (definitions, mockAdapter) {
    this.definitions = definitions
    this.mockAdapter = mockAdapter
  }
  convertPathVariablesToOne (path) {
    return path.replace(/{(\w+?)}/g, '1')
  }
  mock (action) {
    const { method, path, response } = this.definitions[action]
    const onWhichMethod = `on${method[0].toUpperCase() + method.slice(1).toLowerCase()}`
    const mockedPath = this.convertPathVariablesToOne(path)
    this.mockAdapter[onWhichMethod](mockedPath).reply(200, response)
  }
}

export default ({ $axios, app }) => {
  if (app.context.env.useMockApi) {
    const mockAdapter = new MockAdapter($axios)
    const actionAdapter = new ActionAdapter(apiDefinitions, mockAdapter)
    for (const action in apiDefinitions) {
      actionAdapter.mock(action)
    }
  }
}

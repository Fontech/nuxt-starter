import MockAdapter from 'axios-mock-adapter'
import apiDefinitions from '~/definitions/api'

class ActionDecorator {
  constructor (definitions, mockAdapter) {
    this.definitions = definitions
    this.mockAdapter = mockAdapter
  }
  mock (action) {
    const { method, path, response } = this.definitions[action]
    const onWhichMethod = `on${method.replace(/^(.)/, match => match.toUpperCase())}`
    this.mockAdapter[onWhichMethod](path).reply(200, response)
  }
}

export default ({ $axios, app }) => {
  if (!app.context.env.USE_MOCK_API) {
    return null
  }
  const mockAdapter = new MockAdapter($axios)
  const actionDecorator = new ActionDecorator(apiDefinitions, mockAdapter)
  for (const action in apiDefinitions) {
    actionDecorator.mock(action)
  }
}

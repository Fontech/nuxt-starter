import MockAdapter from 'axios-mock-adapter'

export default ({ $axios, app }) => {
  if (app.context.env.useMockApi) {
    const mock = new MockAdapter($axios)
    mock.onPost('/event/index').reply(200, { data: [1, 2, 3] })
  }
}

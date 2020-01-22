import apiDefinitions from '~/definitions/api'

class AxiosConfig {
  buildRequestItems (definitions, requestItems) {
    const result = {}
    for (const key in definitions) {
      const { required, default: defaultValue } = definitions[key]
      const value = requestItems[key] || defaultValue

      if (value) {
        result[key] = value
        continue
      }
      if (required) {
        throw new Error(`${key} is required.`)
      }
    }
    return result
  }
  buildPath (path) {
    return path.replace(/{(\w+?)}/g, (match, key) => this.requestItems[key])
  }
  build (definitions, requestItems) {
    const { method, path, headers, params, data } = definitions
    return {
      method,
      url: this.buildPath(path),
      params: this.buildRequestItems(params, requestItems),
      headers: this.buildRequestItems(headers, requestItems),
      data: this.buildRequestItems(data, requestItems)
    }
  }
}

class MockedAxiosConfig extends AxiosConfig {
  buildPath (path) {
    return path
  }
}

function createAxiosConfig (app) {
  if (app.context.env.USE_MOCK_API) {
    return new MockedAxiosConfig()
  }

  return new AxiosConfig()
}

export default function ({ $axios, app }, inject) {
  const api = (action, requestItems) => {
    const definitions = apiDefinitions[action]
    if (!definitions) {
      throw new Error(`API "${action}" not found!`)
    }
    const axiosConfig = createAxiosConfig(app)
    return $axios.$request({ ...axiosConfig.build(definitions, requestItems) })
  }
  inject('api', api)
}

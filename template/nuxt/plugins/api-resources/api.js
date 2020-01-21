import apiDefinitions from '~/definitions/api'

class AxiosConfig {
  constructor (definitions, requestItems) {
    this.definitions = definitions
    this.requestItems = requestItems
  }
  buildRequestItems (definitions) {
    const result = {}
    for (const key in definitions) {
      const { required, default: defaultValue } = definitions[key]
      const value = this.requestItems[key] || defaultValue

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
  build () {
    const { method, path, headers, params, data } = this.definitions
    return {
      method,
      url: this.buildPath(path),
      params: this.buildRequestItems(params),
      headers: this.buildRequestItems(headers),
      data: this.buildRequestItems(data)
    }
  }
}

class MockedAxiosConfig extends AxiosConfig {
  buildPath (path) {
    return path
  }
}

class ConfigMaker {
  constructor (definitions, requestItems) {
    this.definitions = definitions
    this.requestItems = requestItems
  }
  createAxiosConfig (type) {
    switch (type) {
      case 'use-mock-api':
        return new MockedAxiosConfig(this.definitions, this.requestItems)
      default:
        return new AxiosConfig(this.definitions, this.requestItems)
    }
  }
}

export default function ({ $axios, app }, inject) {
  const api = (action, requestItems) => {
    const definitions = apiDefinitions[action]
    if (!definitions) {
      throw new Error(`API "${action}" not found!`)
    }
    const configMaker = new ConfigMaker(definitions, requestItems)
    const type = app.context.env.USE_MOCK_API && 'use-mock-api'
    const axiosConfig = configMaker.createAxiosConfig(type)
    return $axios.$request({ ...axiosConfig.build() })
  }
  inject('api', api)
}

import apiDefinitions from '~/definitions/api'

class AxiosConfig {
  constructor (definition, requestItems) {
    this.definition = definition
    this.requestItems = requestItems
  }
  buildData (data) {
    return Object.keys(data).reduce((result, key) => {
      const { default: defaultValue, required } = data[key]
      const value = this.requestItems[key];
      (value || required) && (result[key] = value || defaultValue)
      return result
    }, {})
  }
  buildPath (path) {
    return path.replace(/{(\w+?)}/g, (match, key) => this.requestItems[key])
  }
  build () {
    const { method, path, headers, params, data } = this.definition
    return {
      method,
      path: this.buildPath(path),
      params: this.buildData(params),
      headers: this.buildData(headers),
      data: this.buildData(data)
    }
  }
}

export default function ({ $axios }, inject) {
  const api = (action, requestItems) => {
    const definition = apiDefinitions[action]
    if (!definition) {
      throw new Error(`API "${action}" not found!`)
    }
    const { method, path, headers, data, params } = new AxiosConfig(definition, requestItems).build()
    return $axios.$request({ url: path, data, method, headers, params })
  }
  inject('api', api)
}

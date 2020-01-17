import apiDefinitions from '~/definitions/api'

class AxiosConfig {
  constructor (definition, requestItems) {
    this.definition = definition
    this.requestItems = requestItems
  }
  getRequestValue (key) {
    return this.requestItems[key]
  }
  isSetValueToData (key, data) {
    const { required } = data[key]
    return this.getRequestValue(key) || required
  }
  buildData (data) {
    return Object.keys(data).reduce((result, key) => {
      const { default: defaultValue } = data[key]
      this.isSetValueToData(key, data) && (result[key] = this.getRequestValue(key) || defaultValue)
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
      url: this.buildPath(path),
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
    const axiosConfig = new AxiosConfig(definition, requestItems)
    return $axios.$request({ ...axiosConfig.build() })
  }
  inject('api', api)
}

import apiDefinitions from '~/definitions/api'

class AxiosConfig {
  constructor (requestItems) {
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
}

const buildAxiosConfig = (definition, requestItems) => {
  const { method, path, headers, params, data } = definition
  const axiosConfig = new AxiosConfig(requestItems)
  return {
    method,
    path: axiosConfig.buildPath(path),
    params: axiosConfig.buildData(params),
    headers: axiosConfig.buildData(headers),
    data: axiosConfig.buildData(data)
  }
}

export default function ({ $axios }, inject) {
  const api = (action, requestItems) => {
    const definition = apiDefinitions[action]
    if (!definition) {
      throw new Error(`API "${action}" not found!`)
    }
    const { method, path, headers, data, params } = buildAxiosConfig(definition, requestItems)
    return $axios.$request({ url: path, data, method, headers, params })
  }
  inject('api', api)
}

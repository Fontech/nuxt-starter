import apiDefinitions from '~/definitions/api'

class AxiosConfig {
  constructor (configs) {
    this.configs = configs
  }
  buildData (data) {
    return Object.keys(data).reduce((result, key) => {
      const { default: defaultValue, required } = data[key]
      const value = this.configs[key];
      (value || required) && (result[key] = value || defaultValue)
      return result
    }, {})
  }
  buildPath (path) {
    return path.replace(/{(\w+?)}/g, (match, key) => this.configs[key])
  }
}

const buildAxiosConfig = (definition, configs) => {
  const { method, path, headers, params, data } = definition
  const axiosConfig = new AxiosConfig(configs)
  return {
    method,
    path: axiosConfig.buildPath(path),
    params: axiosConfig.buildData(params),
    headers: axiosConfig.buildData(headers),
    data: axiosConfig.buildData(data)
  }
}

export default function ({ $axios }, inject) {
  const api = (action, configs) => {
    const definition = apiDefinitions[action]
    if (!definition) {
      throw new Error(`API "${action}" not found!`)
    }
    const { method, path, headers, data, params } = buildAxiosConfig(definition, configs)
    return $axios.$request({ url: path, data, method, headers, params })
  }
  inject('api', api)
}

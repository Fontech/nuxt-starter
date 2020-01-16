import apiConfigs from './api-configs'

class Parser {
  constructor (configs) {
    this.configs = configs
  }
  parse (data) {
    return Object.keys(data).reduce((result, key) => {
      const { default: defaultValue, required } = data[key]
      const value = this.configs[key]
      if (value || required) {
        result[key] = value || defaultValue
      }
      return result
    }, {})
  }
  parsePath (path) {
    return path.replace(/{(\w+?)}/g, (keyWithBlock) => {
      const key = keyWithBlock.match(/([a-z]+)/g)[0]
      return this.configs[key]
    })
  }
}

const mergeConfig = (apiConfig, configs) => {
  const { method, path, headers, params, data } = apiConfig
  const parser = new Parser(configs)
  return {
    method,
    path: parser.parsePath(path),
    params: parser.parse(params),
    headers: parser.parse(headers),
    data: parser.parse(data)
  }
}

export default function ({ $axios }, inject) {
  const api = async (action, configs) => {
    const apiConfig = apiConfigs[action]
    if (!apiConfig) {
      throw new Error(`API "${action}" not found!`)
    }
    const { method, path, headers, data, params } = mergeConfig(apiConfig, configs)
    try {
      return await $axios.$request({ url: path, data, method, headers, params })
    } catch (error) {
      throw new Error(error)
    }
  }
  inject('api', api)
}

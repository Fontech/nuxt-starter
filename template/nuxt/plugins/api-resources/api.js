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
  parseQuery (data) {
    return Object.keys(data).reduce((result, key) => {
      const { default: defaultValue, required } = data[key]
      const value = this.configs[key]
      if (!required && !value) {
        return result
      }
      return `${result}${result ? '&' : '?'}${key}=${value || defaultValue}`
    }, '')
  }
}

const mergeConfig = (apiConfig, configs) => {
  const { method, path, headers, query, params } = apiConfig
  const parser = new Parser(configs)
  return {
    method,
    path: path + parser.parseQuery(query),
    headers: parser.parse(headers),
    params: parser.parse(params)
  }
}

export default function ({ $axios }, inject) {
  const api = async (action, configs) => {
    const apiConfig = apiConfigs[action]
    if (!apiConfig) {
      throw new Error(`API "${action}" not found!`)
    }
    const { method, path, headers, params } = mergeConfig(apiConfig, configs)
    try {
      return await $axios.$request({ url: path, data: params, method, headers })
    } catch (error) {
      throw new Error(error)
    }
  }
  inject('api', api)
}

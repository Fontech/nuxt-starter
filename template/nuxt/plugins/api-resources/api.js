import apiDefinitions from '~/definitions/api'

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

const buildAxiosConfig = (apiConfig, configs) => {
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
  const api = (action, data) => {
    const definition = apiDefinitions[action]
    if (!definition) {
      throw new Error(`API "${action}" not found!`)
    }
    const { method, path, headers, data: axiosData, params } = buildAxiosConfig(definition, data)
    return $axios.$request({ url: path, data: axiosData, method, headers, params })
  }
  inject('api', api)
}

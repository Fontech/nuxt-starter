const getResource = (action) => {
  const [model, method] = action.toLowerCase().split('_')
  if (!model || !method) {
    return null
  }
  try {
    return require(`~/static/apis/${model}/${method}`)
  } catch (error) {
    return null
  }
}

class Parser {
  constructor (configs) {
    this.configs = configs
  }
  parse (data, type) {
    const isParseToQuery = type === 'query'
    return Object.keys(data).reduce((result, key) => {
      const { default: defaultValue, required } = data[key]
      const value = this.configs[key]
      if ((value || required) && !isParseToQuery) {
        result[key] = value || defaultValue
      }
      return isParseToQuery ? `${result}${result ? '&' : '?'}${key}=${value || defaultValue}` : result
    }, isParseToQuery ? '' : {})
  }
}

const transResource = (resource, configs) => {
  const { method, path, headers, query, params } = resource
  const parser = new Parser(configs)
  return {
    method,
    path: path + parser.parse(query, 'query'),
    headers: parser.parse(headers),
    params: parser.parse(params)
  }
}

export default function ({ $axios }, inject) {
  const api = async (action, configs) => {
    const resource = getResource(action)
    if (!resource) {
      throw new Error('Resource not found!')
    }
    const { method, path, headers, params } = transResource(resource, configs)
    try {
      return await $axios(path, { data: params, method, headers })
    } catch (error) {
      throw new Error(error)
    }
  }
  inject('api', api)
}

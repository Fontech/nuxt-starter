export default class AxiosConfigBuilder {
  buildRequestItems (definitions, requestItems) {
    const result = {}

    for (const key in definitions) {
      const { required } = definitions[key]
      const value = requestItems[key]
      const valueIsEmpty = value === undefined

      if (required && valueIsEmpty) {
        throw new Error(`${key} is required.`)
      }

      if (valueIsEmpty) {
        continue
      }

      result[key] = value
    }

    return result
  }

  buildPath (path, requestItems) {
    return path.replace(/{(\w+?)}/g, (match, key) => requestItems[key])
  }

  build (definitions, requestItems) {
    const { method, path, headers, params, data } = definitions
    const config = {
      method,
      url: this.buildPath(path, requestItems),
      params: this.buildRequestItems(params, requestItems),
      headers: this.buildRequestItems(headers, requestItems),
      data: this.buildRequestItems(data, requestItems)
    }
    return config
  }
}

import Container from '~/libs/Container'

export const debug = (...args) => {
  if (!process.env.DEBUG) {
    return
  }

  // eslint-disable-next-line
  console.debug(...args)
}

export const app = (name = null) => {
  const container = Container.getInstance()

  if (!name) {
    return container
  }

  return container.resolve(name)
}

export const url = (path = '') => {
  return app('url').to(path)
}

export const route = (name, params = {}) => {
  return app('url').route(name, params)
}

export const asset = (path = '') => {
  return app('url').asset(path)
}

export const isObject = (value) => {
  return value && typeof value === 'object' && value.constructor.name === 'Object'
}

export const mapKeys = (items, callback) => {
  const itemsIsObject = isObject(items)
  const itemsIsArray = Array.isArray(items)

  if (!itemsIsObject && !itemsIsArray) {
    return items
  }

  items = items.mapWithKeys((value, key) => {
    return { [callback(key.toString())]: mapKeys(value, callback) }
  })

  return itemsIsArray ? items.values() : items
}

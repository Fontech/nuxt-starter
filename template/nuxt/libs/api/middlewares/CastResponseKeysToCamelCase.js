import Base from './Base'
import { mapKeys } from '~/libs/helpers'

const castKeysToCamelCase = (items) => {
  return mapKeys(items, key => key.camel())
}

export default class CastResponseKeysToCamelCase extends Base {
  async handle (config, next) {
    const response = await next(config)
    const camelCaseResponse = castKeysToCamelCase(response)

    return camelCaseResponse
  }
}

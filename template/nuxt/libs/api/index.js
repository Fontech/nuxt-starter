import sendRequest from './sendRequest'
import apiDefinitions from './definitions.json'
import AxiosConfigBuilderFactory from './AxiosConfigBuilderFactory'
import { mapKeys } from '~/libs/helpers'

const castKeysToSnakeCase = (items) => {
  return mapKeys(items, key => key.snake())
}

export default context => (action, requestItems = {}) => {
  const { app } = context
  const definitions = apiDefinitions[action]

  if (!definitions) {
    throw new Error(`API "${action}" not found!`)
  }

  const snakeCaseRequestItem = castKeysToSnakeCase(requestItems)
  const axiosConfigBuilder = (new AxiosConfigBuilderFactory(app)).create()
  const axiosConfig = axiosConfigBuilder.build(definitions, snakeCaseRequestItem)

  return sendRequest(context, axiosConfig)
}

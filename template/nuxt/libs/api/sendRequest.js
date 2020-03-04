import middlewares from './middlewares'
import ErrorHandler from './ErrorHandler'
import Pipeline from '~/libs/Pipeline'

export default (context, config) => {
  const { $axios } = context

  return (new Pipeline(context))
    .send(config)
    .through(middlewares)
    .then(async (config) => {
      try {
        return await $axios.$request(config)
      } catch (e) {
        e.request = config

        await (new ErrorHandler(context)).handle(e)
      }
    })
}

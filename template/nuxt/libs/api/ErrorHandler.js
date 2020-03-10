import { SnackbarProgrammatic as Snackbar } from 'buefy'
import { debug } from '~/libs/helpers'

const getErrorMessage = ({ message }) => {
  if (!message) {
    return
  }

  if (Array.isArray(message)) {
    return message[0]
  }

  return message
}

const getErrorI18nKey = (response) => {
  const message = getErrorMessage(response)
  const key = message.replace(/\./g, '').camel()

  return `error.${key}`
}

export default class ErrorHandler {
  constructor (context) {
    this.context = context
  }

  async handle (e) {
    const { request, response = {} } = e

    debug('==================== Request Error ====================')
    debug('Message:', `${response.status} ${response.statusText}`)
    debug('Request:', request)
    debug('Response:', response.data)
    debug('=======================================================')

    const { store } = this.context

    if (!store.getters['auth/isGuest'] && response.status === 401) {
      const { redirect } = this.context

      await store.dispatch('auth/removeAccessToken')

      return redirect('/?modal=login')
    }

    if (process.client) {
      const i18n = this.context.app.i18n
      const i18nKey = getErrorI18nKey(response.data)
      const message = i18n.t(i18nKey) || e.toString()

      Snackbar.open({
        message,
        duration: 5000,
        type: 'is-danger',
        position: 'is-top',
        actionText: 'X'
      })
    }

    throw e
  }
}

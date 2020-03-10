import { Helpers } from '@unisharp/helpers.js'
import { url, asset } from '~/libs/helpers'

export default function (context, inject) {
  Helpers.init({ Number, String })

  inject('helpers', { url, asset })
}

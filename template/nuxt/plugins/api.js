import api from '~/libs/api'

export default function (context, inject) {
  inject('api', api(context))
}

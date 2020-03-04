import resources from '~/libs/resources'

export default function ({ app }, inject) {
  inject('resources', resources.setApp(app))
}

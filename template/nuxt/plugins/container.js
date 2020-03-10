import Container from '~/libs/Container'

export default function ({ app }, inject) {
  const container = Container.getInstance()

  container.instance('app', app)

  inject('container', container)
}

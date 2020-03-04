// import auth from './auth'

class Resources {
  setApp (app) {
    this.app = app

    return this
  }

  register (name, resource) {
    this[name] = this.bindAppToResource(resource)

    return this
  }

  bindAppToResource (resource) {
    return resource.map(method => (...args) => method.apply(this.app, args))
  }
}

const resources = new Resources()

// resources.register('auth', auth)

export default resources

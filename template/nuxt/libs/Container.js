export default class Container {
  constructor () {
    this.instances = {}
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  instance (name, instance) {
    this.instances[name] = instance
  }

  resolve (name) {
    return this.instances[name]
  }
}

export default class Pipeline {
  constructor (context) {
    this.context = context
  }

  send (passable) {
    this.passable = passable

    return this
  }

  through (pipes) {
    this.pipes = pipes

    return this
  }

  then (destination) {
    const pipes = this.pipes
    const pipeline = pipes.reverse().reduce(this.carry(), passable => destination(passable))

    return pipeline(this.passable)
  }

  carry () {
    return (stack, Pipe) => {
      return (passable) => {
        return (new Pipe(this.context)).handle(passable, stack)
      }
    }
  }
}
